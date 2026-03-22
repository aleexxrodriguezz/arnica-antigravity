'use client'

import { motion } from 'framer-motion'

interface GlassCardProps {
  title: string
  description: string
  delay?: number
}

export function GlassCard({ title, description, delay = 0 }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay, ease: [0.33, 1, 0.68, 1] }}
      className="glass-card-parent"
    >
      <div className="glass-card">
        <div className="glass-card-glass" />
        <div className="glass-card-content">
          <span className="title">{title}</span>
          <span className="text">{description}</span>
        </div>
      </div>
    </motion.div>
  )
}
