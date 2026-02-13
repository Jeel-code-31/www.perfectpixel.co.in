"use client"

import { useState, useEffect } from "react"
import { ArrowRight, Plus } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

interface ServiceItem {
  id: string
  number: string
  title: string
  subtitle: string
  shortDesc: string
  fullDesc: string
  images: string[]
}

const services: ServiceItem[] = [
  {
    id: "01",
    number: "01",
    title: "Packaging Design",
    subtitle: "Stand Out on the Shelf",
    shortDesc: "Our packaging designs capture the essence of your brand, making your products stand out.",
    fullDesc: "By combining meticulous planning with creative flair, we develop packaging that draws attention and effectively communicates your brand story. From material selection to structural design, we ensure your product is protected and prominently displayed.",
    images: ["/pack1.jpg", "/pack2.jpg", "/pack3.jpg"],
  },
  {
    id: "02",
    number: "02",
    title: "Website Design",
    subtitle: "Digital Experiences That Engage",
    shortDesc: "We craft custom websites that merge design, usability and functionality.",
    fullDesc: "Our goal is to create digital experiences that engage users while reflecting your brand identity. From responsive layouts to intuitive navigation, we ensure seamless performance across all devices and browsers.",
    images: ["/web1.jpg", "/web2.jpg", "/web3.jpg"],
  },
  {
    id: "03",
    number: "03",
    title: "Graphic Design",
    subtitle: "Visual Communication That Connects",
    shortDesc: "We create compelling visual content that communicates your brand message effectively.",
    fullDesc: "Our graphic design solutions enhance your brand identity through visually compelling content. From logos and marketing materials to digital graphics, we create cohesive designs that align with your objectives.",
    images: ["/G1.jpg", "/G2.jpg", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREtLoJmv6c_zyeH25zH2i1EuBugrCZE62dMQ&s"],
  },
  {
    id: "04",
    number: "04",
    title: "Brochure Design",
    subtitle: "Informative and Attractive",
    shortDesc: "We design brochures that effectively convey your message and captivate your audience.",
    fullDesc: "A well-designed brochure can be a powerful marketing asset. We focus on crafting brochures that effectively communicate your brand message while leaving a lasting impression on your audience.",
    images: ["/B1.jpg", "/B2.jpg", "/B3.jpg"],
  },
  {
    id: "05",
    number: "05",
    title: "Visual Communication",
    subtitle: "Engage Through Visuals",
    shortDesc: "We specialize in creating visual content that resonates with your target audience.",
    fullDesc: "Perfect Pixel offers specialized visual communication solutions for factories and processing units. We simplify complex processes through clear and engaging visual SOPs, making technical information accessible to all levels of your organization.",
    images: ["/comm1.jpg", "/comm2.jpg", "/comm3.jpg"],
  },
  {
    id: "06",
    number: "06",
    title: "Experience Design", // Fixed Typo
    subtitle: "Immersive Brand Experiences",
    shortDesc: "We design immersive experiences that leave a lasting impression on your audience.",
    fullDesc: "We focus on designing user interactions that enhance engagement and understanding. By creating structured and immersive experiences, we help users connect with your brand more meaningfully.",
    images: ["/Exdesign.jpg", "/Exdesign2.jpg", "/Exdesign1.jpg"],
  },
]

export default function ServicesSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <main className="bg-[#0A0A0A]">
      <Navbar />
      <section className="py-32 px-6 text-[#FAF7F2]">
        <div className="max-w-6xl mx-auto">
          <header className="mt-20">
            <h2 className="text-4xl font-bold mb-4">Design Services</h2>
            <p className="text-gray-400 max-w-md text-lg">
              Comprehensive design solutions across packaging, web, and branding.
            </p>
          </header>

          <div className="space-y-12 mt-20">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                isExpanded={expandedId === service.id}
                onToggle={() => setExpandedId(expandedId === service.id ? null : service.id)}
              />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}

function ServiceCard({ service, isExpanded, onToggle }: { service: ServiceItem, isExpanded: boolean, onToggle: () => void }) {
  const [currentImageIdx, setCurrentImageIdx] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (isHovered) return
    const timer = setInterval(() => {
      setCurrentImageIdx((prev) => (prev + 1) % service.images.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [isHovered, service.images.length])

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="border border-white/20 p-6 md:p-10 rounded-sm bg-black/20 group transition-colors hover:bg-white/[0.03]"
    >
      <div className="flex flex-col md:flex-row gap-10 items-start">
        {/* Image Container */}
        <div className="relative overflow-hidden rounded-lg bg-white/5 w-full md:w-[400px] shrink-0 aspect-square">
          <img
            src={service.images[currentImageIdx]}
            alt={service.title}
            className="w-full h-full object-cover transition-all duration-700"
            loading="lazy"
          />

          {/* Hover Button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 bg-black/40">
            <a href="/projects" className="bg-[#B8963F] text-black px-8 py-3 rounded-full font-bold flex items-center gap-2 shadow-2xl hover:scale-105 transition-transform">
              View Project <ArrowRight size={18} />
            </a>
          </div>
        </div>

        {/* Text Content */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-6">
            <span className="text-3xl font-serif text-[#B8963F]">{service.number}</span>
            <h3 className="text-3xl font-bold tracking-tight">{service.title}</h3>
          </div>

          <h4 className="text-[#B8963F] font-semibold text-sm uppercase tracking-[0.2em]">
            {service.subtitle}
          </h4>

          <div className="text-gray-400 leading-relaxed text-base md:text-lg">
            <p>{service.shortDesc}</p>

            <div
              className="overflow-hidden"
              aria-expanded={isExpanded}
              style={{
                maxHeight: isExpanded ? "600px" : "0px",
                opacity: isExpanded ? 1 : 0,
                transition: 'max-height 0.45s ease, opacity 0.35s ease',
              }}
            >
              <p className="pt-6 text-gray-300 border-t border-white/5 mt-6 italic">
                {service.fullDesc}
              </p>
            </div>
          </div>

          <button
            onClick={onToggle}
            className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-[#B8963F] hover:text-white transition-colors pt-4"
          >
            {isExpanded ? "Minimize" : "Discover Details"}
            <div className={`bg-white/10 p-1 rounded-full transform transition-transform ${isExpanded ? 'rotate-45 scale-110' : 'rotate-0'}`}>
              <Plus size={16} />
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}