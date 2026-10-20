export default function SectionHeader({ label, heading, subtitle, className = '' }) {
  return <div className={`content-section-heading ${className}`}>
    {label && <p className="editorial-label">{label}</p>}
    {heading && <h2>{heading}</h2>}
    {subtitle && <p>{subtitle}</p>}
  </div>
}
