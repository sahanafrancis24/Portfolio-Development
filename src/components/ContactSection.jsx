import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionLabel } from './SectionLabel'
import { FiMail, FiPhone, FiGithub, FiLinkedin, FiSend, FiCheck, FiArrowRight } from 'react-icons/fi'

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    method: 'email', // 'email' | 'whatsapp'
  })
  const [status, setStatus] = useState('idle') // 'idle' | 'transmitting' | 'sent' | 'error'
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      setErrorMessage('Please enter your name.')
      return
    }

    if (formData.method === 'email') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        setErrorMessage('Please enter a valid email address.')
        return
      }
    } else {
      if (!formData.phone.replace(/\D/g, '').length) {
        setErrorMessage('Please enter a valid WhatsApp number.')
        return
      }
    }

    if (formData.message.trim().length < 10) {
      setErrorMessage('Please enter a message of at least 10 characters.')
      return
    }

    setErrorMessage('')

    // WhatsApp flow
    if (formData.method === 'whatsapp') {
      const phone = '919363065542'
      const text = `Hi Sahana, my name is ${formData.name}. ${formData.message}`
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank')
      setStatus('sent')
      setTimeout(() => setStatus('idle'), 4000)
      return
    }

    // Formspree flow
    setStatus('transmitting')

    try {
      const response = await fetch('https://formspree.io/f/xqewkzeg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      })

      if (response.ok) {
        setStatus('sent')
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          method: 'email',
        })
        setTimeout(() => setStatus('idle'), 4500)
      } else {
        setStatus('error')
        setErrorMessage('Transmission failed. Please try again or reach out via LinkedIn/Email.')
        setTimeout(() => setStatus('idle'), 4000)
      }
    } catch {
      setStatus('error')
      setErrorMessage('Network transmission error. Please check your connection.')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  return (
    <section id="contact" className="contact-terminal-section">
      <SectionLabel
        number="06"
        label="CONTACT"
        subtitle="COMMUNICATION TERMINAL // DIRECT TRANSMISSION"
      />

      <div className="contact-terminal-grid">
        {/* Left: Atmospheric Manifesto & Channels */}
        <div className="contact-manifesto-col">
          <h2 className="contact-big-title">
            HAVE AN IDEA? <br />
            <span className="title-highlight">LET&apos;S BUILD SOMETHING UNUSUAL.</span>
          </h2>

          <p className="contact-lede">
            Whether you are looking to architect an interactive 3D web experience, develop a full-stack digital product, or explore computational bioinformatics workflows — I am ready to collaborate.
          </p>

          <div className="contact-direct-channels">
            <a
              href="mailto:sahanafeminambbs@gmail.com"
              className="direct-channel-link"
              aria-label="Send direct email"
            >
              <div className="channel-icon-disc">
                <FiMail size={16} />
              </div>
              <div className="channel-info">
                <span className="channel-type">DIRECT EMAIL</span>
                <span className="channel-val">sahanafeminambbs@gmail.com</span>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/sahana-f-0427492a9"
              target="_blank"
              rel="noreferrer"
              className="direct-channel-link"
              aria-label="Open LinkedIn Profile"
            >
              <div className="channel-icon-disc">
                <FiLinkedin size={16} />
              </div>
              <div className="channel-info">
                <span className="channel-type">LINKEDIN</span>
                <span className="channel-val">linkedin.com/in/sahana-f-0427492a9</span>
              </div>
            </a>

            <a
              href="https://github.com/sahanafrancis24"
              target="_blank"
              rel="noreferrer"
              className="direct-channel-link"
              data-cursor="source"
              aria-label="Open GitHub Profile"
            >
              <div className="channel-icon-disc">
                <FiGithub size={16} />
              </div>
              <div className="channel-info">
                <span className="channel-type">GITHUB CODEBASE</span>
                <span className="channel-val">github.com/sahanafrancis24</span>
              </div>
            </a>
          </div>
        </div>

        {/* Right: Glass Terminal Form */}
        <div className="contact-form-col">
          <form className="transmission-terminal glass-panel" onSubmit={handleSubmit} noValidate>
            <div className="terminal-topbar">
              <div className="terminal-dots">
                <span className="t-dot red" />
                <span className="t-dot yellow" />
                <span className="t-dot green" />
              </div>
              <span className="terminal-id-tag">TX-TERMINAL // v2.6</span>
            </div>

            {/* Mode Switcher: Email or WhatsApp */}
            <div className="transmission-mode-switch">
              <button
                type="button"
                className={`mode-tab-btn ${formData.method === 'email' ? 'active' : ''}`}
                onClick={() => setFormData((p) => ({ ...p, method: 'email' }))}
              >
                <FiMail size={13} />
                <span>EMAIL DISPATCH</span>
              </button>
              <button
                type="button"
                className={`mode-tab-btn ${formData.method === 'whatsapp' ? 'active' : ''}`}
                onClick={() => setFormData((p) => ({ ...p, method: 'whatsapp' }))}
              >
                <FiPhone size={13} />
                <span>WHATSAPP INSTANT</span>
              </button>
            </div>

            {/* Input: Name */}
            <div className="terminal-input-group">
              <label htmlFor="tx-name" className="terminal-label">IDENTIFIER / NAME</label>
              <input
                id="tx-name"
                type="text"
                className="terminal-input"
                placeholder="e.g. Alex Mercer"
                value={formData.name}
                onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                required
              />
            </div>

            {/* Input: Email or WhatsApp */}
            {formData.method === 'email' ? (
              <div className="terminal-input-group">
                <label htmlFor="tx-email" className="terminal-label">ELECTRONIC MAIL</label>
                <input
                  id="tx-email"
                  type="email"
                  className="terminal-input"
                  placeholder="alex@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                  required
                />
              </div>
            ) : (
              <div className="terminal-input-group">
                <label htmlFor="tx-phone" className="terminal-label">WHATSAPP NUMBER</label>
                <input
                  id="tx-phone"
                  type="tel"
                  className="terminal-input"
                  placeholder="+91 9876543210"
                  value={formData.phone}
                  onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                  required
                />
              </div>
            )}

            {/* Input: Message */}
            <div className="terminal-input-group">
              <label htmlFor="tx-msg" className="terminal-label">TRANSMISSION CONTENT</label>
              <textarea
                id="tx-msg"
                rows="4"
                className="terminal-textarea"
                placeholder="Tell me about your project, ideas, or timeline..."
                value={formData.message}
                onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                required
              />
            </div>

            {/* Error Message if any */}
            {errorMessage && (
              <p className="terminal-error-note" role="alert">
                ⚠ {errorMessage}
              </p>
            )}

            {/* Micro-Interaction Transmission Button */}
            <button
              type="submit"
              disabled={status === 'transmitting'}
              className={`transmission-submit-btn ${status}`}
            >
              <span className="light-pulse-runner" />
              {status === 'idle' && (
                <>
                  <span>SEND TRANSMISSION</span>
                  <FiSend size={15} />
                </>
              )}
              {status === 'transmitting' && (
                <>
                  <span className="spin-dot" />
                  <span>TRANSMITTING...</span>
                </>
              )}
              {status === 'sent' && (
                <>
                  <FiCheck size={16} />
                  <span>MESSAGE SENT ✓</span>
                </>
              )}
              {status === 'error' && (
                <>
                  <span>TRANSMISSION FAILED</span>
                  <FiArrowRight size={14} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
