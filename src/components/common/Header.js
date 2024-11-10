import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, Heart, User, Tag, Info, Phone } from 'lucide-react';
import LoginModal from './LoginModal';
import { useAuth } from '../../hooks/useAuth';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.png';

export default function Header({ setIsMenuOpen, categories }) {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const { user } = useAuth();
  const [activeLink, setActiveLink] = useState('');
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path.includes('products')) {
      setActiveLink('productos');
    } else if (path.includes('favorites')) {
      setActiveLink('favoritos');
    } else if (path.includes('cart')) {
      setActiveLink('carrito');
    } else if (path.includes('profile')) {
      setActiveLink('perfil');
    } else {
      setActiveLink('');
    }
  }, [location]);

  const handleModalClose = () => {
    setLoginModalOpen(false);
    setActiveLink('');
  };

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" onClick={() => setActiveLink('')}>
                <img src={logo} alt="Logo" className="h-12 w-auto" />
              </Link>
            </div>

            <nav className="hidden md:flex items-center space-x-4">
              <Link
                to="/products"
                className={`px-3 py-2 text-sm font-medium flex items-center ${
                  activeLink === 'productos' ? 'active-link' : 'text-gray-600 hover:text-[#201c1c] hover-link'
                }`}
              >
                <Tag className="h-4 w-4 mr-1" />
                Productos
              </Link>

              <Link
                to="/favorites"
                className={`px-3 py-2 text-sm font-medium flex items-center ${
                  activeLink === 'favoritos' ? 'active-link' : 'text-gray-600 hover:text-[#201c1c] hover-link'
                }`}
              >
                <Heart className="h-4 w-4 mr-1" />
                Favoritos
              </Link>

              <Link
                to="/cart"
                className={`px-3 py-2 text-sm font-medium flex items-center ${
                  activeLink === 'carrito' ? 'active-link' : 'text-gray-600 hover:text-[#201c1c] hover-link'
                }`}
              >
                <ShoppingCart className="h-4 w-4 mr-1" />
                Carrito
              </Link>

              <Link
                to="/about"
                className={`px-3 py-2 text-sm font-medium flex items-center ${
                  activeLink === 'about' ? 'active-link' : 'text-gray-600 hover:text-[#201c1c] hover-link'
                }`}
              >
                <Info className="h-4 w-4 mr-1" />
                Quienes Somos
              </Link>

              <Link
                to="/contact"
                className={`px-3 py-2 text-sm font-medium flex items-center ${
                  activeLink === 'contact' ? 'active-link' : 'text-gray-600 hover:text-[#201c1c] hover-link'
                }`}
              >
                <Phone className="h-4 w-4 mr-1" />
                Contáctanos
              </Link>

              {user ? (
                <Link
                  to="/profile"
                  className={`px-3 py-2 text-sm font-medium flex items-center ${
                    activeLink === 'perfil' ? 'active-link' : 'text-gray-600 hover:text-[#201c1c] hover-link'
                  }`}
                >
                  <User className="h-4 w-4 mr-1" />
                  Perfil
                </Link>
              ) : (
                <button
                  onClick={() => {
                    setActiveLink('login');
                    setLoginModalOpen(true);
                  }}
                  className={`px-3 py-2 text-sm font-medium flex items-center ${
                    activeLink === 'login' ? 'active-link' : 'text-gray-600 hover:text-[#201c1c] hover-link'
                  }`}
                >
                  <User className="h-4 w-4 mr-1" />
                  Iniciar Sesión
                </button>
              )}
            </nav>

            <button
              className="md:hidden p-2 rounded-full text-gray-600 hover:text-[#201c1c]"
              onClick={() => setIsMenuOpen(prev => !prev)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={handleModalClose}
      />
    </>
  );
}
