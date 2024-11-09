import { ChevronRight } from 'lucide-react';

const Orders = ({ orders }) => (
  <div className="px-4 py-5 sm:px-6">
    <h3 className="text-lg font-medium text-gray-900">Mis Pedidos</h3>
    <div className="mt-5 border-t border-gray-200">
      <ul className="divide-y divide-gray-200">
        {orders.map((order) => (
          <li key={order.id} className="py-4 flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Pedido #{order.id}</p>
              <p className="text-sm text-gray-500">{order.date}</p>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default Orders;
