"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Star } from "lucide-react"

interface Review {
  id: string
  author_name: string
  profile_photo_url: string
  rating: number
  text: string
  relative_time_description: string
}

export default function ReviewSection() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch reviews from your API route (Step 2)
  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await fetch("/api/reviews")
        const data = await response.json()
        setReviews(data.reviews || [])
      } catch (error) {
        console.error("Failed to fetch reviews", error)
      } finally {
        setLoading(false)
      }
    }
    fetchReviews()
  }, [])

  if (loading) return <div className="py-20 text-center text-gray-500">Loading Testimonials...</div>

  return (
    <section className="py-24 bg-[#0A0A0A] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Client <span className="text-[#AC9148]">Feedback</span></h2>
        <p className="text-gray-400">Trusted by brands worldwide for pixel-perfect design.</p>
      </div>

      <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <motion.div 
          animate={{ x: [0, -2000] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex gap-6 flex-nowrap"
        >
          {[...reviews, ...reviews].map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="w-[350px] flex-shrink-0 p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
      <div className="flex items-center gap-4 mb-4">
        <img src={review.profile_photo_url} alt={review.author_name} className="w-12 h-12 rounded-full border border-[#AC9148]/30" />
        <div>
          <h4 className="text-white font-bold text-sm">{review.author_name}</h4>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={12} fill={i < review.rating ? "#AC9148" : "none"} className={i < review.rating ? "text-[#AC9148]" : "text-gray-600"} />
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-400 text-sm italic leading-relaxed">"{review.text.substring(0, 150)}..."</p>
      <span className="block mt-4 text-[10px] text-white uppercase tracking-widest">{review.relative_time_description}</span>
    </div>
  )
}