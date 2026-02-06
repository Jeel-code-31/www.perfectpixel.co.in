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
  // --- 1. ALL HOOKS MUST BE AT THE TOP ---
  const ref = useRef<HTMLAnchorElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
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

  // --- 2. THE SAFETY CHECK (MUST BE AFTER HOOKS) ---
  // If the link is missing from Sanity, we return null safely here.
  if (!href || typeof href !== "string") return null

  // --- 3. LOGIC ---
  const sizeClasses = {
    large: "aspect-square",
    medium: "aspect-[6/6]", 
    small: "aspect-square",
  }

  // Prevents Hydration Mismatch: 'canHover' is only true on the client
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
        style={canHover ? { rotateX, rotateY } : { rotateX: 0, rotateY: 0 }}
        whileHover={canHover ? { scale: 1.05 } : undefined}
        transition={{ type: "spring", stiffness: 50, damping: 25 }}
        className="relative h-full w-full rounded-xl bg-[#141210] overflow-hidden"
      >
        <div
          className="absolute inset-0 transition-all duration-1000"
          style={{
            clipPath: isVisible ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
            transitionDelay: `${revealDelay}ms`,
          }}
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
      </motion.div>

      <div className="mt-6">
        <span className="text-2xl font-bold text-[#B8963F] block mb-2">({number})</span>
        {description && <p className="text-white text-sm opacity-80">{description}</p>}
      </div>
    </Link>
  )
}