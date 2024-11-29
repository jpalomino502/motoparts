import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginModal = ({ isOpen, onClose }) => {
  const { login, register, resetPassword } = useAuth();
  const navigate = useNavigate();
  const [modalView, setModalView] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (modalView === 'login') {
        await login(email, password);
        navigate('/profile');
      } else if (modalView === 'register') {
        if (password !== confirmPassword) {
          setError('Las contraseñas no coinciden.');
          return;
        }
        await register(email, password, name);
        navigate('/profile');
      } else if (modalView === 'reset') {
        await resetPassword(email);
        setError('Se ha enviado un enlace de restablecimiento a tu correo electrónico.');
      }
      onClose();
    } catch (err) {
      setError('Error en la autenticación. Por favor, intenta nuevamente.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200"
          aria-label="Cerrar"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          {modalView === 'login' ? 'Iniciar Sesión' : modalView === 'register' ? 'Registrarse' : 'Restablecer Contraseña'}
        </h2>
        {error && <p className="text-red-500 text-center mb-4 bg-red-100 p-2 rounded">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          {modalView === 'register' && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Introduce tu nombre"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                required
              />
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Introduce tu correo electrónico"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              required
            />
          </div>
          {modalView === 'register' || modalView === 'login' ? (
            <>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="********"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(prev => !prev)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              {modalView === 'register' && (
                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">Confirmar contraseña</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirm-password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="********"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(prev => !prev)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      aria-label={showConfirmPassword ? 'Ocultar confirmación de contraseña' : 'Mostrar confirmación de contraseña'}
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center text-gray-600">
              <p>Introduce tu correo electrónico para recibir el enlace de restablecimiento.</p>
            </div>
          )}
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-[#121212] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition-all duration-200 ease-in-out hover:scale-105"
          >
            {modalView === 'login' ? 'Iniciar Sesión' : modalView === 'register' ? 'Registrarse' : 'Restablecer Contraseña'}
          </button>
        </form>

        <div className="text-center mt-6 space-y-2">
          {modalView === 'login' && (
            <>
              <button
                onClick={() => setModalView('reset')}
                className="text-black hover:text-[#121212] text-sm font-medium transition-colors duration-200 hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </button>
              <div>
                <button
                  onClick={() => setModalView('register')}
                  className="text-black hover:text-[#121212] text-sm font-medium transition-colors duration-200 hover:underline"
                >
                  ¿No tienes cuenta? Regístrate
                </button>
              </div>
            </>
          )}
          {modalView === 'register' && (
            <button
              onClick={() => setModalView('login')}
              className="text-black hover:text-[#121212] text-sm font-medium transition-colors duration-200 hover:underline"
            >
              ¿Ya tienes cuenta? Inicia sesión
            </button>
          )}
          {modalView === 'reset' && (
            <button
              onClick={() => setModalView('login')}
              className="text-black hover:text-[#121212] text-sm font-medium transition-colors duration-200 hover:underline"
            >
              Volver a Iniciar sesión
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
