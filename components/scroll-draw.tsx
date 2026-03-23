'use client'

import { useRef, useEffect, useState } from 'react'
import { useScroll, useTransform, motion, useMotionValueEvent } from 'framer-motion'
import { useTheme } from '@/components/theme-provider'
import { useParallaxTechSound } from '@/hooks/use-sounds'
import { useIsMobile } from '@/hooks/use-mobile'

/* ─── Theme-aware color helpers ───────────────────────────────────── */
const getColors = (isDark: boolean) => ({
  primary: isDark ? '#fef9f3' : '#000000',
  primaryAlpha50: isDark ? 'rgba(254,249,243,0.5)' : 'rgba(0,0,0,0.5)',
  primaryAlpha35: isDark ? 'rgba(254,249,243,0.35)' : 'rgba(0,0,0,0.35)',
  primaryAlpha20: isDark ? 'rgba(254,249,243,0.2)' : 'rgba(0,0,0,0.2)',
  secondary: isDark ? 'rgba(254,249,243,0.25)' : 'rgba(0,0,0,0.15)',
  secondaryMuted: isDark ? 'rgba(254,249,243,0.18)' : 'rgba(0,0,0,0.12)',
  secondaryFaint: isDark ? 'rgba(254,249,243,0.12)' : 'rgba(0,0,0,0.08)',
  nodeSecondary: isDark ? '#333333' : 'rgba(0,0,0,0.4)',
  nodeFaint: isDark ? '#555555' : 'rgba(0,0,0,0.3)',
  nodeStroke: isDark ? '#1a1a1a' : 'transparent',
})

/* ─── Path data generator ─────────────────────────────────────────── */
const getPaths = (colors: ReturnType<typeof getColors>) => [
  { d: 'M500 30 L500 670', startAt: 0, endAt: 0.08, color: colors.primary, width: 1.5, label: 'CORE', labelX: 514, labelY: 350 },
  { d: 'M140 130 L860 130', startAt: 0.04, endAt: 0.12, color: colors.secondary, width: 1 },
  { d: 'M100 350 L900 350', startAt: 0.08, endAt: 0.17, color: colors.secondaryMuted, width: 1 },
  { d: 'M140 570 L860 570', startAt: 0.14, endAt: 0.22, color: colors.secondary, width: 1 },
  { d: 'M500 130 L500 130 L280 130 L200 210', startAt: 0.10, endAt: 0.18, color: colors.primary, width: 1.5 },
  { d: 'M500 350 L280 350 L180 350', startAt: 0.15, endAt: 0.23, color: colors.primary, width: 1.5, label: 'INPUT', labelX: 152, labelY: 345 },
  { d: 'M500 570 L280 570 L200 490', startAt: 0.20, endAt: 0.28, color: colors.primary, width: 1.5 },
  { d: 'M500 130 L720 130 L800 210', startAt: 0.10, endAt: 0.18, color: colors.primary, width: 1.5 },
  { d: 'M500 350 L720 350 L820 350', startAt: 0.15, endAt: 0.23, color: colors.primary, width: 1.5, label: 'OUTPUT', labelX: 824, labelY: 345 },
  { d: 'M500 570 L720 570 L800 490', startAt: 0.20, endAt: 0.28, color: colors.primary, width: 1.5 },
  { d: 'M200 210 L200 490', startAt: 0.22, endAt: 0.30, color: colors.secondary, width: 1 },
  { d: 'M120 210 L280 210', startAt: 0.24, endAt: 0.31, color: colors.secondary, width: 1 },
  { d: 'M120 350 L280 350', startAt: 0.25, endAt: 0.32, color: colors.secondary, width: 1 },
  { d: 'M120 490 L280 490', startAt: 0.26, endAt: 0.33, color: colors.secondary, width: 1 },
  { d: 'M120 210 L120 490', startAt: 0.27, endAt: 0.34, color: colors.secondary, width: 1 },
  { d: 'M800 210 L800 490', startAt: 0.22, endAt: 0.30, color: colors.secondary, width: 1 },
  { d: 'M720 210 L880 210', startAt: 0.24, endAt: 0.31, color: colors.secondary, width: 1 },
  { d: 'M720 350 L880 350', startAt: 0.25, endAt: 0.32, color: colors.secondary, width: 1 },
  { d: 'M720 490 L880 490', startAt: 0.26, endAt: 0.33, color: colors.secondary, width: 1 },
  { d: 'M880 210 L880 490', startAt: 0.27, endAt: 0.34, color: colors.secondary, width: 1 },
  { d: 'M500 350 m-90,0 a90,90 0 1,0 180,0 a90,90 0 1,0 -180,0', startAt: 0.32, endAt: 0.44, color: colors.primary, width: 1.5, label: 'PROCESS', labelX: 452, labelY: 354 },
  { d: 'M500 350 m-140,0 a140,140 0 1,0 280,0 a140,140 0 1,0 -280,0', startAt: 0.38, endAt: 0.50, color: colors.primaryAlpha35, width: 1 },
  { d: 'M500 350 m-55,0 a55,55 0 1,0 110,0 a55,55 0 1,0 -110,0', startAt: 0.34, endAt: 0.43, color: colors.secondaryFaint, width: 1 },
  { d: 'M500 260 L500 295', startAt: 0.36, endAt: 0.42, color: colors.secondary, width: 1 },
  { d: 'M500 405 L500 440', startAt: 0.36, endAt: 0.42, color: colors.secondary, width: 1 },
  { d: 'M410 350 L445 350', startAt: 0.36, endAt: 0.42, color: colors.secondary, width: 1 },
  { d: 'M555 350 L590 350', startAt: 0.36, endAt: 0.42, color: colors.secondary, width: 1 },
  { d: 'M200 210 Q340 280 410 310', startAt: 0.42, endAt: 0.52, color: colors.primaryAlpha50, width: 1 },
  { d: 'M200 490 Q340 420 410 390', startAt: 0.42, endAt: 0.52, color: colors.primaryAlpha50, width: 1 },
  { d: 'M800 210 Q660 280 590 310', startAt: 0.42, endAt: 0.52, color: colors.primaryAlpha50, width: 1 },
  { d: 'M800 490 Q660 420 590 390', startAt: 0.42, endAt: 0.52, color: colors.primaryAlpha50, width: 1 },
  { d: 'M120 210 L80 170 L80 80 L160 80', startAt: 0.50, endAt: 0.58, color: colors.secondaryMuted, width: 1, label: 'NODE_A', labelX: 80, labelY: 64 },
  { d: 'M160 80 L440 80 L440 30', startAt: 0.54, endAt: 0.62, color: colors.secondaryFaint, width: 1 },
  { d: 'M880 210 L920 170 L920 80 L840 80', startAt: 0.50, endAt: 0.58, color: colors.secondaryMuted, width: 1, label: 'NODE_B', labelX: 880, labelY: 64 },
  { d: 'M840 80 L560 80 L560 30', startAt: 0.54, endAt: 0.62, color: colors.secondaryFaint, width: 1 },
  { d: 'M120 490 L80 530 L80 620 L160 620', startAt: 0.56, endAt: 0.64, color: colors.secondaryMuted, width: 1, label: 'NODE_C', labelX: 80, labelY: 638 },
  { d: 'M160 620 L440 620 L440 670', startAt: 0.60, endAt: 0.68, color: colors.secondaryFaint, width: 1 },
  { d: 'M880 490 L920 530 L920 620 L840 620', startAt: 0.56, endAt: 0.64, color: colors.secondaryMuted, width: 1, label: 'NODE_D', labelX: 846, labelY: 638 },
  { d: 'M840 620 L560 620 L560 670', startAt: 0.60, endAt: 0.68, color: colors.secondaryFaint, width: 1 },
  { d: 'M340 130 L340 210', startAt: 0.62, endAt: 0.68, color: colors.secondaryFaint, width: 1 },
  { d: 'M660 130 L660 210', startAt: 0.62, endAt: 0.68, color: colors.secondaryFaint, width: 1 },
  { d: 'M340 490 L340 570', startAt: 0.62, endAt: 0.68, color: colors.secondaryFaint, width: 1 },
  { d: 'M660 490 L660 570', startAt: 0.62, endAt: 0.68, color: colors.secondaryFaint, width: 1 },
  { d: 'M500 350 m-200,0 a200,200 0 0,1 400,0', startAt: 0.68, endAt: 0.78, color: colors.primaryAlpha20, width: 1 },
  { d: 'M500 350 m-200,0 a200,200 0 0,0 400,0', startAt: 0.70, endAt: 0.80, color: colors.primaryAlpha20, width: 1 },
  { d: 'M500 150 L500 140', startAt: 0.75, endAt: 0.80, color: colors.primary, width: 2 },
  { d: 'M500 560 L500 550', startAt: 0.75, endAt: 0.80, color: colors.primary, width: 2 },
  { d: 'M300 350 L290 350', startAt: 0.75, endAt: 0.80, color: colors.primary, width: 2 },
  { d: 'M710 350 L700 350', startAt: 0.75, endAt: 0.80, color: colors.primary, width: 2 },
  { d: 'M420 350 L500 350', startAt: 0.80, endAt: 0.88, color: colors.primary, width: 2.5 },
  { d: 'M500 350 L500 280', startAt: 0.83, endAt: 0.90, color: colors.primary, width: 2.5 },
]

const getNodes = (colors: ReturnType<typeof getColors>) => [
  { cx: 500, cy: 30,  r: 4,   triggerAt: 0.02, color: colors.primary },
  { cx: 500, cy: 670, r: 4,   triggerAt: 0.07, color: colors.primary },
  { cx: 500, cy: 350, r: 7,   triggerAt: 0.35, color: colors.primary },
  { cx: 200, cy: 210, r: 5,   triggerAt: 0.22, color: colors.nodeSecondary },
  { cx: 200, cy: 490, r: 5,   triggerAt: 0.22, color: colors.nodeSecondary },
  { cx: 800, cy: 210, r: 5,   triggerAt: 0.22, color: colors.nodeSecondary },
  { cx: 800, cy: 490, r: 5,   triggerAt: 0.22, color: colors.nodeSecondary },
  { cx: 120, cy: 350, r: 4,   triggerAt: 0.34, color: colors.primary },
  { cx: 880, cy: 350, r: 4,   triggerAt: 0.34, color: colors.primary },
  { cx: 340, cy: 130, r: 3.5, triggerAt: 0.63, color: colors.nodeFaint },
  { cx: 660, cy: 130, r: 3.5, triggerAt: 0.63, color: colors.nodeFaint },
  { cx: 340, cy: 570, r: 3.5, triggerAt: 0.63, color: colors.nodeFaint },
  { cx: 660, cy: 570, r: 3.5, triggerAt: 0.63, color: colors.nodeFaint },
  { cx: 500, cy: 130, r: 3.5, triggerAt: 0.13, color: colors.primary },
  { cx: 500, cy: 570, r: 3.5, triggerAt: 0.21, color: colors.primary },
]

function DrawnPath({ d, color, width, progress, startAt, endAt }: {
  d: string; color: string; width: number; progress: number; startAt: number; endAt: number
}) {
  const ref = useRef<SVGPathElement>(null)
  const [length, setLength] = useState(0)

  useEffect(() => {
    if (ref.current) setLength(ref.current.getTotalLength())
  }, [d])

  if (!length) {
    return <path ref={ref} d={d} stroke="transparent" strokeWidth={0} fill="none" />
  }

  const range = endAt - startAt
  const local = Math.max(0, Math.min(1, (progress - startAt) / range))
  const offset = length * (1 - local)

  return (
    <path
      ref={ref}
      d={d}
      stroke={color}
      strokeWidth={width}
      fill="none"
      strokeDasharray={length}
      strokeDashoffset={offset}
      strokeLinecap="round"
    />
  )
}

export function ScrollDrawSection() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const colors = getColors(isDark)
  const PATHS = getPaths(colors)
  const NODES = getNodes(colors)
  const { play: playSound, stop: stopSound } = useParallaxTechSound()
  const inSoundZoneRef = useRef(false)
  
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  })

  // Mapeamos el progreso para que empiece al 30% del scroll de la sección (aprox 12% del total de la página)
  const progress = useTransform(scrollYProgress, [0.30, 0.90], [0, 1], { clamp: true })
  const [currentProgress, setCurrentProgress] = useState(0)
  
  useMotionValueEvent(progress, 'change', v => {
    // Aseguramos que el progreso sea estrictamente 0 hasta superar el umbral del 30%
    const clampedV = v < 0.01 ? 0 : v
    setCurrentProgress(clampedV)
    
    // Exponemos para depuración
    if (typeof window !== 'undefined') {
      (window as any).parallaxProgress = clampedV
    }
    
    // Skip sound logic on mobile
    if (isMobile) return

    // Sound logic
    const inZone = clampedV > 0 && clampedV < 1.0
    
    if (inZone) {
      if (!inSoundZoneRef.current) {
        inSoundZoneRef.current = true
        playSound(0.12)
      }
    } else {
      if (inSoundZoneRef.current) {
        inSoundZoneRef.current = false
        stopSound()
      }
    }
  })

  // El diagrama se desvanece al final de su tramo (95% - 100%)
  const diagramOpacity = useTransform(scrollYProgress, [0.95, 1.0], [1, 0], { clamp: true })
  const svgY = useTransform(scrollYProgress, [0, 1], ['5%', '-5%'])

  return (
    <section
      ref={wrapperRef}
      className="relative w-full"
      aria-label="Scroll-driven technical diagram"
    >
      <div style={{ height: '400vh' }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#05050a] flex items-center justify-center">

          {/* 1. Diagrama Minimalista */}
          <motion.div 
            className="relative w-full max-w-4xl mx-auto p-4"
            style={{ 
              opacity: diagramOpacity,
              y: svgY
            }}
          >
            {/* Ambient glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(254,249,243,0.08) 0%, transparent 70%)',
              }}
            />

            <motion.div className="relative">
              <motion.div
                className="absolute -top-20 left-0 right-0 flex justify-center items-center gap-6"
                style={{ opacity: currentProgress > 0.02 ? 1 : 0 }}
              >
                <span className="w-8 h-px bg-foreground/40" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-foreground/80">Sistema Creativo Arnica</span>
                <span className="w-8 h-px bg-foreground/40" />
              </motion.div>

              <svg
                viewBox="0 0 1000 700"
                className="w-full h-auto drop-shadow-2xl"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M50 0L0 0 0 50" fill="none" stroke="rgba(254,249,243,0.03)" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="1000" height="700" fill="url(#grid)" />

                {PATHS.map((p, i) => (
                  <DrawnPath
                    key={i}
                    d={p.d}
                    color={p.color}
                    width={p.width}
                    progress={currentProgress}
                    startAt={p.startAt}
                    endAt={p.endAt}
                  />
                ))}

                {PATHS.filter(p => p.label).map((p, i) => (
                  <text
                    key={`label-${i}`}
                    x={p.labelX}
                    y={p.labelY}
                    fill={colors.primary}
                    fontSize="8"
                    fontFamily="monospace"
                    letterSpacing="2"
                    textAnchor="middle"
                    opacity={currentProgress >= p.endAt ? 0.8 : 0}
                    style={{ transition: 'opacity 0.4s ease' }}
                  >
                    {p.label}
                  </text>
                ))}

                {NODES.map((n, i) => (
                  <circle
                    key={i}
                    cx={n.cx}
                    cy={n.cy}
                    r={n.r}
                    fill={n.color}
                    opacity={currentProgress >= n.triggerAt ? 1 : 0}
                    style={{ transition: 'opacity 0.3s ease' }}
                  />
                ))}
              </svg>
            </motion.div>
          </motion.div>

          {/* Progress Indicator */}
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none"
            style={{ opacity: diagramOpacity }}
          >
            <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                style={{ scaleX: currentProgress, transformOrigin: 'left' }}
              />
            </div>
            <span className="text-[10px] font-bold tracking-widest uppercase opacity-60">
              SISTEMA CARGANDO: {Math.round(currentProgress * 100)}%
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
