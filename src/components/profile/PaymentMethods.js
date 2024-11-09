import { CreditCard } from 'lucide-react';

const PaymentMethods = () => (
  <div className="px-4 py-5 sm:px-6">
    <h3 className="text-lg font-medium text-gray-900">Métodos de Pago</h3>
    <ul className="divide-y divide-gray-200">
      <li className="py-4 flex items-center">
        <CreditCard className="h-8 w-8 text-gray-400 mr-3" />
        <div>
          <p className="text-sm font-medium text-gray-900">Visa terminada en 1234</p>
          <p className="text-sm text-gray-500">Expira 12/2025</p>
        </div>
      </li>
    </ul>
  </div>
);

export default PaymentMethods;
