import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CONFIG from '../../config.js'
import { localAnswer } from '../../lib/rag.js'
import useActiveSection from '../../hooks/useActiveSection.js'
import Sentinel from './Sentinel.jsx'

// Types a single string out once, letter by letter (respects reduced motion).
function TypeOut({ text, onTick, onDone }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN(text.length)
      onDone?.()
      return
    }
    setN(0)
    let i = 0
    const id = setInterval(() => {
      i += 1
      setN(i)
      onTick?.()
      if (i >= text.length) {
        clearInterval(id)
        onDone?.()
      }
    }, 14)
    return () => clearInterval(id)
  }, [text])
  return <>{text.slice(0, n)}</>
}

async function askServer(message) {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    })
    const data = await res.json() // throws in dev (HTML) → caught below
    return data?.reply || null
  } catch {
    return null
  }
}

export default function Chatbot() {
  const active = useActiveSection()
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [typing, setTyping] = useState(false)
  const [msgs, setMsgs] = useState([
    {
      role: 'bot',
      text: `Neural link established. I'm Hiba's assistant — ask me anything, or tap a suggestion.`,
    },
  ])
  const scrollRef = useRef(null)

  const prompts =
    CONFIG.sectionPrompts?.[active]?.length
      ? CONFIG.sectionPrompts[active]
      : (CONFIG.suggestedQuestions || []).slice(0, 2)

  const scrollDown = () => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }
  useEffect(scrollDown, [msgs, open])

  const send = async (text) => {
    const q = (text ?? input).trim()
    if (!q || busy) return
    setInput('')
    setMsgs((m) => [...m, { role: 'user', text: q }])
    setBusy(true)
    const serverReply = await askServer(q)
    const reply = serverReply ?? localAnswer(CONFIG, q)
    setBusy(false)
    setTyping(true)
    setMsgs((m) => [...m, { role: 'bot', text: reply }])
  }

  const openAndSend = (q) => {
    setOpen(true)
    send(q)
  }

  const speaking = busy || typing

  return (
    <div className="fixed bottom-5 right-4 z-[60] flex flex-col items-end gap-3 lg:bottom-6 lg:right-6">
      {/* Proactive section prompts (shown when chat is closed) */}
      <AnimatePresence mode="popLayout">
        {!open &&
          prompts.slice(0, 2).map((q, i) => (
            <motion.button
              key={`${active}-${q}`}
              initial={{ opacity: 0, x: 30, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 30, scale: 0.9 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => openAndSend(q)}
              className="max-w-[240px] border border-cyan/30 bg-ink/90 px-3 py-2 text-right text-xs text-cyan/90 shadow-cyan backdrop-blur transition-colors hover:bg-cyan/10"
            >
              <span className="text-magenta">▸ </span>
              {q}
            </motion.button>
          ))}
      </AnimatePresence>

      {/* Slide-up terminal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            className="hud-panel hud-corners flex h-[70vh] max-h-[560px] w-[min(380px,92vw)] flex-col overflow-hidden"
          >
            {/* header */}
            <div className="flex items-center gap-2 border-b border-cyan/20 bg-[#06101a] px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-neon animate-pulseDot" />
              <span className="font-display text-xs tracking-[0.25em] text-cyan">AI ASSISTANT</span>
              <span className="ml-auto font-mono text-[10px] text-haze">{CONFIG.chatbot?.model}</span>
            </div>

            {/* messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4 text-sm">
              {msgs.map((m, i) => (
                <div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
                  <span
                    className={`inline-block max-w-[85%] border px-3 py-2 text-left leading-relaxed ${
                      m.role === 'user'
                        ? 'border-magenta/40 bg-magenta/10 text-[#f3d6e4]'
                        : 'border-cyan/30 bg-cyan/5 text-[#cfe9ee]'
                    }`}
                  >
                    {m.role === 'bot' && i === msgs.length - 1 ? (
                      <TypeOut text={m.text} onTick={scrollDown} onDone={() => setTyping(false)} />
                    ) : (
                      m.text
                    )}
                  </span>
                </div>
              ))}
              {busy && <div className="text-left text-xs text-haze caret">analyzing query</div>}
            </div>

            {/* suggested chips (section-aware) */}
            {msgs.length <= 1 && (
              <div className="flex flex-wrap gap-1.5 px-3 pb-2">
                {prompts.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="border border-cyan/25 px-2 py-1 text-[10px] text-cyan/80 transition-colors hover:bg-cyan/10"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* input */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                send()
              }}
              className="flex items-center gap-2 border-t border-cyan/20 bg-[#06101a] p-2"
            >
              <span className="pl-1 font-mono text-cyan">{'>'}</span>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="query the system..."
                className="flex-1 bg-transparent font-mono text-sm text-[#cfe9ee] outline-none placeholder:text-haze/50"
              />
              <button
                type="submit"
                disabled={busy}
                className="border border-cyan/50 px-3 py-1 text-xs tracking-widest text-cyan transition-colors hover:bg-cyan/10 disabled:opacity-40"
              >
                SEND
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sentinel launcher */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={open ? 'Close assistant' : 'Open assistant'}
        className="magnetic flex items-center gap-2 border border-cyan/50 bg-ink/90 py-1.5 pl-1.5 pr-3 font-display text-xs tracking-[0.25em] text-cyan shadow-cyan backdrop-blur"
      >
        <Sentinel talking={speaking} size={42} />
        {open ? 'CLOSE' : 'ASK ME'}
      </motion.button>
    </div>
  )
}
