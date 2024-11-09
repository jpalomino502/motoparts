export default function MobileMenu({ isMenuOpen }) {
    return (
      isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#" className="text-gray-600 hover:bg-blue-50 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">Ofertas</a>
            {/* <a href="#" className="text-gray-600 hover:bg-blue-50 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">Categorías</a> */}
            <a href="#" className="text-gray-600 hover:bg-blue-50 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">Favoritos</a>
            <a href="#" className="text-gray-600 hover:bg-blue-50 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">Carrito</a>
            <a href="#" className="text-gray-600 hover:bg-blue-50 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">Perfil</a>
          </div>
        </div>
      )
    );
  }
  