'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export function CinematicRubikCube() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'] // Track the full 400vh height
  })

  // Cinematic Timeframes:
  // 0.0 - 0.2: Zoom in from afar
  // 0.2 - 0.4: Rotate to show Right Face
  // 0.4 - 0.6: Rotate to show Top Face
  // 0.6 - 0.8: Rotate complex to Back/Bottom
  // 0.8 - 1.0: Zoom extremely into the cube (fly through)

  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.2, 1, 1, 10]
  )

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.8, 1],
    [0, 1, 1, 0]
  )

  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [35, 0, 0, 90, -45, -45]
  )

  const rotateY = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [-45, 0, -90, -90, 180, 180]
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
    'XLHppmtv0YE', // Video 1
    'uWHajfb0_Ks', // Video 2
    '7fI9Ube03c8', // Video 3
    '6lHMiCqFGx8', // Video 4
  ]

  return (
    // 400vh gives us plenty of scroll room for the cinematic
    <section ref={containerRef} className="relative h-[400vh] bg-background w-full">
      
      {/* Sticky container that stays on screen while scrolling the 400vh */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden" style={{ perspective: 1500 }}>
        
        {/* Glow Background */}
        <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center">
          <motion.div 
            className="w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-primary/10 blur-[150px] rounded-full"
            style={{ opacity }}
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
                  {/* YouTube Iframe Embedded */}
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1`}
                    className="absolute inset-0 w-[300%] h-[300%] -top-[100%] -left-[100%] pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                    allow="autoplay; encrypted-media"
                    loading="lazy"
                  />
                  {/* Glass overly for aesthetic */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-background/40 to-transparent pointer-events-none" />
                </div>
              ))}
            </div>
          ))}
        </motion.div>

        {/* Guidance Text */}
        <motion.div 
          className="absolute bottom-12 text-center"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [1, 0, 0, 1]) }}
        >
          <p className="text-[10px] uppercase tracking-[0.4em] font-mono text-muted-foreground animate-pulse">
            Scroll para explorar
          </p>
        </motion.div>
      </div>
    </section>
  )
}
