import React from 'react';

export default function ProductList({ productList, onEditProduct, onDeleteProduct }) {
  return (
    <ul className="bg-white shadow overflow-hidden sm:rounded-md">
      {productList.map((product) => (
        <li key={product.id} className="border-t border-gray-200">
          <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
            <div className="text-sm font-medium text-gray-900">{product.name}</div>
            <div className="ml-2 flex-shrink-0 flex">
              <button onClick={() => onEditProduct(product)} className="mr-2 text-blue-600 hover:text-blue-800">
                Editar
              </button>
              <button onClick={() => onDeleteProduct(product.id, product.image)} className="text-red-600 hover:text-red-800">
                Eliminar
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
