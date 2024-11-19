import { useState } from 'react'
import { Star, Minus, Plus, ChevronUp, ChevronDown, ChevronRight } from 'lucide-react'

export default function Component() {
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [showFullDescription, setShowFullDescription] = useState(false)

  const images = [
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400"
  ]

  const features = [
    {
      title: "REUSABLE K&N FILTER SAVES YOU MONEY:",
      description: "Washable, reusable air filter will save you up to $125 vs. purchasing multiple disposable filters (compared to MSRP in USD of corresponding OE filters for 200,000 miles of highway driving)"
    },
    {
      title: "CLEAN ONCE EVERY 5 YEARS:",
      description: "Engine air filter only needs cleaning every 75,000 miles under normal highway driving conditions (5 years based on the average miles driven per year of 15,000 miles)"
    },
    {
      title: "RUGGED CONSTRUCTION:",
      description: "Air filters are manufactured with durable, premium materials and state-of-the-art construction methods to last a lifetime"
    },
    {
      title: "REDUCES WASTE:",
      description: "Over 200 million disposable air filter packaging waste end up in landfills each year - reusable filters help reduce waste in our landfills"
    },
    {
      title: "ENGINEERED POWER:",
      description: "State-of-the-art air filter media is designed to increase horsepower and acceleration as well as improve overall engine performance"
    },
    {
      title: "EASY INSTALLATION:",
      description: "Air Filters are pre-oiled and ready to drop into your factory air box- they are one of the easiest and most cost-effective vehicle upgrades for quick performance gains"
    },
    {
      title: "4 LAYERS OF PROTECTION:",
      description: "Multiple layers of premium cotton gauze treated with a specially designed tacking agent work together to create an intricate mesh of engine filter media that is designed to block and trap harmful contaminants"
    }
  ]

  const reviews = [
    {
      id: 1,
      author: "Luis Hernández",
      rating: 5,
      date: "08/11/2024",
      comment: "La calidad del filtro está fuera de lo común, lo recomiendo totalmente por su calidad y durabilidad."
    },
    {
      id: 2,
      author: "Luis Hernández",
      rating: 5,
      date: "08/11/2024",
      comment: "La calidad del filtro está fuera de lo común, lo recomiendo totalmente por su calidad y durabilidad."
    }
  ]

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2">
          {/* Image Gallery */}
          <div className="flex gap-4 mb-8">
            <div className="hidden sm:flex flex-col gap-2">
              <ChevronUp className="w-6 h-6 mx-auto cursor-pointer" />
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-16 h-16 object-cover cursor-pointer border-2 ${
                    selectedImage === index ? 'border-red-600' : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
              <ChevronDown className="w-6 h-6 mx-auto cursor-pointer" />
            </div>
            <div className="flex-1">
              <img
                src={images[selectedImage]}
                alt="Main product image"
                className="w-full aspect-square object-cover border-2 border-purple-200 rounded-lg"
              />
            </div>
          </div>

          {/* Mobile Product Info */}
          <div className="lg:hidden">
            <h1 className="text-xl sm:text-2xl font-bold mb-4">
              FILTRO DE AIRE TIPO ORIGINAL DE ALTO FLUJO BAJAJ BOXER CT 100
            </h1>
            
            <div className="flex items-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-sm text-gray-600">2 Comentarios</span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-gray-500 line-through">$16.000</span>
              <span className="text-2xl font-bold">$12.000</span>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-4 mb-4">
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
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 text-center py-1"
                  />
                  <button
                    className="px-3 py-1 border-l"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <button className="w-full bg-red-50 border border-red-600 text-red-600 py-2 rounded mb-2 hover:bg-red-100">
                AÑADIR AL CARRITO
              </button>
              <button className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">
                COMPRAR AHORA
              </button>
            </div>

            {/* Mobile Product Description */}
            <div className="border-t pt-6 mb-6">
              <h2 className="font-bold mb-4">Descripción Filtro de Aire</h2>
              <ul className="space-y-4 text-sm">
                {features.slice(0, showFullDescription ? features.length : 3).map((feature, index) => (
                  <li key={index}>
                    <span className="font-bold">{feature.title}</span> {feature.description}
                  </li>
                ))}
              </ul>
              {!showFullDescription && features.length > 3 && (
                <button
                  className="text-red-600 font-semibold mt-4 flex items-center"
                  onClick={() => setShowFullDescription(true)}
                >
                  Leer más <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              )}
            </div>
          </div>

          {/* Reviews Section */}
          <div className="border-t pt-6">
            <div className="mb-6">
              <h2 className="font-bold mb-2">Comentarios de los Clientes</h2>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold">5.0</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-600">2 Comentarios</p>
            </div>

            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                    <div>
                      <p className="font-medium">{review.author}</p>
                      <div className="flex">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500 ml-auto">{review.date}</span>
                  </div>
                  <p className="text-sm">{review.comment}</p>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 border border-gray-300 rounded py-2 hover:bg-gray-50">
              ESCRIBE UN COMENTARIO
            </button>
          </div>
        </div>

        {/* Desktop Product Info */}
        <div className="hidden lg:block lg:w-1/2">
          <h1 className="text-xl sm:text-2xl font-bold mb-4">
            FILTRO DE AIRE TIPO ORIGINAL DE ALTO FLUJO BAJAJ BOXER CT 100
          </h1>
          
          <div className="flex items-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="text-sm text-gray-600">2 Comentarios</span>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-gray-500 line-through">$16.000</span>
            <span className="text-2xl font-bold">$12.000</span>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
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
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center py-1"
                />
                <button
                  className="px-3 py-1 border-l"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <button className="w-full bg-red-50 border border-red-600 text-red-600 py-2 rounded mb-2 hover:bg-red-100">
              AÑADIR AL CARRITO
            </button>
            <button className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">
              COMPRAR AHORA
            </button>
          </div>

          {/* Desktop Product Description */}
          <div className="border-t pt-6">
            <h2 className="font-bold mb-4">Descripción Filtro de Aire</h2>
            <ul className="space-y-4 text-sm">
              {features.map((feature, index) => (
                <li key={index}>
                  <span className="font-bold">{feature.title}</span> {feature.description}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}