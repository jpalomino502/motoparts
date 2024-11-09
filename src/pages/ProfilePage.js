// src/pages/ProfilePage.jsx
import { useState } from 'react';
import Sidebar from '../components/profile/Sidebar';
import PersonalInfo from '../components/profile/PersonalInfo';
import Orders from '../components/profile/Orders';
import PaymentMethods from '../components/profile/PaymentMethods';
import AccountSettings from '../components/profile/AccountSettings';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('personal-info');
  const user = {
    name: 'Juan Pérez',
    email: 'juan.perez@example.com',
    phone: '+34 123 456 789',
    address: 'Calle Principal 123, Madrid, España',
  };
  const orders = [
    { id: '1234', date: '2023-05-15', total: 150.99, status: 'Entregado' },
    { id: '5678', date: '2023-06-02', total: 89.50, status: 'En camino' },
    { id: '9012', date: '2023-06-10', total: 210.75, status: 'Procesando' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Mi Perfil</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex flex-col md:flex-row gap-6">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="w-full md:w-3/4">
              <div className="bg-white shadow overflow-hidden sm:rounded-lg h-full">
                <div className="h-full overflow-y-auto">
                  {activeTab === 'personal-info' && <PersonalInfo user={user} />}
                  {activeTab === 'orders' && <Orders orders={orders} />}
                  {activeTab === 'payment' && <PaymentMethods />}
                  {activeTab === 'settings' && <AccountSettings />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
