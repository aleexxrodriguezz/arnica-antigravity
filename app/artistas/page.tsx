'use client'

import { PageShell } from '@/components/page-shell'
import { FadeUp, MaskReveal, ParallaxLayer } from '@/components/parallax'
import { ArrowUpRight, Instagram, Mail, Music2, Headphones, Disc } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function ArtistasPage() {
  return (
    <PageShell>
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
        {/* Background Image with Parallax */}
        <div className="absolute inset-0 z-0">
          <ParallaxLayer speed={-0.15}>
            <div className="relative w-full h-[120vh]">
              <Image
                src="/artistas/fb-hero.jpg"
                alt="Fernando Ballesteros"
                fill
                className="object-cover brightness-[0.7] grayscale-[0.2]"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>
          </ParallaxLayer>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-24 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <div>
              <MaskReveal direction="up">
                <p className="text-xs tracking-[0.5em] uppercase text-primary font-mono mb-6">
                  Featured Artist
                </p>
              </MaskReveal>
              <ParallaxLayer speed={0.05}>
                <h1 className="text-foreground leading-[0.9] font-sans" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', letterSpacing: '0.05em' }}>
                  FERNANDO<br />
                  <span className="text-primary italic">BALLESTEROS</span>
                </h1>
              </ParallaxLayer>
            </div>
            <div className="lg:text-right">
              <FadeUp delay={0.2}>
                <p className="text-muted-foreground text-lg max-w-md lg:ml-auto leading-relaxed text-pretty">
                  Un arquitecto del ritmo. DJ y Productor Musical cuya visión redefine el sonido comercial y de club a través de la elegancia técnica y la intuición creativa.
                </p>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Section with Logo */}
      <section className="py-40 bg-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
            
            {/* Logo and Static Image */}
            <div className="lg:col-span-5 relative">
              <FadeUp>
                <div className="relative aspect-square bg-card border border-border p-12 flex flex-col items-center justify-center overflow-hidden group">
                  <div className="absolute inset-0 opacity-10 grayscale brightness-50 z-0 transition-transform duration-700 group-hover:scale-110">
                    <Image
                      src="/artistas/fb-car-side.jpg"
                      alt="Fernando details"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative z-10 w-full max-w-[280px]">
                    <Image
                      src="/artistas/fb-logo-v2.png"
                      alt="Fernando Ballesteros Logo"
                      width={600}
                      height={300}
                      className="w-full h-auto filter invert brightness-[2] contrast-125 mix-blend-screen"
                    />
                  </div>
                </div>
              </FadeUp>
              {/* Decorative text */}
              <div className="absolute -bottom-10 -right-6 hidden lg:block select-none pointer-events-none opacity-5">
                <span className="text-9xl font-black text-foreground">FB</span>
              </div>
            </div>

            {/* Persuasive Copy */}
            <div className="lg:col-span-7">
              <FadeUp delay={0.1}>
                <h2 className="text-foreground leading-tight font-sans mb-12" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.75rem)', letterSpacing: '0.05em' }}>
                  EL ARTE DE LA <span className="text-primary">VIBRACIÓN</span>
                </h2>
              </FadeUp>
              
              <div className="space-y-8 text-muted-foreground text-lg leading-relaxed max-w-2xl">
                <FadeUp delay={0.2}>
                  <p>
                    Con una trayectoria forjada en los escenarios más exigentes de la industria, Fernando Ballesteros ha perfeccionado un estilo que oscila entre la contundencia del House y la sofisticación de la electrónica contemporánea.
                  </p>
                </FadeUp>
                <FadeUp delay={0.3}>
                  <p>
                    Como productor, su capacidad para capturar la esencia de una marca y transformarla en una identidad sonora única lo convierte en una pieza estratégica en la arquitectura creativa de Arnica Agency. No se trata solo de música; se trata de construir atmósferas que resuenan en la memoria.
                  </p>
                </FadeUp>
              </div>

              {/* Roles / Skills */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 pt-16 border-t border-border">
                {[
                  { icon: Headphones, title: 'Music Producer', desc: 'Composición y diseño sonoro original.' },
                  { icon: Disc, title: 'Expert DJ', desc: 'Sets eclécticos para marcas de lujo.' },
                  { icon: Music2, title: 'Sound Design', desc: 'Paisajes auditivos para campañas.' },
                ].map((item, i) => (
                  <FadeUp key={item.title} delay={0.4 + (i * 0.1)}>
                    <div className="flex flex-col gap-4">
                      <div className="w-10 h-10 border border-border rounded-sm flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <h4 className="text-sm font-bold tracking-widest text-foreground uppercase">{item.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Follow / CTA */}
      <section className="py-40 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <FadeUp>
            <h3 className="text-xs tracking-[0.5em] uppercase text-primary font-mono mb-8">
              Stay Connected
            </h3>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="text-foreground font-sans mb-12" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '0.05em' }}>
              @FB_MUSIC
            </h2>
          </FadeUp>
          
          <div className="flex flex-wrap justify-center gap-6">
            <FadeUp delay={0.2}>
              <Link
                href="#"
                className="group flex items-center gap-3 px-8 py-4 bg-background border border-border hover:border-primary/50 transition-colors uppercase text-xs tracking-widest font-bold"
              >
                <Instagram className="w-4 h-4 text-primary" />
                Instagram <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </FadeUp>
            <FadeUp delay={0.3}>
              <Link
                href="mailto:hola@arnica.agency"
                className="group flex items-center gap-3 px-8 py-4 bg-primary text-white hover:bg-primary/90 transition-colors uppercase text-xs tracking-widest font-bold"
              >
                <Mail className="w-4 h-4" />
                Bookings <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </FadeUp>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
