// src/components/ProfilePage/Orders.jsx
import { ChevronRight } from 'lucide-react';

const Orders = ({ orders }) => {
  return (
    <div className="px-4 py-5 sm:px-6">
      <h3 className="text-lg leading-6 font-medium text-gray-900">Mis Pedidos</h3>
      <div className="mt-5 border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          {orders.map((order) => (
            <li key={order.id} className="py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Pedido #{order.id}</p>
                  <p className="text-sm text-gray-500">{order.date}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">${order.total.toFixed(2)}</p>
                  <p className="text-sm text-gray-500">{order.status}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
          Ver Todos los Pedidos
        </button>
      </div>
    </div>
  );
};

export default Orders;
