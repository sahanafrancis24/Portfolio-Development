import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/**
 * CinematicText
 * Provides editorial clip-path line reveals, word-by-word reveals, or technical telemetry styling.
 * 
 * revealType: 'clip-line' | 'words' | 'fade-up'
 */
export function CinematicText({
  children,
  as: Component = 'div',
  revealType = 'clip-line',
  className = '',
  delay = 0,
  duration = 0.8,
  staggerDelay = 0.04,
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.25 })

  if (revealType === 'words' && typeof children === 'string') {
    const words = children.split(' ')
    return (
      <Component ref={ref} className={`cinematic-word-wrapper ${className}`}>
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className="cinematic-word-slot">
            <motion.span
              className="cinematic-word-inner"
              initial={{ y: '100%', opacity: 0 }}
              animate={isInView ? { y: '0%', opacity: 1 } : { y: '100%', opacity: 0 }}
              transition={{
                duration: 0.6,
                delay: delay + i * staggerDelay,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}&nbsp;
            </motion.span>
          </span>
        ))}
      </Component>
    )
  }

  if (revealType === 'clip-line') {
    return (
      <Component ref={ref} className={`cinematic-line-reveal-box ${className}`}>
        <motion.div
          className="cinematic-line-reveal-inner"
          initial={{
            clipPath: 'inset(100% 0% 0% 0%)',
            y: 35,
            opacity: 0,
          }}
          animate={
            isInView
              ? {
                  clipPath: 'inset(0% 0% 0% 0%)',
                  y: 0,
                  opacity: 1,
                }
              : {
                  clipPath: 'inset(100% 0% 0% 0%)',
                  y: 35,
                  opacity: 0,
                }
          }
          transition={{
            duration,
            delay,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {children}
        </motion.div>
      </Component>
    )
  }

  // Default fade-up
  return (
    <Component ref={ref} className={className}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </Component>
  )
}
