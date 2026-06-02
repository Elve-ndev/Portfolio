import { useEffect, useState } from 'react'

// Toggles "sober" mode: a clean, professional look for corporate/consulting
// recruiters (BCG, Oracle, banks). Hides glitch/scanlines/grain/glows/cursor FX.
// Pure CSS does the work via the `sober` class on <html>; choice persists.
export default function ThemeToggle() {
  const [sober, setSober] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('cf-sober') === '1'
    setSober(saved)
    document.documentElement.classList.toggle('sober', saved)
  }, [])

  const toggle = () => {
    const next = !sober
    setSober(next)
    document.documentElement.classList.toggle('sober', next)
    localStorage.setItem('cf-sober', next ? '1' : '0')
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle visual intensity"
      title={sober ? 'Switch to full cyberpunk FX' : 'Switch to a sober, professional look'}
      className="magnetic fixed right-4 top-4 z-[70] flex items-center gap-1.5 border border-cyan/50 bg-ink/80 px-3 py-1.5 font-mono text-[10px] tracking-widest text-cyan backdrop-blur transition-colors hover:bg-cyan/10 lg:right-6 lg:top-6"
    >
      {sober ? '◐ FULL FX' : '○ SOBER MODE'}
    </button>
  )
}
