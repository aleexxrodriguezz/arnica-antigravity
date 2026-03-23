'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'

const SESSION_KEY = 'arnica-3d-cinematic-seen'
const GAP = 1.1
const CUBIE = 0.9

// ─── Pure Three.js Rubik cinematic ────────────────────────────
function useRubikScene(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  onReady: () => void
) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // ── Renderer ──────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.1

    // ── Scene ─────────────────────────────────────────────────
    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#000000')

    // ── Camera ────────────────────────────────────────────────
    const camera = new THREE.PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 100)
    camera.position.set(0, 0, 9)

    // ── Lights ────────────────────────────────────────────────
    const ambient = new THREE.AmbientLight('#fef9f3', 0.35)
    scene.add(ambient)

    const dirLight = new THREE.DirectionalLight('#fef9f3', 2.5)
    dirLight.position.set(6, 8, 5)
    dirLight.castShadow = true
    scene.add(dirLight)

    const fillLight = new THREE.DirectionalLight('#FF5C00', 0.7)
    fillLight.position.set(-5, -4, -4)
    scene.add(fillLight)

    const pointLight = new THREE.PointLight('#FF5C00', 1.8, 14)
    pointLight.position.set(0, 0, 6)
    scene.add(pointLight)

    // ── Particles ─────────────────────────────────────────────
    const PARTICLE_COUNT = 350
    const particlePositions = new Float32Array(PARTICLE_COUNT * 3)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particlePositions[i * 3 + 0] = (Math.random() - 0.5) * 26
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 26
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 26
    }
    const particleGeo = new THREE.BufferGeometry()
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
    const particleMat = new THREE.PointsMaterial({ size: 0.055, color: '#FF5C00', transparent: true, opacity: 0.55, sizeAttenuation: true })
    const particles = new THREE.Points(particleGeo, particleMat)
    scene.add(particles)

    // ── Cube materials ────────────────────────────────────────
    const FACE_COLORS = ['#FF5C00', '#0a0a0a', '#fef9f3', '#1a1a1a', '#FF5C00', '#111111']
    const faceMats = FACE_COLORS.map(color =>
      new THREE.MeshStandardMaterial({ color, roughness: 0.12, metalness: color === '#FF5C00' ? 0.6 : 0.3 })
    )

    // ── Build 27 cubies ───────────────────────────────────────
    const cubeGeo = new THREE.BoxGeometry(CUBIE, CUBIE, CUBIE)
    const outerGroup = new THREE.Group() // global spin
    const cubeGroup = new THREE.Group() // holds all cubies
    outerGroup.add(cubeGroup)
    scene.add(outerGroup)

    const cubies: THREE.Mesh[] = []
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          const mesh = new THREE.Mesh(cubeGeo, faceMats)
          mesh.position.set(x * GAP, y * GAP, z * GAP)
          mesh.castShadow = true
          cubeGroup.add(mesh)
          cubies.push(mesh)
        }
      }
    }

    // ── Slice rotation state ──────────────────────────────────
    const pivot = new THREE.Group()
    scene.add(pivot)

    type Axis = 'x' | 'y' | 'z'
    const MOVES: { axis: Axis; slice: number }[] = [
      { axis: 'x', slice: -1 }, { axis: 'x', slice: 0 }, { axis: 'x', slice: 1 },
      { axis: 'y', slice: -1 }, { axis: 'y', slice: 0 }, { axis: 'y', slice: 1 },
      { axis: 'z', slice: -1 }, { axis: 'z', slice: 0 }, { axis: 'z', slice: 1 },
    ]
    // 14 shuffled moves
    const queue = [...MOVES, ...MOVES].sort(() => Math.random() - 0.5).slice(0, 14)

    let active = false
    let currentAxis: Axis = 'x'
    let progress = 0
    let direction = 1
    let capturedCubies: THREE.Object3D[] = []
    let movesDone = 0
    let readyFired = false

    // ── Resize handler ────────────────────────────────────────
    const onResize = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    // ── Animation loop ────────────────────────────────────────
    let lastTime = 0
    let rafId: number

    const tick = (time: number) => {
      rafId = requestAnimationFrame(tick)
      const delta = Math.min((time - lastTime) / 1000, 0.05)
      lastTime = time

      // Ambient spin
      outerGroup.rotation.y += delta * 0.2
      outerGroup.rotation.x = Math.sin(time * 0.0003) * 0.18

      // Particles drift
      particles.rotation.y += delta * 0.04

      if (!active) {
        if (queue.length === 0) {
          if (!readyFired) {
            readyFired = true
            onReady()
          }
          renderer.render(scene, camera)
          return
        }

        const move = queue.shift()!
        const axisIdx = move.axis === 'x' ? 0 : move.axis === 'y' ? 1 : 2

        capturedCubies = cubeGroup.children.filter(child => {
          const wp = new THREE.Vector3()
          child.getWorldPosition(wp)
          const val = [wp.x, wp.y, wp.z][axisIdx]
          return Math.round(val / GAP) === move.slice
        })

        if (capturedCubies.length === 0) { renderer.render(scene, camera); return }

        pivot.rotation.set(0, 0, 0)
        capturedCubies.forEach(c => {
          const wp = new THREE.Vector3()
          const wq = new THREE.Quaternion()
          c.getWorldPosition(wp)
          c.getWorldQuaternion(wq)
          pivot.attach(c)
        })

        active = true
        currentAxis = move.axis
        progress = 0
        direction = Math.random() > 0.5 ? 1 : -1
        movesDone++
      } else {
        // Animate quarter turn
        progress += delta * 2.4
        const angle = Math.min(progress, Math.PI / 2) * direction

        if (currentAxis === 'x') pivot.rotation.x = angle
        else if (currentAxis === 'y') pivot.rotation.y = angle
        else pivot.rotation.z = angle

        if (progress >= Math.PI / 2) {
          capturedCubies.forEach(c => {
            const wp = new THREE.Vector3()
            const wq = new THREE.Quaternion()
            c.getWorldPosition(wp)
            c.getWorldQuaternion(wq)
            cubeGroup.attach(c)
            c.position.set(
              Math.round(wp.x / GAP) * GAP,
              Math.round(wp.y / GAP) * GAP,
              Math.round(wp.z / GAP) * GAP
            )
            c.quaternion.copy(wq)
          })
          pivot.rotation.set(0, 0, 0)
          active = false
          capturedCubies = []
        }
      }

      renderer.render(scene, camera)
    }

    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      cubeGeo.dispose()
      particleGeo.dispose()
      faceMats.forEach(m => m.dispose())
      particleMat.dispose()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

// ─── Overlay component ────────────────────────────────────────
export default function RubikCinematic() {
  const [visible, setVisible] = useState(false)
  const [cubeReady, setCubeReady] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!sessionStorage.getItem(SESSION_KEY)) {
      setVisible(true)
    }
  }, [])

  useRubikScene(canvasRef, () => setCubeReady(true))

  const handleDismiss = () => {
    sessionStorage.setItem(SESSION_KEY, '1')
    setDismissed(true)
    setTimeout(() => setVisible(false), 900)
  }

  if (!visible) return null

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          key="cinematic"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black/95 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* VSL Container - Elegant video frame */}
          <motion.div
            className="relative w-full max-w-2xl mx-auto px-6"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {/* Decorative top border */}
            <div className="h-px bg-gradient-to-r from-transparent via-[#FF5C00] to-transparent mb-8" />
            
            {/* Video card container */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 backdrop-blur-sm bg-black/20 p-1 shadow-2xl">
              {/* Inner glow */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#FF5C00]/5 to-transparent pointer-events-none" />
              
              {/* Canvas wrapper */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
                <canvas
                  ref={canvasRef}
                  className="absolute inset-0 w-full h-full"
                  style={{ display: 'block' }}
                />
                
                {/* Scanlines */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.06) 2px,rgba(0,0,0,0.06) 4px)',
                  }}
                />
              </div>
            </div>

            {/* Decorative bottom border */}
            <div className="h-px bg-gradient-to-r from-transparent via-[#FF5C00] to-transparent mt-8 mb-6" />

            {/* Title and subtitle */}
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <h2
                className="text-white font-bold tracking-tight mb-2"
                style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}
              >
                3D Render Studio
              </h2>
              <p className="text-white/40 text-sm tracking-widest font-mono uppercase">
                Precision · Material · Light · Innovation
              </p>
            </motion.div>
          </motion.div>

          {/* Dismiss button — appears after cube finishes */}
          <AnimatePresence>
            {cubeReady && (
              <motion.button
                key="btn"
                onClick={handleDismiss}
                className="absolute bottom-10 group flex items-center gap-3 cursor-pointer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-white/40 text-xs font-mono uppercase tracking-widest group-hover:text-white transition-colors">
                  Entrar
                </span>
                <span
                  className="w-8 h-8 rounded-full border flex items-center justify-center group-hover:border-[#FF5C00] transition-colors"
                  style={{ borderColor: 'rgba(255,255,255,0.2)' }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2 6h8M7 3l3 3-3 3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white/50 group-hover:text-[#FF5C00] transition-colors"
                    />
                  </svg>
                </span>
              </motion.button>
            )}
          </AnimatePresence>

          {/* Progress line */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px]"
            style={{ background: '#FF5C00' }}
            initial={{ width: '0%' }}
            animate={{ width: cubeReady ? '100%' : '60%' }}
            transition={{ duration: cubeReady ? 0.4 : 7, ease: 'easeOut' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
