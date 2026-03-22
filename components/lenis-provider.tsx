'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const html = document.documentElement

    // Lenis v1 sets `scroll-behavior: smooth` directly via
    // HTMLElement.style.scrollBehavior (which calls setProperty internally).
    // We patch the setter on the html element's style object so any attempt
    // to set scroll-behavior is silently ignored, preventing the Next.js warning.
    const originalSetProperty = html.style.setProperty.bind(html.style)
    html.style.setProperty = (prop: string, value: string, priority?: string) => {
      if (prop === 'scroll-behavior') return
      originalSetProperty(prop, value, priority)
    }
    // Also freeze the scrollBehavior property itself to 'auto'
    Object.defineProperty(html.style, 'scrollBehavior', {
      get: () => 'auto',
      set: () => { /* noop — block Lenis from setting this */ },
      configurable: true,
    })

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.8,
    })

    lenisRef.current = lenis

    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      // Restore original setProperty
      html.style.setProperty = originalSetProperty
      // Restore scrollBehavior descriptor
      delete (html.style as unknown as Record<string, unknown>).scrollBehavior
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
