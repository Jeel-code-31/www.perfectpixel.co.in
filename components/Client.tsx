"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion, useScroll, useTransform } from "framer-motion"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BrandAnimation() {
  const containerRef = useRef(null)
  const inputsRef = useRef([])
  const brandImageRef = useRef(null)
  const brainRef = useRef(null)
  const beamRef = useRef(null)
  const boxRef = useRef(null)
  
  const [paths, setPaths] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  const inputData = [
    { label: "ADVERTISING", color: "#f97316", bg: "bg-orange-600" },
    { label: "PROMOTIONS", color: "#fbbf24", bg: "bg-amber-500" },
    { label: "INTERNET", color: "#38bdf8", bg: "bg-sky-500" },
    { label: "P.R.", color: "#d946ef", bg: "bg-fuchsia-600" }
  ];

  const images = ["/Mota1.png", "/Mota2.png", "/Mota3.png","./Mota4.png"];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  const moveX = useTransform(scrollYProgress, [0, 1], [0, 50])
  const moveY = useTransform(scrollYProgress, [0, 1], [0, 30])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const updatePaths = useCallback(() => {
    if (!containerRef.current || !brandImageRef.current || inputsRef.current.length === 0) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const targetRect = brandImageRef.current.getBoundingClientRect();

    const targetX = targetRect.left - containerRect.left;
    const targetY = targetRect.top - containerRect.top + targetRect.height / 2;

    const newPaths = inputsRef.current.map((input) => {
      if (!input) return "";
      const rect = input.getBoundingClientRect();
      const startX = rect.right - containerRect.left;
      const startY = rect.top - containerRect.top + rect.height / 2;

      return `M ${startX} ${startY} C ${startX + 50} ${startY}, ${targetX - 50} ${targetY}, ${targetX} ${targetY}`;
    });

    setPaths(newPaths);
  }, []);

  useEffect(() => {
    const timer = setTimeout(updatePaths, 100);
    window.addEventListener("resize", updatePaths);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        }
      });

      tl.fromTo(inputsRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" }
      )
      .fromTo(".connector-path",
        { strokeDasharray: 1000, strokeDashoffset: 1000 },
        { strokeDashoffset: 0, duration: 1, stagger: 0.1, ease: "power2.inOut" },
        "-=0.4"
      )
      .fromTo(brandImageRef.current,
        { scaleY: 0, opacity: 0 },
        { scaleY: 1, opacity: 1, duration: 0.6, ease: "expo.out" }, "-=0.6"
      )
      .fromTo(brainRef.current,
        { scale: 0, rotation: -45 },
        { scale: 1, rotation: 0, duration: 0.6, ease: "back.out(1.7)" }
      )
      .fromTo(beamRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.8, transformOrigin: "left", ease: "power4.inOut" }
      )
      .fromTo(boxRef.current,
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.2)" },
        "-=0.3"
      );
    }, containerRef);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updatePaths);
      ctx.revert();
    };
  }, [updatePaths]);

  return (
    <div ref={containerRef} className="relative w-full mt-20 min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden p-8 md:p-16">

      <motion.div style={{ x: moveX, y: moveY }} className="absolute inset-0 z-0 pointer-events-none scale-110">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-200">
          <source src="https://qyusugtmckphvdt7.public.blob.vercel-storage.com/background.mp4" type="video/mp4" />
        </video>
      </motion.div>

      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
        <defs>
          {inputData.map((item, i) => (
            <marker key={`arrow-${i}`} id={`arrow-${i}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={item.color} />
            </marker>
          ))}
        </defs>
        {paths.map((d, i) => (
          <path key={i} className="connector-path" d={d} stroke={inputData[i].color} strokeWidth="3" fill="none" strokeLinecap="round" markerEnd={`url(#arrow-${i})`} />
        ))}
      </svg>

      <div className="relative flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl z-20 gap-16">

        <div className="flex flex-col gap-6 lg:gap-8">
          {inputData.map((item, i) => (
            <div key={item.label} ref={el => inputsRef.current[i] = el} className={`px-8 py-4 rounded-full font-black text-white text-center shadow-xl tracking-wider text-lg ${item.bg}`}>
              {item.label}
            </div>
          ))}
        </div>

        <div className="flex items-center">
          <div ref={brandImageRef} className="bg-neutral-900 text-neutral-400 px-4 py-8 rounded-2xl flex items-center justify-center min-h-[300px] w-16 lg:w-20 text-xl font-black tracking-[0.3em] border border-neutral-800 shadow-2xl" style={{ writingMode: 'vertical-rl' }}>
            BRAND IMAGE
          </div>

          <div className="relative flex items-center">
            <div ref={brainRef} className="z-30 -ml-6">
              <div className="w-24 h-24 lg:w-32 lg:h-32 bg-neutral-900 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(234,179,8,0.2)] border-4 border-neutral-800">
                <span className="text-5xl lg:text-6xl">🧠</span>
              </div>
            </div>

            <div ref={beamRef} className="absolute left-[50%] h-48 w-[200px] lg:w-[350px] bg-gradient-to-r from-orange-500/40 via-orange-300/10 to-transparent" style={{ clipPath: "polygon(0% 45%, 100% 0%, 100% 100%, 0% 55%)" }}>
              <div className="h-full flex items-center pl-16 lg:pl-24">
                <span className="text-orange-200 font-black text-sm lg:text-lg uppercase italic tracking-tighter opacity-80">Retail Experience</span>
              </div>
            </div>
          </div>
        </div>

        <div ref={boxRef} className="relative w-40 h-60 lg:w-52 lg:h-72 overflow-hidden   shadow-xl">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt="Package Design"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-contain p-2"
          />
        </div>

      </div>
    </div>
  )
}
