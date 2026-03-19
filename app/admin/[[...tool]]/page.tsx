"use client"

import config from '../../../sanity.config'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

// 1. Fully disable SSR for the Studio component. 
// This prevents the server from generating HTML that conflicts with the browser.
const NextStudio = dynamic(
  async () => {
    const { NextStudio: Studio } = await import('next-sanity/studio')
    return Studio
  },
  { 
    ssr: false,
    loading: () => <div style={{ height: '100vh', backgroundColor: '#101112' }} />
  }
)

export default function StudioPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // 2. We return the loading state until mounted to ensure 
  // the 'StudioWrapper' div also doesn't cause a mismatch.
  if (!mounted) {
    return <div style={{ height: '100vh', backgroundColor: '#101112' }} />
  }

  return (
    <div 
      data-ui="StudioWrapper" 
      style={{ height: '100vh', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <NextStudio config={config} />
    </div>
  )
}