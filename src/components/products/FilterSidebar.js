import React from 'react';
import FilterContent from './FilterContent';

export default function FilterSidebar({ priceRange, setPriceRange, searchTerm, setSearchTerm, showDiscounts, setShowDiscounts }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 flex items-center text-blue-600">Filtros</h2>
      <FilterContent 
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        showDiscounts={showDiscounts}
        setShowDiscounts={setShowDiscounts}
      />
    </div>
  );
}
