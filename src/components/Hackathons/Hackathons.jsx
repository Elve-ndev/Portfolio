import CONFIG from '../../config.js'
import Section from '../ui/Section.jsx'

// Radar sweep (CSS rotation of a conic gradient over SVG rings).
function Radar() {
  return (
    <div className="relative h-52 w-52">
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
        {[30, 60, 90].map((r) => (
          <circle key={r} cx="100" cy="100" r={r} fill="none" stroke="#0a3a44" strokeWidth="1" />
        ))}
        <line x1="100" y1="10" x2="100" y2="190" stroke="#0a3a44" strokeWidth="1" />
        <line x1="10" y1="100" x2="190" y2="100" stroke="#0a3a44" strokeWidth="1" />
        {/* a couple of faint blips */}
        <circle cx="135" cy="70" r="2.5" fill="#00ff41" className="animate-pulseDot" />
        <circle cx="70" cy="130" r="2" fill="#00f5ff" className="animate-pulseDot" />
      </svg>
      {/* sweep */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            'conic-gradient(from 0deg, rgba(0,255,65,0.35), transparent 60deg, transparent 360deg)',
          animation: 'radar-spin 3.2s linear infinite',
          maskImage: 'radial-gradient(circle, black 0 95px, transparent 96px)',
          WebkitMaskImage: 'radial-gradient(circle, black 0 95px, transparent 96px)',
        }}
      />
      <style>{`@keyframes radar-spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

export default function Hackathons() {
  const has = CONFIG.hackathons && CONFIG.hackathons.length > 0

  return (
    <Section id="hackathons" code="06" title="HACKATHONS" subtitle="// live event scanner">
      <div className="hud-panel hud-corners flex flex-col items-center gap-6 p-10 text-center lg:flex-row lg:justify-center lg:gap-16">
        <Radar />
        {has ? (
          <ul className="space-y-3 text-left">
            {CONFIG.hackathons.map((h) => (
              <li key={h.title} className="text-sm text-[#bcd6dc]">
                ▸ {h.title}
              </li>
            ))}
          </ul>
        ) : (
          <div className="max-w-sm text-left">
            <div className="font-display text-lg tracking-widest text-neon text-glow-neon animate-flicker">
              SCANNING FOR EVENTS<span className="caret" />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-haze">
              No competitions logged yet — radar active. The pipeline is built; the first
              deployment is a matter of time.
            </p>
            <div className="mt-4 inline-block border border-magenta/50 px-3 py-1 text-xs tracking-[0.25em] text-magenta text-glow-magenta">
              FIRST DEPLOYMENT IMMINENT
            </div>
          </div>
        )}
      </div>
    </Section>
  )
}
