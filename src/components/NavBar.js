'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from './ThemeProvider'

const LINKS = [
  { href: '/work',     label: 'Work' },
  { href: '/research', label: 'Research' },
  { href: '/about',    label: 'About' },
  { href: '/contact',  label: 'Contact' },
]

function SunIcon({ className = '' }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="6" /><line x1="12" y1="18" x2="12" y2="22" />
      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" /><line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
      <line x1="2" y1="12" x2="6" y2="12" /><line x1="18" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" /><line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
    </svg>
  )
}

function MoonIcon({ className = '' }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

export default function NavBar() {
  const pathname = usePathname()
  const { toggle } = useTheme()
  const [open, setOpen] = useState(false)

  const isHome = pathname === '/'

  // On home, nav floats over the hero with no background
  // On other pages, fixed with blur/border
  const navBase = isHome
    ? 'absolute top-0 left-0 right-0 z-50'
    : 'fixed top-0 left-0 right-0 z-50 bg-linen/95 dark:bg-midnight/95 backdrop-blur-sm border-b border-sand/40 dark:border-white/5'

  const textColor = isHome
    ? 'text-bark/60 dark:text-cream/60'
    : 'text-bark/55 dark:text-cream/55'

  const activeColor = 'text-juniper dark:text-teal'

  return (
    <>
      <header className={navBase}>
        <div className="flex items-center justify-between px-14 py-7 md:px-7 md:py-5">
          {/* Wordmark */}
          <Link
            href="/"
            className="font-mono text-[11px] tracking-[0.18em] uppercase text-bark/62 dark:text-cream/62 hover:text-bark dark:hover:text-cream transition-colors"
          >
            Greg T. Chism
          </Link>

          {/* Desktop links */}
          <nav className="flex items-center gap-9 lg:hidden" aria-label="Primary">
            {LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`font-mono text-[10px] tracking-[0.14em] uppercase transition-colors duration-150
                  ${pathname === href ? activeColor : textColor + ' hover:text-bark dark:hover:text-cream'}`}
              >
                {label}
              </Link>
            ))}
            <button
              onClick={toggle}
              className={`${textColor} hover:text-bark dark:hover:text-cream transition-colors ml-2`}
              aria-label="Toggle dark mode"
            >
              <SunIcon className="hidden dark:block" />
              <MoonIcon className="block dark:hidden" />
            </button>
          </nav>

          {/* Mobile controls */}
          <div className="hidden lg:flex items-center gap-4">
            <button onClick={toggle} className={`${textColor}`} aria-label="Toggle dark mode">
              <SunIcon className="hidden dark:block" />
              <MoonIcon className="block dark:hidden" />
            </button>
            <button
              onClick={() => setOpen(!open)}
              className="flex flex-col gap-1.5 w-5 text-bark/60 dark:text-cream/60"
              aria-label="Toggle menu"
            >
              <span className={`block h-px bg-current transition-all duration-200 ${open ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-px bg-current transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
              <span className={`block h-px bg-current transition-all duration-200 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      {open && (
        <div className="hidden lg:flex fixed inset-0 z-40 bg-linen dark:bg-midnight flex-col items-center justify-center gap-10">
          {LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`font-mono text-sm tracking-[0.2em] uppercase transition-colors
                ${pathname === href ? activeColor : 'text-bark/60 dark:text-cream/60 hover:text-bark dark:hover:text-cream'}`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
