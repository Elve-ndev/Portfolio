import useScrollReveal from '../../hooks/useScrollReveal.js'

// Consistent section shell: HUD header with code + title, then children.
export default function Section({ id, code, title, subtitle, children, className = '' }) {
  const ref = useScrollReveal({ y: 50, duration: 0.8 })
  return (
    <section
      id={id}
      className={`relative scroll-mt-4 border-t border-cyan/10 px-6 py-20 sm:px-10 ${className}`}
    >
      <div ref={ref} className="mb-10">
        <div className="flex items-center gap-3 text-xs tracking-[0.3em] text-magenta">
          <span className="text-glow-magenta">{code}</span>
          <span className="h-px w-10 bg-magenta/50" />
          <span className="text-haze">SECTION</span>
        </div>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-widest text-white sm:text-4xl">
          {title}
        </h2>
        {subtitle && <p className="mt-2 max-w-2xl text-sm text-haze">{subtitle}</p>}
      </div>
      {children}
    </section>
  )
}
