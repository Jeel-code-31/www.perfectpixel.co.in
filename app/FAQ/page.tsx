"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus, Search } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: "What is your typical project timeline?",
    answer: "Timelines vary by service. Branding projects usually take 3-4 weeks, while full-scale website designs and packaging solutions can take 6-8 weeks depending on the complexity and feedback cycles."
  },
  {
    question: "Do you offer international design services?",
    answer: "Absolutely. We work with clients globally, utilizing digital collaboration tools to ensure seamless communication regardless of your time zone."
  },
  {
    question: "How do you handle revisions?",
    answer: "Most of our packages include 2-3 rounds of revisions. We believe in a collaborative process where your feedback is integrated at key milestones to ensure the final result is perfect."
  },
  {
    question: "What industries do you specialize in?",
    answer: "While we are versatile, we have deep expertise in manufacturing, processing units (Visual SOPs), luxury retail, and tech startups."
  },
  {
    question: "Can you help with printing and production?",
    answer: "Yes, we have established relationships with trusted printers and manufacturers. We can guide you through the production process to ensure your designs are realized to the highest quality."
  },
  {
    question:"is the design with mockups included in the package?",
    answer:"Yes, all our design packages include high-quality mockups to help you visualize the final product in real-world settings."
  }
]

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <main className="bg-[#0A0A0A] min-h-screen text-[#FAF7F2]">
      <Navbar />

      <section className="py-32 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <header className="text-center mb-20">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Common <span className="text-[#B8963F]">Queries</span></h1>
            <p className="text-gray-400 text-lg">
              Everything you need to know about our process and services.
            </p>
          </header>

          {/* FAQ List */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="border border-white/10 rounded-2xl bg-white/[0.02] overflow-hidden transition-colors hover:bg-white/[0.04]"
              >
                <button
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-lg font-medium pr-8">{faq.question}</span>
                  <div className="flex-shrink-0 bg-[#B8963F]/10 p-2 rounded-full text-[#B8963F]">
                    {activeIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                  </div>
                </button>

                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTA Box */}
          <div className="mt-20 p-10 rounded-3xl bg-gradient-to-br from-[#B8963F]/20 to-transparent border border-[#B8963F]/30 text-center">
            <h3 className="text-2xl font-bold mb-2">Still have questions?</h3>
            <p className="text-gray-400 mb-6">We’re here to help you bring your vision to life.</p>
            <a href="/Contact" className="bg-[#B8963F] text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform">
              Contact Support
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}