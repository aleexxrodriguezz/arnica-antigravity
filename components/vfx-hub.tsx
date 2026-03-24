'use client'

import { motion } from 'framer-motion'
import { useTheme } from '@/components/theme-provider'

export function VFXHubSection() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <section 
      className="relative w-full h-screen z-50 border-t bg-[#fef9f3] dark:bg-[#000000] border-black/5 dark:border-white/5" 
      id="vfx-hub"
    >
      <iframe
        src="/vfx-hero.html"
        className="w-full h-full border-none"
        title="Estudio de Música VFX"
        loading="lazy"
      />
    </section>
  )
}
