import { useState } from 'react'
import CursorCrosshair from './components/CursorCrosshair.jsx'
import FXOverlay from './components/FXOverlay.jsx'
import Splash from './components/Splash.jsx'
import ThemeToggle from './components/ThemeToggle.jsx'
import Sidebar from './components/Sidebar/Sidebar.jsx'
import Hero from './components/Hero/Hero.jsx'
import About from './components/About/About.jsx'
import Projects from './components/Projects/Projects.jsx'
import Skills from './components/Skills/Skills.jsx'
import Algorithms from './components/Algorithms/Algorithms.jsx'
import KnowledgeBase from './components/KnowledgeBase/KnowledgeBase.jsx'
import Hackathons from './components/Hackathons/Hackathons.jsx'
import AIEcosystem from './components/AIEcosystem/AIEcosystem.jsx'
import GithubActivity from './components/GithubActivity/GithubActivity.jsx'
import Contact from './components/Contact/Contact.jsx'
import Chatbot from './components/Chatbot/Chatbot.jsx'

export default function App() {
  const [booted, setBooted] = useState(false)

  return (
    <>
      <CursorCrosshair />
      <FXOverlay />
      <ThemeToggle />
      {!booted && <Splash onDone={() => setBooted(true)} />}

      <Sidebar />

      <main className="min-h-screen bg-ink text-[#cfe9ee] lg:ml-[280px]">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Algorithms />
        <KnowledgeBase />
        <Hackathons />
        <AIEcosystem />
        <GithubActivity />
        <Contact />
      </main>

      <Chatbot />
    </>
  )
}
