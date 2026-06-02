// Full-page CRT scan-lines + film grain + vignette.
// Pure CSS layers (see globals.css). pointer-events:none so it never blocks clicks.
export default function FXOverlay() {
  return (
    <div className="fx-overlay" aria-hidden>
      <div className="fx-grain" />
      <div className="fx-scanlines" />
      <div className="fx-vignette" />
    </div>
  )
}
