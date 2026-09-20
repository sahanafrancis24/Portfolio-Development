import { initialProjects } from '../data/projects'

const GITHUB_USERNAME = 'sahanafrancis24'
const CACHE_KEY = 'sahana_portfolio_projects_v1'
const CACHE_TTL = 15 * 60 * 1000 // 15 minutes

/**
 * Normalizes repository name for comparison
 */
function cleanName(str) {
  return (str || '').toLowerCase().replace(/[-_\s]/g, '')
}

/**
 * Fetches and merges GitHub repositories with curated project data
 * Ensures zero-maintenance: Any new repo with topic `portfolio-project` or homepage automatically appears!
 */
export async function getPortfolioProjects() {
  // 1. Check local session cache to respect rate limits
  try {
    const cached = sessionStorage.getItem(CACHE_KEY)
    if (cached) {
      const { timestamp, data } = JSON.parse(cached)
      if (Date.now() - timestamp < CACHE_TTL && Array.isArray(data) && data.length > 0) {
        return data
      }
    }
  } catch {
    // sessionStorage not available or parsing failed, proceed to fetch
  }

  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
      }
    )

    if (!response.ok) {
      throw new Error(`GitHub API returned status ${response.status}`)
    }

    const repos = await response.json()
    if (!Array.isArray(repos)) {
      return initialProjects
    }

    // Map curated projects by normalized name for fast lookup
    const curatedMap = new Map()
    initialProjects.forEach((p) => {
      curatedMap.set(cleanName(p.id), p)
      curatedMap.set(cleanName(p.title), p)
      if (p.github) {
        const repoSegment = p.github.split('/').pop()
        if (repoSegment) curatedMap.set(cleanName(repoSegment), p)
      }
    })

    const mergedProjects = [...initialProjects]

    repos.forEach((repo) => {
      if (repo.fork || repo.private) return

      const topics = Array.isArray(repo.topics) ? repo.topics : []
      const hasTopic = topics.includes('portfolio-project')
      const hasHomepage = Boolean(repo.homepage && repo.homepage.startsWith('http'))

      // Only automatically adopt if explicitly marked or has an active deployed homepage
      if (!hasTopic && !hasHomepage) return

      const cleaned = cleanName(repo.name)
      const existing = curatedMap.get(cleaned)

      if (existing) {
        // Enhance existing project with live GitHub telemetry
        existing.stars = repo.stargazers_count
        existing.forks = repo.forks_count
        existing.updatedAt = repo.updated_at
        if (!existing.link && hasHomepage) {
          existing.link = repo.homepage
        }
      } else if (hasTopic || (hasHomepage && !cleaned.includes('portfolio'))) {
        // Auto-discovered new project!
        const newProject = {
          id: repo.name,
          title: formatRepoTitle(repo.name),
          category: repo.language ? `${repo.language} · Web` : 'Interactive Web',
          description: repo.description || 'Interactive project built with modern web technologies.',
          stack: repo.language ? [repo.language, 'Web'] : ['JavaScript', 'Creative Dev'],
          github: repo.html_url,
          link: repo.homepage || '',
          image: '/nopage.png', // Safe default fallback
          featured: false,
          order: 99,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          updatedAt: repo.updated_at,
        }
        mergedProjects.push(newProject)
      }
    })

    // Sort by order ascending
    mergedProjects.sort((a, b) => (a.order || 99) - (b.order || 99))

    // Save to cache
    try {
      sessionStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ timestamp: Date.now(), data: mergedProjects })
      )
    } catch {
      // Ignore cache write errors
    }

    return mergedProjects
  } catch (err) {
    console.warn('GitHub project discovery fallback to local data:', err.message)
    return initialProjects
  }
}

function formatRepoTitle(str) {
  return str
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
