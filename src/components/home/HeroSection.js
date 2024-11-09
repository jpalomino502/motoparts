import heroImage from '../../assets/hero.png';

export default function HeroSection() {
  return (
    <div className="bg-gradient-to-r from-[#ff0000] to-[#d70000] rounded-xl overflow-hidden shadow-xl mb-8">
      <div className="flex flex-col md:flex-row items-center justify-between p-8">
        <div className="mb-6 md:mb-0 md:mr-8">
          <h1 className="text-4xl md:text-5xl font-bold text-[#fff0f0] mb-4">¡Descubre el filtro de aire ideal para tu moto!</h1>
          <p className="text-xl text-[#fff0f0] mb-6">Encuentra todo lo que necesitas para tu moto con descuentos increíbles.</p>
          <button className="bg-white text-[#500000] font-bold py-3 px-6 rounded-full hover:bg-[#f5f5f5] transition duration-300">
            Ver Productos 
          </button>
        </div>
        <div className="w-full md:w-1/2 hidden md:block">
          <img src={heroImage} alt="Ofertas de repuestos" />
        </div>
      </div>
    </div>
  );
}
