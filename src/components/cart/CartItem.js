import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';

const CartItem = ({ item }) => {
  const [productDetails, setProductDetails] = useState(null);
  const { fetchProductDetails, removeFromCart, updateQuantity } = useCart();

  useEffect(() => {
    const loadProductDetails = async () => {
      const details = await fetchProductDetails(item.id);
      if (details) {
        setProductDetails(details);
      }
    };

    loadProductDetails();
  }, [item.id, fetchProductDetails]);

  if (!productDetails) {
    return <div className="text-center py-4">Cargando...</div>;
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(price);
  };

  const handleQuantityChange = (newQuantity) => {
    updateQuantity(item.id, newQuantity);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center py-4 border-b">
      <div className="flex flex-col sm:flex-row items-center mb-4 sm:mb-0">
        <img src={productDetails.thumbnail} alt={productDetails.title} className="h-20 w-20 object-cover mr-4 mb-2 sm:mb-0" />
        <div>
          <p className="text-lg font-semibold text-gray-900">{productDetails.title}</p>
          <p className="text-sm text-gray-500">Precio: {formatPrice(productDetails.netPrice)}</p>
          <p className="text-sm text-gray-500">Stock disponible: {productDetails.stock}</p>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <div className="flex items-center mb-2">
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className="bg-gray-200 text-gray-700 px-2 py-1 rounded-l"
            disabled={item.quantity <= 1}
          >
            -
          </button>
          <span className="bg-gray-100 px-4 py-1">{item.quantity}</span>
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="bg-gray-200 text-gray-700 px-2 py-1 rounded-r"
            disabled={item.quantity >= productDetails.stock}
          >
            +
          </button>
        </div>
        <p className="text-lg text-gray-900 mt-2">{formatPrice(productDetails.netPrice * item.quantity)}</p>
        <button
          onClick={() => removeFromCart(item.id)}
          className="text-red-600 hover:text-red-800 text-sm mt-2"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default CartItem;
