'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useTheme } from '@/components/theme-provider'
import { useHoverNavSound } from '@/hooks/use-sounds'
import { useIsMobile } from '@/hooks/use-mobile'
import { Sun, Moon, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { 
    label: 'Agencia', 
    href: '/agencia',
    subItems: [
      { label: 'Artistas', href: '/artistas' }
    ]
  },
  { label: 'Atrezo/PLV', href: '/atrezo' },
  { label: 'Contáctanos',  href: '/contactanos' },
  { label: 'Producción', href: '/produccion' },
  { label: 'Radio',      href: '/radio' },
  { label: 'VFX',        href: '/motion' },
]

const GLITCH_CHARS = '@#$%&!?*<>~^'

function GlitchLink({ label, href, active }: { label: string; href: string; active: boolean }) {
  const [display, setDisplay] = useState(label)
  const [hovered, setHovered] = useState(false)
  const isMobile = useIsMobile()
  const { play: playHoverSound } = useHoverNavSound()

  const scramble = useCallback(() => {
    let iteration = 0
    const interval = setInterval(() => {
      setDisplay(
        label
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' '
            if (index < iteration) return label[index]
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
          })
          .join('')
      )
      iteration += 0.5
      if (iteration >= label.length) {
        clearInterval(interval)
        setDisplay(label)
      }
    }, 40)
  }, [label])

  const handleMouseEnter = useCallback(() => {
    setHovered(true)
    scramble()
    // Only play sound on desktop
    if (!isMobile) {
      playHoverSound()
    }
  }, [scramble, playHoverSound, isMobile])

  return (
    <Link
      href={href}
      className="relative group flex flex-col items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => { setHovered(false); setDisplay(label) }}
    >
      <span
        className={cn(
          'text-sm font-medium tracking-widest uppercase transition-colors duration-200 select-none font-sans',
          active ? 'text-primary' : 'text-foreground group-hover:text-primary'
        )}
        style={{ letterSpacing: '0.15em', minWidth: `${label.length}ch` }}
      >
        {display}
      </span>
      {/* Orange underline */}
      <span
        className={cn(
          'block h-px bg-primary mt-1 transition-all duration-300 ease-out',
          active ? 'w-full' : 'w-0 group-hover:w-full'
        )}
      />
    </Link>
  )
}

export function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-md transition-colors duration-400">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo - switches based on theme */}
        <Link href="/" className="flex items-center group" aria-label="Arnica — Inicio">
          <Image
            src={theme === 'dark' 
              ? 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Arnica_logo-8Uy5GvJpH77M7VC5hEz83NOZI2ZOqh.png'
              : 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Arnica_logo_black-cQaFbk2rrt5lnksHDyYpSREWZ1AnkV.png'
            }
            alt="Arnica"
            width={120}
            height={48}
            className="h-10 w-auto object-contain transition-opacity duration-300 group-hover:opacity-80"
            priority
          />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <div key={link.label} className="relative group/nav">
              <GlitchLink
                label={link.label}
                href={link.href}
                active={pathname === link.href || (link.href === '/agencia' && pathname.startsWith('/agencia'))}
              />
              
              {link.subItems && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-300">
                  <div className="bg-background border border-border shadow-2xl py-2 min-w-[140px] backdrop-blur-md">
                    {link.subItems.map(sub => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className="block px-4 py-3 text-[10px] tracking-[0.3em] uppercase hover:bg-primary/10 transition-colors text-foreground hover:text-primary whitespace-nowrap text-center font-semibold"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-4">
          {/* Day/Night toggle */}
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
            className="relative w-12 h-6 rounded-full border border-border bg-secondary flex items-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-foreground/50"
          >
            <span
              className={cn(
                'absolute flex items-center justify-center w-5 h-5 rounded-full bg-foreground transition-all duration-300 shadow-md',
                theme === 'dark' ? 'left-0.5' : 'left-6'
              )}
            >
              {theme === 'dark'
                ? <Moon className="w-3 h-3 text-background" />
                : <Sun className="w-3 h-3 text-background" />
              }
            </span>
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-foreground hover:text-primary transition-colors"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-background px-6 py-6 flex flex-col gap-6 animate-in fade-in slide-in-from-top-2 duration-200">
          {NAV_LINKS.map(link => (
            <div key={link.href} className="flex flex-col gap-4">
              <Link
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  'text-base font-medium tracking-widest uppercase transition-colors',
                  pathname === link.href ? 'text-primary' : 'text-foreground hover:text-primary'
                )}
              >
                {link.label}
              </Link>
              {link.subItems && (
                <div className="pl-6 flex flex-col gap-4 border-l border-border">
                  {link.subItems.map(sub => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        'text-sm font-medium tracking-widest uppercase transition-colors',
                        pathname === sub.href ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                      )}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  )
}
