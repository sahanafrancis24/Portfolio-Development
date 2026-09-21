import { motion } from 'framer-motion'
import { SectionHeaderMeta } from './SectionHeaderMeta'
import { FiArrowRight } from 'react-icons/fi'

export function Hero({ onNavClick }) {
  return (
    <section id="home" className="ref-hero-stage">
      {/* Background Media: home.mp4 */}
      <div className="section-media-bg">
        <video autoPlay loop muted playsInline className="section-bg-video">
          <source src="/home.mp4" type="video/mp4" />
        </video>
        <div className="hero-vignette-overlay" />
      </div>

      {/* Top Editorial Metadata */}
      <SectionHeaderMeta
        number="01"
        title="HOME"
        subline={<>IDEAS / CODE<br />SCIENCE / WORLDS</>}
        rightMeta={[
          'IDEAS',
          'CODE',
          'SCIENCE',
          'WORLDS',
          '/',
          'SAHANA F',
        ]}
      />

      <div className="hero-artdirected-layout">
        {/* Left Area: Typography strictly in the dark space */}
        <div className="hero-left-col">
          <motion.div
            className="hero-telemetry-tag"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span>IDEAS / CODE / SCIENCE / WORLDS</span>
          </motion.div>

          <motion.h1
            className="hero-bold-display"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            TURN IDEAS <br />
            <span className="text-magenta">INTO REAL WORLDS</span>
          </motion.h1>

          <motion.div
            className="hero-kicker-pill"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            <span className="pill-dash">—</span>
            <span>Bioinformatics × Development × Digital Experiences</span>
          </motion.div>

          <motion.p
            className="hero-narrative-lead"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            Exploring the intersection of biology, technology, and immersive digital worlds.
          </motion.p>

          <motion.div
            className="hero-cta-group"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
          >
            <a
              href="https://github.com/sahanafrancis24"
              target="_blank"
              rel="noreferrer"
              className="hero-primary-pill"
            >
              <span>View GitHub</span>
              <FiArrowRight size={14} />
            </a>

            <button
              className="hero-secondary-pill"
              onClick={() => onNavClick('projects')}
            >
              <span>Explore Projects</span>
            </button>
          </motion.div>
        </div>

        {/* Right Area: Neon Script "Different Worlds / Same Mind" */}
        <div className="hero-right-col">
          <motion.div
            className="hero-neon-script-box"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <span className="neon-script-main">Different Worlds</span>
            <span className="neon-script-sub">Same Mind</span>
          </motion.div>
        </div>
      </div>

      {/* Bottom Scroll Indicator on Right */}
      <div
        className="hero-bottom-scroll-cue"
        onClick={() => onNavClick('about')}
        role="button"
        tabIndex={0}
      >
        <div className="scroll-pulse-line" />
        <span className="scroll-cue-caption">SCROLL TO EXPLORE</span>
      </div>
    </section>
  )
}

