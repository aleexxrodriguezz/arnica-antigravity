'use client'

import { PageShell } from '@/components/page-shell'
import { FadeUp } from '@/components/parallax'

const VIDEOS: Array<{ id: number; title: string; youtubeId: string }> = [
  { id: 1,  title: 'Taco Bell',      youtubeId: 'l5F1mK8qjWg' },
  { id: 2,  title: 'Mercedes',       youtubeId: 'npL3_YQLTMQ' },
  { id: 3,  title: 'ING',            youtubeId: 'UWpi-lgPiBI' },
  { id: 4,  title: 'Doritos',        youtubeId: '7fI9Ube03c8' },
  { id: 5,  title: 'Google Pixel',   youtubeId: 'ADy6jQPKvtg' },
  { id: 6,  title: 'iPhone 15 Pro',  youtubeId: 'uWHajfb0_Ks' },
  { id: 7,  title: 'Burger King',    youtubeId: '9-2hlkg5pXE' },
  { id: 8,  title: 'KFC',            youtubeId: '6lHMiCqFGx8' },
  { id: 9,  title: 'Oral B',         youtubeId: 'ftWgqcJUOao' },
  { id: 10, title: 'Renault Bank',   youtubeId: 'xPQwA4hG8gY' },
  { id: 11, title: 'Freenow',        youtubeId: 'JfRWRFuvPLw' },
]

function VideoEmbed({ youtubeId, title }: { youtubeId: string; title: string }) {
  return (
    <div
      className="w-full bg-black rounded-sm"
      style={{ position: 'relative', paddingTop: '56.25%', overflow: 'hidden' }}
    >
      <iframe
        src={`https://www.youtube.com/embed/${youtubeId}?controls=1&rel=0&modestbranding=1&playsinline=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        title={title}
      />
    </div>
  )
}

export default function PortfolioPage() {
  return (
    <PageShell>
      <section className="py-24 px-6 max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <FadeUp>
            <p className="text-lg tracking-[0.4em] uppercase text-primary font-medium mb-3 font-sans">
              Contáctanos
            </p>
          </FadeUp>
        </div>

        {/* Video grid — 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {VIDEOS.map((video, i) => (
            <FadeUp key={video.id} delay={i * 0.06}>
              <article className="w-full group">
                {/* Video */}
                <div className="w-full rounded-sm overflow-hidden bg-black shadow-md group-hover:shadow-xl transition-shadow duration-300">
                  <VideoEmbed youtubeId={video.youtubeId} title={video.title} />
                </div>

                {/* Title */}
                <p className="mt-3 text-[11px] tracking-[0.3em] uppercase font-medium text-foreground/60">
                  {video.title}
                </p>
              </article>
            </FadeUp>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-32 pt-16 border-t border-border text-center">
          <FadeUp>
            <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-8">
              ¿Listo para el siguiente nivel?
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-extrabold tracking-tight text-foreground mb-10 text-balance leading-tight font-sans" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3.75rem)' }}>
              Hagamos algo <span className="text-primary">increíble</span><br />juntos.
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <a
              href="mailto:hola@arnica.agency"
              className="inline-flex items-center gap-3 px-10 py-4 bg-foreground text-background font-semibold tracking-widest uppercase text-xs rounded-sm hover:opacity-80 transition-opacity"
            >
              Empezar un proyecto
            </a>
          </FadeUp>
        </div>
      </section>
    </PageShell>
  )
}
