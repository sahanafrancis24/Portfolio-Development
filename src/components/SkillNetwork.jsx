import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionHeaderMeta } from './SectionHeaderMeta'
import { skillNodes } from '../data/skills'
import {
  FiCode,
  FiServer,
  FiDatabase,
  FiTerminal,
  FiCpu,
  FiLayers,
  FiActivity,
  FiBox,
  FiCheck,
  FiCompass,
} from 'react-icons/fi'

const iconMap = {
  FiCode: FiCode,
  FiServer: FiServer,
  FiDatabase: FiDatabase,
  FiTerminal: FiTerminal,
  FiCpu: FiCpu,
  FiLayers: FiLayers,
  FiActivity: FiActivity,
  FiBox: FiBox,
}

export function SkillNetwork() {
  const [selectedSkill, setSelectedSkill] = useState(null)

  return (
    <section id="skills" className="ref-skills-stage">
      {/* Background Media */}
      <div className="section-media-bg">
        <img
          src="/skills.png"
          alt="Skills Universe Background"
          className="section-bg-image"
          loading="lazy"
        />
        <div className="skills-vignette-overlay" />
      </div>

      {/* Top Editorial Metadata */}
      <SectionHeaderMeta
        number="02"
        title="SKILLS"
        subline={<>A UNIVERSE<br />OF TOOLS</>}
        rightMeta={[
          'DISCIPLINES',
          'CONNECT',
          'IDEAS',
          'WORLDS',
          '/',
          'EXPLORE MY UNIVERSE',
        ]}
      />

      <div className="skills-stage-layout">
        {/* Left Column: Heading & Subtext */}
        <div className="skills-left-narrative">
          <span className="skills-kicker-label">EXPLORE MY UNIVERSE</span>
          <h2 className="skills-stage-title">
            A UNIVERSE <br />
            <span className="text-magenta">OF TOOLS</span>
          </h2>
          <p className="skills-intro-paragraph">
            Hover over any discipline in the constellation to explore its core stack, architectural
            strengths, and connected project domains.
          </p>
          <div className="skills-hint-pill">
            <span className="hint-pulse-dot" />
            <span>8 Interactive Constellation Nodes</span>
          </div>
        </div>

        {/* Center: Planetary Constellation Orbit */}
        <div className="skills-constellation-center">
          <div className="constellation-canvas-box">
            {/* Concentric Elliptical Orbital Rings */}
            <div className="orbit-ellipse ellipse-1" />
            <div className="orbit-ellipse ellipse-2" />
            <div className="orbit-ellipse ellipse-3" />

            {/* Connecting SVG Rays between nodes and center */}
            <svg className="constellation-ray-svg" viewBox="-280 -200 560 400">
              {skillNodes.map((node) => {
                const rad = (node.angle * Math.PI) / 180
                const x = Math.cos(rad) * (node.distance * 1.05)
                const y = Math.sin(rad) * (node.distance * 0.6)
                const isSelected = selectedSkill?.id === node.id

                return (
                  <line
                    key={`ray-${node.id}`}
                    x1={0}
                    y1={0}
                    x2={x}
                    y2={y}
                    stroke={isSelected ? node.color : 'rgba(140, 100, 255, 0.22)'}
                    strokeWidth={isSelected ? 2 : 0.9}
                    strokeDasharray={isSelected ? 'none' : '3 4'}
                    style={{ transition: 'all 0.35s ease' }}
                  />
                )
              })}
            </svg>

            {/* Central Core S Sphere */}
            <div className="central-galaxy-core" aria-hidden="true">
              <div className="core-corona-glow" />
              <div className="core-orb-disc">
                <span className="core-s-symbol">S</span>
              </div>
            </div>

            {/* Spatially Stable Satellite Nodes (NEVER move or fly into S) */}
            {skillNodes.map((node) => {
              const rad = (node.angle * Math.PI) / 180
              const x = Math.cos(rad) * (node.distance * 1.05)
              const y = Math.sin(rad) * (node.distance * 0.6)
              const isSelected = selectedSkill?.id === node.id
              const IconComponent = iconMap[node.icon] || FiCode

              return (
                <div
                  key={node.id}
                  className={`constellation-node-wrapper ${isSelected ? 'is-active' : ''}`}
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                  }}
                  onMouseEnter={() => setSelectedSkill(node)}
                  onClick={() => setSelectedSkill(node)}
                  role="button"
                  tabIndex={0}
                  aria-label={`${node.title} Skill Node`}
                >
                  {/* Glowing Node Circle with Icon */}
                  <div
                    className="node-circle-disc"
                    style={{
                      borderColor: isSelected ? node.color : 'rgba(255, 255, 255, 0.25)',
                      boxShadow: isSelected
                        ? `0 0 24px ${node.color}, inset 0 0 12px ${node.color}`
                        : '0 0 10px rgba(0, 0, 0, 0.5)',
                    }}
                  >
                    <IconComponent
                      size={18}
                      color={isSelected ? '#ffffff' : node.color}
                      className="node-disc-icon"
                    />
                  </div>

                  {/* Sharp HTML Labels pinned firmly with the node */}
                  <div className="node-text-plate">
                    <span className="node-label-title" style={{ color: isSelected ? node.color : '#ffffff' }}>
                      {node.title}
                    </span>
                    <span className="node-label-sub">{node.subtitle}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right: The Reference Explore Panel */}
        <div className="skills-hud-right">
          <div className="hud-telemetry-box" style={{ borderColor: selectedSkill ? selectedSkill.color : 'rgba(140, 100, 255, 0.35)' }}>
            <AnimatePresence mode="wait">
              {selectedSkill ? (
                <motion.div
                  key={selectedSkill.id}
                  className="hud-active-details"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="hud-category-pill" style={{ color: selectedSkill.color, borderColor: `${selectedSkill.color}55` }}>
                    <span className="hud-pill-dot" style={{ backgroundColor: selectedSkill.color }} />
                    <span>{selectedSkill.category}</span>
                  </div>

                  <h3 className="hud-expanded-title" style={{ color: selectedSkill.color }}>
                    {selectedSkill.title}
                  </h3>

                  <p className="hud-expanded-summary">{selectedSkill.summary}</p>

                  {/* Core Stack Badges */}
                  <div className="hud-section-group">
                    <span className="hud-group-label">CORE TOOLSET</span>
                    <div className="hud-tech-badges">
                      {selectedSkill.techs.map((t) => (
                        <span key={t} className="tech-badge-item">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Strengths / Capabilities */}
                  <div className="hud-section-group">
                    <span className="hud-group-label">KEY CAPABILITIES</span>
                    <ul className="hud-strengths-list">
                      {selectedSkill.strengths.map((s) => (
                        <li key={s} className="hud-strength-item">
                          <FiCheck size={12} color={selectedSkill.color} />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Connected Projects */}
                  <div className="hud-section-group">
                    <span className="hud-group-label">CONNECTED WORLDS</span>
                    <div className="hud-projects-row">
                      {selectedSkill.projects.map((p) => (
                        <span key={p} className="hud-project-tag">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="idle-explore"
                  className="hud-idle-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="idle-star-symbol">✦</div>
                  <h3 className="idle-prompt-title">SELECT A SKILL</h3>
                  <span className="idle-prompt-sub">TO EXPLORE</span>
                  <p className="idle-prompt-desc">
                    Hover or tap any of the 8 planetary nodes in the universe to reveal deep-dive
                    engineering telemetry.
                  </p>
                  <div className="idle-hud-footer">
                    <span>LEARN</span>
                    <span className="sep">•</span>
                    <span>BUILD</span>
                    <span className="sep">•</span>
                    <span>EXPLORE</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

