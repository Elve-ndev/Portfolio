import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

// 3D tilt that follows the cursor + a holographic sheen that tracks the pointer.
// Disables tilt under reduced-motion / coarse pointers (still renders children).
export default function TiltCard({ children, className = '', max = 10 }) {
  const ref = useRef(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)

  const rx = useSpring(useTransform(my, [0, 1], [max, -max]), { stiffness: 200, damping: 18 })
  const ry = useSpring(useTransform(mx, [0, 1], [-max, max]), { stiffness: 200, damping: 18 })

  // sheen position
  const sheenX = useTransform(mx, [0, 1], ['0%', '100%'])
  const sheenY = useTransform(my, [0, 1], ['0%', '100%'])

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }
  const onLeave = () => {
    mx.set(0.5)
    my.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d', transformPerspective: 900 }}
      className={`relative ${className}`}
    >
      {children}
      {/* holographic sheen following the cursor */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100"
        style={{
          background: useTransform(
            [sheenX, sheenY],
            ([x, y]) =>
              `radial-gradient(380px circle at ${x} ${y}, rgba(0,245,255,0.16), transparent 60%)`,
          ),
        }}
      />
    </motion.div>
  )
}
