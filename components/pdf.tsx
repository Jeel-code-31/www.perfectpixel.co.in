"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

const works = [
  {
    title: "BEVGRU",
    description: "Large scale architectural projection experience.",
    image: "/click.png",
  },
  {
    title: "BEVGRU",
    description: "Public art through immersive lighting.",
    image: "/Click2.png",
  },
  {
    title: "MOTA CHIPS",
    description: "Interactive digital gallery experience.",
    image: "/Click3.png",
  },
]

export default function FutureWorkSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const sectionHeight = rect.height
      // Calculate scroll progress relative to the viewport
      const scrolled = Math.min(
        Math.max(-rect.top, 0),
        sectionHeight - window.innerHeight
      )

      const progress = scrolled / (sectionHeight - window.innerHeight)
      const index = Math.floor(progress * works.length)

      setActiveIndex(Math.min(index, works.length - 1))
    }

    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    // We keep h-[300vh] for the scroll duration
    <section ref={containerRef} className="relative h-[300vh] bg-white">
      {/* Sticky container: 
         - Added py-10 md:py-0 to ensure top/bottom space on mobile 
      */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden py-10 md:py-0">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 px-6 md:px-10 w-full">

          {/* TEXT CONTENT */}
          <div className="flex flex-col justify-center order-2 md:order-1">
            <p className="uppercase tracking-[0.2em] md:tracking-[0.3em] text-black text-4xl md:text-6xl mb-4 md:mb-10 font-bold">
              Our Work
            </p>

            <h2 className="text-2xl md:text-4xl font-light mt-2 text-black transition-all duration-500">
              {works[activeIndex].title}
            </h2>

            <p className="text-gray-500 mt-4 md:mt-6 max-w-md text-sm md:text-base transition-all duration-500">
              {works[activeIndex].description}
            </p>

            <a
              href="/projects"
              className="mt-6 md:mt-10 inline-block text-lg md:text-xl text-black hover:text-[#B8963F] transition-colors uppercase tracking-widest"
            >
              View All Works →
            </a>
          </div>

          {/* IMAGE CONTAINER */}
          <div className="relative h-[300px] md:h-[500px] w-full overflow-hidden rounded-2xl order-1 md:order-2">
            {works.map((work, index) => (
              <Image
                key={work.image}
                src={work.image}
                alt={work.title}
                fill
                className={`object-cover transition-opacity duration-700 ${
                  activeIndex === index ? "opacity-100" : "opacity-0"
                }`}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={index === 0}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}