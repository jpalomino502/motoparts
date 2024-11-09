import { useState, useEffect } from 'react';
import { db, doc, getDoc, setDoc, collection, getDocs, deleteDoc } from '../../firebase/firebase';

export function useProductData() {
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    fetchProductData();
    fetchProducts();
  }, []);

  const fetchProductData = async () => {
    try {
      const brandsSnapshot = await getDoc(doc(db, 'productData', 'brands'));
      const categoriesSnapshot = await getDoc(doc(db, 'productData', 'categories'));

      if (brandsSnapshot.exists()) setBrands(brandsSnapshot.data().items || []);
      if (categoriesSnapshot.exists()) setCategories(categoriesSnapshot.data().items || []);
    } catch (error) {
      console.error('Error fetching product data:', error);
      setMessage({ text: 'Error al obtener datos de productos', type: 'error' });
    }
  };

  const fetchProducts = async () => {
    try {
      const productsSnapshot = await getDocs(collection(db, 'products'));
      const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productsList);
    } catch (error) {
      console.error('Error fetching products:', error);
      setMessage({ text: 'Error al obtener productos', type: 'error' });
    }
  };

  const saveProduct = async (formData, isEditing, currentProductId) => {
    try {
      const productRef = isEditing ? doc(db, 'products', currentProductId) : doc(collection(db, 'products'));
      const newProduct = {
        name: formData.productName,
        description: formData.description,
        price: parseFloat(formData.price),
        weight: formData.weight ? parseFloat(formData.weight) : null,
        discount: formData.discount ? parseFloat(formData.discount) : null,
        stock: parseInt(formData.stock),
        photos: formData.photos.map(file => URL.createObjectURL(file)),
        brand: formData.selectedBrand,
        category: formData.selectedCategory,
        dimensions: formData.dimensions,
        updatedAt: new Date(),
      };

      if (!isEditing) newProduct.createdAt = new Date();

      await setDoc(productRef, newProduct, { merge: true });

      setMessage({ text: `Producto ${isEditing ? 'actualizado' : 'creado'} correctamente.`, type: 'success' });
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      setMessage({ text: `Error al ${isEditing ? 'actualizar' : 'crear'} el producto.`, type: 'error' });
    }
  };

  const deleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, 'products', id));
      setProducts(products.filter(product => product.id !== id));
      setMessage({ text: 'Producto eliminado.', type: 'success' });
    } catch (error) {
      console.error('Error deleting product:', error);
      setMessage({ text: 'Error al eliminar el producto.', type: 'error' });
    }
  };

  return { brands, categories, products, message, saveProduct, deleteProduct };
}
