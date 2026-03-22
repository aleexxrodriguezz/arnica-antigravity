'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { useTheme } from '@/components/theme-provider'

export function PageShell({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme()
  const pathname = usePathname()
  const isDark = theme === 'dark'
  
  // Show background logo only on homepage
  const showBackgroundLogo = pathname === '/'
  
  // Logo URLs for background pattern
  const logoUrl = isDark 
    ? 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Arnica_logo-8Uy5GvJpH77M7VC5hEz83NOZI2ZOqh.png' // White logo for dark mode
    : 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Arnica_logo_black-cQaFbk2rrt5lnksHDyYpSREWZ1AnkV.png' // Black logo for light mode

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground relative">
      {/* Background logo - only on homepage */}
      {showBackgroundLogo && (
        <div 
          className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center"
          aria-hidden="true"
        >
          <img 
            src={logoUrl}
            alt=""
            className="w-[60vw] max-w-[800px] h-auto"
            style={{
              opacity: isDark ? 0.06 : 0.08,
            }}
          />
        </div>
      )}
      <Navbar />
      <main className="flex-1 pt-16 relative z-10">
        {children}
      </main>
      <Footer />
    </div>
  )
}
