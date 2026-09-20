import { useEffect, useState, useRef } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [cursorType, setCursorType] = useState('default') // 'default' | 'hover' | 'view' | 'source' | 'drag'
  const [isVisible, setIsVisible] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Spring physics for smooth outer trailing ring
  const ringX = useSpring(mouseX, { stiffness: 400, damping: 28 })
  const ringY = useSpring(mouseY, { stiffness: 400, damping: 28 })

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isTouch || prefersReduced) {
      setEnabled(false)
      return
    }
    setEnabled(true)

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisible) setIsVisible(true)

      // Inspect target element for cursor types
      const target = e.target.closest('[data-cursor]')
      if (target) {
        setCursorType(target.getAttribute('data-cursor'))
      } else if (e.target.closest('a, button, [role="button"], input, textarea')) {
        setCursorType('hover')
      } else {
        setCursorType('default')
      }
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [isVisible, mouseX, mouseY])

  if (!enabled) return null

  // Dimension & state mapping
  const ringVariants = {
    default: {
      width: 32,
      height: 32,
      backgroundColor: 'rgba(0, 245, 255, 0.04)',
      borderColor: 'rgba(0, 245, 255, 0.35)',
    },
    hover: {
      width: 44,
      height: 44,
      backgroundColor: 'rgba(123, 47, 247, 0.12)',
      borderColor: 'rgba(123, 47, 247, 0.6)',
    },
    view: {
      width: 68,
      height: 68,
      backgroundColor: 'rgba(0, 245, 255, 0.22)',
      borderColor: 'rgba(0, 245, 255, 0.9)',
    },
    source: {
      width: 76,
      height: 76,
      backgroundColor: 'rgba(123, 47, 247, 0.25)',
      borderColor: 'rgba(249, 83, 198, 0.9)',
    },
    drag: {
      width: 56,
      height: 56,
      backgroundColor: 'rgba(255, 170, 0, 0.2)',
      borderColor: 'rgba(255, 170, 0, 0.8)',
    },
  }

  const showLabel = cursorType === 'view' || cursorType === 'source' || cursorType === 'drag'
  const labelText =
    cursorType === 'view' ? 'VIEW ↗' : cursorType === 'source' ? 'SOURCE ↗' : cursorType === 'drag' ? 'DRAG' : ''

  return (
    <div className="custom-cursor-container" aria-hidden="true">
      {/* Outer Spring Ring */}
      <motion.div
        className="cursor-outer-ring"
        style={{
          x: ringX,
          y: ringY,
          opacity: isVisible ? 1 : 0,
        }}
        variants={ringVariants}
        animate={cursorType}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      >
        {showLabel && <span className="cursor-label">{labelText}</span>}
      </motion.div>

      {/* Center Cyan Dot */}
      <motion.div
        className="cursor-center-dot"
        style={{
          x: mouseX,
          y: mouseY,
          opacity: isVisible && !showLabel ? 1 : 0,
        }}
      />
    </div>
  )
}
