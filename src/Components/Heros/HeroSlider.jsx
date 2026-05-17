"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// 1. Import your 3 separate Hero components here
import HeroOne from "./HeroOne";
import HeroTwo from "./HeroTwo";
import HeroThree from "./HeroThree";

// 2. Put them in an array
const slides = [HeroOne, HeroTwo, HeroThree];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = right, -1 = left

  // Moving functions above useEffect fixes the declaration error
  const nextSlide = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Automatic slide logic (now safely reads nextSlide)
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [index]);

  // Get the currently active component dynamically
  const CurrentHeroComponent = slides[index];

  // Left-to-right sliding animation settings
  const variants = {
    enter: (dir) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <div className="relative w-full h-[450px] overflow-hidden bg-cover bg-center">
      {/* Background Overlay to keep text readable */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* Slide Container Wrapper */}
      <div className="absolute inset-0 z-10 w-full h-full">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <CurrentHeroComponent />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Left Button */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 bg-red-600/30 hover:bg-red-600/60 text-white backdrop-blur-md shadow-[0_0_15px_rgba(220,38,38,0.5)] hover:shadow-[0_0_25px_rgba(220,38,38,0.8)] border border-red-500/30 hover:scale-110 active:scale-95"
        aria-label="Previous slide"
      >
        <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      {/* Right Button */}
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 bg-red-600/30 hover:bg-red-600/60 text-white backdrop-blur-md shadow-[0_0_15px_rgba(220,38,38,0.5)] hover:shadow-[0_0_25px_rgba(220,38,38,0.8)] border border-red-500/30 hover:scale-110 active:scale-95"
        aria-label="Next slide"
      >
        <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  );
}
