'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from './ThemeProvider'

const LINKS = [
  { href: '/work', label: 'Work' },
  { href: '/research', label: 'Research' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Let’s talk' },
]

export default function NavBar() {
  const pathname = usePathname()
  const { toggle } = useTheme()
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)
  const buttonRef = useRef(null)
  const isHome = pathname === '/'

  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    menuRef.current?.querySelector('a')?.focus()
    const onKeyDown = (event) => {
      if (event.key === 'Escape') { setOpen(false); buttonRef.current?.focus() }
      if (event.key === 'Tab') {
        const items = [buttonRef.current, ...menuRef.current.querySelectorAll('a')]
        event.preventDefault()
        const current = items.indexOf(document.activeElement)
        const next = (current + (event.shiftKey ? -1 : 1) + items.length) % items.length
        items[next]?.focus()
      }
    }
    const onResize = () => { if (window.innerWidth > 760) setOpen(false) }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', onResize)
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener('keydown', onKeyDown); window.removeEventListener('resize', onResize) }
  }, [open])

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <header className={`site-header ${isHome ? 'site-header--home' : ''} ${open ? 'site-header--open' : ''}`}>
        <Link href="/" className="site-wordmark" onClick={() => setOpen(false)}>Greg T. Chism<span>PhD / Curiosity in practice</span></Link>
        <nav className="desktop-nav" aria-label="Primary">
          {LINKS.map(({ href, label }) => <Link key={href} href={href} aria-current={pathname === href ? 'page' : undefined} className={href === '/contact' ? 'nav-contact' : ''}>{label}{href === '/contact' && <span aria-hidden="true"> ↗</span>}</Link>)}
        </nav>
        <div className="nav-controls"><button className="theme-control" onClick={toggle} aria-label="Toggle color theme"><span aria-hidden="true">◐</span></button><button ref={buttonRef} className="menu-control" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'} <span aria-hidden="true">{open ? '−' : '+'}</span></button></div>
      </header>
      {open && <nav ref={menuRef} id="mobile-navigation" className="mobile-navigation" aria-label="Mobile primary">
        <p className="editorial-label">Explore</p>
        {LINKS.map(({ href, label }, index) => <Link key={href} href={href} onClick={() => setOpen(false)} aria-current={pathname === href ? 'page' : undefined}><small>0{index + 1}</small>{label}<span aria-hidden="true">↗</span></Link>)}
        <p className="mobile-location">Bend, Oregon / Working everywhere</p>
      </nav>}
    </>
  )
}
