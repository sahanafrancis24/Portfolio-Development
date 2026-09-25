/**
 * Central Master Timeline Configuration
 * Exactly 10 editorial windows mapping across the 55.91-second master film.
 * 
 * First 9 windows are 6.0 seconds each.
 * Final Contact window is 1.91 seconds (54s -> 55.91s).
 */
export const TOTAL_DURATION = 55.91

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

export const CHAPTER_TARGET_TIMES = {
  home: 0,
  about: 12,
  skills: 24,
  projects: 36,
  github: 42,
  contact: 54,
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
 * Returns the normalized 0.0 -> 1.0 progress of the current time within a specific window.
 * Clamped between 0 and 1.
 */
export function getWindowProgress(windowKey, currentTime) {
  const windowRange = CINEMATIC_WINDOWS[windowKey]
  if (!windowRange) return 0
  const [start, end] = windowRange
  if (currentTime <= start) return 0
  if (currentTime >= end) return 1
  return (currentTime - start) / (end - start)
}

/**
 * Determines the currently active chapter identifier based on cinematic time.
 */
export function getActiveChapter(currentTime) {
  if (currentTime < 9) return 'home'
  if (currentTime < 21) return 'about'
  if (currentTime < 33) return 'skills'
  if (currentTime < 42) return 'projects'
  if (currentTime < 51) return 'github'
  return 'contact'
}

/**
 * Calculates continuous transition opacity between two overlapping chapters.
 * Returns { fromOpacity, toOpacity, transitionProgress }
 */
export function getTransitionState(fromKey, toKey, transitionWindowKey, currentTime) {
  const progress = getWindowProgress(transitionWindowKey, currentTime)
  return {
    fromOpacity: 1 - progress,
    toOpacity: progress,
    transitionProgress: progress,
  }
}
