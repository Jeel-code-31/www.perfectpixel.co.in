'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { usePathname } from 'next/navigation'; 

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname(); 
  const text = "PERFECT PIXEL";


  useEffect(() => {
   
    setIsLoading(true);

    const handleLoad = () => {
     
      const delay = 2000; 
      setTimeout(() => setIsLoading(false), delay);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, [pathname]); 

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key={pathname} 
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ 
            y: "-100%", 
            opacity: 0,
            transition: { 
              duration: 0.8, 
              ease: [0.76, 0, 0.24, 1] 
            } 
          }}
          className="fixed inset-0 bg-white z-[9999] flex flex-col items-center justify-center"
        >
          {/* Logo Section */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="mb-8"
          >
            <Image src="/logo1.png" alt="Logo" width={100} height={100} priority />
          </motion.div>

          {/* Bouncy Text Section */}
          <div className="text-center">
            <motion.div className="flex gap-1 justify-center mb-4">
              {text.split("").map((char, i) => (
                <motion.span
                  key={i}
                  animate={{ y: [0, -15, 0] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    repeatDelay: 1,
                    delay: i * 0.1,
                  }}
                  className="text-2xl md:text-4xl font-black text-black"
                  style={{ display: 'inline-block', textShadow: "2px 4px 6px rgba(0,0,0,0.05)" }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.div>
            <p className="text-gray-400 tracking-[0.3em] text-xs uppercase font-bold">
              Design That Works
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}