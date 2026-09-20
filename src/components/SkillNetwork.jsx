import { useState } from 'react'
import { motion } from 'framer-motion'
import { SectionLabel } from './SectionLabel'
import { centralNode, skillNodes } from '../data/skills'
import { FiCheckCircle } from 'react-icons/fi'

export function SkillNetwork() {
  const [activeSkill, setActiveSkill] = useState(skillNodes[0])

  return (
    <section id="skills" className="skill-constellation-section">
      <SectionLabel
        number="04"
        label="SKILLS"
        subtitle="LIVING TECHNOLOGICAL CONSTELLATION // NEURAL GRAPH"
      />

      <div className="constellation-grid-layout">
        {/* Left / Center: Interactive Constellation Graph */}
        <div className="constellation-viewport">
          <div className="constellation-orbit-stage">
            {/* Concentric Orbital Rings */}
            <div className="orbit-ring orbit-ring-inner" />
            <div className="orbit-ring orbit-ring-mid" />
            <div className="orbit-ring orbit-ring-outer" />

            {/* SVG Connecting Vectors */}
            <svg className="constellation-svg" viewBox="-280 -280 560 560">
              <defs>
                <linearGradient id="coreRayGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00f5ff" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#7b2ff7" stopOpacity="0.1" />
                </linearGradient>
              </defs>

              {skillNodes.map((node) => {
                const rad = (node.angle * Math.PI) / 180
                const x = Math.cos(rad) * node.distance
                const y = Math.sin(rad) * node.distance
                const isFocused = activeSkill?.id === node.id

                return (
                  <g key={`line-${node.id}`}>
                    <line
                      x1={0}
                      y1={0}
                      x2={x}
                      y2={y}
                      stroke={isFocused ? node.color : 'rgba(255, 255, 255, 0.12)'}
                      strokeWidth={isFocused ? 2 : 1}
                      strokeDasharray={isFocused ? 'none' : '4 4'}
                      className="constellation-ray"
                    />
                    {isFocused && (
                      <circle cx={x * 0.5} cy={y * 0.5} r={2.5} fill={node.color}>
                        <animate
                          attributeName="opacity"
                          values="0.2;1;0.2"
                          dur="1.8s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    )}
                  </g>
                )
              })}
            </svg>

            {/* Central Node 'S' */}
            <motion.div
              className="central-core-node"
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              onClick={() => setActiveSkill(null)}
              tabIndex={0}
              role="button"
              aria-label="Core Hub"
            >
              <div className="core-glow-aura" />
              <div className="core-symbol-disc">
                <span className="core-s-letter">{centralNode.label}</span>
              </div>
            </motion.div>

            {/* Orbiting Satellite Nodes */}
            {skillNodes.map((node) => {
              const rad = (node.angle * Math.PI) / 180
              const x = Math.cos(rad) * node.distance
              const y = Math.sin(rad) * node.distance
              const isSelected = activeSkill?.id === node.id

              return (
                <motion.div
                  key={node.id}
                  className={`skill-satellite-node ${isSelected ? 'is-selected' : ''}`}
                  style={{
                    transform: `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), 0)`,
                  }}
                  onMouseEnter={() => setActiveSkill(node)}
                  onClick={() => setActiveSkill(node)}
                  tabIndex={0}
                  role="button"
                  aria-label={node.name}
                  whileHover={{ scale: 1.15 }}
                >
                  <div
                    className="satellite-orb"
                    style={{
                      borderColor: isSelected ? node.color : 'rgba(255, 255, 255, 0.22)',
                      boxShadow: isSelected ? `0 0 20px ${node.color}` : 'none',
                    }}
                  >
                    <div
                      className="orb-pip"
                      style={{ backgroundColor: isSelected ? node.color : '#ffffff' }}
                    />
                  </div>
                  <span className="satellite-label">{node.name}</span>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Right: Contextual Intelligence Panel */}
        <div className="constellation-sidebar">
          {activeSkill ? (
            <motion.div
              key={activeSkill.id}
              className="skill-intel-panel glass-panel"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="intel-badge-row">
                <span
                  className="intel-cat-tag"
                  style={{ borderColor: activeSkill.color, color: activeSkill.color }}
                >
                  {activeSkill.category}
                </span>
              </div>

              <h3 className="intel-title" style={{ color: activeSkill.color }}>
                {activeSkill.name}
              </h3>

              <p className="intel-summary">{activeSkill.summary}</p>

              <div className="intel-details-list">
                <h4 className="details-header">KEY CAPABILITIES & WORKFLOWS</h4>
                {activeSkill.details.map((detail, idx) => (
                  <div key={idx} className="detail-item">
                    <FiCheckCircle size={14} color={activeSkill.color} />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="skill-intel-panel glass-panel empty-state">
              <h3 className="intel-title">{centralNode.title}</h3>
              <p className="intel-summary">{centralNode.description}</p>
              <p className="hint-text">Hover or click any orbital node to inspect domain telemetry.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
