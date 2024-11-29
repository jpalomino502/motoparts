import React from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <Link to="/productdelait" className="block"> {/* Enlace redirige a la página de detalle */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 text-center">
          <h2 className="font-medium text-sm mb-2 line-clamp-2">{product.name}</h2>
          <img
            src={product.image || 'https://via.placeholder.com/200'}
            alt={product.name}
            className="w-full h-48 object-contain mx-auto"
          />
          <div className="mt-4">
            <p className="text-sm mb-1">REFERENCIA {product.reference}</p>
            <div className="flex items-center justify-center gap-2 mb-4">
              {product.originalPrice && (
                <span className="text-gray-500 line-through">${product.originalPrice}</span>
              )}
              <span className="text-xl font-bold">${product.salePrice}</span>
            </div>
            {/* Botón de Ver todas las aplicaciones */}
            <button 
              className="w-full mb-2 text-red-600 text-sm border border-red-600 rounded py-1.5 hover:bg-red-50"
              onClick={() => {
                // Lógica para abrir el diálogo o redirigir a la página de detalle
              }}
            >
              VER TODAS LAS APLICACIONES
            </button>

            {/* Botón de Añadir al carrito */}
            <button className="w-full bg-red-600 text-white rounded py-1.5 hover:bg-red-700">
             AÑADIR AL CARRITO
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
