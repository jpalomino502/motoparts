import { User, Package, CreditCard, Settings, LogOut } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => (
  <nav className="space-y-1">
    {[
      { name: 'Información Personal', icon: User, tab: 'personal-info' },
      { name: 'Mis Pedidos', icon: Package, tab: 'orders' },
      { name: 'Métodos de Pago', icon: CreditCard, tab: 'payment' },
      { name: 'Configuración', icon: Settings, tab: 'settings' },
    ].map(({ name, icon: Icon, tab }) => (
      <button
        key={tab}
        onClick={() => setActiveTab(tab)}
        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
          activeTab === tab ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        }`}
      >
        <Icon className="mr-3 h-6 w-6" />
        {name}
      </button>
    ))}
    <button className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-red-600 hover:bg-red-50 hover:text-red-700">
      <LogOut className="mr-3 h-6 w-6" />
      Cerrar Sesión
    </button>
  </nav>
);

export default Sidebar;
