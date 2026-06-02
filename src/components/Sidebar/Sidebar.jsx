import { motion } from 'framer-motion'
import CONFIG from '../../config.js'
import { SECTIONS } from '../../nav.js'
import useTypewriter from '../../hooks/useTypewriter.js'
import useActiveSection from '../../hooks/useActiveSection.js'
import Counter from '../ui/Counter.jsx'
import {
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  HuggingFaceIcon,
  KaggleIcon,
} from '../icons.jsx'

const socials = [
  { key: 'huggingface', Icon: HuggingFaceIcon, label: 'HuggingFace' },
  { key: 'kaggle', Icon: KaggleIcon, label: 'Kaggle' },
  { key: 'github', Icon: GitHubIcon, label: 'GitHub' },
  { key: 'linkedin', Icon: LinkedInIcon, label: 'LinkedIn' },
]

function go(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Sidebar() {
  const active = useActiveSection()
  const titleType = useTypewriter(
    ['AI ENGINEER', 'COMPUTER VISION', 'NLP // RAG', 'BUILDING THE FUTURE'],
    { typeSpeed: 70, deleteSpeed: 30, hold: 1600 },
  )
  const terminal = useTypewriter(
    [
      '> scanning...',
      `> ${CONFIG.projects.length} projects loaded`,
      '> knowledge base online',
      '> AI active',
    ],
    { typeSpeed: 45, deleteSpeed: 20, hold: 1300 },
  )

  return (
    <>
      {/* ── DESKTOP SIDEBAR ── */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[280px] flex-col border-r border-cyan/20 bg-[#04080c]/80 px-5 py-6 backdrop-blur-sm lg:flex">
        {/* Photo HUD frame — holographic surveillance feed */}
        <div className="badge-feed glitchable hud-corners mx-auto h-36 w-36 border border-cyan/40">
          <img src={CONFIG.photo} alt={CONFIG.name} loading="eager" />
          <div className="feed-tint" />
          <div className="feed-lines" />
          <div className="scan-sweep" />
          <div className="feed-glow" />
        </div>

        {/* Name + typewriter title */}
        <h1 className="mt-4 text-center font-display text-lg font-bold tracking-widest text-white">
          {CONFIG.name.toUpperCase()}
        </h1>
        <p className="mt-1 h-5 text-center text-xs tracking-widest text-cyan text-glow-cyan">
          {titleType}
          <span className="caret" />
        </p>

        {/* ONLINE pulse */}
        <div className="mt-3 flex items-center justify-center gap-2 text-[11px] tracking-[0.25em] text-neon">
          <motion.span
            className="h-2 w-2 rounded-full bg-neon"
            animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
          ONLINE
        </div>

        <div className="neon-divider my-4" />

        {/* Nav */}
        <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto">
          {SECTIONS.map((s) => {
            const on = active === s.id
            return (
              <button
                key={s.id}
                onClick={() => go(s.id)}
                className={`group relative flex items-center gap-3 px-2 py-1.5 text-left text-xs tracking-widest transition-colors ${
                  on ? 'text-cyan' : 'text-haze hover:text-cyan/80'
                }`}
              >
                {on && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute left-0 top-0 h-full w-[2px] bg-cyan shadow-cyan"
                  />
                )}
                <span className="w-5 text-[10px] opacity-60">{s.code}</span>
                {s.label}
              </button>
            )
          })}
        </nav>

        <div className="neon-divider my-3" />

        {/* Live stats */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <Stat value={CONFIG.projects.length} label="PROJECTS" />
          <Stat value={CONFIG.leetcode.solved} label="SOLVED" />
          <Stat value={CONFIG.certifications.length} label="CERTS" />
        </div>

        {/* Socials */}
        <div className="mt-4 flex items-center justify-center gap-3">
          {socials.map(({ key, Icon, label }) => (
            <a
              key={key}
              href={CONFIG.links[key]}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="text-haze transition-colors hover:text-cyan hover:text-glow-cyan"
            >
              <Icon />
            </a>
          ))}
          <a
            href={`mailto:${CONFIG.links.email}`}
            aria-label="Email"
            className="text-haze transition-colors hover:text-magenta"
          >
            <MailIcon />
          </a>
        </div>

        {/* Terminal */}
        <div className="mt-4 hud-panel px-3 py-2 font-mono text-[11px] text-neon/90">
          {terminal}
          <span className="caret" />
        </div>
      </aside>

      {/* ── MOBILE BOTTOM NAV ── */}
      <nav className="fixed bottom-0 left-0 z-40 flex w-full items-center justify-around border-t border-cyan/25 bg-[#04080c]/95 px-1 py-2 backdrop-blur lg:hidden">
        {SECTIONS.filter((s) =>
          ['home', 'projects', 'skills', 'algorithms', 'contact'].includes(s.id),
        ).map((s) => (
          <button
            key={s.id}
            onClick={() => go(s.id)}
            className={`px-2 py-1 text-[10px] tracking-widest ${
              active === s.id ? 'text-cyan text-glow-cyan' : 'text-haze'
            }`}
          >
            {s.label}
          </button>
        ))}
      </nav>
    </>
  )
}

function Stat({ value, label }) {
  return (
    <div className="hud-panel px-1 py-2">
      <Counter value={value} className="block font-display text-lg font-bold text-cyan" />
      <span className="text-[8px] tracking-widest text-haze">{label}</span>
    </div>
  )
}
