import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

// Count-up number that animates 0 → value the first time it scrolls into view.
// Respects reduced motion (shows final value immediately).
export default function Counter({ value = 0, duration = 1.6, className = '', suffix = '' }) {
  const ref = useRef(null)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value)
      return
    }

    const obj = { n: 0 }
    let tween
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          tween = gsap.to(obj, {
            n: value,
            duration,
            ease: 'power2.out',
            onUpdate: () => setDisplay(Math.round(obj.n)),
          })
          io.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      tween?.kill()
    }
  }, [value, duration])

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  )
}
