import { useState } from "react"

export default function Component() {
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const products = [
    {
      id: 1,
      name: "FILTRO DE AIRE TIPO ORIGINAL DE ALTO FLUJO BAJAJ BOXER CT 100",
      reference: "C1A2578",
      originalPrice: "16.000",
      salePrice: "12.000",
      image: "/placeholder.svg?height=200&width=200",
      applications: [
        { brand: "BAJAJ", description: "Boxer CT 100" },
        { brand: "BAJAJ", description: "Boxer BM 100" },
        { brand: "BAJAJ", description: "Boxer S" },
      ]
    },
    {
      id: 2,
      name: "FILTRO DE AIRE PARA HONDA CBF150",
      reference: "H2B3689",
      originalPrice: "18.000",
      salePrice: "14.500",
      image: "/placeholder.svg?height=200&width=200",
      applications: [
        { brand: "HONDA", description: "CBF150" },
        { brand: "HONDA", description: "CB150 Invicta" },
      ]
    },
    {
      id: 3,
      name: "FILTRO DE AIRE YAMAHA FZ16",
      reference: "Y3C4790",
      originalPrice: "20.000",
      salePrice: "16.000",
      image: "/placeholder.svg?height=200&width=200",
      applications: [
        { brand: "YAMAHA", description: "FZ16" },
        { brand: "YAMAHA", description: "FZ25" },
      ]
    },
    {
      id: 4,
      name: "FILTRO DE AIRE SUZUKI GN125",
      reference: "S4D5801",
      originalPrice: "15.000",
      salePrice: "11.500",
      image: "/placeholder.svg?height=200&width=200",
      applications: [
        { brand: "SUZUKI", description: "GN125" },
        { brand: "SUZUKI", description: "EN125" },
      ]
    },
    {
      id: 5,
      name: "FILTRO DE AIRE KAWASAKI NINJA 300",
      reference: "K5E6912",
      originalPrice: "22.000",
      salePrice: "18.000",
      image: "/placeholder.svg?height=200&width=200",
      applications: [
        { brand: "KAWASAKI", description: "Ninja 300" },
        { brand: "KAWASAKI", description: "Z300" },
      ]
    },
    {
      id: 6,
      name: "FILTRO DE AIRE KTM DUKE 200",
      reference: "T6F7023",
      originalPrice: "21.000",
      salePrice: "17.500",
      image: "/placeholder.svg?height=200&width=200",
      applications: [
        { brand: "KTM", description: "Duke 200" },
        { brand: "KTM", description: "RC 200" },
      ]
    },
    {
      id: 7,
      name: "FILTRO DE AIRE TVS APACHE RTR 160",
      reference: "V7G8134",
      originalPrice: "17.000",
      salePrice: "13.500",
      image: "/placeholder.svg?height=200&width=200",
      applications: [
        { brand: "TVS", description: "Apache RTR 160" },
        { brand: "TVS", description: "Apache RTR 180" },
      ]
    },
    {
      id: 8,
      name: "FILTRO DE AIRE HERO SPLENDOR",
      reference: "H8H9245",
      originalPrice: "14.000",
      salePrice: "10.500",
      image: "/placeholder.svg?height=200&width=200",
      applications: [
        { brand: "HERO", description: "Splendor" },
        { brand: "HERO", description: "Passion Pro" },
      ]
    },
    {
      id: 9,
      name: "FILTRO DE AIRE ROYAL ENFIELD CLASSIC 350",
      reference: "R9I0356",
      originalPrice: "19.000",
      salePrice: "15.500",
      image: "/placeholder.svg?height=200&width=200",
      applications: [
        { brand: "ROYAL ENFIELD", description: "Classic 350" },
        { brand: "ROYAL ENFIELD", description: "Meteor 350" },
      ]
    },
    {
      id: 10,
      name: "FILTRO DE AIRE PULSAR NS200",
      reference: "P0J1467",
      originalPrice: "18.500",
      salePrice: "14.000",
      image: "/placeholder.svg?height=200&width=200",
      applications: [
        { brand: "BAJAJ", description: "Pulsar NS200" },
        { brand: "BAJAJ", description: "Pulsar RS200" },
      ]
    },
  ]

  return (
    <div className="p-6">
      <h2 className="text-4xl font-bold text-center mb-8">
        <span className="text-red-600">LO MEJOR EN</span>
        <br />
        <span className="text-white inline-block mt-2" style={{ WebkitTextStroke: '1px red' }}>
          FILTROS DE AIRE
        </span>
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 text-center">
              <h2 className="font-medium text-sm mb-2 line-clamp-2">{product.name}</h2>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-contain mx-auto"
              />
              <div className="mt-4">
                <p className="text-sm mb-1">REFERENCIA {product.reference}</p>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="text-gray-500 line-through">${product.originalPrice}</span>
                  <span className="text-xl font-bold">${product.salePrice}</span>
                </div>
                
                <button 
                  className="w-full mb-2 text-red-600 text-sm border border-red-600 rounded py-1.5 hover:bg-red-50"
                  onClick={() => {
                    setSelectedProduct(product)
                    setOpenDialog(true)
                  }}
                >
                  VER TODAS LAS APLICACIONES
                </button>

                <button className="w-full bg-red-600 text-white rounded py-1.5 hover:bg-red-700">
                  AÑADIR AL CARRITO
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {openDialog && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Aplicaciones - {selectedProduct.reference}</h2>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">MARCA</th>
                  <th className="text-left">DESCRIPCIÓN</th>
                </tr>
              </thead>
              <tbody>
                {selectedProduct.applications.map((app, index) => (
                  <tr key={index}>
                    <td className="font-medium">{app.brand}</td>
                    <td>{app.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
  )
}