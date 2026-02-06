import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

const Sample = () => {
  return (
    <div className="relative max-w-5xl mx-auto mt-20">
      {/* The Animated Line Layer */}
      <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 hidden md:block px-20">
        <svg width="100%" height="20" viewBox="0 0 800 20" fill="none">
          {/* Static Background Line */}
          <line x1="0" y1="10" x2="800" y2="10" stroke="rgba(172, 145, 72, 0.2)" strokeWidth="2" strokeDasharray="4 4" />
          
          {/* The Moving Dot */}
          <motion.circle
            r="10"
            fill="#AC9148"
            initial={{ cx: "0%" }}
            animate={{ cx: "100%" }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </svg>
      </div>

      {/* Your Containers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {/* Card 1: Email */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="text-center p-6 border border-white/5 rounded-2xl bg-[#0A0A0A] backdrop-blur-sm"
        >
          <Mail className="text-[#AC9148] mx-auto mb-4" size={28} />
          <h3 className="text-white font-semibold mb-1">Email</h3>
          <p className="text-gray-500 text-sm">design@perfectpixel.co.in</p>
        </motion.div>

        {/* Card 2: Phone */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="text-center p-6 border border-white/5 rounded-2xl bg-[#0A0A0A]"
        >
          <Phone className="text-[#AC9148] mx-auto mb-4" size={28} />
          <h3 className="text-white font-semibold mb-1">Call</h3>
          <p className="text-gray-500 text-sm">+91 98765 43210</p>
        </motion.div>

        {/* Card 3: Studio */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="text-center p-6 border border-white/5 rounded-2xl bg-[#0A0A0A]"
        >
          <MapPin className="text-[#AC9148] mx-auto mb-4" size={28} />
          <h3 className="text-white font-semibold mb-1">Studio</h3>
          <p className="text-gray-500 text-sm">Vadodara, Gujarat</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Sample;