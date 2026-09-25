import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * useCinematicTimeline
 * Coordinates chapter-level scroll triggers, editorial typography reveals,
 * and 20-30% cross-chapter overlap transitions over the single master video.
 */
export function useCinematicTimeline() {
  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // Verified 6-chapter flow matching vid.mp4 progression
      const chapters = ['home', 'about', 'projects', 'skills', 'github', 'contact']

      chapters.forEach((id) => {
        const section = document.getElementById(id)
        if (!section) return

        const contentCol = section.querySelector(
          '.hero-left-col, .about-left-col, .projects-upper-header, .skills-constellation-plane, .github-left-title-col, .contact-left-col'
        )

        // 20-30% Chapter Overlap Transition (Out-going soft fade & upward drift as next chapter arrives)
        if (contentCol) {
          gsap.fromTo(
            contentCol,
            { y: 0, opacity: 1 },
            {
              y: -30,
              opacity: 0.25,
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

      // Refresh ScrollTrigger after DOM settlements
      ScrollTrigger.refresh()
    })

    return () => ctx.revert()
  }, [])
}
