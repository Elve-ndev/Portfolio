import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GitHubIcon } from '../icons.jsx'

// Turn a youtube watch/short URL into an embeddable one.
function ytEmbed(url = '') {
  const m = url.match(/(?:youtu\.be\/|v=)([\w-]{6,})/)
  return m ? `https://www.youtube.com/embed/${m[1]}` : null
}

export default function ProjectModal({ project, onClose }) {
  const [idx, setIdx] = useState(0)
  const media = project?.media || []
  const has = media.length > 0
  const embed = project ? ytEmbed(project.demo) : null

  useEffect(() => setIdx(0), [project])
  useEffect(() => {
    if (!project) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') setIdx((i) => Math.min(media.length - 1, i + 1))
      if (e.key === 'ArrowLeft') setIdx((i) => Math.max(0, i - 1))
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [project, media.length, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/85 p-4 backdrop-blur"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="hud-panel hud-corners flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden"
            initial={{ scale: 0.96, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* header */}
            <div className="flex items-center gap-3 border-b border-cyan/20 bg-[#06101a] px-5 py-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-[10px] tracking-[0.25em] text-magenta">
                  {project.type?.toUpperCase()} · {project.year}
                </div>
                <h3 className="truncate font-display text-lg font-bold text-white">
                  {project.title}
                </h3>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="ml-auto border border-cyan/40 px-3 py-1 text-xs tracking-widest text-cyan transition-colors hover:bg-cyan/10"
              >
                ✕ ESC
              </button>
            </div>

            {/* scroll body */}
            <div className="flex-1 overflow-y-auto p-5">
              {/* demo video */}
              {embed && (
                <div className="mb-5 aspect-video w-full overflow-hidden border border-cyan/20">
                  <iframe
                    src={embed}
                    title={`${project.title} demo`}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}

              {/* media gallery */}
              {has && (
                <div className="mb-5">
                  <div className="relative flex items-center justify-center border border-cyan/20 bg-[#06101a] p-3">
                    {/* white "slide" backing so diagrams + screenshots are always clearly visible */}
                    <div className="flex max-h-[55vh] w-full items-center justify-center rounded bg-[#f6f8fb] p-2">
                      <img
                        src={media[idx]}
                        alt={`${project.title} — media ${idx + 1}`}
                        className="max-h-[50vh] w-auto object-contain"
                      />
                    </div>
                    {media.length > 1 && (
                      <>
                        <button
                          onClick={() => setIdx((i) => Math.max(0, i - 1))}
                          disabled={idx === 0}
                          aria-label="Previous"
                          className="absolute left-2 border border-cyan/40 bg-ink/80 px-3 py-2 text-cyan disabled:opacity-30"
                        >
                          ‹
                        </button>
                        <button
                          onClick={() => setIdx((i) => Math.min(media.length - 1, i + 1))}
                          disabled={idx === media.length - 1}
                          aria-label="Next"
                          className="absolute right-2 border border-cyan/40 bg-ink/80 px-3 py-2 text-cyan disabled:opacity-30"
                        >
                          ›
                        </button>
                        <span className="absolute bottom-2 right-3 bg-ink/80 px-2 py-0.5 font-mono text-[10px] text-cyan">
                          {idx + 1} / {media.length}
                        </span>
                      </>
                    )}
                  </div>

                  {/* thumbnails */}
                  {media.length > 1 && (
                    <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
                      {media.map((m, i) => (
                        <button
                          key={m}
                          onClick={() => setIdx(i)}
                          className={`h-12 w-16 flex-shrink-0 overflow-hidden border bg-[#f6f8fb] ${
                            i === idx ? 'border-cyan shadow-cyan' : 'border-cyan/20 opacity-60'
                          }`}
                        >
                          <img src={m} alt="" className="h-full w-full object-contain" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* description */}
              <p className="text-sm leading-relaxed text-[#bcd6dc]">{project.description}</p>

              {/* stack */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.stack?.map((s) => (
                  <span
                    key={s}
                    className="border border-cyan/25 bg-cyan/5 px-2 py-0.5 text-[10px] text-cyan/90"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {project.collaborative && (
                <p className="mt-3 text-xs text-magenta">
                  ▸ Co-built with {project.collaborators?.join(' & ')}
                </p>
              )}
            </div>

            {/* footer links */}
            <div className="flex flex-wrap items-center gap-4 border-t border-cyan/20 bg-[#06101a] px-5 py-3 text-xs">
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noreferrer" className="text-neon hover:text-glow-neon">
                  ▶ WATCH DEMO
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-haze hover:text-cyan"
                >
                  <GitHubIcon width={14} height={14} /> CODE
                </a>
              )}
              {project.documentation && (
                <a href={project.documentation} target="_blank" rel="noreferrer" className="text-haze hover:text-cyan">
                  ◈ DOCS
                </a>
              )}
              {project.report && (
                <a href={project.report} target="_blank" rel="noreferrer" className="text-haze hover:text-cyan">
                  ▤ REPORT
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
