import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Navbar } from './components/Navbar'
import { CustomCursor } from './components/CustomCursor'
import { ScrollProgress } from './components/ScrollProgress'
import { Hero } from './components/Hero'
import { AboutExperience } from './components/AboutExperience'
import { ProjectMarquee } from './components/ProjectMarquee'
import { SkillNetwork } from './components/SkillNetwork'
import { GithubLiveFeed } from './components/GithubLiveFeed'
import { ContactSection } from './components/ContactSection'
import { CinematicMasterVideo } from './components/CinematicMasterVideo'
import { useCinematicTimeline } from './hooks/useCinematicTimeline'
import { initialProjects } from './data/projects'
import { getPortfolioProjects } from './services/githubProjects'
import { CHAPTER_TARGET_TIMES, TOTAL_DURATION } from './utils/cinematicTimeline'
import './App.css'

const navItems = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'GitHub', id: 'github' },
  { label: 'Contact', id: 'contact' },
]

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [projects, setProjects] = useState(initialProjects)
  const [showLoader, setShowLoader] = useState(true)

  // 1. Initialize GSAP Chapter-Level Cinematic Timeline
  useCinematicTimeline()

  // 2. Initial Entrance Fade
  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 800)
    return () => clearTimeout(timer)
  }, [])

  // 3. Discover GitHub Projects dynamically
  useEffect(() => {
    getPortfolioProjects().then((discovered) => {
      if (Array.isArray(discovered) && discovered.length > 0) {
        setProjects(discovered)
      }
    })
  }, [])

  // 4. Active Section Scroll Spy fallback
  useEffect(() => {
    const onScroll = () => {
      const scrollTarget = window.scrollY + window.innerHeight * 0.35
      const sections = navItems.map((item) => document.getElementById(item.id)).filter(Boolean)

      let current = 'home'
      for (const section of sections) {
        if (section.offsetTop <= scrollTarget) {
          current = section.id
        }
      }
      setActiveSection(current)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (id) => {
    const targetTime = CHAPTER_TARGET_TIMES[id]
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    if (typeof targetTime === 'number' && maxScroll > 0) {
      const targetProgress = Math.max(0, Math.min(1, targetTime / TOTAL_DURATION))
      const targetY = targetProgress * maxScroll
      window.scrollTo({ top: targetY, behavior: 'smooth' })
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="app-shell">
      {/* Exactly ONE persistent master cinematic video layer (vid.mp4) */}
      <CinematicMasterVideo onActiveChapterChange={setActiveSection} />

      {/* Cinematic Initial Entrance Screen */}
      <AnimatePresence>
        {showLoader && (
          <motion.div
            className="page-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="loader-core-content">
              <span className="loader-name">SAHANA F</span>
              <span className="loader-line" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Context-Aware Dynamic Cursor */}
      <CustomCursor />

      {/* Ultra-Thin Top Scroll Progress Line */}
      <ScrollProgress />

      {/* Reference Floating Navbar */}
      <Navbar
        navItems={navItems}
        activeSection={activeSection}
        onNavClick={handleNavClick}
        onBrandClick={() => handleNavClick('home')}
      />

      {/* Main Continuous Cinematic Stream */}
      <main className="ref-main-stream">
        <Hero onNavClick={handleNavClick} />
        <AboutExperience />
        <SkillNetwork />
        <ProjectMarquee projects={projects} />
        <GithubLiveFeed />
        <ContactSection />
      </main>

      {/* Bottom Footer matching Reference */}
      <footer className="ref-footer-strip">
        <span className="footer-brand-year">Sahana F — 2026</span>
        <span className="footer-tagline">SCIENCE MEETS CREATIVITY</span>
      </footer>
    </div>
  )
}

export default App
