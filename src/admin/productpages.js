import React, { useState } from 'react';
import { useProductData } from './components/useProductData';
import { ProductForm } from './components/ProductForm';
import { ProductList } from './components/ProductList';

export default function ProductPages() {
  const { brands, categories, products, message, saveProduct, deleteProduct } = useProductData();
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const handleSubmit = (formData) => {
    saveProduct(formData, isEditing, currentProduct?.id || null);
    resetForm();
  };

  const handleEditProduct = (product) => {
    setIsEditing(true);
    setCurrentProduct(product);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('¿Está seguro de que desea eliminar este producto?')) {
      deleteProduct(id);
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentProduct(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-6">{isEditing ? 'Editar Producto' : 'Crear Nuevo Producto'}</h2>
        <ProductForm
          brands={brands}
          categories={categories}
          onSubmit={handleSubmit}
          initialData={currentProduct || undefined}
          onCancel={resetForm}
        />
      </div>
      
      {message.text && (
        <div className={`p-4 rounded-md mb-8 ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message.text}
        </div>
      )}
      
      <ProductList
        products={products}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
      />
    </div>
  );
}
