"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"

export function ProjectCard({
  title,
  number,
  image,
  href,
  size,
  description,
  revealDelay = 0,
}: any) {
  // --- 1. ALL HOOKS ---
  const ref = useRef<HTMLAnchorElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  // Adjusted tilt values for a subtle 3D feel
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10])

  useEffect(() => {
    setMounted(true)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  // --- 2. SAFETY CHECK ---
  if (!href || typeof href !== "string") return null

  // --- 3. LOGIC ---
  const sizeClasses = {
    large: "aspect-square",
    medium: "aspect-[6/6]", 
    small: "aspect-square",
  }

  const canHover = mounted && typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches

  return (
    <Link
      ref={ref}
      href={href}
      onMouseMove={(e) => {
        if (!canHover) return
        const rect = e.currentTarget.getBoundingClientRect()
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
      }}
      onMouseLeave={() => {
        mouseX.set(0)
        mouseY.set(0)
      }}
      className={`group relative block w-full ${sizeClasses[size as keyof typeof sizeClasses] || "aspect-square"} overflow-visible`}
    >
      <motion.div
        style={canHover ? { rotateX, rotateY, perspective: 1000 } : { rotateX: 0, rotateY: 0 }}
        whileHover={canHover ? { scale: 1.02 } : undefined}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
        className="relative h-full w-full overflow-hidden"
      >
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          priority={revealDelay === 0}
        />
        
      </motion.div>

      {/* Uncomment if you want the labels visible */}
      {/* <div className="mt-4">
        <span className="text-xl font-bold text-[#B8963F] block">({number})</span>
        <h3 className="text-white font-medium">{title}</h3>
        {description && <p className="text-white/60 text-sm mt-1">{description}</p>}
      </div> 
      */}
    </Link>
  )
}