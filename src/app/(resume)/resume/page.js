'use client'

const CSS = `
:root {
  --linen:   #F5EFE6;
  --bark:    #3B2F2F;
  --juniper: #4A7C6F;
  --ash:     #9B9187;
  --ash-lt:  #C4BCB3;
  --sand:    #D4B896;
  --rust:    #B5532A;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { font-size: 16px; }

.page * { box-sizing: border-box; }
.page h1, .page h2, .page h3, .page h4 { text-align: left; margin: 0; }
.page h1, .page h2, .page h3 { font-family: inherit; font-weight: inherit; text-align: left; }

body {
  background: var(--linen);
  color: var(--bark);
  font-family: 'DM Sans', sans-serif;
  font-weight: 300;
  min-height: 100vh;
  position: relative;
}

body::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 300px 300px;
  mix-blend-mode: multiply;
  opacity: 0.14;
}

body::after {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background:
    radial-gradient(circle at 14% 18%, rgba(255,255,255,.38), transparent 30%),
    radial-gradient(circle at 82% 76%, rgba(94,75,52,.03), transparent 44%),
    repeating-linear-gradient(0deg, rgba(59,47,47,.018) 0px, rgba(59,47,47,.018) 1px, transparent 1px, transparent 4px);
  mix-blend-mode: multiply;
  opacity: .28;
}

.page {
  position: relative;
  z-index: 1;
  max-width: 860px;
  margin: 0 auto;
  padding: 80px 72px 100px;
}

.print-btn {
  position: fixed;
  top: 28px;
  right: 28px;
  z-index: 100;
  font-family: 'DM Mono', monospace;
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
.print-btn:hover { color: var(--juniper); border-color: var(--juniper); }

.cv-header {
  border-bottom: 1px solid var(--sand);
  padding-bottom: 36px;
  margin-bottom: 52px;
}

h1.cv-name, .cv-name {
  font-family: 'Playfair Display', serif !important;
  font-weight: 900 !important;
  font-size: clamp(44px, 5.6vw, 72px) !important;
  line-height: 1.05 !important;
  letter-spacing: -.02em;
  color: var(--bark);
  margin-bottom: 6px;
  text-align: left;
}

h1.cv-name em, .cv-name em {
  font-style: italic !important;
  color: var(--juniper) !important;
  font-family: 'Playfair Display', serif !important;
  font-weight: 900 !important;
}

.cv-degree {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: .22em;
  text-transform: uppercase;
  color: var(--ash);
  margin-bottom: 22px;
}

.cv-header { text-align: left; }
.cv-name   { text-align: left; }
.cv-links  { display: flex; gap: 28px; flex-wrap: wrap; justify-content: flex-start; }

.cv-links a {
  font-family: 'DM Mono', monospace;
  font-size: 9.5px;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: var(--ash);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  padding-bottom: 1px;
  transition: color .2s, border-color .2s;
}
.cv-links a:hover { color: var(--juniper); border-color: var(--juniper); }
.cv-links .divider { font-family: 'DM Mono', monospace; font-size: 9.5px; color: var(--ash-lt); }

.cv-body { display: grid; grid-template-columns: 168px 1fr; gap: 0 52px; }

.section-label {
  font-family: 'DM Mono', monospace;
  font-size: 8.5px;
  letter-spacing: .26em;
  text-transform: uppercase;
  color: var(--ash);
  padding-top: 4px;
  text-align: right;
  line-height: 1.6;
}

.section { display: contents; }

.section-content { border-top: 1px solid var(--sand); padding: 32px 0 40px; }

.section-label-cell {
  border-top: 1px solid var(--sand);
  padding: 32px 0 40px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
}

.entry { margin-bottom: 26px; }
.entry:last-child { margin-bottom: 0; }

.entry-title {
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: 15px;
  color: var(--bark);
  line-height: 1.3;
  margin-bottom: 3px;
}
.entry-title em { font-style: italic; color: var(--juniper); }

.entry-meta {
  font-family: 'DM Mono', monospace;
  font-size: 8.5px;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: var(--ash);
  margin-bottom: 8px;
}

.entry-body { font-family: 'DM Sans', sans-serif; font-weight: 300; font-size: 13.5px; line-height: 1.72; color: var(--bark); }
.entry-body p { margin-bottom: 4px; }

.cv-bullets { list-style: none; padding: 0; margin: 6px 0 0; }
.cv-bullets li { font-size: 13px; line-height: 1.68; color: #5A4F4A; padding-left: 14px; position: relative; margin-bottom: 3px; }
.cv-bullets li::before { content: "—"; position: absolute; left: 0; color: var(--ash-lt); font-size: 11px; top: 1px; }

.pub-entry { margin-bottom: 18px; padding-left: 22px; position: relative; }
.pub-entry::before { content: attr(data-n); position: absolute; left: 0; font-family: 'DM Mono', monospace; font-size: 8.5px; color: var(--ash-lt); top: 3px; }
.pub-entry .pub-title { font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 400; color: var(--bark); line-height: 1.6; }
.pub-entry .pub-venue { font-family: 'DM Mono', monospace; font-size: 8.5px; letter-spacing: .10em; text-transform: uppercase; color: var(--ash); margin-top: 3px; }
.pub-entry .pub-title a, .pub-entry .pub-venue a { color: var(--juniper); text-decoration: none; border-bottom: 1px solid transparent; transition: border-color .2s; }
.pub-entry .pub-title a:hover, .pub-entry .pub-venue a:hover { border-color: var(--juniper); }

.subsection-head {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-weight: 400;
  font-size: 13px;
  color: var(--ash);
  margin: 24px 0 12px;
  padding-bottom: 6px;
  border-bottom: 1px solid rgba(196,188,179,.45);
}
.subsection-head:first-child { margin-top: 0; }

.award-row { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 10px; gap: 12px; }
.award-name { font-size: 13px; font-family: 'DM Sans', sans-serif; color: var(--bark); }
.award-year { font-family: 'DM Mono', monospace; font-size: 8.5px; letter-spacing: .12em; color: var(--ash); white-space: nowrap; flex-shrink: 0; }

.grant-entry { margin-bottom: 20px; padding: 16px 18px; border-left: 2px solid var(--sand); background: rgba(212,184,150,.07); }
.grant-title { font-family: 'Playfair Display', serif; font-size: 13.5px; font-weight: 700; color: var(--bark); margin-bottom: 4px; line-height: 1.4; }
.grant-meta { font-family: 'DM Mono', monospace; font-size: 8px; letter-spacing: .10em; text-transform: uppercase; color: var(--ash); line-height: 1.8; }
.grant-meta .awarded { color: var(--juniper); font-weight: 400; }
.grant-meta .award-pending { color: var(--juniper); font-weight: 400; }
.grant-meta .pending { color: var(--rust); font-weight: 400; }
.grant-meta .not-awarded { color: var(--ash-lt); }

.cert-chips { display: flex; flex-wrap: wrap; gap: 8px; }
.chip { font-family: 'DM Mono', monospace; font-size: 8.5px; letter-spacing: .12em; text-transform: uppercase; color: var(--ash); border: 1px solid var(--ash-lt); padding: 5px 11px; }

.plain-list { list-style: none; padding: 0; }
.plain-list li { font-size: 13px; line-height: 1.68; color: var(--bark); padding: 7px 0; border-bottom: 1px solid rgba(196,188,179,.3); display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }
.plain-list li:last-child { border-bottom: none; }
.plain-list .item-year { font-family: 'DM Mono', monospace; font-size: 8.5px; letter-spacing: .10em; color: var(--ash); white-space: nowrap; flex-shrink: 0; }

.watermark { position: fixed; bottom: 32px; right: 36px; font-family: 'DM Mono', monospace; font-size: 8px; letter-spacing: .20em; text-transform: uppercase; color: var(--ash-lt); z-index: 1; }

@media print {
  body::before, body::after { display: none; }
  .print-btn, .watermark { display: none; }
  .page { padding: 40px 52px 60px; max-width: 100%; }
  .cv-name { font-size: 42px; }
  a { color: inherit !important; }
  .grant-entry { break-inside: avoid; }
  .pub-entry { break-inside: avoid; }
  .entry { break-inside: avoid; }
}

@media (max-width: 680px) {
  .page { padding: 48px 28px 72px; }
  .cv-body { grid-template-columns: 1fr; gap: 0; }
  .section-label-cell { justify-content: flex-start; padding-bottom: 10px; border-top: none; padding-top: 32px; }
  .section-content { border-top: none; padding-top: 0; }
  .print-btn { top: 16px; right: 16px; }
}
`

export default function Resume() {
  return (
    <>
      <style suppressHydrationWarning>{CSS}</style>

      <button className="print-btn" onClick={() => window.print()}>Print / Save PDF</button>

      <div className="page">

        {/* HEADER */}
        <header className="cv-header">
          <h1 className="cv-name">Greg T.&nbsp;<em>Chism</em></h1>
          <p className="cv-degree">Ph.D. · Data Scientist · Educator · Builder</p>
          <nav className="cv-links">
            <a href="https://github.com/Gchism94" target="_blank" rel="noopener noreferrer">GitHub</a>
            <span className="divider">·</span>
            <a href="https://gregtchism.com" target="_blank" rel="noopener noreferrer">gregtchism.com</a>
            <span className="divider">·</span>
            <a href="https://www.linkedin.com/in/greg-chism/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <span className="divider">·</span>
            <a href="mailto:gchism@arizona.edu">gchism@arizona.edu</a>
            <span className="divider">·</span>
            <a href="https://orcid.org/0000-0002-5478-2445" target="_blank" rel="noopener noreferrer">ORCID</a>
          </nav>
        </header>

        {/* BODY */}
        <div className="cv-body">

          {/* EXPERIENCE */}
          <div className="section-label-cell"><span className="section-label">Experience</span></div>
          <div className="section-content">

            <div className="entry">
              <div className="entry-title">Co-Founder &amp; Principal Consultant</div>
              <div className="entry-meta">Three Canyon Consulting · 2024–Present · Bend, OR</div>
              <div className="entry-body">
                <ul className="cv-bullets">
                  <li>AI and data strategy consulting for universities, health systems, and mission-driven organizations.</li>
                  <li>Design data infrastructure, evaluate AI applications, and build decision-relevant insight pipelines.</li>
                </ul>
              </div>
            </div>

            <div className="entry">
              <div className="entry-title">Assistant Professor of Practice</div>
              <div className="entry-meta">University of Arizona · College of Information Science · 2023–Present</div>
              <div className="entry-body">
                <ul className="cv-bullets">
                  <li>Lead development of modular AI education platforms including adaptive tutors and automated feedback systems.</li>
                  <li>Faculty Director of Instructional Computing (2025–present): supervise AI Core experiential learning program in AI + XR/VR.</li>
                  <li>Co-lead AI Roadmap Committees for the Office for Responsible AI (2025–2026).</li>
                </ul>
              </div>
            </div>

            <div className="entry">
              <div className="entry-title">Computational &amp; Data Science Educator</div>
              <div className="entry-meta">University of Arizona · Data Science Institute · 2022–2023</div>
              <div className="entry-body">
                <ul className="cv-bullets">
                  <li>Organized workshops promoting data science education and open science practices.</li>
                  <li>Mentored 40+ graduate students and postdocs in reproducible research workflows.</li>
                </ul>
              </div>
            </div>

            <div className="entry">
              <div className="entry-title">Research Scientist</div>
              <div className="entry-meta">University of Arizona · Social Insect Lab · 2017–2022</div>
              <div className="entry-body">
                <ul className="cv-bullets">
                  <li>Designed and executed interdisciplinary empirical research on collective behavior and nest architecture.</li>
                  <li>Built reproducible analysis pipelines with Binder and GitHub Actions.</li>
                </ul>
              </div>
            </div>

          </div>

          {/* EDUCATION */}
          <div className="section-label-cell"><span className="section-label">Education</span></div>
          <div className="section-content">

            <div className="entry">
              <div className="entry-title">Ph.D., Entomology &amp; Insect Science</div>
              <div className="entry-meta">University of Arizona · 2022</div>
              <div className="entry-body">Dissertation: <em>The Influence of Nest Architecture on the Ant Temnothorax rugatulus</em><br />Advisor: Dr. Anna Dornhaus</div>
            </div>

            <div className="entry">
              <div className="entry-title">B.S., Zoology</div>
              <div className="entry-meta">University of California, Santa Barbara · 2016</div>
              <div className="entry-body">Advisors: Drs. Armand Kuris, Kevin Lafferty, Jonathan Pruitt</div>
            </div>

            <div className="entry">
              <div className="entry-title">A.S., Biology</div>
              <div className="entry-meta">Shasta Community College · 2014</div>
            </div>

          </div>

          {/* HONORS & AWARDS */}
          <div className="section-label-cell"><span className="section-label">Honors &amp; Awards</span></div>
          <div className="section-content">
            <div className="award-row"><span className="award-name">Duke 3C Fellow, Cohort 5</span><span className="award-year">2024–Present</span></div>
            <div className="award-row"><span className="award-name">Jetstream2 AI Pilot Fellow — $5,000</span><span className="award-year">2024–2025</span></div>
            <div className="award-row"><span className="award-name">Posit Table Contest — Best Individual Table</span><span className="award-year">2024</span></div>
            <div className="award-row"><span className="award-name">EIS Carruth Award for Graduate Student Excellence — $500</span><span className="award-year">2021</span></div>
            <div className="award-row"><span className="award-name">GIDP–EIS Program Education Award — $250</span><span className="award-year">2020</span></div>
          </div>

          {/* CERTIFICATIONS */}
          <div className="section-label-cell"><span className="section-label">Certifications</span></div>
          <div className="section-content">
            <div className="cert-chips">
              <span className="chip">All of Us Certified Data User (2024)</span>
              <span className="chip">Carpentries Instructor Trainer (2023)</span>
              <span className="chip">Carpentries Instructor (2022)</span>
            </div>
          </div>

          {/* COMPUTING AWARDS */}
          <div className="section-label-cell"><span className="section-label">Computing Awards</span></div>
          <div className="section-content">

            <div className="grant-entry">
              <div className="grant-title">NAIRR AI Sandbox for Applied Neural Networks Education</div>
              <div className="grant-meta">
                NSF National AI Research Resource (NAIRR) · Lead-PI (85%) · 30K ACCESS GPU Credits (~$50,000)<br />
                <span className="awarded">Awarded — July 2025</span>
              </div>
            </div>

            <div className="grant-entry">
              <div className="grant-title">Supporting Computational Resources for Advanced LLM &amp; Data Science Modeling</div>
              <div className="grant-meta">
                NSF ACCESS Discover Award SOC25004 · Lead-PI (100%) · 1.5M ACCESS Credits (~$245,500)<br />
                <span className="awarded">Awarded — January 2025</span>
              </div>
            </div>

            <div className="grant-entry">
              <div className="grant-title">Benchmarking AI Models for Patient Journey Analysis (MIMIC-III)</div>
              <div className="grant-meta">
                NSF ACCESS Explore Award MED250001 · Lead-PI (100%) · 400K ACCESS Credits (~$72,800)<br />
                <span className="awarded">Awarded — January 2025</span>
              </div>
            </div>

          </div>

          {/* GRANTS SUBMITTED */}
          <div className="section-label-cell"><span className="section-label">Grants Submitted</span></div>
          <div className="section-content">


            <div className="grant-entry">
              <div className="grant-title">MESA: Multidisciplinary Environment for Scientific Advancement</div>
              <div className="grant-meta">
                NSF IDSS · Sr. Personnel (5%) · $9,000,000 over 3 years · PI: Tyson Swetnam<br />
                <span className="award-pending">Submitted December 2025 · Award Pending</span>
              </div>
            </div>

            <div className="grant-entry">
              <div className="grant-title">Evaluation-First Agentic AI: A Modular Architecture for Reliable, Resource-Aware Human–AI Collaboration</div>
              <div className="grant-meta">
                Amazon ARA · Co-PI (50%) · 50K AWS Credits · $80,000 over 1 year<br />
                <span className="pending">Submitted May 2025 · Pending</span>
              </div>
            </div>

            <div className="grant-entry">
              <div className="grant-title">MAESTRO: Modular AI Evaluation with Self-Testing and Resilient Oversight</div>
              <div className="grant-meta">
                ONR MURI · Lead-PI (40%) · $4,676,845 over 5 years<br />
                <span className="not-awarded">Submitted May 2025 · Not Awarded</span>
              </div>
            </div>

            <div className="grant-entry">
              <div className="grant-title">Mental-HEALTH-MAP</div>
              <div className="grant-meta">
                NIH R34 · Co-Investigator (25%) · $699,000 over 3 years · PI: Jennifer De La Rosa<br />
                <span className="not-awarded">Submitted October 2024 · Not Awarded</span>
              </div>
            </div>

          </div>

          {/* PUBLICATIONS */}
          <div className="section-label-cell"><span className="section-label">Publications</span></div>
          <div className="section-content">

            <div className="subsection-head">Peer-reviewed articles</div>

            <div className="pub-entry" data-n="1">
              <div className="pub-title">De La Rosa, J. S., <strong>Chism, G. T.</strong>, Herder, K. E., Mun, C. J., &amp; Aaron, R. V. (2026). Do somatic symptoms bias depression screening? Reliability and equivalence of PHQ-8 in those with and without chronic pain.</div>
              <div className="pub-venue"><em>Journal of Affective Disorders</em>, 121496 · <a href="https://doi.org/10.1016/j.jad.2026.121496" target="_blank" rel="noopener noreferrer">DOI</a></div>
            </div>

            <div className="pub-entry" data-n="2">
              <div className="pub-title"><strong>Chism, G. T.</strong>, Nichols, W., &amp; Dornhaus, A. (2024). Cavity geometry shapes overall ant colony organization through spatial limits, but workers maintain fidelity zones.</div>
              <div className="pub-venue"><em>Animal Behaviour</em>, 216, 195–211 · <a href="https://doi.org/10.1016/j.anbehav.2024.04.013" target="_blank" rel="noopener noreferrer">DOI</a></div>
            </div>

            <div className="pub-entry" data-n="3">
              <div className="pub-title">Swetnam, T. L., Antin, P. B., Bartelme, R., Bucksch, A., Camhy, D., <strong>Chism, G.</strong>, … &amp; Lyons, E. (2024). CyVerse: Cyberinfrastructure for open science.</div>
              <div className="pub-venue"><em>PLOS Computational Biology</em>, 20(2), e1011270 · <a href="https://doi.org/10.1371/journal.pcbi.1011270" target="_blank" rel="noopener noreferrer">DOI</a></div>
            </div>

            <div className="pub-entry" data-n="4">
              <div className="pub-title">McEwen, B. L., Lichtenstein, J. L., Fisher, D. N., Wright, C. M., <strong>Chism, G. T.</strong>, Pinter-Wollman, N., &amp; Pruitt, J. N. (2020). Predictors of colony extinction vary by habitat type in social spiders.</div>
              <div className="pub-venue"><em>Behavioral Ecology and Sociobiology</em>, 74 · <a href="https://doi.org/10.1007/s00265-020-02826-3" target="_blank" rel="noopener noreferrer">DOI</a></div>
            </div>

            <div className="pub-entry" data-n="5">
              <div className="pub-title">Pruitt, J. N., Wright, C. M., Lichtenstein, J. L., <strong>Chism, G. T.</strong>, McEwen, B. L., Kamath, A., &amp; Pinter-Wollman, N. (2018). Selection for collective aggressiveness favors social susceptibility in social spiders.</div>
              <div className="pub-venue"><em>Current Biology</em>, 28(1), 100–105 · <a href="https://doi.org/10.1016/j.cub.2017.11.052" target="_blank" rel="noopener noreferrer">DOI</a></div>
            </div>

            <div className="pub-entry" data-n="6">
              <div className="pub-title">Lichtenstein, J. L., <strong>Chism, G. T.</strong>, Kamath, A., &amp; Pruitt, J. N. (2017). Intraindividual behavioral variability predicts foraging outcome in a beach-dwelling jumping spider.</div>
              <div className="pub-venue"><em>Scientific Reports</em>, 7(1), 18063 · <a href="https://www.nature.com/articles/s41598-017-18359-x" target="_blank" rel="noopener noreferrer">DOI</a></div>
            </div>

            <div className="pub-entry" data-n="7">
              <div className="pub-title">Foster, W. C., Armstrong, C. M., <strong>Chism, G. T.</strong>, &amp; Pruitt, J. N. (2017). Smaller and bolder prey snails have higher survival in staged encounters with the sea star <em>Pisaster giganteus</em>.</div>
              <div className="pub-venue"><em>Current Zoology</em>, 63(6), 633–638 · <a href="https://doi.org/10.1093/cz/zow098" target="_blank" rel="noopener noreferrer">DOI</a></div>
            </div>

            <div className="subsection-head">Book chapters</div>

            <div className="pub-entry" data-n="1">
              <div className="pub-title">Keiser, C. N., Lichtenstein, J. L. L., Wright, C. M., <strong>Chism, G. T.</strong>, Pruitt, J. N., Gonzalez-Santoyo, I., … &amp; Gonzalez-Tokman, D. (2018). Personality and behavioral syndromes in insects and spiders.</div>
              <div className="pub-venue"><em>Insect Behavior: From Mechanisms to Ecological and Evolutionary Consequences</em>, 236–256</div>
            </div>

            <div className="subsection-head">Works in progress</div>

            <div className="pub-entry" data-n="1">
              <div className="pub-title">De La Rosa, J. S., Herder, K. E., Romero, R. D., Wolf, D. S. S., Largent-Milnes, T., Ibrahim, M. M., Pigott, S. S., <strong>Chism, G. T.</strong>, Meyerson, B. E., Pilitsis, J. G., &amp; Brady, B. R. (2025). Impact of Chronic Pain on the Families of US Adults. <em>In revision at PAIN Reports.</em></div>
              <div className="pub-venue">medRxiv · <a href="https://doi.org/10.1101/2025.02" target="_blank" rel="noopener noreferrer">DOI</a></div>
            </div>

            <div className="subsection-head">Open source software &amp; code</div>

            <div className="pub-entry" data-n="1">
              <div className="pub-title"><strong>Chism, G. T.</strong> (2024). JupyterQuest v0.4.0. Zenodo.</div>
              <div className="pub-venue"><a href="https://doi.org/10.5281/zenodo.10650368" target="_blank" rel="noopener noreferrer">DOI</a></div>
            </div>

            <div className="pub-entry" data-n="2">
              <div className="pub-title"><strong>Chism, G.</strong>, &amp; De La Rosa, J. (2025). PHQ-MH-CP Compendium v0.0.1. Zenodo.</div>
              <div className="pub-venue"><a href="https://doi.org/10.5281/zenodo.14943534" target="_blank" rel="noopener noreferrer">DOI</a></div>
            </div>

            <div className="pub-entry" data-n="3">
              <div className="pub-title">Rice, L., Tate, S., Farynyk, D., Sun, J., <strong>Chism, G.</strong>, … &amp; Shin, M. C. (2020). ABCTracker: an easy-to-use, cloud-based application for tracking multiple objects.</div>
              <div className="pub-venue">arXiv:2001.10072 · <a href="https://arxiv.org/abs/2001.10072" target="_blank" rel="noopener noreferrer">DOI</a></div>
            </div>

          </div>

          {/* SERVICE */}
          <div className="section-label-cell"><span className="section-label">Service</span></div>
          <div className="section-content">

            <div className="subsection-head">University of Arizona</div>

            <div className="entry">
              <div className="entry-title">Faculty Director of Instructional Computing</div>
              <div className="entry-meta">College of Information Science · 2025–Present</div>
              <div className="entry-body">
                <ul className="cv-bullets">
                  <li>Supervise AI Core, a leading experiential learning program in AI + XR/VR.</li>
                  <li>Provide free computing resources to support scalable, open-source learning environments.</li>
                </ul>
              </div>
            </div>

            <div className="entry">
              <div className="entry-title">Co-Lead, AI Roadmap Committees</div>
              <div className="entry-meta">Office for Responsible AI · 2025–2026</div>
              <div className="entry-body">Infrastructure &amp; Resources; Research — advancing AI integration and leadership within the University of Arizona.</div>
            </div>

            <div className="entry">
              <div className="entry-title">Co-Director, Data Science Ambassadors Program</div>
              <div className="entry-meta">2024–Present</div>
              <div className="entry-body">Guide students in community-based data science initiatives and outreach projects.</div>
            </div>

            <div className="entry">
              <div className="entry-title">Faculty Awards Committee</div>
              <div className="entry-meta">College of Information Science · 2023–Present · Chaired 2025–2026</div>
              <div className="entry-body">Helped more than double award nominations in 2024.</div>
            </div>

            <div className="subsection-head">National &amp; external</div>

            <div className="entry">
              <div className="entry-title">Carpentries Instructor Trainer</div>
              <div className="entry-meta">2023–Present</div>
              <div className="entry-body">Train and mentor new instructors to promote inclusive, evidence-based teaching practices.</div>
            </div>

            <div className="entry">
              <div className="entry-title">Quantum Computing Steering Committee</div>
              <div className="entry-meta">Arizona State University · 2025–Present</div>
              <div className="entry-body">Identify joint funding opportunities between ASU and the University of Arizona.</div>
            </div>

            <div className="subsection-head">Community outreach</div>

            <div className="entry">
              <div className="entry-title">Chair / Deputy Chair, Research Bazaar Arizona</div>
              <div className="entry-meta">2022, 2023</div>
              <div className="entry-body">Organized interdisciplinary workshops; expanded collaboration to three universities.</div>
            </div>

            <div className="entry">
              <div className="entry-title">Industry Careers in Data Science Speaker Series</div>
              <div className="entry-meta">2022–2023</div>
              <div className="entry-body">Developed and hosted a speaker series on academic-to-industry transitions; ~20–40 attendees per session.</div>
            </div>

          </div>

          {/* PRESENTATIONS */}
          <div className="section-label-cell"><span className="section-label">Presentations</span></div>
          <div className="section-content">
            <ul className="plain-list">
              <li><span>From Reproducibility to Reach: Building the AI Sandbox Through the Jetstream2 AI Fellowship. Jetstream2 AI Fellowship Cohort 2 Meeting, University of Indiana.</span><span className="item-year">Jan 2025</span></li>
              <li><span>Data Storytelling Masterclass, International Admissions</span><span className="item-year">Spring 2025</span></li>
              <li><span>History of Data Visualization — invited lecture</span><span className="item-year">Spring 2025</span></li>
              <li><span>Information on Tap: Election Integrity — public talk, Tucson</span><span className="item-year">2024</span></li>
            </ul>
          </div>

          {/* MEDIA */}
          <div className="section-label-cell"><span className="section-label">Media</span></div>
          <div className="section-content">
            <ul className="plain-list">
              <li><span>KJZZ — Data centers, communities, and water (radio interview)</span><span className="item-year">Aug 2025</span></li>
              <li><span>University of Arizona Graduate Center — Elevating Graduate Research with Visual Communication</span><span className="item-year">Oct 2024</span></li>
              <li><span>UA College of Information Science News — Ensuring Creative Freedom: 8 Questions with Greg Chism</span><span className="item-year">Feb 2024</span></li>
              <li><span>UA News — UA Students Earn NSF Graduate Research Fellowships</span><span className="item-year">May 2019</span></li>
            </ul>
          </div>

        </div>
      </div>

      <div className="watermark">gregtchism.com</div>
    </>
  )
}
