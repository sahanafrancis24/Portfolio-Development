import { SectionHeaderMeta } from './SectionHeaderMeta'
import { FiArrowRight } from 'react-icons/fi'

export function Hero({ onNavClick }) {
  return (
    <section id="home" className="cinematic-stage-layer ref-hero-stage">
      {/* Top Editorial Metadata */}
      <SectionHeaderMeta
        number="01"
        title="HOME"
        subline={<>CREATIVE<br />TECHNOLOGIST</>}
        rightMeta={[
          'SAHANA F',
          'PORTFOLIO',
          '/',
          '2026',
        ]}
      />

      <div className="hero-artdirected-layout">
        {/* Left Area: Typography strictly structured in clear, dark negative space */}
        <div className="hero-left-col">
          {/* Primary Name & Role Hierarchy */}
          <div className="hero-identity-box">
            <h1 className="hero-name-primary">SAHANA F</h1>
            <div className="hero-role-title">CREATIVE TECHNOLOGIST</div>
          </div>

          {/* Domain Specialization Kicker */}
          <div className="hero-kicker-pill">
            <span className="pill-dash">—</span>
            <span>BIOINFORMATICS × DEVELOPMENT × DIGITAL EXPERIENCES</span>
          </div>

          {/* Secondary Cinematic Reveal Text */}
          <div className="hero-manifesto-reveal">
            <h2 className="hero-bold-display">
              TURN IDEAS <br />
              <span className="text-magenta">INTO REAL WORLDS</span>
            </h2>
          </div>

          {/* Narrative Lead */}
          <p className="hero-narrative-lead">
            Exploring the intersection of biology, technology, and immersive digital worlds.
          </p>

          {/* CTAs */}
          <div className="hero-cta-group">
            <button
              className="hero-primary-pill"
              onClick={() => onNavClick('projects')}
              aria-label="View Projects"
            >
              <span>VIEW PROJECTS</span>
              <FiArrowRight size={14} />
            </button>

            <button
              className="hero-secondary-pill"
              onClick={() => onNavClick('contact')}
              aria-label="Contact Me"
            >
              <span>CONTACT ME</span>
            </button>
          </div>
        </div>

        {/* Right Area: Completely open and unobstructed vista showcasing the master video's native dragon, moon, and original calligraphy */}
        <div className="hero-right-col" aria-hidden="true" />
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

