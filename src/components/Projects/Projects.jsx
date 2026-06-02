import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CONFIG from '../../config.js'
import Section from '../ui/Section.jsx'
import TiltCard from '../ui/TiltCard.jsx'
import useScrollReveal from '../../hooks/useScrollReveal.js'
import { GitHubIcon, CrownIcon } from '../icons.jsx'
import ProjectModal from './ProjectModal.jsx'

const typeColor = (type = '') => {
  const t = type.toLowerCase()
  if (t.includes('vision')) return 'neon'
  if (t.includes('rag') || t.includes('ml')) return 'magenta'
  return 'cyan'
}

const colorMap = {
  cyan: 'border-cyan/50 text-cyan',
  magenta: 'border-magenta/50 text-magenta',
  neon: 'border-neon/50 text-neon',
}

function ProjectCard({ project, onOpen }) {
  const [hover, setHover] = useState(false)
  const c = typeColor(project.type)
  const cover = project.media?.[0]
  const stop = (e) => e.stopPropagation()

  return (
    <TiltCard className="project-card">
      <div
        onClick={() => onOpen(project)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="hud-panel hud-corners group relative flex h-full min-h-[260px] cursor-pointer flex-col overflow-hidden"
      >
        {/* cover / banner */}
        <div className="relative h-40 w-full overflow-hidden border-b border-cyan/15 bg-[#06101a]">
          {cover ? (
            <img
              src={cover}
              alt={project.title}
              className="h-full w-full object-cover opacity-70 transition-all duration-500 group-hover:scale-105 group-hover:opacity-90"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="font-display text-4xl tracking-widest text-cyan/20">
                {project.title.split(' ').map((w) => w[0]).join('').slice(0, 3)}
              </span>
            </div>
          )}
          <span className="absolute right-2 top-2 text-[10px] tracking-widest text-haze">
            {project.year}
          </span>

          {/* flagship crown */}
          {project.featured && (
            <span
              className="absolute left-2 top-2 flex items-center gap-1 border border-amber-300/60 bg-ink/80 px-2 py-0.5 text-[9px] tracking-widest text-amber-300"
              style={{ filter: 'drop-shadow(0 0 6px rgba(252,211,77,0.55))' }}
            >
              <CrownIcon width={12} height={12} /> FLAGSHIP
            </span>
          )}
          {project.collaborative && (
            <span className="absolute bottom-2 left-2 border border-magenta/50 bg-ink/70 px-2 py-0.5 text-[9px] tracking-widest text-magenta">
              CO-BUILT
            </span>
          )}

          {/* expand hint */}
          <span className="absolute bottom-2 right-2 border border-cyan/40 bg-ink/70 px-2 py-0.5 text-[9px] tracking-widest text-cyan opacity-0 transition-opacity group-hover:opacity-100">
            ⤢ EXPAND
          </span>
        </div>

        {/* body */}
        <div className="flex flex-1 flex-col p-5">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className={`border px-2 py-0.5 text-[9px] tracking-widest ${colorMap[c]}`}>
              {project.type?.toUpperCase()}
            </span>
            {project.demo && (
              <span className="border border-neon/50 px-2 py-0.5 text-[9px] tracking-widest text-neon">
                ▶ DEMO VIDEO
              </span>
            )}
            {project.media?.length > 0 && (
              <span className="border border-cyan/30 px-2 py-0.5 text-[9px] tracking-widest text-cyan/80">
                ◳ {project.media.length} MEDIA
              </span>
            )}
          </div>

          <h3 className="font-display text-lg font-bold tracking-wide text-white">
            {project.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[#9fb8c0]">{project.description}</p>

          {/* links (don't trigger the modal) */}
          <div className="mt-auto flex flex-wrap items-center gap-3 pt-4 text-xs">
            <span className="text-cyan/90 group-hover:text-glow-cyan">▸ VIEW PROJECT</span>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                onClick={stop}
                aria-label="GitHub repository"
                className="ml-auto flex items-center gap-1 text-haze transition-colors hover:text-cyan"
              >
                <GitHubIcon width={14} height={14} /> CODE
              </a>
            )}
          </div>
        </div>

        {/* hover overlay: stack */}
        <AnimatePresence>
          {hover && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pointer-events-none absolute inset-x-0 bottom-0 border-t border-cyan/30 bg-ink/92 p-4"
            >
              <div className="mb-2 text-[9px] tracking-[0.3em] text-cyan/70">▸ STACK</div>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="border border-cyan/25 bg-cyan/5 px-2 py-0.5 text-[10px] text-cyan/90"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </TiltCard>
  )
}

export default function Projects() {
  const [selected, setSelected] = useState(null)
  const ref = useScrollReveal({
    selector: '.project-card',
    y: 50,
    x: -40,
    rotateY: 14,
    stagger: 0.12,
    duration: 0.85,
  })

  return (
    <Section
      id="projects"
      code="02"
      title="PROJECTS"
      subtitle="// click any card to browse its media, demo & report"
    >
      <div
        ref={ref}
        className="grid auto-rows-fr grid-cols-1 gap-5 [perspective:1200px] md:grid-cols-2 lg:grid-cols-3"
      >
        {CONFIG.projects.map((p) => (
          <ProjectCard key={p.title} project={p} onOpen={setSelected} />
        ))}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </Section>
  )
}
