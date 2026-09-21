import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { skillNodes } from '../data/skills'
import { FiCheck, FiX } from 'react-icons/fi'

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

        {/* Minimal Non-Intrusive Top Index Tag */}
        <div className="skills-minimal-top-index">
          <span className="sk-num">03</span>
          <span className="sk-slash">/</span>
          <span className="sk-word">SKILLS</span>
        </div>

        {/* The 8 INVISIBLE Mapped Hotspot Pins (Zero duplicate text, Zero duplicate circles) */}
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

        {/* The Right Expansion Panel — Fits EXACTLY inside the existing framed box in skills.png */}
        <div className="skills-right-expansion-dock">
          <AnimatePresence mode="wait">
            {selectedSkill && (
              <motion.div
                key={selectedSkill.id}
                className="skills-native-expansion-card"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
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
                  {selectedSkill.title}
                </h3>

                <span className="expansion-sub-tools">{selectedSkill.subtitle}</span>

                <p className="expansion-summary">{selectedSkill.summary}</p>

                {/* Core Toolset Badges */}
                <div className="expansion-section">
                  <span className="section-label">CORE TOOLSET</span>
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
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}


