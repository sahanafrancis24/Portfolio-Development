import { useState } from 'react'
import { motion } from 'framer-motion'

export function MagneticButton({ children, className = '', onClick, href, target, rel, ...props }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const handleMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - (bounds.left + bounds.width / 2)
    const y = event.clientY - (bounds.top + bounds.height / 2)
    // Subtle 2-4px magnetic attraction
    setOffset({ x: Math.max(-4, Math.min(4, x * 0.12)), y: Math.max(-4, Math.min(4, y * 0.12)) })
  }

  const handleLeave = () => {
    setOffset({ x: 0, y: 0 })
  }

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        className={`magnetic-btn ${className}`.trim()}
        animate={{ x: offset.x, y: offset.y }}
        transition={{ type: 'spring', stiffness: 220, damping: 14 }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        onClick={onClick}
        {...props}
      >
        <span className="btn-content">{children}</span>
        <span className="btn-shine" />
      </motion.a>
    )
  }

  return (
    <motion.button
      className={`magnetic-btn ${className}`.trim()}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: 'spring', stiffness: 220, damping: 14 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      {...props}
    >
      <span className="btn-content">{children}</span>
      <span className="btn-shine" />
    </motion.button>
  )
}
