import { motion } from 'framer-motion'

export function SectionLabel({ number, label, subtitle }) {
  return (
    <div className="section-label-wrap">
      <div className="section-label-header">
        <span className="section-number">{number}</span>
        <span className="section-divider-slash">/</span>
        <span className="section-name">{label}</span>
      </div>
      {subtitle && <p className="section-sub-kicker">{subtitle}</p>}
    </div>
  )
}
