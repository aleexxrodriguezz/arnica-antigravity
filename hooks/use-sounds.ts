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
  const bufferRef = useRef<AudioBuffer | null>(null)
  const sourceRef = useRef<AudioBufferSourceNode | null>(null)

  const initContext = useCallback(async () => {
    if (ctxRef.current && bufferRef.current) return

    try {
      const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext
      if (!AudioContextClass) return

      if (!ctxRef.current) {
        ctxRef.current = new AudioContextClass() as AudioContext
        const master = ctxRef.current.createGain()
        master.gain.setValueAtTime(0, ctxRef.current.currentTime)
        master.connect(ctxRef.current.destination)
        masterRef.current = master
      }

      if (!bufferRef.current) {
        const response = await fetch('/audio/LittleRobotParallax.mp3?v=1.2')
        const arrayBuffer = await response.arrayBuffer()
        bufferRef.current = await ctxRef.current.decodeAudioData(arrayBuffer)
      }
    } catch (e) {
      console.error('Audio load error:', e)
    }
  }, [])

  const play = useCallback(async (volume: number) => {
    if (!ctxRef.current || !bufferRef.current) await initContext()
    if (!ctxRef.current || !bufferRef.current || !masterRef.current) return

    if (ctxRef.current.state === 'suspended') {
      await ctxRef.current.resume()
    }

    // Stop previous source if any
    if (sourceRef.current) {
      try { sourceRef.current.stop(); } catch(e) {}
    }

    const source = ctxRef.current.createBufferSource()
    source.buffer = bufferRef.current
    source.loop = true
    source.playbackRate.value = 0.75 // 0.75 speed as requested
    source.connect(masterRef.current)
    source.start(0)
    sourceRef.current = source

    const now = ctxRef.current.currentTime
    masterRef.current.gain.cancelScheduledValues(now)
    masterRef.current.gain.setValueAtTime(masterRef.current.gain.value, now)
    masterRef.current.gain.linearRampToValueAtTime(volume * 1.5, now + 0.3)
  }, [initContext])

  const stop = useCallback(() => {
    if (!ctxRef.current || !masterRef.current) return

    const now = ctxRef.current.currentTime
    masterRef.current.gain.cancelScheduledValues(now)
    masterRef.current.gain.setValueAtTime(masterRef.current.gain.value, now)
    masterRef.current.gain.linearRampToValueAtTime(0, now + 0.4)

    // Wait for ramp and stop source
    setTimeout(() => {
      if (sourceRef.current) {
        try { sourceRef.current.stop(); } catch(e) {}
        sourceRef.current = null
      }
    }, 400)
  }, [])

  useEffect(() => {
    initContext() // Pre-load
    return () => {
      if (sourceRef.current) try { sourceRef.current.stop(); } catch(e) {}
    }
  }, [initContext])

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
