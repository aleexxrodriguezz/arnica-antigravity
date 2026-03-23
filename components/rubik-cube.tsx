'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

export function CinematicRubikCube() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'] // Track the full 400vh height
  })

  // Smooth progress for the loader
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Cinematic Timeframes:
  // 0.0 - 0.2: Zoom in from afar
  // 0.2 - 0.5: Rotate to show sides (cinematic movement)
  // 0.5 - 0.8: Rotate complex / spin
  // 0.8 - 1.0: Fly through / Exit

  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.15, 1, 1, 8]
  )

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [0, 1, 1, 0]
  )

  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [45, 0, 15, -15, 90, -45]
  )

  const rotateY = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [-45, 0, -90, 90, 180, 180]
  )

  const z = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [-1000, 0, 0, 2000]
  )

  const faces = [
    { name: 'front', transform: 'translateZ(200px)' },
    { name: 'back', transform: 'rotateY(180deg) translateZ(200px)' },
    { name: 'right', transform: 'rotateY(90deg) translateZ(200px)' },
    { name: 'left', transform: 'rotateY(-90deg) translateZ(200px)' },
    { name: 'top', transform: 'rotateX(90deg) translateZ(200px)' },
    { name: 'bottom', transform: 'rotateX(-90deg) translateZ(200px)' },
  ]

  const VIDEOS = [
    'XLHppmtv0YE', 
    'uWHajfb0_Ks', 
    '7fI9Ube03c8', 
    '6lHMiCqFGx8', 
  ]

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-background w-full">
      
      {/* Sticky container */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden" style={{ perspective: 1500 }}>
        
        {/* Progress Loader (Loading Element) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] border border-primary/10 rounded-full pointer-events-none -z-10">
           <motion.div 
             className="absolute inset-0 border-2 border-primary/40 rounded-full"
             style={{ 
               scale: useTransform(scrollYProgress, [0, 1], [0.8, 1.2]),
               opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]),
               borderStyle: 'dashed'
             }}
           />
        </div>

        {/* Global Loading Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-secondary/20 z-50">
           <motion.div 
             className="h-full bg-primary"
             style={{ scaleX, transformOrigin: '0%' }}
           />
        </div>

        {/* The Cube */}
        <motion.div
          className="relative w-[400px] h-[400px]"
          style={{
            scale,
            opacity,
            rotateX,
            rotateY,
            z,
            transformStyle: 'preserve-3d',
          }}
        >
          {faces.map((face) => (
            <div
              key={face.name}
              className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-2 bg-transparent"
              style={{
                transform: face.transform,
              }}
            >
              {VIDEOS.map((videoId, idx) => (
                <div
                  key={`${face.name}-${idx}`}
                  className="w-full h-full rounded-sm border border-border/20 bg-black/80 flex items-center justify-center overflow-hidden group shadow-2xl relative"
                >
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1`}
                    className="absolute inset-0 w-[400%] h-[400%] -top-[150%] -left-[150%] pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity duration-700"
                    allow="autoplay; encrypted-media"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-background/60 to-transparent pointer-events-none" />
                </div>
              ))}
            </div>
          ))}
        </motion.div>

        {/* Guidance / Status Text */}
        <div className="absolute bottom-20 flex flex-col items-center gap-4">
          <motion.p 
            className="text-[10px] uppercase tracking-[0.5em] font-mono text-primary"
            style={{ opacity: useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]) }}
          >
            Sincronizando Archivos VFX
          </motion.p>
          <div className="flex gap-2">
            {[0, 1, 2, 3].map(i => (
               <motion.div 
                key={i}
                className="w-1 h-1 bg-primary rounded-full"
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
               />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
