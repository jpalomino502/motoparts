import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './admin/AdminPage'; 
import Header from './components/common/Header';
import MobileMenu from './components/common/MobileMenu';
import Footer from './components/common/Footer';
import { useAuth } from './context/AuthContext';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Header setIsMenuOpen={setIsMenuOpen} />
        <MobileMenu isMenuOpen={isMenuOpen} />
        <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/" />} />
            <Route path="/admin" element={user ? <AdminPage /> : <Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
