import React from "react";
import { useCart } from "../context/CartContext"; // Importa el contexto de carrito
import CartItem from "../components/cart/CartItem"; // Componente de cada producto en el carrito
import CartSummary from "../components/cart/CartSummary"; // Componente para resumen de carrito

const CartPage = () => {
  const { cart, removeFromCart } = useCart(); // Accede al carrito desde el contexto global

  // Calcula el total de artículos y el precio total
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.netPrice * item.quantity, 0);

  const checkout = () => {
    alert("Procediendo al pago...");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Carrito de Compras</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex gap-6">
            <div className="w-full md:w-3/4">
              {cart.length === 0 ? (
                <p className="text-lg text-gray-900">Tu carrito está vacío</p>
              ) : (
                cart.map((item) => (
                  <CartItem key={item.id} item={item} removeItem={removeFromCart} />
                ))
              )}
            </div>

            <div className="w-full md:w-1/4">
              <CartSummary
                totalItems={totalItems}
                totalPrice={totalPrice}
                checkout={checkout}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CartPage;
