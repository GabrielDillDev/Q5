'use client'; 

import { scrollToSection } from '../utils/scroll'; 

export default function HeroSection() {
  return (
    <section className="text-center py-20 px-6 bg-gradient-to-b from-black via-slate-900 to-black relative overflow-hidden">
      <div className="relative z-10">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
          Q5 - NASA Explorer
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
          Explore the universe with NASA: stunning images, space mission insights, asteroid discoveries, and more.
        </p>
        
        <button
          onClick={() => scrollToSection('explore-sections')}
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105 cursor-pointer"
        >
          Explore Now
        </button>
      </div>
    </section>
  );
}