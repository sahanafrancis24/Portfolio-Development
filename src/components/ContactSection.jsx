import { useState } from 'react'
import { SectionHeaderMeta } from './SectionHeaderMeta'
import { FiGithub, FiLinkedin, FiMail, FiArrowRight, FiCheck } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState('idle') // 'idle' | 'transmitting' | 'sent' | 'error'
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all fields before sending transmission.')
      return
    }

    setErrorMessage('')
    setStatus('transmitting')

    try {
      const response = await fetch('https://formspree.io/f/xqewkzeg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus('sent')
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setStatus('idle'), 4000)
      } else {
        setStatus('error')
        setErrorMessage('Transmission failed. Please reach out via Email/LinkedIn.')
        setTimeout(() => setStatus('idle'), 3500)
      }
    } catch {
      setStatus('error')
      setErrorMessage('Network error. Please try again.')
      setTimeout(() => setStatus('idle'), 3500)
    }
  }

  return (
    <section id="contact" className="ref-contact-stage">
      {/* Background Media: contact.mp4 */}
      <div className="section-media-bg">
        <video autoPlay loop muted playsInline className="section-bg-video">
          <source src="/contact.mp4" type="video/mp4" />
        </video>
        <div className="contact-vignette-overlay" />
      </div>

      {/* Top Editorial Metadata */}
      <SectionHeaderMeta
        number="05"
        title="CONTACT"
        subline={<>IDEAS ALWAYS<br />FIND A WAY</>}
        rightMeta={[
          'IDEAS',
          'ALWAYS',
          'FIND',
          'A WAY',
          '/',
          'CONNECT',
        ]}
      />

      <div className="contact-artdirected-layout">
        {/* Left Column: Heading, Subtitle, Social Links, and Form */}
        <div className="contact-left-col">
          <span className="contact-pre-kicker">GET IN TOUCH</span>
          <h2 className="contact-bold-heading">
            LET&apos;S CREATE <br />
            <span className="text-magenta">SOMETHING UNUSUAL.</span>
          </h2>
          <p className="contact-subline-mantra">Ideas Always Find a Way</p>

          {/* Social Icons Strip */}
          <div className="contact-social-pill-row">
            <a
              href="https://github.com/sahanafrancis24"
              target="_blank"
              rel="noreferrer"
              className="social-ref-pill"
              aria-label="GitHub Profile"
            >
              <FiGithub size={14} />
              <span>GitHub</span>
            </a>

            <a
              href="https://www.linkedin.com/in/sahana-f-0427492a9"
              target="_blank"
              rel="noreferrer"
              className="social-ref-pill"
              aria-label="LinkedIn Profile"
            >
              <FiLinkedin size={14} />
              <span>LinkedIn</span>
            </a>

            <a
              href="mailto:sahanafeminambbs@gmail.com"
              className="social-ref-pill"
              aria-label="Send direct email"
            >
              <FiMail size={14} />
              <span>Email</span>
            </a>

            <a
              href="https://wa.me/919940866034"
              target="_blank"
              rel="noreferrer"
              className="social-ref-pill whatsapp-pill"
              aria-label="Chat on WhatsApp"
            >
              <FaWhatsapp size={14} />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Form */}
          <form className="contact-minimal-terminal" onSubmit={handleSubmit} noValidate>
            <div className="field-row">
              <input
                type="text"
                className="minimal-line-input"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                required
              />
            </div>

            <div className="field-row">
              <input
                type="email"
                className="minimal-line-input"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                required
              />
            </div>

            <div className="field-row">
              <textarea
                rows="4"
                className="minimal-line-input minimal-textarea"
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                required
              />
            </div>

            {errorMessage && (
              <p className="contact-error-note" role="alert">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'transmitting'}
              className={`send-transmission-pill ${status}`}
            >
              {status === 'idle' && (
                <>
                  <span>SEND MESSAGE</span>
                  <span className="pill-arrow-circle">
                    <FiArrowRight size={13} />
                  </span>
                </>
              )}
              {status === 'transmitting' && (
                <>
                  <span className="dot-pulse" />
                  <span>TRANSMITTING...</span>
                </>
              )}
              {status === 'sent' && (
                <>
                  <FiCheck size={15} />
                  <span>MESSAGE SENT ✓</span>
                </>
              )}
              {status === 'error' && (
                <>
                  <span>TRANSMISSION FAILED</span>
                  <FiArrowRight size={13} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Area: Intentionally 100% clear so the cyber dragon is prominent */}
        <div className="contact-right-col" aria-hidden="true">
          {/* Open space framing the dragon */}
        </div>
      </div>
    </section>
  )
}

