import React, { useState, useRef, useEffect } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'

const FilterSearch = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const formRef = useRef(null)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setIsExpanded(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="mx-auto px-4 py-4">
      <div className="bg-red-600 rounded-lg shadow-md overflow-hidden" ref={formRef}>
        <div className="p-4 sm:p-6">
          <h2 className="text-white text-lg sm:text-xl font-bold text-center mb-4">
            ENCUENTRA EL FILTRO IDEAL PARA TU MOTO
          </h2>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Buscar filtro..."
                className="w-full py-2 px-4 pr-10 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-300 ease-in-out"
              />
              <Search 
                size={20} 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>
            <button
              onClick={toggleExpand}
              className="bg-white text-red-600 p-2 rounded-md hover:bg-red-100 transition-colors duration-300 ease-in-out"
              aria-label="Búsqueda avanzada"
              title="Búsqueda avanzada"
            >
              <SlidersHorizontal size={20} />
            </button>
          </div>
          <div className={`${isExpanded ? 'max-h-96' : 'max-h-0'} overflow-hidden transition-all duration-300 ease-in-out`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {['Marca', 'Modelo', 'Cilindraje', 'Año', 'Referencia'].map((label) => (
                <div key={label} className="relative">
                  <select className="w-full appearance-none bg-white text-gray-700 py-2 px-3 pr-8 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-300 ease-in-out">
                    <option value="">{label}</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <button className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-red-700 transition-colors duration-300 ease-in-out text-sm font-semibold">
          BUSCAR FILTRO
        </button>
      </div>
    </div>
  )
}

export default FilterSearch

