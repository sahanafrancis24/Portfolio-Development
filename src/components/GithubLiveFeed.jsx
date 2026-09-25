import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { SectionHeaderMeta } from './SectionHeaderMeta'
import { CinematicText } from './CinematicText'
import { FiGithub, FiStar, FiGitBranch, FiArrowRight } from 'react-icons/fi'

function formatRelativeTime(dateString) {
  if (!dateString) return 'recently'
  const diffMs = Date.now() - new Date(dateString).getTime()
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  if (days <= 0) return 'today'
  if (days === 1) return 'yesterday'
  if (days < 7) return `${days} days ago`
  if (days < 30) {
    const weeks = Math.floor(days / 7)
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`
  }
  const months = Math.floor(days / 30)
  return `${months} ${months === 1 ? 'month' : 'months'} ago`
}

export function GithubLiveFeed() {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const res = await fetch(
          'https://api.github.com/users/sahanafrancis24/repos?sort=pushed&per_page=5',
          {
            headers: { Accept: 'application/vnd.github.v3+json' },
          }
        )
        if (res.ok) {
          const data = await res.json()
          if (Array.isArray(data) && data.length > 0) {
            setRepos(data.slice(0, 5))
          }
        }
      } catch (err) {
        console.warn('GitHub live feed fetch error:', err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchGitHubData()
  }, [])

  return (
    <section id="github" className="ref-github-stage">
      {/* Top Editorial Metadata */}
      <SectionHeaderMeta
        number="05"
        title="GITHUB"
        subline={<>LIVE DATA<br />AUTOMATICALLY UPDATES</>}
        rightMeta={[
          'COMMIT',
          'CREATE',
          'IMPROVE',
          'REPEAT',
          '/',
          'REAL API METRICS',
        ]}
      />

      <div className="github-stage-grid">
        {/* Left Title in clear negative space */}
        <div className="github-left-title-col">
          <CinematicText revealType="clip-line" delay={0.05}>
            <span className="github-pre-label">VERSION CONTROL</span>
          </CinematicText>

          <CinematicText as="h2" revealType="clip-line" delay={0.15} className="github-big-word">
            GITHUB <br />
            <span className="text-magenta">LIVE FEED</span>
          </CinematicText>

          <CinematicText revealType="words" delay={0.25} className="github-desc-p">
            Real-time telemetry stream dynamically fetched from the GitHub API. No static numbers.
          </CinematicText>

          <CinematicText revealType="clip-line" delay={0.35}>
            <a
              href="https://github.com/sahanafrancis24"
              target="_blank"
              rel="noreferrer"
              className="view-github-pill"
              aria-label="View on GitHub"
            >
              <span>Explore Repositories</span>
              <FiArrowRight size={13} />
            </a>
          </CinematicText>
        </div>

        {/* Right Repositories Stream */}
        <div className="github-right-stream-col">
          <div className="github-stream-topbar">
            <span className="stream-heading">Latest Transmissions</span>
            <span className="stream-sync-badge">
              <span className="live-dot" /> LIVE SYNC
            </span>
          </div>

          {/* Sequential Cards Row (x: 80px -> 0, opacity: 0 -> 1, scale: 0.96 -> 1) */}
          <div className="github-cards-row">
            {repos.map((repo, idx) => (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="gh-data-card"
                initial={{ opacity: 0, x: 80, scale: 0.96 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.55,
                  delay: idx * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div className="gh-card-header">
                  <FiGithub size={13} className="gh-card-icon" />
                  <h3 className="gh-card-title">{repo.name}</h3>
                </div>

                <div className="gh-card-lang">
                  <span className="lang-dot" />
                  <span>{repo.language || 'Code'}</span>
                </div>

                <div className="gh-card-stats">
                  <span className="stat-unit">
                    <FiStar size={11} /> {repo.stargazers_count ?? 0}
                  </span>
                  <span className="stat-unit">
                    <FiGitBranch size={11} /> {repo.forks_count ?? 0}
                  </span>
                </div>

                <div className="gh-card-timestamp">
                  Updated {formatRelativeTime(repo.pushed_at || repo.updated_at)}
                </div>
              </motion.a>
            ))}

            {repos.length === 0 && !loading && (
              <div className="gh-fallback-notice">
                <span>Repositories syncing from GitHub API...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
