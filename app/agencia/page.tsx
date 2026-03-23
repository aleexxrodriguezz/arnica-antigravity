'use client'

import { PageShell } from '@/components/page-shell'
import { FadeUp, MaskReveal } from '@/components/parallax'
import { Disc, Zap, Music } from 'lucide-react'

const AGENCY_SERVICES = [
  {
    icon: Disc,
    title: 'DJ & Booking',
    desc: 'Curaduría musical y selección de talento para eventos exclusivos. Entendemos la pista de baile y creamos atmósferas sonoras inolvidables.'
  },
  {
    icon: Zap,
    title: 'Publicidad',
    desc: 'Campañas creativas y estrategias de impacto. Conectamos marcas con su audiencia a través de narrativas auténticas y formatos innovadores.'
  },
  {
    icon: Music,
    title: 'Música',
    desc: 'Producción musical, diseño sonoro y composición original. Damos identidad acústica a cada proyecto, desde comerciales hasta instalaciones.'
  }
]

export default function AgenciaPage() {
  return (
    <PageShell>
      <section className="py-40 px-6 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
        {/* Header */}
        <div className="mb-24">
          <FadeUp>
            <p className="text-xs tracking-[0.4em] uppercase text-primary font-mono mb-6">
              Nuestra Agencia
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="text-foreground leading-tight text-balance font-sans font-semibold tracking-[0.15em] uppercase" style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)' }}>
              CREAMOS CULTURA.<br />
              <span className="text-primary">NO SOLO CONTENIDO.</span>
            </h1>
          </FadeUp>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24">
          {AGENCY_SERVICES.map((service, i) => (
            <MaskReveal key={service.title} direction="up" delay={i * 0.15}>
              <div className="flex flex-col group">
                <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center mb-8 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-sm font-bold tracking-widest text-foreground uppercase mb-4">{service.title}</h2>
                <p className="text-muted-foreground text-sm leading-relaxed text-pretty">
                  {service.desc}
                </p>
              </div>
            </MaskReveal>
          ))}
        </div>

        {/* Closing Statement */}
        <div className="mt-40 border-t border-border pt-20 max-w-2xl">
          <FadeUp delay={0.2}>
            <h3 className="text-foreground font-sans font-semibold tracking-[0.15em] uppercase mb-6" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)' }}>
              UNA APROXIMACIÓN DIFERENTE
            </h3>
            <p className="text-muted-foreground text-lg leading-relaxed text-pretty">
              Fundimos la precisión de una agencia corporativa con el pulso creativo de un estudio boutique. Cada proyecto es una oportunidad para redefinir los estándares y conectar auténticamente.
            </p>
          </FadeUp>
        </div>
      </section>
    </PageShell>
  )
}
