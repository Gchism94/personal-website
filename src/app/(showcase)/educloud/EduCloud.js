import Image from 'next/image'
import Link from 'next/link'
import styles from './educloud.module.css'

const modules = [
  { name: 'Cairn', role: 'The classroom', number: '01', description: 'From the first assignment to the final review.', body: 'Manage rosters, distribute work to student repositories, collect submissions, and run sandboxed grading. Cairn is the starting point for teaching with code, and can run on its own.', tags: ['Assignments', 'Git workflows', 'Instructor review'] },
  { name: 'Belay', role: 'The peer tutor', number: '02', description: 'Support the learning, not just the answer.', body: 'A tutoring loop built around domain-specific learning materials and checks on generated responses. Belay is designed to support learners without access to their grades.', tags: ['Guided practice', 'Domain packs', 'Response checks'] },
  { name: 'Waypoint', role: 'The shared home', number: '03', description: 'A place for the pieces to come together.', body: 'Hosting, identity, publishing, and a catalog for the ecosystem. Connect modules through shared services when useful, while retaining standalone deployment options.', tags: ['Hosting', 'Identity', 'Publishing'] },
  { name: 'Portage', role: 'The model router', number: '04', description: 'The right model, within your boundaries.', body: 'Route AI requests according to institutional policy, task needs, budgets, and evaluation. Keep model choices separate from the learning experience that depends on them.', tags: ['AI policy', 'Model routing', 'Evaluation'] },
  { name: 'Outfitter', role: 'The compute layer', number: '05', description: 'Resources for the work. A plan for their lifecycle.', body: 'Place workloads on available infrastructure, track their status and cost, and manage cleanup. Compute providers remain replaceable parts of the system.', tags: ['Workload placement', 'Budgets', 'Lifecycle'] },
]

function Contours() {
  return <svg viewBox="0 0 700 640" fill="none" aria-hidden="true" className={styles.contours}>
    {Array.from({ length: 16 }, (_, i) => <path key={i} d={`M${-120 + i * 18} 700 C${360 + i * 12} 400 ${-80 + i * 22} 370 ${200 + i * 18} 160 S${600 + i * 10} 150 790 -100`} stroke="currentColor" strokeWidth={i % 4 === 0 ? 1.4 : .6} opacity={i % 4 === 0 ? .5 : .25} />)}
    <g fill="currentColor"><circle cx="307" cy="272" r="5" /><circle cx="462" cy="180" r="5" /><circle cx="285" cy="440" r="5" /></g>
  </svg>
}

export default function EduCloud() {
  return <div className={styles.page}>
    <section className={`${styles.hero} editorial-wrap`}>
      <div className={styles.heroTop}><Link href="/work" className="editorial-label">← Selected work</Link><span className={styles.status}>In development</span></div>
      <div className={styles.heroGrid}>
        <div className={styles.heroCopy}>
          <p className="editorial-label">An open ecosystem for teaching with code</p>
          <h1>EduCloud<span>More room<br />for <em>learning.</em></span></h1>
          <p className={styles.lede}>Your classroom. Your tools. Your choice of infrastructure. Five connected modules, built to let educators start small and grow on their own terms.</p>
          <div className={styles.actions}><a href="#ecosystem" className={styles.primary}>Explore the ecosystem <span aria-hidden="true">↓</span></a><a href="https://github.com/EduCloud-Ecosystem" target="_blank" rel="noopener noreferrer" className="text-link">Follow the work ↗</a></div>
        </div>
        <div className={styles.heroArt}><Contours /><div className={styles.artNote}><span className="editorial-label">A shared landscape</span><p>Independent parts.<br />Common ground.</p></div><div className={styles.moduleIndex}>{modules.map(m => <a key={m.name} href={`#${m.name.toLowerCase()}`}><small>{m.number}</small><span>{m.name}</span><span aria-hidden="true">↗</span></a>)}</div></div>
      </div>
      <div className={styles.heroFoot}><span>Classroom → tutoring → infrastructure</span><span>Modular by design. Open by intention.</span></div>
    </section>

    <section className={`${styles.intro} editorial-wrap`}>
      <p className="editorial-label">The idea</p><div><h2>Build around the course.<br /><em>Keep your options open.</em></h2><p>Teaching tools should give educators more agency. EduCloud separates classroom workflows, tutoring, hosting, AI models, and computing so that changing one doesn’t mean starting over with everything.</p></div>
    </section>

    <section id="ecosystem" className={styles.ecosystem}>
      <div className="editorial-wrap">
        <div className={styles.sectionHead}><div><p className="editorial-label">01 / The ecosystem</p><h2>Five parts.<br />One teaching practice.</h2></div><p>Start with Cairn for the classroom. Add the capabilities your course needs. The connections below describe how the modules can work together; they are not a required stack.</p></div>
        <figure className={styles.diagram}>
          <div className={styles.diagramScroll} tabIndex={0} role="region" aria-label="EduCloud architecture diagram; scroll horizontally on smaller screens"><Image src="/images/diagrams/educloud-architecture.svg" width={1200} height={850} alt="Cairn supports classroom workflows and can connect to Outfitter for compute. Belay supports tutoring and can connect to Portage for model routing. Waypoint provides optional shared hosting, identity, and publishing. Cairn also connects to Git hosts; Outfitter connects to compute providers; Portage connects to model endpoints." /></div>
          <div className={styles.mobileMap}>
            <p className="editorial-label">Start with the learning</p>
            <div className={styles.mapLanes}>
              <div><a href="#cairn"><strong>Cairn</strong><span>Classroom & grading</span></a><p>Optional compute<br /><span aria-hidden="true">↓</span></p><a href="#outfitter"><strong>Outfitter</strong><span>Workloads & lifecycle</span></a></div>
              <div><a href="#belay"><strong>Belay</strong><span>Peer tutoring</span></a><p>Optional AI routing<br /><span aria-hidden="true">↓</span></p><a href="#portage"><strong>Portage</strong><span>Models & policy</span></a></div>
            </div>
            <p className={styles.mapShared}>Optional shared services</p><a href="#waypoint" className={styles.mapFoundation}><strong>Waypoint</strong><span>Hosting · identity · publishing</span></a>
            <p className={styles.mapNote}>Independent modules. Cairn can run alone.</p>
          </div>
          <figcaption><span>Conceptual architecture · Optional integrations</span><a href="/images/diagrams/educloud-architecture.svg" download>Download diagram ↓</a></figcaption>
        </figure>
      </div>
    </section>

    <section className={`${styles.moduleSection} editorial-wrap`} aria-labelledby="module-heading">
      <div className={styles.sectionHead}><div><p className="editorial-label">02 / Meet the modules</p><h2 id="module-heading">A clear job<br />for every part.</h2></div><p>Each module has a focused responsibility. Together, they connect teaching decisions to the infrastructure that makes them possible.</p></div>
      <div>{modules.map(m => <article key={m.name} id={m.name.toLowerCase()} className={styles.module}>
        <span className={styles.moduleNumber}>{m.number}</span><div className={styles.moduleName}><p className="editorial-label">{m.role}</p><h3>{m.name}</h3></div><div className={styles.moduleBody}><h4>{m.description}</h4><p>{m.body}</p><ul>{m.tags.map(t => <li key={t}>{t}</li>)}</ul></div>
      </article>)}</div>
    </section>

    <section className={styles.principles}><div className="editorial-wrap"><p className="editorial-label">03 / Design commitments</p><h2>More choice.<br /><em>Clearer boundaries.</em></h2><div className={styles.principleGrid}>
      <div><span>01</span><h3>Adopt what helps.</h3><p>Cairn can stand alone. Tutoring, shared hosting, model routing, and compute management are additions, not prerequisites.</p></div>
      <div><span>02</span><h3>Keep providers replaceable.</h3><p>Separate course logic from Git hosts, AI models, and compute services. Make the infrastructure fit the teaching.</p></div>
      <div><span>03</span><h3>Check the result.</h3><p>Grading, tutoring, routing, and resource spending need explicit checks. A model or provider saying it worked is not enough.</p></div>
    </div></div></section>

    <section className={`${styles.next} editorial-wrap`}>
      <div><p className="editorial-label">An ongoing project</p><h2>Built in the open.<br /><em>Grounded in teaching.</em></h2></div><div><p>EduCloud is in active development. Local testing and engineering progress are steps toward classroom use; they are not a claim of production readiness. Real-course acceptance, privacy review, and operational support remain part of that work.</p><p>I’m building this around the practical needs of educators and learners. If those are your questions too, let’s compare notes.</p><div className={styles.actions}><Link href="/contact" className={styles.primary}>Start a conversation <span aria-hidden="true">↗</span></Link><a href="https://github.com/EduCloud-Ecosystem" target="_blank" rel="noopener noreferrer" className="text-link">Explore the source ↗</a></div></div>
    </section>
  </div>
}
