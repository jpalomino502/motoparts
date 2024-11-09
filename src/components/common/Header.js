import React, { useState } from 'react';
import { ShoppingCart, Menu, Heart, User } from 'lucide-react';
import LoginModal from './LoginModal';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

export default function Header({ setIsMenuOpen, categories }) {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const { user } = useAuth();
  const [activeLink, setActiveLink] = useState('');

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" onClick={() => setActiveLink('')}>
                <img src={logo} alt="Logo" className="h-16 w-auto" />
              </Link>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-4">
              {/* Botón de Ofertas con filtro de descuento */}
              <Link
                to="/products?discount=true" // Enlace con filtro de descuento
                onClick={() => setActiveLink('ofertas')}
                className={`px-3 py-2 text-sm font-medium ${
                  activeLink === 'ofertas' ? 'active-link' : 'text-gray-600 hover:text-[#201c1c] hover-link'
                }`}
              >
                Ofertas
              </Link>

              {/* Otros enlaces */}
              <button
                onClick={() => setActiveLink('favoritos')}
                className={`px-3 py-2 text-sm font-medium flex items-center ${
                  activeLink === 'favoritos' ? 'active-link' : 'text-gray-600 hover:text-[#201c1c] hover-link'
                }`}
              >
                <Heart className="h-4 w-4 mr-1" />
                Favoritos
              </button>
              <button
                onClick={() => setActiveLink('carrito')}
                className={`px-3 py-2 text-sm font-medium flex items-center ${
                  activeLink === 'carrito' ? 'active-link' : 'text-gray-600 hover:text-[#201c1c] hover-link'
                }`}
              >
                <ShoppingCart className="h-4 w-4 mr-1" />
                Carrito
              </button>
              {user ? (
                <Link
                  to="/profile"
                  onClick={() => setActiveLink('perfil')}
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

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} />
    </>
  );
}
