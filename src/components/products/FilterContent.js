import React from 'react';
import { Search, Percent } from 'lucide-react';
import { categories, brands } from './data';

export default function FilterContent({ priceRange, setPriceRange, searchTerm, setSearchTerm, showDiscounts, setShowDiscounts }) {
  return (
    <div className="space-y-6">
      {/* Búsqueda */}
      <div>
        <label htmlFor="search" className="block text-sm font-medium text-gray-700">Buscar</label>
        <div className="relative mt-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            id="search"
            placeholder="Buscar productos..."
            className="pl-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Rango de precios */}
      <div>
        <label htmlFor="price-range" className="block text-sm font-medium text-gray-700">Rango de Precio</label>
        <input
          type="range"
          id="price-range"
          min="0"
          max="1000"
          step="10"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
        />
        <div className="flex justify-between mt-2">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      {/* Botón de descuentos */}
      <button
        onClick={() => setShowDiscounts(!showDiscounts)}
        className={`w-full py-2 px-4 rounded-md ${showDiscounts ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'}`}
      >
        <Percent className="inline-block w-4 h-4 mr-2" />
        {showDiscounts ? "Mostrar todos los productos" : "Ver solo ofertas"}
      </button>

      {/* Marcas */}
      <div>
        <h3 className="font-semibold mb-2 text-blue-600">Marcas</h3>
        {brands.map((brand) => (
          <div key={brand} className="flex items-center space-x-2 mb-2">
            <input type="checkbox" id={`brand-${brand}`} className="rounded text-blue-600 focus:ring-blue-500" />
            <label htmlFor={`brand-${brand}`}>{brand}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
