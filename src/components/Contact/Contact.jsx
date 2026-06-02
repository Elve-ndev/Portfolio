import { useState } from 'react'
import { motion } from 'framer-motion'
import CONFIG from '../../config.js'
import Section from '../ui/Section.jsx'
import useMagneticButton from '../../hooks/useMagneticButton.js'
import {
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  HuggingFaceIcon,
  KaggleIcon,
} from '../icons.jsx'

const socials = [
  { key: 'github', Icon: GitHubIcon },
  { key: 'linkedin', Icon: LinkedInIcon },
  { key: 'huggingface', Icon: HuggingFaceIcon },
  { key: 'kaggle', Icon: KaggleIcon },
]

export default function Contact() {
  const magnet = useMagneticButton(0.4)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    const subject = encodeURIComponent(`[CyberFolio] Contact from ${form.name || 'visitor'}`)
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
    // open the user's mail client prefilled (no backend needed)
    window.location.href = `mailto:${CONFIG.links.email}?subject=${subject}&body=${body}`
    setTimeout(() => setSent(false), 4000)
  }

  const field =
    'w-full border border-cyan/25 bg-[#06101a] px-3 py-2 font-mono text-sm text-[#cfe9ee] outline-none transition-colors placeholder:text-haze/50 focus:border-cyan focus:shadow-cyan'

  return (
    <Section id="contact" code="09" title="CONTACT" subtitle="// open a secure channel">
      <div className="grid gap-8 lg:grid-cols-2">
        <form onSubmit={onSubmit} className="hud-panel hud-corners space-y-4 p-6">
          <div>
            <label className="mb-1 block font-mono text-[11px] text-haze">// your_name</label>
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              required
              placeholder="Ada Lovelace"
              className={field}
            />
          </div>
          <div>
            <label className="mb-1 block font-mono text-[11px] text-haze">// reply_to</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              required
              placeholder="you@domain.com"
              className={field}
            />
          </div>
          <div>
            <label className="mb-1 block font-mono text-[11px] text-haze">// message[]</label>
            <textarea
              name="message"
              value={form.message}
              onChange={onChange}
              required
              rows={5}
              placeholder="Transmit your message..."
              className={`${field} resize-none`}
            />
          </div>

          <motion.button
            type="submit"
            ref={magnet.ref}
            style={{ x: magnet.x, y: magnet.y }}
            onMouseMove={magnet.onMouseMove}
            onMouseLeave={magnet.onMouseLeave}
            className={`magnetic w-full border px-6 py-3 font-display text-sm tracking-[0.25em] transition-colors ${
              sent
                ? 'border-neon text-neon glitch'
                : 'border-cyan/60 text-cyan hover:bg-cyan/10'
            }`}
            data-text={sent ? '▸ TRANSMITTING...' : '▸ SEND TRANSMISSION'}
          >
            {sent ? '▸ TRANSMITTING...' : '▸ SEND TRANSMISSION'}
          </motion.button>
        </form>

        {/* direct channels */}
        <div className="space-y-4">
          <a
            href={`mailto:${CONFIG.links.email}`}
            className="hud-panel flex items-center gap-4 p-5 transition-shadow hover:shadow-cyan"
          >
            <MailIcon width={22} height={22} />
            <div>
              <div className="font-display text-xs tracking-widest text-cyan">DIRECT MAIL</div>
              <div className="text-sm text-[#bcd6dc]">{CONFIG.links.email}</div>
            </div>
          </a>

          <div className="hud-panel p-5">
            <div className="mb-3 font-display text-xs tracking-widest text-magenta">▸ NETWORKS</div>
            <div className="flex gap-4">
              {socials.map(({ key, Icon }) => (
                <a
                  key={key}
                  href={CONFIG.links[key]}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={key}
                  className="text-haze transition-colors hover:text-cyan hover:text-glow-cyan"
                >
                  <Icon width={22} height={22} />
                </a>
              ))}
            </div>
          </div>

          <div className="hud-panel p-5">
            <div className="mb-2 font-display text-xs tracking-widest text-neon">
              ▸ AVAILABILITY
            </div>
            <p className="text-sm leading-relaxed text-[#bcd6dc]">
              {CONFIG.status} — internship from summer 2026. Based in Meknès, Morocco. Remote /
              hybrid / on-site.
            </p>
          </div>
        </div>
      </div>

      <footer className="mt-16 text-center font-mono text-[11px] text-haze">
        <div className="neon-divider mb-4" />
        © {new Date().getFullYear()} {CONFIG.name} // CyberFolio — built with React, Three.js & GSAP
      </footer>
    </Section>
  )
}
