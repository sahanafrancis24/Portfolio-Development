import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import {
  FiCode,
  FiCpu,
  FiDatabase,
  FiFigma,
  FiGithub,
  FiGlobe,
  FiLinkedin,
  FiMail,
  FiSend,
  FiTerminal,
  FiUser,
} from 'react-icons/fi'
import { FaGamepad } from 'react-icons/fa6'
import bgVideo from './assets/4k Video _ Technology Looped Background _ No Copyright Loop Background Video.mp4'
import dragonModel from './assets/black_dragon_with_idle_animation.glb'
import { ModelViewer } from './components/ModelViewer'
import './App.css'

const navItems = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Game Dev', id: 'gamedev' },
  { label: 'GitHub', id: 'github' },
  { label: 'Contact', id: 'contact' },
]

const typingWords = [
  'Full-Stack Developer',
  'Creative UI Designer',
  'Building Real-World Projects',
]

const skillGroups = [
  {
    title: 'Frontend',
    icon: FiGlobe,
    skills: ['HTML5', 'CSS3', 'JavaScript', 'React.js'],
  },
  {
    title: 'Backend',
    icon: FiTerminal,
    skills: ['Node.js', 'Express.js'],
  },
  {
    title: 'Databases',
    icon: FiDatabase,
    skills: ['MySQL', 'Firebase'],
  },
  {
    title: 'Programming',
    icon: FiCode,
    skills: ['Java', 'Python'],
  },
  {
    title: 'Tools & Technologies',
    icon: FiFigma,
    skills: ['Git', 'GitHub', 'VS Code'],
  },
  {
    title: 'UI/UX Design',
    icon: FiFigma,
    skills: ['Figma', 'Canva', 'Framer'],
  },
  {
    title: 'Bioinformatics',
    icon: FiCpu,
    skills: ['BLAST', 'ClustalW', 'NCBI', 'MEGA', 'PyMOL', 'Cytoscape'],
  },
  {
    title: 'Others',
    icon: FiUser,
    skills: ['Responsive Design', 'REST APIs', 'UI Development'],
  },
]

const projects = [
  {
    title: 'Cake E-Commerce Website',
    description:
      'Responsive shopping experience with product listings, cart interactions, and checkout-focused UI design.',
    stack: ['React', 'Node.js', 'MySQL'],
    github: 'https://github.com/sahanafrancis24?tab=repositories&q=cake',
  },
  {
    title: 'Nail Salon Booking Website',
    description:
      'Appointment platform with service browsing, booking flow, and mobile-first interface optimization.',
    stack: ['React', 'Express', 'Firebase'],
    github: 'https://github.com/sahanafrancis24?tab=repositories&q=nail',
  },
  {
    title: 'Café Website',
    description:
      'Modern cafe brand site featuring menu storytelling, refined visuals, and smooth micro-interactions.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/sahanafrancis24?tab=repositories&q=cafe',
  },
  {
    title: 'AI-Medical-Chatbot',
    description:
      'Healthcare-focused chatbot prototype for guided medical query responses with a clean conversational flow.',
    stack: ['Dart', 'Flutter', 'AI Chat'],
    github: 'https://github.com/sahanafrancis24/AI-Medical-Chatbot',
  },
  {
    title: 'structurologic-engine',
    description:
      'JavaScript engine-focused project with modular logic utilities and structured processing workflows.',
    stack: ['JavaScript', 'Logic Engine', 'Utilities'],
    github: 'https://github.com/sahanafrancis24/structurologic-engine',
  },
  {
    title: 'Ruffs Café',
    description:
      'Premium café brand website showcasing specialty coffee, pastries, and ambiance. Features elegant menu displays, location information, and online reservation system with smooth animations and responsive mobile experience.',
    stack: ['React', 'Tailwind CSS', 'Node.js'],
    github: 'https://github.com/sahanafrancis24?tab=repositories&q=ruffs-cafe',
  },
]

const timeline = [
  {
    title: 'Practical Full-Stack Development',
    detail: 'Built web apps with responsive UI, API integration, and maintainable architecture decisions.',
  },
  {
    title: 'Bioinformatics + Tech Perspective',
    detail: 'Applied domain knowledge to data-heavy workflows and problem-solving in software projects.',
  },
  {
    title: 'Continuous Growth',
    detail: 'Expanding skills across frontend systems, backend services, and interactive digital products.',
  },
]

const sectionVariant = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut', staggerChildren: 0.08 },
  },
}

const sectionRevealProps = {
  initial: { opacity: 0, y: 80, filter: 'blur(10px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: false, amount: 0.22 },
  transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
}

function AnimatedCounter({ value }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const target = Number(value) || 0
    const duration = 900
    const start = performance.now()

    let raf
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(target * eased))
      if (progress < 1) raf = requestAnimationFrame(step)
    }

    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [value])

  return <>{display}</>
}

function MagneticButton({ children, className = '', onClick, ...props }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [ripples, setRipples] = useState([])

  const handleMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - (bounds.left + bounds.width / 2)
    const y = event.clientY - (bounds.top + bounds.height / 2)
    setOffset({ x: x * 0.18, y: y * 0.18 })
    event.currentTarget.style.setProperty('--x', `${event.clientX - bounds.left}px`)
    event.currentTarget.style.setProperty('--y', `${event.clientY - bounds.top}px`)
  }

  const handleClick = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const ripple = {
      id: Date.now() + Math.random(),
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    }
    setRipples((prev) => [...prev, ripple])
    setTimeout(() => setRipples((prev) => prev.filter((item) => item.id !== ripple.id)), 550)
    onClick?.(event)
  }

  return (
    <motion.button
      className={`magnetic-btn ${className}`.trim()}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: 'spring', stiffness: 180, damping: 12 }}
      onMouseMove={handleMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      onClick={handleClick}
      {...props}
    >
      <span>{children}</span>
      {ripples.map((ripple) => (
        <i key={ripple.id} className="ripple" style={{ left: ripple.x, top: ripple.y }} />
      ))}
    </motion.button>
  )
}

function TiltCard({ children, className = '', floating = false }) {
  const [state, setState] = useState({ rx: 0, ry: 0, z: 0, mx: 0, my: 0 })

  const onMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height
    const rx = (0.5 - py) * 16
    const ry = (px - 0.5) * 16
    const mx = (px - 0.5) * 24
    const my = (py - 0.5) * 24
    setState({ rx, ry, z: 1.03, mx, my })
    event.currentTarget.style.setProperty('--mx', `${mx}px`)
    event.currentTarget.style.setProperty('--my', `${my}px`)
  }

  return (
    <motion.div
      className={`tilt-card ${floating ? 'floating-card' : ''} ${className}`.trim()}
      animate={{
        rotateX: state.rx,
        rotateY: state.ry,
        scale: state.z || 1,
        boxShadow: `${-state.mx * 0.9}px ${state.my * 0.9 + 24}px 50px rgba(40, 10, 80, 0.45)`,
      }}
      transition={{ type: 'spring', stiffness: 220, damping: 18 }}
      onMouseMove={onMove}
      onMouseLeave={() => setState({ rx: 0, ry: 0, z: 1, mx: 0, my: 0 })}
    >
      {children}
    </motion.div>
  )
}

function App() {
  const [progress, setProgress] = useState(0)
  const [activeSection, setActiveSection] = useState('home')
  const [typedText, setTypedText] = useState('')
  const [typingIndex, setTypingIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [cursorTrail, setCursorTrail] = useState({ x: 0, y: 0 })
  const [logoClicks, setLogoClicks] = useState(0)
  const [easterMessage, setEasterMessage] = useState('')
  const [showLoader, setShowLoader] = useState(true)

  const [githubProfile, setGithubProfile] = useState(null)
  const [githubRepos, setGithubRepos] = useState([])

  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', message: '', contactMethod: 'email' })
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const audioCtxRef = useRef(null)
  const gamedevRef = useRef(null)

  const recentActiveRepos = useMemo(() => {
    const limit = Date.now() - 30 * 24 * 60 * 60 * 1000
    return githubRepos.filter((repo) => new Date(repo.pushed_at).getTime() > limit).length
  }, [githubRepos])

  const githubGraphStart = '2026-04-01'
  const githubGraphEnd = new Date().toISOString().slice(0, 10)

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 1300)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      const current = window.scrollY
      setProgress(total > 0 ? (current / total) * 100 : 0)

      const sections = Array.from(document.querySelectorAll('section[id]'))
      const scrollTarget = current + window.innerHeight * 0.35
      let currentSection = 'home'

      sections.forEach((section) => {
        if (section.offsetTop <= scrollTarget) {
          currentSection = section.id
        }
      })

      setActiveSection(currentSection)
    }

    const onMove = (event) => {
      setCursorPos({ x: event.clientX, y: event.clientY })
    }

    onScroll()
    window.addEventListener('scroll', onScroll)
    window.addEventListener('mousemove', onMove)
    document.addEventListener('mousemove', onMove, true)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mousemove', onMove, true)
    }
  }, [])

  useEffect(() => {
    const revealSections = document.querySelectorAll('.reveal-section')
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          } else {
            entry.target.classList.remove('is-visible')
          }
        })
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' },
    )

    revealSections.forEach((section) => revealObserver.observe(section))
    return () => revealObserver.disconnect()
  }, [])

  useEffect(() => {
    const currentWord = typingWords[typingIndex % typingWords.length]
    const delay = deleting ? 52 : 90

    const timeout = setTimeout(() => {
      if (!deleting && typedText.length < currentWord.length) {
        setTypedText(currentWord.slice(0, typedText.length + 1))
        return
      }

      if (deleting && typedText.length > 0) {
        setTypedText((prev) => prev.slice(0, -1))
        return
      }

      if (!deleting) {
        setDeleting(true)
      } else {
        setDeleting(false)
        setTypingIndex((prev) => prev + 1)
      }
    }, delay)

    return () => clearTimeout(timeout)
  }, [deleting, typedText, typingIndex])

  useEffect(() => {
    let raf
    const tick = () => {
      if (gamedevRef.current) {
        const rect = gamedevRef.current.getBoundingClientRect()
        const isInGamedev = cursorPos.x >= rect.left && cursorPos.x <= rect.right && cursorPos.y >= rect.top && cursorPos.y <= rect.bottom
        const ease = isInGamedev ? 0.08 : 0.27
        setCursorTrail((prev) => ({
          x: prev.x + (cursorPos.x - prev.x) * ease,
          y: prev.y + (cursorPos.y - prev.y) * ease,
        }))
      } else {
        setCursorTrail((prev) => ({
          x: prev.x + (cursorPos.x - prev.x) * 0.27,
          y: prev.y + (cursorPos.y - prev.y) * 0.27,
        }))
      }
      raf = requestAnimationFrame(tick)
    }
    tick()
    return () => cancelAnimationFrame(raf)
  }, [cursorPos.x, cursorPos.y])

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY })
    }

    document.addEventListener('mousemove', handleMouseMove, true)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove, true)
    }
  }, [])

  useEffect(() => {
    const username = 'sahanafrancis24'
    const fetchGithub = async () => {
      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`),
        ])
        if (!profileRes.ok || !reposRes.ok) throw new Error('GitHub API unavailable')
        setGithubProfile(await profileRes.json())
        const repos = await reposRes.json()
        setGithubRepos(Array.isArray(repos) ? repos : [])
      } catch {
        setGithubProfile(null)
        setGithubRepos([])
      }
    }
    fetchGithub()
  }, [])

  useEffect(() => {
    if (logoClicks < 5) return
    confetti({ particleCount: 220, spread: 130, origin: { y: 0.35 }, colors: ['#4facfe', '#7b2ff7', '#f953c6', '#00f5ff'] })
    setEasterMessage('Logo combo complete: surprise confetti activated.')
    setLogoClicks(0)
  }, [logoClicks])

  const playClickSound = () => {
    const context = audioCtxRef.current || new window.AudioContext()
    audioCtxRef.current = context
    const oscillator = context.createOscillator()
    const gain = context.createGain()
    oscillator.type = 'sine'
    oscillator.frequency.value = 520
    gain.gain.setValueAtTime(0.0001, context.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.02, context.currentTime + 0.01)
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.12)
    oscillator.connect(gain)
    gain.connect(context.destination)
    oscillator.start()
    oscillator.stop(context.currentTime + 0.14)
  }

  const handleNavClick = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  const validateForm = () => {
    const nextErrors = {}
    if (!contactForm.name.trim()) nextErrors.name = 'Please enter your name.'
    if (contactForm.contactMethod === 'email') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactForm.email)) nextErrors.email = 'Please enter a valid email.'
    } else {
      if (!contactForm.phone.replace(/\D/g, '').length) nextErrors.phone = 'Please enter a valid WhatsApp number.'
    }
    if (contactForm.message.trim().length < 12) nextErrors.message = 'Message should be at least 12 characters.'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const submitContact = async (event) => {
  event.preventDefault()

  if (!validateForm()) return


  if (contactForm.contactMethod === 'whatsapp') {
    const phone = "919363065542" 
    const text = `Hi Sahana, ${contactForm.message}`

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`)

    return 
  }

  setSending(true)
  setSubmitMessage('')

  try {
    const response = await fetch('https://formspree.io/f/xqewkzeg', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: contactForm.name,
        email: contactForm.email,
        message: contactForm.message,
      }),
    })

    if (response.ok) {
      setSubmitMessage('✅ Message sent successfully!')
      setContactForm({
        name: '',
        email: '',
        phone: '',
        message: '',
        contactMethod: 'email',
      })
    } else {
      setSubmitMessage('❌ Something went wrong')
    }
  } catch {
    setSubmitMessage('❌ Network error')
  } finally {
    setSending(false)
  }
}

  return (
    <div className="app-shell">
      <AnimatePresence>
        {showLoader && (
          <motion.div className="page-loader" initial={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: '-100%' }} transition={{ duration: 0.75, ease: [0.19, 1, 0.22, 1] }}>
            <span>Sahana F</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="cursor-dot" style={{ transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0)` }} />
      <div className="cursor-trail" style={{ transform: `translate3d(${cursorTrail.x}px, ${cursorTrail.y}px, 0)` }} />
      <div className="progress-bar" style={{ width: `${progress}%` }} />

      <div className="bg-layer" aria-hidden>
        <video className="bg-video" autoPlay muted loop playsInline>
          <source src={bgVideo} type="video/mp4" />
        </video>
        <div className="bg-video-overlay" />
      </div>

      <header className="site-nav">
        <button className="brand" onClick={() => setLogoClicks((prev) => prev + 1)}>
          <span>S</span>ahana F
        </button>

        <nav>
          {navItems.map((item) => (
            <button key={item.id} className={activeSection === item.id ? 'active' : ''} onClick={() => handleNavClick(item.id)}>
              {item.label}
            </button>
          ))}
        </nav>

      </header>

      {easterMessage && <div className="easter-banner">{easterMessage}</div>}

      <main>
        <section id="home" className="hero">
          <motion.div className="hero-content" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1><span>Sahana F</span></h1>
            <p className="typing-line">{typedText}<span className="typing-caret">|</span></p>
            <p className="hero-subtext">I build responsive web applications and create clean, interactive user experiences.</p>
            <div className="hero-actions">
              <MagneticButton className="primary" onClick={() => handleNavClick('projects')}>View Projects</MagneticButton>
              <MagneticButton className="secondary" onClick={() => handleNavClick('contact')}>Contact Me</MagneticButton>
            </div>
            <div className="social-row">
              <a href="https://github.com/sahanafrancis24" target="_blank" rel="noreferrer"><FiGithub /></a>
              <a href="https://www.linkedin.com/in/sahana-f-0427492a9" target="_blank" rel="noreferrer"><FiLinkedin /></a>
            </div>
          </motion.div>
        </section>

        <motion.section id="about" className="reveal-section" variants={sectionVariant} {...sectionRevealProps}>
          <h2>About</h2>
          <div className="about-grid">
            <motion.div initial={{ opacity: 0, y: 35, filter: 'blur(10px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} viewport={{ once: true }}>
              <TiltCard className="glass-card intro-card">
                <h3><FiUser /> About Me</h3>
                <p>
                  I am passionate about building modern web applications and creating intuitive user interfaces. With a strong foundation in programming and problem-solving, I focus on developing responsive, efficient, and user-friendly digital solutions. I also bring a unique perspective by combining technology with domain knowledge in Bioinformatics.
                </p>
                <div className="highlight-row">
                  <span><FiCode /> Real project implementation</span>
                  <span><FiCpu /> Growth-focused engineering mindset</span>
                </div>
              </TiltCard>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 35, filter: 'blur(10px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
              <TiltCard className="glass-card intro-card">
                <h3><FiGlobe /> UI & Frontend Development</h3>
                <p>
                  I specialize in designing and developing beautiful, interactive user interfaces that create meaningful user experiences. My approach combines responsive design principles, modern web technologies, and a keen eye for visual aesthetics to deliver web applications that are both functional and delightful.
                </p>
                <div className="highlight-row">
                  <span><FiFigma /> Design & Prototyping</span>
                  <span><FiGlobe /> Responsive & Interactive Experiences</span>
                </div>
              </TiltCard>
            </motion.div>

            <div className="timeline">
              {timeline.map((item, index) => (
                <motion.article
                  key={item.title}
                  className="timeline-item glass-card"
                  initial={{ opacity: 0, x: index % 2 ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: index * 0.1 }}
                >
                  <h4>{item.title}</h4>
                  <span>{item.detail}</span>
                </motion.article>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section id="skills" className="reveal-section" variants={sectionVariant} {...sectionRevealProps}>
          <h2>Skills</h2>
          <div className="skills-grid">
            {skillGroups.map((group, groupIndex) => {
              const Icon = group.icon
              return (
                <motion.article
                  key={group.title}
                  className="glass-card skill-card interactive-skill"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.03, y: -6 }}
                  viewport={{ once: true }}
                  transition={{ delay: groupIndex * 0.06, type: 'spring', stiffness: 170 }}
                >
                  <h3><Icon /> {group.title}</h3>
                  <div className="skill-pill-grid">
                    {group.skills.map((skill, idx) => (
                      <motion.span
                        key={skill}
                        className="skill-pill"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 + groupIndex * 0.08 }}
                        whileHover={{ scale: 1.08 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.article>
              )
            })}
          </div>
        </motion.section>

        <motion.section id="projects" className="reveal-section" variants={sectionVariant} {...sectionRevealProps}>
          <h2>Projects</h2>
          <div className="projects-grid projects-grid-five">
            {projects.map((project) => (
              <TiltCard key={project.title} className="glass-card project-card" floating>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="stack-tags">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
                <div className="project-actions">
                  <a href={project.github} target="_blank" rel="noreferrer">GitHub</a>
                </div>
              </TiltCard>
            ))}
          </div>
        </motion.section>

        <motion.section ref={gamedevRef} id="gamedev" className="gamedev reveal-section" variants={sectionVariant} {...sectionRevealProps}>
          <h2>Game Development</h2>
          <div className="spline-gamedev-free" aria-label="3D showcase">
            <ModelViewer
              modelUrl={dragonModel}
              animation="glb"
              scale={0.75}
              enableControls={true}
            />
          </div>
          <div className="game-layout">
            <div className="game-info glass-card">
              <h3><FaGamepad /> Unity + Blender</h3>
              <p>Built advanced 3D scenes and interactive prototypes using Unity and Blender, focusing on object interaction, environment setup, gameplay fundamentals, and polished player feedback. I am currently developing an immersive 3D PC indie game set in a mysterious underwater world, with a strong emphasis on environmental storytelling, atmospheric depth, resource-driven exploration, and immersive physics-based movement.</p>
              <p>This project combines procedural water effects, dynamic lighting, and textured underwater biomes to create a believable oceanic atmosphere. The core gameplay aims to balance exploration, discovery, and narrative encounters while using Blender assets, Unity shaders, and optimized scene composition for smooth performance.</p>
              <div className="highlight-row">
                <span>Advanced 3D scene composition</span>
                <span>Interactive world-building</span>
                <span>Underwater atmosphere design</span>
                <span>Exploration-driven gameplay</span>
                <span>Performance-focused PC build</span>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section id="github" className="reveal-section" variants={sectionVariant} {...sectionRevealProps}>
          <h2>GitHub</h2>
          <div className="github-grid">
            <TiltCard className="glass-card github-stats">
              <h3><FiGithub /> Profile Metrics</h3>
              {githubProfile ? (
                <div className="stats-grid">
                  <article><b><AnimatedCounter value={githubProfile.public_repos} /></b><span>Repo Count</span></article>
                  <article><b><AnimatedCounter value={recentActiveRepos} /></b><span>Recent Activity (30d)</span></article>
                </div>
              ) : (
                <p>GitHub data unavailable right now.</p>
              )}
            </TiltCard>

            <div className="glass-card github-graph">
              <img src={`https://github-readme-activity-graph.vercel.app/graph?username=sahanafrancis24&from=${githubGraphStart}&to=${githubGraphEnd}&bg_color=0f0c29&color=00f5ff&line=f953c6&point=7b2ff7&area=true&hide_border=true`} alt="GitHub contribution graph" />
              <p className="graph-caption">Contribution graph and activity trend from GitHub profile.</p>
            </div>

            <div className="glass-card repo-list">
              <h3>Recent Repositories</h3>
              {githubRepos.length ? githubRepos.slice(0, 6).map((repo) => (
                <a key={repo.id} href={repo.html_url} target="_blank" rel="noreferrer">
                  <div><strong>{repo.name}</strong><span>{repo.language || 'Multi-stack'}</span></div>
                </a>
              )) : <p>Repository feed unavailable right now.</p>}
            </div>
          </div>
        </motion.section>

        <motion.section id="contact" className="reveal-section" variants={sectionVariant} {...sectionRevealProps}>
          <h2>Contact</h2>
          <form className="contact-form glass-card" onSubmit={submitContact} noValidate>
            <label className={errors.name ? 'invalid' : ''}>
              <input type="text" value={contactForm.name} onChange={(event) => setContactForm((prev) => ({ ...prev, name: event.target.value }))} placeholder=" " />
              <span>Name</span>
            </label>

            <div className="contact-method-toggle">
              <button type="button" className={contactForm.contactMethod === 'email' ? 'active' : ''} onClick={() => setContactForm((prev) => ({ ...prev, contactMethod: 'email' }))}>
                <FiMail /> Email
              </button>
              <button type="button" className={contactForm.contactMethod === 'whatsapp' ? 'active' : ''} onClick={() => setContactForm((prev) => ({ ...prev, contactMethod: 'whatsapp' }))}>
                Send via WhatsApp
              </button>
            </div>

            {contactForm.contactMethod === 'email' ? (
              <label className={errors.email ? 'invalid' : ''}>
                <input type="email" value={contactForm.email} onChange={(event) => setContactForm((prev) => ({ ...prev, email: event.target.value }))} placeholder=" " />
                <span>Email Address</span>
              </label>
            ) : (
              <label className={errors.phone ? 'invalid' : ''}>
                <input type="tel" value={contactForm.phone} onChange={(event) => setContactForm((prev) => ({ ...prev, phone: event.target.value }))} placeholder=" " />
                <span>WhatsApp Number</span>
              </label>
            )}

            <label className={errors.message ? 'invalid' : ''}>
              <textarea rows="5" value={contactForm.message} onChange={(event) => setContactForm((prev) => ({ ...prev, message: event.target.value }))} placeholder=" " />
              <span>Message</span>
            </label>

            <MagneticButton className="primary submit-btn" disabled={sending} type="submit">{sending ? 'Sending...' : 'Send Message'} <FiSend /></MagneticButton>
            {submitMessage && <p className="form-message">{submitMessage}</p>}

            <div className="contact-links">
              <a href="https://github.com/sahanafrancis24" target="_blank" rel="noreferrer"><FiGithub /> github.com/sahanafrancis24</a>
              <a href="https://www.linkedin.com/in/sahana-f-0427492a9" target="_blank" rel="noreferrer"><FiLinkedin /> linkedin.com/in/sahana-f-0427492a9</a>
              <a href="mailto:sahanafeminambbs@gmail.com"><FiMail /> sahanafeminambbs@gmail.com</a>
            </div>
          </form>
        </motion.section>
      </main>

      <footer className="site-footer">
        <p>Sahana F © 2026</p>
        <div className="footer-icons">
          <a href="https://github.com/sahanafrancis24" target="_blank" rel="noreferrer" aria-label="GitHub profile"><FiGithub /></a>
          <a href="https://www.linkedin.com/in/sahana-f-0427492a9" target="_blank" rel="noreferrer" aria-label="LinkedIn profile"><FiLinkedin /></a>
          <a href="mailto:sahanafeminambbs@gmail.com" aria-label="Send email"><FiMail /></a>
        </div>
      </footer>
    </div>
  )
}

export default App