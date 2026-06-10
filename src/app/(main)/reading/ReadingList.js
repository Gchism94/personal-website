'use client'

import { useEffect, useRef, useState } from 'react'
import './reading-list.css'

/* The static constellation SVG — rendered as raw HTML to avoid hand-converting
   ~40 inline animation-delay styles. The effect below queries it through the ref. */
const CONSTELLATION = `<svg class="constellation" viewBox="0 0 960 600" role="img" aria-label="A map of 11 interconnected motifs"><rect class="skybg" x="0" y="0" width="960" height="600"/><circle class="dust" cx="120" cy="90" r="0.8" style="animation-delay:0.00s"/><circle class="dust" cx="380" cy="70" r="1.3" style="animation-delay:0.37s"/><circle class="dust" cx="600" cy="58" r="1.8" style="animation-delay:0.74s"/><circle class="dust" cx="820" cy="96" r="0.8" style="animation-delay:1.11s"/><circle class="dust" cx="905" cy="360" r="1.3" style="animation-delay:1.48s"/><circle class="dust" cx="560" cy="205" r="1.8" style="animation-delay:1.85s"/><circle class="dust" cx="150" cy="250" r="0.8" style="animation-delay:2.22s"/><circle class="dust" cx="360" cy="486" r="1.3" style="animation-delay:2.59s"/><circle class="dust" cx="632" cy="548" r="1.8" style="animation-delay:2.96s"/><circle class="dust" cx="786" cy="540" r="0.8" style="animation-delay:3.33s"/><circle class="dust" cx="884" cy="470" r="1.3" style="animation-delay:3.70s"/><circle class="dust" cx="60" cy="420" r="1.8" style="animation-delay:4.07s"/><circle class="dust" cx="516" cy="440" r="0.8" style="animation-delay:4.44s"/><circle class="dust" cx="300" cy="168" r="1.3" style="animation-delay:4.81s"/><circle class="dust" cx="742" cy="250" r="1.8" style="animation-delay:0.18s"/><circle class="dust" cx="214" cy="360" r="0.8" style="animation-delay:0.55s"/><line class="edge" data-pair="metis pedagogy" x1="250" y1="300" x2="186" y2="438" pathLength="1" style="animation-delay:0.40s"/><line class="edge" data-pair="metis power" x1="250" y1="300" x2="470" y2="512" pathLength="1" style="animation-delay:0.42s"/><line class="edge" data-pair="metis ai" x1="250" y1="300" x2="694" y2="470" pathLength="1" style="animation-delay:0.44s"/><line class="edge" data-pair="metis craft" x1="250" y1="300" x2="716" y2="318" pathLength="1" style="animation-delay:0.45s"/><line class="edge" data-pair="metis practice" x1="250" y1="300" x2="188" y2="156" pathLength="1" style="animation-delay:0.47s"/><line class="edge" data-pair="metis conviviality" x1="250" y1="300" x2="452" y2="140" pathLength="1" style="animation-delay:0.49s"/><line class="edge" data-pair="conviviality attention" x1="452" y1="140" x2="706" y2="150" pathLength="1" style="animation-delay:0.51s"/><line class="edge" data-pair="conviviality ai" x1="452" y1="140" x2="694" y2="470" pathLength="1" style="animation-delay:0.53s"/><line class="edge" data-pair="conviviality commons" x1="452" y1="140" x2="276" y2="524" pathLength="1" style="animation-delay:0.54s"/><line class="edge" data-pair="conviviality craft" x1="452" y1="140" x2="716" y2="318" pathLength="1" style="animation-delay:0.56s"/><line class="edge" data-pair="systems power" x1="492" y1="322" x2="470" y2="512" pathLength="1" style="animation-delay:0.58s"/><line class="edge" data-pair="systems commons" x1="492" y1="322" x2="276" y2="524" pathLength="1" style="animation-delay:0.60s"/><line class="edge" data-pair="systems attention" x1="492" y1="322" x2="706" y2="150" pathLength="1" style="animation-delay:0.62s"/><line class="edge" data-pair="systems ai" x1="492" y1="322" x2="694" y2="470" pathLength="1" style="animation-delay:0.63s"/><line class="edge" data-pair="systems craft" x1="492" y1="322" x2="716" y2="318" pathLength="1" style="animation-delay:0.65s"/><line class="edge" data-pair="systems security" x1="492" y1="322" x2="846" y2="228" pathLength="1" style="animation-delay:0.67s"/><line class="edge" data-pair="commons power" x1="276" y1="524" x2="470" y2="512" pathLength="1" style="animation-delay:0.69s"/><line class="edge" data-pair="commons practice" x1="276" y1="524" x2="188" y2="156" pathLength="1" style="animation-delay:0.71s"/><line class="edge" data-pair="pedagogy power" x1="186" y1="438" x2="470" y2="512" pathLength="1" style="animation-delay:0.72s"/><line class="edge" data-pair="pedagogy ai" x1="186" y1="438" x2="694" y2="470" pathLength="1" style="animation-delay:0.74s"/><line class="edge" data-pair="craft ai" x1="716" y1="318" x2="694" y2="470" pathLength="1" style="animation-delay:0.76s"/><line class="edge" data-pair="craft security" x1="716" y1="318" x2="846" y2="228" pathLength="1" style="animation-delay:0.78s"/><line class="edge" data-pair="attention power" x1="706" y1="150" x2="470" y2="512" pathLength="1" style="animation-delay:0.80s"/><line class="edge" data-pair="practice power" x1="188" y1="156" x2="470" y2="512" pathLength="1" style="animation-delay:0.81s"/><g class="node hub" data-id="metis" data-conn="pedagogy power ai craft practice conviviality" style="animation-delay:0.20s"><circle class="halo" cx="250" cy="300" r="18.2"/><circle class="ring" cx="250" cy="300" r="12"/><circle class="core" cx="250" cy="300" r="7"/><text class="nlabel" x="250" y="333" text-anchor="middle">Mētis</text><circle class="hit" cx="250" cy="300" r="24" tabindex="0" role="button" aria-label="Mētis"/></g><g class="node hub" data-id="systems" data-conn="power commons attention ai craft security" style="animation-delay:0.25s"><circle class="halo" cx="492" cy="322" r="18.2"/><circle class="ring" cx="492" cy="322" r="12"/><circle class="core" cx="492" cy="322" r="7"/><text class="nlabel" x="492" y="355" text-anchor="middle">Systems</text><circle class="hit" cx="492" cy="322" r="24" tabindex="0" role="button" aria-label="Systems"/></g><g class="node hub" data-id="power" data-conn="metis systems commons pedagogy attention practice" style="animation-delay:0.30s"><circle class="halo" cx="470" cy="512" r="18.2"/><circle class="ring" cx="470" cy="512" r="12"/><circle class="core" cx="470" cy="512" r="7"/><text class="nlabel" x="470" y="545" text-anchor="middle">Power</text><circle class="hit" cx="470" cy="512" r="24" tabindex="0" role="button" aria-label="Power"/></g><g class="node" data-id="conviviality" data-conn="metis attention ai commons craft" style="animation-delay:0.35s"><circle class="halo" cx="452" cy="140" r="13.0"/><circle class="ring" cx="452" cy="140" r="10"/><circle class="core" cx="452" cy="140" r="5"/><text class="nlabel" x="452" y="168" text-anchor="middle">Conviviality</text><circle class="hit" cx="452" cy="140" r="24" tabindex="0" role="button" aria-label="Conviviality"/></g><g class="node" data-id="attention" data-conn="conviviality systems power" style="animation-delay:0.40s"><circle class="halo" cx="706" cy="150" r="13.0"/><circle class="ring" cx="706" cy="150" r="10"/><circle class="core" cx="706" cy="150" r="5"/><text class="nlabel" x="706" y="178" text-anchor="middle">Attention</text><circle class="hit" cx="706" cy="150" r="24" tabindex="0" role="button" aria-label="Attention"/></g><g class="node" data-id="craft" data-conn="metis conviviality systems ai security" style="animation-delay:0.45s"><circle class="halo" cx="716" cy="318" r="13.0"/><circle class="ring" cx="716" cy="318" r="10"/><circle class="core" cx="716" cy="318" r="5"/><text class="nlabel" x="716" y="346" text-anchor="middle">Craft</text><circle class="hit" cx="716" cy="318" r="24" tabindex="0" role="button" aria-label="Craft"/></g><g class="node" data-id="ai" data-conn="metis conviviality systems pedagogy craft" style="animation-delay:0.50s"><circle class="halo" cx="694" cy="470" r="13.0"/><circle class="ring" cx="694" cy="470" r="10"/><circle class="core" cx="694" cy="470" r="5"/><text class="nlabel" x="694" y="498" text-anchor="middle">AI</text><circle class="hit" cx="694" cy="470" r="24" tabindex="0" role="button" aria-label="AI"/></g><g class="node" data-id="security" data-conn="systems craft" style="animation-delay:0.55s"><circle class="halo" cx="846" cy="228" r="13.0"/><circle class="ring" cx="846" cy="228" r="10"/><circle class="core" cx="846" cy="228" r="5"/><text class="nlabel" x="846" y="256" text-anchor="middle">Security</text><circle class="hit" cx="846" cy="228" r="24" tabindex="0" role="button" aria-label="Security"/></g><g class="node" data-id="pedagogy" data-conn="metis power ai" style="animation-delay:0.60s"><circle class="halo" cx="186" cy="438" r="13.0"/><circle class="ring" cx="186" cy="438" r="10"/><circle class="core" cx="186" cy="438" r="5"/><text class="nlabel" x="186" y="466" text-anchor="middle">Pedagogy</text><circle class="hit" cx="186" cy="438" r="24" tabindex="0" role="button" aria-label="Pedagogy"/></g><g class="node" data-id="practice" data-conn="metis commons power" style="animation-delay:0.65s"><circle class="halo" cx="188" cy="156" r="13.0"/><circle class="ring" cx="188" cy="156" r="10"/><circle class="core" cx="188" cy="156" r="5"/><text class="nlabel" x="188" y="184" text-anchor="middle">Practice</text><circle class="hit" cx="188" cy="156" r="24" tabindex="0" role="button" aria-label="Practice"/></g><g class="node" data-id="commons" data-conn="conviviality systems power practice" style="animation-delay:0.70s"><circle class="halo" cx="276" cy="524" r="13.0"/><circle class="ring" cx="276" cy="524" r="10"/><circle class="core" cx="276" cy="524" r="5"/><text class="nlabel" x="276" y="552" text-anchor="middle">Commons</text><circle class="hit" cx="276" cy="524" r="24" tabindex="0" role="button" aria-label="Commons"/></g></svg>`

const MDEF = {
  metis: { n: 'Mētis', d: 'Practical, tacit, situated know-how — the knowledge that lives in doing and resists being fully written down. The counterpart to epistēmē, formal codified knowledge, and the spine of this list.' },
  systems: { n: 'Systems', d: 'Seeing wholes rather than parts: stocks, flows, feedback loops, leverage points. Behavior emerges from structure, so you change a system by changing its structure.' },
  commons: { n: 'Commons', d: 'Resources held and governed collectively — code, knowledge, infrastructure. How groups sustain shared things without enclosure or collapse.' },
  conviviality: { n: 'Conviviality', d: 'Judging tools by one question: do they expand human autonomy, or manufacture dependency? Technology is never neutral.' },
  craft: { n: 'Craft', d: 'The discipline of making well — managing complexity through clear interfaces, deep modules, and durable design. Judgment over rules.' },
  pedagogy: { n: 'Pedagogy', d: 'How people actually learn — through participation, experience, and community, not transmission into an empty vessel.' },
  attention: { n: 'Attention', d: 'The political economy of distraction: how platforms capture attention and data, monetize them, and decay as they do.' },
  ai: { n: 'AI', d: 'Machine learning and the alignment problem — specifying objectives, the limits of optimization, and what shouldn’t be automated.' },
  power: { n: 'Power', d: 'Bureaucracy, legibility, and institutional capture — who gets to define the categories, impose order, and decide what counts.' },
  practice: { n: 'Practice', d: 'Acting well in the world: strategy, care, trust, and emergent, relational change. The know-how of doing, not just knowing.' },
  security: { n: 'Security', d: 'Keeping systems dependable when someone is trying to break them — isolation, least privilege, threat models, and trust boundaries.' },
}

export default function ReadingList() {
  const [tab, setTab] = useState('list') // 'list' | 'motifs' | 'read'
  const rootRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const svg = root.querySelector('.constellation')
    if (!svg) return
    const cap = root.querySelector('#skycap')
    const capN = cap.querySelector('.cap-name'), capD = cap.querySelector('.cap-def')
    const nodes = [...svg.querySelectorAll('.node')]
    const edges = [...svg.querySelectorAll('.edge')]
    const cards = [...root.querySelectorAll('.defcard')]
    let pinned = null

    function focusM(id) {
      svg.classList.add('focused')
      const node = nodes.filter((n) => n.getAttribute('data-id') === id)[0]
      const conn = (node ? node.getAttribute('data-conn') : '').split(' ')
      nodes.forEach((n) => {
        const d = n.getAttribute('data-id')
        n.classList.remove('on', 'near', 'off')
        if (d === id) n.classList.add('on')
        else if (conn.indexOf(d) >= 0) n.classList.add('near')
        else n.classList.add('off')
      })
      edges.forEach((e) => {
        const pr = e.getAttribute('data-pair').split(' ')
        const hit = pr.indexOf(id) >= 0
        e.classList.toggle('lit', hit)
        e.classList.toggle('off', !hit)
      })
      cards.forEach((c) => { c.classList.toggle('active', c.getAttribute('data-id') === id) })
      const m = MDEF[id]
      if (m) { capN.textContent = m.n; capD.textContent = m.d; cap.classList.add('show') }
    }
    function clearM() {
      svg.classList.remove('focused')
      nodes.forEach((n) => { n.classList.remove('on', 'near', 'off') })
      edges.forEach((e) => { e.classList.remove('lit', 'off') })
      cards.forEach((c) => { c.classList.remove('active') })
      cap.classList.remove('show'); capN.textContent = ''; capD.textContent = ''
    }
    function preview(id) { if (!pinned) focusM(id) }
    function unpreview() { if (!pinned) clearM() }
    function pin(id) { if (pinned === id) { pinned = null; clearM() } else { pinned = id; focusM(id) } }

    const controller = new AbortController()
    const { signal } = controller

    nodes.forEach((n) => {
      const id = n.getAttribute('data-id')
      n.addEventListener('mouseenter', () => preview(id), { signal })
      n.addEventListener('mouseleave', unpreview, { signal })
      n.addEventListener('click', (e) => { e.stopPropagation(); pin(id) }, { signal })
      n.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pin(id) } }, { signal })
    })
    cards.forEach((c) => {
      const id = c.getAttribute('data-id')
      c.addEventListener('mouseenter', () => preview(id), { signal })
      c.addEventListener('mouseleave', unpreview, { signal })
      c.addEventListener('click', () => pin(id), { signal })
    })
    ;[...root.querySelectorAll('.lk')].forEach((l) => {
      l.addEventListener('click', (e) => {
        e.stopPropagation()
        const id = l.getAttribute('data-go')
        pinned = id
        focusM(id)
        const c = cards.filter((c) => c.getAttribute('data-id') === id)[0]
        if (c) c.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, { signal })
    })
    svg.addEventListener('click', (e) => {
      if (e.target === svg || e.target.classList.contains('skybg')) { pinned = null; clearM() }
    }, { signal })

    return () => controller.abort()
  }, [])

  return (
    <div className="reading-list" ref={rootRef}>

      <header className="masthead">
        <div className="masthead-inner">
          <div className="eyebrow">Knowledge · Tools · Commons · Care — a reading list</div>
          <h1>Reading List</h1>
          <p className="masthead-sub">A working library on tacit and formal knowledge, the craft of building humane tools, and the systems and commons they live in — organized by motif and ordered to read top to bottom.</p>
        </div>
        <nav className="tab-strip">
          <button className={`tab ${tab === 'list' ? 'active' : ''}`} onClick={() => setTab('list')}>Reading List</button>
          <button className={`tab ${tab === 'motifs' ? 'active' : ''}`} onClick={() => setTab('motifs')}>Motifs</button>
          <button className={`tab ${tab === 'read' ? 'active' : ''}`} onClick={() => setTab('read')}>Finished</button>
        </nav>
      </header>

      <div className="body">

        {/* ─────────── READING LIST ─────────── */}
        <div id="list" className={`panel ${tab === 'list' ? 'active' : ''}`}>

          <div className="stats">
            <div className="stat"><strong>40</strong>Books, in order</div>
            <div className="stat"><strong>11</strong>Motifs</div>
            <div className="stat"><strong>3</strong>Movements</div>
          </div>

          <div className="revision-box">
            <p><strong>How this is organized.</strong> One reading order, grouped by motif and arranged in three movements — <em>Foundations</em> (the nature of knowledge, technology, and learning), <em>Building</em> (the craft of making tools well), and <em>Stakes</em> (the world those tools enter). Read roughly top to bottom; the sequence is deliberate, and each motif leans on the ones before it.</p>
            <p>Because much of this is listened to rather than read, every card flags how audio-friendly it is — Excellent, Good, Moderate, or Skip — and the dropdown offers lighter routes (a talk, lecture, documentary, or essay) where the prose is dense. <span className="tag tg-opt">Optional</span> marks a book that overlaps another; <span className="tag tg-ref">Reference</span> marks one to consult rather than read cover-to-cover.</p>
          </div>

          <div className="parthead first"><div className="pk">Part I</div><div className="pt">Foundations</div><div className="pd">Why build this way — the nature of knowledge, technology, and learning.</div></div>
          <div className="divider"><div className="divider-line"></div><div className="divider-label">Tacit &amp; Formal Knowledge</div><div className="divider-line"></div></div>
          <p className="secsub">The mētis / epistēmē spine: what can be made explicit, and what only lives in practice.</p>
          <div className="book pf">
            <div className="bnum">1</div>
            <div className="bcontent">
              <div className="btop"><span className="btitle">The Tacit Dimension</span><span className="bauthor">Michael Polanyi</span></div>
              <div className="btags"><span className="tag mo">Mētis</span></div>
              <div className="bdesc">The origin of “tacit knowledge” as a formal idea: we know more than we can tell, and the deepest knowledge can’t be fully made explicit without being destroyed.</div>
              <div className="audiobar"><span className="aud aud-skip">Audio · Skip audio</span><details className="alt"><summary>Skip the book — use these</summary><div className="altbody"><span className="narr">No authorized audiobook; short but aphoristic.</span><ul><li><b>infed.org</b> — “Michael Polanyi and tacit knowledge.” ~20-min read; the driving / face-recognition examples.</li><li>Schön’s MIT lecture (see The Reflective Practitioner) is the applied version.</li></ul></div></details></div>
            </div>
          </div>
          <div className="book pf">
            <div className="bnum">2</div>
            <div className="bcontent">
              <div className="btop"><span className="btitle">The Reflective Practitioner</span><span className="bauthor">Donald Schön</span></div>
              <div className="btags"><span className="tag mo">Mētis</span><span className="tag mo">Practice</span></div>
              <div className="bdesc">How skilled practitioners actually think — reflecting in action, reframing the problem on the fly — and why the “apply theory to practice” model fails in messy real work.</div>
              <div className="audiobar"><span className="aud aud-skip">Audio · Skip audio</span><details className="alt"><summary>Skip the book — watch / listen</summary><div className="altbody"><span className="narr">Dense 1983 case-heavy prose; no audiobook.</span><ul><li><b>MIT OpenCourseWare</b> 11.965 Reflective Practice, Lecture 1 — free, ~1h.</li><li>Schön’s own 1989 lecture (video); plus short summaries (Matuschak, IRISS).</li></ul></div></details></div>
            </div>
          </div>
          <div className="book pf">
            <div className="bnum">3</div>
            <div className="bcontent">
              <div className="btop"><span className="btitle">Thinking, Fast and Slow</span><span className="bauthor">Daniel Kahneman</span></div>
              <div className="btags"><span className="tag mo">Mētis</span></div>
              <div className="bdesc">The two-system model of mind: fast intuition versus slow deliberation, and the biases that follow. The cognitive substrate beneath judgment and expertise.</div>
              <div className="audiobar"><span className="aud aud-good">Audio · Good listen</span><details className="alt"><summary>Good — but 20 hours</summary><div className="altbody"><span className="narr">Narrated by Patrick Egan, 20h 02m.</span><ul><li><b>Narrative alt:</b> Michael Lewis, The Undoing Project — the ideas as a story.</li><li>Heads-up: the prospect-theory back half is heavier going.</li></ul></div></details></div>
            </div>
          </div>
          <div className="divider"><div className="divider-line"></div><div className="divider-label">Technology, Technique &amp; Conviviality</div><div className="divider-line"></div></div>
          <p className="secsub">Technology as ideology; tools that liberate versus tools that create dependency.</p>
          <div className="book pf">
            <div className="bnum">4</div>
            <div className="bcontent">
              <div className="btop"><span className="btitle">Technopoly</span><span className="bauthor">Neil Postman</span></div>
              <div className="btags"><span className="tag mo">Conviviality</span><span className="tag mo">Power</span></div>
              <div className="bdesc">Technology as ideology: how a culture can quietly surrender its values to technique and efficiency, redefining knowledge and purpose along the way.</div>
              <div className="audiobar"><span className="aud aud-good">Audio · Good listen</span><details className="alt"><summary>Good — or the 30-min version</summary><div className="altbody"><ul><li><b>Express:</b> Postman, “Informing Ourselves to Death” (1990 talk), ~30 min — the whole argument.</li><li><b>Video:</b> The Open Mind (PBS) interview, 1990.</li></ul></div></details></div>
            </div>
          </div>
          <div className="book pf">
            <div className="bnum">5</div>
            <div className="bcontent">
              <div className="btop"><span className="btitle">Tools for Conviviality</span><span className="bauthor">Ivan Illich</span></div>
              <div className="btags"><span className="tag mo">Conviviality</span></div>
              <div className="bdesc">The distinction at the heart of tool design: convivial tools expand human autonomy; industrial tools manufacture dependency past a certain scale.</div>
              <div className="audiobar"><span className="aud aud-mod">Audio · Moderate</span><details className="alt"><summary>Moderate — lighter routes</summary><div className="altbody"><ul><li><b>infed.org</b> Illich overview — the convivial-vs-industrial distinction.</li><li><b>L.M. Sacasas, “The Convivial Society”</b> (Substack) — Illich applied to today’s tech.</li></ul></div></details></div>
            </div>
          </div>
          <div className="book pf">
            <div className="bnum">6</div>
            <div className="bcontent">
              <div className="btop"><span className="btitle">Deschooling Society</span><span className="bauthor">Ivan Illich</span></div>
              <div className="btags"><span className="tag mo">Conviviality</span><span className="tag mo">Pedagogy</span><span className="tag tg-opt">Optional</span></div>
              <div className="bdesc">Illich’s case that institutional schooling confuses teaching with learning, and his sketch of decentralized “learning webs.”</div>
              <div className="audiobar"><span className="aud aud-mod">Audio · Moderate</span><details className="alt"><summary>Moderate — and skippable in full</summary><div className="altbody"><span className="ov">⚠ Overlap — forms one argument with Tools for Conviviality — read that in full plus this essay, not both books.</span><ul><li><b>infed.org</b> Illich overview — covers this and Tools for Conviviality.</li></ul></div></details></div>
            </div>
          </div>
          <div className="book pf">
            <div className="bnum">7</div>
            <div className="bcontent">
              <div className="btop"><span className="btitle">Computer Power and Human Reason</span><span className="bauthor">Joseph Weizenbaum</span></div>
              <div className="btags"><span className="tag mo">Conviviality</span><span className="tag mo">AI</span></div>
              <div className="bdesc">From the creator of ELIZA: the gap between what computers can do and what they should be entrusted with — a critique of computational reason from inside the field.</div>
              <div className="audiobar"><span className="aud aud-skip">Audio · Skip audio</span><details className="alt"><summary>Skip the book — watch instead</summary><div className="altbody"><span className="narr">Dense and philosophical; no prominent audiobook.</span><ul><li><b>Doc:</b> Weizenbaum: Rebel at Work (2007), ~80 min — Weizenbaum in his own words.</li><li><b>Doc:</b> Plug &amp; Pray (2010); plus “ELIZA effect” explainers.</li></ul></div></details></div>
            </div>
          </div>
          <div className="book pf">
            <div className="bnum">8</div>
            <div className="bcontent">
              <div className="btop"><span className="btitle">The Design of Everyday Things</span><span className="bauthor">Donald Norman</span></div>
              <div className="btags"><span className="tag mo">Conviviality</span><span className="tag mo">Craft</span></div>
              <div className="bdesc">Affordances, signifiers, feedback, mapping — why usability failures are design failures, and how to design for how people actually behave.</div>
              <div className="audiobar"><span className="aud aud-mod">Audio · Moderate</span><details className="alt"><summary>Visual subject — pair with audio</summary><div className="altbody"><span className="narr">Audiobook exists, but doors/stovetops lose force without the pictures.</span><ul><li><b>Podcast:</b> 99% Invisible — Norman’s worldview, episode after episode.</li><li><b>Book:</b> The 99% Invisible City (Mars &amp; Kohlstedt) — accessible, narrated.</li></ul></div></details></div>
            </div>
          </div>
          <div className="divider"><div className="divider-line"></div><div className="divider-label">Learning as Participation</div><div className="divider-line"></div></div>
          <p className="secsub">Education as social participation, and the long history of trying to automate it.</p>
          <div className="book pf">
            <div className="bnum">9</div>
            <div className="bcontent">
              <div className="btop"><span className="btitle">Democracy and Education</span><span className="bauthor">John Dewey</span></div>
              <div className="btags"><span className="tag mo">Pedagogy</span></div>
              <div className="bdesc">Education as how a society renews itself; learning as experiential and continuous with life; democracy as a mode of shared, communicated experience.</div>
              <div className="audiobar"><span className="aud aud-mod">Audio · Moderate</span><details className="alt"><summary>Dense 1916 prose — lighter routes</summary><div className="altbody"><span className="narr">Free LibriVox &amp; a paid Audible reading exist; neither is simplified.</span><ul><li><b>Podcast:</b> Philosophize This! ep. 130 — “Dewey and Lippmann on Democracy.”</li><li><b>BBC In Our Time</b>, “Pragmatism” (~43m); plus the IEP “John Dewey” overview.</li></ul></div></details></div>
            </div>
          </div>
          <div className="book pf">
            <div className="bnum">10</div>
            <div className="bcontent">
              <div className="btop"><span className="btitle">Situated Learning</span><span className="bauthor">Jean Lave &amp; Etienne Wenger</span></div>
              <div className="btags"><span className="tag mo">Pedagogy</span><span className="tag mo">Mētis</span></div>
              <div className="bdesc">Learning as participation: newcomers move from the edge toward the center of a community of practice. Knowledge is situated in activity, not transferred abstractly.</div>
              <div className="audiobar"><span className="aud aud-skip">Audio · Skip audio</span><details className="alt"><summary>Skip the book — use these</summary><div className="altbody"><span className="narr">Dense academic monograph; no audiobook.</span><ul><li><b>infed.org</b> — “Lave, Wenger and communities of practice.”</li><li>Wenger’s own “Communities of practice: a brief introduction.”</li></ul></div></details></div>
            </div>
          </div>
          <div className="book pf">
            <div className="bnum">11</div>
            <div className="bcontent">
              <div className="btop"><span className="btitle">Teaching Machines</span><span className="bauthor">Audrey Watters</span></div>
              <div className="btags"><span className="tag mo">Pedagogy</span></div>
              <div className="bdesc">The century-long history of teaching machines, from Skinner onward — the recurring dream of automating instruction, and what it keeps getting wrong.</div>
              <div className="audiobar"><span className="aud aud-good">Audio · Good listen</span><details className="alt"><summary>Good listen (narrative)</summary><div className="altbody"><ul><li>Narrative history — works well on audio.</li></ul></div></details></div>
            </div>
          </div>
          <div className="parthead"><div className="pk">Part II</div><div className="pt">Building</div><div className="pd">How to make tools well — craft, systems, security, and AI.</div></div>
          <div className="divider"><div className="divider-line"></div><div className="divider-label">The Craft of Software &amp; Design</div><div className="divider-line"></div></div>
          <p className="secsub">Managing complexity: how durable, legible systems get designed.</p>
          <div className="book pb">
            <div className="bnum">12</div>
            <div className="bcontent">
              <div className="btop"><span className="btitle">A Pattern Language</span><span className="bauthor">Christopher Alexander, Sara Ishikawa &amp; Murray Silverstein</span></div>
              <div className="btags"><span className="tag mo">Craft</span><span className="tag mo">Design</span></div>
              <div className="bdesc">A generative vocabulary of 253 design patterns, each a recurring problem-in-context and a reusable solution. The book that gave software its “design patterns” and the wiki.</div>
              <div className="audiobar"><span className="aud aud-skip">Audio · Skip audio</span><details className="alt"><summary>Not an audiobook at all</summary><div className="altbody"><span className="narr">1,100-pp cross-referenced reference with diagrams — unusable as linear audio.</span><ul><li><b>Podcast:</b> About Buildings + Cities, ep. 71 — “Christopher Alexander 2/2” (~1h 27m).</li><li><b>Radio:</b> Studio 360 segment on its software / internet influence.</li></ul></div></details></div>
            </div>
          </div>
          <div className="book pb">
            <div className="bnum">13</div>
            <div className="bcontent">
              <div className="btop"><span className="btitle">A Philosophy of Software Design</span><span className="bauthor">John Ousterhout</span></div>
              <div className="btags"><span className="tag mo">Craft</span></div>
              <div className="bdesc">A short, opinionated case for fighting complexity with deep modules and narrow interfaces — design judgment over rules.</div>
              <div className="audiobar"><span className="aud aud-mod">Audio · Moderate</span><details className="alt"><summary>Listenable (a little code)</summary><div className="altbody"><ul><li>Short (~190pp); mostly prose principles, a few snippets to skim in print later.</li></ul></div></details></div>
            </div>
          </div>
          <div className="book pb">
            <div className="bnum">14</div>
            <div className="bcontent">
              <div className="btop"><span className="btitle">Clean Architecture</span><span className="bauthor">Robert C. Martin</span></div>
              <div className="btags"><span className="tag mo">Craft</span><span className="tag tg-opt">Optional</span></div>
              <div className="bdesc">The dependency rule: keep business logic at the center and frameworks and hosts at the replaceable edges.</div>
              <div className="audiobar"><span className="aud aud-mod">Audio · Moderate</span><details className="alt"><summary>Optional — overlaps</summary><div className="altbody"><span className="ov">⚠ Overlap — overlaps A Philosophy of Software Design on boundaries — optional once that’s absorbed.</span><ul><li>Prose with some diagrams.</li></ul></div></details></div>
            </div>
          </div>
          <div className="book pb">
            <div className="bnum">15</div>
            <div className="bcontent">
              <div className="btop"><span className="btitle">Design Patterns</span><span className="bauthor">Gamma, Helm, Johnson &amp; Vlissides</span></div>
              <div className="btags"><span className="tag mo">Craft</span><span className="tag tg-ref">Reference</span></div>
              <div className="bdesc">The original catalog of reusable object-oriented patterns — a reference to skim, not read cover-to-cover.</div>
              <div className="audiobar"><span className="aud aud-skip">Audio · Reference</span><details className="alt"><summary>Reference — don’t audio it</summary><div className="altbody"><span className="narr">Not a read-through.</span><ul><li>A code-and-diagram catalog. Skim Adapter / Strategy; keep it on the shelf.</li></ul></div></details></div>
            </div>
          </div>
          <div className="book pb">
            <div className="bnum">16</div>
            <div className="bcontent">
              <div className="btop"><span className="btitle">Domain-Driven Design</span><span className="bauthor">Eric Evans</span></div>
              <div className="btags"><span className="tag mo">Craft</span><span className="tag tg-ref">Reference</span></div>
              <div className="bdesc">Modeling complex domains around a shared language with the people who know them; the strategic-design half is the durable part.</div>
              <div className="audiobar"><span className="aud aud-skip">Audio · Reference</span><details className="alt"><summary>Skim in print, not audio</summary><div className="altbody"><ul><li>Read the strategic-design half in print; treat the rest as reference.</li></ul></div></details></div>
            </div>
          </div>
          <div className="divider"><div className="divider-line"></div><div className="divider-label">Systems, Data &amp; Reliability</div><div className="divider-line"></div></div>
          <p className="secsub">How robust systems store data, scale, and stay up.</p>
          <div className="book pb">
            <div className="bnum">17</div>
            <div className="bcontent">
              <div className="btop"><span className="btitle">Designing Distributed Systems</span><span className="bauthor">Brendan Burns</span></div>
              <div className="btags"><span className="tag mo">Systems</span><span className="tag mo">Craft</span></div>
              <div className="bdesc">Reusable patterns for distributed systems, one per chapter — the building blocks of resilient services.</div>
              <div className="audiobar"><span className="aud aud-mod">Audio · Moderate</span><details className="alt"><summary>Diagrams matter</summary><div className="altbody"><span className="ov">⚠ Overlap — overlaps Building Microservices — read this one, treat that as optional.</span><ul><li>Pattern-per-chapter; keep the figures handy.</li></ul></div></details></div>
            </div>
          </div>
          <div className="book pb">
            <div className="bnum">18</div>
            <div className="bcontent">
              <div className="btop"><span className="btitle">Designing Data-Intensive Applications</span><span className="bauthor">Martin Kleppmann</span></div>
              <div className="btags"><span className="tag mo">Systems</span><span className="tag mo">Craft</span></div>
              <div className="bdesc">The definitive tour of how modern data systems work — storage, replication, partitioning, consistency, and streams.</div>
              <div className="audiobar"><span className="aud aud-mod">Audio · Moderate</span><details className="alt"><summary>Tough on audio (diagrams)</summary><div className="altbody"><ul><li>The narrative chapters — logs, streams, replication — survive audio; keep the figures nearby.</li></ul></div></details></div>
            </div>
          </div>
          <div className="book pb">
            <div className="bnum">19</div>
            <div className="bcontent">
              <div className="btop"><span className="btitle">Site Reliability Engineering</span><span className="bauthor">Beyer, Jones, Petoff &amp; Murphy</span></div>
              <div className="btags"><span className="tag mo">Systems</span><span className="tag tg-ref">Reference</span></div>
              <div className="bdesc">Google’s handbook on running production systems — SLOs, error budgets, toil. A reference to dip into.</div>
              <div className="audiobar"><span className="aud aud-mod">Audio · Reference</span><details className="alt"><summary>Handbook — dip in</summary><div className="altbody"><ul><li>Read the SLO / error-budget chapters, skip the rest. Free online.</li></ul></div></details></div>
            </div>
          </div>
          <div className="book pb">
            <div className="bnum">20</div>
            <div className="bcontent">
              <div className="btop"><span className="btitle">Building Microservices</span><span className="bauthor">Sam Newman</span></div>
              <div className="btags"><span className="tag mo">Systems</span><span className="tag mo">Craft</span><span className="tag tg-opt">Optional</span></div>
              <div className="bdesc">How to split systems into independently deployable services, and the trade-offs that come with it.</div>
              <div className="audiobar"><span className="aud aud-mod">Audio · Moderate</span><details className="alt"><summary>Optional — overlaps</summary><div className="altbody"><span className="ov">⚠ Overlap — overlaps Designing Distributed Systems; optional.</span><ul><li>Prose with diagrams.</li></ul></div></details></div>
            </div>
          </div>
          <div className="divider"><div className="divider-line"></div><div className="divider-label">Security, Trust &amp; Isolation</div><div className="divider-line"></div></div>
          <p className="secsub">Keeping systems dependable under adversarial pressure.</p>
          <div className="book pb">
            <div className="bnum">21</div>
            <div className="bcontent">
              <div className="btop"><span className="btitle">Security Engineering</span><span className="bauthor">Ross Anderson</span></div>
              <div className="btags"><span className="tag mo">Security</span><span className="tag mo">Systems</span><span className="tag tg-ref">Reference</span></div>
              <div className="bdesc">The field’s reference work on building systems that stay dependable when someone is trying to break them — threat models, isolation, least privilege.</div>
              <div className="audiobar"><span className="aud aud-skip">Audio · Reference</span><details className="alt"><summary>Reference (~1,200pp)</summary><div className="altbody"><ul><li>Don’t read it whole or on audio — read the threat-modeling / isolation chapters you need. Free PDF.</li></ul></div></details></div>
            </div>
          </div>
          <div className="book pb">
            <div className="bnum">22</div>
            <div className="bcontent">
              <div className="btop"><span className="btitle">Container Security</span><span className="bauthor">Liz Rice</span></div>
              <div className="btags"><span className="tag mo">Security</span></div>
              <div className="bdesc">How containers actually isolate (namespaces, cgroups, seccomp) and how that isolation fails — the concrete how of running untrusted code.</div>
              <div className="audiobar"><span className="aud aud-mod">Audio · Moderate</span><details className="alt"><summary>Technical — print is easier</summary><div className="altbody"><ul><li>Commands and code (namespaces, cgroups, seccomp) — screen / print beats audio.</li></ul></div></details></div>
            </div>
          </div>
          <div className="book pb">
            <div className="bnum">23</div>
            <div className="bcontent">
              <div className="btop"><span className="btitle">Principles of Computer System Design</span><span className="bauthor">Saltzer &amp; Kaashoek</span></div>
              <div className="btags"><span className="tag mo">Systems</span><span className="tag mo">Security</span><span className="tag tg-opt">Optional</span></div>
              <div className="bdesc">The deep principles behind system design — abstraction, naming, the end-to-end argument, least privilege.</div>
              <div className="audiobar"><span className="aud aud-skip">Audio · Reference</span><details className="alt"><summary>Reference only — overlaps</summary><div className="altbody"><span className="ov">⚠ Overlap — overlaps Security Engineering on least-privilege; optional.</span><ul><li>Dense textbook; keep as reference.</li></ul></div></details></div>
            </div>
          </div>
          <div className="divider"><div className="divider-line"></div><div className="divider-label">AI &amp; Alignment</div><div className="divider-line"></div></div>
          <p className="secsub">Machine learning, its limits, and the problem of optimizing the right thing.</p>
          <div className="book pb">
            <div className="bnum">24</div>
            <div className="bcontent">
              <div className="btop"><span className="btitle">The Alignment Problem</span><span className="bauthor">Brian Christian</span></div>
              <div className="btags"><span className="tag mo">AI</span><span className="tag mo">Mētis</span></div>
              <div className="bdesc">How machine-learning systems come to do what we didn’t mean — bias, mis-specified objectives, value misalignment. In one light, the legibility problem in new clothes.</div>
              <div className="audiobar"><span className="aud aud-exc">Audio · Excellent</span><details className="alt"><summary>Excellent — author-narrated</summary><div className="altbody"><ul><li>~13h 33m, read by Brian Christian; accessible regardless of background — just listen.</li></ul></div></details></div>
            </div>
          </div>
          <div className="book pb">
            <div className="bnum">25</div>
            <div className="bcontent">
              <div className="btop"><span className="btitle">AI Engineering</span><span className="bauthor">Chip Huyen</span></div>
              <div className="btags"><span className="tag mo">AI</span><span className="tag mo">Craft</span></div>
              <div className="bdesc">Building applications on top of foundation models — evaluation, adaptation, and the engineering around the model.</div>
              <div className="audiobar"><span className="aud aud-good">Audio · Good listen</span><details className="alt"><summary>Mostly listenable</summary><div className="altbody"><ul><li>Prose-forward (some diagrams). A strong full read on building atop foundation models.</li></ul></div></details></div>
            </div>
          </div>
          <div className="book pb">
            <div className="bnum">26</div>
            <div className="bcontent">
              <div className="btop"><span className="btitle">Designing Machine Learning Systems</span><span className="bauthor">Chip Huyen</span></div>
              <div className="btags"><span className="tag mo">AI</span><span className="tag mo">Systems</span><span className="tag tg-opt">Optional</span></div>
              <div className="bdesc">The broader picture: data, deployment, and monitoring for production machine learning.</div>
              <div className="audiobar"><span className="aud aud-mod">Audio · Moderate</span><details className="alt"><summary>Optional — overlaps</summary><div className="altbody"><span className="ov">⚠ Overlap — overlaps AI Engineering; optional / skim.</span><ul><li>Diagrams matter.</li></ul></div></details></div>
            </div>
          </div>
          <div className="book pb">
            <div className="bnum">27</div>
            <div className="bcontent">
              <div className="btop"><span className="btitle">Building Intelligent Interactive Tutors</span><span className="bauthor">Beverly Park Woolf</span></div>
              <div className="btags"><span className="tag mo">AI</span><span className="tag mo">Pedagogy</span></div>
              <div className="bdesc">The academic foundations of intelligent tutoring systems — how to model a learner and adapt instruction to them.</div>
              <div className="audiobar"><span className="aud aud-mod">Audio · Moderate</span><details className="alt"><summary>Textbook — tough on audio</summary><div className="altbody"><ul><li>Academic ITS text; read selectively for the pedagogy.</li></ul></div></details></div>
            </div>
          </div>
          <div className="parthead"><div className="pk">Part III</div><div className="pt">Stakes</div><div className="pd">The world these tools enter — commons, attention, power, and care.</div></div>
          <div className="divider"><div className="divider-line"></div><div className="divider-label">The Commons &amp; Open Production</div><div className="divider-line"></div></div>
          <p className="secsub">Collective governance, open source, and resisting capture.</p>
          <div className="book ps">
            <div className="bnum">28</div>
            <div className="bcontent">
              <div className="btop"><span className="btitle">Working in Public</span><span className="bauthor">Nadia Eghbal</span></div>
              <div className="btags"><span className="tag mo">Commons</span></div>
              <div className="bdesc">What open-source maintenance actually looks like, and why sustaining a digital commons is a governance problem, not just a code problem.</div>
              <div className="audiobar"><span className="aud aud-good">Audio · Good listen</span><details className="alt"><summary>Good listen</summary><div className="altbody"><ul><li>Essayistic and readable.</li></ul></div></details></div>
            </div>
          </div>
          <div className="book ps">
            <div className="bnum">29</div>
            <div className="bcontent">
              <div className="btop"><span className="btitle">The Internet Con</span><span className="bauthor">Cory Doctorow</span></div>
              <div className="btags"><span className="tag mo">Commons</span><span className="tag mo">Power</span></div>
              <div className="bdesc">A constructive argument for interoperability as the lever to break platform lock-in and hand power back to users.</div>
              <div className="audiobar"><span className="aud aud-exc">Audio · Excellent</span><details className="alt"><summary>Excellent — short listen</summary><div className="altbody"><ul><li>Short polemic; Doctorow reads very well on audio.</li></ul></div></details></div>
            </div>
          </div>
          <div className="book ps">
            <div className="bnum">30</div>
            <div className="bcontent">
              <div className="btop"><span className="btitle">Producing Open Source Software</span><span className="bauthor">Karl Fogel</span></div>
              <div className="btags"><span className="tag mo">Commons</span><span className="tag mo">Practice</span><span className="tag tg-opt">Optional</span></div>
              <div className="bdesc">The operational manual for running a healthy open-source project — process, community, governance.</div>
              <div className="audiobar"><span className="aud aud-mod">Audio · Moderate</span><details className="alt"><summary>Manual — optional</summary><div className="altbody"><span className="ov">⚠ Overlap — overlaps Working in Public (the why) — this is the how; optional.</span><ul><li>Operational / reference; free online.</li></ul></div></details></div>
            </div>
          </div>
          <div className="divider"><div className="divider-line"></div><div className="divider-label">Attention, Platforms &amp; Extraction</div><div className="divider-line"></div></div>
          <p className="secsub">How platforms capture attention and extract value.</p>
          <div className="book ps">
            <div className="bnum">31</div>
            <div className="bcontent">
              <div className="btop"><span className="btitle">The Attention Merchants</span><span className="bauthor">Tim Wu</span></div>
              <div className="btags"><span className="tag mo">Attention</span></div>
              <div className="bdesc">A century of the attention-capture business model: harvest attention with free content, resell it to advertisers, repeat across each new medium.</div>
              <div className="audiobar"><span className="aud aud-exc">Audio · Excellent</span><details className="alt"><summary>Excellent listen</summary><div className="altbody"><ul><li>15h 25m, narrated by Marc Cashman — strong narrative history.</li><li>Same ground on screen (different creators): The Social Dilemma (Netflix).</li></ul></div></details></div>
            </div>
          </div>
          <div className="book ps">
            <div className="bnum">32</div>
            <div className="bcontent">
              <div className="btop"><span className="btitle">Weapons of Math Destruction</span><span className="bauthor">Cathy O’Neil</span></div>
              <div className="btags"><span className="tag mo">Attention</span><span className="tag mo">Systems</span></div>
              <div className="bdesc">How opaque, large-scale algorithms encode the past and entrench inequality while appearing objective.</div>
              <div className="audiobar"><span className="aud aud-good">Audio · Good listen</span><details className="alt"><summary>Good — or 18 minutes</summary><div className="altbody"><ul><li><b>TED:</b> O’Neil, “The era of blind faith in big data must end” (~18m).</li><li><b>Doc:</b> Coded Bias (2020) — features O’Neil.</li></ul></div></details></div>
            </div>
          </div>
          <div className="book ps">
            <div className="bnum">33</div>
            <div className="bcontent">
              <div className="btop"><span className="btitle">Who Owns the Future?</span><span className="bauthor">Jaron Lanier</span></div>
              <div className="btags"><span className="tag mo">Attention</span><span className="tag mo">Power</span><span className="tag tg-opt">Optional</span></div>
              <div className="bdesc">The “siren server” critique: how data-hoarding network hubs concentrate wealth and hollow out the middle class.</div>
              <div className="audiobar"><span className="aud aud-mod">Audio · Moderate</span><details className="alt"><summary>Moderate — and likely skippable</summary><div className="altbody"><span className="ov">⚠ Overlap — heavily covered by Enshittification and The Attention Merchants, and dated (2013). The Wharton Q&amp;A is enough.</span><ul><li><b>Wharton</b> “Knowledge at Wharton” Q&amp;A; Lanier’s 2018 TED, “How we need to remake the internet.”</li></ul></div></details></div>
            </div>
          </div>
          <div className="divider"><div className="divider-line"></div><div className="divider-label">Power, Cities &amp; Deep History</div><div className="divider-line"></div></div>
          <p className="secsub">Bureaucracy, urban life, and the deep history of how humans organize.</p>
          <div className="book ps">
            <div className="bnum">34</div>
            <div className="bcontent">
              <div className="btop"><span className="btitle">The Death and Life of Great American Cities</span><span className="bauthor">Jane Jacobs</span></div>
              <div className="btags"><span className="tag mo">Power</span><span className="tag mo">Systems</span></div>
              <div className="bdesc">The case against top-down planning and for the organic, mixed-use vitality of cities — “eyes on the street” and organized complexity.</div>
              <div className="audiobar"><span className="aud aud-mod">Audio · Moderate</span><details className="alt"><summary>Long — start with the film</summary><div className="altbody"><span className="narr">Audiobook is fine but long and discursive.</span><ul><li><b>Doc:</b> Citizen Jane: Battle for the City (2017), ~92 min — Jacobs vs. Moses.</li><li><b>Podcast:</b> 99% Invisible episodes on Jacobs / Moses.</li></ul></div></details></div>
            </div>
          </div>
          <div className="book ps">
            <div className="bnum">35</div>
            <div className="bcontent">
              <div className="btop"><span className="btitle">The Utopia of Rules</span><span className="bauthor">David Graeber</span></div>
              <div className="btags"><span className="tag mo">Power</span></div>
              <div className="bdesc">On bureaucracy and “structural stupidity” — why rules backed by force flatten understanding, and why we find them perversely appealing.</div>
              <div className="audiobar"><span className="aud aud-good">Audio · Good listen</span><details className="alt"><summary>Good — witty essays</summary><div className="altbody"><ul><li>Narrated by Mike Chamberlain; digressive and fun (Batman, Star Trek).</li><li>Graeber interviews on bureaucracy / “bullshit jobs.”</li></ul></div></details></div>
            </div>
          </div>
          <div className="book ps">
            <div className="bnum">36</div>
            <div className="bcontent">
              <div className="btop"><span className="btitle">The Dawn of Everything</span><span className="bauthor">David Graeber &amp; David Wengrow</span></div>
              <div className="btags"><span className="tag mo">Power</span><span className="tag mo">Systems</span></div>
              <div className="bdesc">A deep-history argument that humans have always experimented with many social forms — the “inevitability” story is wrong, and we are freer than we assume.</div>
              <div className="audiobar"><span className="aud aud-good">Audio · Good listen</span><details className="alt"><summary>Good (24h; narrator divides people)</summary><div className="altbody"><ul><li>Narrated by Mark Williams; engaging once you adjust to the voice.</li><li>Shorter: David Wengrow’s talks / interviews (RSA and podcasts).</li></ul></div></details></div>
            </div>
          </div>
          <div className="divider"><div className="divider-line"></div><div className="divider-label">Strategy, Care &amp; Practice</div><div className="divider-line"></div></div>
          <p className="secsub">How to act well — strategy, trust, care, and emergent change.</p>
          <div className="book ps">
            <div className="bnum">37</div>
            <div className="bcontent">
              <div className="btop"><span className="btitle">Good Strategy Bad Strategy</span><span className="bauthor">Richard Rumelt</span></div>
              <div className="btags"><span className="tag mo">Practice</span></div>
              <div className="bdesc">The kernel of real strategy — diagnosis, guiding policy, coherent action — and how to tell it from goals dressed up as a plan.</div>
              <div className="audiobar"><span className="aud aud-good">Audio · Good listen</span><details className="alt"><summary>Good — or the podcast</summary><div className="altbody"><ul><li><b>Lenny’s Podcast</b> — “Good Strategy, Bad Strategy | Richard Rumelt”: the kernel in conversation.</li></ul></div></details></div>
            </div>
          </div>
          <div className="book ps">
            <div className="bnum">38</div>
            <div className="bcontent">
              <div className="btop"><span className="btitle">The Trusted Advisor</span><span className="bauthor">Maister, Green &amp; Galford</span></div>
              <div className="btags"><span className="tag mo">Practice</span></div>
              <div className="bdesc">How professionals earn trust: the trust equation, and why advising is as much emotional as technical.</div>
              <div className="audiobar"><span className="aud aud-good">Audio · Good listen</span><details className="alt"><summary>Good — or the framework</summary><div className="altbody"><ul><li><b>trustedadvisor.com</b> “Trust Equation” explainer.</li><li>Charles H. Green interviews on trust-based advising.</li></ul></div></details></div>
            </div>
          </div>
          <div className="book ps">
            <div className="bnum">39</div>
            <div className="bcontent">
              <div className="btop"><span className="btitle">The Care Manifesto</span><span className="bauthor">The Care Collective</span></div>
              <div className="btags"><span className="tag mo">Practice</span><span className="tag mo">Power</span></div>
              <div className="bdesc">A case for care as the organizing principle of society at every scale — kinship, community, economy, planet.</div>
              <div className="audiobar"><span className="aud aud-good">Audio · Good listen</span><details className="alt"><summary>Short &amp; accessible</summary><div className="altbody"><ul><li>A brief manifesto — quick to listen.</li><li>Care Collective member interviews (e.g., Jo Littler).</li></ul></div></details></div>
            </div>
          </div>
          <div className="book ps">
            <div className="bnum">40</div>
            <div className="bcontent">
              <div className="btop"><span className="btitle">Emergent Strategy</span><span className="bauthor">adrienne maree brown</span></div>
              <div className="btags"><span className="tag mo">Practice</span><span className="tag mo">Systems</span></div>
              <div className="bdesc">Adaptive, decentralized organizing modeled on how complex systems change — “small is all,” move at the speed of trust.</div>
              <div className="audiobar"><span className="aud aud-exc">Audio · Excellent</span><details className="alt"><summary>Excellent listen</summary><div className="altbody"><ul><li>The audiobook is lyrical and conversational — just listen.</li><li>More of her: How to Survive the End of the World podcast; On Being interview.</li></ul></div></details></div>
            </div>
          </div>

        </div>

        {/* ─────────── MOTIFS ─────────── */}
        <div id="motifs" className={`panel ${tab === 'motifs' ? 'active' : ''}`}>

          <div className="stats">
            <div className="stat"><strong>11</strong>Motifs</div>
            <div className="stat"><strong>24</strong>Connections</div>
            <div className="stat"><strong>3</strong>Movements</div>
          </div>

          <div className="revision-box">
            <p><strong>The motifs.</strong> These are the recurring threads that run through the whole list — the reason a book about cities and a book about bureaucracy belong on the same shelf. Each is defined below; the map shows how they connect. Hover or tap a motif to light its links, and follow a connection to jump to it.</p>
          </div>

          <div className="sky">
            <div className="sky-hint">Hover or tap a motif</div>
            <div dangerouslySetInnerHTML={{ __html: CONSTELLATION }} />
            <div className="sky-cap" id="skycap"><span className="cap-name" /><span className="cap-def" /></div>
          </div>

          <div className="defs"><div className="defcard" data-id="metis"><h4>Mētis</h4><div className="ddef">Practical, tacit, situated know-how — the knowledge that lives in doing and resists being fully written down. The counterpart to epistēmē, formal codified knowledge, and the spine of this list.</div><div className="dconn"><span className="clab">Connects to</span><div className="conn"><span className="lk" data-go="pedagogy">Pedagogy</span> — tacit knowledge transmits through participation, not transmission</div><div className="conn"><span className="lk" data-go="power">Power</span> — legibility flattens local knowledge — institutions destroy mētis by standardizing it</div><div className="conn"><span className="lk" data-go="ai">AI</span> — alignment is the legibility problem again: you optimize the measurable, not the mētis</div><div className="conn"><span className="lk" data-go="craft">Craft</span> — good tools amplify a practitioner’s tacit judgment instead of replacing it</div><div className="conn"><span className="lk" data-go="practice">Practice</span> — mētis lives in, and is exercised through, practice</div><div className="conn"><span className="lk" data-go="conviviality">Conviviality</span> — convivial tools keep human judgment central — the ethic that protects mētis</div></div></div><div className="defcard" data-id="systems"><h4>Systems</h4><div className="ddef">Seeing wholes rather than parts: stocks, flows, feedback loops, leverage points. Behavior emerges from structure, so you change a system by changing its structure.</div><div className="dconn"><span className="clab">Connects to</span><div className="conn"><span className="lk" data-go="power">Power</span> — bureaucracy’s “structural stupidity” is a systems property</div><div className="conn"><span className="lk" data-go="commons">Commons</span> — a commons is a common-pool system; its rules manage feedback</div><div className="conn"><span className="lk" data-go="attention">Attention</span> — platform decay and algorithmic harm are feedback loops, not accidents</div><div className="conn"><span className="lk" data-go="ai">AI</span> — ML systems are complex systems that drift — design for the loop</div><div className="conn"><span className="lk" data-go="craft">Craft</span> — software craft is systems thinking at the code level</div><div className="conn"><span className="lk" data-go="security">Security</span> — security is an emergent system property, not a bolted-on feature</div></div></div><div className="defcard" data-id="commons"><h4>Commons</h4><div className="ddef">Resources held and governed collectively — code, knowledge, infrastructure. How groups sustain shared things without enclosure or collapse.</div><div className="dconn"><span className="clab">Connects to</span><div className="conn"><span className="lk" data-go="conviviality">Conviviality</span> — commons governance is the structural guarantee a tool stays convivial</div><div className="conn"><span className="lk" data-go="systems">Systems</span> — a commons is a common-pool system; its rules manage feedback</div><div className="conn"><span className="lk" data-go="power">Power</span> — enclosure is a power move; commons governance resists capture</div><div className="conn"><span className="lk" data-go="practice">Practice</span> — sustaining a commons is collective care and trust</div></div></div><div className="defcard" data-id="conviviality"><h4>Conviviality</h4><div className="ddef">Judging tools by one question: do they expand human autonomy, or manufacture dependency? Technology is never neutral.</div><div className="dconn"><span className="clab">Connects to</span><div className="conn"><span className="lk" data-go="metis">Mētis</span> — convivial tools keep human judgment central — the ethic that protects mētis</div><div className="conn"><span className="lk" data-go="attention">Attention</span> — the attention economy is the anti-convivial extreme</div><div className="conn"><span className="lk" data-go="ai">AI</span> — some judgments shouldn’t be delegated to computation (Weizenbaum)</div><div className="conn"><span className="lk" data-go="commons">Commons</span> — commons governance is the structural guarantee a tool stays convivial</div><div className="conn"><span className="lk" data-go="craft">Craft</span> — design choices encode whether a tool liberates or constrains</div></div></div><div className="defcard" data-id="craft"><h4>Craft</h4><div className="ddef">The discipline of making well — managing complexity through clear interfaces, deep modules, and durable design. Judgment over rules.</div><div className="dconn"><span className="clab">Connects to</span><div className="conn"><span className="lk" data-go="metis">Mētis</span> — good tools amplify a practitioner’s tacit judgment instead of replacing it</div><div className="conn"><span className="lk" data-go="conviviality">Conviviality</span> — design choices encode whether a tool liberates or constrains</div><div className="conn"><span className="lk" data-go="systems">Systems</span> — software craft is systems thinking at the code level</div><div className="conn"><span className="lk" data-go="ai">AI</span> — building AI well is an engineering-craft problem</div><div className="conn"><span className="lk" data-go="security">Security</span> — isolation and least privilege are craft decisions</div></div></div><div className="defcard" data-id="pedagogy"><h4>Pedagogy</h4><div className="ddef">How people actually learn — through participation, experience, and community, not transmission into an empty vessel.</div><div className="dconn"><span className="clab">Connects to</span><div className="conn"><span className="lk" data-go="metis">Mētis</span> — tacit knowledge transmits through participation, not transmission</div><div className="conn"><span className="lk" data-go="power">Power</span> — education reproduces or challenges structural inequality</div><div className="conn"><span className="lk" data-go="ai">AI</span> — AI tutoring is the sharpest case of automating teaching</div></div></div><div className="defcard" data-id="attention"><h4>Attention</h4><div className="ddef">The political economy of distraction: how platforms capture attention and data, monetize them, and decay as they do.</div><div className="dconn"><span className="clab">Connects to</span><div className="conn"><span className="lk" data-go="conviviality">Conviviality</span> — the attention economy is the anti-convivial extreme</div><div className="conn"><span className="lk" data-go="systems">Systems</span> — platform decay and algorithmic harm are feedback loops, not accidents</div><div className="conn"><span className="lk" data-go="power">Power</span> — controlling attention and data concentrates power</div></div></div><div className="defcard" data-id="ai"><h4>AI</h4><div className="ddef">Machine learning and the alignment problem — specifying objectives, the limits of optimization, and what shouldn’t be automated.</div><div className="dconn"><span className="clab">Connects to</span><div className="conn"><span className="lk" data-go="metis">Mētis</span> — alignment is the legibility problem again: you optimize the measurable, not the mētis</div><div className="conn"><span className="lk" data-go="conviviality">Conviviality</span> — some judgments shouldn’t be delegated to computation (Weizenbaum)</div><div className="conn"><span className="lk" data-go="systems">Systems</span> — ML systems are complex systems that drift — design for the loop</div><div className="conn"><span className="lk" data-go="pedagogy">Pedagogy</span> — AI tutoring is the sharpest case of automating teaching</div><div className="conn"><span className="lk" data-go="craft">Craft</span> — building AI well is an engineering-craft problem</div></div></div><div className="defcard" data-id="power"><h4>Power</h4><div className="ddef">Bureaucracy, legibility, and institutional capture — who gets to define the categories, impose order, and decide what counts.</div><div className="dconn"><span className="clab">Connects to</span><div className="conn"><span className="lk" data-go="metis">Mētis</span> — legibility flattens local knowledge — institutions destroy mētis by standardizing it</div><div className="conn"><span className="lk" data-go="systems">Systems</span> — bureaucracy’s “structural stupidity” is a systems property</div><div className="conn"><span className="lk" data-go="commons">Commons</span> — enclosure is a power move; commons governance resists capture</div><div className="conn"><span className="lk" data-go="pedagogy">Pedagogy</span> — education reproduces or challenges structural inequality</div><div className="conn"><span className="lk" data-go="attention">Attention</span> — controlling attention and data concentrates power</div><div className="conn"><span className="lk" data-go="practice">Practice</span> — acting well means navigating institutions and power</div></div></div><div className="defcard" data-id="practice"><h4>Practice</h4><div className="ddef">Acting well in the world: strategy, care, trust, and emergent, relational change. The know-how of doing, not just knowing.</div><div className="dconn"><span className="clab">Connects to</span><div className="conn"><span className="lk" data-go="metis">Mētis</span> — mētis lives in, and is exercised through, practice</div><div className="conn"><span className="lk" data-go="commons">Commons</span> — sustaining a commons is collective care and trust</div><div className="conn"><span className="lk" data-go="power">Power</span> — acting well means navigating institutions and power</div></div></div><div className="defcard" data-id="security"><h4>Security</h4><div className="ddef">Keeping systems dependable when someone is trying to break them — isolation, least privilege, threat models, and trust boundaries.</div><div className="dconn"><span className="clab">Connects to</span><div className="conn"><span className="lk" data-go="systems">Systems</span> — security is an emergent system property, not a bolted-on feature</div><div className="conn"><span className="lk" data-go="craft">Craft</span> — isolation and least privilege are craft decisions</div></div></div></div>

        </div>

        {/* ─────────── FINISHED ─────────── */}
        <div id="read" className={`panel ${tab === 'read' ? 'active' : ''}`}>

          <div className="stats">
            <div className="stat"><strong>18</strong>Books finished</div>
            <div className="stat"><strong>6</strong>Clusters</div>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--muted)', fontStyle: 'italic', lineHeight: 1.65, padding: '0.5rem 0 0.5rem' }}>The ground already covered — grouped by theme. These inform everything in the reading list.</p>

          <div className="divider"><div className="divider-line"></div><div className="divider-label">Just Completed</div><div className="divider-line"></div></div>
          <div className="read-row"><div className="rn">Failure to Disrupt</div><div className="ra">Justin Reich</div><div className="rt">Ed-Tech Evidence</div></div>
          <div className="read-row"><div className="rn">Governing the Commons</div><div className="ra">Elinor Ostrom</div><div className="rt">Commons Governance</div></div>
          <div className="read-row"><div className="rn">Exit, Voice, and Loyalty</div><div className="ra">Albert O. Hirschman</div><div className="rt">Institutional Feedback</div></div>
          <div className="read-row"><div className="rn">Seeing Like a State</div><div className="ra">James C. Scott</div><div className="rt">Legibility</div></div>
          <div className="divider"><div className="divider-line"></div><div className="divider-label">Systems &amp; Platforms</div><div className="divider-line"></div></div>
          <div className="read-row"><div className="rn">Enshittification</div><div className="ra">Cory Doctorow</div><div className="rt">Platform Decay</div></div>
          <div className="read-row"><div className="rn">Thinking in Systems</div><div className="ra">Donella Meadows</div><div className="rt">Systems Language</div></div>
          <div className="divider"><div className="divider-line"></div><div className="divider-label">Institutions, Inequality &amp; Power</div><div className="divider-line"></div></div>
          <div className="read-row"><div className="rn">The Quiet Coup</div><div className="ra">Mehrsa Baradaran</div><div className="rt">Institutional Capture</div></div>
          <div className="read-row"><div className="rn">The New Jim Crow</div><div className="ra">Michelle Alexander</div><div className="rt">Structural Inequality</div></div>
          <div className="read-row"><div className="rn">The Privileged Poor</div><div className="ra">Anthony Abraham Jack</div><div className="rt">Higher-Ed Inequity</div></div>
          <div className="read-row"><div className="rn">Racism without Racists</div><div className="ra">Eduardo Bonilla-Silva</div><div className="rt">Systemic Racism</div></div>
          <div className="read-row"><div className="rn">Nice White Ladies</div><div className="ra">Jessie Daniels</div><div className="rt">Race · Liberal Complicity</div></div>
          <div className="divider"><div className="divider-line"></div><div className="divider-label">Education &amp; Liberatory Pedagogy</div><div className="divider-line"></div></div>
          <div className="read-row"><div className="rn">Teaching to Transgress</div><div className="ra">bell hooks</div><div className="rt">Liberatory Education</div></div>
          <div className="read-row"><div className="rn">We Want to Do More Than Survive</div><div className="ra">Bettina Love</div><div className="rt">Abolitionist Teaching</div></div>
          <div className="read-row"><div className="rn">Why Are All the Black Kids Sitting Together in the Cafeteria?</div><div className="ra">Beverly Daniel Tatum</div><div className="rt">Racial Identity · Education</div></div>
          <div className="read-row"><div className="rn">Sister Outsider</div><div className="ra">Audre Lorde</div><div className="rt">Power · Identity</div></div>
          <div className="divider"><div className="divider-line"></div><div className="divider-label">Technology</div><div className="divider-line"></div></div>
          <div className="read-row"><div className="rn">Against Technoableism</div><div className="ra">Ashley Shew</div><div className="rt">Technology · Disability</div></div>
          <div className="read-row"><div className="rn">Biased</div><div className="ra">Jennifer Eberhardt</div><div className="rt">Bias · Cognition</div></div>
          <div className="divider"><div className="divider-line"></div><div className="divider-label">Health &amp; Ethics</div><div className="divider-line"></div></div>
          <div className="read-row"><div className="rn">The Immortal Life of Henrietta Lacks</div><div className="ra">Rebecca Skloot</div><div className="rt">Medical Ethics</div></div>

        </div>

      </div>
    </div>
  )
}
