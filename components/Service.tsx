'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'UI/UX DESIGN',
    description: 'We dive deep into understanding your brand, market, and audience to lay a solid foundation.',
    image: '/Service/uiux.jpg', 
    details: 'Creating intuitive, user-centric interfaces that enhance engagement and reflect brand credibility.'
  },
  {
    number: '02',
    title: 'VISUAL IDENTITY',
    description: 'Our team develops a comprehensive strategy and creates detailed plans for execution.',
    image: '/Service/Visual.jpg', 
    details: 'We Developing cohesive brand systems and assets that ensure a consistent, impactful presence..'
  },
  {
    number: '03',
    title: 'GRAPHIC DESIGN',
    description: 'We bring ideas to life with cutting-edge design and robust development practices.',
    image: '/Service/Graphic.jpg', 
    details: 'Crafting compelling visual narratives and creative assets that resonate with your target audience.'
  },
  { 
    number: '04',
    title: 'DIGITAL MARKETING',
    description: 'Rigorous testing ensures quality, followed by a seamless launch and deployment.',
    image: '/Service/Digital.jpg', 
    details: 'We Strategic web commercials and digital content designed to drive conversions and modern business growth.'
  }
];

export default function Service() {
  const [activeStep, setActiveStep] = useState(0);

  const handleStepClick = (index: number) => {
    setActiveStep(activeStep === index ? -1 : index);
  };

  return (
    <section className="relative px-4 sm:px-6 md:px-10 py-24 overflow-hidden bg-[#191919]">
      {/* Background Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 -left-20 w-[500px] h-[500px] bg-[#B8963F]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 -right-20 w-[400px] h-[400px] bg-[#C2542D]/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-[#FAF7F2]">
            SERVICES <span className="text-[#B8963F]">WE PROVIDE</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-auto mx-auto font-light">
            We offer a comprehensive range of services to help your business thrive in the digital landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* LEFT SIDE - STICKY IMAGE CONTAINER */}
          <div className="sticky top-32">
            <div className="w-full aspect-square md:aspect-[/3] rounded-2xl overflow-hidden border border-white/10 bg-[#1A1815] shadow-2xl">
              <AnimatePresence mode="wait">
                {activeStep !== -1 ? (
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="w-full h-full relative"
                  >
                    <img
                      src={steps[activeStep].image}
                      alt={steps[activeStep].title}
                      className="w-full h-full object-cover grayscale-[30%] brightness-75"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-8 flex flex-col justify-end">
                      <p className="text-[#B8963F] font-bold text-xs uppercase tracking-widest mb-2">Phase {steps[activeStep].number}</p>
                      <h3 className="text-white text-2xl font-bold">{steps[activeStep].title}</h3>
                    </div>
                  </motion.div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-white/10 text-6xl font-black italic tracking-tighter uppercase select-none">SERVICES</span>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT SIDE - ACCORDION LIST */}
          <div className="space-y-6">
            {steps.map((step, index) => {
              const isActive = activeStep === index;
              
              return (
                <div key={index} className="overflow-hidden">
                  <button
                    onClick={() => handleStepClick(index)}
                    className={`w-full text-left p-8 rounded-xl border transition-all duration-500 group outline-none ${
                      isActive
                        ? 'border-[#B8963F] bg-[#B8963F]/5'
                        : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20'
                    }`}
                  >
                    <div className="flex gap-6 items-center">
                      <span className={`text-sm font-bold transition-colors ${isActive ? 'text-[#B8963F]' : 'text-gray-600'}`}>
                        {step.number}
                      </span>
                      
                      <h3 className={`text-xl font-bold flex-1 transition-colors ${isActive ? 'text-[#FAF7F2]' : 'text-gray-400 group-hover:text-white'}`}>
                        {step.title}
                      </h3>

                      <motion.div
                        animate={{ rotate: isActive ? 180 : 0 }}
                        className={`text-[#B8963F] ${isActive ? 'opacity-100' : 'opacity-40'}`}
                      >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </motion.div>
                    </div>

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="pt-6 pl-11">
                            <p className="text-gray-400 font-light leading-relaxed">
                              {step.details}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}