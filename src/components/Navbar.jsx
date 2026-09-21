import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'

export function Navbar({ navItems, activeSection, onNavClick, onBrandClick }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleItemClick = (id) => {
    onNavClick(id)
    setMobileOpen(false)
  }

  return (
    <>
      <header className={`ref-navbar-wrap ${scrolled ? 'is-scrolled' : ''}`}>
        {/* Left: Glowing Brand Pill */}
        <button
          className="nav-brand-pill"
          onClick={onBrandClick}
          aria-label="Sahana F Home"
        >
          <span>Sahana F</span>
        </button>

        {/* Right: Capsule Menu */}
        <nav className="nav-capsule" aria-label="Main Navigation">
          {navItems.map((item) => {
            const isActive = activeSection === item.id
            return (
              <button
                key={item.id}
                className={`capsule-item ${isActive ? 'active' : ''}`}
                onClick={() => handleItemClick(item.id)}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavPill"
                    className="capsule-active-indicator"
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  />
                )}
                <span className="capsule-label">{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="nav-mobile-btn"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
        >
          {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-capsule-drawer"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.22 }}
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`mobile-drawer-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => handleItemClick(item.id)}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
