import React, { useState } from 'react';
import { Star, ShoppingCart, Heart, Share2, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProductDetail() {
  const [mainImage, setMainImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const product = {
    name: "Lorem Ipsum Product Name",
    category: "Lorem Category",
    price: 399.99,
    originalPrice: 499.99,
    rating: 4.8,
    reviewCount: 124,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    features: [
      "Lorem ipsum dolor sit amet",
      "Consectetur adipiscing elit",
      "Sed do eiusmod tempor",
      "Incididunt ut labore et dolore",
      "Magna aliqua",
      "Ut enim ad minim veniam",
    ],
    images: [
      "https://via.placeholder.com/500",
      "https://via.placeholder.com/500",
      "https://via.placeholder.com/500",
      "https://via.placeholder.com/500",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Red", "Blue", "Green", "Black"],
  };

  const relatedProducts = [
    { id: 1, name: "Lorem Ipsum Gloves", price: 59.99, image: "https://via.placeholder.com/200" },
    { id: 2, name: "Lorem Ipsum Jacket", price: 199.99, image: "https://via.placeholder.com/200" },
    { id: 3, name: "Lorem Ipsum Boots", price: 149.99, image: "https://via.placeholder.com/200" },
    { id: 4, name: "Lorem Ipsum Pants", price: 129.99, image: "https://via.placeholder.com/200" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <nav className="text-sm mb-6">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <a href="#" className="text-red-600 hover:text-red-800">Inicio</a>
              <ChevronRight className="h-4 w-4 mx-2" />
            </li>
            <li className="flex items-center">
              <a href="#" className="text-red-600 hover:text-red-800">{product.category}</a>
              <ChevronRight className="h-4 w-4 mx-2" />
            </li>
            <li className="text-gray-500">{product.name}</li>
          </ol>
        </nav>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Images */}
          <div className="md:w-1/2">
            <div className="relative">
              <img 
                src={product.images[mainImage]} 
                alt={`Product image ${mainImage + 1}`} 
                className="w-full h-auto rounded-lg shadow-md"
              />
              <button 
                onClick={() => setMainImage((prev) => (prev > 0 ? prev - 1 : product.images.length - 1))}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6 text-gray-600" />
              </button>
              <button 
                onClick={() => setMainImage((prev) => (prev < product.images.length - 1 ? prev + 1 : 0))}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6 text-gray-600" />
              </button>
            </div>
            <div className="flex mt-4 gap-4 overflow-x-auto pb-2">
              {product.images.map((img, index) => (
                <button 
                  key={index}
                  onClick={() => setMainImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden ${mainImage === index ? 'ring-2 ring-red-500' : ''}`}
                >
                  <img src={img} alt={`Product thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">{product.rating} ({product.reviewCount} reviews)</span>
            </div>
            <div className="mb-4">
              <span className="text-3xl font-bold text-red-600">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="ml-2 text-xl text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>
            <p className="text-gray-600 mb-6">{product.description}</p>
            
            {/* Color and Size Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Color:</h3>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button key={color} className="px-4 py-2 border rounded-md hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500">
                    {color}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Size:</h3>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button key={size} className="px-4 py-2 border rounded-md hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500">
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex items-center mb-6">
              <label htmlFor="quantity" className="mr-4 text-lg font-semibold">Quantity:</label>
              <div className="flex items-center border rounded-md">
                <button 
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="px-3 py-1 text-xl"
                >
                  -
                </button>
                <input 
                  type="number" 
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-12 text-center border-x"
                />
                <button 
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="px-3 py-1 text-xl"
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex gap-4 mb-6">
              <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md flex items-center justify-center">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </button>
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md">
                <Heart className="h-5 w-5" />
              </button>
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md">
                <Share2 className="h-5 w-5" />
              </button>
            </div>

            {/* Product Features */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Features:</h3>
              <ul className="list-disc list-inside text-gray-600">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((related) => (
              <div key={related.id} className="bg-white rounded-lg shadow-md p-4">
                <img src={related.image} alt={related.name} className="w-full h-32 object-cover rounded-md mb-4" />
                <h3 className="text-md font-medium text-gray-800">{related.name}</h3>
                <p className="text-red-600 font-bold">${related.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
