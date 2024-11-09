import { useState, useEffect } from 'react';
import { db, collection, addDoc, deleteDoc, doc, getDocs } from '../firebase/firebase';
import { Package, Users, ShoppingCart, PlusCircle, Edit, Trash2 } from 'lucide-react';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', category: '', price: '', stock: '' });

  // Fetch products from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
    };
    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'products'), {
        name: newProduct.name,
        category: newProduct.category,
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock),
      });
      setProducts([...products, { id: docRef.id, ...newProduct }]);
      setNewProduct({ name: '', category: '', price: '', stock: '' });
    } catch (error) {
      console.error("Error adding product: ", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, 'products', id));
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <div className="w-full md:w-1/4">
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('products')}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeTab === 'products' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                >
                  <Package className="mr-3 h-6 w-6" />
                  Productos
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeTab === 'orders' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                >
                  <ShoppingCart className="mr-3 h-6 w-6" />
                  Pedidos
                </button>
                <button
                  onClick={() => setActiveTab('users')}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeTab === 'users' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                >
                  <Users className="mr-3 h-6 w-6" />
                  Usuarios
                </button>
              </nav>
            </div>

            {/* Main content */}
            <div className="w-full md:w-3/4">
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                {activeTab === 'products' && (
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Gestión de Productos</h3>
                    <div className="mt-5 border-t border-gray-200">
                      {/* Add Product Form */}
                      <form onSubmit={handleAddProduct} className="space-y-4 mt-4">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre del Producto</label>
                            <input
                              type="text"
                              name="name"
                              id="name"
                              value={newProduct.name}
                              onChange={handleInputChange}
                              required
                              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                          <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Categoría</label>
                            <input
                              type="text"
                              name="category"
                              id="category"
                              value={newProduct.category}
                              onChange={handleInputChange}
                              required
                              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                          <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Precio</label>
                            <input
                              type="number"
                              name="price"
                              id="price"
                              value={newProduct.price}
                              onChange={handleInputChange}
                              required
                              step="0.01"
                              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                          <div>
                            <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
                            <input
                              type="number"
                              name="stock"
                              id="stock"
                              value={newProduct.stock}
                              onChange={handleInputChange}
                              required
                              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                        </div>
                        <div>
                          <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            <PlusCircle className="mr-2 h-5 w-5" />
                            Agregar Producto
                          </button>
                        </div>
                      </form>

                      {/* Product List */}
                      <div className="mt-8">
                        <h4 className="text-lg font-medium text-gray-900 mb-4">Lista de Productos</h4>
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {products.map((product) => (
                                <tr key={product.id}>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.price.toFixed(2)}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.stock}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button className="text-blue-600 hover:text-blue-900 mr-2">
                                      <Edit className="h-5 w-5" />
                                    </button>
                                    <button className="text-red-600 hover:text-red-900" onClick={() => handleDeleteProduct(product.id)}>
                                      <Trash2 className="h-5 w-5" />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'orders' && (
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Gestión de Pedidos</h3>
                    <div className="mt-5 border-t border-gray-200">
                      <p className="text-gray-500 mt-4">Aquí se mostrará la lista de pedidos y opciones para gestionarlos.</p>
                    </div>
                  </div>
                )}

                {activeTab === 'users' && (
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Gestión de Usuarios</h3>
                    <div className="mt-5 border-t border-gray-200">
                      <p className="text-gray-500 mt-4">Aquí se mostrará la lista de usuarios y opciones para gestionarlos.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
