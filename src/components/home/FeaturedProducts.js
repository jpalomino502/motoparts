export default function FeaturedProducts() {
  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold mb-6">Productos Destacados</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
            <img src={`https://via.placeholder.com/200?text=Producto+${i + 1}`} alt={`Producto ${i + 1}`} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">Repuesto Premium {i + 1}</h3>
              <p className="text-[#201c1c] text-xl font-bold mb-2">$99.99</p>
              <p className="text-sm text-green-600 mb-4">Envío gratis</p>
              <button className="w-full bg-[#ff0000] text-white py-2 rounded-md hover:bg-[#d70000] transition-colors">
                Agregar al carrito
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
