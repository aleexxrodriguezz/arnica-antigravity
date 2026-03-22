export function LoadingSpinner() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      <div className="loadingspinner">
        <div id="square1" />
        <div id="square2" />
        <div id="square3" />
        <div id="square4" />
        <div id="square5" />
      </div>
      <p className="mt-6 text-xs tracking-[0.3em] uppercase text-muted-foreground font-medium">
        Cargando
      </p>
    </div>
  )
}
