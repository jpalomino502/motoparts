import React from 'react';
import HeroSection from '../components/home/HeroSection';
import SearchBar from '../components/home/SearchBar';
import Features from '../components/home/Features';
import FeaturedProducts from '../components/home/FeaturedProducts';
import Newsletter from '../components/home/Newsletter';

export default function Home() {

  return (
    <div>
      <HeroSection />
      <SearchBar />
      <Features />
      <FeaturedProducts />
      <Newsletter />
    </div>
  );
}
