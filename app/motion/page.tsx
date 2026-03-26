'use client'

import { PageShell } from '@/components/page-shell'
import { FadeUp, MaskReveal, ParallaxLayer } from '@/components/parallax'
import { Film } from 'lucide-react'

const MOTION_VIDEOS = [
  {
    id: 'ZM_9iFyxmT4',
    title: 'After Effects Motion Graphics Tutorial',
    description: 'Aprende a crear animaciones de texto complejas con After Effects desde cero.',
    level: 'Intermedio',
    duration: '25 min',
  },
  {
    id: 'TuVLZDioBB8',
    title: 'Kinetic Typography Masterclass',
    description: 'Domina la tipografía cinética: el arte de animar letras con propósito y ritmo.',
    level: 'Avanzado',
    duration: '42 min',
  },
  {
    id: 'IM4RjIFNlnU',
    title: 'Motion Design Principles',
    description: 'Los 12 principios de la animación aplicados al motion graphics moderno.',
    level: 'Básico',
    duration: '18 min',
  },
  {
    id: 'WBbGOzBh1GI',
    title: 'Logo Animation in After Effects',
    description: 'Técnicas profesionales para dar vida a logotipos de forma impactante.',
    level: 'Intermedio',
    duration: '31 min',
  },
  {
    id: 'rGmNIYvpD6k',
    title: 'Liquid Motion Graphics',
    description: 'Efectos líquidos y fluidos que convierten cualquier composición en arte.',
    level: 'Avanzado',
    duration: '37 min',
  },
  {
    id: 'y7gkD5znFSg',
    title: 'UI Animation & Micro-interactions',
    description: 'Diseña micro-animaciones que mejoran la experiencia de usuario en apps.',
    level: 'Intermedio',
    duration: '28 min',
  },
]

const LEVEL_COLOR: Record<string, string> = {
  Básico: 'text-green-400 border-green-400/30 bg-green-400/10',
  Intermedio: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
  Avanzado: 'text-primary border-primary/30 bg-primary/10',
}

export default function MotionPage() {
  return (
    <PageShell>
      <section className="py-24 px-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20 overflow-hidden">
          <FadeUp>
            <p className="text-xs tracking-[0.4em] uppercase text-primary font-mono mb-4">Tutoriales</p>
          </FadeUp>
          <ParallaxLayer speed={0.08}>
            <h1 className="text-foreground text-balance font-sans font-semibold tracking-[0.15em] uppercase" style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)' }}>
              Motion
            </h1>
          </ParallaxLayer>
          <FadeUp delay={0.15}>
            <p className="mt-4 text-muted-foreground text-lg max-w-xl leading-relaxed">
              Tutoriales de Motion Graphics de alta calidad. Aprende con los mejores, desde lo básico hasta técnicas avanzadas de animación.
            </p>
          </FadeUp>
        </div>

        {/* Old VFX Sequencer */}
        <FadeUp delay={0.2}>
          <div className="mb-24 w-full max-w-5xl mx-auto h-[80vh] min-h-[600px] relative rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] ring-1 ring-black/5 dark:ring-white/10">
            <iframe
              src="/vfx-hero.html"
              className="w-full h-full absolute inset-0 border-none bg-transparent"
              title="Estudio de Música VFX (Legacy)"
            />
          </div>
        </FadeUp>

        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-px bg-border mb-20">
          {[
            { label: 'Tutoriales', value: '6+' },
            { label: 'Horas de contenido', value: '3h+' },
            { label: 'Niveles', value: '3' },
          ].map(({ label, value }, i) => (
            <MaskReveal key={label} direction="up" delay={i * 0.1}>
              <div className="bg-background px-8 py-6">
                <p className="text-3xl font-extrabold text-primary">{value}</p>
                <p className="text-muted-foreground text-sm mt-1">{label}</p>
              </div>
            </MaskReveal>
          ))}
        </div>

        {/* Video grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOTION_VIDEOS.map((video, i) => (
            <FadeUp key={video.id} delay={(i % 3) * 0.1}>
            <article className="group flex flex-col border border-border rounded-sm overflow-hidden bg-card hover:border-primary/40 transition-colors duration-300 h-full">
              {/* YouTube embed */}
              <div className="relative aspect-video w-full bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                  loading="lazy"
                />
              </div>

              {/* Info */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-[10px] font-medium border px-2 py-0.5 rounded-sm tracking-widest uppercase ${LEVEL_COLOR[video.level]}`}>
                    {video.level}
                  </span>
                  <span className="text-xs text-muted-foreground font-mono">{video.duration}</span>
                </div>
                <h3 className="text-foreground text-base mb-2 leading-snug group-hover:text-primary transition-colors">
                  {video.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                  {video.description}
                </p>
              </div>
            </article>
            </FadeUp>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-24 border border-border rounded-sm p-10 flex flex-col md:flex-row items-center gap-8 justify-between bg-card">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-sm bg-primary/10 flex items-center justify-center">
              <Film className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h3 className="text-xl text-foreground">¿Necesitas un proyecto de Motion?</h3>
              <p className="text-muted-foreground text-sm mt-1">Llevamos tu marca al siguiente nivel con animaciones de impacto.</p>
            </div>
          </div>
          <a
            href="mailto:hola@arnica.agency"
            className="px-8 py-4 bg-primary text-primary-foreground font-bold tracking-widest uppercase text-xs rounded-sm hover:bg-primary/90 transition-colors whitespace-nowrap"
          >
            Solicitar Proyecto
          </a>
        </div>
      </section>
    </PageShell>
  )
}
