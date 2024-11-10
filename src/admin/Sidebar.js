import { Package, Database } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  return (
    <div className="w-full md:w-1/4">
      <nav className="space-y-1">
        <button
          onClick={() => setActiveTab('products')}
          className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeTab === 'products' ? 'bg-[#ffc0c0] text-[#500000]' : 'text[#500000] hover:bg-[#ffdddd] hover:text[#500000]'}`}
        >
          <Package className="mr-3 h-6 w-6" />
          Productos
        </button>
        
        <button
          onClick={() => setActiveTab('data')}
          className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeTab === 'data' ? 'bg-[#ffc0c0] text[#500000]' : 'text[#500000] hover:bg-[#ffdddd] hover:text[#500000]'}`}
        >
          <Database className="mr-3 h-6 w-6" />
          Datos
        </button>
      </nav>
    </div>
  );
}
