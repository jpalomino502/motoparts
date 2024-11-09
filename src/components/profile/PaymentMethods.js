// src/components/ProfilePage/PaymentMethods.jsx
import { CreditCard } from 'lucide-react';

const PaymentMethods = () => {
  return (
    <div className="px-4 py-5 sm:px-6">
      <h3 className="text-lg leading-6 font-medium text-gray-900">Métodos de Pago</h3>
      <div className="mt-5 border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          <li className="py-4 flex items-center justify-between">
            <div className="flex items-center">
              <CreditCard className="h-8 w-8 text-gray-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Visa terminada en 1234</p>
                <p className="text-sm text-gray-500">Expira 12/2025</p>
              </div>
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-800">Editar</button>
          </li>
        </ul>
      </div>
      <div className="mt-6">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
          Agregar Método de Pago
        </button>
      </div>
    </div>
  );
};

export default PaymentMethods;
