import Link from 'next/link'
import { Instagram, Linkedin, Music2, MessageCircle } from 'lucide-react'

const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/jacaranda_publicidad/',
    icon: Instagram,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/jacaranda-publicidad/posts/?feedView=all',
    icon: Linkedin,
  },
  {
    label: 'Spotify',
    href: 'https://open.spotify.com/playlist/37i9dQZF1EJEzmbA04RO5B',
    icon: Music2,
  },
  {
    label: 'WhatsApp',
    href: 'https://api.whatsapp.com/send/?phone=34676302085&text=Hola%21+%C2%BFestas+disponible%3F+&type=phone_number&app_absent=0',
    icon: MessageCircle,
  },
]

export function Footer() {
  return (
    <footer className="border-t border-border mt-24 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <span className="text-primary font-extrabold text-xl tracking-tight">ARNICA</span>
          <p className="text-muted-foreground text-xs mt-1">
            Agencia de Publicidad — Torrelaguna 125, Madrid 28850
          </p>
        </div>

        <div className="flex gap-8 text-xs tracking-widest uppercase text-muted-foreground">
          <Link href="/radio" className="hover:text-primary transition-colors">Radio</Link>
          <Link href="/produccion" className="hover:text-primary transition-colors">Producción</Link>
          <Link href="/motion" className="hover:text-primary transition-colors">VFX</Link>
          <Link href="/contactanos" className="hover:text-primary transition-colors">Contáctanos</Link>
        </div>

        <div className="flex items-center gap-4">
          {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-9 h-9 flex items-center justify-center border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>

        <p className="text-muted-foreground text-xs">
          © {new Date().getFullYear()} Arnica. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
