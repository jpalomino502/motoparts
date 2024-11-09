import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import FilterSidebar from '../components/products/FilterSidebar';
import ProductGrid from '../components/products/ProductGrid';
import { products } from '../components/products/data';

export default function ProductPage() {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDiscounts, setShowDiscounts] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Leer parámetros de la URL
  const location = useLocation();
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const discount = queryParams.get('discount');
    setShowDiscounts(discount === 'true');  // Activar el filtro de descuentos si el parámetro es "true"
  }, [location]);

  const filteredProducts = products.filter(
    product => (!showDiscounts || (product.originalPrice && product.price < product.originalPrice))
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-2">
        <nav className="text-sm mb-6">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <a href="/" className="text-blue-600 hover:text-blue-800">Inicio</a>
              <ChevronRight className="h-4 w-4 mx-2" />
            </li>
            <li className="flex items-center">
              <a href="/products" className="text-blue-600 hover:text-blue-800">Productos</a>
            </li>
          </ol>
        </nav>
        <h1 className="text-3xl font-bold mb-8 text-blue-600">Productos NKS</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar de filtros en pantallas grandes */}
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

          {/* Botón de filtros para pantallas pequeñas */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center justify-center"
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

          {/* Contenido principal */}
          <main className="w-full lg:w-3/4">
            <ProductGrid products={filteredProducts} />
          </main>
        </div>
      </div>
    </div>
  );
}
