import { useState } from 'react'
import { SectionHeaderMeta } from './SectionHeaderMeta'
import { ProjectCard } from './ProjectCard'
import { FiArrowRight } from 'react-icons/fi'

export function ProjectMarquee({ projects = [] }) {
  const [isPaused, setIsPaused] = useState(false)

  return (
    <section id="projects" className="ref-projects-stage">
      {/* Background Media: project.mp4 */}
      <div className="section-media-bg">
        <video autoPlay loop muted playsInline className="section-bg-video">
          <source src="/project.mp4" type="video/mp4" />
        </video>
        <div className="projects-vignette-overlay" />
      </div>

      {/* Top Editorial Metadata */}
      <SectionHeaderMeta
        number="03"
        title="PROJECTS"
        subline={<>IDEAS<br />IN ACTION</>}
        rightMeta={[
          'SELECTED WORK',
          'INTERACTIVE',
          'CREATIVE TECH',
          '/',
          'REAL IMPACT',
        ]}
      />

      {/* Upper-Left Heading & Top-Right Action */}
      <div className="projects-upper-header">
        <div className="projects-upper-left">
          <span className="projects-kicker-label">PROJECTS</span>
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

      {/* Lower Area: Project Cards Stream (kept clear of upper artwork) */}
      <div className="projects-lower-deck">
        <div
          className={`projects-horizontal-track ${isPaused ? 'is-paused' : ''}`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="track-sliding-inner">
            {projects.map((p, idx) => (
              <div key={`p1-${p.id || idx}`} className="project-slide-item">
                <ProjectCard project={p} theme={idx % 2 === 0 ? 'cyan' : 'magenta'} />
              </div>
            ))}
          </div>
          <div className="track-sliding-inner" aria-hidden="true">
            {projects.map((p, idx) => (
              <div key={`p2-${p.id || idx}`} className="project-slide-item">
                <ProjectCard project={p} theme={idx % 2 === 0 ? 'cyan' : 'magenta'} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

