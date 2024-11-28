import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import ProfilePage from './pages/ProfilePage';
import CartPage from './pages/CartPage';
import ContactPage from './pages/ContactPage';
import ProductDelaitPage from './pages/ProductDelaitPage';
import AboutPage from './pages/AboutPage';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import { useAuth } from './context/AuthContext';

export default function App() {
  const { user } = useAuth();

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Header />
        <main>
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductPage />} />
              <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/" />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/productdelait" element={<ProductDelaitPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
