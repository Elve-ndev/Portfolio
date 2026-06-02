import { useEffect, useRef } from 'react'

// Custom cursor — pulsing cyan targeting crosshair.
// Disabled automatically on touch / coarse pointers (CSS keeps native cursor there).
export default function CursorCrosshair() {
  const coreRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!fine) return

    const core = coreRef.current
    const ring = ringRef.current
    let raf = 0
    let cx = window.innerWidth / 2
    let cy = window.innerHeight / 2
    let rx = cx
    let ry = cy

    const onMove = (e) => {
      cx = e.clientX
      cy = e.clientY
      core.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`
    }

    // ring eases toward the pointer for a subtle lag
    const loop = () => {
      rx += (cx - rx) * 0.18
      ry += (cy - ry) * 0.18
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(loop)
    }

    const hot = (e) => {
      const interactive = e.target.closest('a, button, input, textarea, [role="button"], .magnetic')
      ring.classList.toggle('is-hot', !!interactive)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', hot)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', hot)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={coreRef} className="cursor-core" aria-hidden />
      <div ref={ringRef} className="cursor-ring" aria-hidden />
    </>
  )
}
