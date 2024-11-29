import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const FilterSearch = () => {
  const [filters, setFilters] = useState({
    brands: [],
    models: [],
    engineSizes: [],
    years: [],
    references: [],
  });

  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedEngineSize, setSelectedEngineSize] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productData = querySnapshot.docs.map((doc) => doc.data());
      const brands = new Set();
      const models = new Set();
      const engineSizes = new Set();
      const years = new Set();
      const references = new Set();

      productData.forEach((product) => {
        product.compatibleVehicles.forEach((vehicle) => {
          brands.add(vehicle.brand);
          models.add(vehicle.model);
          engineSizes.add(vehicle.engineSize);
          years.add(vehicle.year);
        });
        references.add(product.reference);
      });

      setFilters({
        brands: [...brands],
        models: [...models],
        engineSizes: [...engineSizes],
        years: [...years],
        references: [...references],
      });
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    const queryParams = new URLSearchParams();
    if (selectedBrand) queryParams.append("brands", selectedBrand);
    if (selectedModel) queryParams.append("models", selectedModel);
    if (selectedEngineSize) queryParams.append("engineSizes", selectedEngineSize);
    if (selectedYear) queryParams.append("years", selectedYear);
    navigate(`/products?${queryParams.toString()}`);
  };

  const filterLabels = {
    brands: "Marca",
    models: "Modelo",
    engineSizes: "Cilindrada",
    years: "Año",
    references: "Referencia",
  };

  return (
    <div className="mx-auto">
      <div className="bg-gradient-to-r from-[#ff0000] to-[#d70000] rounded-lg shadow-md overflow-hidden">
        <div className="p-4 sm:p-6">
          <div
            className={`flex justify-between items-center text-white text-lg sm:text-xl font-bold text-center ${
              isMobile ? "cursor-pointer" : ""
            }`}
            onClick={() => isMobile && setShowFilters(!showFilters)}
          >
            <span>Encuentra el filtro ideal para tu moto</span>
            {isMobile && <ChevronDown className={`transform ${showFilters ? "rotate-180" : ""}`} />}
          </div>

          {(showFilters || !isMobile) && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 mt-4 lg:grid-cols-3 gap-4">
                {Object.keys(filters).map((filterKey) => (
                  <div key={filterKey} className="relative">
                    <select
                      className="w-full appearance-none bg-white text-gray-700 py-2 px-3 pr-8 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-300 ease-in-out"
                      value={
                        filterKey === "brands"
                          ? selectedBrand
                          : filterKey === "models"
                          ? selectedModel
                          : filterKey === "engineSizes"
                          ? selectedEngineSize
                          : filterKey === "years"
                          ? selectedYear
                          : ""
                      }
                      onChange={(e) => {
                        if (filterKey === "brands") setSelectedBrand(e.target.value);
                        if (filterKey === "models") setSelectedModel(e.target.value);
                        if (filterKey === "engineSizes") setSelectedEngineSize(e.target.value);
                        if (filterKey === "years") setSelectedYear(e.target.value);
                      }}
                    >
                      <option value="">{`Selecciona ${filterLabels[filterKey]}`}</option>
                      {filters[filterKey].map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleSearch}
                className="w-full mt-4 bg-black text-white py-3 px-4 rounded-md hover:bg-[#121212] transition-colors duration-300 ease-in-out text-sm font-semibold"
              >
                Buscar filtro
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterSearch;
