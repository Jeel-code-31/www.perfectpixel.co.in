"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

interface NavbarProps {
  settings?: {
    siteTitle?: string;
    navLinks?: { label: string; url: string }[];
  } | null;
  contactInfo?: {
    email?: string[];
    phones?: string[];
    address?: string;
  } | null;
}

export default function Navbar({ settings, contactInfo }: NavbarProps) {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // 1. Define missing variables for contact info
  const email = contactInfo?.email?.[0] || "design@perfectpixel.co.in"
  const phones = contactInfo?.phones?.[0] || "+91 8788 803179"
  const location = contactInfo?.address?.split('\n')[0] || "Vadodara"

  const links = settings?.navLinks && settings.navLinks.length > 0
    ? settings.navLinks.map(link => ({ href: link.url, label: link.label }))
    : [
      { label: 'Project', href: '/projects' },
      { label: 'Clients', href: '/Client' },
      { label: 'About Us', href: '/About' },
      { label: 'FAQ', href: '/FAQ' },
      { label: 'Contact Us', href: '/Contact' },
      { label: 'Blog', href: '/blog' },
    ]


  // 2. Define missing Framer Motion variants
  const menuVariants = {
    closed: { clipPath: "circle(0% at calc(100% - 60px) 60px)", transition: { duration: 0.5, ease: [0.25, 0, 0.1, 1] } },
    open: { clipPath: "circle(150% at calc(100% - 60px) 60px)", transition: { duration: 0.7, ease: [0.25, 0, 0.1, 1] } },
  }

  const linkVariants = {
    closed: { opacity: 0, y: 50 },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.3 + i * 0.1, duration: 0.5, ease: [0.25, 0.4, 0.25, 1] },
    }),
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? "py-3 bg-[#FAF7F2]/90 backdrop-blur-md shadow-sm"
          : "py-6 bg-transparent"
          }`}
      >
        <nav className="flex items-center justify-between max-w-[1500px] mx-auto px-6">

          {/* Logo Section */}
          <Link href="/" className="flex items-center group">
            <div className={`flex items-center gap-3 px-4 py-2 rounded-sm transition-all duration-300 group-hover:scale-105 ${isScrolled
                ? "bg-transparent"
                : "bg-black"
              }`}>
              <img src="/PPlogo.png" alt="Logo" className={`w-10 h-9 object-contain transition-all ${isScrolled ? "invert-0" : "invert" }`}/>
              <span className={`font-bold tracking-tighter text-xl whitespace-nowrap transition-colors ${isScrolled ? "text-black" : "text-white"
                }`}>
                {settings?.siteTitle || "PERFECT PIXEL"}
              </span>
            </div>
          </Link>
          {/* Centered Navigation Pill */}
          <div className="absolute left-1/2 -translate-x-1/2 hidden md:block">
            <div className={`transition-all duration-500 flex items-center px-2 py-1.5 rounded-full border ${isScrolled
              ? "opacity-0 pointer-events-none scale-90"
              : "bg-black/30 backdrop-blur-md border-white/40 opacity-100 scale-100"
              }`}>
              {links.map((link) => {
                const isActive = link.label === "Home";
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-6 py-2 rounded-full text-[13px] font-medium transition-all duration-300 ${isActive
                      ? "bg-white/40 text-[#A27B10] shadow-inner"
                      : "text-white/70 hover:text-[#A27B10]"
                      }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Services Button */}
            <Link href="/Services">
              <button className={`hidden md:flex items-center gap-2 px-6 py-2.5 rounded-full font-medium transition-all duration-500 ${isScrolled
                ? "bg-[#A27B10] text-white opacity-0 pointer-events-none"
                : "bg-white text-black opacity-100"
                }`}>
                Services <ArrowUpRight className="w-4 h-4" />
              </button>
            </Link>

            {/* Circular Hamburger */}
            <button
              className={`relative z-50 w-12 h-12 flex items-center justify-center rounded-full transition-all duration-500 ${isScrolled || isMenuOpen
                ? "scale-100 opacity-100"
                : "scale-0 opacity-0 pointer-events-none"
                } ${isMenuOpen ? "bg-[#FAF7F2]" : "bg-[#A27B10]"}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="relative w-5 h-3 flex flex-col justify-between">
                <span className={`block w-full h-[1.5px] transition-all ${isMenuOpen ? "bg-black rotate-45 translate-y-[5.5px]" : "bg-white"}`} />
                <span className={`block w-full h-[1.5px] transition-all ${isMenuOpen ? "opacity-0" : "bg-white"}`} />
                <span className={`block w-full h-[1.5px] transition-all ${isMenuOpen ? "bg-black -rotate-45 -translate-y-[5.5px]" : "bg-white"}`} />
              </div>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#1A1815]"
            initial="closed" animate="open" exit="closed" variants={menuVariants}
          >
            <div className="flex flex-col items-center justify-center h-full">
              <nav className="flex flex-col items-center gap-4">
                {links.map((link, i) => (
                  <motion.div key={link.href} custom={i} variants={linkVariants}>
                    <Link
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`font-serif text-4xl md:text-12xl transition-all duration-300 hover:text-[#B8963F] group relative ${pathname === link.href ? "text-[#C2542D]" : "text-[#FAF7F2]"}`}
                    >
                      <span className="relative inline-block overflow-hidden">
                        <span className="block transition-transform duration-500 group-hover:-translate-y-full">
                          {link.label}
                        </span>
                        <span className="absolute top-full left-0 block transition-transform duration-500 group-hover:-translate-y-full text-[#B8963F]">
                          {link.label}
                        </span>
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                className="absolute bottom-10 left-0 right-0 px-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[#8B8680] text-xs uppercase tracking-[0.2em] text-center">
                  <span>{location}</span>
                  <span>{email}</span>
                  <span>{phones}</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}