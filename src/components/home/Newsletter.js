export default function Newsletter() {
    return (
      <div className="bg-blue-50 rounded-xl shadow-md p-8 mb-12">
        <h2 className="text-3xl font-bold mb-4">Suscríbete a nuestro boletín</h2>
        <p className="text-gray-600 mb-6">Recibe las últimas ofertas y novedades directamente en tu correo.</p>
        <form className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            placeholder="Tu correo electrónico"
            className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Suscribirse
          </button>
        </form>
      </div>
    );
  }
  