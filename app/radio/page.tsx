'use client'

import { PageShell } from '@/components/page-shell'
import { Radio } from 'lucide-react'

export default function RadioPage() {
  return (
    <PageShell>
      <section className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
        <div className="mb-8 w-16 h-16 rounded-sm border border-border flex items-center justify-center">
          <Radio className="w-7 h-7 text-primary" />
        </div>

        <p className="text-xs tracking-[0.4em] uppercase text-primary font-medium mb-6">Radio</p>

        <h1
          className="text-foreground text-balance mb-6 font-sans"
          style={{ fontSize: 'clamp(1.4rem, 3vw, 2.25rem)' }}
        >
          COMING SOON
        </h1>

        <p className="text-muted-foreground text-lg max-w-sm">
          Esta sección está en desarrollo. Vuelve pronto.
        </p>
      </section>
    </PageShell>
  )
}
