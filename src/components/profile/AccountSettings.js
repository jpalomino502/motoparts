// src/components/ProfilePage/AccountSettings.jsx
const AccountSettings = () => {
  return (
    <div className="px-4 py-5 sm:px-6">
      <h3 className="text-lg leading-6 font-medium text-gray-900">Configuración de la Cuenta</h3>
      <div className="mt-5 border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          <li className="py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Cambiar Contraseña</p>
                <p className="text-sm text-gray-500">Actualiza tu contraseña regularmente para mayor seguridad</p>
              </div>
              <button className="text-sm text-blue-600 hover:text-blue-800">Cambiar</button>
            </div>
          </li>
          <li className="py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Notificaciones</p>
                <p className="text-sm text-gray-500">Gestiona tus preferencias de notificaciones</p>
              </div>
              <button className="text-sm text-blue-600 hover:text-blue-800">Configurar</button>
            </div>
          </li>
          <li className="py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Privacidad</p>
                <p className="text-sm text-gray-500">Controla quién puede ver tu información</p>
              </div>
              <button className="text-sm text-blue-600 hover:text-blue-800">Ajustar</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AccountSettings;
