import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactCrop from 'react-easy-crop';
import { getCroppedImg } from './utils/cropImage';
import { db, storage } from '../firebase/firebase';
import { collection, doc, getDocs, addDoc, updateDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL, deleteObject } from 'firebase/storage';
import useAlert from './utils/useAlert';

export default function ProductPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [image, setImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [cropping, setCropping] = useState(false);
  const [productList, setProductList] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const { confirmDelete } = useAlert();

  useEffect(() => {
    const fetchData = async () => {
      const categoriesRef = doc(db, 'productData', 'categories');
      const brandsRef = doc(db, 'productData', 'brands');
      const categoryDoc = await getDoc(categoriesRef);
      const brandDoc = await getDoc(brandsRef);

      if (categoryDoc.exists()) {
        setCategories(categoryDoc.data().items || []);
      }

      if (brandDoc.exists()) {
        setBrands(brandDoc.data().items || []);
      }

      // Cargar productos desde Firestore (esto lo usaremos para editar y eliminar productos)
      const productsRef = collection(db, 'products');
      const productSnapshot = await getDocs(productsRef);
      setProductList(productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchData();
  }, []);

  const onImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
      setCropping(true);
    }
  };

  const onCropComplete = async (croppedAreaPixels) => {
    try {
      const croppedImg = await getCroppedImg(image, croppedAreaPixels);
      setCroppedImage(croppedImg);
    } catch (err) {
      console.error('Error al recortar la imagen:', err);
    }
  };

  const handleConfirmCrop = () => {
    setCropping(false);
    setImage(null);
  };

  const handleCancelCrop = () => {
    setCropping(false);
    setImage(null);
    setCroppedImage(null);
  };

  const uploadImageToStorage = async (imageData, productId) => {
    const storageRef = ref(storage, `products/${productId}/image`);
    await uploadString(storageRef, imageData, 'data_url');
    const url = await getDownloadURL(storageRef);
    return url;
  };

  const handleAddOrUpdateProduct = async (e) => {
    e.preventDefault();
  
    if (!name || !description || !price || !stock || stock < 0 || price < 0 || discount < 0) {
      toast.error('Por favor, complete todos los campos correctamente. Los valores no pueden ser negativos.');
      return;
    }
  
    try {
      const productData = {
        name,
        description,
        stock,
        price,
        discount,
        category: selectedCategory,
        brand: selectedBrand,
      };
  
      let productId;
  
      if (editingProduct) {
        productId = editingProduct.id;
        const productRef = doc(db, 'products', productId);
  
        // Actualiza el producto sin imagen si se quitó
        if (croppedImage === null) {
          productData.image = null; // O elimina la propiedad "image" del producto
        }
  
        await updateDoc(productRef, productData);
      } else {
        const newProductRef = await addDoc(collection(db, 'products'), productData);
        productId = newProductRef.id;
      }
  
      if (croppedImage) {
        const imageUrl = await uploadImageToStorage(croppedImage, productId);
        const productRef = doc(db, 'products', productId);
        await updateDoc(productRef, { image: imageUrl });
      }
  
      toast.success(editingProduct ? 'Producto actualizado correctamente.' : 'Producto creado correctamente.');
  
      setName('');
      setDescription('');
      setStock(0);
      setPrice(0);
      setDiscount(0);
      setSelectedCategory('');
      setSelectedBrand('');
      setImage(null);
      setCroppedImage(null);
      setEditingProduct(null);
    } catch (err) {
      console.error('Error al guardar el producto:', err);
      toast.error('Error al guardar el producto.');
    }
  };
  

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setName(product.name);
    setDescription(product.description);
    setStock(product.stock);
    setPrice(product.price);
    setDiscount(product.discount);
    setSelectedCategory(product.category);
    setSelectedBrand(product.brand);
    
    if (product.image) {
      setCroppedImage(product.image);
    } else {
      setCroppedImage(null);
    }
  };
  
  const handleRemoveImage = () => {
    setCroppedImage(null);
  };  

  const handleDeleteProduct = async (productId, imageUrl) => {
    const confirm = await confirmDelete();
    if (!confirm) return;

    try {
      // Eliminar la imagen del producto de Firebase Storage
      if (imageUrl) {
        const imageRef = ref(storage, imageUrl);
        await deleteObject(imageRef);
      }

      // Eliminar el producto de Firestore
      const productRef = doc(db, 'products', productId);
      await deleteDoc(productRef);

      toast.success('Producto eliminado correctamente.');
    } catch (err) {
      console.error('Error al eliminar el producto:', err);
      toast.error('Error al eliminar el producto.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Gestión de Productos</h1>

      <form onSubmit={handleAddOrUpdateProduct} className="mb-6">
      <div className="mb-4">
          <label className="text-sm font-semibold text-gray-700" htmlFor="name">Nombre del Producto</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre del producto"
            className="w-full mb-4 p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="text-sm font-semibold text-gray-700" htmlFor="description">Descripción del Producto</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descripción del producto"
            className="w-full mb-4 p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="text-sm font-semibold text-gray-700" htmlFor="stock">Stock</label>
          <input
            id="stock"
            type="number"
            value={stock}
            onChange={(e) => setStock(Math.max(0, Number(e.target.value)))}
            placeholder="Stock"
            className="w-full mb-4 p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="text-sm font-semibold text-gray-700" htmlFor="price">Precio</label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(Math.max(0, Number(e.target.value)))}
            placeholder="Precio"
            className="w-full mb-4 p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="text-sm font-semibold text-gray-700" htmlFor="discount">Descuento</label>
          <input
            id="discount"
            type="number"
            value={discount}
            onChange={(e) => setDiscount(Math.max(0, Number(e.target.value)))}
            placeholder="Descuento"
            className="w-full mb-4 p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="text-sm font-semibold text-gray-700" htmlFor="category">Categoría</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full mb-4 p-2 border rounded"
          >
            <option value="">Seleccione una categoría</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="text-sm font-semibold text-gray-700" htmlFor="brand">Marca</label>
          <select
            id="brand"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="w-full mb-4 p-2 border rounded"
          >
            <option value="">Seleccione una marca</option>
            {brands.map((brand, index) => (
              <option key={index} value={brand}>{brand}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="text-sm font-semibold text-gray-700" htmlFor="image">Imagen del Producto</label>
          <input
            id="image"
            type="file"
            onChange={onImageChange}
            className="w-full mb-4 p-2 border rounded"
          />
        </div>

        {croppedImage && (
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-700">Imagen Actual:</h3>
            <img src={croppedImage} alt="Imagen del Producto" className="w-32 h-32 object-cover mt-2" />
            <button
              onClick={handleRemoveImage}
              className="mt-2 py-1 px-3 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Quitar Imagen
            </button>
          </div>
        )}


        <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          {editingProduct ? 'Actualizar Producto' : 'Agregar Producto'}
        </button>
      </form>

      {/* Modal para recorte */}
      {cropping && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Recorta la Imagen</h2>
            <div className="relative h-64 w-full">
              <ReactCrop
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={(croppedArea, croppedAreaPixels) => onCropComplete(croppedAreaPixels)}
              />
            </div>
            <div className="flex justify-end mt-4">
              <button onClick={handleCancelCrop} className="py-2 px-4 bg-gray-300 text-gray-700 rounded mr-2">
                Cancelar
              </button>
              <button onClick={handleConfirmCrop} className="py-2 px-4 bg-blue-500 text-white rounded">
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      <h2 className="text-xl font-semibold text-gray-900 mb-4">Productos Existentes</h2>
      <ul className="bg-white shadow overflow-hidden sm:rounded-md">
        {productList.map((product) => (
          <li key={product.id} className="border-t border-gray-200">
            <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
              <div className="text-sm font-medium text-gray-900">{product.name}</div>
              <div className="ml-2 flex-shrink-0 flex">
                <button
                  onClick={() => handleEditProduct(product)}
                  className="mr-2 text-blue-600 hover:text-blue-800"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id, product.image)}
                  className="text-red-600 hover:text-red-800"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
