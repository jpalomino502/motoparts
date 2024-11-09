import { Truck, Shield, CreditCard } from 'lucide-react';

export default function Features() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {[
        { icon: <Truck className="h-12 w-12 text-[#201c1c] mb-4" />, title: "Envío Gratis", desc: "En pedidos superiores a $100.000" },
        { icon: <Shield className="h-12 w-12 text-[#201c1c] mb-4" />, title: "Garantía de Calidad", desc: "Todos nuestros productos están certificados" },
        { icon: <CreditCard className="h-12 w-12 text-[#201c1c] mb-4" />, title: "Pago Seguro", desc: "Múltiples opciones de pago seguro" }
      ].map((feature, index) => (
        <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          {feature.icon}
          <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
          <p className="text-gray-600">{feature.desc}</p>
        </div>
      ))}
    </div>
  );
}
