import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink } from 'react-icons/fi'

export function ProjectCard({ project }) {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    // Max 3-5 degrees tilt as specified
    const rx = (0.5 - py) * 6
    const ry = (px - 0.5) * 6
    setTilt({ rx, ry })
  }

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 })
  }

  return (
    <motion.div
      className="marquee-project-card glass-panel"
      data-cursor="view"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: tilt.rx,
        rotateY: tilt.ry,
      }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      tabIndex={0}
      role="article"
      aria-label={project.title}
    >
      {/* Thumbnail Container */}
      <div className="card-media-wrapper">
        <img
          src={project.image || '/nopage.png'}
          alt={project.title}
          loading="lazy"
          className="card-media-img"
          onError={(e) => {
            // Fallback safety so a broken image never appears
            if (e.target.src !== '/nopage.png') {
              e.target.src = '/nopage.png'
            }
          }}
        />
        <div className="card-media-overlay" />

        {/* Floating Quick Action Overlay */}
        <div className="card-actions-quick">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="quick-action-pill live-pill"
              onClick={(e) => e.stopPropagation()}
              data-cursor="view"
              aria-label={`Live Demo of ${project.title}`}
            >
              <span>LIVE</span>
              <FiExternalLink size={12} />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="quick-action-pill github-pill"
              onClick={(e) => e.stopPropagation()}
              data-cursor="source"
              aria-label={`GitHub Repository of ${project.title}`}
            >
              <span>SOURCE</span>
              <FiGithub size={12} />
            </a>
          )}
        </div>
      </div>

      {/* Project Metadata */}
      <div className="card-body">
        <div className="card-header-row">
          <h3 className="card-title">{project.title}</h3>
        </div>

        <p className="card-category">{project.category}</p>

        {/* Micro Tech Tags */}
        <div className="card-tech-row">
          {(project.stack || []).slice(0, 3).map((tech) => (
            <span key={tech} className="micro-tag">
              #{tech.toLowerCase().replace(/\s+/g, '')}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
