import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * CinematicMasterVideo
 * The single master video layer (vid.mp4, 55.91s) that powers the entire portfolio.
 * Native document scroll directly controls video.currentTime forward and in reverse.
 * Exactly ONE <video> exists in the DOM.
 */
export function CinematicMasterVideo() {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Ensure video is paused so it scrubs purely by scroll
    video.pause()

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      video.currentTime = 0
      return
    }

    let targetTime = 0
    let animFrameId = null
    let isSeeking = false

    const handleSeeked = () => {
      isSeeking = false
    }
    video.addEventListener('seeked', handleSeeked)

    // Smooth scrub loop that coordinates with the browser's video decoder
    const renderLoop = () => {
      if (video && video.readyState >= 1 && !isSeeking) {
        const diff = Math.abs(video.currentTime - targetTime)
        if (diff > 0.04) {
          isSeeking = true
          video.currentTime = targetTime
        }
      }
      animFrameId = requestAnimationFrame(renderLoop)
    }

    // ScrollTrigger across the full document height
    const st = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        const dur = video.duration || 55.91
        targetTime = Math.max(0, Math.min(dur, self.progress * dur))
      },
    })

    animFrameId = requestAnimationFrame(renderLoop)

    return () => {
      if (animFrameId) cancelAnimationFrame(animFrameId)
      video.removeEventListener('seeked', handleSeeked)
      st.kill()
    }
  }, [])

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
      <div className="master-cinematic-overlay" />
    </div>
  )
}
