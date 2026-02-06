'use client';

import React, { useRef } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { de } from 'date-fns/locale';

export default function Hero() {
  const containerRef = useRef(null);
  
  // 1. Setup Mouse Tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 2. Smooth "Spring" physics (makes it feel premium)
  const springConfig = { damping: 30, stiffness: 100 };
  const moveX = useSpring(useTransform(mouseX, [0, 2000], [20, -20]), springConfig);
  const moveY = useSpring(useTransform(mouseY, [0, 1000], [20, -20]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    // Get mouse position relative to window
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full overflow-hidden flex items-center bg-black"
    >
      {/* --- INTERACTIVE BACKGROUND VIDEO --- */}
      <motion.div 
        style={{ x: moveX, y: moveY }}
        className="absolute inset-0 z-0 pointer-events-none scale-110"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-200"
        >
          {/* Use your uploaded stars/space video here */}
          <source src="/background.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* --- HERO CONTENT --- */}
      <div className="relative max-w-6xl mx-auto w-full px-4 sm:px-6 md:px-10 mt-45">
        <div className="max-w-4xl">
          <div className="animate-slideInDown">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Strategic Design <br /> Crafted to 
              <span className="bg-gradient-to-r from-[#A27B10] to-[#A27B10]/40 bg-clip-text text-transparent"> Elevate Your Brand</span>
            </h1>

            <p className="text-lg md:text-xl text-white/60 max-w-2xl mb-10 leading-relaxed font-medium">
              We create innovative digital experiences that transform ideas into reality. From concept to execution, we deliver excellence in every project.
            </p>
          </div>
        </div>
      </div>

    </section>
  );
}