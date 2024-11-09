import React from 'react';
import { ShoppingCart, Star } from 'lucide-react';

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="relative">
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
        {product.originalPrice && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mb-2">
          {product.category}
        </span>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through ml-2">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 mr-1" />
            <span>{product.rating}</span>
          </div>
        </div>
      </div>
      <div className="p-4 pt-0">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center justify-center">
          <ShoppingCart className="mr-2 h-4 w-4" /> Agregar al Carrito
        </button>
      </div>
    </div>
  );
}
