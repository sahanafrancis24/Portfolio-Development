import { motion } from 'framer-motion'
import { SectionHeaderMeta } from './SectionHeaderMeta'

const aboutNodes = [
  {
    id: 'bio',
    title: 'BIOINFORMATICS',
    sub: '(DOMAIN KNOWLEDGE)',
  },
  {
    id: 'creative',
    title: 'CREATIVE DEVELOPMENT',
    sub: '(UI / UX / INTERACTIVE WEB)',
  },
  {
    id: 'problem',
    title: 'PROBLEM SOLVING',
    sub: '(REAL WORLD APPLICATIONS)',
  },
]

export function AboutExperience() {
  return (
    <section id="about" className="ref-about-stage">
      {/* Top Editorial Metadata */}
      <SectionHeaderMeta
        number="02"
        title="ABOUT"
        subline={<>MORE CREATIVE<br />STORY-DRIVEN</>}
        rightMeta={[
          'SAME PERSON.',
          'DIFFERENT DIMENSIONS.',
          '/',
        ]}
      />

      <div className="about-editorial-grid">
        {/* Left Column: Bold Kinetic Editorial Typography */}
        <div className="about-editorial-left">
          <motion.h2
            className="about-statement-hero"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            <span className="statement-row">I DON&apos;T JUST</span>
            <span className="statement-row text-white">BUILD WEBSITES.</span>
            <span className="statement-row text-cyan">I BUILD</span>
            <span className="statement-row text-magenta">DIGITAL</span>
            <span className="statement-row text-magenta">EXPERIENCES.</span>
          </motion.h2>

          <motion.p
            className="about-bio-paragraph"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.8 }}
          >
            I&apos;m Sahana F, a Bioinformatics student and creative developer who loves combining
            science, technology and design to build meaningful digital experiences.
          </motion.p>

          <div className="about-scroll-cue">
            <span>↓ SCROLL</span>
          </div>
        </div>

        {/* Right Column: 3 Floating Glowing Story Nodes */}
        <div className="about-nodes-right">
          <div className="nodes-stack-track">
            {/* SVG Connecting Vertical/Angled Line */}
            <svg className="nodes-svg-connector" viewBox="0 0 40 220" preserveAspectRatio="none">
              <line
                x1="20"
                y1="25"
                x2="20"
                y2="195"
                stroke="rgba(180, 70, 255, 0.4)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
            </svg>

            {aboutNodes.map((node, index) => (
              <motion.div
                key={node.id}
                className="floating-story-node"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.2, duration: 0.6 }}
              >
                <div className="node-orb-core">
                  <span className="node-orb-inner" />
                </div>
                <div className="node-label-group">
                  <h3 className="node-heading">{node.title}</h3>
                  <span className="node-subheading">{node.sub}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
