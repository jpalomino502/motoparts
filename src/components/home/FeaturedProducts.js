import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useCart } from '../../context/CartContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProductList() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  const navigate = useNavigate();

  useEffect(() => {
    const loadProductsFromFirestore = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsList);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener productos de Firestore:", error);
        setLoading(false);
      }
    };

    loadProductsFromFirestore();
  }, []);

  const formatPrice = (price) => {
    return `COP ${parseInt(price, 10).toLocaleString("es-CO")}`;
  };

  const ProductCard = ({ product, isLoading }) => {
    const discount = parseFloat(product.discount);
    const hasDiscount = discount > 0;
    const salePrice = product.netPrice;

    const handleAddToCart = (product) => {
      addToCart(product);
      toast.success("Producto añadido correctamente al carrito!");
    };

    return (
      <div
        className="bg-white rounded-lg shadow-md flex flex-col justify-between h-full relative p-4"
        style={{ cursor: "pointer" }}
        onClick={() => {
          if (!isLoading) {
            navigate(`/productdetail/${product.id}`);
          }
        }}
      >
        {hasDiscount && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
            {discount}% OFF
          </div>
        )}
        <div className="text-center flex flex-col justify-between flex-1">
          <h2
            className="font-medium text-2xl sm:text-xl md:text-2xl mb-2 h-14 overflow-hidden text-ellipsis whitespace-nowrap"
            title={product.title}
          >
            {isLoading ? (
              <div className="bg-gray-300 h-6 w-3/4 mx-auto mb-2 rounded animate-pulse"></div>
            ) : (
              product.title
            )}
          </h2>
          <div className="w-3/4 mx-auto sm:w-full sm:mx-0 aspect-square relative bg-gray-200 rounded-lg overflow-hidden mb-4">
            {isLoading ? (
              <div className="w-full h-full bg-gray-300 animate-pulse"></div>
            ) : (
              <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-full object-cover"
              width="200" // Añadido
              height="200" // Añadido
            />
            )}
          </div>
          <div>
            {isLoading ? (
              <>
                <div className="bg-gray-300 h-4 w-1/2 mx-auto mb-2 rounded animate-pulse"></div>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="bg-gray-300 h-4 w-1/4 rounded animate-pulse"></div>
                  <div className="bg-gray-300 h-6 w-1/4 rounded animate-pulse"></div>
                </div>
              </>
            ) : (
              <>
                <p className="text-sm mb-1">REFERENCIA {product.reference}</p>
                <div className="flex items-center justify-center gap-2 mb-4">
                  {hasDiscount ? (
                    <>
                      <span className="text-gray-500 line-through">
                        {formatPrice(product.price)}
                      </span>
                      <span className="text-xl font-bold">{formatPrice(salePrice)}</span>
                    </>
                  ) : (
                    <span className="text-xl font-bold">{formatPrice(salePrice)}</span>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
        <div className="mt-4">
          <button
            className="w-full mb-2 bg-red-50 text-red-600 text-sm border border-red-600 rounded py-1.5 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={(e) => {
              e.stopPropagation();
              if (!isLoading) {
                setSelectedProduct(product);
                setOpenDialog(true);
              }
            }}
            disabled={isLoading}
          >
            VER TODAS LAS APLICACIONES
          </button>
          <button
            className="w-full bg-red-600 text-white rounded py-1.5 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={(e) => {
              e.stopPropagation();
              if (!isLoading) {
                handleAddToCart(product);
              }
            }}
            disabled={isLoading}
          >
            AÑADIR AL CARRITO
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-4xl sm:text-5xl font-bold text-center mb-8">
        <span className="text-red-600">LO MEJOR EN</span>
        <br />
        <span className="text-gray-800 inline-block mt-2">
          FILTROS DE AIRE
        </span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading
          ? Array(8)
              .fill()
              .map((_, index) => <ProductCard key={index} product={{}} isLoading={true} />)
          : products.map((product) => (
              <ProductCard key={product.id} product={product} isLoading={false} />
            ))}
      </div>

      {openDialog && selectedProduct && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          role="dialog"
          aria-labelledby="dialog-title"
          aria-modal="true"
        >
          <div className="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-auto">
            <h2 id="dialog-title" className="text-xl font-bold mb-4">
              Vehículos Compatibles - {selectedProduct.reference}
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marca</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Modelo</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Año</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tamaño Motor</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {Array.isArray(selectedProduct.compatibleVehicles) &&
                    selectedProduct.compatibleVehicles.map((vehicle, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vehicle.brand}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vehicle.model}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vehicle.year}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vehicle.engineSize}cc</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <button
              className="mt-6 w-full bg-red-600 text-white rounded py-2 hover:bg-red-700 transition-colors"
              onClick={() => setOpenDialog(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}
