import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TOTAL_DURATION } from '../utils/cinematicTimeline'

gsap.registerPlugin(ScrollTrigger)

/**
 * useCinematicTimeline
 * Master GSAP Scroll-Driven Orchestrator (duration = 55.91s).
 * Bound to .cinematic-scroll-runway with smooth inertia (scrub: 1.0).
 * Implements strict chapter isolation and continuous micro-beat ranges.
 * Fully reversible when scrolling upward. Zero accidental chapter bleed.
 */
export function useCinematicTimeline() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // 0. Initial Explicit Chapter States
      gsap.set('#home', { visibility: 'visible', opacity: 1, pointerEvents: 'auto', y: 0 })
      gsap.set('#about', { visibility: 'hidden', opacity: 0, pointerEvents: 'none', y: 40 })
      gsap.set('#skills', { visibility: 'hidden', opacity: 0, pointerEvents: 'none', scale: 0.94 })
      gsap.set('#projects', { visibility: 'hidden', opacity: 0, pointerEvents: 'none', y: 40 })
      gsap.set('#github', { visibility: 'hidden', opacity: 0, pointerEvents: 'none', x: -30 })
      gsap.set('#contact', { visibility: 'hidden', opacity: 0, pointerEvents: 'none', y: 30 })

      // Create Master 55.91s scrub timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.cinematic-scroll-runway',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.0,
        },
      })

      // Ensure the master timeline duration is locked to TOTAL_DURATION
      tl.to({}, { duration: 0.01 }, TOTAL_DURATION)

      // ========================================================
      // 1. HOME CHAPTER (0.00s – 6.00s)
      // Typography visible and crisp on initial frame, responsive to scroll
      // ========================================================
      gsap.set('.hero-name-primary, .hero-role-title, .hero-kicker-pill, .hero-manifesto-reveal, .hero-narrative-lead, .hero-cta-group, .hero-bottom-scroll-cue', {
        opacity: 1,
        y: 0,
      })

      // Continuous scroll progression across 0 - 6s
      tl.fromTo('.hero-kicker-pill', { opacity: 0.85, x: -10 }, { opacity: 1, x: 0, duration: 2.0, ease: 'power1.out' }, 0.5)
      tl.fromTo('.hero-manifesto-reveal', { scale: 0.97 }, { scale: 1, duration: 2.5, ease: 'power2.out' }, 1.5)
      tl.fromTo('.hero-cta-group', { y: 10 }, { y: 0, duration: 2.0, ease: 'power2.out' }, 3.0)
      tl.to('.hero-bottom-scroll-cue', { opacity: 0.3, y: 15, duration: 2.0, ease: 'power1.out' }, 4.0)

      // ========================================================
      // 2. HOME -> ABOUT TRANSITION (6.00s – 12.00s)
      // 6.00 - 8.50s: Home transition prep (About strictly hidden)
      // 8.50s: About becomes visible
      // 8.50 - 12.00s: Home dissolves / About enters
      // ========================================================
      tl.to('#home', { opacity: 0, y: -50, ease: 'power2.inOut', duration: 3.5 }, 8.5)
      tl.set('#home', { visibility: 'hidden', pointerEvents: 'none' }, 12.0)

      tl.set('#about', { visibility: 'visible' }, 8.5)
      tl.to('#about', { opacity: 1, y: 0, ease: 'power2.out', duration: 3.5 }, 8.5)
      tl.set('#about', { pointerEvents: 'auto' }, 12.0)

      // ========================================================
      // 3. ABOUT CHAPTER (12.00s – 18.00s)
      // Internal Micro-Beats
      // ========================================================
      // Beat 1: 12.00 - 13.20s ABOUT ME kicker & headline
      tl.fromTo('.about-kicker-label', { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power1.out' }, 12.0)
      tl.fromTo('.about-headline-title', { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 12.3)

      // Beat 2: 13.20 - 14.70s Narrative paragraph
      tl.fromTo('.about-narrative-paragraph', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 1.5, ease: 'power1.out' }, 13.2)

      // Beat 3: 14.70 - 16.50s Supporting engineering focus items stagger
      tl.fromTo('.about-supporting-item', { opacity: 0, x: -16 }, { opacity: 1, x: 0, stagger: 0.18, duration: 0.45, ease: 'power2.out' }, 14.7)

      // Beat 4: 16.50 - 18.00s Atmospheric telemetry & composition hold
      tl.fromTo('.about-art-telemetry', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1.5, ease: 'power1.out' }, 16.5)

      // ========================================================
      // 4. ABOUT -> SKILLS TRANSITION (18.00s – 24.00s)
      // 18.00 - 20.50s: About prep (Skills strictly hidden)
      // 20.50s: Skills becomes visible
      // 20.50 - 24.00s: About dissolves / Skills enters
      // ========================================================
      tl.to('#about', { opacity: 0, y: -50, ease: 'power2.inOut', duration: 3.5 }, 20.5)
      tl.set('#about', { visibility: 'hidden', pointerEvents: 'none' }, 24.0)

      tl.set('#skills', { visibility: 'visible' }, 20.5)
      tl.to('#skills', { opacity: 1, scale: 1, ease: 'power2.out', duration: 3.5 }, 20.5)
      tl.set('#skills', { pointerEvents: 'auto' }, 24.0)

      // ========================================================
      // 5. SKILLS CHAPTER (24.00s – 30.00s)
      // 8 Stationary Nodes & Celestial HUD
      // ========================================================
      // Beat 1: 24.00 - 24.90s Central S Core activates
      tl.fromTo('.central-constellation-core', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.9, ease: 'back.out(1.4)' }, 24.0)

      // Beat 2: 24.90 - 26.10s SVG Connecting Lines draw
      tl.fromTo('.constellation-svg-lines', { opacity: 0 }, { opacity: 1, duration: 1.2, ease: 'power1.out' }, 24.9)

      // Beat 3: 26.10 - 27.30s First 4 nodes activate
      tl.fromTo('.cosmic-skill-node:nth-of-type(-n+4)', { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, stagger: 0.25, duration: 0.6, ease: 'back.out(1.5)' }, 26.1)

      // Beat 4: 27.30 - 28.50s Remaining 4 nodes activate
      tl.fromTo('.cosmic-skill-node:nth-of-type(n+5)', { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, stagger: 0.25, duration: 0.6, ease: 'back.out(1.5)' }, 27.3)

      // Beat 5: 28.50 - 29.40s Node telemetry & labels glow
      tl.fromTo('.node-text-plate', { opacity: 0.3 }, { opacity: 1, duration: 0.9, ease: 'power1.out' }, 28.5)

      // Beat 6: 29.40 - 30.00s Exploration Dock ready
      tl.fromTo('.skills-right-expansion-dock', { opacity: 0, x: 25 }, { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }, 29.4)

      // ========================================================
      // 6. SKILLS -> PROJECTS TRANSITION (30.00s – 36.00s)
      // 30.00 - 32.50s: Skills prep (Projects strictly hidden)
      // 32.50s: Projects becomes visible
      // 32.50 - 36.00s: Skills dissolves / Projects enters
      // ========================================================
      tl.to('#skills', { opacity: 0, scale: 0.94, ease: 'power2.inOut', duration: 3.5 }, 32.5)
      tl.set('#skills', { visibility: 'hidden', pointerEvents: 'none' }, 36.0)

      tl.set('#projects', { visibility: 'visible' }, 32.5)
      tl.to('#projects', { opacity: 1, y: 0, ease: 'power2.out', duration: 3.5 }, 32.5)
      tl.set('#projects', { pointerEvents: 'auto' }, 36.0)

      // ========================================================
      // 7. PROJECTS CHAPTER (36.00s – 42.00s)
      // Dual-Stream Infinite Marquee & Velocity Coupling
      // ========================================================
      // Beat 1: 36.00 - 37.20s Projects header & display title
      tl.fromTo('.projects-upper-header', { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' }, 36.0)

      // Beat 2: 37.20 - 38.80s Row 1 (LTR) cards activate
      tl.fromTo('.marquee-track-container:nth-child(1)', { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 1.6, ease: 'power2.out' }, 37.2)

      // Beat 3: 38.80 - 40.50s Row 2 (RTL) cards activate
      tl.fromTo('.marquee-track-container:nth-child(2)', { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 1.7, ease: 'power2.out' }, 38.8)

      // Beat 4: 40.50 - 42.00s Continuous Marquee Dominant Hold
      tl.to('.projects-dual-marquee-deck', { scale: 1, duration: 1.5 }, 40.5)

      // ========================================================
      // 8. PROJECTS -> GITHUB TRANSITION (42.00s – 48.00s)
      // 42.00 - 44.50s: Projects prep (GitHub strictly hidden)
      // 44.50s: GitHub becomes visible
      // 44.50 - 48.00s: Projects dissolves / GitHub enters
      // ========================================================
      tl.to('#projects', { opacity: 0, y: -40, ease: 'power2.inOut', duration: 3.5 }, 44.5)
      tl.set('#projects', { visibility: 'hidden', pointerEvents: 'none' }, 48.0)

      tl.set('#github', { visibility: 'visible' }, 44.5)
      tl.to('#github', { opacity: 1, x: 0, ease: 'power2.out', duration: 3.5 }, 44.5)
      tl.set('#github', { pointerEvents: 'auto' }, 48.0)

      // ========================================================
      // 9. GITHUB CHAPTER (48.00s – 54.00s)
      // Live Repositories & Transition into Contact
      // ========================================================
      // Beat 1: 48.00 - 49.50s GitHub Left Title Col
      tl.fromTo('.github-left-title-col', { opacity: 0, x: -35 }, { opacity: 1, x: 0, duration: 1.5, ease: 'power2.out' }, 48.0)

      // Beat 2: 49.50 - 51.50s Live Repository Cards Stagger
      tl.fromTo('.gh-data-card', { opacity: 0, x: 50, scale: 0.95 }, { opacity: 1, x: 0, scale: 1, stagger: 0.18, duration: 0.8, ease: 'power2.out' }, 49.5)

      // Beat 3: 51.50 - 53.00s GitHub Prep & Hold
      tl.to('.github-right-stream-col', { opacity: 1, duration: 1.5 }, 51.5)

      // 53.00 - 54.00s: GitHub dissolves / Contact enters
      tl.to('#github', { opacity: 0, y: -40, ease: 'power2.inOut', duration: 1.0 }, 53.0)
      tl.set('#github', { visibility: 'hidden', pointerEvents: 'none' }, 54.0)

      tl.set('#contact', { visibility: 'visible' }, 53.0)
      tl.to('#contact', { opacity: 1, y: 0, ease: 'power2.out', duration: 1.0 }, 53.0)
      tl.set('#contact', { pointerEvents: 'auto' }, 54.0)

      // ========================================================
      // 10. CONTACT FINAL RESOLUTION (54.00s – 55.91s)
      // Final Form & Dragon Mantra Hold
      // ========================================================
      // Beat 1: 54.00 - 54.80s Contact Form & Transmission Dock
      tl.fromTo('.contact-left-col', { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 54.0)

      // Beat 2: 54.80 - 55.91s Final Dragon Mantra "IDEAS ALWAYS FIND A WAY"
      tl.fromTo('.contact-dragon-mantra', { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 1.1, ease: 'power2.out' }, 54.8)

      ScrollTrigger.refresh()
    })

    return () => ctx.revert()
  }, [])
}
