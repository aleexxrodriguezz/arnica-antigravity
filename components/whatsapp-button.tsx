'use client'

import { MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export function WhatsAppButton() {
  const WHATSAPP_NUMBER = '34676302085'
  const WHATSAPP_MESSAGE = encodeURIComponent('Hola! Me gustaría informarme sobre un presupuesto para un proyecto.')
  const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`

  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ 
        type: 'spring', 
        stiffness: 260, 
        damping: 20,
        delay: 1 
      }}
      className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-shadow group"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={32} fill="currentColor" className="relative z-10" />
      
      {/* Tooltip or Label */}
      <span className="absolute right-full mr-4 px-4 py-2 bg-background border border-border text-foreground text-xs font-bold tracking-widest uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
        ¿Hablamos de tu presupuesto?
      </span>

      {/* Pulsing effect */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
    </motion.a>
  )
}
