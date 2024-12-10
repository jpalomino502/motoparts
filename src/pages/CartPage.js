import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";

const CartPage = () => {
  const { cart, fetchProductDetails } = useCart();
  const [cartWithDetails, setCartWithDetails] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const loadCartDetails = async () => {
      const detailedCart = await Promise.all(
        cart.map(async (item) => {
          if (!item.id) {
            console.error("Producto sin ID:", item);
            return null;
          }

          const details = await fetchProductDetails(item.id);
          if (!details) {
            return null;
          }

          return {
            ...item,
            ...details,
          };
        })
      );

      const filteredCart = detailedCart.filter(item => item !== null);

      const totalItems = filteredCart.reduce((acc, item) => acc + item.quantity, 0);
      const totalPrice = filteredCart.reduce((acc, item) => acc + item.netPrice * item.quantity, 0);

      setCartWithDetails(filteredCart);
      setTotalItems(totalItems);
      setTotalPrice(totalPrice);
    };

    loadCartDetails();
  }, [cart, fetchProductDetails]);

  const checkout = () => {
    alert("Procediendo al pago...");
  };

  return (
    <div className='flex-grow px-4 py-4 sm:px-6 lg:py-10'>

    <div>
      <header className="bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Carrito de Compras</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-3/4">
              {cartWithDetails.length === 0 ? (
                <p className="text-lg text-gray-900">Tu carrito está vacío</p>
              ) : (
                cartWithDetails.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))
              )}
            </div>

            <div className="w-full lg:w-1/4">
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
    </div>
  );
};

export default CartPage;
