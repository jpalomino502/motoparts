import { Package, Database } from 'lucide-react'; // Importa el ícono Database

export default function Sidebar({ activeTab, setActiveTab }) {
  return (
    <div className="w-full md:w-1/4">
      <nav className="space-y-1">
        {/* Botón de Productos */}
        <button
          onClick={() => setActiveTab('products')}
          className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeTab === 'products' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
        >
          <Package className="mr-3 h-6 w-6" />
          Productos
        </button>
        
        {/* Botón de Datos */}
        <button
          onClick={() => setActiveTab('data')}
          className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeTab === 'data' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
        >
          <Database className="mr-3 h-6 w-6" />
          Datos
        </button>
      </nav>
    </div>
  );
}
