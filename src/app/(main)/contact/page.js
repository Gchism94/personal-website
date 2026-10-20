import PageHeading from '@/components/PageHeading'

export const metadata = {
  title: 'Contact — Greg Chism',
  description: 'Get in touch about consulting, research, education, or a good question.',
}

const topics = [
  ['01', 'Build something useful.', 'Data systems, AI strategy, and tools shaped around the people who use them.', 'Consulting inquiry'],
  ['02', 'Learn something together.', 'Workshops, speaking, curriculum, and research computing education.', 'Education and speaking'],
  ['03', 'Follow a good question.', 'Research collaborations, community projects, and ideas still taking shape.', 'A question worth exploring'],
]

export default function Contact() {
  return <div className="editorial-wrap content-page contact-page">
    <PageHeading label="Contact / Bend, Oregon" description="A project, a collaboration, or a question you can’t quite leave alone. I’d like to hear about it.">Let’s start<br /><em>a conversation.</em></PageHeading>
    <a className="contact-address" href="mailto:gchism94@gmail.com">gchism94@gmail.com <span aria-hidden="true">↗</span></a>
    <p className="contact-note">Email is the best way to reach me. Usually within a few days.</p>
    <div className="contact-topics">{topics.map(([number, title, body, subject]) => <a key={number} href={`mailto:gchism94@gmail.com?subject=${encodeURIComponent(subject)}`}>
      <span className="editorial-label">{number} / Let’s talk</span><h2>{title}</h2><p>{body}</p><span className="topic-arrow" aria-hidden="true">↗</span>
    </a>)}</div>
    <div className="inline-links"><a className="text-link" href="https://github.com/Gchism94" target="_blank" rel="noopener noreferrer">GitHub ↗</a><a className="text-link" href="https://www.linkedin.com/in/greg-chism/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></div>
  </div>
}
