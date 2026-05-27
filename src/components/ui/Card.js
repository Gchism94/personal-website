export default function Card({ children, className = '', accent = false }) {
  return (
    <div className={`bg-linen dark:bg-white/[0.04] border border-sand/60 dark:border-white/10 rounded-lg p-7 ${accent ? 'border-l-2 border-l-juniper dark:border-l-teal' : ''} ${className}`}>
      {children}
    </div>
  )
}
