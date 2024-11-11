import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './admin/AdminPage'; 
import CartPage from './pages/CartPage';
import ContactPage from './pages/ContactPage';
import FavoritesPage from './pages/FavoritesPage';
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
        <main className="flex-grow px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductPage />} />
              <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/" />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
