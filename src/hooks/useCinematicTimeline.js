import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * useCinematicTimeline
 * Orchestrates chapter UI choreography synchronized with the 10 editorial windows.
 * Employs chapter-level GSAP timelines with 20-30% continuous overlap.
 * Fully reversible when scrolling backward. Zero layout jumps.
 */
export function useCinematicTimeline() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // 1. Home Chapter (0–6s active, 6–12s continuous exit into About)
      const homeSection = document.getElementById('home')
      if (homeSection) {
        const homeContent = homeSection.querySelector('.hero-left-col')
        const homeCalligraphy = homeSection.querySelector('.hero-atmospheric-calligraphy')

        if (homeContent) {
          gsap.fromTo(
            homeContent,
            { opacity: 1, y: 0 },
            {
              opacity: 0.1,
              y: -40,
              ease: 'power1.out',
              scrollTrigger: {
                trigger: homeSection,
                start: 'center top',
                end: 'bottom top',
                scrub: 0.6,
              },
            }
          )
        }

        if (homeCalligraphy) {
          gsap.fromTo(
            homeCalligraphy,
            { opacity: 1, scale: 1 },
            {
              opacity: 0.1,
              scale: 0.92,
              ease: 'power1.out',
              scrollTrigger: {
                trigger: homeSection,
                start: 'center top',
                end: 'bottom top',
                scrub: 0.6,
              },
            }
          )
        }
      }

      // 2. About Chapter (6–12s entrance, 12–18s active, 18–24s exit into Skills)
      const aboutSection = document.getElementById('about')
      if (aboutSection) {
        const aboutContent = aboutSection.querySelector('.about-left-col')

        if (aboutContent) {
          gsap.fromTo(
            aboutContent,
            { opacity: 0.2, y: 35 },
            {
              opacity: 1,
              y: 0,
              ease: 'power1.out',
              scrollTrigger: {
                trigger: aboutSection,
                start: 'top 85%',
                end: 'top 35%',
                scrub: 0.6,
              },
            }
          )

          gsap.to(aboutContent, {
            opacity: 0.15,
            y: -35,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: aboutSection,
              start: 'center top',
              end: 'bottom top',
              scrub: 0.6,
            },
          })
        }
      }

      // 3. Skills Chapter (18–24s entrance, 24–30s active, 30–36s exit into Projects)
      const skillsSection = document.getElementById('skills')
      if (skillsSection) {
        const skillsPlane = skillsSection.querySelector('.skills-constellation-plane')
        const skillsDock = skillsSection.querySelector('.skills-right-expansion-dock')

        if (skillsPlane) {
          gsap.fromTo(
            skillsPlane,
            { opacity: 0.15, scale: 0.94 },
            {
              opacity: 1,
              scale: 1,
              ease: 'power1.out',
              scrollTrigger: {
                trigger: skillsSection,
                start: 'top 80%',
                end: 'top 30%',
                scrub: 0.6,
              },
            }
          )

          gsap.to(skillsPlane, {
            opacity: 0.15,
            scale: 0.96,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: skillsSection,
              start: 'center top',
              end: 'bottom top',
              scrub: 0.6,
            },
          })
        }

        if (skillsDock) {
          gsap.fromTo(
            skillsDock,
            { opacity: 0.2, x: 25 },
            {
              opacity: 1,
              x: 0,
              ease: 'power1.out',
              scrollTrigger: {
                trigger: skillsSection,
                start: 'top 75%',
                end: 'top 35%',
                scrub: 0.6,
              },
            }
          )
        }
      }

      // 4. Projects Chapter (30–36s entrance, 36–42s active, 42–48s exit into GitHub)
      const projectsSection = document.getElementById('projects')
      if (projectsSection) {
        const projectsDeck = projectsSection.querySelector('.projects-dual-marquee-deck')

        if (projectsDeck) {
          gsap.fromTo(
            projectsDeck,
            { opacity: 0.2, scale: 0.94, y: 40 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              ease: 'power1.out',
              scrollTrigger: {
                trigger: projectsSection,
                start: 'top 85%',
                end: 'top 35%',
                scrub: 0.6,
              },
            }
          )

          gsap.to(projectsDeck, {
            opacity: 0.15,
            y: -30,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: projectsSection,
              start: 'center top',
              end: 'bottom top',
              scrub: 0.6,
            },
          })
        }
      }

      // 5. GitHub Chapter (42–48s entrance, 48–54s exit into Contact)
      const githubSection = document.getElementById('github')
      if (githubSection) {
        const githubCol = githubSection.querySelector('.github-left-title-col')
        const githubCards = githubSection.querySelector('.github-right-stream-col')

        if (githubCol) {
          gsap.fromTo(
            githubCol,
            { opacity: 0.2, x: -30 },
            {
              opacity: 1,
              x: 0,
              ease: 'power1.out',
              scrollTrigger: {
                trigger: githubSection,
                start: 'top 80%',
                end: 'top 35%',
                scrub: 0.6,
              },
            }
          )
        }

        if (githubCards) {
          gsap.fromTo(
            githubCards,
            { opacity: 0.2, scale: 0.95 },
            {
              opacity: 1,
              scale: 1,
              ease: 'power1.out',
              scrollTrigger: {
                trigger: githubSection,
                start: 'top 80%',
                end: 'top 35%',
                scrub: 0.6,
              },
            }
          )
        }
      }

      // 6. Contact Chapter (48–54s entrance, 54–55.91s final resolution)
      const contactSection = document.getElementById('contact')
      if (contactSection) {
        const contactCol = contactSection.querySelector('.contact-left-col')
        const contactMantra = contactSection.querySelector('.contact-dragon-mantra')

        if (contactCol) {
          gsap.fromTo(
            contactCol,
            { opacity: 0.2, y: 30 },
            {
              opacity: 1,
              y: 0,
              ease: 'power1.out',
              scrollTrigger: {
                trigger: contactSection,
                start: 'top 80%',
                end: 'top 40%',
                scrub: 0.6,
              },
            }
          )
        }

        if (contactMantra) {
          gsap.fromTo(
            contactMantra,
            { opacity: 0.2, scale: 0.92 },
            {
              opacity: 1,
              scale: 1,
              ease: 'power1.out',
              scrollTrigger: {
                trigger: contactSection,
                start: 'top 75%',
                end: 'top 40%',
                scrub: 0.6,
              },
            }
          )
        }
      }

      ScrollTrigger.refresh()
    })

    return () => ctx.revert()
  }, [])
}
