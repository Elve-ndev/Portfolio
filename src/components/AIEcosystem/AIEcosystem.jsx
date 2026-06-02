import CONFIG from '../../config.js'
import Section from '../ui/Section.jsx'
import TiltCard from '../ui/TiltCard.jsx'
import useScrollReveal from '../../hooks/useScrollReveal.js'
import { HuggingFaceIcon, KaggleIcon } from '../icons.jsx'

const NODES = [
  {
    key: 'huggingface',
    label: 'HUGGING FACE',
    handle: '@Hbya',
    Icon: HuggingFaceIcon,
    color: '#00f5ff',
    note: 'Models & spaces hub',
  },
  {
    key: 'kaggle',
    label: 'KAGGLE',
    handle: '@hibabou',
    Icon: KaggleIcon,
    color: '#00ff41',
    note: 'Datasets & competitions',
  },
]

export default function AIEcosystem() {
  const ref = useScrollReveal({ selector: '.eco-card', y: 40, stagger: 0.12 })

  return (
    <Section
      id="ecosystem"
      code="07"
      title="AI ECOSYSTEM"
      subtitle="// connected infrastructure nodes"
    >
      <div className="mb-6 flex items-center gap-2 text-xs tracking-[0.3em] text-neon">
        <span className="h-2 w-2 rounded-full bg-neon animate-pulseDot" />
        AI INFRASTRUCTURE: ACTIVE
      </div>

      <div ref={ref} className="grid gap-5 [perspective:1000px] sm:grid-cols-2">
        {NODES.map((n) => (
          <TiltCard key={n.key} className="eco-card">
            <a
              href={CONFIG.links[n.key]}
              target="_blank"
              rel="noreferrer"
              className="hud-panel hud-corners group flex items-center gap-5 p-6 transition-shadow hover:shadow-cyan"
            >
              <div
                className="flex h-14 w-14 items-center justify-center border"
                style={{ borderColor: `${n.color}55`, color: n.color }}
              >
                <n.Icon width={28} height={28} />
              </div>
              <div className="flex-1">
                <div className="font-display text-sm font-bold tracking-widest text-white">
                  {n.label}
                </div>
                <div className="text-xs" style={{ color: n.color }}>
                  {n.handle}
                </div>
                <div className="mt-1 text-[11px] text-haze">{n.note}</div>
              </div>
              <span className="text-[10px] tracking-widest text-haze transition-colors group-hover:text-cyan">
                CONNECT ▸
              </span>
            </a>
          </TiltCard>
        ))}
      </div>
    </Section>
  )
}
