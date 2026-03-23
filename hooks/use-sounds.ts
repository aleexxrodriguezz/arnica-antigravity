'use client'

import { useRef, useState, useCallback, useEffect } from 'react'

export function useSoundEnabled() {
  const [soundEnabled, setSoundEnabled] = useState(false)

  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => !prev)
  }, [])

  return { soundEnabled, toggleSound }
}

export function useParallaxTechSound() {
  const ctxRef = useRef<AudioContext | null>(null)
  const masterRef = useRef<GainNode | null>(null)
  const oscsRef = useRef<OscillatorNode[]>([])

  const initContext = useCallback(() => {
    if (ctxRef.current) return

    try {
      const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext
      if (!AudioContextClass) return

      const ctx = new AudioContextClass() as AudioContext
      ctxRef.current = ctx

      const master = ctx.createGain()
      master.gain.setValueAtTime(0, ctx.currentTime)
      master.connect(ctx.destination)
      masterRef.current = master

      const now = ctx.currentTime
      
      // ═══════════════════════════════════════════════════════════
      // 8-BIT LOADING SOUND ENGINE
      // ═══════════════════════════════════════════════════════════
      
      // OSC 1: Rapid Arpeggio (Pulse Wave style)
      const pulse = ctx.createOscillator()
      const pulseGain = ctx.createGain()
      pulse.type = 'square'
      pulse.frequency.setValueAtTime(440, now)
      
      // Create a sequence of frequencies for that "loading" feel
      const freqs = [440, 880, 554, 659, 330, 987, 1318]
      for (let i = 0; i < 20; i++) {
        pulse.frequency.setValueAtTime(freqs[i % freqs.length], now + i * 0.1)
      }
      
      pulseGain.gain.setValueAtTime(0.05, now)
      pulse.connect(pulseGain)
      pulseGain.connect(master)
      pulse.start()
      oscsRef.current.push(pulse)

      // OSC 2: High bit-chirp
      const chirp = ctx.createOscillator()
      const chirpGain = ctx.createGain()
      chirp.type = 'square'
      chirp.frequency.setValueAtTime(2000, now)
      
      for (let i = 0; i < 40; i++) {
        chirp.frequency.setValueAtTime(Math.random() * 3000 + 1000, now + i * 0.05)
      }
      
      chirpGain.gain.setValueAtTime(0.02, now)
      chirp.connect(chirpGain)
      chirpGain.connect(master)
      chirp.start()
      oscsRef.current.push(chirp)

      // LFO: Fast Volume gating for "stutter" effect
      const lfo = ctx.createOscillator()
      const lfoGain = ctx.createGain()
      lfo.type = 'square'
      lfo.frequency.setValueAtTime(12, now) // 12Hz stutter
      lfoGain.gain.setValueAtTime(0.03, now)
      lfo.connect(lfoGain)
      lfoGain.connect(master.gain)
      lfo.start()
      oscsRef.current.push(lfo)

    } catch {
      // Audio not supported
    }
  }, [])

  const play = useCallback((volume: number) => {
    if (!ctxRef.current || !masterRef.current) initContext()
    if (!ctxRef.current || !masterRef.current) return

    if (ctxRef.current.state === 'suspended') {
      ctxRef.current.resume()
    }

    const now = ctxRef.current.currentTime
    masterRef.current.gain.cancelScheduledValues(now)
    masterRef.current.gain.setValueAtTime(masterRef.current.gain.value, now)
    masterRef.current.gain.linearRampToValueAtTime(volume, now + 0.6)
  }, [initContext])

  const stop = useCallback(() => {
    if (!ctxRef.current || !masterRef.current) return

    const now = ctxRef.current.currentTime
    masterRef.current.gain.cancelScheduledValues(now)
    masterRef.current.gain.setValueAtTime(masterRef.current.gain.value, now)
    masterRef.current.gain.linearRampToValueAtTime(0, now + 0.8)
  }, [])

  return { play, stop, initContext }
}

export function useHoverNavSound() {
  const ctxRef = useRef<AudioContext | null>(null)

  const play = useCallback(() => {
    try {
      if (!ctxRef.current) {
        const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext
        if (!AudioContextClass) return
        ctxRef.current = new AudioContextClass() as AudioContext
      }

      const ctx = ctxRef.current
      if (ctx.state === 'suspended') ctx.resume()

      const now = ctx.currentTime

      // Quick blip sound
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(600, now)
      osc.frequency.linearRampToValueAtTime(200, now + 0.1)
      gain.gain.setValueAtTime(0.1, now)
      gain.gain.linearRampToValueAtTime(0, now + 0.1)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.1)
    } catch {
      // Audio not supported
    }
  }, [])

  return { play }
}
