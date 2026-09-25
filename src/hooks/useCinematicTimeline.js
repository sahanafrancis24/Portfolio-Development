import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * useCinematicTimeline
 * Orchestrates chapter-level ScrollTriggers, camera push-ins, parallax depth,
 * and 20-30% cross-section overlaps matching the motion language of vid.mp4.
 * 
 * Never pins the entire 0-100% document; lets native document scrolling drive each chapter.
 */
export function useCinematicTimeline() {
  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      const chapters = ['home', 'about', 'skills', 'projects', 'github', 'contact']

      chapters.forEach((id) => {
        const section = document.getElementById(id)
        if (!section) return

        const bgMediaEl = section.querySelector('.section-bg-video, .section-bg-image, .skills-canvas-viewport')
        const contentCol = section.querySelector('.hero-left-col, .about-left-col, .projects-upper-header, .github-left-title-col, .contact-left-col')

        // 1. Camera / Environmental Depth: Push-in & parallax on the background
        if (bgMediaEl) {
          gsap.fromTo(
            bgMediaEl,
            { scale: 1, y: 0 },
            {
              scale: 1.08,
              y: 40,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.6,
              },
            }
          )
        }

        // 2. 20-30% Chapter Overlap Transition (Out-going fade & depth push)
        if (contentCol) {
          gsap.fromTo(
            contentCol,
            { y: 0, opacity: 1 },
            {
              y: -40,
              opacity: 0.35,
              ease: 'power1.out',
              scrollTrigger: {
                trigger: section,
                start: 'center top',
                end: 'bottom top',
                scrub: 0.6,
              },
            }
          )
        }
      })

      // Refresh ScrollTrigger after assets settle
      ScrollTrigger.refresh()
    })

    return () => ctx.revert()
  }, [])
}
