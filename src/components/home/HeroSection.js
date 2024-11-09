import heroImage from '../../assets/hero.png';

export default function HeroSection() {
  return (
    <div className="bg-gradient-to-r from-[#201c1c] to-[#201c1c] rounded-xl overflow-hidden shadow-xl mb-8">
      <div className="flex flex-col md:flex-row items-center justify-between p-8">
        <div className="mb-6 md:mb-0 md:mr-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">¡Descubre el filtro de aire ideal para tu moto!</h1>
          <p className="text-xl text-white mb-6">Encuentra todo lo que necesitas para tu moto con descuentos increíbles.</p>
          <button className="bg-white text-[#201c1c] font-bold py-3 px-6 rounded-full hover:bg-[#f5f5f5] transition duration-300">
            Ver Productos 
          </button>
        </div>
        <div className="w-full md:w-1/2">
          <img src={heroImage} alt="Ofertas de repuestos" />
        </div>
      </div>
    </div>
  );
}
