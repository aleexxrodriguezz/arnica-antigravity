'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useMotionValue } from 'framer-motion'
import { Play, X } from 'lucide-react'

// YouTube IDs provided by user
const VIDEOS = [
  'XLHppmtv0YE', 
  'uWHajfb0_Ks', 
  '7fI9Ube03c8', 
  '6lHMiCqFGx8', 
]

function SubCube({ 
  position, 
  videoIndex,
  scrollYProgress,
  onOpenVideo
}: { 
  position: [number, number, number], 
  videoIndex: number,
  scrollYProgress: any,
  onOpenVideo: (id: string) => void
}) {
  const [x, y, z] = position
  const videoId = VIDEOS[videoIndex % VIDEOS.length]
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`

  // Move the sub-cube based on scroll (Explosion effect)
  // We explode between 0.4 and 0.6 of the scroll progress
  const explode = useTransform(scrollYProgress, [0.35, 0.5, 0.65], [1, 1.8, 1])
  
  const posX = useTransform(explode, (v) => x * v)
  const posY = useTransform(explode, (v) => y * v)
  const posZ = useTransform(explode, (v) => z * v)

  const faces = [
    { dir: 'front',  transform: 'translateZ(50px)',  vid: videoId },
    { dir: 'back',   transform: 'rotateY(180deg) translateZ(50px)', vid: videoId },
    { dir: 'right',  transform: 'rotateY(90deg) translateZ(50px)',  vid: videoId },
    { dir: 'left',   transform: 'rotateY(-90deg) translateZ(50px)', vid: videoId },
    { dir: 'top',    transform: 'rotateX(90deg) translateZ(50px)',  vid: videoId },
    { dir: 'bottom', transform: 'rotateX(-90deg) translateZ(50px)', vid: videoId },
  ]

  return (
    <motion.div
      className="absolute w-[100px] h-[100px]"
      style={{
        x: posX,
        y: posY,
        z: posZ,
        transformStyle: 'preserve-3d',
      }}
    >
      {faces.map((f) => (
        <div
          key={f.dir}
          className="absolute inset-0 bg-black border border-white/10 overflow-hidden flex items-center justify-center group cursor-pointer"
          style={{ transform: f.transform, backfaceVisibility: 'hidden' }}
          onClick={() => onOpenVideo(f.vid)}
        >
          <img 
            src={thumbnailUrl} 
            alt="VFX Case Study" 
            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-300 grayscale group-hover:grayscale-0 scale-110 group-hover:scale-100 transition-transform"
          />
          {/* VSL Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
             <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform">
                <Play className="w-5 h-5 text-primary-foreground fill-current ml-0.5" />
             </div>
             <span className="mt-2 text-[8px] uppercase tracking-[0.2em] font-bold text-white drop-shadow-md">Ver Caso</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-tr from-black/80 to-transparent pointer-events-none" />
        </div>
      ))}
    </motion.div>
  )
}

export function CinematicRubikCube() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeVideo, setActiveVideo] = useState<string | null>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  const progressSpring = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  // Overall Cube Transform
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1.2, 8])
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])
  const rotateX = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [45, 0, 180, 45, 0])
  const rotateY = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [-45, 0, 360, 180, 90])
  const z = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [-500, 0, 0, 1000])

  const subCubePositions: [number, number, number][] = [
    [-50, -50, -50], [50, -50, -50], [-50, 50, -50], [50, 50, -50],
    [-50, -50, 50],  [50, -50, 50],  [-50, 50, 50],  [50, 50, 50]
  ]

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-background w-full">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden" style={{ perspective: 2000 }}>
        
        {/* Loading Bar Top */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-secondary/20 z-50">
           <motion.div className="h-full bg-primary shadow-[0_0_10px_var(--primary)]" style={{ scaleX: progressSpring, transformOrigin: '0%' }} />
        </div>

        {/* Backdrop Text */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center opacity-[0.03] select-none pointer-events-none">
           <h2 className="text-[30vw] font-bold tracking-tighter uppercase font-sans">VFX</h2>
        </div>

        {/* 2x2x2 Rubik's Cube */}
        <motion.div
          className="relative w-0 h-0 flex items-center justify-center"
          style={{
            scale,
            opacity,
            rotateX,
            rotateY,
            z,
            transformStyle: 'preserve-3d',
          }}
        >
          {subCubePositions.map((pos, i) => (
            <SubCube 
              key={i} 
              position={pos} 
              videoIndex={i} 
              scrollYProgress={scrollYProgress}
              onOpenVideo={(id) => setActiveVideo(id)} 
            />
          ))}
        </motion.div>

        {/* Interactive Text */}
        <div className="absolute bottom-24 flex flex-col items-center text-center">
           <motion.div 
            className="flex flex-col items-center gap-2"
            style={{ opacity: useTransform(scrollYProgress, [0, 0.1, 0.8, 1], [0, 1, 1, 0]) }}
           >
             <p className="text-[10px] uppercase font-bold tracking-[0.5em] text-primary">Portfolio Interactivo 3D</p>
             <span className="text-[10px] uppercase font-mono text-muted-foreground opacity-60">Haz clic en las caras para explorar</span>
           </motion.div>
        </div>
      </div>

      {/* Video Modal (VSL Style) */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-8 backdrop-blur-2xl"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-6xl relative bg-neutral-900 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white hover:bg-black/80 transition-all border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="aspect-video w-full bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0&modestbranding=1`}
                  className="w-full h-full"
                  allow="autoplay; encrypted-media; fullscreen"
                />
              </div>
              
              <div className="p-6 border-t border-white/5 bg-neutral-900 flex justify-between items-center">
                 <div>
                    <h3 className="text-white text-sm font-bold tracking-widest uppercase">Visual Showreel</h3>
                    <p className="text-white/40 text-[10px] uppercase tracking-wider mt-1 font-mono">Arnica Agency · Cinematic Experience</p>
                 </div>
                 <button 
                  onClick={() => setActiveVideo(null)}
                  className="px-6 py-2 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-transform"
                 >
                   Cerrar
                 </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
