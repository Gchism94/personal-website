export default function SectionHeader({ label, heading, subtitle, className = '' }) {
  return (
    <div className={`mb-12 ${className}`}>
      {label && (
        <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-stone/55 dark:text-cream/40 mb-3">{label}</p>
      )}
      {heading && (
        <h2 className="font-serif text-3xl font-bold text-bark dark:text-cream leading-snug">{heading}</h2>
      )}
      {subtitle && (
        <p className="mt-3 font-dm-sans font-light text-base text-stone dark:text-cream/60">{subtitle}</p>
      )}
    </div>
  )
}
