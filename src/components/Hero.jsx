import { SectionHeaderMeta } from './SectionHeaderMeta'
import { FiArrowRight } from 'react-icons/fi'

export function Hero({ onNavClick }) {
  return (
    <section id="home" className="cinematic-stage-layer ref-hero-stage">
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
        {/* Left Area: Typography strictly structured in clear, dark negative space */}
        <div className="hero-left-col">
          {/* Beat 1: Telemetry Tag */}
          <div className="hero-telemetry-tag">
            <span>IDEAS / CODE / SCIENCE / WORLDS</span>
          </div>

          {/* Beat 2 & 3: Primary Name & Role Hierarchy */}
          <div className="hero-identity-box">
            <h1 className="hero-name-primary">SAHANA F</h1>
            <div className="hero-role-title">CREATIVE TECHNOLOGIST</div>
          </div>

          {/* Beat 4: Domain Specialization Kicker */}
          <div className="hero-kicker-pill">
            <span className="pill-dash">—</span>
            <span>BIOINFORMATICS × DEVELOPMENT × DIGITAL EXPERIENCES</span>
          </div>

          {/* Beat 5: Secondary Cinematic Reveal Text */}
          <div className="hero-manifesto-reveal">
            <h2 className="hero-bold-display">
              TURN IDEAS <br />
              <span className="text-magenta">INTO REAL WORLDS</span>
            </h2>
          </div>

          {/* Beat 6: Narrative Lead */}
          <p className="hero-narrative-lead">
            Exploring the intersection of biology, technology, and immersive digital worlds.
          </p>

          {/* Beat 7: CTAs */}
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

        {/* Right Area: Atmospheric calligraphy framed cleanly with the cosmic landscape & dragon */}
        <div className="hero-right-col" aria-hidden="true">
          <div className="hero-atmospheric-calligraphy">
            <span className="calligraphy-line">DIFFERENT</span>
            <span className="calligraphy-line">WORLDS</span>
            <span className="calligraphy-line calligraphy-accent">SAME</span>
            <span className="calligraphy-line calligraphy-accent">MIND</span>
          </div>
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

