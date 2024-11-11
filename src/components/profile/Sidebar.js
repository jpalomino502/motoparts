import React from 'react';
import { User, Package, CreditCard, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = '/';
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

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
          <Settings className="mr-3 h-6 w-6" />
          Configuración
        </button>
        <button
          onClick={handleLogout}
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
