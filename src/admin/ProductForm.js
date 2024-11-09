import React, { useState, useEffect } from 'react';
import { PencilIcon, TrashIcon } from 'lucide-react';
import { db, doc, getDoc, setDoc, collection, getDocs, deleteDoc } from '../firebase/firebase';

export default function ProductForm() {
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    price: '',
    weight: '',
    discount: '',
    stock: '',
    photos: [],
    selectedBrand: '',
    selectedCategory: '',
    dimensions: { length: '', width: '', height: '' }
  });
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('dimensions.')) {
      const dimensionKey = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        dimensions: { ...prev.dimensions, [dimensionKey]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, photos: Array.from(e.target.files) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.productName || !formData.selectedBrand || !formData.selectedCategory || !formData.price || !formData.stock) {
      setMessage({ text: 'Por favor complete todos los campos requeridos.', type: 'error' });
      return;
    }

    try {
      const productRef = isEditing ? doc(db, 'products', currentProductId) : doc(collection(db, 'products'));
      const newProduct = {
        name: formData.productName,
        description: formData.description,
        price: parseFloat(formData.price),
        weight: parseFloat(formData.weight) || null,
        discount: formData.discount ? parseFloat(formData.discount) : null,
        stock: parseInt(formData.stock),
        photos: formData.photos,
        brand: formData.selectedBrand,
        category: formData.selectedCategory,
        dimensions: formData.dimensions,
        updatedAt: new Date(),
      };

      if (!isEditing) newProduct.createdAt = new Date();

      await setDoc(productRef, newProduct, { merge: true });

      setMessage({ text: `Producto ${isEditing ? 'actualizado' : 'creado'} correctamente.`, type: 'success' });
      resetForm();
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      setMessage({ text: `Error al ${isEditing ? 'actualizar' : 'crear'} el producto.`, type: 'error' });
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('¿Está seguro de que desea eliminar este producto?')) {
      try {
        await deleteDoc(doc(db, 'products', id));
        setProducts(products.filter(product => product.id !== id));
        setMessage({ text: 'Producto eliminado.', type: 'success' });
      } catch (error) {
        console.error('Error deleting product:', error);
        setMessage({ text: 'Error al eliminar el producto.', type: 'error' });
      }
    }
  };

  const handleEditProduct = (product) => {
    setIsEditing(true);
    setCurrentProductId(product.id);
    setFormData({
      productName: product.name,
      description: product.description,
      price: product.price.toString(),
      weight: product.weight?.toString() || '',
      discount: product.discount?.toString() || '',
      stock: product.stock.toString(),
      photos: product.photos || [],
      selectedBrand: product.brand,
      selectedCategory: product.category,
      dimensions: product.dimensions || { length: '', width: '', height: '' }
    });
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentProductId(null);
    setFormData({
      productName: '',
      description: '',
      price: '',
      weight: '',
      discount: '',
      stock: '',
      photos: [],
      selectedBrand: '',
      selectedCategory: '',
      dimensions: { length: '', width: '', height: '' }
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-6">{isEditing ? 'Editar Producto' : 'Crear Nuevo Producto'}</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Nombre del producto*</label>
              <input
                type="text"
                id="productName"
                name="productName"
                value={formData.productName}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">Precio*</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label htmlFor="weight" className="block text-sm font-medium text-gray-700">Peso (en libras)</label>
              <input
                type="number"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="discount" className="block text-sm font-medium text-gray-700">Descuento (%)</label>
              <input
                type="number"
                id="discount"
                name="discount"
                value={formData.discount}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock*</label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label htmlFor="selectedBrand" className="block text-sm font-medium text-gray-700">Marca*</label>
              <select
                id="selectedBrand"
                name="selectedBrand"
                value={formData.selectedBrand}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              >
                <option value="">Seleccione una marca</option>
                {brands.map((brand, index) => (
                  <option key={index} value={brand}>{brand}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="selectedCategory" className="block text-sm font-medium text-gray-700">Categoría*</label>
              <select
                id="selectedCategory"
                name="selectedCategory"
                value={formData.selectedCategory}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              >
                <option value="">Seleccione una categoría</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Dimensiones</label>
            <div className="grid grid-cols-3 gap-4">
              <input
                type="number"
                name="dimensions.length"
                value={formData.dimensions.length}
                onChange={handleInputChange}
                placeholder="Largo"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <input
                type="number"
                name="dimensions.width"
                value={formData.dimensions.width}
                onChange={handleInputChange}
                placeholder="Ancho"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <input
                type="number"
                name="dimensions.height"
                value={formData.dimensions.height}
                onChange={handleInputChange}
                placeholder="Alto"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Fotos o Videos</label>
            <input
              type="file"
              onChange={handleFileChange}
              multiple
              className="mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-indigo-50 file:text-indigo-700
                hover:file:bg-indigo-100"
            />
          </div>
          
          {message.text && (
            <div className={`p-4 rounded-md ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              {message.text}
            </div>
          )}
          
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isEditing ? 'Actualizar Producto' : 'Crear Producto'}
            </button>
          </div>
        </form>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <h2 className="text-2xl font-semibold p-6 bg-gray-50 border-b">Lista de Productos</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">${product.price.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.stock}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}