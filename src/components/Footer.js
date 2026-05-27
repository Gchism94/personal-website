import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-sand/40 dark:border-white/5 py-10 mt-16">
      <div className="max-w-5xl mx-auto px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-stone/60 dark:text-cream/40">
          &copy; 2026 Greg Chism &mdash; Based in Bend, Oregon
        </p>
        <nav className="flex items-center gap-6 flex-wrap justify-center">
          {[
            { label: 'Three Canyon Consulting', href: 'https://threecanyonconsulting.com', external: true },
            { label: 'High Desert', href: 'https://highdesert.community', external: true },
            { label: 'GitHub', href: 'https://github.com/Gchism94', external: true },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/greg-chism/', external: true },
          ].map(({ label, href, external }) => (
            <a
              key={label}
              href={href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="font-mono text-[10px] tracking-[0.12em] uppercase text-stone/55 dark:text-cream/40 hover:text-bark dark:hover:text-cream transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
