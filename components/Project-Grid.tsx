"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { ProjectCard } from "./project-card"

interface ProjectsGridProps {
  projects: any[]
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [visible, setVisible] = useState(9)
  const items = useMemo(() => projects.slice(0, visible), [projects, visible])
  const canLoadMore = visible < projects.length

  return (
    <div className="w-full mb-32"> 
      {/* gap-x-1: Keeps horizontal lines thin
        gap-y-12: Creates significant space between the rows (bottom side of projects)
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-1 gap-y-12">
        {items.map((project, index) => (
          <motion.div
            key={project.href}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.5 }}
          >
            <ProjectCard {...project} revealDelay={index} />
          </motion.div>
        ))}
      </div>

      {canLoadMore && (
        <div className="flex justify-center mt-20">
          <button
            onClick={() => setVisible((prev) => prev + 6)}
            className="group flex items-center gap-3 px-8 py-3 border border-black/10 bg-white hover:bg-black hover:text-white transition-all duration-300 rounded-full"
          >
            <span className="tracking-[0.2em] text-[10px] uppercase font-bold text-black group-hover:text-white">Load More</span>
            <div className="h-1.5 w-1.5 rounded-full bg-black group-hover:bg-white transition-colors" />
          </button>
        </div>
      )}
    </div>
  )
}