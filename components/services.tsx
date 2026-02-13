'use client';

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
    <section id="services" className="py-12 md:py-20 bg-black text-white relative overflow-hidden mb-10 md:mb-20">
      {/* Background Decor */}
      <div className="absolute left-[-10%] top-[20%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] opacity-20 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(circle,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="mb-10 md:mb-16 text-center md:text-left">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-tight mb-2">
            SERVICES WE PROVIDE
          </h2>
          <p className="text-[#8B8680] text-base md:text-lg lowercase font-serif italic">
            we make what we'd use.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative p-6 md:p-8 rounded-xl border border-white/10 bg-[#0D0D0D] hover:bg-[#141414] transition-all duration-500 overflow-hidden"
            >
              {/* Responsive Flex Container */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start md:items-center gap-6 md:gap-8 h-full">

                {/* Icon Column */}
                <div className="flex-shrink-0 w-20 md:w-24 flex justify-center items-center">
                  <i className={`${service.icon} text-5xl md:text-6xl text-white group-hover:scale-110 transition-transform duration-500`}></i>
                </div>

                {/* Vertical Separator Line - Hidden on very small screens, visible on SM up */}
                <div className="hidden sm:block w-[1px] h-16 md:h-20 bg-[#A27B10]/40 group-hover:bg-[#A27B10] transition-colors duration-500" />
                {/* Horizontal Separator for mobile */}
                <div className="block sm:hidden w-12 h-[1px] bg-[#A27B10]/40" />

                {/* Content Column */}
                <div className="flex-grow text-center sm:text-left">
                  <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 tracking-wide uppercase">
                    {service.title}
                  </h3>
                  <p className="text-[#8B8680] text-sm leading-relaxed max-w-xs mx-auto sm:mx-0">
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