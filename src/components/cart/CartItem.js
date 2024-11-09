// src/components/cart/CartItem.jsx
import React from 'react';

const CartItem = ({ item, removeItem }) => {
  return (
    <div className="flex justify-between items-center py-4 border-b">
      <div className="flex items-center">
        <img src={item.image} alt={item.name} className="h-20 w-20 object-cover mr-4" />
        <div>
          <p className="text-lg font-semibold text-gray-900">{item.name}</p>
          <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
        </div>
      </div>
      <div>
        <p className="text-lg text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
        <button
          onClick={() => removeItem(item.id)}
          className="text-red-600 hover:text-red-800 text-sm mt-2"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default CartItem;
