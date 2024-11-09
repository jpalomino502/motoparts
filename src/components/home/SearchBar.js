export default function SearchBar() {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-4">Encuentra el repuesto perfecto para tu moto</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {['Marca', 'Modelo', 'Cilindraje', 'Año', 'Línea de Producto'].map((label, index) => (
            <select key={index} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">{label}</option>
            </select>
          ))}
        </div>
        <button className="mt-4 w-full bg-[#ff0000] text-[#fff0f0] py-2 px-4 rounded-md hover:bg-red-700 transition-colors">
          Buscar Repuestos
        </button>
      </div>
    );
  }
  