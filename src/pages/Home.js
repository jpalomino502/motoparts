import React from 'react';
import HeroSection from '../components/home/HeroSection';
import SearchBar from '../components/home/SearchBar';
import TestimonialSection from '../components/home/TestimonialSection';
import Features from '../components/home/Features';
import FeaturedProducts from '../components/home/FeaturedProducts';

export default function Home() {

  return (
    <div>
      <HeroSection/>
      <div className='max-w-7xl mx-auto'>
        <SearchBar />
        <FeaturedProducts />
        <TestimonialSection />
        <Features />
      </div>
    </div>
  );
}
