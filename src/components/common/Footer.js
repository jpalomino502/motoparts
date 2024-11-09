export default function Footer() {
    return (
      <footer className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Acerca de MotoPartes</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Quiénes somos</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Trabaja con nosotros</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Términos y condiciones</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Política de privacidad</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Ayuda</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Preguntas frecuentes</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Envíos</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Devoluciones</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Contacto</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Redes Sociales</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">YouTube</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Descarga nuestra app</h3>
              <div className="flex space-x-4">
                <a href="#" className="bg-white text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">App Store</a>
                <a href="#" className="bg-white text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">Google Play</a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>&copy; 2024 MotoPartes. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    );
  }
  