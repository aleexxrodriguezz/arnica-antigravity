'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export function RubikCubeSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  // Animate rotation based on scroll.
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 360])
  const rotateY = useTransform(scrollYProgress, [0, 1], [-45, 315])

  // Cube faces configuration (Size: 300x300 => Translate: 150px)
  const faces = [
    { name: 'front', transform: 'translateZ(150px)' },
    { name: 'back', transform: 'rotateY(180deg) translateZ(150px)' },
    { name: 'right', transform: 'rotateY(90deg) translateZ(150px)' },
    { name: 'left', transform: 'rotateY(-90deg) translateZ(150px)' },
    { name: 'top', transform: 'rotateX(90deg) translateZ(150px)' },
    { name: 'bottom', transform: 'rotateX(-90deg) translateZ(150px)' },
  ]

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[80vh] flex flex-col items-center justify-center overflow-hidden bg-background py-24"
      style={{ perspective: 1200 }}
    >
      <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center">
        <div className="w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-primary/10 blur-[120px] rounded-full" />
      </div>

      <motion.div
        className="relative w-[300px] h-[300px] hover:scale-105 transition-transform duration-700 ease-out"
        style={{
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
            {[0, 1, 2, 3].map((cell) => (
              <div
                key={cell}
                className="w-full h-full rounded-sm border border-border/30 bg-secondary/10 backdrop-blur-md shadow-[inset_0_0_20px_rgba(0,0,0,0.2)] overflow-hidden group flex items-center justify-center transition-all duration-500 hover:bg-primary/20 hover:border-primary/50"
              >
                {/* Empty space ready for images in the future */}
                <div className="w-4 h-4 rounded-full bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
              </div>
            ))}
          </div>
        ))}
      </motion.div>
      
      <div className="mt-32 text-center opacity-40">
        <p className="text-[10px] uppercase tracking-[0.4em] font-mono text-foreground">Próximamente</p>
      </div>
    </section>
  )
}
