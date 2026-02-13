'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/navbar';
import Services from '@/components/services';
import Footer from '@/components/footer';
import ScrollAnimator from '@/components/scroll-animator';
import { ProjectCard } from '@/components/project-card';
import Counter from '@/components/Counter';
import ProcessSection from '@/components/Process-Section';
import { sanityFetch } from "@/sanity/lib/fetch"
import MediaGrid from '@/components/pdf'
import ReviewSection from '@/components/section';
import BrandAnimation from '@/components/Client';
import Hero from '@/components/hero';


export default function Home() {
  const [scrollY, setScrollY] = useState(0);


  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground dark">
      <Navbar />
      <ScrollAnimator>
       <Hero />
        <BrandAnimation />

        {/* Stats Section */}
        <section className="relative mt-20 px-4 sm:px-6 md:px-10 py-32 overflow-hidden text-white">

          <div className="absolute inset-0 z-0">
            <img
              src="./just.png" //
              alt="Background"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { value: '150+', label: 'Projects Completed', icon: 'fa-light fa-pen-nib' },
                { value: '50+', label: 'Countries World Wide', icon: 'fa-light fa-users' },
                { value: '99%', label: 'Positive Review', icon: 'fa-light fa-thumbs-up' },
                { value: '8+', label: 'Years Experience', icon: 'fa-light fa-calendar-alt' },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white transition-all duration-300 text-center backdrop-blur-md"
                >
                  <div className="mb-4">
                    <i className={`fa-light ${stat.icon} text-5xl text-[#A27B10] group-hover:text-white group-hover:scale-110 transition-all duration-300`}></i>
                  </div>
                  <div className="text-4xl md:text-5xl font-bold text-white mb-10 mt-2">

                    <Counter end={stat.value} />
                  </div>
                  <p className="text-gray-300 font-medium tracking-wide uppercase text-sm">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <Services />
        <ProcessSection />

        <MediaGrid />
        <ReviewSection />
        {/* CTA Section */}
        <section className="relative px-4 sm:px-6 md:px-10 py-20 mt-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-accent/10 blur-3xl opacity-50" />
          <div className="max-w-4xl mx-auto text-center relative z-10 animate-slideInUp">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">Ready to Transform Your Vision?</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto mb-8 leading-relaxed">
              Let's collaborate and create something extraordinary together.
            </p>
            <a href="/Contact" className="px-8 mt-16 py-4 bg-[#A27B10] text-primary rounded-lg font-semibold  transition-all duration-300 hover:-translate-y-1">
              Get In Touch
            </a>
          </div>
        </section>
        <Footer />
      </ScrollAnimator>
    </main>
  );
}