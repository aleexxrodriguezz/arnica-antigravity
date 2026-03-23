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
  const timerRef = useRef<any>(null)

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
    } catch {
      // Audio not supported
    }
  }, [])

  const play8BitSequence = useCallback(() => {
    if (!ctxRef.current || !masterRef.current) return

    const ctx = ctxRef.current
    const master = masterRef.current
    const now = ctx.currentTime

    // Clear previous oscillators if any
    oscsRef.current.forEach(osc => {
      try { osc.stop(); osc.disconnect(); } catch(e) {}
    })
    oscsRef.current = []

    // ── OSC 1: The Main 8-bit Arpeggiator ──
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'square'
    
    // Fast frequency shifts
    const freqs = [440, 880, 554, 1318, 659, 330, 1760, 220]
    let time = now
    for (let i = 0; i < 50; i++) {
      const f = freqs[Math.floor(Math.random() * freqs.length)]
      osc.frequency.setValueAtTime(f, time)
      time += 0.05 + Math.random() * 0.1 // Random rhythm
    }
    
    gain.gain.setValueAtTime(0.04, now)
    osc.connect(gain)
    gain.connect(master)
    osc.start(now)
    osc.stop(now + 3) // Sequence lasts 3s
    oscsRef.current.push(osc)

    // ── OSC 2: Sub-noise / Digital Static ──
    const noise = ctx.createOscillator()
    const nGain = ctx.createGain()
    noise.type = 'square'
    for (let i = 0; i < 100; i++) {
       noise.frequency.setValueAtTime(Math.random() * 100 + 40, now + i * 0.03)
    }
    nGain.gain.setValueAtTime(0.02, now)
    noise.connect(nGain)
    nGain.connect(master)
    noise.start(now)
    noise.stop(now + 3)
    oscsRef.current.push(noise)

    // Loop the sequence every 2.8s to keep it seamless
    timerRef.current = setTimeout(play8BitSequence, 2800)
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
    masterRef.current.gain.linearRampToValueAtTime(volume * 1.5, now + 0.3) // Slightly louder

    if (!timerRef.current) {
      play8BitSequence()
    }
  }, [initContext, play8BitSequence])

  const stop = useCallback(() => {
    if (!ctxRef.current || !masterRef.current) return

    const now = ctxRef.current.currentTime
    masterRef.current.gain.cancelScheduledValues(now)
    masterRef.current.gain.setValueAtTime(masterRef.current.gain.value, now)
    masterRef.current.gain.linearRampToValueAtTime(0, now + 0.4)

    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  return { play, stop, initContext }
}

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
