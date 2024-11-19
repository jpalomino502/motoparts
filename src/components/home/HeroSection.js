import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const heroImages = [
  'https://via.placeholder.com/800x400/000',
  'https://via.placeholder.com/800x400/000',
  'https://via.placeholder.com/800x400/000',
];

export default function HeroSection() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
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
    nextArrow: <div className="slick-next slick-arrow text-black">→</div>,
    prevArrow: <div className="slick-prev slick-arrow text-black">←</div>,
  };

  return (
    <div className='mb-8'>
      <Slider {...settings}>
        {heroImages.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`Carrusel ${index + 1}`}
              className="w-full h-auto"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
