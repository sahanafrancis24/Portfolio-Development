import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { SectionLabel } from './SectionLabel'
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

    // Ensure minimum 5 items per row by looping if needed
    let fullR1 = [...r1]
    while (fullR1.length < 5) fullR1 = [...fullR1, ...r1]

    let fullR2 = [...r2]
    while (fullR2.length < 5) fullR2 = [...fullR2, ...r2]

    return { row1: fullR1, row2: fullR2 }
  }, [projects])

  return (
    <section id="projects" className="projects-marquee-section">
      <div className="projects-header-wrap">
        <SectionLabel
          number="03"
          label="PROJECTS"
          subtitle="SELECTED WORK // REAL PROJECTS. REAL IMPACT."
        />
        <div className="marquee-nav-indicators" aria-hidden="true">
          <span className="marquee-dir-indicator">
            <FiArrowLeft size={14} className="dir-icon-anim-l" /> LTR
          </span>
          <span className="indicator-sep">•</span>
          <span className="marquee-dir-indicator">
            RTL <FiArrowRight size={14} className="dir-icon-anim-r" />
          </span>
        </div>
      </div>

      <div className="marquee-stage-container">
        {/* Ambient Gradient Fades on Left & Right Edges */}
        <div className="marquee-edge-fade left-fade" />
        <div className="marquee-edge-fade right-fade" />

        {/* Row 1: Left to Right */}
        <div
          className={`marquee-row-track track-ltr ${row1Paused ? 'is-paused' : ''}`}
          onMouseEnter={() => setRow1Paused(true)}
          onMouseLeave={() => setRow1Paused(false)}
        >
          <div className="marquee-inner-loop">
            {row1.map((p, idx) => (
              <ProjectCard key={`r1-a-${p.id || idx}`} project={p} />
            ))}
          </div>
          <div className="marquee-inner-loop" aria-hidden="true">
            {row1.map((p, idx) => (
              <ProjectCard key={`r1-b-${p.id || idx}`} project={p} />
            ))}
          </div>
        </div>

        {/* Row 2: Right to Left */}
        <div
          className={`marquee-row-track track-rtl ${row2Paused ? 'is-paused' : ''}`}
          onMouseEnter={() => setRow2Paused(true)}
          onMouseLeave={() => setRow2Paused(false)}
        >
          <div className="marquee-inner-loop">
            {row2.map((p, idx) => (
              <ProjectCard key={`r2-a-${p.id || idx}`} project={p} />
            ))}
          </div>
          <div className="marquee-inner-loop" aria-hidden="true">
            {row2.map((p, idx) => (
              <ProjectCard key={`r2-b-${p.id || idx}`} project={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
