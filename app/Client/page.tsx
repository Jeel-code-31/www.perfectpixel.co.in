"use client"
import { useState } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Award, Users, Zap, ExternalLink } from 'lucide-react'

const CLIENTS = [
    { name: "Luxe Estate", logo: "/Logos/Vrinda.jpeg" },
    { name: "Nova Tech", logo: "/Logos/Kailas.jpg" },
    { name: "Gold Standard", logo: "/Logos/NRI.jpeg" },
    { name: "Apex Design", logo: "/Logos/Paradigm.jpeg" },
    { name: "Vertex Solutions", logo: "/logos/logo.png" },
    { name: "Blue Ocean", logo: "/Logos/Mota.png" },
    { name: "Happilo", logo: "/Logos/happilo.png" },
    { name: "gg", logo: "Logos/gg.jpg" },
    { name: "ekluvya", logo: "Logos/ekluvya.png" },
    { name: "Blitz", logo: "Logos/blitz.jpg" },
    { name: "Cheddu", logo: "Logos/cheddu.png" },
    { name: "Final", logo: "Logos/final.jpg" },
    { name: "Genrich", logo: "Logos/genrich.jpg" },
    { name: "Haldiram", logo: "Logos/haldiram.png" },
    { name: "hildur", logo: "Logos/hildur.png" },
    { name: "IIT", logo: "Logos/IIT.jpg" },
    { name: "Priya", logo: "Logos/Priya.png" },
    { name: "Rangar", logo: "Logos/Ragnar.jpg" },
    { name: "richday", logo: "Logos/richday.png" },
    { name: "shiv", logo: "Logos/shiv.png" },
    { name: "swad", logo: "Logos/swad.png" },
    { name: "tech", logo: "Logos/tech.jpg" },
]

const PROJECTS = [
    {
        id: 1,
        title: "Paradigm Managing Quality",
        category: "Food and Quality Management, Website Design",
        year: " 2025",
        link: "https://paradigm.co.in/",
        image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80",
    },
    {
        id: 2,
        title: "Kailas Engineering Systems",
        category: "Post Designs for Corporate Office",
        year: "2024",
        link: "https://kailasengineering.com/",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80",
    },
    {
        id: 3,
        title: "Mota Chips Rebranding",
        category: "Brand Identity and Packaging Design",
        year: "2023",
        link: "https://motachips.com/",
        image: "https://www.bbassets.com/media/uploads/p/xl/40328017-10_1-motas-premium-potato-chips-yummy-cheese.jpg",
    },
    {
        id: 4,
        title: "Happilo E-Commerce Platform",
        category: "Website Design and Development",
        year: "2024",
        link: "https://www.happilo.com/",
        image: "https://m.media-amazon.com/images/I/7110drDC0wL.jpg",
    },
    {
        id: 5,
        title: "Vrinda Aagro",
        category: "Brand Identity and Website Design",
        year: "2023",
        link: "https://vrindaaagro.com/",
        image: "https://vrindaagro.com/wp-content/uploads/2021/09/cropped-Vrinda-Agro-Logo-1.png",
    },
]

export default function ClientsPage() {
    const [expandedId, setExpandedId] = useState<number | null>(null);

    const toggleStory = (id: number) => {
        setExpandedId(expandedId === id ? null : id);
    }

    return (
        <main className="min-h-screen bg-[#0A0A0A] text-white">
            <Navbar />

            {/* Hero Story Section */}
            <section className="pt-48 pb-40 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mt-20">
                    <div>
                        <h2 className="text-[#AC9148] font-medium tracking-widest uppercase mb-10 text-sm">(Our Legacy)</h2>
                        <h2 className="text-5xl md:text-5xl font-bold mb-8 leading-tight">
                            Crafting stories in pixels & gold.
                        </h2>
                        <p className="text-gray-400 text-lg leading-relaxed mb-8">
                            Founded in Vadodara, Perfect Pixel began with a simple vision: to bridge the gap between
                            unfiltered creativity and structural excellence. We don't just build websites;
                            we curate digital experiences that command attention.
                        </p>
                    </div>
                    <div className="relative group">
                        <img
                            src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80"
                            alt="Our Studio"
                            className="relative rounded-2xl border border-white/20"
                        />
                    </div>
                </div>
            </section>

            {/* Client Logo Cloud */}
            <section className="py-24 bg-white border-y border-gray-100 mb-20">
                <div className="max-w-7xl mx-auto px-6">
                    <p className="text-center text-black uppercase tracking-[0.3em] text-xl mb-20 font-bold">
                        Trusted by Industry Leaders
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
                        {CLIENTS.map((client) => (
                            <div
                                key={client.name}
                                className="flex items-center justify-center h-32 w-full transition-all duration-300"
                            >
                                <img
                                    src={client.logo}
                                    alt={client.name}
                                    className="max-h-full max-w-full object-contain"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Selected Work Grid */}
            <section className="py-32 px-6 max-w-7xl mx-auto space-y-12">
                <div className="mb-12">
                    <h2 className="text-4xl font-bold">Our regular Clients</h2>
                    <p className="text-gray-500 mt-5">Explore the journey of our key projects & Designs.</p>
                </div>

                {PROJECTS.map((project) => (
                    <div
                        key={project.id}
                        onClick={() => toggleStory(project.id)}
                        className={`group cursor-pointer border border-white/10 rounded-[2.5rem] overflow-hidden transition-all duration-500 bg-white/[0.02] hover:bg-white/[0.04] ${expandedId === project.id ? 'ring-2 ring-[#AC9148]' : ''}`}
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-4 md:p-8">
                            {/* Image Container */}
                            <div className="relative overflow-hidden rounded-2xl aspect-[16/10]">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="object-cover w-full h-full transition-all duration-700 group-hover:scale-105"
                                />
                            </div>

                            {/* Basic Info */}
                            <div className="flex flex-col justify-center px-4">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-[#AC9148] font-mono">{project.year}</span>
                                    <span className="text-gray-500 uppercase text-xs tracking-widest font-bold">{project.category}</span>
                                </div>
                                <h3 className="text-3xl md:text-4xl font-bold mb-6 group-hover:text-[#AC9148] transition-colors">
                                    {project.title}
                                </h3>
                                <a href={project.link} target="_blank" rel="noopener noreferrer">
                                    <button className="mt-6 flex items-center gap-2 text-[#AC9148] hover:text-white transition-all font-bold text-sm group/btn">
                                        Visit Website
                                        <ExternalLink size={16} className="transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </section>

            {/* Values Section */}
            <section className="py-20 px-6 max-w-7xl mx-auto mb-20 border-t border-white/10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="space-y-4">
                        <Zap size={40} strokeWidth={2.5} className="text-[#AC9148]" />
                        <h3 className="text-2xl font-bold">Precision</h3>
                        <p className="text-white/70">Every pixel is placed with intentionality and architectural purpose.</p>
                    </div>
                    <div className="space-y-4">
                        <Award size={40} strokeWidth={2.5} className="text-[#AC9148]" />
                        <h3 className="text-2xl font-bold">Quality</h3>
                        <p className="text-white/70">We favor timeless aesthetics over passing digital trends and noise.</p>
                    </div>
                    <div className="space-y-4">
                        <Users size={40} strokeWidth={2.5} className="text-[#AC9148]" />
                        <h3 className="text-2xl font-bold">Partnership</h3>
                        <p className="text-white/70">We don't work for you we build the future alongside you.</p>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    )
}