'use client';

import React, { useRef } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';

export default function Hero() {
  const containerRef = useRef(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 100 };
  const moveX = useSpring(useTransform(mouseX, [0, 2000], [20, -20]), springConfig);
  const moveY = useSpring(useTransform(mouseY, [0, 1000], [20, -20]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full overflow-hidden flex items-center"
      style={{ backgroundColor: "#191919" }}   // REAL light gray
    >
      {/* --- HERO CONTENT --- */}
      <div className="relative max-w-6xl mx-auto w-full px-4 sm:px-6 md:px-10">
        <div className="max-w-4xl">
          <div className="animate-slideInDown uppercase">
            <h1 className="text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-6 flex flex-wrap items-baseline gap-x-3">
              <span className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter">
                Strategic Design
              </span>
              <span className="lowercase text-2xl md:text-3xl lg:text-4xl font-light">
                to
              </span> 
              <span className="bg-gradient-to-r from-[#FFA700] to-[#FFA700]/90 font-semibold mt-5 bg-clip-text text-transparent">
                Elevate Brand Visibility
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white max-w-2xl mb-10 font-medium">
              we deliver experience that transforms idea into reality.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
