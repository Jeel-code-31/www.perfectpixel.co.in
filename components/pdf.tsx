import { FileText, Download } from "lucide-react"

export default function MediaGrid() {
    const downloads = [
        {
            title: "Milltreat Packaging Design",
            description: "Download PDF (2.4 MB)",
            image: "/chocolate.png", 
            fileUrl: "/sample.pdf",
        },
        {
            title: "Paradigm Brochure Design",
            description: "Download PDF (5 MB)",
            image: "/Anaaa.jpg", 
            fileUrl: "/Paradigm.pdf",
        },
        {
            title: "Kailas Engineering Brochure Design",
            description: "Download PDF (1.8 MB)",
            image: "/no.jpg",
            fileUrl: "/Brochure.pdf",
        }
    ];

    return (
        <section className="px-6 md:px-10 py-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-12 mb-12 sm:mb-16">
                <h2 className="oh-label text-sm sm:text-base">
                    (Our Works)
                </h2>

                <a href="/projects" className="oh-label text-sm sm:text-base text-[#C2542D] opacity-80 hover:opacity-100 transition-opacity duration-300 link-underline min-h-[44px] flex items-center">
                    (View All Works)
                </a>
            </div>
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                {downloads.map((item, index) => (
                    <div
                        key={index}
                        className="group relative aspect-video overflow-hidden rounded-sm bg-black border border-white/10"
                    >
                        {/* Background Image */}
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-all duration-700 group-hover:scale-105"
                        />

                        {/* Content Overlay */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-6">
                            <FileText
                                className="text-white/20 group-hover:text-[#c2542d] transition-colors duration-500 mb-2"
                                size={48}
                            />
                            <h3 className="text-white font-semibold tracking-tighter text-xl text-center">
                                {item.title}
                            </h3>
                            <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] mt-1">
                                {item.description}
                            </p>

                            {/* Revealable Button */}
                            <a
                                href={item.fileUrl}
                                download
                                className="mt-6 flex items-center gap-2 bg-white text-black px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-500 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-[#c2542d] hover:text-white"
                            >
                                <Download size={14} />
                                Download Now
                            </a>
                        </div>

                        {/* Dark Gradient Bottom */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-transparent to-transparent opacity-80" />
                    </div>
                ))}
            </div>
        </section>
    )
}
