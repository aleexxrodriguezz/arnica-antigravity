'use client'

export function VFXHubSection() {
  return (
    <section className="relative w-full pb-32 pt-8 bg-[#fef9f3] dark:bg-[#000000] z-20 overflow-hidden">
      <div className="w-full max-w-5xl mx-auto h-[80vh] min-h-[600px] relative rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] ring-1 ring-black/5 dark:ring-white/10">
        <iframe
          src="/vfx-productormusic.html"
          className="w-full h-full absolute inset-0 border-none bg-transparent"
          title="Estudio de Música VFX"
        />
      </div>
    </section>
  )
}
