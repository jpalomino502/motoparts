import { useState } from 'react';
import Sidebar from '../components/profile/Sidebar';
import PersonalInfo from '../components/profile/PersonalInfo';
import Orders from '../components/profile/Orders';
import PaymentMethods from '../components/profile/PaymentMethods';
import Settings from '../components/profile/Settings';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('personal-info');
  const user = { name: 'Juan Pérez', email: 'juan.perez@example.com', phone: '+34 123 456 789', address: 'Calle Principal 123, Madrid, España' };
  const orders = [
    { id: '1234', date: '2023-05-15', total: 150.99, status: 'Entregado' },
    { id: '5678', date: '2023-06-02', total: 89.50, status: 'En camino' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow py-6 px-4">
        <h1 className="text-3xl font-bold">Mi Perfil</h1>
      </header>
      <main className="max-w-7xl mx-auto py-6 px-4 flex">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="w-full md:w-3/4 ml-6 bg-white shadow rounded-lg">
          {activeTab === 'personal-info' && <PersonalInfo user={user} />}
          {activeTab === 'orders' && <Orders orders={orders} />}
          {activeTab === 'payment' && <PaymentMethods />}
          {activeTab === 'settings' && <Settings />}
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
