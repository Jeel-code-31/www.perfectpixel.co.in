'use client';

import { Users, Target, Zap, Award, ArrowRight, CheckCircle } from 'lucide-react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import ScrollAnimator from '@/components/scroll-animator';
import ExpertiseSection from '@/components/experties';

export default function AboutPage() {

    // Core values data
    const values = [
        {
            title: 'Innovation First',
            description: 'We stay ahead of trends and leverage cutting-edge technologies to deliver future-ready solutions.',
            icon: Zap,
        },
        {
            title: 'Quality Driven',
            description: 'Every pixel, every line of code is crafted with precision and attention to detail.',
            icon: Award,
        },
        {
            title: 'Client Focused',
            description: 'Your success is our success. We prioritize your goals and deliver measurable results.',
            icon: Target,
        },
        {
            title: 'Collaborative',
            description: 'We work closely with you, treating your team as part of ours throughout the journey.',
            icon: Users,
        },
    ];

    const milestones = [
        { year: '2016', achievement: 'Founded with a vision to transform digital experiences' },
        { year: '2018', achievement: '50+ successful projects delivered to diverse clients' },
        { year: '2020', achievement: 'Expanded team to 50+ talented professionals' },
        { year: '2023', achievement: 'Recognized as top design agency in the region' },
        { year: '2024', achievement: '150+ projects completed with 99% client satisfaction' },
    ];
    return (
        <main className="min-h-screen bg-background text-foreground dark">
            <Navbar />
            <ScrollAnimator>
                {/* ========== HERO SECTION ========== */}
                {/* Engaging about us introduction with background animations */}
                <section className="relative min-h-[100vh] w-full overflow-hidden px-4 sm:px-6 md:px-10 flex items-center mt-20 bg-[#0A0A0A]">
                    {/* Background Video - Fixed Positioning */}
                    <div className="absolute inset-0 z-0">
                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover opacity-200"
                        >
                            <source src="/background.mp4" type="video/mp4" />
                        </video>
                        {/* Dark Gradient Overlay to make text readable */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#0A0A0A]" />
                    </div>

                    <div className="relative z-20 max-w-[1400px] mx-auto w-full">
                        <div className="max-w-4xl animate-slideInDown">
                            {/* Decorative Label */}
                            <span className="text-[#AC9148] text-xs uppercase tracking-[0.4em] font-bold mb-4 block">
                                EST In. 2023
                            </span>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-balance leading-[1.1] mb-8 text-[#FAF7F2]">
                                Crafting Digital
                                <span className="block bg-gradient-to-r from-[#AC9148] via-[#D4AF37] to-[#FAF7F2] bg-clip-text text-transparent">
                                    Excellence
                                </span>
                            </h1>

                            <p className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed font-light">
                                We are a creative collective dedicated to transforming ideas into
                                stunning digital experiences. With over <span className="text-white font-medium">4 years</span> of expertise,
                                we&apos;ve helped over <span className="text-white font-medium">20+ Clients</span> elevate their presence.
                            </p>
                        </div>
                    </div>

                    {/* Bottom Fade for Scroll transition */}
                    <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent z-10" />
                </section>

                {/* ========== OUR STORY SECTION ========== */}
                {/* Narrative about the company journey and mission */}
                <section className="relative px-4 sm:px-6 md:px-10 py-20 md:py-28 overflow-hidden">
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,212,255,0.1)_0%,transparent_100%)]" />
                    </div>

                    <div className="max-w-6xl mx-auto relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            {/* Story text content */}
                            <div className="animate-slideInUp">
                                <h2 className="text-3xl md:text-5xl font-bold mb-6">Our Story</h2>
                                <div className="space-y-4 text-foreground/70 leading-relaxed">
                                    <p>
                                        We started with a simple belief: exceptional design shouldn't be a luxury, it should be standard. In 2016, our founders came together with a shared vision to revolutionize how brands communicate digitally.
                                    </p>
                                    <p>
                                        What began as a small team of passionate designers and developers has grown into a full-service creative agency with clients spanning multiple industries and continents.
                                    </p>
                                    <p>
                                        Today, we combine strategic thinking with creative excellence to deliver digital solutions that don't just look beautiful—they drive real business results.
                                    </p>
                                </div>
                            </div>

                            {/* Story visual element - stats showcase */}
                            <div className="grid grid-cols-2 gap-6 animate-fadeIn" style={{ animationDelay: '0.75s' }}>
                                {[
                                    { number: '150+', label: 'Projects' },
                                    { number: '99%', label: 'Satisfaction' },
                                    { number: '20+', label: 'Team' },
                                    { number: '4+', label: 'Years' },
                                ].map((stat, index) => (
                                    <div
                                        key={index}
                                        className="p-8 rounded-xl bg-card border border-muted hover:border-white/50 transition-all duration-300 text-center group cursor-pointer"
                                        style={{
                                            animation: `fadeIn 0.65s ease-out forwards`,
                                            animationDelay: `${index * 100}ms`,
                                        }}
                                    >
                                        <div className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                                            {stat.number}
                                        </div>
                                        <p className="text-foreground/70 group-hover:text-[#AC9148] transition-colors duration-300">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========== CORE VALUES SECTION ========== */}
                {/* Showcases company values with icon cards and descriptions */}
                <section className="relative px-4 sm:px-6 md:px-10 py-20 md:py-28 overflow-hidden">
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
                    </div>

                    <div className="max-w-6xl mx-auto relative z-10">
                        {/* Section heading */}
                        <div className="text-center mb-16 md:mb-20 animate-slideInUp">
                            <h2 className="text-3xl md:text-5xl font-bold mb-4">What We Believe In</h2>
                            <p className="text-[#AC9148] text-foreground/70 max-w-2xl mx-auto">
                                Our core values guide every decision we make and every project we undertake
                            </p>
                        </div>

                        {/* Values grid - 4 columns on desktop, responsive on mobile */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {values.map((value, index) => (
                                <div
                                    key={index}
                                    className="group animate-slideInUp"
                                    style={{
                                        animationDelay: `${index * 100}ms`,
                                    }}
                                >
                                    <div className="relative h-full p-8 rounded-2xl bg-gradient-to-br from-muted/50 to-muted/10 border border-white/20 group-hover:border-[#AC9148]/60 transition-all duration-300">

                                        {/* Icon container */}
                                        <div className="relative mb-6">
                                            <div className="inline-flex p-3 rounded-lg group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                                                <value.icon className="w-6 h-6 text-white" />
                                            </div>
                                        </div>

                                        {/* Value title */}
                                        <h3 className="text-xl font-bold mb-3  transition-colors duration-300">
                                            {value.title}
                                        </h3>

                                        {/* Value description */}
                                        <p className="text-foreground/60 group-hover:text-[#AC9148]/110 text-sm leading-relaxed">
                                            {value.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ========== TEAM SECTION ========== */}
                {/* Highlights key team members and their expertise */}
                <section className="relative px-4 sm:px-6 md:px-10 py-20 md:py-28 overflow-hidden bg-gradient-to-b from-background to-muted/30">
                    <div className="max-w-6xl mx-auto relative z-10">
                        {/* Section heading */}
                        <div className="text-center mb-16 md:mb-20 animate-slideInUp">
                            <h2 className="text-3xl md:text-5xl font-bold mb-4">Meet Our Team</h2>
                            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                                Talented individuals working together to create extraordinary digital experiences
                            </p>
                        </div>

                        {/* Team members grid - 2 columns on tablet, 4 on desktop */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { name: 'Prawin Mw', role: 'CEO & Founder', contact: 'pravin@perfectpixel.co.in', Image: 'web3.jpg' },
                                { name: 'Jahan Patel', role: 'Digital Marketing Specialist', contact: 'jahandms60@gmail.com', Image:''},
                                { name: 'Abhay Hippakra', role: 'Graphic Designer', contact: 'abhay357015@gmail.com' ,Image:''},
                                { name: 'Harsh Makwana', role: 'Content Writer', contact: 'alex@gmail.com', Image:''},
                                { name: 'Jeel Darji', role: 'Website Designer & Developer', contact: 'darjijeel31@gmail.com',Image:'' },
                            ].map((member, index) => (
                                <div
                                    key={index}
                                    className="group animate-slideInUp"
                                    style={{
                                        animationDelay: `${index * 100}ms`,
                                    }}
                                >
                                    <div className="relative rounded-2xl overflow-hidden bg-card border border-muted group-hover:border-white transition-all duration-300">
                                        {/* Placeholder for team member image */}
                                        <div className="w-full h-70 flex items-center justify-center group-hover:from-[#AC9148]/30 group-hover:to-accent/10 transition-all duration-300">
                                            <img src={member.Image} className="w-full h-full object-cover text-white/50 group-hover:text-[#AC9148] transition-colors duration-300 group-hover:scale-110" />
                                        </div>
                                        {/* Team member info */}
                                        <div className="p-6">
                                            <h3 className="text-lg font-bold mt-1 transition-colors duration-300 mt-5">
                                                {member.name}
                                            </h3>

                                            <p className="text-foreground/60 group-hover:text-[#AC9148] text-sm mb-4 mt-4">{member.role}</p>
                                            <div className="flex items-center gap-3 my-4 mt-6">
                                                <span className="text-[10px] uppercase tracking-widest text-foreground/40 font-bold">Contact</span>
                                                <div className="h-[1px] flex-1 bg-[#AC9148]/20 group-hover:bg-[#AC9148]/50 transition-colors duration-300" />
                                            </div>
                                             <a href={`mailto:${member.contact}`}
                                                className='text-foreground/60 group-hover:text-[#AC9148] text-sm mb-2 mt-1'>{member.contact}</a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ========== MILESTONE SECTION ========== */}
                {/* Company timeline showcasing growth and achievements */}
                <section className="relative px-4 sm:px-6 md:px-10 py-20 md:py-28 overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute -left-20 top-1/2 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
                    </div>

                    <div className="max-w-4xl mx-auto relative z-10">
                        {/* Section heading */}
                        <div className="text-center mb-16 md:mb-20 animate-slideInUp">
                            <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Journey</h2>
                            <p className="text-lg text-foreground/70">
                                Key milestones that shaped our growth and success
                            </p>
                        </div>

                        {/* Timeline visualization */}
                        <div className="space-y-8">
                            {milestones.map((milestone, index) => (
                                <div
                                    key={index}
                                    className="animate-slideInUp"
                                    style={{
                                        animationDelay: `${index * 100}ms`,
                                    }}
                                >
                                    <div className="flex gap-6 items-start">
                                        {/* Timeline dot and line */}
                                        <div className="flex flex-col items-center">
                                            <div className="w-4 h-4 rounded-full bg-[#AC9148] ring-4 ring-[#AC9148]/20 group-hover:ring-[#AC9148]/50 transition-all duration-300" />
                                            {index !== milestones.length - 1 && (
                                                <div className="w-1 h-20 bg-gradient-to-b from-[#AC9148]/50 to-transparent mt-2" />
                                            )}
                                        </div>

                                        {/* Milestone content card */}
                                        <div className="flex-1 p-6 rounded-lg border border-muted hover:border-[#AC9148] transition-all duration-300 group cursor-pointer">
                                            <div className="text-2xl font-bold text-white mb-2">{milestone.year}</div>
                                            <p className="text-foreground/70 group-hover:text-foreground transition-colors duration-300">
                                                {milestone.achievement}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <ExpertiseSection />


                {/* ========== CTA SECTION ========== */}
                {/* Final call-to-action encouraging collaboration */}
                <section className="relative px-4 sm:px-6 md:px-10 py-20 md:py-28 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-accent/10 blur-3xl opacity-50" />

                    <div className="max-w-4xl mx-auto text-center relative z-10 animate-slideInUp">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">Ready to Create Something Amazing?</h2>
                        <p className="text-lg text-foreground/70 max-w-2xl mx-auto mb-8 leading-relaxed">
                            Let's collaborate and bring your vision to life with our expertise and passion for digital excellence.
                        </p>
                        <a href='/Contact' className="px-8 py-4 bg-[#AC9148] text-primary rounded-lg font-semibold transition-all duration-300 hover:-translate-y-1 mt-10">
                            Start Your Project
                        </a>
                    </div>
                </section>
                <Footer />
            </ScrollAnimator>
        </main>
    );
}

