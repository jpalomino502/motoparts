import { db, storage } from '../../firebase/firebase';
import { collection, doc, getDocs, addDoc, updateDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL, deleteObject } from 'firebase/storage';

export async function fetchProductData(setCategories, setBrands, setProductList) {
  const categoriesRef = doc(db, 'productData', 'categories');
  const brandsRef = doc(db, 'productData', 'brands');
  const categoryDoc = await getDoc(categoriesRef);
  const brandDoc = await getDoc(brandsRef);

  setCategories(categoryDoc.exists() ? categoryDoc.data().items || [] : []);
  setBrands(brandDoc.exists() ? brandDoc.data().items || [] : []);

  const productsRef = collection(db, 'products');
  const productSnapshot = await getDocs(productsRef);
  setProductList(productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
}

export async function handleAddOrUpdateProduct(
  productData,
  setProductList,
  editingProduct,
  setEditingProduct,
  setCroppedImage,
  toast
) {
  console.log("handleAddOrUpdateProduct fue llamado");

  const { croppedImage, ...restOfData } = productData;

  console.log("Cropped Image recibido:", croppedImage);

  try {
    if (croppedImage) {
      console.log("Imagen recortada detectada, iniciando subida...");
      const productImageFolder = editingProduct
        ? `productImages/${editingProduct.id}`
        : `productImages/${Date.now()}`;
      const imageRef = ref(storage, `${productImageFolder}/imagen.jpg`);

      await uploadString(imageRef, croppedImage, 'data_url');
      const imageUrl = await getDownloadURL(imageRef);
      console.log("Imagen subida correctamente, URL:", imageUrl);

      restOfData.imageUrl = imageUrl;
    }

    if (editingProduct) {
      const productRef = doc(db, 'products', editingProduct.id);
      await updateDoc(productRef, restOfData);
      setProductList(prev =>
        prev.map(p => (p.id === editingProduct.id ? { ...p, ...restOfData } : p))
      );
      toast.success('Producto actualizado correctamente');
    } else {
      const newDoc = await addDoc(collection(db, 'products'), restOfData);
      setProductList(prev => [...prev, { id: newDoc.id, ...restOfData }]);
      toast.success('Producto agregado correctamente');
    }

    setEditingProduct(null);
    setCroppedImage(null);
  } catch (error) {
    toast.error('Error al guardar el producto');
    console.error(error);
  }
}

export async function handleDeleteProduct(productId, imageUrl, confirmDelete, setProductList, toast) {
  const confirmed = await confirmDelete();
  if (!confirmed) return;

  try {
    if (imageUrl) {
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);
    }

    await deleteDoc(doc(db, 'products', productId));
    setProductList(prev => prev.filter(p => p.id !== productId));
    toast.success('Producto eliminado correctamente');
  } catch (error) {
    toast.error('Error al eliminar el producto');
    console.error(error);
  }
}
