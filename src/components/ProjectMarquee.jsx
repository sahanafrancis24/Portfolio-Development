import { useState, useMemo } from 'react'
import { SectionHeaderMeta } from './SectionHeaderMeta'
import { ProjectCard } from './ProjectCard'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'

export function ProjectMarquee({ projects = [] }) {
  const [row1Paused, setRow1Paused] = useState(false)
  const [row2Paused, setRow2Paused] = useState(false)

  // Split projects into 2 balanced rows
  const { row1, row2 } = useMemo(() => {
    const r1 = []
    const r2 = []
    projects.forEach((item, index) => {
      if (index % 2 === 0) {
        r1.push(item)
      } else {
        r2.push(item)
      }
    })

    // Ensure minimum 5 items per row for seamless continuous looping
    let fullR1 = [...r1]
    while (fullR1.length > 0 && fullR1.length < 5) fullR1 = [...fullR1, ...r1]

    let fullR2 = [...r2]
    while (fullR2.length > 0 && fullR2.length < 5) fullR2 = [...fullR2, ...r2]

    return { row1: fullR1, row2: fullR2 }
  }, [projects])

  return (
    <section id="projects" className="ref-projects-stage">
      {/* Background Media: project.mp4 (Retained loop per user instruction) */}
      <div className="section-media-bg">
        <video autoPlay loop muted playsInline className="section-bg-video">
          <source src="/project.mp4" type="video/mp4" />
        </video>
        <div className="projects-vignette-overlay" />
      </div>

      {/* Top Editorial Metadata */}
      <SectionHeaderMeta
        number="04"
        title="PROJECTS"
        subline={<>IDEAS<br />IN ACTION</>}
        rightMeta={[
          'SELECTED WORK',
          'DUAL STREAM',
          'LTR / RTL',
          '/',
          'REAL IMPACT',
        ]}
      />

      {/* Upper-Left Heading & Top-Right Action */}
      <div className="projects-upper-header">
        <div className="projects-upper-left">
          <span className="projects-kicker-label">SELECTED WORK</span>
          <h2 className="projects-display-title">
            IDEAS <br />
            <span className="text-magenta">IN ACTION</span>
          </h2>
        </div>

        <div className="projects-upper-right">
          <a
            href="https://github.com/sahanafrancis24?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="view-all-projects-pill"
          >
            <span>View All Projects</span>
            <FiArrowRight size={14} />
          </a>
        </div>
      </div>

      {/* Dual Continuous Scrolling Marquee Deck (Left to Right & Right to Left) */}
      <div className="projects-dual-marquee-deck">
        {/* Row 1 Track: Left to Right (LTR) */}
        <div className="marquee-track-container">
          <div className="marquee-track-label">
            <span className="dir-tag dir-tag-ltr">
              <FiArrowRight size={12} /> SCROLL LTR
            </span>
          </div>
          <div
            className={`marquee-scroller-lane scroller-ltr ${row1Paused ? 'is-paused' : ''}`}
            onMouseEnter={() => setRow1Paused(true)}
            onMouseLeave={() => setRow1Paused(false)}
          >
            <div className="marquee-stream">
              {row1.map((p, idx) => (
                <div key={`r1-a-${p.id || idx}`} className="marquee-item-wrapper">
                  <ProjectCard project={p} theme="cyan" />
                </div>
              ))}
            </div>
            <div className="marquee-stream" aria-hidden="true">
              {row1.map((p, idx) => (
                <div key={`r1-b-${p.id || idx}`} className="marquee-item-wrapper">
                  <ProjectCard project={p} theme="cyan" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2 Track: Right to Left (RTL) */}
        <div className="marquee-track-container">
          <div className="marquee-track-label">
            <span className="dir-tag dir-tag-rtl">
              <FiArrowLeft size={12} /> SCROLL RTL
            </span>
          </div>
          <div
            className={`marquee-scroller-lane scroller-rtl ${row2Paused ? 'is-paused' : ''}`}
            onMouseEnter={() => setRow2Paused(true)}
            onMouseLeave={() => setRow2Paused(false)}
          >
            <div className="marquee-stream">
              {row2.map((p, idx) => (
                <div key={`r2-a-${p.id || idx}`} className="marquee-item-wrapper">
                  <ProjectCard project={p} theme="magenta" />
                </div>
              ))}
            </div>
            <div className="marquee-stream" aria-hidden="true">
              {row2.map((p, idx) => (
                <div key={`r2-b-${p.id || idx}`} className="marquee-item-wrapper">
                  <ProjectCard project={p} theme="magenta" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

