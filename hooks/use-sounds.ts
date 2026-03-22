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
      const baseTime = now

      // ═══════════════════════════════════════════════════════════
      // CAPA 1: REACTOR PROFUNDO (tipo Iron Man suit activation)
      // ═══════════════════════════════════════════════════════════
      const reactor = ctx.createOscillator()
      const reactorGain = ctx.createGain()
      reactor.type = 'sine'
      reactor.frequency.setValueAtTime(30, baseTime)
      reactor.frequency.exponentialRampToValueAtTime(80, baseTime + 2) // Barrido ascendente lento
      reactor.frequency.exponentialRampToValueAtTime(30, baseTime + 4)
      reactorGain.gain.setValueAtTime(0.15, baseTime)
      reactor.connect(reactorGain)
      reactorGain.connect(master)
      reactor.start()
      oscsRef.current.push(reactor)

      // ═══════════════════════════════════════════════════════════
      // CAPA 2: ZUMBIDO ELÉCTRICO (descarga de energía)
      // ═══════════════════════════════════════════════════════════
      const electric = ctx.createOscillator()
      const electricGain = ctx.createGain()
      electric.type = 'sawtooth'
      electric.frequency.setValueAtTime(150, baseTime)
      electric.frequency.exponentialRampToValueAtTime(300, baseTime + 1.5)
      electric.frequency.exponentialRampToValueAtTime(150, baseTime + 3)
      electricGain.gain.setValueAtTime(0.08, baseTime)
      electric.connect(electricGain)
      electricGain.connect(master)
      electric.start()
      oscsRef.current.push(electric)

      // ═══════════════════════════════════════════════════════════
      // CAPA 3: LASER ENERGÉTICO (barrido rápido ascendente)
      // ═══════════════════════════════════════════════════════════
      const laser1 = ctx.createOscillator()
      const laser1Gain = ctx.createGain()
      laser1.type = 'sine'
      laser1.frequency.setValueAtTime(600, baseTime)
      laser1.frequency.exponentialRampToValueAtTime(2000, baseTime + 0.5) // Barrido rápido
      laser1.frequency.exponentialRampToValueAtTime(600, baseTime + 1)
      laser1Gain.gain.setValueAtTime(0.07, baseTime)
      laser1.connect(laser1Gain)
      laser1Gain.connect(master)
      laser1.start()
      oscsRef.current.push(laser1)

      // ═══════════════════════════════════════════════════════════
      // CAPA 4: PULSOS DE PLASMA (oscilación rápida)
      // ═══════════════════════════════════════════════════════════
      const plasma = ctx.createOscillator()
      const plasmaGain = ctx.createGain()
      plasma.type = 'triangle'
      plasma.frequency.setValueAtTime(800, baseTime)
      plasma.frequency.exponentialRampToValueAtTime(1400, baseTime + 1.2)
      plasmaGain.gain.setValueAtTime(0.05, baseTime)
      plasma.connect(plasmaGain)
      plasmaGain.connect(master)
      plasma.start()
      oscsRef.current.push(plasma)

      // ═══════════════════════════════════════════════════════════
      // CAPA 5: BRILLO CRISTALINO (alta frecuencia parpadeante)
      // ═══════════════════════════════════════════════════════════
      const shimmer = ctx.createOscillator()
      const shimmerGain = ctx.createGain()
      shimmer.type = 'sine'
      shimmer.frequency.setValueAtTime(3200, baseTime)
      shimmerGain.gain.setValueAtTime(0.02, baseTime)
      shimmer.connect(shimmerGain)
      shimmerGain.connect(master)
      shimmer.start()
      oscsRef.current.push(shimmer)

      // ═══════════════════════════════════════════════════════════
      // MODULADORES: LFOs Y EFECTOS DINÁMICOS
      // ═══════════════════════════════════════════════════════════

      // LFO 1: Modulación profunda en reactor (efecto "breathing")
      const lfo1 = ctx.createOscillator()
      const lfo1Gain = ctx.createGain()
      lfo1.type = 'sine'
      lfo1.frequency.setValueAtTime(0.8, baseTime)
      lfo1Gain.gain.setValueAtTime(0.05, baseTime)
      lfo1.connect(lfo1Gain)
      lfo1Gain.connect(reactorGain.gain)
      lfo1.start()
      oscsRef.current.push(lfo1)

      // LFO 2: Modulación rápida en shimmer (efecto "sparkling")
      const lfo2 = ctx.createOscillator()
      const lfo2Gain = ctx.createGain()
      lfo2.type = 'sine'
      lfo2.frequency.setValueAtTime(4.5, baseTime)
      lfo2Gain.gain.setValueAtTime(0.01, baseTime)
      lfo2.connect(lfo2Gain)
      lfo2Gain.connect(shimmerGain.gain)
      lfo2.start()
      oscsRef.current.push(lfo2)

      // LFO 3: Modulación de plasma (efecto "pulsing energy")
      const lfo3 = ctx.createOscillator()
      const lfo3Gain = ctx.createGain()
      lfo3.type = 'sine'
      lfo3.frequency.setValueAtTime(2.2, baseTime)
      lfo3Gain.gain.setValueAtTime(0.08, baseTime)
      lfo3.connect(lfo3Gain)
      lfo3Gain.connect(laser1Gain.gain)
      lfo3.start()
      oscsRef.current.push(lfo3)

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
