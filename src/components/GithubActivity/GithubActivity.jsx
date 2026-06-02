import { GitHubCalendar } from 'react-github-calendar'
import CONFIG from '../../config.js'
import Section from '../ui/Section.jsx'
import useScrollReveal from '../../hooks/useScrollReveal.js'
import { GitHubIcon } from '../icons.jsx'

// neon-green contribution levels (empty → brightest)
const calTheme = { dark: ['#0e1a20', '#0a4a26', '#0e8a3c', '#19d152', '#00ff41'] }

// Curated repo showcase built from config.projects — reliable (no external
// image service) and focuses on the work, not raw metrics.
const clean = (u) => (u || '').replace(/\/+$/, '')
const repos = CONFIG.projects
  .filter((p) => p.github)
  .map((p) => {
    const parts = clean(p.github).split('/')
    return {
      name: parts.pop(),
      owner: parts.pop(),
      title: p.title,
      type: p.type,
      lang: p.stack?.[0],
      url: p.github,
      collab: p.collaborative,
    }
  })

export default function GithubActivity() {
  const ref = useScrollReveal({ selector: '.repo-row', y: 26, stagger: 0.08 })
  const username = clean(CONFIG.links.github).split('/').pop()

  return (
    <Section id="github" code="08" title="GIT ACTIVITY" subtitle="// contributions & repositories">
      {/* contribution calendar */}
      <div className="hud-panel hud-corners mb-5 overflow-x-auto p-5">
        <div className="mb-4 font-mono text-xs text-haze">
          ~/git $ gh contributions --user {username}
        </div>
        <GitHubCalendar
          username={username}
          colorScheme="dark"
          theme={calTheme}
          blockSize={11}
          blockMargin={3}
          fontSize={12}
          style={{ color: '#9fb8c0' }}
          errorMessage="Contribution graph unavailable right now."
        />
      </div>

      {/* repositories */}
      <div className="hud-panel hud-corners overflow-hidden">
        {/* terminal title bar */}
        <div className="flex items-center gap-2 border-b border-cyan/15 bg-[#06101a] px-4 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-magenta/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-neon/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-cyan/70" />
          <span className="ml-3 font-mono text-xs text-haze">
            ~/git $ gh repo list --user {username}
          </span>
        </div>

        {/* repo rows */}
        <div ref={ref} className="divide-y divide-cyan/10">
          {repos.map((r) => (
            <a
              key={r.url}
              href={r.url}
              target="_blank"
              rel="noreferrer"
              className="repo-row group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-cyan/5"
            >
              <GitHubIcon width={18} height={18} className="shrink-0 text-haze transition-colors group-hover:text-cyan" />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-sm text-cyan group-hover:text-glow-cyan">
                    {r.owner}/{r.name}
                  </span>
                  {r.collab && (
                    <span className="border border-magenta/40 px-1.5 py-0.5 text-[8px] tracking-widest text-magenta">
                      COLLAB
                    </span>
                  )}
                </div>
                <div className="truncate text-xs text-haze">
                  {r.title} — {r.type}
                </div>
              </div>
              {r.lang && (
                <span className="hidden border border-cyan/25 px-2 py-0.5 text-[10px] text-cyan/80 sm:inline">
                  {r.lang}
                </span>
              )}
              <span className="shrink-0 text-haze transition-colors group-hover:text-cyan">→</span>
            </a>
          ))}
        </div>

        {/* footer: full profile */}
        <a
          href={CONFIG.links.github}
          target="_blank"
          rel="noreferrer"
          className="block border-t border-cyan/15 px-4 py-2 font-mono text-[11px] text-neon/80 transition-colors hover:text-neon"
        >
          ▸ view full profile on github →
        </a>
      </div>
    </Section>
  )
}
