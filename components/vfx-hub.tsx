'use client'

import { motion } from 'framer-motion'

export function VFXHubSection() {
  return (
    <section className="relative w-full h-screen bg-[#05050a] z-50 border-t border-white/5" id="vfx-hub">
      <iframe
        src="/vfx-hero.html"
        className="w-full h-full border-none"
        title="Estudio de Música VFX"
        loading="lazy"
      />
    </section>
  )
}
