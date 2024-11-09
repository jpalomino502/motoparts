// src/components/ProfilePage/Sidebar.jsx
import { User, Package, CreditCard, Settings, LogOut } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="w-full md:w-1/4">
      <nav className="space-y-1">
        <button
          onClick={() => setActiveTab('personal-info')}
          className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
            activeTab === 'personal-info'
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          <User className="mr-3 h-6 w-6" />
          Información Personal
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
            activeTab === 'orders'
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          <Package className="mr-3 h-6 w-6" />
          Mis Pedidos
        </button>
        <button
          onClick={() => setActiveTab('payment')}
          className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
            activeTab === 'payment'
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          <CreditCard className="mr-3 h-6 w-6" />
          Métodos de Pago
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
            activeTab === 'settings'
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          <Settings className="mr-3 h-6 w-6" />
          Configuración
        </button>
        <button
          className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-red-600 hover:bg-red-50 hover:text-red-700"
        >
          <LogOut className="mr-3 h-6 w-6" />
          Cerrar Sesión
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
