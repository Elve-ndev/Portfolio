import { useRef } from 'react'
import { useMotionValue, useSpring } from 'framer-motion'

// Magnetic hover: element eases toward the cursor while hovered, springs back on leave.
// Usage:
//   const magnet = useMagneticButton(0.4)
//   <motion.button ref={magnet.ref} style={{ x: magnet.x, y: magnet.y }}
//       onMouseMove={magnet.onMouseMove} onMouseLeave={magnet.onMouseLeave} />
export default function useMagneticButton(strength = 0.4) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 })

  const onMouseMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const mx = e.clientX - (r.left + r.width / 2)
    const my = e.clientY - (r.top + r.height / 2)
    x.set(mx * strength)
    y.set(my * strength)
  }

  const onMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return { ref, x: sx, y: sy, onMouseMove, onMouseLeave }
}
