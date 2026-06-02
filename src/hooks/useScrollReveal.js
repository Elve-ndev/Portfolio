import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Reveal an element (or its children via `selector`) on scroll-in with a GSAP tween.
// Respects prefers-reduced-motion (renders content immediately, no animation).
//
//   const ref = useScrollReveal({ y: 60, stagger: 0.12, selector: '.card' })
//   <div ref={ref}> ...cards... </div>
export default function useScrollReveal({
  y = 40,
  x = 0,
  opacity = 0,
  scale = 1,
  rotateY = 0,
  duration = 0.9,
  stagger = 0,
  start = 'top 85%',
  ease = 'power3.out',
  selector = null,
} = {}) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const targets = selector ? el.querySelectorAll(selector) : el
    if (selector && targets.length === 0) return

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        y,
        x,
        opacity,
        scale,
        rotateY,
        duration,
        stagger,
        ease,
        scrollTrigger: { trigger: el, start },
      })
    }, el)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return ref
}
