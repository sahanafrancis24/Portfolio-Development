import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { skillNodes } from '../data/skills'
import { SectionHeaderMeta } from './SectionHeaderMeta'
import { FiCheck, FiX, FiCompass } from 'react-icons/fi'

export function SkillNetwork() {
  const [selectedSkill, setSelectedSkill] = useState(null)

  return (
    <section id="skills" className="ref-skills-stage skills-cinematic-stage">
      {/* Top Editorial Metadata */}
      <SectionHeaderMeta
        number="04"
        title="SKILLS"
        subline={<>KNOWLEDGE SYSTEM<br />8-NODE CONSTELLATION</>}
        rightMeta={[
          'CORE CAPABILITIES',
          'STATIONARY NODES',
          'EXPAND TO EXPLORE',
          '/',
          'REAL EXPERIENCE',
        ]}
      />

      {/* Main Interactive Celestial HUD Viewport */}
      <div className="skills-hud-viewport">
        {/* Left Side: 8-Node Celestial Constellation */}
        <div className="skills-constellation-plane">
          {/* Central Celestial S Core */}
          <div className="central-constellation-core">
            <div className="core-orbit-ring ring-1" />
            <div className="core-orbit-ring ring-2" />
            <div className="core-orbit-ring ring-3" />
            <div className="core-s-badge">
              <span>S</span>
            </div>
          </div>

          {/* SVG Connecting Celestial Rays */}
          <svg className="constellation-svg-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
            {skillNodes.map((node) => (
              <line
                key={`line-${node.id}`}
                x1="35"
                y1="45"
                x2={node.pctX}
                y2={node.pctY}
                stroke={selectedSkill?.id === node.id ? node.color : 'rgba(255, 255, 255, 0.15)'}
                strokeWidth={selectedSkill?.id === node.id ? '0.6' : '0.25'}
                strokeDasharray={selectedSkill?.id === node.id ? 'none' : '1.5 1.5'}
              />
            ))}
          </svg>

          {/* Exactly 8 Stationary Interactive Nodes — Spatially anchored, NEVER moves or disappears */}
          {skillNodes.map((node) => {
            const isSelected = selectedSkill?.id === node.id

            return (
              <button
                key={node.id}
                className={`cosmic-skill-node ${isSelected ? 'is-active' : ''}`}
                style={{
                  left: `${node.pctX}%`,
                  top: `${node.pctY}%`,
                }}
                onMouseEnter={() => setSelectedSkill(node)}
                onClick={() => setSelectedSkill(node)}
                onFocus={() => setSelectedSkill(node)}
                aria-label={`Explore ${node.title}`}
              >
                <div
                  className="node-pulse-pip"
                  style={{
                    backgroundColor: node.color,
                    boxShadow: `0 0 16px ${node.color}`,
                  }}
                />
                <div className="node-text-plate">
                  <span className="node-title-text" style={{ color: isSelected ? node.color : '#ffffff' }}>
                    {node.name}
                  </span>
                  <span className="node-sub-tools">{node.subtitle?.split('·')[0]}</span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Right Side: Smooth Expansion Information Panel */}
        <div className="skills-right-expansion-dock">
          <AnimatePresence mode="wait">
            {selectedSkill ? (
              <motion.div
                key={selectedSkill.id}
                className="skills-native-expansion-card"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                style={{ borderColor: selectedSkill.color }}
              >
                <div className="expansion-top-row">
                  <div
                    className="expansion-category-pill"
                    style={{ color: selectedSkill.color, borderColor: `${selectedSkill.color}55` }}
                  >
                    <span className="cat-dot" style={{ backgroundColor: selectedSkill.color }} />
                    <span>{selectedSkill.category}</span>
                  </div>

                  <button
                    className="expansion-close-btn"
                    onClick={() => setSelectedSkill(null)}
                    aria-label="Close skill details"
                  >
                    <FiX size={14} />
                  </button>
                </div>

                <h3 className="expansion-title" style={{ color: selectedSkill.color }}>
                  {selectedSkill.heading || selectedSkill.title}
                </h3>

                <span className="expansion-sub-tools">{selectedSkill.subtitle}</span>

                <div className="expansion-summary-wrap">
                  {selectedSkill.summary.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="expansion-summary">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Core Toolset Badges */}
                <div className="expansion-section">
                  <span className="section-label">
                    {selectedSkill.id === 'threeD' ? 'SPECIALIZATION TAGS' : 'CORE TOOLSET'}
                  </span>
                  <div className="expansion-badges-row">
                    {selectedSkill.techs.map((t) => (
                      <span key={t} className="tech-badge">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Strengths / Capabilities */}
                <div className="expansion-section">
                  <span className="section-label">KEY CAPABILITIES</span>
                  <ul className="expansion-strengths-list">
                    {selectedSkill.strengths.map((s) => (
                      <li key={s} className="strength-item">
                        <FiCheck size={12} color={selectedSkill.color} />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Connected Projects */}
                <div className="expansion-section">
                  <span className="section-label">CONNECTED WORLDS</span>
                  <div className="expansion-projects-row">
                    {selectedSkill.projects.map((p) => (
                      <span key={p} className="project-tag">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="idle-state"
                className="skills-native-expansion-card skills-idle-card"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="idle-content-box">
                  <FiCompass className="idle-icon" size={28} />
                  <span className="idle-subline">LEARN • BUILD • EXPLORE</span>
                  <h4 className="idle-heading">
                    SELECT A SKILL <br />
                    <span>TO EXPLORE</span>
                  </h4>
                  <p className="idle-desc">
                    Hover or click any orbital node in the constellation to reveal technical architecture,
                    frameworks, and connected project implementations.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
