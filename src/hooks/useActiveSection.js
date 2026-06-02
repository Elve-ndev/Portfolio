import { useEffect, useState } from 'react'
import { SECTIONS } from '../nav.js'

// Tracks which section is currently centered in the viewport (scrollspy).
// Shared by the Sidebar nav and the Sentinel guide.
export default function useActiveSection() {
  const [active, setActive] = useState('home')
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])
  return active
}
