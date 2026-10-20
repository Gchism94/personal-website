import PageHeading from '@/components/PageHeading'
import Image from 'next/image'
import SectionHeader from '@/components/ui/SectionHeader'
import Tag from '@/components/ui/Tag'
import Button from '@/components/ui/Button'
import profilePic from '../../../../public/images/profile/developer-pic-2.jpg'

export const metadata = {
  title: 'About — Greg Chism',
  description: 'Greg Chism is an Assistant Professor of Practice and Faculty Director of Instructional Computing at the University of Arizona, advancing AI-native classrooms and equitable infrastructure.',
}

const skills = [
  { label: 'Teaching & Infrastructure', tags: ['AI-native Classrooms', 'Learning Design', 'Research Computing', 'Open Infrastructure', 'AI Evaluation'], variant: 'accent' },
  { label: 'Languages & Tools', tags: ['R', 'Python', 'SQL', 'JavaScript', 'Docker', 'GitHub'], variant: 'default' },
  { label: 'AI & LLMs', tags: ['Prompt Engineering', 'Claude API', 'OpenAI API', 'RAG', 'Agentic Workflows', 'MCP'], variant: 'accent' },
  { label: 'Methods', tags: ['Machine Learning', 'Data Visualization', 'EDA', 'Reproducible Research', 'AI Evaluation'], variant: 'default' },
  { label: 'Domains', tags: ['Health Sciences', 'Education', 'Community Technology', 'AI Strategy', 'Data Infrastructure'], variant: 'default' },
]

const experience = [
  {
    title: 'Assistant Professor of Practice',
    org: 'University of Arizona',
    period: '2023–Present',
    location: 'Remote',
    desc: 'Graduate teaching in data science, machine learning, and AI. Faculty Director of Instructional Computing and lead for education and training in MESA, connecting learning design with research infrastructure.',
  },
  {
    title: 'Co-Founder & Principal Consultant',
    org: 'Three Canyon Consulting',
    period: '2024–Present',
    location: 'Bend, OR',
    desc: 'Applied data and AI work with universities, health systems, and mission-driven organizations.',
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
    <div className="editorial-wrap content-page about-page">
      <PageHeading label="About / Greg T. Chism" description="Assistant Professor of Practice and Faculty Director of Instructional Computing at the University of Arizona. Based in Bend, Oregon.">Curiosity, put<br /> <em>into practice.</em></PageHeading>

      {/* Bio + Photo */}
      <div className="about-bio">
        <div className="flex-1">
          <div className="space-y-5 font-dm-sans font-normal text-base text-stone dark:text-cream/70 leading-relaxed mb-8">
            <p>My work brings teaching, AI, and research computing together so that more people can learn by doing, with access to the tools their questions require. I&apos;m focused on advancing AI-native classrooms and equitable access to the infrastructure that supports them.</p>
            <p>I teach graduate courses in data science, machine learning, and AI, and help connect instructional computing with the needs of educators and learners. I also lead education and training for <a href="https://idss-mesa.github.io/docs/" target="_blank" rel="noopener noreferrer">MESA</a>, helping researchers turn shared computing resources into practical skills and workflows.</p>
            <p>I&apos;m advancing AI-native classrooms: learning environments where assignments, feedback, AI support, and computing resources are designed together. Through <a href="/educloud">EduCloud</a>, I&apos;m building the infrastructure for that approach. Cairn supports classroom workflows; Belay brings peer tutoring into the learning environment; the wider ecosystem connects hosting, model access, and compute.</p>
            <p>Equitable access is central to this work. A student&apos;s ability to experiment should not depend on an expensive laptop or a personal AI subscription. I work toward shared, adaptable infrastructure that helps educators use institutional and public research resources, make costs visible, and keep meaningful choices in their hands.</p>
            <p>My path here began with studying collective behavior in social insects. That interest in how local interactions shape larger systems still informs how I think about classrooms, communities, and technology. It also runs through <a href="https://steppe.community" target="_blank" rel="noopener noreferrer">Steppe</a>, the civic commons I&apos;m building for Central Oregon, and <a href="https://midniht.app" target="_blank" rel="noopener noreferrer">Midniht</a>, a personal book library.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button href="/resume" variant="secondary">View Resume</Button>
            <Button href="/portfolio" variant="secondary">Learning Portfolio</Button>
          </div>
        </div>
        <div className="about-portrait">
          <Image src={profilePic} alt="Greg Chism" priority className="w-full h-auto" sizes="(max-width: 760px) 90vw, 36vw" />
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
            <p className="font-dm-sans font-normal text-sm text-stone dark:text-cream/60 leading-relaxed">{e.desc}</p>
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
        <p className="font-dm-sans font-normal text-base text-stone dark:text-cream/70 leading-relaxed mb-5 max-w-2xl">
          A reading list on tacit and formal knowledge, the craft of building humane tools, and the systems and commons they live in — forty books across three movements, mapped by the motifs that thread through them.
        </p>
        <Button href="/reading" variant="ghost">Open the reading list →</Button>
      </div>
    </div>
  )
}
