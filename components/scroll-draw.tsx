'use client'

export function ScrollDrawSection() {
  return (
    <section className="relative w-full h-[100dvh] overflow-hidden bg-[#05050a]">
      <iframe
        src="/vfx-hero.html"
        className="absolute inset-0 w-full h-full border-none pointer-events-auto"
        title="VFX Video Generator"
      />
      {/* 
        This iframe loads the raw HTML application provided by the user.
        The previous parallax scroll effect and its `useParallaxTechSound` have been removed completely.
        Since it's an interactive canvas, pointer-events are enabled.
      */}
    </section>
  )
}
