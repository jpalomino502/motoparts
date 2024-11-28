export default function Component() {
  return (
    <div className="bg-red-600 p-4 rounded-lg mb-8 mt-8">
      <h2 className="text-white text-xl font-bold text-center mb-4">
        ENCUENTRA EL FILTRO IDEAL PARA TU MOTO
      </h2>
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <select className="w-full appearance-none bg-white text-gray-700 py-2 px-3 pr-8 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500">
            <option value="">Marca</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        <div className="relative flex-1">
          <select className="w-full appearance-none bg-white text-gray-700 py-2 px-3 pr-8 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500">
            <option value="">Modelo</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        <div className="relative flex-1">
          <select className="w-full appearance-none bg-white text-gray-700 py-2 px-3 pr-8 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500">
            <option value="">Cilindraje</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        <div className="relative flex-1">
          <select className="w-full appearance-none bg-white text-gray-700 py-2 px-3 pr-8 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500">
            <option value="">Año</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        <div className="relative flex-1">
          <select className="w-full appearance-none bg-white text-gray-700 py-2 px-3 pr-8 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500">
            <option value="">Referencia de Producto</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>
      <button className="w-full mt-4 bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors">
        BUSCAR FILTRO
      </button>
    </div>
  )
}