import React from "react"
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import Preloader from "@/components/preloader"
/* Fixed imports to match the fonts you're using */
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google';

// Configure Outfit for Headings
const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-outfit', 
});

// Configure Plus Jakarta Sans for Body/Paragraphs
const jakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  variable: '--font-jakarta',
});

export const metadata: Metadata = {
  title: 'Perfectpixel - Design that works',
  description: 'Design that works. Perfectpixel is a design agency specializing in creating user-centric, visually stunning digital experiences that drive results.',
  icons: {
    icon: '/logo1.png',
    apple: '/logo1.png', 
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark scroll-smooth ${outfit.variable} ${jakarta.variable}`}>
      <head>
        <link 
          rel="stylesheet" 
          href="https://site-assets.fontawesome.com/releases/v6.5.1/css/all.css" 
        />
      </head>
      <body className="antialiased bg-background text-foreground font-jakarta">
        {children}
        <Analytics />
        <Preloader />
      </body>
    </html>
  )
}