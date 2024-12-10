import React, { useEffect, useState, useRef } from 'react'
import Slider from 'react-slick'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase/firebase'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export default function HeroSection() {
  const [heroImages, setHeroImages] = useState([])
  const [imagesLoaded, setImagesLoaded] = useState(false)

  const sliderRef = useRef(null)

  useEffect(() => {
    const loadImagesFromFirestore = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'hero'))
        const images = querySnapshot.docs.map((doc) => doc.data().url)
        setHeroImages(images)
        preloadImages(images)
        addPreloadLinks(images) 
      } catch (error) {
        console.error("Error al obtener imágenes de Firestore:", error)
      }
    }

    loadImagesFromFirestore()
  }, [])

  const preloadImages = (images) => {
    let loadedImagesCount = 0;
    const totalImages = images.length;
    
    images.forEach((image) => {
      const img = new Image();
      img.src = image;
      img.onload = () => {
        loadedImagesCount += 1;
        if (loadedImagesCount === totalImages) {
          setImagesLoaded(true);
        }
      }
    });
  }

  const addPreloadLinks = (images) => {
    images.forEach((image) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = image;
      link.as = 'image';
      link.type = 'image/webp';
      document.head.appendChild(link);
    });
  }

  const handleNext = () => {
    sliderRef.current.slickNext()
  }

  const handlePrev = () => {
    sliderRef.current.slickPrev()
  }

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
  }

  if (!imagesLoaded) {
    return <SkeletonLoader />
  }

  return (
    <div className="relative w-full overflow-hidden">
      <div className="max-w-screen-lg mx-auto relative">
        <Slider ref={sliderRef} {...settings}>
          {heroImages.map((image, index) => (
            <div key={index} className="relative w-full">
              <div className="pb-[50%]">
                <img
                  src={image}
                  alt={`Imagen del carrusel ${index + 1}`}
                  className="absolute inset-0 w-full h-full rounded-lg"
                />
              </div>
            </div>
          ))}
        </Slider>

        <div className="hidden lg:flex absolute top-1/2 left-[-180px] transform -translate-y-1/2 z-20">
          <div
            className="p-6 rounded-full cursor-pointer"
            onClick={handlePrev}
          >
            <ChevronLeft size={100} color="black" />
          </div>
        </div>

        <div className="hidden lg:flex absolute top-1/2 right-[-180px] transform -translate-y-1/2 z-20">
          <div
            className="p-6 rounded-full cursor-pointer"
            onClick={handleNext}
          >
            <ChevronRight size={100} color="black" />
          </div>
        </div>
      </div>
    </div>
  )
}

function SkeletonLoader() {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="max-w-screen-lg mx-auto">
        <div className="relative pb-[50%]">
          <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg">
            <div className="h-full w-full flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-400 rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
