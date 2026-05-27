export default function Tag({ children, variant = 'default', className = '' }) {
  const v = {
    default: 'bg-sand/30 dark:bg-white/6 text-stone dark:text-cream/60',
    accent:  'bg-rust/8 dark:bg-teal/10 text-rust dark:text-teal',
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-mono text-[9px] uppercase tracking-wider ${v[variant]} ${className}`}>
      {children}
    </span>
  )
}
