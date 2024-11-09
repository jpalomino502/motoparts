import React from 'react';
import { ChevronRight } from 'lucide-react';

const FavoritesPage = () => {
  const favorites = [
    { id: 1, name: 'Camiseta Básica', image: 'https://via.placeholder.com/200?text=Camiseta+Básica', price: 19.99 },
    { id: 2, name: 'Pantalón de Tela', image: 'https://via.placeholder.com/200?text=Pantalón+de+Tela', price: 39.99 },
    { id: 3, name: 'Zapatillas Deportivas', image: 'https://via.placeholder.com/200?text=Zapatillas+Deportivas', price: 59.99 },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
        <nav className="text-sm mb-6">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <a href="/" className="text-[#ff0000] hover:text-[#d70000]">Inicio</a>
              <ChevronRight className="h-4 w-4 mx-2" />
            </li>
            <li className="flex items-center">
              <a href="/favorites" className="text-[#ff0000] hover:text-[#d70000]">Favoritos</a>
            </li>
          </ol>
        </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {favorites.length === 0 ? (
            <div className="text-center text-gray-600">
              <p>No tienes productos favoritos.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((product) => (
                <div key={product.id} className="bg-white shadow rounded-lg overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                    <p className="text-xl text-gray-800">${product.price.toFixed(2)}</p>
                    <button className="mt-4 bg-[#ff0000] text-white py-2 px-4 rounded hover:bg-blue-600">
                      Ver Producto
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default FavoritesPage;
