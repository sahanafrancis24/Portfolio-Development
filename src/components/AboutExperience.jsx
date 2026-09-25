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
    <section id="about" className="cinematic-stage-layer ref-about-stage">
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
          {/* Beat 1: About Me Label & Headline */}
          <span className="about-kicker-label">ABOUT ME</span>

          <h2 className="about-headline-title">
            BUILDING <br />
            <span className="text-magenta">A BRIGHTER TOMORROW</span>
          </h2>

          {/* Beat 2: Narrative Paragraph */}
          <p className="about-narrative-paragraph">
            I am passionate about building modern web applications and creating intuitive user
            interfaces. With a strong foundation in programming and problem-solving, I focus on
            developing responsive, efficient, and user-friendly digital solutions. I also bring a
            unique perspective by combining technology with domain knowledge in Bioinformatics.
          </p>

          {/* Beat 3: Progressive Supporting Engineering Focus Items */}
          <div className="about-supporting-grid">
            {supportingItems.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.id}
                  className="about-supporting-item"
                >
                  <div className="supporting-icon-box">
                    <Icon size={13} />
                  </div>
                  <span className="supporting-text">{item.title}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right Column: Open vista for the cosmic portal from the master video */}
        <div className="about-right-col" aria-hidden="true">
          <div className="about-art-telemetry">
            <span className="telemetry-line">SAME PERSON,</span>
            <span className="telemetry-line">DIFFERENT DIMENSIONS.</span>
          </div>
        </div>
      </div>
    </section>
  )
}

