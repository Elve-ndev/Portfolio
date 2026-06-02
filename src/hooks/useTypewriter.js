import { useEffect, useState } from 'react'

// Typewriter that cycles through an array of strings (type → hold → delete → next).
// Used by the sidebar title and the bottom terminal loop.
//
//   const text = useTypewriter(['> scanning...', '> 4 projects loaded', '> AI active'])
export default function useTypewriter(
  words,
  { typeSpeed = 55, deleteSpeed = 28, hold = 1400, loop = true } = {},
) {
  const [text, setText] = useState('')
  const [i, setI] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const list = Array.isArray(words) ? words : [String(words)]
    const current = list[i % list.length] ?? ''

    // reduced motion: just show the full first string, no animation
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setText(current)
      return
    }

    let delay = deleting ? deleteSpeed : typeSpeed

    if (!deleting && text === current) {
      if (!loop && i === list.length - 1) return
      delay = hold
      const t = setTimeout(() => setDeleting(true), delay)
      return () => clearTimeout(t)
    }

    if (deleting && text === '') {
      setDeleting(false)
      setI((p) => p + 1)
      return
    }

    const t = setTimeout(() => {
      setText((prev) =>
        deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1),
      )
    }, delay)
    return () => clearTimeout(t)
  }, [text, deleting, i, words, typeSpeed, deleteSpeed, hold, loop])

  return text
}
