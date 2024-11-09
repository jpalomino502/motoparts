import React, { useState, useEffect } from 'react';
import { db, doc, setDoc, updateDoc, getDoc } from '../firebase/firebase';
import { PlusIcon, PencilIcon, TrashIcon } from 'lucide-react';

export default function DataPage() {
  const [activeTab, setActiveTab] = useState('brands');
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const docRef = doc(db, 'productData', activeTab);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setItems(data.items || []);
        } else {
          await setDoc(docRef, { items: [] });
          setItems([]);
        }
      } catch (err) {
        console.error('Error fetching items:', err);
        setError('Error al cargar los datos. Por favor, intente de nuevo.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, [activeTab]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddOrUpdateItem = async (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const docRef = doc(db, 'productData', activeTab);
    try {
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        let updatedItems = [];

        if (editingItem) {
          updatedItems = items.map(item => (item === editingItem ? inputValue : item));
        } else {
          updatedItems = [...items, inputValue];
        }

        await updateDoc(docRef, { items: updatedItems });
        setItems(updatedItems);
        setInputValue('');
        setEditingItem(null);
      }
    } catch (err) {
      console.error('Error adding/updating item:', err);
      setError('Error al guardar. Por favor, intente de nuevo.');
    }
  };

  const handleEditItem = (item) => {
    setInputValue(item);
    setEditingItem(item);
  };

  const handleDeleteItem = async (itemToDelete) => {
    try {
      const docRef = doc(db, 'productData', activeTab);
      const updatedItems = items.filter(item => item !== itemToDelete);
      await updateDoc(docRef, { items: updatedItems });
      setItems(updatedItems);
    } catch (err) {
      console.error('Error deleting item:', err);
      setError('Error al eliminar. Por favor, intente de nuevo.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Gestión de {activeTab === 'brands' ? 'Marcas' : 'Categorías'}
      </h1>

      <div className="mb-6">
        <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('brands')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'brands'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Marcas
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'categories'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Categorías
          </button>
        </div>
      </div>

      <form onSubmit={handleAddOrUpdateItem} className="mb-6">
        <div className="flex items-center">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder={`Ingrese ${activeTab === 'brands' ? 'marca' : 'categoría'}`}
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {editingItem ? (
              <PencilIcon className="w-5 h-5" />
            ) : (
              <PlusIcon className="w-5 h-5" />
            )}
          </button>
        </div>
      </form>

      {isLoading ? (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      ) : (
        <ul className="bg-white shadow overflow-hidden sm:rounded-md">
          {items.map((item, index) => (
            <li key={index} className={index > 0 ? 'border-t border-gray-200' : ''}>
              <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                <div className="text-sm font-medium text-gray-900">{item}</div>
                <div className="ml-2 flex-shrink-0 flex">
                  <button
                    onClick={() => handleEditItem(item)}
                    className="mr-2 text-blue-600 hover:text-blue-800"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}