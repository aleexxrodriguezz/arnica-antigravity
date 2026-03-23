'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { PageShell } from '@/components/page-shell'
import { FadeUp, MaskReveal, ScrollLine } from '@/components/parallax'
import { ScrollDrawSection } from '@/components/scroll-draw'
import { GlassCard } from '@/components/glass-card'
import { RubikCubeSection } from '@/components/rubik-cube'
import Link from 'next/link'
import { ArrowRight, Radio, Music2, Film, Box, ShoppingBag, LayoutGrid, ArrowUpRight } from 'lucide-react'

const SERVICES = [
  { icon: Radio,       label: 'Radio',       num: '01', desc: 'Emisoras en vivo, curación musical y producción de contenido sonoro de alto impacto.', href: '/radio' },
  { icon: Music2,      label: 'Producción',  num: '02', desc: 'IA generativa de música: crea tracks únicos, originales y libres de derechos en segundos.', href: '/produccion' },
  { icon: Film,        label: 'VFX',         num: '03', desc: 'Motion graphics y efectos visuales de alto impacto para marcas que quieren dejar una huella duradera.', href: '/motion' },
  { icon: ShoppingBag, label: 'Atrezo/PLV',  num: '04', desc: 'Material punto de venta y atrezo publicitario a medida que convierte espacios en experiencias.', href: '/atrezo' },
  { icon: LayoutGrid,  label: 'Contáctanos',  num: '05', desc: '¿Listo para crear algo extraordinario? Nuestro equipo está a un clic de distancia.', href: '/contactanos' },
]

const STATS = [
  { value: '60+',  label: 'Marcas confían en nosotros' },
  { value: '15',   label: 'Años de trayectoria' },
  { value: '100%', label: 'Estudio propio · capacidad técnica completa' },
  { value: '∞',    label: 'Equipo especializado en producción y postproducción' },
]

const MARQUEE_ITEMS = [
  'ORANGE', 'PUBLICIS ONE', 'DENTSU CREATIVE', 'CRAFT WORLDWIDE',
  'ORANGE', 'PUBLICIS ONE', 'DENTSU CREATIVE', 'CRAFT WORLDWIDE',
]

function AnimatedCounter({ target }: { target: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const num = parseFloat(target.replace(/[^0-9.]/g, ''))
  const suffix = target.replace(/[0-9.]/g, '')
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1800
    const step = 16
    const increment = num / (duration / step)
    const timer = setInterval(() => {
      start += increment
      if (start >= num) { setCount(num); clearInterval(timer) }
      else setCount(Math.floor(start * 10) / 10)
    }, step)
    return () => clearInterval(timer)
  }, [inView, num])

  return <span ref={ref}>{count % 1 === 0 ? count.toFixed(0) : count.toFixed(1)}{suffix}</span>
}

function MarqueeSection() {
  return (
    <div className="border-y border-border overflow-hidden py-5 bg-secondary/30">
      <motion.div className="flex gap-12 whitespace-nowrap" animate={{ x: ['0%', '-50%'] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
          <span key={i} className="text-xs font-mono tracking-[0.35em] uppercase text-muted-foreground/50 flex items-center gap-12">
            {item}
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary/40 mx-[-1.5rem]" />
          </span>
        ))}
      </motion.div>
    </div>
  )
}

function ManifestoSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x1 = useTransform(scrollYProgress, [0, 1], ['4%', '-4%'])

  return (
    <section ref={ref} className="relative py-40 overflow-hidden" style={{ position: 'relative' }}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none font-bold leading-none dark:text-white/15 text-border/20" style={{ fontSize: 'clamp(12rem, 30vw, 28rem)', fontWeight: 700, whiteSpace: 'nowrap' }} aria-hidden>A</div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <motion.h2 className="leading-tight text-foreground text-balance font-sans" style={{ fontSize: 'clamp(2rem, 4vw, 3.75rem)', x: x1 }}>
              MANIFIESTO
            </motion.h2>
          </div>
          <div className="flex flex-col gap-6 pt-4">
            <FadeUp delay={0.1}><p className="text-muted-foreground text-lg leading-relaxed text-pretty">En Arnica creemos que cada marca tiene una historia extraordinaria esperando ser contada. Nuestra misión es encontrarla, amplificarla y convertirla en contenido que emocione, conecte y perdure.</p></FadeUp>
            <FadeUp delay={0.2}><p className="text-muted-foreground text-lg leading-relaxed text-pretty">Desde la producción musical con inteligencia artificial hasta renders 3D fotorrealistas, combinamos tecnología de vanguardia con un instinto creativo afilado para generar resultados que importan.</p></FadeUp>
            <FadeUp delay={0.3}>
              <Link href="/contactanos" className="inline-flex items-center gap-2 text-primary font-semibold text-sm tracking-widest uppercase mt-4 group w-fit">
                Contáctanos <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  )
}

function ServicesSection() {
  return (
    <section className="py-32 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-20 gap-8 flex-wrap">
          <div>
            <FadeUp><p className="text-xs tracking-[0.4em] uppercase text-primary font-mono mb-4">Servicios</p></FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="text-foreground leading-tight text-balance font-sans" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3.75rem)' }}>
                Lo que<br />hacemos.
              </h2>
            </FadeUp>
          </div>
          <FadeUp delay={0.2}><p className="text-muted-foreground max-w-xs text-base leading-relaxed text-pretty">Un ecosistema creativo completo para marcas con ambición. Cada servicio diseñado para maximizar impacto.</p></FadeUp>
        </div>
        <div className="divide-y divide-border">
          {SERVICES.map(({ icon: Icon, label, num, desc, href }, i) => (
            <FadeUp key={href} delay={i * 0.06}>
              <Link href={href} className="group flex items-center gap-6 py-7 hover:bg-secondary/40 transition-all duration-300 -mx-4 px-4">
                <span className="text-xs font-mono text-muted-foreground/40 w-8 shrink-0">{num}</span>
                <span className="w-9 h-9 rounded-sm bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors"><Icon className="w-4 h-4 text-primary" /></span>
                <span className="text-foreground group-hover:text-primary transition-colors shrink-0 w-36" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', fontWeight: 600 }}>{label}</span>
                <span className="text-muted-foreground text-sm leading-relaxed hidden md:block flex-1 text-pretty">{desc}</span>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-auto" />
              </Link>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}


function StatsSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['3%', '-3%'])

  return (
    <section ref={ref} className="relative py-40 border-t border-border overflow-hidden" style={{ position: 'relative' }}>
      <motion.div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" style={{ y }}>
        <span className="text-border/10 font-bold whitespace-nowrap uppercase" style={{ fontSize: 'clamp(8rem, 22vw, 22rem)', letterSpacing: '0.15em' }} aria-hidden>ARNICA</span>
      </motion.div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <FadeUp><p className="text-xs tracking-[0.4em] uppercase text-primary font-mono mb-16 text-center">En números</p></FadeUp>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
          {STATS.map(({ value, label }, i) => (
            <MaskReveal key={label} direction="up" delay={i * 0.1}>
              <div className="bg-background px-8 py-12 flex flex-col gap-3">
                <span className="text-primary leading-none font-sans" style={{ fontSize: 'clamp(2rem, 3.5vw, 3.75rem)', fontWeight: 700 }}><AnimatedCounter target={value} /></span>
                <span className="text-muted-foreground text-sm font-medium tracking-wide">{label}</span>
              </div>
            </MaskReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function TechStatement() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-8%'])

  return (
    <section ref={ref} style={{ position: 'relative' }} className="py-32 border-t border-border overflow-hidden bg-secondary/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-16 items-center">
          <div>
            <FadeUp><p className="text-xs tracking-[0.4em] uppercase text-primary font-mono mb-8">Nuestra tecnología</p></FadeUp>
            <motion.h2 className="text-foreground leading-tight text-balance font-sans" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3.75rem)', x }}>
              <span className="text-primary">Resultados reales.</span>
            </motion.h2>
            <FadeUp delay={0.15}><p className="mt-8 text-muted-foreground text-lg leading-relaxed max-w-xl text-pretty">Integramos modelos de IA de última generación en cada disciplina creativa — desde la composición musical generativa hasta el desarrollo de efectos visuales avanzados — para ofrecer resultados imposibles de alcanzar por medios tradicionales.</p></FadeUp>
            <FadeUp delay={0.25}>
              <div className="mt-10 flex flex-wrap gap-3">
                {['Generative AI', 'Motion Capture', 'Neural Render', 'Procedural Audio', 'Real-time 3D'].map(tag => (
                  <span key={tag} className="px-4 py-2 border border-border text-xs font-mono tracking-widest uppercase text-muted-foreground hover:border-primary hover:text-primary transition-colors cursor-default">{tag}</span>
                ))}
              </div>
            </FadeUp>
          </div>
          <FadeUp delay={0.1}>
            <div className="hidden lg:grid grid-cols-3 gap-2 w-56">
              {Array.from({ length: 9 }).map((_, i) => (
                <motion.div key={i} className="aspect-square border border-border" style={{ backgroundColor: i === 4 ? 'var(--primary)' : i % 3 === 0 ? 'var(--secondary)' : 'transparent' }} initial={{ opacity: 0, scale: 0.6 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06, ease: [0.33, 1, 0.68, 1] }} />
              ))}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

function ProcessSection() {
  const steps = [
    { n: '01', title: 'Briefing estratégico', desc: 'Escuchamos, analizamos y definimos objetivos concretos y medibles desde el primer día.' },
    { n: '02', title: 'Ideación creativa', desc: 'Nuestro equipo desarrolla conceptos únicos que conectan con tu audiencia de forma auténtica.' },
    { n: '03', title: 'Producción de alto nivel', desc: 'Ejecutamos con precisión quirúrgica usando las herramientas más avanzadas del mercado.' },
    { n: '04', title: 'Entrega y optimización', desc: 'Medimos resultados, iteramos y aseguramos que cada pieza supere las expectativas.' },
  ]
  return (
    <section className="py-40 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <FadeUp><p className="text-xs tracking-[0.4em] uppercase text-primary font-mono mb-4">Proceso</p></FadeUp>
            <FadeUp delay={0.1}><h2 className="text-foreground leading-tight text-balance font-sans" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3.75rem)' }}>LO QUE NOS DEFINE</h2></FadeUp>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {steps.map(({ n, title, desc }, i) => (
            <FadeUp key={n} delay={i * 0.1}>
              <div className="flex gap-6 group">
                <div className="flex-shrink-0"><span className="text-primary opacity-30 group-hover:opacity-100 transition-opacity" style={{ fontSize: 'clamp(2rem, 3vw, 2.8rem)', fontWeight: 700 }}>{n}</span></div>
                <div className="pt-3"><h3 className="font-bold text-foreground text-lg mb-2 font-sans">{title}</h3><p className="text-muted-foreground text-sm leading-relaxed">{desc}</p></div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

function CtaSection() {
  return (
    <section className="py-40 border-t border-border">
      <div className="max-w-4xl mx-auto px-6 text-center">
            <FadeUp><h2 className="text-foreground leading-tight text-balance font-sans" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3.75rem)' }}>¿LISTO PARA CREAR ALGO EXTRAORDINARIO?</h2></FadeUp>
        <FadeUp delay={0.1}><p className="mt-6 text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto text-pretty">Hablemos sobre tu proyecto. No hay ideas demasiado ambiciosas, ni presupuestos demasiado pequeños.</p></FadeUp>
        <FadeUp delay={0.2}>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="mailto:hola@arnica.studio" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-300 text-sm tracking-[0.15em] uppercase">
              Contactar <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contactanos" className="inline-flex items-center gap-2 px-8 py-4 border border-border text-foreground font-semibold hover:border-primary hover:text-primary transition-all duration-300 text-sm tracking-[0.15em] uppercase">
              Contáctanos
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
  <PageShell>
  <ScrollDrawSection />
      <ManifestoSection />
      <ServicesSection />
      <StatsSection />
      <TechStatement />
      <ProcessSection />
      <CtaSection />
      <RubikCubeSection />
    </PageShell>
  )
}
