import Image from 'next/image'
import SectionHeader from '@/components/ui/SectionHeader'
import Tag from '@/components/ui/Tag'
import Button from '@/components/ui/Button'
import info526 from '../../../../public/images/articles/info526Logo.png'
import info523 from '../../../../public/images/articles/info523Logo.png'

export const metadata = {
  title: 'Research & Teaching — Greg Chism',
  description: 'Courses, research, and workshop materials by Greg Chism, instructor at the University of Arizona iSchool.',
}

const publications = [
  // ── 2026 ──────────────────────────────────────────────────────────
  {
    title: 'NAIRR Funded AI Sandbox',
    venue: 'Zenodo', year: '2026',
    href: 'https://doi.org/10.5281/zenodo.20074028',
    abstract: 'An AI research sandbox funded through the National AI Research Resource (NAIRR) pilot program, providing infrastructure and tools for exploring applied AI in research and educational contexts.',
  },
  {
    title: 'JS2 AI in Healthcare Framework',
    venue: 'Zenodo', year: '2026',
    href: 'https://doi.org/10.5281/zenodo.18356383',
    abstract: 'A structured framework for integrating AI tools into healthcare workflows, developed using Jetstream2 research computing infrastructure to address practical deployment challenges in clinical settings.',
  },
  {
    title: 'De La Rosa, Chism et al. — Do somatic symptoms bias depression screening? Reliability and equivalence of PHQ-8 in those with and without chronic pain',
    venue: 'Journal of Affective Disorders', year: '2026',
    href: 'https://doi.org/10.1016/j.jad.2026.121496',
    abstract: 'Examines whether somatic symptoms systematically bias PHQ-8 depression screening in individuals with chronic pain. Tests measurement equivalence and reliability across groups, with implications for screening validity in pain populations.',
    boldChism: true,
  },
  // ── 2024 ──────────────────────────────────────────────────────────
  {
    title: 'Swetnam et al. — CyVerse: Cyberinfrastructure for open science',
    venue: 'PLOS Computational Biology', year: '2024',
    href: 'https://doi.org/10.1371/journal.pcbi.1011270',
    abstract: 'Documents CyVerse, an NSF-funded cyberinfrastructure platform for open science providing data storage, cloud services, and computational tools to support reproducible biological and data science research.',
  },
  // ── 2022 ──────────────────────────────────────────────────────────
  {
    title: 'Nest shape influences colony organization in ants',
    venue: 'bioRxiv', year: '2022',
    href: 'https://www.biorxiv.org/content/biorxiv/early/2022/07/02/2022.06.30.498314.full.pdf',
    abstract: 'Examines how artificial nest layouts affect within-colony spatial distribution and individual ant space use. Finds nest architecture alters colony spread but not individual territory size.',
  },
  {
    title: 'Nest shape does not affect ant colony performance against a nest invader',
    venue: 'Zenodo', year: '2022',
    href: 'https://zenodo.org/record/6872019',
    abstract: 'Tests whether nest geometry influences collective defense performance. Colony defensive behavior remains consistent across nest designs, suggesting flexible behavioral repertoires.',
  },
  {
    title: 'Temnothorax rugatulus ants do not change nest walls in response to environmental humidity',
    venue: 'bioRxiv', year: '2022',
    href: 'https://www.biorxiv.org/content/10.1101/2022.06.30.497551v1',
    abstract: 'Investigates nest-wall modification under varying humidity conditions. Results indicate this species does not use wall remodeling as a humidity regulation strategy.',
  },
  // ── 2021 ──────────────────────────────────────────────────────────
  {
    title: 'A hymenopteran odorant alerts flies to bury eggs',
    venue: 'bioRxiv', year: '2021',
    href: 'https://www.biorxiv.org/content/10.1101/2021.09.30.462443v2',
    abstract: 'Identifies a chemical signal produced by hymenopterans that triggers egg-burying behavior in flies, revealing an interspecific chemical communication pathway with implications for host-parasite dynamics.',
  },
  // ── 2020 ──────────────────────────────────────────────────────────
  {
    title: 'ABCTracker: an easy-to-use, cloud-based application for tracking multiple objects',
    venue: 'abctracker.org', year: '2020',
    href: 'https://www.abctracker.org/',
    abstract: 'Presents a cloud-accessible video tracking system designed for behavioral research. Combines automatic and semi-automatic tracking to handle diverse research contexts with minimal technical overhead.',
  },
  // ── 2017 ──────────────────────────────────────────────────────────
  {
    title: 'Intraindividual Behavioral Variability Predicts Foraging Outcome in a Beach-dwelling Jumping Spider',
    venue: 'Nature Scientific Reports', year: '2017',
    href: 'https://www.nature.com/articles/s41598-017-18359-x',
    abstract: 'Demonstrates that consistent individual behavioral differences in jumping spiders predict foraging success, contributing to the field of animal personality research.',
  },
]

function PubTitle({ title, boldChism }) {
  if (!boldChism) return <>{title}</>
  const parts = title.split('Chism')
  return <>{parts[0]}<strong>Chism</strong>{parts[1]}</>
}

function PubListWithAbstracts({ pubs }) {
  const years = [...new Set(pubs.map(p => p.year))].sort((a, b) => b - a)
  const byYear = years.reduce((acc, y) => {
    acc[y] = pubs.filter(p => p.year === y)
    return acc
  }, {})

  return (
    <div>
      {years.map((year, yi) => (
        <div key={year}>
          <p className={`font-mono text-[8px] tracking-[0.2em] uppercase text-stone/35 dark:text-cream/25 ${yi === 0 ? 'mb-4' : 'mt-10 mb-4'}`}>
            {year}
          </p>
          <div className="space-y-8">
            {byYear[year].map(({ title, venue, href, abstract, boldChism }) => (
              <div key={title} className="border-b border-sand/40 dark:border-white/6 pb-8 last:border-0">
                <a href={href} target="_blank" rel="noopener noreferrer"
                  className="font-serif text-lg font-bold text-bark dark:text-cream hover:text-juniper dark:hover:text-teal transition-colors block mb-1">
                  <PubTitle title={title} boldChism={boldChism} />
                </a>
                <p className="font-mono text-[9px] tracking-[0.1em] uppercase text-stone/50 dark:text-cream/35 mb-3">{venue}</p>
                {abstract && (
                  <p className="font-dm-sans font-light text-sm text-stone dark:text-cream/60 leading-relaxed">{abstract}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Research() {
  return (
    <div className="max-w-5xl mx-auto px-8 py-20">
      <SectionHeader heading="Research &amp; Teaching" className="mb-16" />

      {/* Courses */}
      <section className="mb-20">
        <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-stone/55 dark:text-cream/40 mb-2">Current Courses</p>
        <p className="font-dm-sans font-light text-sm text-stone dark:text-cream/55 mb-8">University of Arizona · iSchool</p>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-1">
          {[
            {
              img: info526, num: 'INFO 526', title: 'Data Analysis & Visualization',
              desc: 'Covers principles of graphic design, programming, and statistical knowledge required to build visualizations that communicate effectively. Students produce publication-ready figures in R and Python.',
              href: 'https://datavizaz.org/',
            },
            {
              img: info523, num: 'INFO 523', title: 'Data Mining & Discovery',
              desc: 'Introduces data mining concepts from statistics, machine learning, and AI for knowledge discovery from large datasets. Emphasizes hands-on reproducible workflows and real-world applications.',
              href: 'https://datamineaz.org/',
            },
          ].map(({ img, num, title, desc, href }) => (
            <div key={num} className="border border-sand/60 dark:border-white/8 rounded-lg overflow-hidden">
              <div className="bg-sand/15 dark:bg-white/[0.04] p-5">
                <Image src={img} alt={title} className="w-full h-auto rounded" />
              </div>
              <div className="p-6">
                <Tag className="mb-3">{num}</Tag>
                <h3 className="font-serif text-lg font-bold text-bark dark:text-cream mb-3">{title}</h3>
                <p className="font-dm-sans font-light text-sm text-stone dark:text-cream/60 leading-relaxed mb-4">{desc}</p>
                <a href={href} target="_blank" rel="noopener noreferrer"
                  className="font-mono text-[9px] tracking-[0.14em] uppercase text-juniper dark:text-teal hover:underline">
                  View Course →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Research Interests */}
      <section className="mb-20">
        <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-stone/55 dark:text-cream/40 mb-8">Research Interests</p>
        <p className="font-dm-sans font-light text-base text-stone dark:text-cream/70 leading-relaxed max-w-2xl">
          My research sits at the intersection of reproducible data science, health informatics, and data science education. I&apos;m interested in how communities — whether research groups or neighborhoods — interact with data systems and how technology can be designed to serve the people most affected by its conclusions. This includes questions about AI evaluation, uncertainty communication, and the social infrastructure that makes evidence-based decisions possible.
        </p>
      </section>

      {/* Publications */}
      <section className="mb-20">
        <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-stone/55 dark:text-cream/40 mb-8">Selected Publications</p>
        <PubListWithAbstracts pubs={publications} />
      </section>

      {/* Workshop Materials */}
      <section>
        <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-stone/55 dark:text-cream/40 mb-4">Workshop Materials</p>
        <p className="font-dm-sans font-light text-base text-stone dark:text-cream/70 leading-relaxed mb-5">
          Workshop materials from DSI and previous teaching roles — covering EDA in R and Python, reproducible research workflows, SQL, and Unix shell — are available on GitHub.
        </p>
        <Button href="https://github.com/Gchism94" variant="ghost" external>View on GitHub →</Button>
      </section>
    </div>
  )
}
