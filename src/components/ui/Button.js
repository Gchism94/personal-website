import Link from 'next/link'

const styles = {
  primary:   'bg-bark text-linen dark:bg-cream dark:text-midnight hover:bg-juniper dark:hover:bg-teal border-0 px-6 py-3',
  secondary: 'bg-transparent text-bark dark:text-cream border border-sand dark:border-white/20 hover:border-bark dark:hover:border-cream px-6 py-3',
  ghost:     'bg-transparent text-juniper dark:text-teal border-b border-sand dark:border-white/20 hover:border-juniper dark:hover:border-teal pb-0.5 px-0',
}

export default function Button({ children, variant = 'primary', href, external, className = '', type = 'button', ...props }) {
  const cls = `inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.16em] uppercase transition-colors duration-150 ${styles[variant]} ${className}`
  if (href) {
    if (external) return <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{children}</a>
    return <Link href={href} className={cls}>{children}</Link>
  }
  return <button type={type} className={cls} {...props}>{children}</button>
}
