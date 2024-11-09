import React, { useState, useEffect } from 'react';

export function ProductForm({ brands, categories, onSubmit, initialData, onCancel }) {
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

  useEffect(() => {
    if (initialData) {
      setFormData({
        productName: initialData.name,
        description: initialData.description,
        price: initialData.price.toString(),
        weight: initialData.weight?.toString() || '',
        discount: initialData.discount?.toString() || '',
        stock: initialData.stock.toString(),
        photos: [],
        selectedBrand: initialData.brand,
        selectedCategory: initialData.category,
        dimensions: initialData.dimensions
      });
    }
  }, [initialData]);

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
    if (e.target.files) {
      setFormData(prev => ({ ...prev, photos: Array.from(e.target.files) }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
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
      
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {initialData ? 'Actualizar Producto' : 'Crear Producto'}
        </button>
      </div>
    </form>
  );
}
