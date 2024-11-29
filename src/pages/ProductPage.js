import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FilterSidebar from '../components/products/FilterSidebar';
import ProductCard from '../components/products/ProductCard';
import { products } from '../components/products/data';

export default function ProductPage() {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDiscounts, setShowDiscounts] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const location = useLocation();
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const discount = queryParams.get('discount');
    setShowDiscounts(discount === 'true');
  }, [location]);

  const filteredProducts = products.filter(
    product => (!showDiscounts || (product.originalPrice && product.price < product.originalPrice))
  );

  return (
    <div className="min-h-screen bg-gray-100 ">
      <div className="container mx-auto px-4 py-2 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-[#201c1c]">Productos NKS</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-1/4 hidden lg:block">
            <FilterSidebar 
              priceRange={priceRange} 
              setPriceRange={setPriceRange} 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm} 
              showDiscounts={showDiscounts} 
              setShowDiscounts={setShowDiscounts} 
            />
          </aside>

          <div className="lg:hidden">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full bg-[#201c1c] hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center justify-center"
            >
              {showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
            </button>
            {showFilters && (
              <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
                <FilterSidebar
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  showDiscounts={showDiscounts}
                  setShowDiscounts={setShowDiscounts}
                />
              </div>
            )}
          </div>

          <section className="w-full lg:w-3/4">
            <h2 className="text-2xl font-semibold mb-4 text-[#201c1c]">Productos</h2>
            <ProductCard products={filteredProducts} />
          </section>
        </div>
      </div>
    </div>
  );
}
