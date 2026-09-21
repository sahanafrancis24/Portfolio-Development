export function SectionHeaderMeta({ number, title, subline, rightMeta = [] }) {
  return (
    <div className="section-meta-bar" aria-hidden="true">
      {/* Top-Left Index & Sub-labels */}
      <div className="meta-left">
        <div className="meta-index-row">
          <span className="meta-num">{number}</span>
          <span className="meta-slash">/</span>
          <span className="meta-title">{title}</span>
        </div>
        {subline && <div className="meta-subline">{subline}</div>}
      </div>

      {/* Top-Right Vertical Editorial Telemetry */}
      {rightMeta.length > 0 && (
        <div className="meta-right">
          {rightMeta.map((line, idx) => (
            <span key={idx} className="meta-right-line">
              {line}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
