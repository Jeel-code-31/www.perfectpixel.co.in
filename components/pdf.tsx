"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

const works = [
  {
    title: "BEVGRU MOCKUP",
    // description: "Large scale architectural projection experience.",
    image: "/click.png",
  },
  {
    title: "BEVGRU MOCKUP 2",
    // description: "Public art through immersive lighting.",
    image: "/Click2.png",
  },
  {
    title: "MOTA CHIPS MOCKUPS",
    // description: "Interactive digital gallery experience.",
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
    <section ref={containerRef} className="relative h-[300vh] bg-white">
      <div className="sticky top-0 h-screen flex items-center">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 px-10">

          {/* TEXT */}
          <div className="flex flex-col h-full justify-center">
            <p className="uppercase tracking-[0.3em] font-bold text-black text-xl">
              Future Work
            </p>

            <h2 className="text-5xl md:text-6xl font-light mt-4 text-black transition-all duration-500">
              {works[activeIndex].title}
            </h2>

            <p className="text-gray-500 mt-6 max-w-md transition-all duration-500">
              {works[activeIndex].description}
            </p>

            {/* BUTTON AT BOTTOM OF TEXT */}
            <a
              href="/projects"
              className="mt-10 inline-block text-xl text-black hover:text-[#B8963F] transition-colors uppercase tracking-widest"
            >
              View All Works →
            </a>
          </div>

          {/*
          
          IMAGE */}
          <div className="relative h-[500px] w-full overflow-hidden rounded-2xl">
            <Image
              key={works[activeIndex].image}
              src={works[activeIndex].image}
              alt={works[activeIndex].title}
              fill
              className="object-cover transition-all duration-700"
              sizes="50vw"
            />
          </div>

        </div>
      </div>
    </section>
  )
}
