import React, { useState, useEffect } from "react";
import {
  ShoppingCart,
  Menu,
  Heart,
  User,
  Tag,
  Info,
  Phone,
  X,
} from "lucide-react";
import LoginModal from "./LoginModal";
import { useAuth } from "../../hooks/useAuth";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.webp";

export default function Header() {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const { user } = useAuth();
  const [activeLink, setActiveLink] = useState("");
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path.includes("products")) {
      setActiveLink("productos");
    } else if (path.includes("favorites")) {
      setActiveLink("favoritos");
    } else if (path.includes("cart")) {
      setActiveLink("carrito");
    } else if (path.includes("profile")) {
      setActiveLink("perfil");
    } else if (path.includes("about")) {
      setActiveLink("about");
    } else if (path.includes("contact")) {
      setActiveLink("contact");
    } else {
      setActiveLink("");
    }
  }, [location]);

  const handleModalClose = () => {
    setLoginModalOpen(false);
    setActiveLink("");
  };

  const handleSideMenuToggle = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
    setIsSideMenuOpen(false);
  };

  const renderNavLinks = (isMobile = false) => {
    const linkClass = isMobile
      ? "block px-4 py-3 text-base font-medium w-full text-left mb-4"
      : "px-3 py-2 text-sm font-medium flex items-center";

    const links = [
      { to: "/products", icon: Tag, text: "Productos", name: "productos" },
      { to: "/about", icon: Info, text: "Quienes Somos", name: "about" },
      { to: "/contact", icon: Phone, text: "Contáctanos", name: "contact" },
    ];

    return (
      <>
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.to}
            className={`${linkClass} ${activeLink === link.name
                ? "active-link"
                : "text-white hover:text-white hover-link"
              }`}
            onClick={() => handleLinkClick(link.name)}
          >
            <link.icon
              className={`${isMobile ? "h-5 w-5 mr-3 inline" : "h-4 w-4 mr-1"}`}
            />
            {link.text}
          </Link>
        ))}
        {user && (
          <>
            <Link
              to="/favorites"
              className={`${linkClass} ${activeLink === "favoritos"
                  ? "active-link"
                  : "text-white hover:text-white hover-link"
                }`}
              onClick={() => handleLinkClick("favoritos")}
            >
              <Heart
                className={`${isMobile ? "h-5 w-5 mr-3 inline" : "h-4 w-4 mr-1"
                  }`}
              />
              Favoritos
            </Link>
          </>
        )}
        {user ? (
          <Link
            to="/profile"
            className={`${linkClass} ${activeLink === "perfil"
                ? "active-link"
                : "text-white hover:text-white hover-link"
              }`}
            onClick={() => handleLinkClick("perfil")}
          >
            <User
              className={`${isMobile ? "h-5 w-5 mr-3 inline" : "h-4 w-4 mr-1"}`}
            />
            Perfil
          </Link>
        ) : (
          <button
            onClick={() => {
              setActiveLink("login");
              setLoginModalOpen(true);
              setIsSideMenuOpen(false);
            }}
            className={`${linkClass} ${activeLink === "login"
                ? "active-link"
                : "text-white hover:text-white hover-link"
              }`}
          >
            <User
              className={`${isMobile ? "h-5 w-5 mr-3 inline" : "h-4 w-4 mr-1"}`}
            />
            Iniciar Sesión
          </button>
        )}

        <Link
          to="/cart"
          className={`${linkClass} ${activeLink === "carrito"
              ? "active-link"
              : "text-white hover:text-white hover-link"
            }`}
          onClick={() => handleLinkClick("carrito")}
        >
          <ShoppingCart
            className={`${isMobile ? "h-5 w-5 mr-3 inline" : "h-5 w-5"}`}
          />
          {isMobile ? "Carrito" : ""}
        </Link>
      </>
    );
  };

  return (
    <>
      <header className="bg-black shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <Link to="/" onClick={() => handleLinkClick("")}>
                <img src={logo} alt="Logo" className="h-16 w-auto" />
              </Link>
            </div>

            <nav className="hidden md:flex items-center space-x-4">
              {renderNavLinks()}
            </nav>

            <button
              className="md:hidden p-2 rounded-full text-white hover:text-white"
              onClick={handleSideMenuToggle}
              aria-label="Abrir menú"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Content Padding Below Header */}
      <div className="pt-20">
        {/* Main content goes here */}
      </div>

      <div
        className={`fixed inset-0 z-50 ${isSideMenuOpen ? "block" : "hidden"}`}
        role="dialog"
        aria-modal="true"
      >
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          aria-hidden="true"
          onClick={handleSideMenuToggle}
        ></div>
        <nav className="fixed top-0 right-0 bottom-0 flex flex-col w-80 max-w-sm py-8 px-6 bg-black border-l overflow-y-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-white">Menú</h2>
            <button
              className="rounded-full p-2 text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-600"
              onClick={handleSideMenuToggle}
              aria-label="Cerrar menú"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          {renderNavLinks(true)}
        </nav>
      </div>

      <LoginModal isOpen={isLoginModalOpen} onClose={handleModalClose} />
    </>
  );
}
