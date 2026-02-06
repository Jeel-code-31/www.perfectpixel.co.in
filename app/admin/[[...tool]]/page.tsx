"use client"

import config from '../../../sanity.config'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

// 1. Force the Studio to be a Client-Only component
const NextStudio = dynamic(
  async () => (await import('next-sanity/studio')).NextStudio,
  { ssr: false }
)

export default function StudioPage() {
  const [mounted, setMounted] = useState(false)

  // 2. Only render after the component has mounted on the client
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div style={{ height: '100vh', backgroundColor: '#101112' }} />
    );
  }

  return (
    <div data-ui="StudioWrapper" style={{ height: '100vh', minHeight: '100vh' }}>
      <NextStudio config={config} />
    </div>
  )
}