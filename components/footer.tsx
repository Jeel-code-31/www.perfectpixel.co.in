'use client';

import { Mail, Github, Linkedin, Twitter } from 'lucide-react';

// Types for Sanity/Props
interface FooterProps {
  settings?: {
    siteTitle?: string;
    contactSummary?: string;
  };
  contactInfo?: {
    email?: string[];
    phones?: string[];
    address?: string;
  };
}

const socialLinks = [
  { icon: Linkedin, href: 'https://www.linkedin.com/company/perfectpixel-design-that-works', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:design@perfectpixel.co.in', label: 'Email' },
];

export default function Footer({ settings, contactInfo }: FooterProps) {
  // Constants with Fallbacks
  const siteTitle = settings?.siteTitle || "Perfect Pixel";
  const contactSummary = settings?.contactSummary || "Reimagining spaces as lasting cultural landmarks through monumental art and sculptural excellence.";
  const email = contactInfo?.email?.[0] || "design@perfectpixel.co.in";
  const phones = contactInfo?.phones?.[0] || "+91 7972823811";

  const addresses = [
    {
      title: "Head Office",
      lines: ["National Plaza", "S5 2nd Floor, Alkapuri", "Vadodara, Gujarat"],
    },
  ];

  return (
    <footer
      id="contact"
      className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-[#1A1815] border-t border-white/10 relative overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between gap-12 mb-16">
          
          {/* Left Side: Brand & Summary */}
          <div className="space-y-6 max-w-md">
            <div className="flex flex-col space-y-2">
              <span className="font-serif text-xl md:text-3xl font-semibold text-[#FAF7F2] tracking-tight transition-all duration-300 hover:tracking-wider cursor-default">
                {siteTitle}<sup className="text-xs align-super ml-1 opacity-50">TM</sup>
              </span>
              <p className="text-[#E8E2D9]/80 text-lg leading-relaxed pt-4">
                {contactSummary}
              </p>
            </div>
          </div>

          {/* Right Side: Address & Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-16">
            
            {/* Office Locations */}
            {addresses.map((office, idx) => (
              <div key={idx} className="space-y-4">
                <span className="text-xs uppercase tracking-[0.2em] text-[#B8963F] font-bold mt-2 block">
                  ({office.title})
                </span>
                <div className="text-[#FAF7F2]/70 text-sm leading-6 space-y-1">
                  {office.lines.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            ))}

            {/* Direct Contact */}
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.2em] text-[#B8963F] font-bold">
                (Contact Us)
              </span>
              <div className="space-y-3">
                <a
                  href={`mailto:${email}`}
                  className="block text-[#FAF7F2] text-sm font-medium hover:text-[#B8963F] transition-colors duration-300 mt-5"
                >
                  {email}
                </a>
                <a
                  href={`tel:${phones.replace(/\s/g, '')}`}
                  className="block text-[#FAF7F2] text-sm font-medium hover:text-[#B8963F] transition-colors duration-300"
                >
                  {phones}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] w-full bg-white/10 mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-[#D9D4CC]/40 text-xs tracking-wide text-center md:text-left">
            @2025 PERFECT-PIXEL DESIGNS THAT WORK. <br className="md:hidden" /> ALL RIGHTS RESERVED.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="group p-3 rounded-full border border-white/10 hover:border-[#B8963F] bg-white/5 hover:bg-[#B8963F]/10 transition-all duration-500"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4 text-[#FAF7F2]/60 group-hover:text-[#B8963F] transition-colors duration-300" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}