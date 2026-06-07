import Tag from '@/components/ui/Tag'
import Button from '@/components/ui/Button'

export const metadata = {
  title: 'Work — Greg Chism',
  description: 'Consulting, platforms, tools, and research by Greg Chism — data scientist, consultant, and educator based in Bend, Oregon.',
}

const publications = [
  // ── 2026 ──────────────────────────────────────────────────────────
  {
    title: 'NAIRR Funded AI Sandbox',
    venue: 'Zenodo', year: '2026',
    href: 'https://doi.org/10.5281/zenodo.20074028',
  },
  {
    title: 'JS2 AI in Healthcare Framework',
    venue: 'Zenodo', year: '2026',
    href: 'https://doi.org/10.5281/zenodo.18356383',
  },
  {
    title: 'De La Rosa, Chism et al. — Do somatic symptoms bias depression screening? Reliability and equivalence of PHQ-8 in those with and without chronic pain',
    venue: 'Journal of Affective Disorders', year: '2026',
    href: 'https://doi.org/10.1016/j.jad.2026.121496',
    boldChism: true,
  },
  // ── 2024 ──────────────────────────────────────────────────────────
  {
    title: 'Swetnam et al. — CyVerse: Cyberinfrastructure for open science',
    venue: 'PLOS Computational Biology', year: '2024',
    href: 'https://doi.org/10.1371/journal.pcbi.1011270',
  },
  // ── 2022 ──────────────────────────────────────────────────────────
  {
    title: 'Nest shape influences colony organization in ants',
    venue: 'bioRxiv', year: '2022',
    href: 'https://www.biorxiv.org/content/biorxiv/early/2022/07/02/2022.06.30.498314.full.pdf',
  },
  {
    title: 'Nest shape does not affect ant colony performance against a nest invader',
    venue: 'Zenodo', year: '2022',
    href: 'https://zenodo.org/record/6872019',
  },
  {
    title: 'Temnothorax rugatulus ants do not change nest walls in response to environmental humidity',
    venue: 'bioRxiv', year: '2022',
    href: 'https://www.biorxiv.org/content/10.1101/2022.06.30.497551v1',
  },
  // ── 2021 ──────────────────────────────────────────────────────────
  {
    title: 'A hymenopteran odorant alerts flies to bury eggs',
    venue: 'bioRxiv', year: '2021',
    href: 'https://www.biorxiv.org/content/10.1101/2021.09.30.462443v2',
  },
  // ── 2020 ──────────────────────────────────────────────────────────
  {
    title: 'ABCTracker: an easy-to-use, cloud-based application for tracking multiple objects',
    venue: 'abctracker.org', year: '2020',
    href: 'https://www.abctracker.org/',
  },
  // ── 2017 ──────────────────────────────────────────────────────────
  {
    title: 'Intraindividual Behavioral Variability Predicts Foraging Outcome in a Beach-dwelling Jumping Spider',
    venue: 'Nature Scientific Reports', year: '2017',
    href: 'https://www.nature.com/articles/s41598-017-18359-x',
  },
]

function PubTitle({ title, boldChism }) {
  if (!boldChism) return <>{title}</>
  const parts = title.split('Chism')
  return <>{parts[0]}<strong>Chism</strong>{parts[1]}</>
}

function PubList({ pubs }) {
  // Group by year, descending
  const years = [...new Set(pubs.map(p => p.year))].sort((a, b) => b - a)
  const byYear = years.reduce((acc, y) => {
    acc[y] = pubs.filter(p => p.year === y)
    return acc
  }, {})

  return (
    <div>
      {years.map((year, yi) => (
        <div key={year}>
          <p className={`font-mono text-[8px] tracking-[0.2em] uppercase text-stone/35 dark:text-cream/25 ${yi === 0 ? 'mb-3' : 'mt-8 mb-3'}`}>
            {year}
          </p>
          <ul className="divide-y divide-sand/40 dark:divide-white/8">
            {byYear[year].map(({ title, venue, href, boldChism }) => (
              <li key={title} className="py-5">
                <a href={href} target="_blank" rel="noopener noreferrer"
                  className="font-dm-sans font-light text-base text-bark dark:text-cream hover:text-juniper dark:hover:text-teal transition-colors block mb-1">
                  <PubTitle title={title} boldChism={boldChism} />
                </a>
                <p className="font-mono text-[9px] tracking-[0.1em] uppercase text-stone/45 dark:text-cream/35">
                  {venue}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default function Work() {
  return (
    <div className="max-w-5xl mx-auto px-8 py-20">

      <h1 className="font-serif text-4xl xl:text-3xl font-bold text-bark dark:text-cream mb-3 leading-tight">Work</h1>
      <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-stone/50 dark:text-cream/35 mb-20">Selected projects &amp; consulting</p>

      {/* ── SECTION 1: THREE CANYON ── */}
      <section className="mb-20">
        <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-stone/50 dark:text-cream/35 mb-10">Consulting</p>

        <h2 className="font-serif text-3xl font-bold text-bark dark:text-cream mb-2 leading-snug">
          Three Canyon Consulting
        </h2>
        <p className="font-mono text-[9px] tracking-[0.14em] uppercase text-stone/50 dark:text-cream/40 mb-10">
          Co-Founder &amp; Principal Consultant · 2024–Present · Bend, OR
        </p>

        <div className="grid grid-cols-2 gap-16 mb-8 lg:grid-cols-1 lg:gap-10">
          <div>
            <p className="font-dm-sans font-light text-base text-stone dark:text-cream/75 leading-relaxed">
              AI and data strategy consulting for universities, health systems, and mission-driven
              organizations. I help teams design better data systems, evaluate AI applications
              thoughtfully, and build decision-relevant insight pipelines that actually get used
              by the people who need them.
            </p>
          </div>
          <div>
            <p className="font-mono text-[9px] tracking-[0.18em] uppercase text-stone/45 dark:text-cream/35 mb-5">Services</p>
            <ul className="space-y-3">
              {['Data Systems Design', 'AI Application Evaluation', 'Insight Pipeline Development', 'Research &amp; Analytics Strategy'].map((s) => (
                <li key={s} className="font-dm-sans font-light text-sm text-stone dark:text-cream/75 border-b border-sand/40 dark:border-white/8 pb-3 last:border-0"
                  dangerouslySetInnerHTML={{ __html: s }}
                />
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-7">
          {['AI Strategy', 'Data Systems', 'Organizational Consulting', 'LLMs'].map((t) => (
            <Tag key={t} variant="accent">{t}</Tag>
          ))}
        </div>

        <div className="flex flex-col items-start gap-4">
          <Button href="https://threecanyonconsult.com" variant="primary" external>
            threecanyonconsult.com
          </Button>
          <div className="rounded border border-dashed border-sand/60 dark:border-white/15 bg-sand/10 dark:bg-white/[0.03] px-5 py-3">
            <p className="font-mono text-[9px] tracking-[0.14em] uppercase text-stone/45 dark:text-cream/35">
              Case study in preparation — currently under NDA
            </p>
          </div>
        </div>
      </section>

      <hr className="border-sand/40 dark:border-white/8 mb-20" />

      {/* ── SECTION 2: HIGH DESERT ── */}
      <section className="mb-20">
        <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-stone/50 dark:text-cream/35 mb-10">Platform</p>

        <h2 className="font-serif text-3xl font-bold text-bark dark:text-cream mb-2 leading-snug">
          High Desert
        </h2>
        <p className="font-mono text-[9px] tracking-[0.14em] uppercase text-juniper dark:text-teal mb-8">
          Launching soon · Central Oregon
        </p>

        <div className="space-y-4 mb-8 max-w-2xl">
          <p className="font-dm-sans font-light text-base text-stone dark:text-cream/75 leading-relaxed">
            A community platform for Central Oregon built around a simple premise: technology
            should serve the people who live somewhere, not extract from them.
          </p>
          <p className="font-dm-sans font-light text-base text-stone dark:text-cream/75 leading-relaxed">
            No ads. No algorithmic feeds. Local residency required. Democratic governance.
            Built as a public good for a place I live in and love.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-7">
          {['Community Tech', 'Central Oregon', 'No Ads', 'Local Residency'].map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Button href="/high-desert" variant="primary">Read the overview →</Button>
          {/* ── FIX ONCE LIVE, ALSO UPDATE LINK TO OVERVIEW PAGE
          <Button href="https://highdesert.community" variant="secondary" external>
            highdesert.community →
          </Button>
          ── */}
        </div>
      </section>

      <hr className="border-sand/40 dark:border-white/8 mb-20" />

      {/* ── SECTION 3: EDUCLOUD × QUAD ── */}
      <section className="mb-20">
        <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-stone/50 dark:text-cream/35 mb-10">Education Infrastructure</p>

        <h2 className="font-serif text-3xl font-bold text-bark dark:text-cream mb-2 leading-snug">
          EduCloud × Quad
        </h2>
        <p className="font-mono text-[9px] tracking-[0.14em] uppercase text-juniper dark:text-teal mb-8">
          Federated system architecture · ACCESS · NAIRR · JS2
        </p>

        <div className="space-y-4 mb-8 max-w-2xl">
          <p className="font-dm-sans font-light text-base text-stone dark:text-cream/75 leading-relaxed">
            A modular, federated architecture for educational research computing: two planes joined
            at a single seam — a self-hostable, privacy-minimal coursework plane (Quad) and a
            pluggable resource plane (EduCloud) that routes, meters, and runs compute across ACCESS,
            HPC, and cloud backends.
          </p>
          <p className="font-dm-sans font-light text-base text-stone dark:text-cream/75 leading-relaxed">
            Free-by-default, governed as a commons, and designed so the people inside the system
            always keep the final word over the machine.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-7">
          {['Systems Design', 'Federated Compute', 'ACCESS / NAIRR', 'Privacy by Design'].map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>

        <Button href="/educloud" variant="primary">Explore the architecture →</Button>
      </section>

      <hr className="border-sand/40 dark:border-white/8 mb-20" />

      {/* ── SECTION 4: JUPYTERQUEST ── */}
      <section className="mb-20">
        <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-stone/50 dark:text-cream/35 mb-8">Open Source Tool</p>
        <div className="border border-sand/40 dark:border-white/8 rounded-lg p-6">
          <div className="flex items-start justify-between gap-8 sm:flex-col">
            <div className="flex-1">
              <h3 className="font-serif text-xl font-bold text-bark dark:text-cream mb-2">JupyterQuest</h3>
              <p className="font-dm-sans font-light text-sm text-stone dark:text-cream/75 leading-relaxed mb-4">
                Gamified, interactive Jupyter notebook environment for teaching reproducible data science.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {['Education', 'Python', 'Jupyter', 'Open Source'].map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Button href="https://github.com/Gchism94/jupyterquest" variant="ghost" external>
                View on GitHub →
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: RESEARCH PUBLICATIONS ── */}
      <section>
        <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-stone/50 dark:text-cream/35 mb-8">Research Publications</p>
        <div className="mb-8">
          <PubList pubs={publications} />
        </div>
        <Button href="/resume" variant="secondary">Full Resume</Button>
      </section>
    </div>
  )
}
