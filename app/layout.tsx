import type { Metadata } from 'next'
import { Space_Grotesk, DM_Sans, Inconsolata } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { LenisProvider } from '@/components/lenis-provider'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['300', '400', '500', '600', '700'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['300', '400', '500'],
})

const inconsolata = Inconsolata({
  subsets: ['latin'],
  variable: '--font-inconsolata',
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: 'Arnica — Agencia de Publicidad',
  description: 'Arnica es una agencia de publicidad tecnológica y creativa. Radio, Producción musical con IA, Motion Graphics, 3D Render y Portfolio.',
  keywords: 'agencia publicidad, motion graphics, 3D render, producción musical, radio',
  authors: [{ name: 'Arnica Agency' }],
  generator: 'v0.app',
  icons: {
    icon: '/favicon.ico',
  },
}

export const viewport = {
  themeColor: '#000000',
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={`${spaceGrotesk.variable} ${dmSans.variable} ${inconsolata.variable} font-sans antialiased`}>
        <ThemeProvider>
          <LenisProvider>
            {children}
          </LenisProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
