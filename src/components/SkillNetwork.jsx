import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { skillNodes } from '../data/skills'
import { FiCheck, FiX, FiCompass } from 'react-icons/fi'

export function SkillNetwork() {
  const [selectedSkill, setSelectedSkill] = useState(null)

  return (
    <section id="skills" className="ref-skills-stage skills-clean-stage">
      {/* Container maintaining the exact 1536x1024 aspect ratio of skills.png */}
      <div className="skills-canvas-viewport">
        {/* Background Image containing the artwork, baked-in constellation, labels, and right panel frame */}
        <img
          src="/skills.png"
          alt="Skills Constellation Universe"
          className="skills-native-image"
          loading="lazy"
        />

        {/* Minimal Non-Intrusive Top Index Tag (04 / SKILLS) */}
        <div className="skills-minimal-top-index">
          <span className="sk-num">04</span>
          <span className="sk-slash">/</span>
          <span className="sk-word">SKILLS</span>
        </div>

        {/* Exactly 8 Stationary Hotspot Pins — Spatially anchored, NEVER moves or disappears */}
        {skillNodes.map((node) => {
          const isSelected = selectedSkill?.id === node.id

          return (
            <button
              key={node.id}
              className={`invisible-skill-hotspot ${isSelected ? 'is-active' : ''}`}
              style={{
                left: `${node.pctX}%`,
                top: `${node.pctY}%`,
              }}
              onMouseEnter={() => setSelectedSkill(node)}
              onClick={() => setSelectedSkill(node)}
              onFocus={() => setSelectedSkill(node)}
              aria-label={`Explore ${node.title}`}
            >
              {/* Subtle halo ring that illuminates on hover/active to show interactivity */}
              <span
                className="hotspot-hover-aura"
                style={{
                  borderColor: node.color,
                  boxShadow: `0 0 24px ${node.color}, inset 0 0 12px ${node.color}`,
                }}
              />
            </button>
          )
        })}

        {/* Right Expansion Panel — Fits inside the artwork frame with smooth content transitions */}
        <div className="skills-right-expansion-dock">
          <AnimatePresence mode="wait">
            {selectedSkill ? (
              <motion.div
                key={selectedSkill.id}
                className="skills-native-expansion-card"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
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
