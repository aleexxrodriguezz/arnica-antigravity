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
  

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground relative">
      {/* Background logo - only on homepage */}
      {showBackgroundLogo && (
        <div 
          className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center"
          aria-hidden="true"
        >
          <img 
            src={isDark ? "/logos/fb-logo-white.png" : "/logos/fb-logo-black.png"}
            alt=""
            className="w-[60vw] max-w-[800px] h-auto"
            style={{
              opacity: isDark ? 0.04 : 0.05,
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
