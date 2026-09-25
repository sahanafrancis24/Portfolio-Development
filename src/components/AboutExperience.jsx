import { motion } from 'framer-motion'
import { SectionHeaderMeta } from './SectionHeaderMeta'
import { CinematicText } from './CinematicText'
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

const supportingItems = [
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
      {/* Top Editorial Metadata */}
      <SectionHeaderMeta
        number="02"
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
        {/* Left Column: Heading, Narrative, and Progressive Supporting Items */}
        <div className="about-left-col">
          <CinematicText revealType="clip-line" delay={0.05}>
            <span className="about-kicker-label">ABOUT ME</span>
          </CinematicText>

          <CinematicText as="h2" revealType="clip-line" delay={0.15} className="about-headline-title">
            BUILDING <br />
            <span className="text-magenta">A BRIGHTER TOMORROW</span>
          </CinematicText>

          <CinematicText revealType="words" delay={0.25} className="about-narrative-paragraph">
            I am passionate about building modern web applications and creating intuitive user
            interfaces. With a strong foundation in programming and problem-solving, I focus on
            developing responsive, efficient, and user-friendly digital solutions. I also bring a
            unique perspective by combining technology with domain knowledge in Bioinformatics.
          </CinematicText>

          {/* Progressive Supporting Engineering Focus Items */}
          <div className="about-supporting-grid">
            {supportingItems.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.id}
                  className="about-supporting-item"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.35 + index * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <div className="supporting-icon-box">
                    <Icon size={13} />
                  </div>
                  <span className="supporting-text">{item.title}</span>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Right Column: Open vista for the cosmic portal from the master video */}
        <div className="about-right-col" aria-hidden="true">
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
