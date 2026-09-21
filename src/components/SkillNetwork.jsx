import { useState } from 'react'
import { motion } from 'framer-motion'
import { SectionHeaderMeta } from './SectionHeaderMeta'
import { skillNodes } from '../data/skills'

export function SkillNetwork() {
  const [selectedSkill, setSelectedSkill] = useState(skillNodes[0])

  return (
    <section id="skills" className="ref-skills-stage">
      {/* Top Editorial Metadata */}
      <SectionHeaderMeta
        number="04"
        title="SKILLS"
        subline={<>INTERACTIVE<br />SKILL UNIVERSE</>}
        rightMeta={[
          'DISCIPLINES',
          'CONNECT',
          'IDEAS',
          '/',
        ]}
      />

      <div className="skills-editorial-container">
        {/* Left Title Block */}
        <div className="skills-left-heading">
          <h2 className="skills-big-word">SKILLS</h2>
          <span className="skills-sub-word">A LIVING NETWORK</span>
        </div>

        {/* Center: Planetary Constellation Orbit */}
        <div className="skills-constellation-center">
          <div className="constellation-canvas-box">
            {/* Concentric Elliptical Orbital Rings */}
            <div className="orbit-ellipse ellipse-1" />
            <div className="orbit-ellipse ellipse-2" />
            <div className="orbit-ellipse ellipse-3" />

            {/* Connecting SVG Rays between nodes and center */}
            <svg className="constellation-ray-svg" viewBox="-260 -180 520 360">
              {skillNodes.map((node) => {
                const rad = (node.angle * Math.PI) / 180
                // Elliptical scale for cosmic perspective
                const x = Math.cos(rad) * (node.distance * 1.05)
                const y = Math.sin(rad) * (node.distance * 0.58)
                const isSelected = selectedSkill?.id === node.id

                return (
                  <line
                    key={`ray-${node.id}`}
                    x1={0}
                    y1={0}
                    x2={x}
                    y2={y}
                    stroke={isSelected ? '#00f5ff' : 'rgba(120, 90, 255, 0.18)'}
                    strokeWidth={isSelected ? 1.8 : 0.8}
                    strokeDasharray={isSelected ? 'none' : '3 3'}
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
              const y = Math.sin(rad) * (node.distance * 0.58)
              const isSelected = selectedSkill?.id === node.id

              return (
                <div
                  key={node.id}
                  className={`constellation-node-pill ${isSelected ? 'is-active' : ''}`}
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                  }}
                  onMouseEnter={() => setSelectedSkill(node)}
                  onClick={() => setSelectedSkill(node)}
                  role="button"
                  tabIndex={0}
                  aria-label={node.name}
                >
                  <span
                    className="node-pip"
                    style={{ backgroundColor: isSelected ? '#00f5ff' : '#a288ff' }}
                  />
                  <span className="node-text">{node.name}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right: Interactive Telemetry HUD Card */}
        <div className="skills-hud-right">
          <div className="hud-telemetry-box">
            <div className="hud-top-prompt">
              <span className="hud-prompt-label">HOVER A SKILL</span>
              <span className="hud-prompt-sub">EXPLORE ITS WORLD</span>
            </div>

            <div className="hud-content-view">
              <div className="hud-skill-heading">
                <span className="hud-active-dot" />
                <h3 className="hud-skill-title">{selectedSkill.name}</h3>
              </div>

              <p className="hud-skill-desc">{selectedSkill.summary}</p>

              {/* Waveform graphic matching reference */}
              <div className="hud-telemetry-graphic" aria-hidden="true">
                <span className="bar bar-1" />
                <span className="bar bar-2" />
                <span className="bar bar-3" />
                <span className="bar bar-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
