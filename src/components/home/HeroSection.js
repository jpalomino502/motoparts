// import React, { useEffect, useState } from 'react';
// import Slider from 'react-slick';
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '../../firebase/firebase';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// export default function HeroSection() {
//   const [heroImages, setHeroImages] = useState([]);
//   const [imagesLoaded, setImagesLoaded] = useState(false);

//   useEffect(() => {
//     const loadImagesFromFirestore = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, 'hero'));
//         const images = querySnapshot.docs.map((doc) => doc.data().url);
//         setHeroImages(images);
//         setImagesLoaded(true);
//       } catch (error) {
//         console.error("Error al obtener imágenes de Firestore:", error);
//       }
//     };

//     loadImagesFromFirestore();
//   }, []);

//   const settings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     nextArrow: null,
//     prevArrow: null,
//     appendDots: (dots) => (
//       <div>
//         <ul className="m-0 p-0"> {dots} </ul>
//       </div>
//     ),
//     customPaging: () => (
//       <div className="w-3 h-3 mx-1 rounded-full bg-white opacity-50 hover:opacity-100 transition-opacity duration-300" />
//     ),
//     responsive: [
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 1,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//         },
//       },
//     ],
//   };

//   if (!imagesLoaded) {
//     return (
//       <div className="relative w-full overflow-hidden">
//         <div className="max-w-screen-xl mx-auto">
//           <div className="relative pb-[50%]">
//             <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="relative w-full overflow-hidden">
//       <div className="max-w-screen-xl mx-auto">
//         <Slider {...settings}>
//           {heroImages.map((image, index) => (
//             <div key={index} className="relative w-full">
//               <div className="pb-[50%]">
//                 <img
//                   src={image}
//                   alt={`Imagen del carrusel ${index + 1}`}
//                   className="absolute inset-0 w-full h-full rounded-lg"
//                 />
//               </div>
//             </div>
//           ))}
//         </Slider>
//       </div>
//     </div>
//   );
// }

import heroImage from '../../assets/hero.png';

export default function HeroSection() {
  return (
    <div className="bg-black rounded-xl overflow-hidden shadow-xl mb-8">
      <div className="flex flex-col md:flex-row items-center justify-between p-8">
        <div className="mb-6 md:mb-0 md:mr-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">¡Descubre el filtro de aire ideal para tu moto!</h1>
          <p className="text-xl text-white mb-6">Encuentra todo lo que necesitas para tu moto con descuentos increíbles.</p>
          <button className="bg-white text-black font-bold py-3 px-6 rounded-full hover:bg-[#f5f5f5] transition duration-300">
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
