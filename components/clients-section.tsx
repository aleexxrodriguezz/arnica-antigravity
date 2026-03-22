'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTheme } from 'next-themes'

const ALL_CLIENTS = [
  { name: 'Pantene Pro-V', src: '/logos/pantene.png' },
  { name: 'ING', src: '/logos/ing.png' },
  { name: 'BBVA', src: '/logos/bbva.png' },
  { name: 'Volkswagen', src: '/logos/volkswagen.png' },
  { name: 'Burger King', src: '/logos/burgerking.png' },
  { name: 'Taco Bell', src: '/logos/tacobell.png' },
  { name: 'Mercedes-Benz', src: '/logos/mercedes.png' },
  { name: 'OraFB', src: '/logos/orafb.png' },
  { name: 'Doritos', src: '/logos/doritos.png' },
  { name: 'CaixaBank', src: '/logos/caixabank.png' },
  { name: 'KFC', src: '/logos/kfc.png' },
  { name: 'Orange', src: '/logos/orange.png' },
]

export function ClientsSection() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <section className="py-24 md:py-32 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-20 md:mb-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <p className="text-xs tracking-[0.3em] uppercase text-primary font-medium mb-4">
            Marcas que confían en nosotros
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground text-balance mb-6 uppercase tracking-wide" style={{ letterSpacing: '0.05em' }}>
            CAPACIDAD TÉCNICA <span className="text-primary">SIN COMPETENCIA</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Más de 15 años produciendo contenido audiovisual de clase mundial para las marcas más exigentes de Europa.
          </p>
        </motion.div>

        {/* Grid minimalista distribuido */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          {ALL_CLIENTS.map((client, idx) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
              viewport={{ once: true, margin: '-100px' }}
              whileHover={{ y: -4 }}
              className="h-20 md:h-24 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-300 flex items-center justify-center group"
            >
              <div className="relative w-full h-full flex items-center justify-center px-3">
                <Image
                  src={client.src}
                  alt={client.name}
                  width={140}
                  height={90}
                  className={`w-auto h-auto max-w-[75%] max-h-[60%] object-contain transition-all duration-300 opacity-75 group-hover:opacity-100`}
                  priority={false}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-20 md:mt-24 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <p className="text-sm text-muted-foreground mb-6">
            ¿Quieres ser parte de nuestro equipo?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Hablemos de tu proyecto
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M2 8h12M9 3l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
