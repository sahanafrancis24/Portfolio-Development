import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { randomUUID } from 'node:crypto'
import fs from 'node:fs/promises'
import nodemailer from 'nodemailer'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import Twilio from 'twilio'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dataPath = path.join(__dirname, 'data', 'messages.json')

const app = express()
const PORT = process.env.PORT || 5000

const emailTransporter = process.env.EMAIL_HOST
  ? nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })
  : null

const twilioClient = process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN
  ? Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
  : null

app.use(cors())
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'portfolio-api' })
})

app.post('/api/contact', async (req, res) => {
  const { name = '', email = '', phone = '', message = '', contactMethod = 'email' } = req.body || {}

  if (!name.trim()) {
    return res.status(400).json({ error: 'Name is required.' })
  }

  if (contactMethod === 'email') {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Valid email is required.' })
    }
  } else if (contactMethod === 'whatsapp') {
    if (!phone.replace(/\D/g, '').length) {
      return res.status(400).json({ error: 'Valid WhatsApp number is required.' })
    }
  }

  if (message.trim().length < 12) {
    return res.status(400).json({ error: 'Message should be at least 12 characters.' })
  }

  const entry = {
    id: randomUUID(),
    name: name.trim(),
    email: email.trim(),
    phone: phone.trim(),
    message: message.trim(),
    contactMethod: contactMethod,
    createdAt: new Date().toISOString(),
  }

  try {
    const raw = await fs.readFile(dataPath, 'utf8').catch(() => '[]')
    const current = JSON.parse(raw)
    current.push(entry)
    await fs.writeFile(dataPath, JSON.stringify(current, null, 2), 'utf8')

    if (contactMethod === 'email') {
      const emailReceiver = process.env.CONTACT_RECEIVER_EMAIL
      const shouldSendEmail = emailTransporter && emailReceiver

      if (shouldSendEmail) {
        const htmlBody = `
          <h2>New contact message from your portfolio</h2>
          <p><strong>Name:</strong> ${entry.name}</p>
          <p><strong>Reply to:</strong> ${entry.email}</p>
          <p><strong>Message:</strong><br/>${entry.message.replace(/\n/g, '<br/>')}</p>
          <p><em>Received on ${entry.createdAt}</em></p>
        `

        await emailTransporter.sendMail({
          from: process.env.EMAIL_FROM || emailReceiver,
          to: emailReceiver,
          replyTo: entry.email,
          subject: `Portfolio contact from ${entry.name}`,
          text: `Name: ${entry.name}\nEmail: ${entry.email}\n\n${entry.message}`,
          html: htmlBody,
        })
      }
    } else if (contactMethod === 'whatsapp') {
      const shouldSendWhatsApp = twilioClient && process.env.TWILIO_WHATSAPP_FROM && process.env.WHATSAPP_TO
      if (shouldSendWhatsApp) {
        await twilioClient.messages.create({
          from: `whatsapp:${process.env.TWILIO_WHATSAPP_FROM}`,
          to: `whatsapp:${process.env.WHATSAPP_TO}`,
          body: `Portfolio message from ${entry.name} (${entry.phone}):\n\n${entry.message}`,
        })
      }
    }

    return res.status(201).json({ success: true })
  } catch (error) {
    console.error('Contact submission failed:', error)
    return res.status(500).json({ error: 'Unable to save or deliver message.' })
  }
})
  }
})

app.listen(PORT, () => {
  console.log(`Portfolio API running on http://localhost:${PORT}`)
})
