import React, { useState, useEffect } from 'react';

export default function ProductForm({ 
  categories, 
  brands, 
  onImageChange, 
  onAddOrUpdateProduct, 
  editingProduct, 
  croppedImage, 
  handleRemoveImage 
}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setDescription(editingProduct.description);
      setStock(editingProduct.stock);
      setPrice(editingProduct.price);
      setDiscount(editingProduct.discount);
      setSelectedCategory(editingProduct.category);
      setSelectedBrand(editingProduct.brand);
    }
  }, [editingProduct]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = { 
      name, 
      description, 
      stock, 
      price, 
      discount, 
      category: selectedCategory, 
      brand: selectedBrand,
      croppedImage,
    };
    console.log("Datos enviados desde ProductForm:", productData);
    onAddOrUpdateProduct(productData);
    resetForm();
  };
  

  const resetForm = () => {
    setName('');
    setDescription('');
    setStock(0);
    setPrice(0);
    setDiscount(0);
    setSelectedCategory('');
    setSelectedBrand('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
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
          <h3 className="text-sm font-semibold text-gray-700">Imagen Recortada:</h3>
          <img src={croppedImage} alt="Imagen del Producto" className="w-32 h-32 object-cover mt-2" />
          <button
            type="button"
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
  );
}
