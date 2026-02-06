"use client"

import { motion } from "framer-motion"

const expertise = [
  "UI/UX Design", "Packaging", "Brand Identity", "Motion Graphics", 
  "Web Development", "3D Visualization", "Digital Strategy", "Visual SOPs",
  "Print Media", "Art Direction", "Logo Design", "Experience Design"
]

export default function ExpertiseSection() {
  const firstRow = expertise.slice(0, Math.ceil(expertise.length / 2))
  const secondRow = expertise.slice(Math.ceil(expertise.length / 2))

  return (
    <section className="relative py-24 bg-[#0A0A0A] overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#B8963F]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight"
          >
            Our Expertise
          </motion.h2>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            A diverse skill set curated to transform digital and physical brand experiences.
          </p>
        </div>

        {/* Row 1: Moving Right */}
        <div className="flex mb-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex flex-nowrap gap-4 whitespace-nowrap"
          >
            {[...firstRow, ...firstRow].map((skill, i) => (
              <ExpertiseTag key={i} title={skill} />
            ))}
          </motion.div>
        </div>

        {/* Row 2: Moving Left */}
        <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_82%,black_90%,transparent)]">
          <motion.div 
            animate={{ x: [-1000, 0] }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            className="flex flex-nowrap gap-4 whitespace-nowrap"
          >
            {[...secondRow, ...secondRow].map((skill, i) => (
              <ExpertiseTag key={i} title={skill} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ExpertiseTag({ title }: { title: string }) {
  return (
    <div className="px-8 py-4 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md hover:border-[#B8963F]/50 hover:bg-white/[0.08] transition-all duration-300 group cursor-default">
      <span className="text-xl md:text-2xl font-medium text-white/70 group-hover:text-[#B8963F]">
        {title}
      </span>
    </div>
  )
}