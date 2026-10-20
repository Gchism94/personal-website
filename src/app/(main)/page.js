import Link from 'next/link'
import Image from 'next/image'
import LandscapeHero from '@/components/LandscapeHero'
import ProjectGallery from '@/components/ProjectGallery'

export const metadata = {
  title: 'Greg Chism — Data Scientist, Educator & Builder',
  description: 'AI-native classrooms, equitable computing infrastructure, and thoughtful digital products. Explore recent work by Greg Chism, based in Bend, Oregon.',
}

export default function Home() {
  return (
    <>
      <LandscapeHero />
      <section id="introduction" className="editorial-intro editorial-wrap">
        <p className="editorial-label">The thread through it all</p>
        <div><h2>Good questions cross boundaries.<br /><em>So does my work.</em></h2>
          <div className="intro-bottom"><Image src="/images/profile/greg-chism.jpg" alt="Greg Chism" width={88} height={88} className="intro-portrait" /><p>From studying social insects to teaching data science and building independent software, I’m interested in how systems work—and how we can make them work better for people.</p><Link className="text-link" href="/about">Meet Greg <span aria-hidden="true">↗</span></Link></div>
        </div>
      </section>
      <section id="selected-work" className="selected-work editorial-wrap">
        <div className="section-heading"><div><p className="editorial-label">Selected work / 2026</p><h2>Ideas in the world.</h2></div><Link className="text-link" href="/work">All projects <span aria-hidden="true">↗</span></Link></div>
        <ProjectGallery />

      </section>
      <section className="practice-section"><div className="editorial-wrap"><div className="section-heading"><p className="editorial-label">A practice, not a single discipline</p><h2>Different scales.<br /><em>The same curiosity.</em></h2></div>
        <div className="practice-grid">
          <Link href="https://threecanyonconsult.com" target="_blank" rel="noopener noreferrer"><span>01 / Consulting ↗</span><h3>Make the data useful.</h3><p>Data systems and thoughtful AI strategy for universities, health systems, and mission-driven organizations. Through Three Canyon Consulting.</p></Link>
          <Link href="/research"><span>02 / Research & teaching ↗</span><h3>Make the ideas accessible.</h3><p>Reproducible research, graduate teaching at the University of Arizona, and workshops that give people room to experiment.</p></Link>
          <Link href="https://steppe.community" target="_blank" rel="noopener noreferrer"><span>03 / Community technology ↗</span><h3>Make it serve people.</h3><p>Building a member-governed civic commons for Central Oregon through Steppe. Explore the live site and its founding beta.</p></Link>
        </div>
      </div></section>
      <section className="contact-invitation editorial-wrap"><p className="editorial-label">Start a conversation</p><h2>Have a good<br /><em>question?</em></h2><Link href="/contact" className="invitation-link">Let’s work through it. <span aria-hidden="true">↗</span></Link></section>
    </>
  )
}
