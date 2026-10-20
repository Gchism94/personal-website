import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="site-footer"><div className="editorial-wrap footer-inner">
      <Link href="/" className="footer-name">Greg T. Chism</Link>
      <p>Based in Bend, Oregon.<br />Curious about what’s next.</p>
      <nav aria-label="Footer"><a href="https://github.com/Gchism94" target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/greg-chism/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><Link href="/resume">Resume ↗</Link><Link href="/reading">Reading ↗</Link></nav>
      <small>© {new Date().getFullYear()} Greg Chism</small>
    </div></footer>
  )
}
