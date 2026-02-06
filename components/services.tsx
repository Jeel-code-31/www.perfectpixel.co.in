'use client';

import { Description } from "@radix-ui/react-toast";
import { Icon, icons } from "lucide-react";
import { title } from "process";

const services = [
  {
    icon: 'fa-light fa-object-group',
    title: 'UI/UX Design',
    description: 'Creating intuitive, user-centric interfaces that enhance engagement and reflect brand credibility.',
  },
  {
    icon: 'fa-light fa-eye',
    title: 'VISUAL IDENTITY',
    description: 'Developing cohesive brand systems and assets that ensure a consistent, impactful presence.',
  },
  {
    icon: 'fa-light fa-palette',
    title: 'GRAPHIC DESIGN',
    description: 'Crafting compelling visual narratives and creative assets that resonate with your target audience.',
  },
  {
    icon: 'fa-light fa-display',
    title: 'DIGITAL MARKETING',
    description: 'Strategic web commercials and digital content designed to drive conversions and modern business growth.',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-black text-white relative overflow-hidden mb-20">
      <div className="absolute left-[-10%] top-[20%] w-[500px] h-[500px] opacity-20 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(circle,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-2">
            SERVICES WE PROVIDE
          </h2>
          <p className="text-[#8B8680] text-lg lowercase font-serif italic">
            we make what we'd use.
          </p>
        </div>
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {services.map((service, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-xl border border-white/10 bg-[#0D0D0D] hover:bg-[#141414] transition-all duration-500 overflow-hidden"
            >
              <div className="flex items-center gap-8 h-full">

                {/* Icon Column */}
                <div className="flex-shrink-0 w-24 flex justify-center">
                  <i className={`${service.icon} text-6xl text-white group-hover:scale-110 transition-transform duration-500`}></i>
                </div>

                {/* Vertical Separator Line (Accent Color) */}
                <div className="w-[1px] h-20 bg-[#A27B10]/40 group-hover:bg-[#A27B10] transition-colors duration-500" />

                {/* Content Column */}
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold mb-3 tracking-wide">
                    {service.title}
                  </h3>
                  <p className="text-[#8B8680] text-sm leading-relaxed max-w-xs">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Subtle card glow on hover */}
              <div className="absolute -inset-px bg-gradient-to-r from-[#A27B10]/0 via-[#A27B10]/5 to-[#A27B10]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}