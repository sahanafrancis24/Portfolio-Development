import { FiExternalLink, FiGithub } from 'react-icons/fi'

export function ProjectCard({ project, theme = 'cyan' }) {
  const techLabel = project.stack && project.stack.length > 0
    ? project.stack.slice(0, 3).join(' · ')
    : 'Full-Stack'

  return (
    <div className={`ref-project-card card-theme-${theme}`}>
      {/* Visual Thumbnail */}
      <div className="card-thumb-frame">
        <img
          src={project.image || '/nopage.png'}
          alt={project.title}
          loading="lazy"
          className="card-thumb-image"
          onError={(e) => {
            if (e.target.src !== '/nopage.png') e.target.src = '/nopage.png'
          }}
        />
        <div className="card-thumb-sheen" />

        {/* Action Overlay */}
        <div className="card-hover-actions">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="action-pill live-pill"
              aria-label={`Live Demo of ${project.title}`}
            >
              <span>LIVE</span>
              <FiExternalLink size={11} />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="action-pill source-pill"
              aria-label={`Source code of ${project.title}`}
            >
              <span>SOURCE</span>
              <FiGithub size={11} />
            </a>
          )}
        </div>
      </div>

      {/* Typography Footer */}
      <div className="card-caption-bar">
        <h3 className="caption-title">{project.title}</h3>
        <div className="caption-meta-row">
          <p className="caption-category">{project.category || 'Creative Web'}</p>
          <span className="caption-tech-tag">{techLabel}</span>
        </div>
      </div>
    </div>
  )
}
