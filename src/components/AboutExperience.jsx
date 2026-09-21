import { motion } from 'framer-motion'
import { SectionHeaderMeta } from './SectionHeaderMeta'
import {
  FiBox,
  FiTrendingUp,
  FiLayout,
  FiFigma,
  FiSmartphone,
  FiServer,
  FiActivity,
  FiAward,
} from 'react-icons/fi'

const capabilities = [
  { id: '1', title: 'Real project implementation', icon: FiBox },
  { id: '2', title: 'Growth-focused engineering mindset', icon: FiTrendingUp },
  { id: '3', title: 'UI & Frontend Development', icon: FiLayout },
  { id: '4', title: 'Design & Prototyping', icon: FiFigma },
  { id: '5', title: 'Responsive & Interactive Experiences', icon: FiSmartphone },
  { id: '6', title: 'Practical Full-Stack Development', icon: FiServer },
  { id: '7', title: 'Bioinformatics + Tech Perspective', icon: FiActivity },
  { id: '8', title: 'Continuous Growth', icon: FiAward },
]

export function AboutExperience() {
  return (
    <section id="about" className="ref-about-stage">
      {/* Background Media: about.mp4 */}
      <div className="section-media-bg">
        <video autoPlay loop muted playsInline className="section-bg-video">
          <source src="/about.mp4" type="video/mp4" />
        </video>
        <div className="about-vignette-overlay" />
      </div>

      {/* Top Editorial Metadata */}
      <SectionHeaderMeta
        number="01"
        title="ABOUT"
        subline={<>BUILDING A<br />BRIGHTER TOMORROW</>}
        rightMeta={[
          'SAME PERSON.',
          'DIFFERENT DIMENSIONS.',
          '/',
          'BIOINFORMATICS & TECH',
        ]}
      />

      <div className="about-artdirected-layout">
        {/* Left Column: Heading, Narrative, and 8 Capability Pills */}
        <div className="about-left-col">
          <span className="about-kicker-label">ABOUT ME</span>

          <motion.h2
            className="about-headline-title"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            BUILDING <br />
            <span className="text-magenta">A BRIGHTER TOMORROW</span>
          </motion.h2>

          <motion.p
            className="about-narrative-paragraph"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.8 }}
          >
            I am passionate about building modern web applications and creating intuitive user
            interfaces. With a strong foundation in programming and problem-solving, I focus on
            developing responsive, efficient, and user-friendly digital solutions. I also bring a
            unique perspective by combining technology with domain knowledge in Bioinformatics.
          </motion.p>

          {/* 8 Capability Badges Grid */}
          <motion.div
            className="about-capabilities-grid"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {capabilities.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.id} className="about-capability-chip">
                  <div className="chip-icon-box">
                    <Icon size={14} />
                  </div>
                  <span className="chip-title">{item.title}</span>
                </div>
              )
            })}
          </motion.div>
        </div>

        {/* Right Column: Kept clear for the character & portal in about.mp4 */}
        <div className="about-right-col">
          <motion.div
            className="about-art-telemetry"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <span className="telemetry-line">SAME PERSON,</span>
            <span className="telemetry-line">DIFFERENT DIMENSIONS.</span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

