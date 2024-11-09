const PersonalInfo = ({ user }) => (
    <div className="px-4 py-5 sm:px-6">
      <h3 className="text-lg font-medium text-gray-900">Información Personal</h3>
      <div className="mt-5 border-t border-gray-200">
        <dl className="divide-y divide-gray-200">
          {Object.entries(user).map(([label, value]) => (
            <div key={label} className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">{label}</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
  
  export default PersonalInfo;
  