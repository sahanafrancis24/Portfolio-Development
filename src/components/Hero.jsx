import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiArrowDown } from 'react-icons/fi'
import { MagneticButton } from './MagneticButton'

export function Hero({ onNavClick }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.25,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <section id="home" className="hero-section">
      <motion.div
        className="hero-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Micro Category Badge */}
        <motion.div variants={itemVariants} className="hero-badge">
          <span className="badge-dot" />
          <span>PORTFOLIO // 2026</span>
        </motion.div>

        {/* Main Cinematic Title */}
        <motion.h1 variants={itemVariants} className="hero-title">
          <span className="title-letter-block">SAHANA F</span>
        </motion.h1>

        {/* Dynamic Subheading */}
        <motion.div variants={itemVariants} className="hero-role-wrap">
          <h2 className="hero-role">CREATIVE TECHNOLOGIST</h2>
        </motion.div>

        {/* Domain Line */}
        <motion.p variants={itemVariants} className="hero-tagline">
          BIOINFORMATICS <span className="hero-cross">×</span> DEVELOPMENT <span className="hero-cross">×</span> DIGITAL EXPERIENCES
        </motion.p>

        {/* Refined Description */}
        <motion.p variants={itemVariants} className="hero-subtext">
          Crafting responsive, high-performance web applications and immersive digital interfaces where computational intelligence meets spatial design.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="hero-cta-group">
          <MagneticButton
            className="primary-btn"
            onClick={() => onNavClick('projects')}
          >
            VIEW PROJECTS
          </MagneticButton>
          <MagneticButton
            className="secondary-btn"
            onClick={() => onNavClick('contact')}
          >
            CONTACT ME
          </MagneticButton>
        </motion.div>

        {/* Social Links */}
        <motion.div variants={itemVariants} className="hero-social-row">
          <a
            href="https://github.com/sahanafrancis24"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Profile"
            className="hero-social-icon"
            data-cursor="source"
          >
            <FiGithub size={19} />
          </a>
          <a
            href="https://www.linkedin.com/in/sahana-f-0427492a9"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn Profile"
            className="hero-social-icon"
          >
            <FiLinkedin size={19} />
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        onClick={() => onNavClick('about')}
        role="button"
        tabIndex={0}
      >
        <span className="scroll-text">SCROLL TO ENTER</span>
        <motion.div
          className="scroll-line-track"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <FiArrowDown size={14} className="scroll-arrow" />
        </motion.div>
      </motion.div>
    </section>
  )
}
