"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BrandAnimation() {
  const containerRef = useRef(null)
  const inputsRef = useRef([])
  const brandImageRef = useRef(null)
  const brainRef = useRef(null)
  const beamRef = useRef(null)
  const retailExpRef = useRef(null)
  const boxRef = useRef(null) // Container for the side-by-side images
  const questionRef = useRef(null)
  const [paths, setPaths] = useState([])

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

      return `M ${startX} ${startY} C ${startX + 100} ${startY}, ${targetX - 100} ${targetY}, ${targetX} ${targetY}`;
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
          start: "top 60%",
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
          { strokeDashoffset: 0, duration: 1.2, stagger: 0.1, ease: "power2.inOut" },
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
          { scaleX: 1, opacity: 1, duration: 1, transformOrigin: "left", ease: "power4.inOut" }
        )
        // Animates the Question text first
        .fromTo(questionRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 }, "-=0.5"
        )
        // Animates the Retail Experience text
        .fromTo(retailExpRef.current,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.6 }, "-=0.4"
        )
        // Corrected: Animates the children (the images) of the boxRef side-by-side
        .fromTo(boxRef.current.children,
          { opacity: 0, y: 30, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15, ease: "back.out(1.2)" },
          "-=0.3"
        );
    }, containerRef);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updatePaths);
      ctx.revert();
    };
  }, [updatePaths]);

  const inputData = [
    { label: "ADVERTISING", color: "#f97316", bg: "bg-orange-600" },
    { label: "PROMOTIONS", color: "#fbbf24", bg: "bg-amber-500" },
    { label: "INTERNET", color: "#38bdf8", bg: "bg-sky-500" },
    { label: "P.R.", color: "#d946ef", bg: "bg-fuchsia-600" }
  ];

  const images = ["/Mota1.png", "/Mota2.png", "/Mota3.png"];

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-[#0a0a0a] flex items-center justify-center overflow-hidden p-8 md:p-16">
      
      {/* SVG LAYER */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <defs>
          {inputData.map((item, i) => (
            <marker key={`arrow-${i}`} id={`arrow-${i}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={item.color} />
            </marker>
          ))}
        </defs>
        {paths.map((d, i) => (
          <path
            key={i}
            className="connector-path"
            d={d}
            stroke={inputData[i].color}
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            markerEnd={`url(#arrow-${i})`}
          />
        ))}
      </svg>

      <div className="relative flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl z-10 gap-16 lg:gap-8">

        {/* 1. INPUTS */}
        <div className="flex flex-col gap-10 lg:gap-20">
          {inputData.map((item, i) => (
            <div
              key={item.label}
              ref={el => inputsRef.current[i] = el}
              className={`px-10 py-5 rounded-full font-black text-white text-center shadow-[0_10px_20px_rgba(0,0,0,0.3)] whitespace-nowrap border-b-4 border-black/40 tracking-wider text-lg lg:text-xl ${item.bg}`}
            >
              {item.label}
            </div>
          ))}
        </div>

        {/* 2. CENTER PIECE */}
        <div className="flex items-center gap-8">
          <div ref={brandImageRef}
            className="bg-neutral-900 text-neutral-400 px-6 py-10 rounded-2xl flex flex-col items-center justify-center min-h-[400px] w-20 text-2xl font-black tracking-[0.3em] border border-neutral-800 shadow-2xl"
            style={{ writingMode: 'vertical-rl' }}>
            BRAND IMAGE
          </div>

          <div className="relative flex items-center">
            <div ref={brainRef} className="z-30 -ml-6">
              <div className="w-24 h-24 lg:w-36 lg:h-36 bg-neutral-900 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(234,179,8,0.3)] border-4 border-neutral-800">
                <span className="text-5xl lg:text-7xl">🧠</span>
              </div>
            </div>

            <div ref={beamRef}
              className="absolute left-[60%] h-56 w-[250px] lg:w-[450px] bg-gradient-to-r from-orange-500/40 via-orange-300/5 to-transparent"
              style={{ clipPath: "polygon(0% 42%, 100% 0%, 100% 100%, 0% 58%)" }}>
              <div ref={retailExpRef} className="h-full flex items-center pl-24 lg:pl-32">
                <span className="text-orange-200 font-black text-lg lg:text-2xl uppercase italic tracking-tighter opacity-80">Retail Experience</span>
              </div>
            </div>
          </div>
        </div>


          {/* Side-by-side Images container */}
          <div 
            ref={boxRef} 
            className="flex flex-row flex-wrap items-center justify-center lg:justify-end gap-4 w-full"
          >
            {images.map((img, index) => (
              <div 
                key={index} 
                className="group relative w-24 h-36 lg:w-32 lg:h-48 bg-neutral-100 rounded-2xl overflow-hidden  shadow-2xl transition-transform hover:scale-105"
              >
                <img
                  src={img}
                  alt={`Package Design ${index + 1}`}
                  className="w-full h-full object-contain p-2" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>
            ))}
          </div>
          
        </div>

      </div>
      
  )
}