import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom"; // Importa useNavigate

export default function ProductList() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate(); // Inicializa useNavigate

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

  const ProductCard = ({ product, isLoading }) => (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden transform sm:scale-90 md:scale-100 transition-all duration-300 ease-in-out"
      style={{ cursor: "pointer" }} // Aquí agregamos la propiedad cursor: pointer
      onClick={() => {
        if (!isLoading) {
          // Redirige a la página de detalles del producto usando el id
          navigate(`/productdetail/${product.id}`);
        }
      }}
    >
      <div className="p-4 text-center">
        <h2 className="font-medium text-2xl sm:text-xl md:text-2xl mb-2 h-14 line-clamp-2">
          {isLoading ? (
            <div className="bg-gray-300 h-6 w-3/4 mx-auto mb-2 rounded animate-pulse"></div>
          ) : (
            <span className="text-3xl sm:text-2xl md:text-2xl">{product.title}</span>
          )}
        </h2>
        <div className="w-3/4 mx-auto sm:w-full sm:mx-0 aspect-square relative bg-gray-200 rounded-lg overflow-hidden">
          {isLoading ? (
            <div className="w-full h-full bg-gray-300 animate-pulse"></div>
          ) : (
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="mt-4">
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
                <span className="text-gray-500 line-through">${product.price}</span>
                <span className="text-xl font-bold">${product.salePrice}</span>
              </div>
            </>
          )}
          
          {/* Redirige cuando no esté cargando */}
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
            disabled={isLoading}
          >
            AÑADIR AL CARRITO
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading
          ? Array(8).fill().map((_, index) => (
              <ProductCard key={index} product={{}} isLoading={true} />
            ))
          : products.map((product) => (
              <ProductCard key={product.id} product={product} isLoading={false} />
            ))}
      </div>

      {openDialog && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-5xl w-full overflow-auto">
            <h2 className="text-xl font-bold mb-4">Vehículos Compatibles - {selectedProduct.reference}</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse border border-gray-700">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 px-4 text-left font-semibold text-gray-black">MARCA</th>
                    <th className="py-2 px-4 text-left font-semibold text-gray-black">MODELO</th>
                    <th className="py-2 px-4 text-left font-semibold text-gray-black">AÑO</th>
                    <th className="py-2 px-4 text-left font-semibold text-gray-black">TAMAÑO MOTOR</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(selectedProduct.compatibleVehicles) && selectedProduct.compatibleVehicles.map((vehicle, index) => (
                    <tr key={index} className="border-t">
                      <td className="py-2 px-4">{vehicle.brand}</td>
                      <td className="py-2 px-4">{vehicle.model}</td>
                      <td className="py-2 px-4">{vehicle.year}</td>
                      <td className="py-2 px-4">{vehicle.engineSize}cc</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              className="mt-4 w-full bg-red-600 text-white rounded py-1.5 hover:bg-red-700"
              onClick={() => setOpenDialog(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
