import { useEffect, useRef, useState } from 'react'
import CONFIG from '../../config.js'
import Section from '../ui/Section.jsx'
import Counter from '../ui/Counter.jsx'

const R = 70
const CIRC = 2 * Math.PI * R

// Animated stroke-dashoffset ring that fills when scrolled into view.
function Ring({ solved, total }) {
  const ref = useRef(null)
  const [progress, setProgress] = useState(0)
  const pct = total ? solved / total : 0

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setProgress(pct)
      return
    }
    const io = new IntersectionObserver(
      (e) => {
        if (e[0].isIntersecting) {
          setProgress(pct)
          io.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [pct])

  return (
    <svg ref={ref} viewBox="0 0 180 180" className="h-44 w-44">
      <circle cx="90" cy="90" r={R} fill="none" stroke="#0a2a30" strokeWidth="10" />
      <circle
        cx="90"
        cy="90"
        r={R}
        fill="none"
        stroke="url(#grad)"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={CIRC}
        strokeDashoffset={CIRC * (1 - progress)}
        transform="rotate(-90 90 90)"
        style={{ transition: 'stroke-dashoffset 1.6s cubic-bezier(0.22,1,0.36,1)' }}
      />
      <defs>
        <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00f5ff" />
          <stop offset="100%" stopColor="#ff006e" />
        </linearGradient>
      </defs>
      <text x="90" y="84" textAnchor="middle" className="fill-white font-display text-3xl font-bold">
        {solved}
      </text>
      <text x="90" y="104" textAnchor="middle" className="fill-[#5b7080] text-[10px] tracking-widest">
        SOLVED
      </text>
    </svg>
  )
}

function Bar({ label, value, total, color }) {
  const ref = useRef(null)
  const [w, setW] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const target = total ? (value / total) * 100 : 0
    const io = new IntersectionObserver(
      (e) => {
        if (e[0].isIntersecting) {
          setW(target)
          io.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [value, total])

  return (
    <div ref={ref}>
      <div className="mb-1 flex justify-between text-xs">
        <span style={{ color }}>{label}</span>
        <span className="text-haze">{value}</span>
      </div>
      <div className="h-2 w-full bg-[#0a1a20]">
        <div
          className="h-full transition-[width] duration-[1400ms] ease-out"
          style={{ width: `${w}%`, background: color, boxShadow: `0 0 8px ${color}` }}
        />
      </div>
    </div>
  )
}

export default function Algorithms() {
  const lc = CONFIG.leetcode
  return (
    <Section
      id="algorithms"
      code="04"
      title="ALGORITHMS"
      subtitle="// leetcode training module"
    >
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div className="hud-panel hud-corners flex items-center justify-center gap-8 p-8">
          <Ring solved={lc.solved} total={lc.solved} />
          <div className="space-y-2 text-sm">
            <div className="text-neon">
              <Counter value={lc.easy} className="font-display text-xl" /> Easy
            </div>
            <div className="text-cyan">
              <Counter value={lc.medium} className="font-display text-xl" /> Medium
            </div>
            <div className="text-magenta">
              <Counter value={lc.hard} className="font-display text-xl" /> Hard
            </div>
          </div>
        </div>

        <div className="hud-panel p-6">
          <div className="mb-4 space-y-3">
            <Bar label="EASY" value={lc.easy} total={lc.solved} color="#00ff41" />
            <Bar label="MEDIUM" value={lc.medium} total={lc.solved} color="#00f5ff" />
            <Bar label="HARD" value={lc.hard} total={lc.solved} color="#ff006e" />
          </div>
          <div className="neon-divider my-4" />
          <div className="mb-2 text-[10px] tracking-[0.3em] text-haze">▸ PATTERNS</div>
          <div className="flex flex-wrap gap-2">
            {lc.skills.map((s, i) => (
              <span
                key={s}
                className={`border px-2 py-1 text-[11px] tracking-wide ${
                  i === 0
                    ? 'border-magenta/50 text-magenta'
                    : 'border-cyan/30 text-cyan/90'
                }`}
              >
                {s}
                {i === 0 && <span className="ml-1 opacity-70">· ADVANCED</span>}
              </span>
            ))}
          </div>
          <div className="mt-5 text-[11px] tracking-widest text-neon animate-flicker">
            ▸ TRAINING IN PROGRESS<span className="caret" />
          </div>
        </div>
      </div>
    </Section>
  )
}
