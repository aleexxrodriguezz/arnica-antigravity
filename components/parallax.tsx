'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'

/** Wraps children in a vertical parallax layer.
 *  speed > 0 → moves up slower than scroll (feels deep/behind)
 *  speed < 0 → moves up faster (feels close/in-front)
 */
export function ParallaxLayer({
  children,
  speed = 0.2,
  className,
}: {
  children: React.ReactNode
  speed?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * 100}px`, `${-speed * 100}px`])

  return (
    <div ref={ref} className="relative" style={{ position: 'relative' }}>
      <motion.div style={{ y }} className={className}>
        {children}
      </motion.div>
    </div>
  )
}

/** Reveals children with an expanding clip-path mask when they enter the viewport. */
export function MaskReveal({
  children,
  className,
  delay = 0,
  direction = 'up',
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right'
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  const clipStart: Record<string, string> = {
    up:    'inset(100% 0% 0% 0%)',
    left:  'inset(0% 100% 0% 0%)',
    right: 'inset(0% 0% 0% 100%)',
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ clipPath: clipStart[direction] }}
      animate={inView ? { clipPath: 'inset(0% 0% 0% 0%)' } : {}}
      transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

/** Fades + slides children in when they enter the viewport. */
export function FadeUp({
  children,
  className,
  delay = 0,
  distance = 40,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  distance?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-8% 0px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: distance }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

/** Scrub-linked horizontal text ticker that moves at scroll speed. */
export function ScrollLine({
  text,
  className,
  style,
}: {
  text: string
  className?: string
  style?: React.CSSProperties
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-25%'])

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className ?? ''}`} style={{ position: 'relative' }}>
      <motion.div style={{ x, ...style }} className="flex whitespace-nowrap">
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className="pr-16">{text}</span>
        ))}
      </motion.div>
    </div>
  )
}
