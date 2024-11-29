import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebase';
import { Star, Minus, Plus, ChevronRight } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';

export default function ProductPage() {
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const productData = [];
        querySnapshot.forEach((doc) => {
          productData.push(doc.data());
        });

        const fetchedProduct = productData[0];
        setProduct(fetchedProduct);
        setImages(fetchedProduct.additionalImages || []);
        setReviews(fetchedProduct.reviews || []);
      } catch (error) {
        console.error('Error fetching product data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductData();
  }, []);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1 order-1 sm:order-2">
            <img
              src={images[selectedImage]}
              alt={product.title || "Producto sin título"}
              className="w-full aspect-square object-cover border-2 border-purple-200 rounded-lg"
            />
            </div>
            <div className="flex sm:flex-col gap-2 order-2 sm:order-1 overflow-x-auto sm:overflow-y-auto">
              {images.map((img, index) => (
                <img
                  src={img}
                  alt={`Vista ${index + 1}`}
                  className={`w-16 h-16 object-cover cursor-pointer border-2 ${
                    selectedImage === index ? 'border-red-600' : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>

          <div className="hidden lg:block mt-8">
            <h2 className="font-bold mb-2">Comentarios de los Clientes</h2>
            {reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-medium">{review.author}</p>
                    <p className="text-sm">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">Aún no hay comentarios para este producto.</p>
            )}
            <button className="w-full mt-4 border border-gray-300 rounded py-2 hover:bg-gray-50">
              ESCRIBE UN COMENTARIO
            </button>
          </div>
        </div>

        <div className="lg:w-1/2">
          <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
          <div className="flex items-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="text-sm text-gray-600">{reviews.length} Comentarios</span>
          </div>
          <div className="flex items-center gap-4 mb-6">
            {product.discount > 0 && (
              <span className="text-gray-500 line-through">${product.price}</span>
            )}
            <span className="text-2xl font-bold">
              ${product.discount > 0 ? product.price * (1 - product.discount / 100) : product.price}
            </span>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <span className="font-medium">Cantidad</span>
            <div className="flex items-center border rounded">
              <button
                className="px-3 py-1 border-r"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="w-4 h-4" />
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 1;
                  setQuantity(Math.max(1, Math.min(value, product.stock)));
                }}
                className="w-16 text-center py-1"
              />
              <button
                className="px-3 py-1 border-l"
                onClick={() => setQuantity(Math.min(quantity + 1, product.stock))}
                disabled={quantity >= product.stock} // Desactiva el botón si la cantidad alcanza el stock
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <span className="text-sm text-gray-500">Disponibles: {product.stock}</span>
          </div>


          <button className="w-full bg-red-50 border border-red-600 text-red-600 py-2 rounded mb-2 hover:bg-red-100">
            AÑADIR AL CARRITO
          </button>
          <button className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">
            COMPRAR AHORA
          </button>

          <div className="border-t pt-6 mt-8">
            <h2 className="font-bold mb-4">Descripción del Producto</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: showFullDescription
                  ? product.description
                  : `${product.description.slice(0, 150)}...`,
              }}
              className="text-sm text-black"
            />
            {!showFullDescription && (
              <button
                className="text-red-600 font-semibold mt-4 flex items-center"
                onClick={() => setShowFullDescription(true)}
              >
                Leer más <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="lg:hidden border-t pt-6 mt-6">
        <h2 className="font-bold mb-2">Comentarios de los Clientes</h2>
        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm font-medium">{review.author}</p>
                <p className="text-sm">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">Aún no hay comentarios para este producto.</p>
        )}
        <button className="w-full mt-4 border border-gray-300 rounded py-2 hover:bg-gray-50">
          ESCRIBE UN COMENTARIO
        </button>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="max-w-7xl mx-auto p-4 animate-pulse">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2">
          <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
          <div className="flex gap-2 justify-center">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="w-16 h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>

        <div className="lg:w-1/2">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-6"></div>
          <div className="h-10 bg-gray-200 rounded mb-2"></div>
          <div className="h-10 bg-gray-200 rounded mb-6"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-gray-100 rounded-lg p-4">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

