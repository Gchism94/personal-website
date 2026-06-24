import Image from 'next/image'
import SectionHeader from '@/components/ui/SectionHeader'
import Tag from '@/components/ui/Tag'
import Button from '@/components/ui/Button'
import profilePic from '../../../../public/images/profile/developer-pic-2.jpg'

export const metadata = {
  title: 'About — Greg Chism',
  description: 'Data scientist, educator, and builder based in Bend, Oregon. Co-founder of Three Canyon Consulting and instructor at the University of Arizona.',
}

const skills = [
  { label: 'Languages & Tools', tags: ['R', 'Python', 'SQL', 'JavaScript', 'Docker', 'GitHub'], variant: 'default' },
  { label: 'AI & LLMs', tags: ['Prompt Engineering', 'Claude API', 'OpenAI API', 'RAG', 'Agentic Workflows', 'MCP'], variant: 'accent' },
  { label: 'Methods', tags: ['Machine Learning', 'Data Visualization', 'EDA', 'Reproducible Research', 'AI Evaluation'], variant: 'default' },
  { label: 'Domains', tags: ['Health Sciences', 'Education', 'Community Technology', 'AI Strategy', 'Data Infrastructure'], variant: 'default' },
]

const experience = [
  {
    title: 'Co-Founder & Principal Consultant',
    org: 'Three Canyon Consulting',
    period: '2024–Present',
    location: 'Bend, OR',
    desc: 'AI and data strategy consulting. Works with organizations to design better data systems, evaluate AI applications, and build decision-relevant insight pipelines.',
  },
  {
    title: 'Instructor & Researcher',
    org: 'University of Arizona',
    period: '2023–Present',
    location: 'Remote',
    desc: 'Teaches graduate courses in data analysis, visualization, and data mining. Research focuses on reproducible methods in health and education contexts.',
  },
  {
    title: 'Data Science Educator',
    org: 'UArizona Data Science Institute',
    period: '2022–2023',
    location: 'Tucson, AZ',
    desc: 'Mentored 40+ graduate students and postdocs in evidence-driven analytical methods and reproducible research workflows.',
  },
  {
    title: 'Research Scientist',
    org: 'UArizona Social Insect Lab',
    period: '2017–2022',
    location: 'Tucson, AZ',
    desc: 'Designed and executed interdisciplinary empirical research. Built reproducible analysis pipelines with Binder and GitHub Actions.',
  },
  {
    title: 'Research Assistant',
    org: 'UC Santa Barbara',
    period: '2014–2017',
    location: 'Santa Barbara, CA',
    desc: 'Applied research including a Red Cross–facing initiative in Central America. Co-authored peer-reviewed publications.',
  },
]

const education = [
  { degree: 'PhD, Entomology & Insect Science', school: 'University of Arizona', year: '2017–2022' },
  { degree: 'BS, Zoology', school: 'UC Santa Barbara', year: '2014–2016' },
  { degree: 'Carpentries Instructor Certification', school: 'The Carpentries', year: '2022' },
]

export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-8 py-20">
      <h1 className="font-serif text-4xl xl:text-3xl font-bold text-bark dark:text-cream mb-14 leading-tight">About</h1>

      {/* Bio + Photo */}
      <div className="flex gap-14 mb-24 lg:flex-col">
        <div className="flex-1">
          <div className="space-y-5 font-dm-sans font-light text-base text-stone dark:text-cream/70 leading-relaxed mb-8">
            <p>I&apos;m a data scientist, educator, and builder based in Bend, Oregon.</p>
            <p>My consulting practice, Three Canyon Consulting, works with universities, health systems, and mission-driven organizations to help them make better decisions with the data they already have. I focus on the full pipeline — from data infrastructure to the room where a decision actually gets made.</p>
            <p>I&apos;m also a researcher and instructor at the University of Arizona, where I teach graduate students data visualization and data mining, and publish on reproducible research methods in health and education contexts.</p>
            <p>Alongside all of that, I&apos;m building Steppe — member-owned civic infrastructure for Central Oregon that puts people before engagement metrics. No ads, no algorithmic amplification; neighbors verify they&apos;re local, then govern it together, one member, one vote.</p>
            <p>I grew up believing that data and technology should make communities stronger, not extract from them. That belief shows up in every project I take on.</p>
          </div>
          <Button href="/resume" variant="secondary">View Resume</Button>
        </div>
        <div className="w-64 flex-shrink-0 lg:w-full lg:max-w-xs">
          <Image
            src={profilePic}
            alt="Greg Chism"
            className="rounded-lg border border-sand/60 dark:border-white/8 w-full h-auto"
            sizes="(max-width: 1023px) 320px, 256px"
          />
        </div>
      </div>

      {/* Experience */}
      <SectionHeader label="Career" heading="Experience" className="mb-10" />
      <div className="relative border-l border-sand/50 dark:border-white/10 pl-8 mb-24 space-y-10">
        {experience.map((e) => (
          <div key={`${e.title}-${e.org}`} className="relative">
            <div className="absolute -left-[2.35rem] top-1.5 w-2.5 h-2.5 rounded-full bg-rust dark:bg-teal ring-2 ring-linen dark:ring-midnight" />
            <h3 className="font-serif text-lg font-bold text-bark dark:text-cream leading-snug">{e.title}</h3>
            <p className="font-mono text-[9px] tracking-[0.14em] uppercase text-stone/55 dark:text-cream/40 mt-1 mb-2">{e.org} · {e.period} · {e.location}</p>
            <p className="font-dm-sans font-light text-sm text-stone dark:text-cream/60 leading-relaxed">{e.desc}</p>
          </div>
        ))}
      </div>

      {/* Skills */}
      <SectionHeader label="Expertise" heading="Skills" className="mb-10" />
      <div className="grid grid-cols-2 gap-10 mb-24 lg:grid-cols-1">
        {skills.map(({ label, tags, variant }) => (
          <div key={label}>
            <p className="font-mono text-[9px] tracking-[0.18em] uppercase text-stone/55 dark:text-cream/40 mb-3">{label}</p>
            <div className="flex flex-wrap gap-2">
              {tags.map(t => <Tag key={t} variant={variant}>{t}</Tag>)}
            </div>
          </div>
        ))}
      </div>

      {/* Education */}
      <SectionHeader label="Background" heading="Education" className="mb-10" />
      <div className="relative border-l border-sand/50 dark:border-white/10 pl-8 space-y-8">
        {education.map((e) => (
          <div key={e.degree} className="relative">
            <div className="absolute -left-[2.35rem] top-1.5 w-2.5 h-2.5 rounded-full bg-rust dark:bg-teal ring-2 ring-linen dark:ring-midnight" />
            <h3 className="font-serif text-base font-bold text-bark dark:text-cream">{e.degree}</h3>
            <p className="font-mono text-[9px] tracking-[0.14em] uppercase text-stone/55 dark:text-cream/40 mt-1">{e.school} · {e.year}</p>
          </div>
        ))}
      </div>

      {/* Reading List */}
      <SectionHeader label="Beyond the work" heading="A Working Library" className="mt-24 mb-10" />
      <div className="rounded-lg border border-sand/60 dark:border-white/8 border-l-2 border-l-rust dark:border-l-teal bg-linen dark:bg-white/[0.04] p-7">
        <p className="font-dm-sans font-light text-base text-stone dark:text-cream/70 leading-relaxed mb-5 max-w-2xl">
          A reading list on tacit and formal knowledge, the craft of building humane tools, and the systems and commons they live in — forty books across three movements, mapped by the motifs that thread through them.
        </p>
        <Button href="/reading" variant="ghost">Open the reading list →</Button>
      </div>
    </div>
  )
}
