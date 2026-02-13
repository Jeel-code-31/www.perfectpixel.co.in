"use client"

import React from 'react'
import { Mail, Phone, MapPin, Send,Clock } from 'lucide-react'
import Navbar from '@/components/navbar'
import { motion } from 'framer-motion'
import footer from '@/components/footer'
import { Footer } from 'react-day-picker'

const zigZagPath = "M0,10 L150,10 L170,2 L210,18 L250,2 L290,18 L330,10 L470,10 L490,2 L530,18 L570,2 L610,18 L650,10 L800,10";
export default function ContactPage() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create a FormData object from the form
    const formData = new FormData(e.currentTarget);

    // Add your Access Key
    formData.append("access_key", "c97e9f0b-f024-43a5-b2d6-d484e3c3a78a");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      alert("Your Message sent successfully!");
      (e.target as HTMLFormElement).reset();
    } else {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-[#0A0A0A] pt-32 pb-20 px-4 sm:px-6 lg:px-10">
      <Navbar />
      <div className="max-w-[800px] mx-auto relative z-10">

        {/* Header Section - Centered */}
        <header className="mt-20 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Get in <span className="text-[#AC9148]">Touch</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
            Have a monumental project in mind? We'd love to hear from you.
            Let's build something extraordinary together.
          </p>
        </header>

        <div className="relative max-w-6xl mx-auto mt-20 px-4">

          <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 hidden md:block pointer-events-none">
            <svg
              width="100%"
              height="40"
              viewBox="0 0 800 20"
              preserveAspectRatio="none"
              className="overflow-visible"
            >
              {/* Static Zig-Zag Background */}
              <path
                d={zigZagPath}
                fill="none"
                stroke="rgba(172, 145, 72, 0.15)"
                strokeWidth="1.5"
              />

              {/* Moving Glow Dot */}
              <motion.g
                initial={{ offsetDistance: "0%" }}
                animate={{ offsetDistance: "100%" }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{ offsetPath: `path("${zigZagPath}")` }}
              >

                <circle r="6" fill="#AC9148" className="blur-[2px] opacity-50" />

                <circle r="3" fill="#AC9148" />
              </motion.g>
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">

            {/* Card 1 */}
            <motion.div
              whileHover={{ y: -8, borderColor: "rgba(172, 145, 72, 0.4)" }}
              className="group text-center p-8 border border-white/10 rounded-3xl bg-[#0A0A0A]/80 backdrop-blur-xl transition-colors duration-300"
            >
              <div className="w-14 h-14 bg-[#AC9148]/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#AC9148]/20 transition-colors">
                <Mail className="text-[#AC9148]" size={24} />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Email</h3>
              <p className="text-gray-400 text-sm font-medium">design@perfectpixel.co.in</p>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              whileHover={{ y: -8, borderColor: "rgba(172, 145, 72, 0.4)" }}
              className="group text-center p-8 border border-white/10 rounded-3xl bg-[#0A0A0A]/80 backdrop-blur-xl transition-colors duration-300"
            >
              <div className="w-14 h-14 bg-[#AC9148]/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#AC9148]/20 transition-colors">
                <Phone className="text-[#AC9148]" size={24} />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Call</h3>
              <p className="text-gray-400 text-sm font-medium">+91 7972823811</p>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              whileHover={{ y: -8, borderColor: "rgba(172, 145, 72, 0.4)" }}
              className="group text-center p-8 border border-white/10 rounded-3xl bg-[#0A0A0A]/80 backdrop-blur-xl transition-colors duration-300"
            >
              <div className="w-14 h-14 bg-[#AC9148]/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#AC9148]/20 transition-colors">
                <MapPin className="text-[#AC9148]" size={24} />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Location</h3>
              <p className="text-gray-400 text-sm font-medium">S5 02nd Floor,<br></br> National Plaza, Alkapuri,Vadodara, Gujarat</p>
            </motion.div>
             <motion.div
              whileHover={{ y: -8, borderColor: "rgba(172, 145, 72, 0.4)" }}
              className="group text-center p-8 border border-white/10 rounded-3xl bg-[#0A0A0A]/80 backdrop-blur-xl transition-colors duration-300"
            >
              <div className="w-14 h-14 bg-[#AC9148]/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#AC9148]/20 transition-colors">
                <Clock className="text-[#AC9148]" size={24} />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Office Timing</h3>
              <p className="text-gray-400 text-sm font-medium">Mon - Sat: 09:30 AM - 6:30 PM</p>
            </motion.div>

          </div>
        </div>

        <section className="bg-white/[0.03] p-6 md:p-12 rounded-3xl border border-white/10 shadow-2xl mt-25">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Send us a Message</h2>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative group">
                <input
                  name='name'
                  type="name"
                  required
                  placeholder="Full Name"
                  className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-[#AC9148] transition-all placeholder:text-gray-600"
                />
              </div>

              <div className="relative group">
                <input
                  name='email'
                  type="email"
                  required
                  placeholder="Email Address"
                  className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-[#AC9148] transition-all placeholder:text-gray-600"
                />
              </div>
            </div>

            <div className="relative group">
              <input
                name='User_subject'
                type="text"
                placeholder="Subject"
                className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-[#AC9148] transition-all placeholder:text-gray-600"
              />
            </div>

            <div className="relative group">
              <textarea
                name='Message'
                rows={4}
                required
                placeholder="How can we help you?"
                className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-[#AC9148] transition-all placeholder:text-gray-600 resize-none"
              />
            </div>
            <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />
            <div className="flex justify-center pt-6">
              <button
                type="submit"
                className="px-12 py-4 bg-[#AC9148] hover:bg-[#8e773a] text-black font-bold rounded-full flex items-center gap-3 transition-all transform hover:scale-105 active:scale-95"
              >
                <span>Send Message</span>
                <Send size={18} />
              </button>
            </div>
          </form>
        </section>
        <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-white/[0.03] p-6 md:p-12 border-y border-white/10 shadow-2xl mt-24">
          <div className="max-w-7xl mx-auto"> {/* Keeps the heading aligned with your site's container */}
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Our Location</h2>

            <div className="w-full overflow-hidden rounded-2xl border border-white/5">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.1366663426675!2d73.16965257359124!3d22.31067054252276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc980884422df%3A0x6d244fae8d97a233!2sNational%20Plaza!5e0!3m2!1sen!2sin!4v1769751413753!5m2!1sen!2sin"
                className="w-full h-[100vh] md:h-[500px] border-0" 
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Location"
              />
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}