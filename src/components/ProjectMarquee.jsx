import { useState, useMemo } from 'react'
import { SectionHeaderMeta } from './SectionHeaderMeta'
import { ProjectCard } from './ProjectCard'
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi'

export function ProjectMarquee({ projects = [] }) {
  const [row1Paused, setRow1Paused] = useState(false)
  const [row2Paused, setRow2Paused] = useState(false)

  // Split projects into 2 distinct rows
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

    // Ensure at least 5 items per row by looping if needed
    let full1 = [...r1]
    while (full1.length < 5) full1 = [...full1, ...r1]

    let full2 = [...r2]
    while (full2.length < 5) full2 = [...full2, ...r2]

    return { row1: full1, row2: full2 }
  }, [projects])

  return (
    <section id="projects" className="ref-projects-stage">
      {/* Top Editorial Metadata */}
      <SectionHeaderMeta
        number="03"
        title="PROJECTS"
        subline={<>AUTOMATIC SLIDING<br />DUAL MARQUEE</>}
        rightMeta={[
          'DRAGONS BUILD WORLDS TOO',
          '/',
          'HOVER TO EXPLORE',
          '/',
        ]}
      />

      {/* Section Header */}
      <div className="projects-heading-row">
        <h2 className="projects-title-white">SELECTED WORK</h2>
        <span className="projects-title-sub">REAL PROJECTS. REAL IMPACT.</span>
      </div>

      {/* Dual Marquee Track Rows */}
      <div className="dual-marquee-viewport">
        {/* ROW 1 (Cyan Theme with Glowing Arrow Badge) */}
        <div className="marquee-row-wrapper">
          <div className="marquee-arrow-badge arrow-cyan" aria-hidden="true">
            <FiArrowRight size={20} />
          </div>

          <div
            className={`marquee-scroller scroller-ltr ${row1Paused ? 'is-paused' : ''}`}
            onMouseEnter={() => setRow1Paused(true)}
            onMouseLeave={() => setRow1Paused(false)}
          >
            <div className="scroller-track">
              {row1.map((p, idx) => (
                <ProjectCard key={`r1-1-${p.id || idx}`} project={p} theme="cyan" />
              ))}
            </div>
            <div className="scroller-track" aria-hidden="true">
              {row1.map((p, idx) => (
                <ProjectCard key={`r1-2-${p.id || idx}`} project={p} theme="cyan" />
              ))}
            </div>
          </div>
        </div>

        {/* ROW 2 (Purple/Magenta Theme with Glowing Arrow Badge) */}
        <div className="marquee-row-wrapper">
          <div className="marquee-arrow-badge arrow-magenta" aria-hidden="true">
            <FiArrowLeft size={20} />
          </div>

          <div
            className={`marquee-scroller scroller-rtl ${row2Paused ? 'is-paused' : ''}`}
            onMouseEnter={() => setRow2Paused(true)}
            onMouseLeave={() => setRow2Paused(false)}
          >
            <div className="scroller-track">
              {row2.map((p, idx) => (
                <ProjectCard key={`r2-1-${p.id || idx}`} project={p} theme="magenta" />
              ))}
            </div>
            <div className="scroller-track" aria-hidden="true">
              {row2.map((p, idx) => (
                <ProjectCard key={`r2-2-${p.id || idx}`} project={p} theme="magenta" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
