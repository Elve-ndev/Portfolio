import { useEffect, useState } from 'react'
import CONFIG from '../config.js'

// Boot splash: scan line descends → SYSTEM INITIALIZING… → reveal.
// Phase-1 version (CSS-timed). Phase 4 upgrades the name reveal with a GSAP glitch timeline.
const LINES = [
  '> BOOT SEQUENCE INITIATED',
  '> LOADING NEURAL MODULES........ OK',
  '> MOUNTING KNOWLEDGE BASE....... OK',
  '> SYSTEM INITIALIZING',
]

export default function Splash({ onDone }) {
  const [shown, setShown] = useState(0)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const timers = []
    LINES.forEach((_, i) => {
      timers.push(setTimeout(() => setShown(i + 1), 380 * (i + 1)))
    })
    timers.push(
      setTimeout(() => setLeaving(true), 380 * LINES.length + 700),
    )
    timers.push(
      setTimeout(() => onDone?.(), 380 * LINES.length + 1500),
    )
    return () => timers.forEach(clearTimeout)
  }, [onDone])

  return (
    <div
      className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-ink transition-opacity duration-700 ${
        leaving ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-cyan shadow-cyan animate-scan" />
      <div className="w-[min(520px,86vw)] font-mono text-sm">
        {LINES.map((l, i) => (
          <div
            key={l}
            className={`mb-1 transition-opacity duration-200 ${
              i < shown ? 'opacity-100' : 'opacity-0'
            } ${i === LINES.length - 1 ? 'text-neon text-glow-neon' : 'text-cyan/80'}`}
          >
            {l}
            {i === LINES.length - 1 && i < shown && <span className="caret" />}
          </div>
        ))}
      </div>
      <div
        className={`mt-8 font-display text-3xl font-black tracking-widest text-white transition-all duration-700 ${
          shown >= LINES.length ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'
        }`}
      >
        {CONFIG.name.toUpperCase()}
      </div>
    </div>
  )
}
