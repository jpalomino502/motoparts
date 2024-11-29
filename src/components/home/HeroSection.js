import React, { useRef, useState, useEffect } from 'react';
import Slider from 'react-slick';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const heroImages = [
  'https://firebasestorage.googleapis.com/v0/b/webnova-nks.firebasestorage.app/o/hero%2F1732831272789.jpg?alt=media&token=132f6c44-c523-4f89-80f0-e82d94354135',
  'https://firebasestorage.googleapis.com/v0/b/webnova-nks.firebasestorage.app/o/hero%2F1732831272789.jpg?alt=media&token=132f6c44-c523-4f89-80f0-e82d94354135',
  'https://firebasestorage.googleapis.com/v0/b/webnova-nks.firebasestorage.app/o/hero%2F1732831272789.jpg?alt=media&token=132f6c44-c523-4f89-80f0-e82d94354135',
];

export default function HeroSection() {
  const sliderRef = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const loadImages = async () => {
      try {
        await Promise.all(
          heroImages.map(
            (src) =>
              new Promise((resolve, reject) => {
                const img = new Image();
                img.src = src;
                img.onload = resolve;
                img.onerror = reject;
              })
          )
        );
        setImagesLoaded(true);
      } catch (error) {
        console.error('Error loading images:', error);
      }
    };

    loadImages();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: null,
    prevArrow: null,
    appendDots: (dots) => (
      <div>
        <ul className="m-0 p-0"> {dots} </ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-3 h-3 mx-1 rounded-full bg-white opacity-50 hover:opacity-100 transition-opacity duration-300" />
    ),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  // const goToNextSlide = () => {
  //   if (sliderRef.current) {
  //     sliderRef.current.slickNext();
  //   }
  // };

  // const goToPrevSlide = () => {
  //   if (sliderRef.current) {
  //     sliderRef.current.slickPrev();
  //   }
  // };

  if (!imagesLoaded) {
    return (
      <div className="relative w-full overflow-hidden mt-2">
        <div className="max-w-screen-xl mx-auto">
          <div className="relative pb-[40.9%]">
            <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden mt-2">
      <div className="max-w-screen-xl mx-auto">
        <Slider ref={sliderRef} {...settings}>
          {heroImages.map((image, index) => (
            <div key={index} className="relative w-full">
              <div className="pb-[40.9%]">
                <img
                  src={image}
                  alt={`Imagen del carrusel ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0"></div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* <button
        onClick={goToPrevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20 p-2 bg-black bg-opacity-50 text-white rounded-full shadow-lg hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hidden lg:block"
        aria-label="Slide anterior"
      >
        <ChevronLeft size={30} />
      </button>
      <button
        onClick={goToNextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20 p-2 bg-black bg-opacity-50 text-white rounded-full shadow-lg hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hidden lg:block"
        aria-label="Siguiente slide"
      >
        <ChevronRight size={30} />
      </button> */}
    </div>
  );
}


