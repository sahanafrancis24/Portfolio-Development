import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Scene3D } from './components/Scene3D'
import { Navbar } from './components/Navbar'
import { CustomCursor } from './components/CustomCursor'
import { ScrollProgress } from './components/ScrollProgress'
import { Hero } from './components/Hero'
import { AboutExperience } from './components/AboutExperience'
import { ProjectMarquee } from './components/ProjectMarquee'
import { SkillNetwork } from './components/SkillNetwork'
import { GithubLiveFeed } from './components/GithubLiveFeed'
import { ContactSection } from './components/ContactSection'
import { initialProjects } from './data/projects'
import { getPortfolioProjects } from './services/githubProjects'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import './App.css'

const navItems = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Projects', id: 'projects' },
  { label: 'Skills', id: 'skills' },
  { label: 'GitHub', id: 'github' },
  { label: 'Contact', id: 'contact' },
]

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [projects, setProjects] = useState(initialProjects)
  const [showLoader, setShowLoader] = useState(true)

  // 1. Initial Page Entrance Loader
  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 900)
    return () => clearTimeout(timer)
  }, [])

  // 2. Discover GitHub Projects dynamically
  useEffect(() => {
    getPortfolioProjects().then((discovered) => {
      if (Array.isArray(discovered) && discovered.length > 0) {
        setProjects(discovered)
      }
    })
  }, [])

  // 3. Active Section Scroll Spy
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
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="app-shell">
      {/* Cinematic Initial Entrance Screen */}
      <AnimatePresence>
        {showLoader && (
          <motion.div
            className="page-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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

      {/* Fixed Futuristic Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="background-video"
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>

      {/* Persistent 3D Multiverse Dragon Scene */}
      <div className="canvas-container">
        <Canvas eventSource={document.body}>
          <Scene3D />
        </Canvas>
      </div>

      {/* Floating Glass Navigation */}
      <Navbar
        navItems={navItems}
        activeSection={activeSection}
        onNavClick={handleNavClick}
        onBrandClick={() => handleNavClick('home')}
      />

      {/* Main Experience Stream */}
      <main>
        <Hero onNavClick={handleNavClick} />
        <AboutExperience />
        <ProjectMarquee projects={projects} />
        <SkillNetwork />
        <GithubLiveFeed />
        <ContactSection />
      </main>

      {/* Minimal Cinematic Footer */}
      <footer className="site-footer">
        <div className="footer-content-wrap">
          <p className="footer-copy">
            SAHANA F <span className="footer-sep">•</span> 2026 CREATIVE PORTFOLIO
          </p>
          <div className="footer-social-links">
            <a
              href="https://github.com/sahanafrancis24"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Profile"
              data-cursor="source"
            >
              <FiGithub size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/sahana-f-0427492a9"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Profile"
            >
              <FiLinkedin size={16} />
            </a>
            <a
              href="mailto:sahanafeminambbs@gmail.com"
              aria-label="Send direct email"
            >
              <FiMail size={16} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
