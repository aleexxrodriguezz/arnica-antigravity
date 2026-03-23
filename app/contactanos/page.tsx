'use client'

import { PageShell } from '@/components/page-shell'
import { FadeUp } from '@/components/parallax'
import { Phone, Mail, MessageCircle } from 'lucide-react'

export default function ContactanosPage() {
  const WHATSAPP_NUMBER = '34676302085'
  const WHATSAPP_MESSAGE = encodeURIComponent('Hola! Me gustaría informarme sobre un presupuesto para un proyecto.')

  return (
    <PageShell>
      <section className="min-h-screen py-40 px-6 max-w-5xl mx-auto flex flex-col justify-center">
        <div className="mb-20">
          <FadeUp>
            <p className="text-xs tracking-[0.4em] uppercase text-primary font-mono mb-6">
              Ponte en contacto
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="text-foreground leading-tight text-balance font-sans font-semibold tracking-[0.15em] uppercase" style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)' }}>
              HABLEMOS SOBRE<br />
              <span className="text-primary">TU PROYECTO.</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mt-8 text-muted-foreground text-lg max-w-xl leading-relaxed">
              Estamos listos para escuchar, conceptualizar y ejecutar. Contacta directamente con nuestro equipo para empezar a dar forma a tu visión.
            </p>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          <FadeUp delay={0.3}>
            <div className="flex flex-col gap-10">
              <a href="tel:+34676302085" className="group flex items-start gap-6 border border-transparent hover:border-border p-6 -mx-6 rounded-sm transition-colors">
                <div className="w-10 h-10 rounded-sm bg-secondary flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                  <Phone className="w-4 h-4 text-foreground group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <h3 className="text-muted-foreground mb-2">TELÉFONO</h3>
                  <p className="text-xl font-medium text-foreground tracking-widest">+34 676 30 20 85</p>
                </div>
              </a>

              <a href="mailto:dj676302085@gmail.com" className="group flex items-start gap-6 border border-transparent hover:border-border p-6 -mx-6 rounded-sm transition-colors">
                <div className="w-10 h-10 rounded-sm bg-secondary flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                  <Mail className="w-4 h-4 text-foreground group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <h3 className="text-muted-foreground mb-2">EMAIL</h3>
                  <p className="text-lg md:text-xl font-medium text-foreground tracking-widest">dj676302085@gmail.com</p>
                </div>
              </a>
            </div>
          </FadeUp>

          <FadeUp delay={0.4} className="flex flex-col justify-center">
            <div className="bg-secondary/40 border border-border p-10 flex flex-col items-center text-center">
              <MessageCircle className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-xl mb-4 text-foreground">¿Respuesta Rápida?</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-8 text-balance">
                Para consultas de presupuestación inmediatas, escríbenos directamente por WhatsApp.
              </p>
              <a 
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-primary text-primary-foreground font-semibold uppercase tracking-[0.15em] hover:bg-primary/90 transition-colors flex items-center justify-center gap-3 text-sm"
              >
                Abrir WhatsApp
              </a>
            </div>
          </FadeUp>
        </div>
      </section>
    </PageShell>
  )
}
