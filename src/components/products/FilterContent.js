import React from 'react'; 
import { Search, Percent, ChevronDown } from 'lucide-react'; 

export default function FilterContent({ 
  priceRange, 
  setPriceRange, 
  searchTerm, 
  setSearchTerm, 
  showDiscounts, 
  setShowDiscounts, 
  brands, 
  selectedBrands, 
  setSelectedBrands,
  models,
  selectedModels,
  setSelectedModels,
  engineSizes,
  selectedEngineSizes,
  setSelectedEngineSizes,
  years,
  selectedYears,
  setSelectedYears
}) {
  const [expandedSections, setExpandedSections] = React.useState({
    brands: false,
    models: false,
    engineSizes: false,
    years: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const sectionData = {
    brands: brands,
    models: models,
    engineSizes: engineSizes,
    years: years
  };

  const selectedData = {
    brands: selectedBrands,
    models: selectedModels,
    engineSizes: selectedEngineSizes,
    years: selectedYears
  };

  const setSelectedData = {
    brands: setSelectedBrands,
    models: setSelectedModels,
    engineSizes: setSelectedEngineSizes,
    years: setSelectedYears
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar productos..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="price-range" className="block text-sm font-medium text-gray-700 mb-1">Rango de Precio</label>
        <input
          type="range"
          id="price-range"
          min={priceRange[0]}
          max={priceRange[1]}
          step={(priceRange[1] - priceRange[0]) / 100}
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between mt-1 text-sm text-gray-600">
          <span>COP {priceRange[0].toLocaleString('es-CO')}</span>
          <span>COP {priceRange[1].toLocaleString('es-CO')}</span>
        </div>
      </div>

      <button
        onClick={() => setShowDiscounts(!showDiscounts)}
        className={`w-full py-2 px-4 rounded-md text-sm font-medium transition-colors ${showDiscounts ? 'bg-red-600 text-white' : 'bg-white text-red-600 border border-red-600'}`}
      >
        <Percent className="inline-block w-4 h-4 mr-2" />
        {showDiscounts ? "Mostrar todos los productos" : "Ver solo ofertas"}
      </button>

      {[{ id: 'brands', label: 'Marcas' }, { id: 'models', label: 'Modelos' }, { id: 'engineSizes', label: 'Cilindraje' }, { id: 'years', label: 'Años' }].map(({ id, label }) => (
        <div key={id} className="border-b border-gray-200 pb-2">
          <button
            onClick={() => toggleSection(id)}
            className="flex justify-between items-center w-full py-2 text-left text-sm font-medium text-gray-700"
          >
            <span>{label}</span>
            <ChevronDown className={`w-5 h-5 transition-transform ${expandedSections[id] ? 'transform rotate-180' : ''}`} />
          </button>
          {expandedSections[id] && (
            <div className="mt-2 space-y-2">
              {sectionData[id].map((item) => (
                <label key={item} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedData[id].includes(item)}
                    onChange={() => {
                      const setFunction = setSelectedData[id];
                      setFunction(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{item}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
