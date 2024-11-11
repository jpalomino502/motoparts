import React, { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
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

  useEffect(() => {
    // Deshabilitar scroll cuando el modal esté abierto
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto'; // Restaurar el scroll al desmontar el modal
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
        await resetPassword(email); // Función para restablecer la contraseña
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
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          aria-label="Cerrar"
        >
          &times;
        </button>
        <h2 className="text-lg font-bold text-center mb-4">
          {modalView === 'login' ? 'Iniciar Sesión' : modalView === 'register' ? 'Registrarse' : 'Restablecer Contraseña'}
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {modalView === 'register' && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Introduce tu nombre"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#201c1c] focus:border-[#201c1c] sm:text-sm"
                required
              />
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Introduce tu correo electrónico"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#201c1c] focus:border-[#201c1c] sm:text-sm"
              required
            />
          </div>
          {modalView === 'register' || modalView === 'login' ? (
            <>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="********"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#201c1c] focus:border-[#201c1c] sm:text-sm"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(prev => !prev)}
                    className="absolute inset-y-0 right-2 flex items-center"
                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
                  </button>
                </div>
              </div>
              {modalView === 'register' && (
                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirmar contraseña</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="confirm-password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="********"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#201c1c] focus:border-[#201c1c] sm:text-sm"
                      required
                    />
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center">
              <p>Introduce tu correo electrónico para recibir el enlace de restablecimiento.</p>
            </div>
          )}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#201c1c] hover:bg-[#201c1c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#201c1c]"
          >
            {modalView === 'login' ? 'Iniciar Sesión' : modalView === 'register' ? 'Registrarse' : 'Restablecer Contraseña'}
          </button>
        </form>

        <div className="text-center mt-4">
          {modalView === 'login' && (
            <>
              <button
                onClick={() => setModalView('reset')}
                className="text-[#201c1c] hover:text-[#201c1c] text-sm font-medium"
              >
                ¿Olvidaste tu contraseña?
              </button>
              <div className="mt-2">
                <button
                  onClick={() => setModalView('register')}
                  className="text-[#201c1c] hover:text-[#201c1c] text-sm font-medium"
                >
                  ¿No tienes cuenta? Regístrate
                </button>
              </div>
            </>
          )}
          {modalView === 'register' && (
            <button
              onClick={() => setModalView('login')}
              className="text-[#201c1c] hover:text-[#201c1c] text-sm font-medium"
            >
              ¿Ya tienes cuenta? Inicia sesión
            </button>
          )}
          {modalView === 'reset' && (
            <button
              onClick={() => setModalView('login')}
              className="text-[#201c1c] hover:text-[#201c1c] text-sm font-medium"
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
