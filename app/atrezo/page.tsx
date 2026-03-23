'use client'

import { useEffect, useRef, useState } from 'react'
import { PageShell } from '@/components/page-shell'

const COMING_SOON_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&'

function ScrambleText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [display, setDisplay] = useState(() => text.split('').map(() => COMING_SOON_CHARS[Math.floor(Math.random() * COMING_SOON_CHARS.length)]).join(''))

  useEffect(() => {
    let iteration = 0
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplay(
          text.split('').map((char, i) => {
            if (char === ' ') return ' '
            if (i < iteration) return text[i]
            return COMING_SOON_CHARS[Math.floor(Math.random() * COMING_SOON_CHARS.length)]
          }).join('')
        )
        iteration += 0.4
        if (iteration >= text.length) clearInterval(interval)
      }, 50)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(timer)
  }, [text, delay])

  return <span>{display}</span>
}

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const particles: Array<{
      x: number; y: number; vx: number; vy: number;
      size: number; alpha: number; color: string
    }> = []

    function resize() {
      if (!canvas) return
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.6 + 0.1,
        color: Math.random() > 0.7 ? '#ff5c00' : '#ffffff',
      })
    }

    function draw() {
      if (!canvas || !ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(255,92,0,${0.15 * (1 - dist / 100)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color === '#ff5c00'
          ? `rgba(255,92,0,${p.alpha})`
          : `rgba(255,255,255,${p.alpha * 0.4})`
        ctx.fill()
      })
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  )
}

export default function AtrezoPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setSubmitted(true)
  }

  return (
    <PageShell>
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden bg-background">
        {/* Particle background */}
        <ParticleCanvas />

        {/* Horizontal scan line */}
        <div
          className="absolute left-0 right-0 h-px bg-primary/20 pointer-events-none"
          style={{ top: '30%' }}
        />
        <div
          className="absolute left-0 right-0 h-px bg-primary/10 pointer-events-none"
          style={{ top: '70%' }}
        />

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          {/* Label */}
          <div className="inline-flex items-center gap-3 border border-primary/30 px-4 py-2 rounded-sm mb-12">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-xs tracking-[0.4em] uppercase text-primary font-medium font-mono">
              Próximamente
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          </div>

          {/* Main heading */}
          <h1 className="leading-none text-foreground font-sans mb-2"
            style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.75rem)' }}>
            <ScrambleText text="ATREZO" delay={300} />
          </h1>
          <h2 className="leading-none text-foreground font-sans mb-12"
            style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.8rem)' }}>
            <span className="text-primary">
              <ScrambleText text="/ PLV" delay={600} />
            </span>
          </h2>

          <p className="text-muted-foreground/60 text-sm md:text-base max-w-md mx-auto leading-relaxed mb-2 tracking-wide italic">
            Consolidando nuestra nueva arquitectura. Próximamente: Soluciones físicas de alto impacto.
          </p>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-16">
            Material punto de venta, atrezo publicitario y soluciones PLV diseñadas para marcas que no se conforman con lo ordinario.
          </p>

          {/* Countdown tiles */}
          <div className="grid grid-cols-4 gap-3 max-w-md mx-auto mb-16">
            {[
              { value: '00', label: 'Días' },
              { value: '00', label: 'Horas' },
              { value: '00', label: 'Min' },
              { value: '00', label: 'Seg' },
            ].map(({ value, label }) => (
              <div key={label} className="border border-border bg-card/60 backdrop-blur-sm p-4 rounded-sm">
                <p className="text-3xl font-extrabold text-primary font-sans">{value}</p>
                <p className="text-muted-foreground text-[10px] tracking-widest uppercase mt-1 font-sans">{label}</p>
              </div>
            ))}
          </div>

          {/* Email form */}
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Tu correo electrónico"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex-1 bg-card border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground rounded-sm focus:outline-none focus:border-primary transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-primary text-white font-bold text-xs tracking-widest uppercase rounded-sm hover:bg-primary/90 transition-colors whitespace-nowrap"
              >
                Avisarme
              </button>
            </form>
          ) : (
            <div className="border border-primary/40 bg-primary/5 px-8 py-4 rounded-sm inline-block">
              <p className="text-primary text-sm font-medium">
                Perfecto. Te avisaremos cuando estemos listos.
              </p>
            </div>
          )}

          {/* Tech decorative text */}
          <p className="mt-16 text-[10px] tracking-[0.5em] uppercase text-muted-foreground/40 font-mono select-none">
            SISTEMA EN CONSTRUCCIÓN — ARNICA AGENCY — v2.0.0
          </p>
        </div>
      </section>
    </PageShell>
  )
}
