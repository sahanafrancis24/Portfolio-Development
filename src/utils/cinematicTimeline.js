/**
 * Central Master Timeline Configuration
 * Exactly 10 editorial windows mapping across the 55.91-second master film.
 *
 * Configurable runway height decouples physical scroll speed from video duration.
 */
export const TOTAL_DURATION = 55.91

// Configurable scroll runway height (in vh). Tunable for human-scale scroll pacing.
export const RUNWAY_HEIGHT_VH = 650

export const CINEMATIC_WINDOWS = {
  home: [0, 6],
  homeToAbout: [6, 12],
  about: [12, 18],
  aboutToSkills: [18, 24],
  skills: [24, 30],
  skillsToProjects: [30, 36],
  projects: [36, 42],
  projectsToGithub: [42, 48],
  githubToContact: [48, 54],
  contact: [54, 55.91],
}

/**
 * Strict Chapter Isolation Boundaries
 * Each chapter has an explicit visibility window. Outside this window,
 * it is strictly: visibility: hidden, opacity: 0, pointer-events: none.
 */
export const CHAPTER_VISIBILITY_RANGES = {
  home: {
    visibleRange: [0, 12.0],
    activeRange: [0, 6.0],
    prepRange: [6.0, 8.5],
    transitionRange: [8.5, 12.0],
  },
  about: {
    visibleRange: [8.5, 24.0],
    transitionIn: [8.5, 12.0],
    activeRange: [12.0, 18.0],
    prepRange: [18.0, 20.5],
    transitionOut: [20.5, 24.0],
  },
  skills: {
    visibleRange: [20.5, 36.0],
    transitionIn: [20.5, 24.0],
    activeRange: [24.0, 30.0],
    prepRange: [30.0, 32.5],
    transitionOut: [32.5, 36.0],
  },
  projects: {
    visibleRange: [32.5, 48.0],
    transitionIn: [32.5, 36.0],
    activeRange: [36.0, 42.0],
    prepRange: [42.0, 44.5],
    transitionOut: [44.5, 48.0],
  },
  github: {
    visibleRange: [44.5, 54.0],
    transitionIn: [44.5, 48.0],
    activeRange: [48.0, 51.5],
    prepRange: [51.5, 53.0],
    transitionOut: [53.0, 54.0],
  },
  contact: {
    visibleRange: [53.0, 55.91],
    transitionIn: [53.0, 54.0],
    activeRange: [54.0, 55.91],
  },
}

export const CHAPTER_TARGET_TIMES = {
  home: 0,
  about: 12.0,
  skills: 24.0,
  projects: 36.0,
  github: 48.0,
  contact: 54.0,
}

/**
 * Converts a cinematic time (in seconds) to normalized progress (0.0 -> 1.0)
 */
export function timeToProgress(time, duration = TOTAL_DURATION) {
  if (!duration || duration <= 0) return 0
  return Math.max(0, Math.min(1, time / duration))
}

/**
 * Converts normalized progress (0.0 -> 1.0) to cinematic time (in seconds)
 */
export function progressToTime(progress, duration = TOTAL_DURATION) {
  return Math.max(0, Math.min(duration, progress * duration))
}

/**
 * Calculates continuous 0.0 -> 1.0 progress of time within a specific beat [start, end].
 */
export function getBeatProgress(time, start, end) {
  if (time <= start) return 0
  if (time >= end) return 1
  return (time - start) / (end - start)
}

/**
 * Determines the currently active chapter identifier based on cinematic time.
 */
export function getActiveChapter(currentTime) {
  if (currentTime < 8.5) return 'home'
  if (currentTime < 20.5) return 'about'
  if (currentTime < 32.5) return 'skills'
  if (currentTime < 44.5) return 'projects'
  if (currentTime < 53.0) return 'github'
  return 'contact'
}
