import { useEffect, useRef } from 'react'

/**
 * useScrollVelocity
 * Measures normalized document scroll velocity using requestAnimationFrame without triggering React re-renders.
 * Exposes velocityRef which can be polled by GSAP ticker or animation frames.
 */
export function useScrollVelocity() {
  const velocityRef = useRef(0)
  const lastScrollY = useRef(0)
  const lastTime = useRef(performance.now())

  useEffect(() => {
    let animFrameId = null

    const handleScroll = () => {
      const now = performance.now()
      const dt = Math.max(1, now - lastTime.current)
      const currentY = window.scrollY
      const dy = currentY - lastScrollY.current

      // Calculate pixels per millisecond, clamped between -5 and 5
      const rawVelocity = dy / dt
      velocityRef.current = Math.max(-5, Math.min(5, rawVelocity))

      lastScrollY.current = currentY
      lastTime.current = now
    }

    // Dampen velocity back to 0 when user stops scrolling
    const dampVelocity = () => {
      if (Math.abs(velocityRef.current) > 0.001) {
        velocityRef.current *= 0.92
      } else {
        velocityRef.current = 0
      }
      animFrameId = requestAnimationFrame(dampVelocity)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    animFrameId = requestAnimationFrame(dampVelocity)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (animFrameId) cancelAnimationFrame(animFrameId)
    }
  }, [])

  return velocityRef
}
