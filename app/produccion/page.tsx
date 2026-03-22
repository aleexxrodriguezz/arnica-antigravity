'use client'

import { PageShell } from '@/components/page-shell'
import { FadeUp, ParallaxLayer } from '@/components/parallax'
import { Mic2, Music2, Headphones, Sliders, Waves, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

const SERVICES = [
  {
    icon: Mic2,
    title: 'GRABACIÓN',
    description:
      'Sesiones de grabación vocal e instrumental en entorno profesional. Captación con equipamiento de alta gama para resultados que resisten cualquier formato de distribución.',
  },
  {
    icon: Sliders,
    title: 'MEZCLA',
    description:
      'Procesado y equilibrio de todos los elementos sonoros. Cada track recibe un tratamiento individualizado que garantiza coherencia, impacto y claridad en todos los sistemas de reproducción.',
  },
  {
    icon: Headphones,
    title: 'MASTERIZACIÓN',
    description:
      'Etapa final de optimización para plataformas digitales, streaming y formatos físicos. Normativa LUFS, dinámica controlada y presencia sin distorsión.',
  },
  {
    icon: Music2,
    title: 'COMPOSICIÓN',
    description:
      'Creación de identidades sonoras, jingles publicitarios y bandas sonoras para campañas. Desde el concepto hasta la entrega, el criterio creativo es siempre humano.',
  },
  {
    icon: Waves,
    title: 'SOUND DESIGN',
    description:
      'Diseño de efectos de sonido, atmósferas y paisajes sonoros para contenido audiovisual, instalaciones y experiencias de marca.',
  },
]

const FORMATS = [
  'Publicidad en radio y TV',
  'Contenido para redes sociales',
  'Podcasts y branded content',
  'Bandas sonoras para video',
  'Identidad sonora corporativa',
  'Spotting y sincronización',
]

export default function ProduccionPage() {
  return (
    <PageShell>
      <section className="py-24 px-6 max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-20 overflow-hidden">
          <FadeUp>
            <p className="text-xs tracking-[0.4em] uppercase text-primary font-mono mb-4">
              Producción Musical
            </p>
          </FadeUp>
          <ParallaxLayer speed={0.08}>
            <h1
              className="font-bold uppercase tracking-wide text-foreground text-balance font-sans"
              style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 3.75rem)',
                letterSpacing: '0.04em',
                lineHeight: 1.05,
              }}
            >
              PRODUCCIÓN<br />
              <span className="text-primary">AL SERVICIO</span><br />
              DE LA CAMPAÑA
            </h1>
          </ParallaxLayer>
          <FadeUp delay={0.15}>
            <p className="mt-8 text-muted-foreground text-lg max-w-2xl leading-relaxed">
              En Arnica entendemos el sonido como una herramienta estratégica. Producimos música, locuciones y paisajes sonoros que refuerzan el mensaje de cada campaña con la misma precisión que el resto de las disciplinas creativas.
            </p>
          </FadeUp>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-border mb-20" />

        {/* Services */}
        <FadeUp>
          <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-12">Servicios</p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
          {SERVICES.map(({ icon: Icon, title, description }, i) => (
            <FadeUp key={title} delay={i * 0.06}>
              <div className="bg-background p-8 h-full flex flex-col gap-4">
                <div className="w-10 h-10 border border-border rounded-sm flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3
                  className="text-sm font-bold uppercase tracking-widest text-foreground"

                >
                  {title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-border my-24" />

        {/* Formats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <FadeUp>
            <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-6">Formatos</p>
            <h2
              className="font-bold uppercase tracking-wide text-foreground text-balance font-sans"
              style={{
                fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                letterSpacing: '0.04em',
                lineHeight: 1.1,
              }}
            >
              ADAPTADO A<br />CADA MEDIO
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <ul className="flex flex-col divide-y divide-border border-t border-b border-border">
              {FORMATS.map((f) => (
                <li
                  key={f}
                  className="py-4 text-sm text-foreground tracking-wide flex items-center gap-3"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </FadeUp>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-border my-24" />

        {/* CTA */}
        <FadeUp>
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
            <h2
              className="font-bold uppercase tracking-wide text-foreground text-balance font-sans"
              style={{
                fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                letterSpacing: '0.04em',
                lineHeight: 1.1,
              }}
            >
              ¿TIENES UN PROYECTO<br />SONORO EN MENTE?
            </h2>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-primary font-semibold text-sm tracking-widest uppercase group whitespace-nowrap"
            >
              Ver trabajos <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </FadeUp>

      </section>
    </PageShell>
  )
}
