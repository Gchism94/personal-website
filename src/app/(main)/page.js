'use client'

import { useTheme } from '@/components/ThemeProvider'
import HeroLight from '@/components/HeroLight'
import HeroDark from '@/components/HeroDark'
import Card from '@/components/ui/Card'
import SectionHeader from '@/components/ui/SectionHeader'
import Button from '@/components/ui/Button'
import Link from 'next/link'

const recentWork = [
  {
    title: 'Three Canyon Consulting',
    desc: 'AI and data strategy consulting for universities, health systems, and mission-driven organizations.',
    href: 'https://threecanyonconsulting.com',
    external: true,
    label: 'Consulting',
  },
  {
    title: 'NAIRR AI Sandbox',
    desc: 'National AI Research Resource–funded sandbox for reproducible AI experimentation in research contexts. 2026.',
    href: 'https://doi.org/10.5281/zenodo.20074028',
    external: true,
    label: 'Research · 2026',
  },
  {
    title: 'PHQ-8 & Chronic Pain',
    desc: 'Co-authored study on depression screening reliability in adults with chronic pain. Journal of Affective Disorders · 2026.',
    href: 'https://doi.org/10.1016/j.jad.2026.121496',
    external: true,
    label: 'Research · 2026',
  },
]

function HomeContent() {
  const { isDark } = useTheme()

  return (
    <div className="bg-linen dark:bg-midnight text-bark dark:text-cream">
      {/* Hero */}
      {isDark ? <HeroDark /> : <HeroLight />}

      {/* What I Do */}
      <section className="max-w-5xl mx-auto px-8 py-28">
        <SectionHeader label="What I do" className="mb-16" />
        <div className="grid grid-cols-3 gap-10 lg:grid-cols-1">
          <div>
            <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-juniper dark:text-teal mb-4">Data Strategy &amp; Consulting</p>
            <p className="font-dm-sans font-light text-base text-stone dark:text-cream/70 leading-relaxed mb-5">
              I help organizations stop drowning in data and start making decisions with it. Through Three Canyon Consulting, I work with universities, health systems, and mission-driven organizations to design better data systems, evaluate AI applications, and build insight pipelines that actually get used.
            </p>
            <Button href="https://threecanyonconsulting.com" variant="ghost" external>
              Three Canyon Consulting →
            </Button>
          </div>
          <div>
            <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-juniper dark:text-teal mb-4">Research &amp; Teaching</p>
            <p className="font-dm-sans font-light text-base text-stone dark:text-cream/70 leading-relaxed mb-5">
              I&apos;m a researcher and educator focused on reproducible data science — publishing peer-reviewed work and teaching graduate students at the University of Arizona how to turn messy data into defensible conclusions.
            </p>
            <Button href="/research" variant="ghost">
              View Research →
            </Button>
          </div>
          <div>
            <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-juniper dark:text-teal mb-4">Community &amp; Technology</p>
            <p className="font-dm-sans font-light text-base text-stone dark:text-cream/70 leading-relaxed mb-5">
              I&apos;m building High Desert, a community platform for Central Oregon — no ads, no algorithmic feeds, local residency required. Technology should serve the communities it&apos;s embedded in.
            </p>
            <Button href="https://highdesert.community" variant="ghost" external>
              High Desert →
            </Button>
          </div>
        </div>
      </section>

      {/* Recent Work */}
      <section className="max-w-5xl mx-auto px-8 pb-28">
        <SectionHeader label="Recent work" className="mb-10" />
        <div className="grid grid-cols-3 gap-6 lg:grid-cols-1 mb-10">
          {recentWork.map(({ title, desc, href, external, label }) => (
            <Card key={title} accent>
              <p className="font-mono text-[9px] tracking-[0.16em] uppercase text-stone/50 dark:text-cream/40 mb-3">{label}</p>
              <h3 className="font-serif text-lg font-bold text-bark dark:text-cream mb-3 leading-snug">{title}</h3>
              <p className="font-dm-sans font-light text-sm text-stone dark:text-cream/60 leading-relaxed mb-5">{desc}</p>
              <Button href={href} variant="ghost" external={external}>View →</Button>
            </Card>
          ))}
        </div>
        <div className="text-center">
          <Button href="/work" variant="secondary">See all work</Button>
        </div>
      </section>

      {/* Closer */}
      <section className="max-w-5xl mx-auto px-8 pb-28 text-center">
        <p className="font-dm-sans font-light text-lg text-stone dark:text-cream/60 mb-6 max-w-lg mx-auto leading-relaxed">
          Based in Bend, Oregon. Working at the intersection of data, education, and community technology.
        </p>
        <div className="flex items-center justify-center gap-6">
          {[
            { label: 'GitHub', href: 'https://github.com/Gchism94', external: true },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/greg-chism/', external: true },
            { label: 'Resume', href: '/resume', external: false },
          ].map(({ label, href, external }) => (
            <a key={label} href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="font-mono text-[10px] tracking-[0.14em] uppercase text-stone/55 dark:text-cream/40 hover:text-juniper dark:hover:text-teal transition-colors">
              {label}
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}

export default HomeContent
