import { useState } from 'react';
import Sidebar from './Sidebar';
import ProductForm from './ProductPage';
import { ToastContainer } from 'react-toastify';
import DataPage from './DataPage';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex flex-col md:flex-row gap-6">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="w-full md:w-3/4">
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                {activeTab === 'products' && (
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Gestión de Productos</h3>
                    <ProductForm setProducts={setProducts} products={products} /> 
                    <ToastContainer />
                  </div>
                )}
                {activeTab === 'data' && <DataPage />}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
