import { useState } from 'react'
import { motion } from 'framer-motion'
import { SectionLabel } from './SectionLabel'
import { FiCpu, FiGlobe, FiCode, FiArrowRight } from 'react-icons/fi'

const storyNodes = [
  {
    id: 'bioinformatics',
    title: 'BIOINFORMATICS',
    subtitle: 'Domain Knowledge & Data',
    icon: FiCpu,
    color: '#ff007f',
    x: '15%',
    y: '20%',
    description:
      'Applying scientific computational methodology, structural biology (PyMOL, BLAST), and biological data algorithms to complex software engineering.',
  },
  {
    id: 'creative',
    title: 'CREATIVE DEVELOPMENT',
    subtitle: 'UI / UX / Interactive Web',
    icon: FiGlobe,
    color: '#00f5ff',
    x: '75%',
    y: '35%',
    description:
      'Designing spatial, responsive, 3D WebGL interfaces with React Three Fiber, fluid motion, and strict attention to micro-typography.',
  },
  {
    id: 'problem-solving',
    title: 'PROBLEM SOLVING',
    subtitle: 'Real-World Applications',
    icon: FiCode,
    color: '#7b2ff7',
    x: '45%',
    y: '78%',
    description:
      'Architecting full-stack digital platforms with scalable APIs, maintainable data structures, and intuitive checkout & booking flows.',
  },
]

export function AboutExperience() {
  const [activeNode, setActiveNode] = useState(storyNodes[0])

  return (
    <section id="about" className="about-experience-section">
      <SectionLabel
        number="02"
        label="ABOUT"
        subtitle="INTERACTION ARCHITECTURE // PHILOSOPHY"
      />

      <div className="about-layout-grid">
        {/* Left: Kinetic Editorial Statement */}
        <motion.div
          className="about-typography-col"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2 className="about-big-statement">
            I DON'T JUST <br />
            BUILD WEBSITES. <br />
            <span className="statement-gradient">I BUILD DIGITAL EXPERIENCES.</span>
          </h2>

          <p className="about-narrative">
            With a unique dual foundation in <strong>Bioinformatics</strong> and <strong>Full-Stack Web Engineering</strong>, 
            I bridge analytical data structures with high-end creative web experiences. Every project is engineered 
            for performance, fluid interactivity, and intuitive human response.
          </p>

          {/* Triad Horizontal Strip */}
          <div className="about-triad-strip">
            <span className="triad-item">BIOINFORMATICS</span>
            <span className="triad-cross">×</span>
            <span className="triad-item">CREATIVE TECH</span>
            <span className="triad-cross">×</span>
            <span className="triad-item">INTERACTIVE WEB</span>
          </div>
        </motion.div>

        {/* Right: Connected Constellation Story Nodes */}
        <div className="about-nodes-col">
          <div className="story-network-canvas">
            {/* SVG Connection Lines */}
            <svg className="story-lines-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Path from Node 0 (15,20) to Node 1 (75,35) */}
              <motion.path
                d="M 22 25 L 75 35"
                className="network-line"
                stroke={activeNode?.id === 'bioinformatics' || activeNode?.id === 'creative' ? '#00f5ff' : 'rgba(255,255,255,0.15)'}
                strokeWidth="1.2"
                strokeDasharray="3 3"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
              />
              {/* Path from Node 1 (75,35) to Node 2 (45,78) */}
              <motion.path
                d="M 75 35 L 45 78"
                className="network-line"
                stroke={activeNode?.id === 'creative' || activeNode?.id === 'problem-solving' ? '#7b2ff7' : 'rgba(255,255,255,0.15)'}
                strokeWidth="1.2"
                strokeDasharray="3 3"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.4, ease: 'easeInOut' }}
              />
              {/* Path from Node 2 (45,78) to Node 0 (15,20) */}
              <motion.path
                d="M 45 78 L 22 25"
                className="network-line"
                stroke={activeNode?.id === 'problem-solving' || activeNode?.id === 'bioinformatics' ? '#ff007f' : 'rgba(255,255,255,0.15)'}
                strokeWidth="1.2"
                strokeDasharray="3 3"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.8, ease: 'easeInOut' }}
              />
            </svg>

            {/* Interactive Nodes */}
            {storyNodes.map((node, index) => {
              const Icon = node.icon
              const isSelected = activeNode?.id === node.id

              return (
                <motion.div
                  key={node.id}
                  className={`story-node-anchor ${isSelected ? 'active' : ''}`}
                  style={{ left: node.x, top: node.y }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.3, type: 'spring', stiffness: 200 }}
                  onMouseEnter={() => setActiveNode(node)}
                  onClick={() => setActiveNode(node)}
                  tabIndex={0}
                  role="button"
                  aria-label={node.title}
                >
                  <div
                    className="story-node-orb"
                    style={{
                      borderColor: isSelected ? node.color : 'rgba(255,255,255,0.25)',
                      boxShadow: isSelected ? `0 0 24px ${node.color}` : 'none',
                    }}
                  >
                    <Icon size={18} color={isSelected ? node.color : '#ffffff'} />
                  </div>
                  <span className="story-node-tag">{node.title}</span>
                </motion.div>
              )
            })}
          </div>

          {/* Contextual Intelligence Summary Box */}
          {activeNode && (
            <motion.div
              key={activeNode.id}
              className="node-intelligence-card glass-panel"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="intel-card-header">
                <span className="intel-pill" style={{ borderColor: activeNode.color, color: activeNode.color }}>
                  {activeNode.title}
                </span>
                <span className="intel-subtitle">{activeNode.subtitle}</span>
              </div>
              <p className="intel-desc">{activeNode.description}</p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
