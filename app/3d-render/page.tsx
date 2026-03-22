'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { PageShell } from '@/components/page-shell'
import { FadeUp, MaskReveal, ParallaxLayer } from '@/components/parallax'
import { Box, ArrowRight } from 'lucide-react'

const TUTORIAL_VIDEOS = [
  { id: 'TPrnSACiTjY', title: 'Blender Beginner Tutorial — 3D Fundamentals', description: 'Domina los conceptos fundamentales de Blender: modelado, materiales y renderizado.', level: 'Básico', duration: '34 min' },
  { id: 'CmrARtmboOY', title: 'Photorealistic Product Render in Cinema 4D', description: 'Crea renders de producto fotorrealistas dignos de campañas publicitarias de alto nivel.', level: 'Avanzado', duration: '51 min' },
  { id: 'BYFRTE9eQKA', title: 'Architectural Visualization in Blender', description: 'Visualizaciones arquitectónicas con iluminación HDRI y postproducción en Blender.', level: 'Intermedio', duration: '44 min' },
  { id: 'OpB_lCO4bio', title: 'Hard Surface Modeling Techniques', description: 'Técnicas avanzadas de modelado hard surface para diseño industrial y sci-fi.', level: 'Avanzado', duration: '38 min' },
]

const RENDER_PROJECTS = [
  { id: 1, title: 'Identidad de Producto — Electrodomésticos Nimbus', desc: 'Visualizaciones 360° de alta fidelidad para una línea premium de electrodomésticos.', tag: 'Producto', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80' },
  { id: 2, title: 'Render Arquitectónico — Residencial Alva', desc: 'Proyecto de visualización arquitectónica interior y exterior para un complejo residencial de lujo.', tag: 'Arquitectura', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80' },
  { id: 3, title: 'Packaging 3D — Cosmética Vela Noir', desc: 'Serie de renders de packaging para una marca de cosmética de lujo.', tag: 'Packaging', img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80' },
  { id: 4, title: 'Concept Art Sci-Fi — Proyecto Argo', desc: 'Arte conceptual 3D para una producción audiovisual de ciencia ficción independiente.', tag: 'Concept Art', img: 'https://images.unsplash.com/photo-1446941611757-91d2c3bd3d45?w=800&q=80' },
  { id: 5, title: 'Campaña Publicitaria — Relojes Meridian', desc: 'Renders publicitarios de alta gama para la colección Meridian.', tag: 'Relojería', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80' },
  { id: 6, title: 'Infografía Industrial — Maquinaria Helix', desc: 'Visualizaciones técnicas y explosionadas de maquinaria industrial para catálogos B2B.', tag: 'Industrial', img: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&q=80' },
]

const LEVEL_COLOR: Record<string, string> = {
  Básico:     'text-green-400 border-green-400/30 bg-green-400/10',
  Intermedio: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
  Avanzado:   'text-primary border-primary/30 bg-primary/10',
}

function VideoShowcase() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 1])
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <div ref={ref} className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center" style={{ position: 'relative' }}>
      {/* Ambient glow effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FF5C00]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FF5C00]/5 rounded-full blur-3xl" />
      </div>

      {/* VSL Container */}
      <motion.div
        className="relative z-10 w-full max-w-4xl mx-auto px-6 flex flex-col items-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Decorative top border */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#FF5C00] to-transparent mb-12" />
        
        {/* Video card container - VSL style */}
        <div className="relative w-full rounded-3xl overflow-hidden border border-white/10 backdrop-blur-sm bg-black/20 p-1 shadow-2xl">
          {/* Inner glow ring */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#FF5C00]/10 to-transparent pointer-events-none" />
          
          {/* Video wrapper */}
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-black">
            <div
              style={{ position: 'relative', paddingTop: '56.25%', overflow: 'hidden' }}
            >
              <iframe
                src="https://www.youtube.com/embed/kyIpUw_fy9A?rel=0&modestbranding=1"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                }}
                title="3D Render Studio — Arnica"
              />
            </div>
            
            {/* Scanlines effect */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.06) 2px,rgba(0,0,0,0.06) 4px)',
              }}
            />
          </div>
        </div>

        {/* Decorative bottom border */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#FF5C00] to-transparent mt-12 mb-8" />

        {/* Content section */}
        <motion.div
          className="text-center max-w-2xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <p className="text-xs tracking-[0.4em] uppercase text-[#FF5C00] font-medium mb-4">Visualización 3D Premium</p>
          <h1 className="font-extrabold tracking-tight text-white text-balance leading-none font-sans" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3.75rem)' }}>3D Render</h1>
          <p className="mt-6 text-lg text-white/70 max-w-lg mx-auto leading-relaxed">Visualizaciones fotorrealistas que transforman ideas en realidad visual.</p>
          
          {/* Scroll indicator */}
          <motion.div 
            className="mt-8 flex items-center justify-center gap-2 text-white/40 text-sm"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span>Desliza para explorar</span>
            <ArrowRight className="w-4 h-4 rotate-90" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none" />
    </div>
  )
}

export default function Page() {
  return (
    <PageShell>
      <VideoShowcase />
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="mb-20 overflow-hidden">
          <FadeUp><p className="text-xs tracking-[0.3em] uppercase text-primary font-medium mb-4">Tutoriales y Proyectos</p></FadeUp>
          <ParallaxLayer speed={0.08}>
            <h2 className="font-extrabold tracking-tight text-foreground text-balance font-sans" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3.75rem)' }}>Nuestro trabajo 3D</h2>
          </ParallaxLayer>
          <FadeUp delay={0.15}><p className="mt-4 text-muted-foreground text-lg max-w-xl leading-relaxed">Tutoriales de modelado y render 3D y una selección de nuestros proyectos más destacados.</p></FadeUp>
        </div>

        <h2 className="text-2xl font-bold text-foreground mb-8">Tutoriales</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          {TUTORIAL_VIDEOS.map(video => (
            <article key={video.id} className="group border border-border rounded-sm overflow-hidden bg-card hover:border-primary/40 transition-colors duration-300">
              <div className="relative aspect-video w-full bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-[10px] font-medium border px-2 py-0.5 rounded-sm tracking-widest uppercase ${LEVEL_COLOR[video.level]}`}>{video.level}</span>
                  <span className="text-xs text-muted-foreground font-mono">{video.duration}</span>
                </div>
                <h3 className="font-bold text-foreground text-base mb-2 leading-snug group-hover:text-primary transition-colors">{video.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{video.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div>
          <div className="flex items-center gap-3 mb-4">
            <Box className="w-5 h-5 text-primary" />
            <p className="text-xs tracking-[0.3em] uppercase text-primary font-medium">Nuestro trabajo</p>
          </div>
          <h2 className="font-extrabold tracking-tight text-foreground mb-4 text-balance font-sans" style={{ fontSize: 'clamp(1.5rem, 3vw, 3rem)' }}>Proyectos de 3D Render</h2>
          <p className="text-muted-foreground mb-16 max-w-xl leading-relaxed">Desde product shots hasta visualizaciones arquitectónicas, cada render que creamos es una obra de precisión técnica y sensibilidad artística.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RENDER_PROJECTS.map((project, i) => (
              <FadeUp key={project.id} delay={(i % 3) * 0.1}>
                <article className="group border border-border rounded-sm overflow-hidden bg-card hover:border-primary/40 transition-all duration-300 cursor-pointer h-full">
                  <MaskReveal direction="up" delay={(i % 3) * 0.12}>
                    <div className="relative overflow-hidden aspect-[4/3]">
                      <ParallaxLayer speed={0.07}>
                        <img src={project.img} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </ParallaxLayer>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="absolute top-3 left-3 text-[10px] bg-primary text-white px-2 py-1 rounded-sm font-medium tracking-widest uppercase">{project.tag}</span>
                      <ArrowRight className="absolute bottom-4 right-4 w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-2 group-hover:translate-x-0" />
                    </div>
                  </MaskReveal>
                  <div className="p-6">
                    <h3 className="font-bold text-foreground text-base mb-2 leading-snug group-hover:text-primary transition-colors">{project.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{project.desc}</p>
                  </div>
                </article>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  )
}
