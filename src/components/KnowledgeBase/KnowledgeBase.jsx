import { useEffect, useRef, useState } from 'react'
import CONFIG from '../../config.js'
import Section from '../ui/Section.jsx'
import useScrollReveal from '../../hooks/useScrollReveal.js'

function ProgressBar({ value }) {
  const ref = useRef(null)
  const [w, setW] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setW(value)
      return
    }
    const io = new IntersectionObserver(
      (e) => {
        if (e[0].isIntersecting) {
          setW(value)
          io.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [value])

  return (
    <div ref={ref}>
      <div className="mb-1 flex justify-between font-mono text-[10px] text-haze">
        <span>[{'█'.repeat(Math.round(w / 10)).padEnd(10, '░')}]</span>
        <span className="text-cyan">{value}%</span>
      </div>
      <div className="h-1.5 w-full bg-[#0a1a20]">
        <div
          className="h-full bg-gradient-to-r from-cyan to-magenta transition-[width] duration-[1400ms] ease-out"
          style={{ width: `${w}%` }}
        />
      </div>
    </div>
  )
}

export default function KnowledgeBase() {
  const ref = useScrollReveal({ selector: '.kb-item', y: 40, stagger: 0.1 })

  return (
    <Section
      id="knowledge"
      code="05"
      title="KNOWLEDGE BASE"
      subtitle="// books & certifications archive"
    >
      <div ref={ref} className="grid gap-8 lg:grid-cols-2">
        {/* Books */}
        <div>
          <div className="mb-4 text-xs tracking-[0.3em] text-magenta">▸ READING LOG</div>
          <div className="space-y-4">
            {CONFIG.books.map((b) => (
              <div key={b.title} className="kb-item hud-panel flex gap-4 p-4">
                <img
                  src={b.image}
                  alt={b.title}
                  className="h-24 w-16 flex-shrink-0 object-cover opacity-90"
                  loading="lazy"
                />
                <div className="flex-1">
                  <h4 className="font-display text-sm font-bold text-white">{b.title}</h4>
                  <p className="mb-2 text-xs text-haze">{b.author}</p>
                  <ProgressBar value={b.progress} />
                  <span
                    className={`mt-2 inline-block text-[10px] tracking-widest ${
                      b.status === 'DONE' ? 'text-neon' : 'text-cyan'
                    }`}
                  >
                    ● {b.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <div className="mb-4 text-xs tracking-[0.3em] text-magenta">▸ CERTIFICATIONS</div>
          <div className="grid gap-4 sm:grid-cols-2">
            {CONFIG.certifications.map((cert) => (
              <a
                key={cert.title}
                href={cert.link}
                target="_blank"
                rel="noreferrer"
                className="kb-item hud-panel hud-corners group block p-4 transition-shadow hover:shadow-cyan"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[10px] tracking-widest text-neon text-glow-neon">
                    ◈ UNLOCKED
                  </span>
                  <span className="text-[10px] text-haze">{cert.year}</span>
                </div>
                <h4 className="font-display text-sm font-bold leading-snug text-white">
                  {cert.title}
                </h4>
                <p className="mt-1 text-xs text-cyan">{cert.issuer}</p>
              </a>
            ))}

            {/* locked / incoming slot */}
            <div className="kb-item flex items-center justify-center border border-dashed border-haze/30 p-4 text-center">
              <div>
                <div className="text-2xl text-haze/40">🔒</div>
                <p className="mt-1 text-[10px] tracking-widest text-haze caret">INCOMING</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
