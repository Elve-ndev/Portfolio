import { Suspense, lazy, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import CONFIG from '../../config.js'
import useMagneticButton from '../../hooks/useMagneticButton.js'
import useTypewriter from '../../hooks/useTypewriter.js'
import HeroCanvas2D from './HeroCanvas2D.jsx'

// Three.js loaded only when we actually render the 3D scene (desktop + WebGL).
const HeroScene = lazy(() => import('./HeroScene.jsx'))

function useUse3D() {
  const [use3D, setUse3D] = useState(false)
  useEffect(() => {
    const wide = window.matchMedia('(min-width: 1024px)').matches
    let webgl = false
    try {
      const c = document.createElement('canvas')
      webgl = !!(c.getContext('webgl2') || c.getContext('webgl'))
    } catch {
      webgl = false
    }
    setUse3D(wide && webgl)
  }, [])
  return use3D
}

export default function Hero() {
  const use3D = useUse3D()
  const magnet = useMagneticButton(0.45)
  const subtitle = useTypewriter(
    [
      'Élève Ingénieure IA & Data Science',
      'Computer Vision // NLP // RAG',
      'From research paper to working prototype',
    ],
    { typeSpeed: 45, deleteSpeed: 22, hold: 1800 },
  )

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
    >
      {/* 3D / 2D background */}
      <div className="absolute inset-0">
        {use3D ? (
          <Suspense fallback={<HeroCanvas2D />}>
            <HeroScene />
          </Suspense>
        ) : (
          <HeroCanvas2D />
        )}
      </div>

      {/* readability veil */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink" />

      {/* content */}
      <div className="relative z-10 text-center">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 inline-block border border-magenta/60 px-3 py-1 text-xs tracking-[0.3em] text-magenta text-glow-magenta animate-flicker"
        >
          {CONFIG.year} // ALREADY BUILDING
        </motion.span>

        <h1
          className="glitch font-display text-5xl font-black tracking-widest text-white sm:text-7xl lg:text-8xl"
          data-text={CONFIG.name.toUpperCase()}
        >
          {CONFIG.name.toUpperCase()}
        </h1>

        <p className="mx-auto mt-5 h-6 max-w-2xl text-sm tracking-wide text-cyan text-glow-cyan sm:text-base">
          {subtitle}
          <span className="caret" />
        </p>

        <div className="mt-3 flex items-center justify-center gap-2 text-xs tracking-widest text-neon">
          <span className="h-2 w-2 rounded-full bg-neon animate-pulseDot" />
          {CONFIG.status}
        </div>

        {/* Magnetic CTA with rotating border */}
        <motion.button
          ref={magnet.ref}
          style={{ x: magnet.x, y: magnet.y }}
          onMouseMove={magnet.onMouseMove}
          onMouseLeave={magnet.onMouseLeave}
          onClick={() =>
            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
          }
          className="magnetic group relative mt-10 overflow-hidden border border-cyan/60 bg-cyan/5 px-8 py-3 font-display text-sm tracking-[0.25em] text-cyan transition-colors hover:bg-cyan/15"
        >
          <span className="relative z-10">▸ EXPLORE SYSTEMS</span>
          <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-cyan/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        </motion.button>
      </div>

      {/* scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.4em] text-haze">
        <span className="caret">SCROLL</span>
      </div>
    </section>
  )
}
