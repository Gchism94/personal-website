'use client'

const CSS = `
.portfolio-sheet {
  --linen:   #F5EFE6;
  --bark:    #3B2F2F;
  --juniper: #4A7C6F;
  --ash:     #9B9187;
  --ash-lt:  #C4BCB3;
  --sand:    #D4B896;
  --rust:    #B5532A;
  --card:    rgba(255,255,255,.35);
  --card-bd: rgba(212,184,150,.55);
  --hair:    rgba(196,188,179,.4);
  --ink-soft:#5A4F4A;
}





.portfolio-sheet {
  background: var(--linen);
  color: var(--bark);
  font-family: var(--font-body), sans-serif;
  font-weight: 400;
  min-height: 100vh;
  position: relative;
}



.portfolio-sheet .page {
  position: relative;
  z-index: 1;
  max-width: 860px;
  margin: 0 auto;
  padding: 80px 64px 80px;
}

.portfolio-sheet .page a { color: inherit; text-decoration: none; }

.portfolio-sheet .print-btn {
  position: relative;
  top: auto;
  right: auto;
  z-index: 100;
  font-family: var(--font-mono), monospace;
  font-size: 9px;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: var(--ash);
  background: transparent;
  border: 1px solid var(--ash-lt);
  padding: 9px 18px;
  cursor: pointer;
  transition: color .2s, border-color .2s;
}
.portfolio-sheet .print-btn:hover { color: var(--juniper); border-color: var(--juniper); }

/* ── Header ── */
.portfolio-sheet .pf-header { border-bottom: 1px solid var(--sand); padding-bottom: 26px; margin-bottom: 32px; }

.portfolio-sheet h1.pf-name {
  font-family: var(--font-display), Georgia, serif !important;
  font-weight: 600 !important;
  font-size: clamp(40px, 5.2vw, 54px) !important;
  line-height: 1.05 !important;
  letter-spacing: -.02em;
  color: var(--bark);
  margin-bottom: 6px;
  text-align: left;
}
.portfolio-sheet h1.pf-name em { font-style: italic !important; color: var(--juniper) !important; font-family: var(--font-display), Georgia, serif !important; font-weight: 600 !important; }

.portfolio-sheet .pf-degree {
  font-family: var(--font-mono), monospace;
  font-size: 10px;
  letter-spacing: .22em;
  text-transform: uppercase;
  color: var(--ash);
  margin-bottom: 20px;
}

.portfolio-sheet .pf-links { display: flex; gap: 24px; flex-wrap: wrap; }
.portfolio-sheet .pf-links a {
  font-family: var(--font-mono), monospace;
  font-size: 9.5px;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: var(--ash);
  border-bottom: 1px solid transparent;
  padding-bottom: 1px;
  transition: color .2s, border-color .2s;
}
.portfolio-sheet .pf-links a:hover { color: var(--juniper); border-color: var(--juniper); }
.portfolio-sheet .pf-links .divider { font-family: var(--font-mono), monospace; font-size: 9.5px; color: var(--ash-lt); }

/* ── Intro ── */
.portfolio-sheet .pf-intro {
  font-size: 15px;
  line-height: 1.75;
  color: var(--bark);
  max-width: 700px;
  margin-bottom: 30px;
}
.portfolio-sheet .pf-intro strong { font-weight: 400; color: var(--juniper); }

/* ── Stat strip ── */
.portfolio-sheet .stat-strip {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  border-top: 1px solid var(--sand);
  border-bottom: 1px solid var(--sand);
  margin-bottom: 44px;
}
.portfolio-sheet .stat { padding: 16px 10px 14px; text-align: center; border-left: 1px solid rgba(212,184,150,.45); }
.portfolio-sheet .stat:first-child { border-left: none; }
.portfolio-sheet .stat-num { font-family: var(--font-display), Georgia, serif; font-weight: 700; font-size: 24px; color: var(--bark); line-height: 1; margin-bottom: 7px; }
.portfolio-sheet .stat-num em { font-style: italic; color: var(--juniper); }
.portfolio-sheet .stat-label { font-family: var(--font-mono), monospace; font-size: 7.5px; letter-spacing: .14em; text-transform: uppercase; color: var(--ash); line-height: 1.6; }

/* ── Sections ── */
.portfolio-sheet .section-label {
  font-family: var(--font-mono), monospace;
  font-size: 9px;
  letter-spacing: .26em;
  text-transform: uppercase;
  color: var(--ash);
  margin-bottom: 6px;
}
.portfolio-sheet .section-head {
  font-family: var(--font-display), Georgia, serif;
  font-weight: 700;
  font-size: 24px;
  color: var(--bark);
  margin-bottom: 8px;
  text-align: left;
}
.portfolio-sheet .section-intro { font-size: 13.5px; line-height: 1.65; color: var(--ink-soft); max-width: 660px; margin-bottom: 18px; }
.portfolio-sheet .pf-section { margin-bottom: 44px; }

/* ── Case studies ── */
.portfolio-sheet .case {
  border: 1px solid var(--card-bd);
  border-left: 2px solid var(--juniper);
  background: var(--card);
  padding: 22px 24px 19px;
  margin-bottom: 16px;
  break-inside: avoid;
}
.portfolio-sheet .case-n { font-family: var(--font-mono), monospace; font-size: 8px; letter-spacing: .22em; text-transform: uppercase; color: var(--rust); margin-bottom: 8px; }
.portfolio-sheet .case-title { font-family: var(--font-display), Georgia, serif; font-weight: 700; font-size: 17px; color: var(--bark); margin-bottom: 3px; text-align: left; }
.portfolio-sheet .case-meta { font-family: var(--font-mono), monospace; font-size: 8.5px; letter-spacing: .12em; text-transform: uppercase; color: var(--ash); margin-bottom: 12px; }
.portfolio-sheet .case-meta a { color: var(--juniper); }
.portfolio-sheet .case-meta a:hover { text-decoration: underline; }
.portfolio-sheet .case-row { margin-bottom: 9px; font-size: 13px; line-height: 1.65; color: var(--ink-soft); }
.portfolio-sheet .case-row:last-child { margin-bottom: 0; }
.portfolio-sheet .case-row .k { font-family: var(--font-mono), monospace; font-size: 8.5px; letter-spacing: .16em; text-transform: uppercase; color: var(--juniper); display: block; margin-bottom: 2px; }

.portfolio-sheet .also-list { list-style: none; margin-top: 6px; }
.portfolio-sheet .also-list li { font-size: 13px; line-height: 1.6; color: var(--ink-soft); padding: 8px 0; border-bottom: 1px solid rgba(196,188,179,.35); display: flex; justify-content: space-between; gap: 14px; align-items: baseline; }
.portfolio-sheet .also-list li:last-child { border-bottom: none; }
.portfolio-sheet .also-list .crs { color: var(--bark); }
.portfolio-sheet .also-list .crs strong { font-weight: 400; }
.portfolio-sheet .also-list a { font-family: var(--font-mono), monospace; font-size: 8.5px; letter-spacing: .12em; text-transform: uppercase; color: var(--juniper); white-space: nowrap; flex-shrink: 0; }
.portfolio-sheet .also-list a:hover { text-decoration: underline; }

/* ── Platform grid ── */
.portfolio-sheet .plat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 13px; }
.portfolio-sheet .plat {
  border: 1px solid var(--card-bd);
  background: var(--card);
  padding: 16px 18px 14px;
  break-inside: avoid;
}
.portfolio-sheet .plat-title { font-family: var(--font-display), Georgia, serif; font-weight: 700; font-size: 14.5px; color: var(--bark); margin-bottom: 2px; text-align: left; }
.portfolio-sheet .plat-meta { font-family: var(--font-mono), monospace; font-size: 8px; letter-spacing: .12em; text-transform: uppercase; color: var(--ash); margin-bottom: 8px; }
.portfolio-sheet .plat-meta .hl { color: var(--juniper); }
.portfolio-sheet .plat p { font-size: 12.5px; line-height: 1.58; color: var(--ink-soft); }
.portfolio-sheet .plat a { color: var(--juniper); }
.portfolio-sheet .plat a:hover { text-decoration: underline; }

/* ── Two-column evidence rows ── */
.portfolio-sheet .ev-row { display: grid; grid-template-columns: 168px 1fr; gap: 26px; padding: 13px 0; border-top: 1px solid var(--hair); break-inside: avoid; }
.portfolio-sheet .ev-row:last-of-type { border-bottom: 1px solid var(--hair); }
.portfolio-sheet .ev-k { font-family: var(--font-mono), monospace; font-size: 8.5px; letter-spacing: .16em; text-transform: uppercase; color: var(--ash); text-align: right; padding-top: 3px; line-height: 1.7; }
.portfolio-sheet .ev-body { font-size: 13px; line-height: 1.65; color: var(--ink-soft); }
.portfolio-sheet .ev-body strong { font-weight: 400; color: var(--bark); }
.portfolio-sheet .ev-body a { color: var(--juniper); }
.portfolio-sheet .ev-body a:hover { text-decoration: underline; }

/* ── Footer ── */
.portfolio-sheet .pf-footer { border-top: 1px solid var(--sand); padding-top: 18px; display: flex; justify-content: space-between; align-items: baseline; gap: 20px; }
.portfolio-sheet .pf-footer p { font-size: 12px; line-height: 1.6; color: var(--ash); }
.portfolio-sheet .pf-footer a { color: var(--juniper); }
.portfolio-sheet .pf-footer a:hover { text-decoration: underline; }
.portfolio-sheet .pf-footer .wm { font-family: var(--font-mono), monospace; font-size: 8px; letter-spacing: .2em; text-transform: uppercase; color: var(--ash-lt); white-space: nowrap; }

@media print {

  .portfolio-sheet .print-btn { display: none; }
  .portfolio-sheet .page { padding: 34px 48px 24px; max-width: 100%; }
  .portfolio-sheet h1.pf-name { font-size: 46px !important; }
  .portfolio-sheet .section-head { font-size: 22px; }
  .portfolio-sheet .pf-intro { font-size: 14.5px; line-height: 1.7; margin-bottom: 26px; }
  .portfolio-sheet .pf-section { margin-bottom: 20px; }
  .portfolio-sheet .case, .portfolio-sheet .plat, .portfolio-sheet .ev-row { break-inside: avoid; }
  .portfolio-sheet .page a { color: inherit !important; }
  .portfolio-sheet .case-meta a, .portfolio-sheet .also-list a, .portfolio-sheet .plat a, .portfolio-sheet .ev-body a, .portfolio-sheet .pf-footer a { color: var(--juniper) !important; }
}
@page { size: letter; margin: 0; }

@media (max-width: 680px) {
  .portfolio-sheet .page { padding: 56px 24px 64px; }
  .portfolio-sheet .stat-strip { grid-template-columns: repeat(3, 1fr); }
  .portfolio-sheet .stat { border-left: none; border-top: 1px solid rgba(212,184,150,.3); }
  .portfolio-sheet .stat:nth-child(-n+3) { border-top: none; }
  .portfolio-sheet .plat-grid { grid-template-columns: 1fr; }
  .portfolio-sheet .ev-row { grid-template-columns: 1fr; gap: 6px; }
  .portfolio-sheet .ev-k { text-align: left; }
  .portfolio-sheet .also-list li { flex-direction: column; gap: 4px; }
  .portfolio-sheet .pf-footer { flex-direction: column; gap: 8px; }
  .portfolio-sheet .print-btn { top: 14px; right: 14px; }
}

/* ─── Dark mode — screen only (print stays light for PDF/paper) ─── */
@media screen {
  html.dark .portfolio-sheet {
    --linen:   #02040a;
    --bark:    #F3EADF;
    --juniper: #9FD0C2;
    --ash:     #A89F92;
    --ash-lt:  rgba(243,234,223,0.28);
    --sand:    rgba(243,234,223,0.20);
    --rust:    #DE7A50;
    --card:    rgba(255,255,255,0.04);
    --card-bd: rgba(255,255,255,0.10);
    --hair:    rgba(255,255,255,0.10);
    --ink-soft:#D8D0C4;
  }
  }
`

export default function Portfolio() {
  return (
    <div className="portfolio-sheet document-sheet">
      <style suppressHydrationWarning>{CSS}</style>

      <button className="print-btn" onClick={() => window.print()}>Print / Save PDF</button>

      <div className="page">

        {/* HEADER */}
        <header className="pf-header">
          <h1 className="pf-name">Greg T.&nbsp;<em>Chism</em></h1>
          <p className="pf-degree">Ph.D. · Learning Experience Portfolio</p>
          <nav className="pf-links">
            <a href="https://gregtchism.com">gregtchism.com</a>
            <span className="divider">·</span>
            <a href="https://github.com/Gchism94" target="_blank" rel="noopener noreferrer">GitHub</a>
            <span className="divider">·</span>
            <a href="https://www.linkedin.com/in/greg-chism/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <span className="divider">·</span>
            <a href="mailto:gchism94@gmail.com">gchism94@gmail.com</a>
          </nav>
        </header>

        {/* INTRO */}
        <p className="pf-intro">
          I design learning experiences end-to-end: identifying the opportunity, building the course and
          the platform it runs on, and measuring whether people learned. For the past four years I&apos;ve
          done that in <strong>data science, machine learning, and AI education</strong> at the University
          of Arizona. My courses are built in public, revised every term, and <strong>designed with AI
          tools at every stage</strong>, from research and prototyping to content and feedback. I&apos;m also
          a Carpentries Instructor Trainer, so I train other instructors in the same evidence-based
          methods I use.
        </p>

        {/* STATS */}
        <div className="stat-strip">
          <div className="stat"><div className="stat-num">6</div><div className="stat-label">Graduate courses<br/>designed &amp; taught</div></div>
          <div className="stat"><div className="stat-num">100+</div><div className="stat-label">Capstone students<br/>(grew program from 7)</div></div>
          <div className="stat"><div className="stat-num">40+</div><div className="stat-label">Grad students &amp;<br/>postdocs mentored</div></div>
          <div className="stat"><div className="stat-num"><em>$368K</em></div><div className="stat-label">NSF computing awards<br/>won as Lead-PI</div></div>
          <div className="stat"><div className="stat-num">8</div><div className="stat-label">Peer-reviewed<br/>articles</div></div>
        </div>

        {/* CASE STUDIES */}
        <section className="pf-section">
          <p className="section-label">01 · Courses</p>
          <h2 className="section-head">Designed end-to-end, shipped in public</h2>
          <p className="section-intro">
            Each course below is a complete educational product, from audience analysis through delivery and
            revision. Materials are published openly, so the design decisions can be inspected and reused.
          </p>

          <div className="case">
            <p className="case-n">Case Study 01 — Teaching beginners</p>
            <h3 className="case-title">INFO 511 · Fundamentals of Data Science</h3>
            <p className="case-meta">University of Arizona iSchool · <a href="https://datasciaz.netlify.app/" target="_blank" rel="noopener noreferrer">datasciaz.netlify.app</a></p>
            <p className="case-row"><span className="k">The brief</span>
              Take graduate students, many arriving from non-technical backgrounds, through the entire data science
              lifecycle — collection, cleaning, exploration, modeling, communication — in a single semester.</p>
            <p className="case-row"><span className="k">The design</span>
              Python-first with real-world datasets, so every skill is learned in the context it will be used.
              Reproducible workflows (Git, Quarto) from week one, and modular AI tutoring from my research —
              retrieval-augmented feedback, adaptive quizzes, and code-similarity checking.</p>
            <p className="case-row"><span className="k">The evidence</span>
              The full course is open source, with automated GitHub Classroom test suites checking correctness,
              style, and edge cases — professionals enrolled confirm it matches how they work.</p>
          </div>

          <div className="case">
            <p className="case-n">Case Study 02 — Designing where no playbook exists</p>
            <h3 className="case-title">INFO 557 · Neural Networks</h3>
            <p className="case-meta">University of Arizona iSchool · <a href="https://neuralnetworksaz-f25.netlify.app/" target="_blank" rel="noopener noreferrer">neuralnetworksaz-f25.netlify.app</a> · <a href="/neural-networks">interactive viz</a></p>
            <p className="case-row"><span className="k">The brief</span>
              Build a graduate deep-learning course in a domain that changes every semester, where proven
              instructional playbooks don&apos;t exist yet.</p>
            <p className="case-row"><span className="k">The design</span>
              Fundamentals-first: backpropagation, optimization, and regularization built up from scratch, so
              learners have the foundations to follow each new architecture wave. Students
              build, train, and evaluate real models, with gamified exams and a custom interactive
              visualization that makes the invisible mechanics visible.</p>
            <p className="case-row"><span className="k">The evidence</span>
              Versioned by semester, and powered by an AI Sandbox I fund as Lead-PI of a NAIRR Classroom
              Pilot — the university&apos;s only competitively awarded NAIRR Pilot allocation.</p>
          </div>

          <div className="case">
            <p className="case-n">Case Study 03 — Business goals → learning outcomes</p>
            <h3 className="case-title">INFO 698 · Data Science Capstone</h3>
            <p className="case-meta">University of Arizona iSchool · Industry-sponsored projects</p>
            <p className="case-row"><span className="k">The brief</span>
              Industry sponsors arrive with business problems. The design task is turning them into scoped,
              achievable capstones that serve both the sponsor and the learner.</p>
            <p className="case-row"><span className="k">The design</span>
              I help scope sponsor goals into well-defined projects, then support student teams from scoping
              through delivery with mentored check-ins and free instructional computing resources.</p>
            <p className="case-row"><span className="k">The evidence</span>
              Grew the program from seven students to 100+ — the College&apos;s largest applied program — and a
              $245.5K NSF award I won as Lead-PI let 10+ teams build LLM projects a standard course couldn&apos;t run.</p>
          </div>

          <ul className="also-list">
            <li><span className="crs"><strong>INFO 521 · Intro to Machine Learning</strong> — ML from the mathematics up, implemented from scratch in Python rather than off-the-shelf libraries.</span></li>
            <li><span className="crs"><strong>INFO 523 · Data Mining &amp; Discovery</strong> — knowledge discovery with hands-on, reproducible workflows.</span><a href="https://datamineaz.org/" target="_blank" rel="noopener noreferrer">datamineaz.org</a></li>
            <li><span className="crs"><strong>INFO 526 · Data Analysis &amp; Visualization</strong> — graphic design, programming, and statistics for publication-ready figures in R and Python.</span><a href="https://datavizaz.org/" target="_blank" rel="noopener noreferrer">datavizaz.org</a></li>
          </ul>
        </section>

        {/* AI-FIRST */}
        <section className="pf-section">
          <p className="section-label">02 · AI-Native Classrooms</p>
          <h2 className="section-head">Learning and infrastructure, designed together</h2>
          <p className="section-intro">
            I design classroom experiences with their infrastructure built in: shared computing, model access,
            assignments, and feedback. The goal is to make meaningful experimentation available to students
            without requiring each learner to supply their own hardware or subscriptions.
          </p>
          <div className="plat-grid">
            <div className="plat">
              <h3 className="plat-title">NAIRR AI Sandbox</h3>
              <p className="plat-meta"><span className="hl">Lead-PI · 30K GPU credits (~$50K) · NSF NAIRR · 2025</span></p>
              <p>A national-infrastructure sandbox for applied neural-network education, where learners experiment
              on real GPUs. I designed the sandbox and won the award as Lead-PI.</p>
            </div>
            <div className="plat">
              <h3 className="plat-title">Belay — Tutoring Embedded in the Classroom</h3>
              <p className="plat-meta"><span className="hl">EduCloud ecosystem · In development</span></p>
              <p>Belay brings peer tutoring into the classroom&apos;s learning environment, with domain-specific
              materials and checks on generated responses. As part of EduCloud, it connects learning support
              with model policy and shared infrastructure while keeping tutoring separate from grades.</p>
            </div>
            <div className="plat">
              <h3 className="plat-title">JupyterQuest</h3>
              <p className="plat-meta"><span className="hl">Open source · Zenodo DOI · <a href="https://github.com/Gchism94/jupyterquest" target="_blank" rel="noopener noreferrer">github.com/Gchism94</a></span></p>
              <p>A gamified, interactive Jupyter environment for teaching reproducible data science —
              motivation design and automated checks built directly into the learner&apos;s working environment.</p>
            </div>
            <div className="plat">
              <h3 className="plat-title">MESA, AI Core &amp; EduCloud</h3>
              <p className="plat-meta"><span className="hl">NSF education lead · Faculty Director · 2025–Present</span></p>
              <p>Lead education &amp; training for MESA, a $4.6M NSF cyberinfrastructure project; supervise an
              AI + XR/VR experiential program; building EduCloud, provider-agnostic educational computing.</p>
            </div>
          </div>
        </section>

        {/* MEASUREMENT */}
        <section className="pf-section">
          <p className="section-label">03 · Measurement</p>
          <h2 className="section-head">Measuring whether it worked</h2>
          <div className="ev-row">
            <div className="ev-k">Measurement<br/>science</div>
            <div className="ev-body">I publish peer-reviewed research on whether instruments measure what they claim
              (<a href="https://doi.org/10.1016/j.jad.2026.121496" target="_blank" rel="noopener noreferrer"><em>J. Affective Disorders</em>, 2026</a>, on PHQ-8
              reliability). I apply the same standards when defining learning success metrics.</div>
          </div>
          <div className="ev-row">
            <div className="ev-k">Instrumented<br/>iteration</div>
            <div className="ev-body">Course repositories are versioned and public. <strong>Every term&apos;s revision is traceable to
              what learners did</strong>, and the changes stay reviewable.</div>
          </div>
          <div className="ev-row">
            <div className="ev-k">Research-grade<br/>rigor</div>
            <div className="ev-body">Ph.D. training in empirical research design; 8 peer-reviewed articles; reproducible analysis
              pipelines built with Binder and GitHub Actions.</div>
          </div>
        </section>

        {/* MENTORING */}
        <section className="pf-section">
          <p className="section-label">04 · Mentoring &amp; Standards</p>
          <h2 className="section-head">Training and mentoring other educators</h2>
          <div className="ev-row">
            <div className="ev-k">Instructor<br/>Trainer</div>
            <div className="ev-body"><strong>Carpentries Instructor Trainer (2023–present)</strong> — I train and
              certify new instructors worldwide in evidence-based, inclusive teaching practice.</div>
          </div>
          <div className="ev-row">
            <div className="ev-k">Mentorship<br/>at scale</div>
            <div className="ev-body">Mentored <strong>40+ graduate students and postdocs</strong> and 24 capstone team projects;
              primary PhD advisor for dissertation research on AI sandboxes in education.</div>
          </div>
          <div className="ev-row">
            <div className="ev-k">Scalable<br/>standards</div>
            <div className="ev-body">Open, reusable course materials; chaired Research Bazaar Arizona, expanding it across
              three universities.</div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="pf-footer">
          <p>Full CV &amp; references: <a href="/resume">gregtchism.com/resume</a> ·
             More work: <a href="/work">gregtchism.com/work</a></p>
          <span className="wm">gregtchism.com</span>
        </footer>

      </div>
    </div>
  )
}
