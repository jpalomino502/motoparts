import { Truck, Shield, CreditCard } from 'lucide-react';

export default function Features() {
  return (
    <div className="mb-12 px-4">
      {/* Título principal */}
      <h2 className="text-4xl sm:text-5xl font-bold text-center mb-8">
        Con NKS Compras, ¡tú ganas!
      </h2>

      {/* Sección de características */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            icon: <Shield className="h-12 w-12 text-blue-600 mb-6" />,
            title: "Compra Segura",
            desc: "Realiza tus compras con confianza gracias a nuestra protección.",
          },
          {
            icon: <CreditCard className="h-12 w-12 text-blue-600 mb-6" />,
            title: "Pago en Línea",
            desc: "Usa múltiples métodos de pago de forma rápida y sencilla.",
          },
          {
            icon: <Truck className="h-12 w-12 text-blue-600 mb-6" />,
            title: "Recíbelo en Casa",
            desc: "Entrega rápida y confiable directamente en tu hogar.",
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="bg-gray-50 border border-gray-200 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow flex flex-col items-center text-center"
          >
            <div className="flex items-center justify-center">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mt-4">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm mt-2">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
