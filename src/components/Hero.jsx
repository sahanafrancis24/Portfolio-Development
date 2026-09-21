import { motion } from 'framer-motion'
import { SectionHeaderMeta } from './SectionHeaderMeta'
import { FiArrowDown } from 'react-icons/fi'

export function Hero({ onNavClick }) {
  return (
    <section id="home" className="ref-hero-stage">
      {/* Top Editorial Metadata */}
      <SectionHeaderMeta
        number="01"
        title="HOME"
        subline={<>CINEMATIC ENTRANCE<br />DRAGON REVEAL</>}
        rightMeta={[
          'IDEAS',
          'CODE',
          'SCIENCE',
          'WORLDS',
          '/',
          'BUILDING A MORE INTERACTIVE TOMORROW',
        ]}
      />

      {/* Main Asymmetric Composition */}
      <div className="hero-asymmetric-content">
        {/* Glowing Editorial Headline */}
        <motion.h1
          className="hero-main-title"
          initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="name-cyan">Sahana</span> <span className="name-magenta">F</span>
        </motion.h1>

        {/* Subtitle Role */}
        <motion.h2
          className="hero-role-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          CREATIVE TECHNOLOGIST
        </motion.h2>

        {/* Triple Domain Kicker */}
        <motion.p
          className="hero-domain-strip"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.8 }}
        >
          BIOINFORMATICS <span className="dim-cross">×</span> DEVELOPMENT <span className="dim-cross">×</span> DIGITAL EXPERIENCES
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          className="hero-btn-row"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <button
            className="hero-primary-pill"
            onClick={() => onNavClick('projects')}
          >
            View Projects
          </button>
          <button
            className="hero-secondary-pill"
            onClick={() => onNavClick('contact')}
          >
            Contact Me
          </button>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div
        className="hero-bottom-scroll"
        onClick={() => onNavClick('about')}
        role="button"
        tabIndex={0}
      >
        <span className="scroll-arrow-line">↓</span>
        <span className="scroll-caption">SCROLL TO ENTER</span>
      </div>
    </section>
  )
}
