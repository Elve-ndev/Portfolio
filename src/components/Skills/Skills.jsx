import CONFIG from '../../config.js'
import Section from '../ui/Section.jsx'
import useScrollReveal from '../../hooks/useScrollReveal.js'

const GROUPS = [
  { key: 'languages', label: 'LANGUAGES', color: 'cyan' },
  { key: 'aiml', label: 'AI / ML', color: 'magenta' },
  { key: 'frameworks', label: 'FRAMEWORKS', color: 'neon' },
  { key: 'tools', label: 'TOOLS', color: 'cyan' },
]

const ring = {
  cyan: 'border-cyan/30 text-cyan hover:bg-cyan/10 hover:shadow-cyan',
  magenta: 'border-magenta/30 text-magenta hover:bg-magenta/10 hover:shadow-magenta',
  neon: 'border-neon/30 text-neon hover:bg-neon/10 hover:shadow-neon',
}

export default function Skills() {
  const ref = useScrollReveal({ selector: '.skill-group', y: 40, stagger: 0.1 })

  return (
    <Section id="skills" code="03" title="SKILLS" subtitle="// capability matrix loaded">
      <div ref={ref} className="grid gap-5 sm:grid-cols-2">
        {GROUPS.map((g) => (
          <div key={g.key} className="skill-group hud-panel hud-corners p-5">
            <div className="mb-4 flex items-center gap-2 font-mono text-xs tracking-widest text-haze">
              <span className="text-cyan">$</span> ls ./{g.key}
              <span className="ml-auto text-[10px]">{CONFIG.skills[g.key].length} pkg</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {CONFIG.skills[g.key].map((s) => (
                <span
                  key={s.name}
                  className={`cursor-default border bg-white/[0.02] px-3 py-1.5 text-xs tracking-wide transition-all duration-200 ${ring[g.color]}`}
                >
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
