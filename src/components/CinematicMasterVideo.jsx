import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TOTAL_DURATION, getActiveChapter } from '../utils/cinematicTimeline'

gsap.registerPlugin(ScrollTrigger)

const SMOOTHING_FACTOR = 0.18
const EPSILON = 0.025

/**
 * CinematicMasterVideo
 * Exactly ONE persistent <video> in the DOM (src="/vid.mp4", ~55.91s).
 * Implements a targetTime / renderedTime smooth scrub physics engine via requestAnimationFrame.
 * Fully reversible when scrolling up and down.
 * Zero React re-renders during high-frequency scrubbing.
 */
export function CinematicMasterVideo({ onActiveChapterChange }) {
  const videoRef = useRef(null)
  const stateRef = useRef({
    targetTime: 0,
    renderedTime: 0,
    duration: TOTAL_DURATION,
    isSeeking: false,
    activeChapter: 'home',
  })

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Ensure video is strictly paused (never plays audio or unscroll-driven playback)
    video.pause()

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      video.currentTime = 0
      return
    }

    // Dynamic duration from loaded video metadata
    const handleLoadedMetadata = () => {
      if (video.duration && !isNaN(video.duration)) {
        stateRef.current.duration = video.duration
      }
    }
    video.addEventListener('loadedmetadata', handleLoadedMetadata)

    const handleSeeked = () => {
      stateRef.current.isSeeking = false
    }
    video.addEventListener('seeked', handleSeeked)

    let animFrameId = null

    // Target / Rendered Scrub Physics Loop
    const scrubLoop = () => {
      const state = stateRef.current

      if (video && video.readyState >= 1 && !state.isSeeking) {
        const diff = state.targetTime - state.renderedTime

        if (Math.abs(diff) > EPSILON) {
          // Clamp maximum delta per frame so high-speed wheel flicks do not skip chapters
          const maxDeltaPerFrame = 0.5
          const clampedDiff = Math.sign(diff) * Math.min(Math.abs(diff), maxDeltaPerFrame)
          state.renderedTime += clampedDiff * SMOOTHING_FACTOR
          // Clamp within video duration
          const clampedTime = Math.max(0, Math.min(state.duration, state.renderedTime))
          state.isSeeking = true
          video.currentTime = clampedTime

          // Update active chapter only when a discrete chapter boundary is crossed
          const currentChapter = getActiveChapter(clampedTime)
          if (currentChapter !== state.activeChapter) {
            state.activeChapter = currentChapter
            if (typeof onActiveChapterChange === 'function') {
              onActiveChapterChange(currentChapter)
            }
          }
        }
      }

      // Expose to window for low-overhead synchronous inspection
      window.__CINEMATIC_TIME__ = state.renderedTime

      animFrameId = requestAnimationFrame(scrubLoop)
    }

    // Master ScrollTrigger playhead mapped across cinematic scroll runway
    const masterTrigger = ScrollTrigger.create({
      trigger: '.cinematic-scroll-runway',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        const duration = stateRef.current.duration || TOTAL_DURATION
        stateRef.current.targetTime = self.progress * duration
      },
    })

    animFrameId = requestAnimationFrame(scrubLoop)

    // Handle visibility changes (tab switch/minimize) safely
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stateRef.current.isSeeking = false
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      if (animFrameId) cancelAnimationFrame(animFrameId)
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('seeked', handleSeeked)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      masterTrigger.kill()
    }
  }, [onActiveChapterChange])

  return (
    <div className="cinematic-master-video-layer" aria-hidden="true">
      <video
        ref={videoRef}
        src="/vid.mp4"
        playsInline
        muted
        preload="auto"
        className="master-cinematic-video"
      />
    </div>
  )
}
