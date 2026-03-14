'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';

export default function Hero() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 100 };
  const moveX = useSpring(useTransform(mouseX, [0, 2000], [20, -20]), springConfig);
  const moveY = useSpring(useTransform(mouseY, [0, 1000], [20, -20]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  useEffect(() => {
    if (videoRef.current) {
      // Force muted and play for modern browsers
      videoRef.current.muted = true;
      videoRef.current.play()
        .then(() => setIsVideoPlaying(true))
        .catch(err => console.error("Playback failed:", err));
    }
  }, []);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center p-6 md:p-12"
      style={{ backgroundColor: "white" }}
    >
      <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl gap-10 z-10">
        
        {/* --- LEFT SIDE: LOGO ANIMATION --- */}
      <motion.div 
  style={{ x: moveX, y: moveY }}
  className="w-full lg:w-1/2 flex justify-center lg:justify-end"
>
  <div className="relative w-[350px] h-[350px] md:w-[600px] md:h-[600px] flex items-center justify-center">
    {/* THE GLOW: We move this behind the video to hide any "edges" */}
    <div className="absolute w-1/2 h-1/2 bg-[#FFA700] opacity-20 blur-[120px] rounded-full z-0" />

    {/* THE VIDEO */}
    <video 
      ref={videoRef}
      muted 
      loop 
      playsInline 
      autoPlay
      src="/animate.mp4" 
      /* 'mix-blend-screen' makes black transparent.
         'scale-150' makes it large.
      */
      className="w-full h-full object-contain mix-blend-screen scale-150 relative z-10"
      style={{ 
        /* Crucial Fix: Higher contrast pushes dark grays to pure black, 
           ensuring the background is 100% removed. 
        */
        filter: "contrast(1.4) brightness(1.2) saturate(1.2)",
        opacity: isVideoPlaying ? 1 : 0,
        transition: "opacity 0.8s ease-in-out"
      }}
    />
  </div>
</motion.div>

        {/* --- RIGHT SIDE: CONTENT --- */}
        <div className="w-full lg:w-1/2 text-left">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className=" mt-30 text-5xl md:text-3xl lg:text-5xl text-black leading-[0.9] mb-8 flex flex-col font-bold tracking-tighter uppercase">
              <span className="opacity-90">Strategic Design</span>
              <div className="flex items-baseline gap-4">
                 <span className="lowercase text-3xl md:text-5xl mt-5">to</span>
              </div>
              <span className="text-black mt-4 py-2">
                Elevate Brand Visibility
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-[#B8963F]/200 max-w-md mb-12 font-medium leading-relaxed normal-case">
              We deliver experiences that transform ideas into reality.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}