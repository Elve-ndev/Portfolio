import CONFIG from '../../config.js'
import Section from '../ui/Section.jsx'
import useScrollReveal from '../../hooks/useScrollReveal.js'

export default function About() {
  const ref = useScrollReveal({ selector: '.about-item', y: 30, stagger: 0.12 })

  // clean the rag.whoami block into readable lines
  const lines = CONFIG.rag.whoami
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)

  return (
    <Section id="about" code="01" title="ABOUT" subtitle="// identity profile decoded">
      <div ref={ref} className="grid gap-8 lg:grid-cols-3">
        <div className="hud-panel hud-corners about-item p-6 lg:col-span-2">
          <div className="mb-3 font-mono text-xs tracking-widest text-cyan">
            $ cat ~/profile/whoami.txt
          </div>
          <div className="space-y-2 text-sm leading-relaxed text-[#bcd6dc]">
            {lines.map((l, i) => (
              <p key={i}>{l}</p>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="hud-panel about-item p-5">
            <div className="mb-3 font-display text-xs tracking-[0.25em] text-magenta">
              ▸ EDUCATION
            </div>
            <p className="text-sm text-[#bcd6dc]">{CONFIG.year}</p>
            <p className="mt-1 text-xs text-haze">{CONFIG.school}</p>
          </div>

          <div className="hud-panel about-item p-5">
            <div className="mb-3 font-display text-xs tracking-[0.25em] text-magenta">
              ▸ LANGUAGES
            </div>
            <ul className="space-y-2">
              {CONFIG.languages.map((l) => (
                <li key={l.name} className="flex items-center justify-between text-sm">
                  <span className="text-[#bcd6dc]">{l.name}</span>
                  <span className="text-xs tracking-widest text-cyan">{l.level}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  )
}
