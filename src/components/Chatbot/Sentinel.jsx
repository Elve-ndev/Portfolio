import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

// Lightweight HUD assistant face (pure SVG — a few KB, ~0 GPU cost).
// Eye tracks the cursor, blinks at random, and shows a waveform "mouth"
// while it's talking (answering). Bobs gently when idle.
export default function Sentinel({ talking = false, size = 50 }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const [pupil, setPupil] = useState({ x: 0, y: 0 })
  const [blink, setBlink] = useState(false)

  // eye follows cursor (fine pointers only)
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const onMove = (e) => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top + r.height / 2)
      const d = Math.hypot(dx, dy) || 1
      const m = Math.min(4, d / 35)
      setPupil({ x: (dx / d) * m, y: (dy / d) * m })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // random blink
  useEffect(() => {
    let t
    const loop = () => {
      setBlink(true)
      setTimeout(() => setBlink(false), 130)
      t = setTimeout(loop, 2400 + Math.random() * 3200)
    }
    t = setTimeout(loop, 1800)
    return () => clearTimeout(t)
  }, [])

  return (
    <motion.svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      animate={reduce ? {} : { y: [0, -4, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      style={{ filter: 'drop-shadow(0 0 8px rgba(0,245,255,0.6))' }}
    >
      {/* antenna */}
      <line x1="50" y1="22" x2="50" y2="12" stroke="#00f5ff" strokeWidth="2" />
      <circle cx="50" cy="9" r="3" fill="#00ff41">
        <animate attributeName="opacity" values="1;0.2;1" dur="1.4s" repeatCount="indefinite" />
      </circle>

      {/* visor head */}
      <rect x="18" y="22" width="64" height="50" rx="16" fill="rgba(2,6,10,0.92)" stroke="#00f5ff" strokeWidth="2" />

      {/* eye lens (tracks cursor) */}
      <g transform={`translate(${pupil.x}, ${pupil.y})`}>
        <ellipse
          cx="50"
          cy="44"
          rx="22"
          ry={blink ? 1.5 : 9}
          fill="#06222a"
          stroke="#00f5ff"
          strokeWidth="1.5"
        />
        {!blink && <circle cx="50" cy="44" r="4.5" fill="#00f5ff" />}
        {!blink && <circle cx="50" cy="44" r="9" fill="none" stroke="#00f5ff" strokeOpacity="0.5" />}
      </g>

      {/* mouth — waveform when talking, flat line otherwise */}
      {talking ? (
        <g>
          {[38, 45, 52, 59].map((x, i) => (
            <rect key={x} x={x} y="58" width="3" height="6" fill="#ff006e">
              <animate
                attributeName="height"
                values="3;11;3"
                dur={`${0.4 + i * 0.12}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="y"
                values="61;55;61"
                dur={`${0.4 + i * 0.12}s`}
                repeatCount="indefinite"
              />
            </rect>
          ))}
        </g>
      ) : (
        <line x1="41" y1="61" x2="59" y2="61" stroke="#ff006e" strokeWidth="2" strokeLinecap="round" />
      )}
    </motion.svg>
  )
}
