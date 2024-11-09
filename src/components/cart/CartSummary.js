// src/components/cart/CartSummary.jsx
import React from 'react';

const CartSummary = ({ totalItems, totalPrice, checkout }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Resumen del Carrito</h2>
      <div className="flex justify-between text-gray-900">
        <p>Total de artículos:</p>
        <p>{totalItems}</p>
      </div>
      <div className="flex justify-between text-gray-900">
        <p>Total:</p>
        <p>${totalPrice.toFixed(2)}</p>
      </div>
      <button
        onClick={checkout}
        className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        Proceder al Pago
      </button>
    </div>
  );
};

export default CartSummary;
