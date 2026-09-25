import { useState, useMemo, useRef, useEffect } from 'react'
import { SectionHeaderMeta } from './SectionHeaderMeta'
import { ProjectCard } from './ProjectCard'
import { useScrollVelocity } from '../hooks/useScrollVelocity'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'

export function ProjectMarquee({ projects = [] }) {
  const [row1Paused, setRow1Paused] = useState(false)
  const [row2Paused, setRow2Paused] = useState(false)

  const velocityRef = useScrollVelocity()
  const lane1Ref = useRef(null)
  const lane2Ref = useRef(null)

  // Couple scroll velocity with marquee continuous motion
  useEffect(() => {
    let animId = null

    const updateVelocity = () => {
      const v = velocityRef.current || 0
      // Normal playback speed is 1. Accelerates up to 3x with fast scroll
      const speedMultiplier = 1 + Math.min(3, Math.abs(v) * 0.7)
      // Reverse direction when scrolling upwards strongly
      const dirFactor = v < -0.3 ? -1 : 1
      const rate = speedMultiplier * dirFactor

      if (typeof lane1Ref.current?.getAnimations === 'function') {
        const anims = lane1Ref.current.getAnimations()
        for (let i = 0; i < anims.length; i++) {
          anims[i].playbackRate = rate
        }
      }

      if (typeof lane2Ref.current?.getAnimations === 'function') {
        const anims = lane2Ref.current.getAnimations()
        for (let i = 0; i < anims.length; i++) {
          anims[i].playbackRate = rate
        }
      }

      animId = requestAnimationFrame(updateVelocity)
    }

    animId = requestAnimationFrame(updateVelocity)
    return () => {
      if (animId) cancelAnimationFrame(animId)
    }
  }, [velocityRef])

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
    <section id="projects" className="cinematic-stage-layer ref-projects-stage">
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

      {/* Dual Continuous Infinite Marquee Decks (Row 1 LTR, Row 2 RTL) */}
      <div className="projects-dual-marquee-deck">
        {/* Row 1 Track: Left to Right (LTR) */}
        <div className="marquee-track-container">
          <div className="marquee-track-label">
            <span className="dir-tag dir-tag-ltr">
              <FiArrowRight size={12} /> STREAM LTR
            </span>
          </div>
          <div
            ref={lane1Ref}
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
            {/* Duplicated track for 100% seamless, non-jumping infinite loop */}
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
              <FiArrowLeft size={12} /> STREAM RTL
            </span>
          </div>
          <div
            ref={lane2Ref}
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
            {/* Duplicated track for 100% seamless, non-jumping infinite loop */}
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
