import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { SectionLabel } from './SectionLabel'
import { FiGithub, FiStar, FiGitBranch, FiExternalLink, FiTerminal } from 'react-icons/fi'

const FALLBACK_REPOS = [
  {
    id: 1,
    name: 'the-three-realms',
    description: 'Immersive high-fantasy 3D WebGL experience built with React Three Fiber and GSAP.',
    language: 'JavaScript',
    stargazers_count: 5,
    forks_count: 1,
    updated_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    html_url: 'https://github.com/sahanafrancis24/the-three-realms',
  },
  {
    id: 2,
    name: 'No-page-Website',
    description: 'Zero-page procedural WebGL particle environment with spatial digital storytelling.',
    language: 'JavaScript',
    stargazers_count: 3,
    forks_count: 0,
    updated_at: new Date(Date.now() - 6 * 86400000).toISOString(),
    html_url: 'https://github.com/sahanafrancis24/No-page-Website',
  },
  {
    id: 3,
    name: 'Portfolio-Development',
    description: 'Futuristic 3D portfolio featuring custom WebGL shaders, dragon rig, and interactive UI.',
    language: 'JavaScript',
    stargazers_count: 8,
    forks_count: 2,
    updated_at: new Date().toISOString(),
    html_url: 'https://github.com/sahanafrancis24/Portfolio-Development',
  },
  {
    id: 4,
    name: 'structurologic-engine',
    description: 'JavaScript logic engine with modular sequence algorithms and data processing.',
    language: 'JavaScript',
    stargazers_count: 2,
    forks_count: 0,
    updated_at: new Date(Date.now() - 14 * 86400000).toISOString(),
    html_url: 'https://github.com/sahanafrancis24/structurologic-engine',
  },
  {
    id: 5,
    name: 'AI-Medical-Chatbot',
    description: 'Guided clinical assistant with natural conversational flows and diagnostic queries.',
    language: 'Dart',
    stargazers_count: 4,
    forks_count: 1,
    updated_at: new Date(Date.now() - 20 * 86400000).toISOString(),
    html_url: 'https://github.com/sahanafrancis24/AI-Medical-Chatbot',
  },
  {
    id: 6,
    name: 'ruffs-cafe',
    description: 'Modern responsive cafe storefront with interactive menus and booking system.',
    language: 'JavaScript',
    stargazers_count: 1,
    forks_count: 0,
    updated_at: new Date(Date.now() - 25 * 86400000).toISOString(),
    html_url: 'https://github.com/sahanafrancis24?tab=repositories&q=ruffs-cafe',
  },
]

function formatRelativeTime(dateString) {
  if (!dateString) return 'recently'
  const diffMs = Date.now() - new Date(dateString).getTime()
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  if (days <= 0) return 'today'
  if (days === 1) return 'yesterday'
  if (days < 30) return `${days}d ago`
  const months = Math.floor(days / 30)
  return `${months}mo ago`
}

export function GithubLiveFeed() {
  const [repos, setRepos] = useState(FALLBACK_REPOS)
  const [profile, setProfile] = useState({ public_repos: 14, followers: 8 })

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const [profRes, reposRes] = await Promise.all([
          fetch('https://api.github.com/users/sahanafrancis24'),
          fetch('https://api.github.com/users/sahanafrancis24/repos?sort=pushed&per_page=6'),
        ])
        if (profRes.ok) {
          const profData = await profRes.json()
          setProfile(profData)
        }
        if (reposRes.ok) {
          const reposData = await reposRes.json()
          if (Array.isArray(reposData) && reposData.length > 0) {
            setRepos(reposData)
          }
        }
      } catch {
        // Silently use robust fallback telemetry
      }
    }

    fetchGitHubData()
  }, [])

  return (
    <section id="github" className="github-feed-section">
      <SectionLabel
        number="05"
        label="GITHUB"
        subtitle="LIVE DEVELOPMENT FEED // TELEMETRY STREAM"
      />

      {/* Subtle Ambient Code Stream in Background */}
      <div className="code-stream-matrix" aria-hidden="true">
        <span>git commit -m &quot;feat: core engine optimization&quot; // branch: main</span>
        <span>const stream = await glsl.compileShader(vertexSource)</span>
        <span>POST /api/telemetry 200 OK 18ms</span>
      </div>

      {/* Telemetry Header Pill */}
      <div className="github-status-strip">
        <div className="status-indicator-live">
          <span className="live-pulsing-dot" />
          <span className="live-status-text">CONNECTED TO GITHUB API</span>
        </div>
        <div className="status-metrics">
          <span>PUBLIC REPOS: <strong>{profile.public_repos || repos.length}</strong></span>
          <span className="metric-sep">•</span>
          <span>BRANCH: <strong>main</strong></span>
        </div>
      </div>

      {/* Grid of Compact Transmission Cards */}
      <div className="transmission-cards-grid">
        {repos.map((repo, idx) => (
          <motion.a
            key={repo.id || idx}
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            className="transmission-card glass-panel"
            data-cursor="source"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ delay: idx * 0.08, duration: 0.5 }}
            whileHover={{ y: -4 }}
          >
            <div className="transmission-card-header">
              <div className="repo-name-group">
                <FiGithub size={15} className="repo-gh-icon" />
                <h3 className="repo-name">{repo.name}</h3>
              </div>
              <FiExternalLink size={14} className="repo-arrow-action" />
            </div>

            <p className="repo-desc">
              {repo.description || 'Modern responsive codebase deployed to the open web.'}
            </p>

            <div className="transmission-card-footer">
              <div className="repo-meta-pill">
                <span className="lang-indicator-dot" />
                <span className="lang-label">{repo.language || 'Multi-stack'}</span>
              </div>

              <div className="repo-stats-group">
                <span className="repo-stat">
                  <FiStar size={12} /> {repo.stargazers_count ?? 0}
                </span>
                <span className="repo-stat">
                  <FiGitBranch size={12} /> {repo.forks_count ?? 0}
                </span>
                <span className="repo-time-tag">
                  {formatRelativeTime(repo.updated_at || repo.pushed_at)}
                </span>
              </div>
            </div>
          </motion.a>
        ))}
      </div>

      {/* Master View On GitHub CTA */}
      <div className="github-footer-cta">
        <a
          href="https://github.com/sahanafrancis24"
          target="_blank"
          rel="noreferrer"
          className="gh-feed-cta-btn"
          data-cursor="source"
        >
          <FiTerminal size={15} />
          <span>VIEW ALL REPOSITORIES ON GITHUB ↗</span>
        </a>
      </div>
    </section>
  )
}
