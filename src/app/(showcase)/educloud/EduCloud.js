// EduCloud — overview + architecture. Server component: no client JS, no hooks.
// All styles are scoped under `.ec` so nothing collides with global or Tailwind rules.

const css = `
/* ---------- tokens ---------- */

.ec {
  --bg:        #fbfaf8;
  --bg-raised: #ffffff;
  --bg-sunk:   #f2efea;
  --ink:       #1c1a17;   /* 15.8:1 on --bg */
  --ink-soft:  #4a4640;   /* 8.4:1  on --bg */
  --ink-faint: #6b665e;   /* 5.4:1  on --bg — AA for body text */
  --rule:      #ded8cf;
  --rule-firm: #c3bbaf;
  --accent:    #1f5f5b;   /* deep teal — 7.4:1 on --bg */
  --accent-dk: #123c39;
  --accent-bg: #e6efee;
  --warn:      #8a4b16;   /* 5.6:1 on --bg */
  --warn-bg:   #fbf0e4;
  --warn-rule: #e0bd93;
  --measure: 37rem;
  --radius: 6px;
}
@media (prefers-color-scheme: dark) {
.ec {
    --bg:        #16150f;
    --bg-raised: #201e17;
    --bg-sunk:   #100f0b;
    --ink:       #f2efe7;
    --ink-soft:  #cdc7ba;
    --ink-faint: #a49d90;
    --rule:      #383429;
    --rule-firm: #524c3d;
    --accent:    #7fc9c1;
    --accent-dk: #a8ded8;
    --accent-bg: #17302e;
    --warn:      #e3ab6b;
    --warn-bg:   #2e2013;
    --warn-rule: #6b4c26;
  }}

/* ---------- base ---------- */

.ec, .ec *, .ec *::before, .ec *::after { box-sizing: border-box; }
.ec { -webkit-text-size-adjust: 100%; }
.ec {
  background: var(--bg);
  color: var(--ink);
  font: 400 clamp(1rem, 0.96rem + 0.2vw, 1.075rem)/1.65 ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  font-feature-settings: "kern", "liga";
  overflow-wrap: break-word;
}
.ec h1, .ec h2, .ec h3 {
  font-family: ui-serif, Georgia, "Iowan Old Style", "Times New Roman", serif;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.011em;
  margin: 0;
  text-wrap: balance;
}
.ec p, .ec li { text-wrap: pretty; }
.ec a { color: var(--accent); text-underline-offset: 0.18em; text-decoration-thickness: 0.07em; }
.ec a:hover { color: var(--accent-dk); }
.ec :focus-visible {
  outline: 3px solid var(--accent);
  outline-offset: 3px;
  border-radius: 2px;
}
.ec code, .ec .mono {
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
  font-size: 0.88em;
}

/* ---------- layout ---------- */

.ec .wrap { width: min(100% - 2.5rem, 59rem); margin-inline: auto; }
.ec .prose { max-width: var(--measure); }
.ec main > section { padding-block: clamp(2.75rem, 6vw, 4.5rem); border-top: 1px solid var(--rule); }
.ec main > section:first-of-type { border-top: 0; }
.ec .skip {
  position: absolute; left: -9999px;
  background: var(--accent); color: #fff;
  padding: 0.7rem 1.1rem; border-radius: 0 0 var(--radius) 0; z-index: 20;
  text-decoration: none; font-weight: 600;
}
.ec .skip:focus { left: 0; top: 0; }

/* ---------- masthead ---------- */

.ec .masthead { padding-block: clamp(3rem, 8vw, 5.5rem) clamp(2rem, 5vw, 3rem); }
.ec .eyebrow {
  font-size: 0.78rem; letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--ink-faint); font-weight: 600; margin: 0 0 1.1rem;
}
.ec h1 { font-size: clamp(2.6rem, 1.8rem + 3.6vw, 4.4rem); letter-spacing: -0.023em; }
.ec .standfirst {
  font-size: clamp(1.16rem, 1.06rem + 0.5vw, 1.4rem);
  line-height: 1.5; color: var(--ink-soft);
  max-width: 40rem; margin: 1.4rem 0 0;
}

/* ---------- notice ---------- */

.ec .notice {
  background: var(--warn-bg);
  border: 1px solid var(--warn-rule);
  border-left-width: 4px;
  border-radius: var(--radius);
  padding: 1.4rem 1.5rem;
  margin-block: 2.5rem 0;
  max-width: 44rem;
}
.ec .notice h2 { font-size: 1.14rem; color: var(--warn); font-family: inherit; font-weight: 700; }
.ec .notice p { margin: 0.6rem 0 0; color: var(--ink-soft); }
.ec .notice p:first-of-type { margin-top: 0.5rem; }
.ec .dates { list-style: none; margin: 1rem 0 0; padding: 0; display: grid; gap: 0.5rem; }
.ec .dates li { display: flex; flex-wrap: wrap; gap: 0.2rem 0.85rem; align-items: baseline; }
.ec .dates .d { font-weight: 700; color: var(--ink); min-width: 9.5rem; font-variant-numeric: tabular-nums; }
.ec .dates .w { color: var(--ink-soft); }

/* ---------- typography blocks ---------- */

.ec h2.section { font-size: clamp(1.6rem, 1.35rem + 1vw, 2.15rem); }
.ec .lede { font-size: 1.09em; color: var(--ink-soft); }
.ec section > .wrap > p, .ec section > .wrap > .prose > p { margin: 1.15em 0; }
.ec .kicker {
  font-size: 0.78rem; letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--accent); font-weight: 700; margin: 0 0 0.7rem;
}

/* ---------- module cards ---------- */

.ec .modules { list-style: none; margin: 2.5rem 0 0; padding: 0; display: grid; gap: 1.1rem; grid-template-columns: repeat(auto-fit, minmax(min(100%, 17rem), 1fr)); }
.ec .mod {
  background: var(--bg-raised);
  border: 1px solid var(--rule);
  border-radius: var(--radius);
  padding: 1.4rem 1.5rem 1.5rem;
  display: flex; flex-direction: column; gap: 0.6rem;
}
.ec .mod.primary { border-color: var(--accent); border-width: 2px; background: var(--accent-bg); }
.ec .mod h3 { font-size: 1.3rem; display: flex; align-items: baseline; gap: 0.6rem; flex-wrap: wrap; }
.ec .gloss { font: italic 400 0.86rem/1.4 ui-serif, Georgia, serif; color: var(--ink-faint); }
.ec .mod p { margin: 0; color: var(--ink-soft); font-size: 0.97rem; }
.ec .meta { margin-top: auto; padding-top: 0.9rem; display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center; }
.ec .tag {
  font-size: 0.76rem; font-weight: 600; letter-spacing: 0.02em;
  padding: 0.24rem 0.6rem; border-radius: 100px;
  background: var(--bg-sunk); color: var(--ink-soft); border: 1px solid var(--rule);
}
.ec .tag.built { background: var(--accent-bg); color: var(--accent-dk); border-color: var(--accent); }
.ec .tag.part { background: var(--warn-bg);   color: var(--warn);      border-color: var(--warn-rule); }
@media (prefers-color-scheme: dark) {
.ec .tag.built { color: var(--accent); }}

/* ---------- the stack diagram: real text, reflows, never needs zoom ---------- */

.ec .stack { margin: 2.5rem 0 0; display: grid; gap: 0.55rem; }
.ec .layer {
  display: grid;
  grid-template-columns: 11rem 1fr;
  gap: 0.4rem 1.4rem;
  align-items: start;
  background: var(--bg-raised);
  border: 1px solid var(--rule);
  border-radius: var(--radius);
  padding: 1rem 1.25rem;
}
.ec .layer.people { background: var(--bg-sunk); border-style: dashed; }
.ec .layer.core { border-color: var(--accent); border-width: 2px; background: var(--accent-bg); }
.ec .layer.optional { border-style: dashed; }
.ec .layer .who { font-weight: 700; color: var(--ink); }
.ec .layer .who .sub { display: block; font-weight: 400; font-size: 0.83rem; color: var(--ink-faint); margin-top: 0.15rem; }
.ec .layer .what { color: var(--ink-soft); font-size: 0.96rem; }
.ec .joint {
  justify-self: center; color: var(--ink-faint); font-size: 0.8rem;
  letter-spacing: 0.06em; text-transform: uppercase; padding-block: 0.1rem;
}
@media (max-width: 34rem) {
.ec .layer { grid-template-columns: 1fr; gap: 0.35rem; padding: 0.95rem 1.1rem; }}

/* ---------- architecture diagram ---------- */

.ec .dia-figure { margin: 2.25rem 0 0; }
.ec .dia { width: 100%; height: auto; display: block; }
.ec .dia-wide { display: none; }
@media (min-width: 46rem) {
.ec .dia-wide { display: block; }
.ec .dia-tall { display: none; }}
.ec .dia .box { fill: var(--bg-raised); stroke: var(--rule-firm); stroke-width: 1.5; }
.ec .dia .box-core { fill: var(--accent-bg); stroke: var(--accent); stroke-width: 2.5; }
.ec .dia .box-ext { fill: var(--bg-sunk); stroke: var(--rule-firm); stroke-width: 1.5; stroke-dasharray: 5 3; }
.ec .dia .box-people { fill: var(--bg-sunk); stroke: var(--rule-firm); stroke-width: 1.5; }
.ec .dia .boundary { fill: none; stroke: var(--accent); stroke-width: 2; stroke-dasharray: 8 5; opacity: 0.75; }
.ec .dia .nm { fill: var(--ink); font: 650 16px ui-serif, Georgia, serif; }
.ec .dia .nm-sm { fill: var(--ink); font: 650 14px ui-serif, Georgia, serif; }
.ec .dia .rl { fill: var(--ink-faint); font: 400 10.5px ui-sans-serif, system-ui, sans-serif; letter-spacing: 0.04em; text-transform: uppercase; }
.ec .dia .tx { fill: var(--ink-soft); font: 400 11.5px ui-sans-serif, system-ui, sans-serif; }
.ec .dia .tx-sm { fill: var(--ink-soft); font: 400 10px ui-sans-serif, system-ui, sans-serif; }
.ec .dia .bl { fill: var(--accent); font: 600 10.5px ui-sans-serif, system-ui, sans-serif; letter-spacing: 0.05em; text-transform: uppercase; }
.ec .dia .flow { fill: var(--ink-faint); font: 400 10.5px ui-sans-serif, system-ui, sans-serif; }
.ec .dia .ln { stroke: var(--rule-firm); stroke-width: 1.5; fill: none; }
.ec .dia .ln-a { stroke: var(--accent); stroke-width: 1.75; fill: none; }
.ec .dia .arh { fill: var(--rule-firm); }
.ec .dia .arh-a { fill: var(--accent); }
.ec .dia .gate { fill: var(--accent); }
.ec .dia .gate-t { fill: var(--bg-raised); font: 700 10px ui-sans-serif, system-ui, sans-serif; }
.ec .dia .note { fill: var(--ink-soft); font: 400 11.5px ui-sans-serif, system-ui, sans-serif; }
.ec .dia .note-b { fill: var(--ink); font: 650 11.5px ui-sans-serif, system-ui, sans-serif; }
.ec .dia-tall .tx-sm { font-size: 9.5px; }
.ec .dia-alt { margin-top: 1.5rem; border-top: 1px solid var(--rule); padding-top: 1rem; }
.ec .dia-alt summary {
  cursor: pointer; font-weight: 600; color: var(--accent);
  padding: 0.35rem 0; min-height: 44px; display: flex; align-items: center;
}
.ec .dia-alt summary:hover { color: var(--accent-dk); }
.ec .dia-alt[open] summary { margin-bottom: 0.5rem; }
.ec figcaption { color: var(--ink-faint); font-size: 0.9rem; margin-top: 1rem; max-width: var(--measure); }

/* ---------- rule callout ---------- */

.ec .rule-box {
  margin: 2.25rem 0 0; padding: 1.6rem 1.75rem;
  background: var(--bg-raised); border: 1px solid var(--rule-firm);
  border-radius: var(--radius); max-width: 46rem;
}
.ec .rule-box blockquote {
  margin: 0; font-family: ui-serif, Georgia, serif;
  font-size: clamp(1.16rem, 1.05rem + 0.5vw, 1.4rem); line-height: 1.4; color: var(--ink);
}
.ec .rule-box .attrib { margin: 1rem 0 0; font-size: 0.93rem; color: var(--ink-faint); }

/* ---------- honest status list ---------- */

.ec .status { list-style: none; margin: 1.6rem 0 0; padding: 0; display: grid; gap: 0.9rem; max-width: 44rem; }
.ec .status li { display: grid; grid-template-columns: 1.6rem 1fr; gap: 0.85rem; align-items: start; }
.ec .status .mark { font-weight: 700; line-height: 1.5; }
.ec .status .yes .mark { color: var(--accent); }
.ec .status .no  .mark { color: var(--warn); }
.ec .status p { margin: 0; color: var(--ink-soft); }
.ec .status strong { color: var(--ink); font-weight: 650; }

/* ---------- links out ---------- */

.ec .links { list-style: none; margin: 1.8rem 0 0; padding: 0; display: grid; gap: 0.9rem; grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr)); max-width: 52rem; }
.ec .links a {
  display: block; padding: 1rem 1.15rem; min-height: 44px;
  background: var(--bg-raised); border: 1px solid var(--rule);
  border-radius: var(--radius); text-decoration: none; color: var(--ink);
  transition: border-color 0.15s ease, transform 0.15s ease;
}
.ec .links a:hover { border-color: var(--accent); transform: translateY(-1px); }
.ec .links .t { display: block; font-weight: 650; color: var(--accent); }
.ec .links .d { display: block; font-size: 0.9rem; color: var(--ink-faint); margin-top: 0.2rem; }

/* ---------- footer ---------- */

.ec footer { border-top: 1px solid var(--rule); padding-block: 2.5rem 3.5rem; color: var(--ink-faint); font-size: 0.92rem; }
.ec footer p { margin: 0.5rem 0; max-width: var(--measure); }
.ec footer a { color: var(--ink-soft); }
.ec .vh {
  position: absolute; width: 1px; height: 1px; overflow: hidden;
  clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap;
}

@media (prefers-reduced-motion: reduce) {
.ec, .ec *, .ec *::before, .ec *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; }
.ec .links a:hover { transform: none; }}
@media print {
.ec { background: #fff; color: #000; font-size: 11pt; }
.ec .skip, .ec .links { display: none; }
.ec main > section { padding-block: 1.2rem; break-inside: avoid; }
.ec .mod, .ec .layer, .ec .rule-box { border: 1px solid #999; break-inside: avoid; }}`

export default function EduCloud() {
  return (
    <div className="ec">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <a className="skip" href="#main">Skip to content</a>

      <header className="masthead">
        <div className="wrap">
          <p className="eyebrow">Open infrastructure for computing education</p>
          <h1>EduCloud</h1>
          <p className="standfirst">
            An open-source, self-hostable platform for teaching with code — assignment
            distribution, sandboxed autograding, an AI tutor that cannot hand out
            solutions, and model routing that keeps student data on infrastructure
            your institution controls.
          </p>

          <aside className="notice" aria-labelledby="deadline-h">
            <h2 id="deadline-h">GitHub Classroom is being retired</h2>
            <p>GitHub is transitioning Classroom to partner solutions. Two dates matter:</p>
            <ul className="dates">
              <li><span className="d">28 August 2026</span> <span className="w">Sign-in ends and the Classroom site is decommissioned.</span></li>
              <li><span className="d">4 September 2026</span> <span className="w">Final deletion of Classroom-specific data.</span></li>
            </ul>
            <p>
              Export anything you need before the second date, whatever you migrate to.
              Dates are from GitHub's own
              <a href="https://github.com/orgs/community/discussions/145312">educator FAQ</a>.
            </p>
          </aside>
        </div>
      </header>

      <main id="main">

        <section aria-labelledby="what-h">
          <div className="wrap prose">
            <p className="kicker">What it is</p>
            <h2 className="section" id="what-h">Infrastructure you own, not infrastructure you rent</h2>
            <p className="lede">
              The tools computing courses depend on are mostly rented. Student data sits
              on commercial terms, roadmaps follow someone else's market, and a product
              retirement can end a course workflow on a schedule you did not choose.
            </p>
            <p>
              EduCloud exists so institutions own that layer instead. It is five modules
              under one umbrella, and they are designed to work independently — you can
              run the classroom layer on its own and never touch the rest. Each further
              module is a deployment step, not a migration.
            </p>
            <p>
              It is community-owned and vendor-neutral by construction: the Git host is a
              plugin, the compute provider is a plugin, the model behind each routing
              alias is configuration, and the tutoring domain is a pack. No single vendor
              is a hard dependency anywhere in the stack.
            </p>
          </div>
        </section>

        <section aria-labelledby="start-h">
          <div className="wrap">
            <div className="prose">
              <p className="kicker">Where to start</p>
              <h2 className="section" id="start-h">Cairn is the Classroom analogue</h2>
              <p className="lede">
                If you are leaving GitHub Classroom, Cairn is the piece that replaces it:
                assignments distributed to per-student Git repositories, collected,
                and graded in sandboxed containers, with an instructor dashboard.
              </p>
              <p>
                Being straight about where it stands, because the calendar is short and
                you are making a real decision:
              </p>
            </div>

            <ul className="status">
              <li className="yes"><span className="mark" aria-hidden="true">✓</span>
                <p><strong>Working today.</strong> Classrooms and assignments from template
                repositories, student self-claim join, idempotent repo provisioning,
                deadline auto-locking, sandboxed container autograding with resource
                limits, CSV score export, and the instructor console.</p></li>
              <li className="yes"><span className="mark" aria-hidden="true">✓</span>
                <p><strong>Host-agnostic, end to end.</strong> GitHub, GitLab, and
                self-hosted Forgejo or Gitea all sit behind one adapter interface. A single
                deployment can serve classrooms on different hosts at once.</p></li>
              <li className="yes"><span className="mark" aria-hidden="true">✓</span>
                <p><strong>Privacy by architecture.</strong> The server stores Git
                usernames — not student names, SIS identifiers, or plaintext emails.</p></li>
              <li className="no"><span className="mark" aria-hidden="true">○</span>
                <p><strong>Not built yet: automated Classroom import.</strong> The
                one-command migration from an existing Classroom is still on the pilot
                list, not shipped. Roster import today is CSV.</p></li>
              <li className="no"><span className="mark" aria-hidden="true">○</span>
                <p><strong>Also outstanding:</strong> self-diagnostics, a hardened
                one-command deploy, completed student-facing views, and the
                end-to-end migration guide.</p></li>
            </ul>

            <div className="prose">
              <p>
                So: the classroom workflow runs, and the migration tooling does not exist
                yet. If you need a turnkey path in the next three weeks, plan on a manual
                setup with CSV rosters. The first full pilot runs a real course section in
                Fall 2026.
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="arch-h">
          <div className="wrap">
            <div className="prose">
              <p className="kicker">Architecture</p>
              <h2 className="section" id="arch-h">Five modules, adopted one at a time</h2>
              <p className="lede">
                The names come from hiking and climbing, and they are chosen to describe
                the job each one does. Nothing below requires anything else below it.
              </p>
            </div>

            <ul className="modules">
              <li className="mod primary">
                <h3>Cairn <span className="gloss">a stacked trail marker</span></h3>
                <p>The classroom layer, and the direct GitHub Classroom analogue.
                Assignments to per-student repositories, collection, sandboxed container
                autograding, instructor dashboard. Host adapters for GitHub, Forgejo and
                GitLab.</p>
                <p className="meta"><span className="tag">Go + React</span><span className="tag built">Core workflow built</span></p>
              </li>
              <li className="mod">
                <h3>Belay <span className="gloss">the rope that catches a fall</span></h3>
                <p>The peer AI tutor. A deterministic gate runs every draft through the
                domain grader and strips solutions before the student sees it, so the
                tutor cannot leak an answer even if asked well. Grades are invisible to
                it by policy.</p>
                <p className="meta"><span className="tag">Python</span><span className="tag built">Framework built</span><span className="tag part">Instructor mode pending</span></p>
              </li>
              <li className="mod">
                <h3>Waypoint <span className="gloss">a fixed point you navigate by</span></h3>
                <p>Publishing and federation — the hosting engine, institutional identity,
                and the tenant onboarding contract, plus a catalog for discovering course
                artifacts across institutions.</p>
                <p className="meta"><span className="tag">Coolify + Keycloak</span><span className="tag part">Stack proven locally</span></p>
              </li>
              <li className="mod">
                <h3>Portage <span className="gloss">carrying the boat between waters</span></h3>
                <p>Model routing. An open-weight-first ladder decides where each AI call
                runs, with deterministic verification at each step. Student-facing lanes
                are configured so that no external provider exists in them at all.</p>
                <p className="meta"><span className="tag">Python + LiteLLM</span><span className="tag built">Routing built</span></p>
              </li>
              <li className="mod">
                <h3>Outfitter <span className="gloss">who supplies the gear</span></h3>
                <p>Compute brokering. One API to place course workloads — grading jobs,
                student environments, batch runs — on campus HPC, national research
                infrastructure, or containers, always under an explicit budget ceiling.</p>
                <p className="meta"><span className="tag">Go</span><span className="tag part">Specified, not yet built</span></p>
              </li>
            </ul>
          </div>
        </section>

        <section aria-labelledby="compose-h">
          <div className="wrap">
            <div className="prose">
              <p className="kicker">How they fit</p>
              <h2 className="section" id="compose-h">Each layer is optional except the one you start with</h2>
              <p className="lede">
                Read top to bottom: people at the top, the infrastructure they never see
                at the bottom. An instructor running only Cairn stops after the second row.
              </p>
            </div>

            <figure className="dia-figure">


              <svg className="dia dia-wide" viewBox="0 0 1000 560" role="img" aria-labelledby="dw-t dw-d">
                <title id="dw-t">EduCloud architecture and its trust boundary</title>
                <desc id="dw-d">Instructors and students interact with modules running on infrastructure the institution controls. Inside that boundary sit Cairn, Belay, Outfitter, Portage and Waypoint. Cairn exchanges repositories and commits with external Git hosts; Outfitter places jobs on external compute under a budget ceiling; Portage sends prompts to open-weight model endpoints, with commercial APIs reachable only from staff lanes. Only Git usernames are stored, so nothing student-identifying crosses any of those connections. A full text description follows the diagram.</desc>
                <defs>
                  <marker id="aw" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" className="arh"/></marker>
                  <marker id="awa" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" className="arh-a"/></marker>
                </defs>


                <rect className="box-people" x="350" y="24" width="140" height="38" rx="19"/>
                <text className="nm-sm" x="420" y="48" textAnchor="middle">Instructors</text>
                <rect className="box-people" x="510" y="24" width="140" height="38" rx="19"/>
                <text className="nm-sm" x="580" y="48" textAnchor="middle">Students</text>
                <path className="ln" d="M420,62 L420,99" markerEnd="url(#aw)"/>
                <path className="ln" d="M580,62 L580,99" markerEnd="url(#aw)"/>


                <rect className="boundary" x="300" y="102" width="440" height="352" rx="12"/>
                <text className="bl" x="316" y="122">Runs on infrastructure you control</text>


                <rect className="box-core" x="320" y="140" width="190" height="92" rx="7"/>
                <text className="nm" x="336" y="166">Cairn</text>
                <text className="bl" x="336" y="182">Start here</text>
                <text className="tx" x="336" y="201">Assignments to per-student</text>
                <text className="tx" x="336" y="215">repos; sandboxed grading</text>
                <circle className="gate" cx="494" cy="156" r="9"/>
                <text className="gate-t" x="494" y="159.5" textAnchor="middle">✓</text>


                <rect className="box" x="530" y="140" width="190" height="92" rx="7"/>
                <text className="nm" x="546" y="166">Belay</text>
                <text className="rl" x="546" y="182">Optional</text>
                <text className="tx" x="546" y="201">Peer tutor; a leak gate</text>
                <text className="tx" x="546" y="215">strips solutions</text>
                <circle className="gate" cx="704" cy="156" r="9"/>
                <text className="gate-t" x="704" y="159.5" textAnchor="middle">✓</text>


                <rect className="box" x="320" y="252" width="190" height="92" rx="7"/>
                <text className="nm" x="336" y="278">Outfitter</text>
                <text className="rl" x="336" y="294">Optional</text>
                <text className="tx" x="336" y="313">Places jobs under a</text>
                <text className="tx" x="336" y="327">budget ceiling</text>
                <circle className="gate" cx="494" cy="268" r="9"/>
                <text className="gate-t" x="494" y="271.5" textAnchor="middle">✓</text>


                <rect className="box" x="530" y="252" width="190" height="92" rx="7"/>
                <text className="nm" x="546" y="278">Portage</text>
                <text className="rl" x="546" y="294">Optional</text>
                <text className="tx" x="546" y="313">Routes every AI call</text>
                <text className="tx" x="546" y="327">by policy</text>
                <circle className="gate" cx="704" cy="268" r="9"/>
                <text className="gate-t" x="704" y="271.5" textAnchor="middle">✓</text>


                <path className="ln" d="M415,232 L415,249" markerEnd="url(#aw)"/>
                <path className="ln" d="M625,232 L625,249" markerEnd="url(#aw)"/>


                <rect className="box" x="320" y="364" width="400" height="66" rx="7"/>
                <text className="nm" x="336" y="390">Waypoint</text>
                <text className="rl" x="704" y="390" textAnchor="end">Substrate</text>
                <text className="tx" x="336" y="412">Hosting and institutional sign-in for what you deploy</text>


                <rect className="box-ext" x="25" y="140" width="165" height="92" rx="7"/>
                <text className="nm-sm" x="41" y="166">Git hosts</text>
                <text className="tx-sm" x="41" y="185">GitHub · GitLab</text>
                <text className="tx-sm" x="41" y="199">Forgejo · Gitea</text>
                <text className="rl" x="41" y="220">Pluggable</text>


                <rect className="box-ext" x="25" y="252" width="165" height="92" rx="7"/>
                <text className="nm-sm" x="41" y="278">Compute</text>
                <text className="tx-sm" x="41" y="297">Campus HPC · cloud</text>
                <text className="tx-sm" x="41" y="311">Jetstream2 · containers</text>
                <text className="rl" x="41" y="332">Pluggable</text>


                <rect className="box-ext" x="830" y="230" width="155" height="60" rx="7"/>
                <text className="nm-sm" x="846" y="254">Open-weight</text>
                <text className="tx-sm" x="846" y="272">self- or sovereign-hosted</text>

                <rect className="box-ext" x="830" y="306" width="155" height="60" rx="7"/>
                <text className="nm-sm" x="846" y="330">Commercial APIs</text>
                <text className="tx-sm" x="846" y="348">staff lanes only</text>


                <path className="ln-a" d="M195,186 L315,186" markerEnd="url(#awa)" markerStart="url(#awa)"/>
                <text className="flow" x="245" y="170" textAnchor="middle">repos +</text>
                <text className="flow" x="245" y="182" textAnchor="middle">commits</text>

                <path className="ln-a" d="M315,298 L195,298" markerEnd="url(#awa)"/>
                <text className="flow" x="245" y="282" textAnchor="middle">jobs,</text>
                <text className="flow" x="245" y="294" textAnchor="middle">budget-capped</text>

                <path className="ln-a" d="M725,298 L790,298" />
                <path className="ln-a" d="M790,298 L825,260" markerEnd="url(#awa)"/>
                <path className="ln-a" d="M790,298 L825,336" markerEnd="url(#awa)"/>
                <text className="flow" x="784" y="290" textAnchor="middle">prompts</text>


                <text className="note-b" x="25" y="490">Only Git usernames are stored.</text>
                <text className="note" x="25" y="508">No student names, SIS identifiers or plaintext emails exist anywhere in the system — so nothing student-identifying crosses any arrow above.</text>
                <circle className="gate" cx="33" cy="536" r="9"/>
                <text className="gate-t" x="33" y="539.5" textAnchor="middle">✓</text>
                <text className="note" x="50" y="540">Deterministic gate — a runner decides whether something worked. A model's own report is never sufficient.</text>
              </svg>


              <svg className="dia dia-tall" viewBox="0 0 380 700" role="img" aria-labelledby="dt-t dt-d">
                <title id="dt-t">EduCloud architecture and its trust boundary</title>
                <desc id="dt-d">The same architecture stacked vertically for narrow screens. A full text description follows the diagram.</desc>
                <defs>
                  <marker id="at" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" className="arh"/></marker>
                  <marker id="ata" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" className="arh-a"/></marker>
                </defs>

                <rect className="box-people" x="8" y="10" width="110" height="32" rx="16"/>
                <text className="nm-sm" x="63" y="31" textAnchor="middle">Instructors</text>
                <rect className="box-people" x="126" y="10" width="110" height="32" rx="16"/>
                <text className="nm-sm" x="181" y="31" textAnchor="middle">Students</text>
                <path className="ln" d="M63,42 L63,68" markerEnd="url(#at)"/>
                <path className="ln" d="M181,42 L181,68" markerEnd="url(#at)"/>

                <rect className="boundary" x="8" y="71" width="228" height="512" rx="10"/>
                <text className="bl" x="20" y="90">On your infrastructure</text>

                <rect className="box-core" x="20" y="100" width="204" height="86" rx="6"/>
                <text className="nm" x="34" y="126">Cairn</text>
                <text className="bl" x="34" y="142">Start here</text>
                <text className="tx" x="34" y="161">Assignments to per-student</text>
                <text className="tx" x="34" y="175">repos; sandboxed grading</text>
                <circle className="gate" cx="208" cy="116" r="8"/><text className="gate-t" x="208" y="119.5" textAnchor="middle">✓</text>

                <rect className="box" x="20" y="198" width="204" height="86" rx="6"/>
                <text className="nm" x="34" y="224">Belay</text>
                <text className="rl" x="34" y="240">Optional</text>
                <text className="tx" x="34" y="259">Peer tutor; a leak gate</text>
                <text className="tx" x="34" y="273">strips solutions</text>
                <circle className="gate" cx="208" cy="214" r="8"/><text className="gate-t" x="208" y="217.5" textAnchor="middle">✓</text>

                <rect className="box" x="20" y="296" width="204" height="86" rx="6"/>
                <text className="nm" x="34" y="322">Portage</text>
                <text className="rl" x="34" y="338">Optional</text>
                <text className="tx" x="34" y="357">Routes every AI call by</text>
                <text className="tx" x="34" y="371">policy</text>
                <circle className="gate" cx="208" cy="312" r="8"/><text className="gate-t" x="208" y="315.5" textAnchor="middle">✓</text>

                <rect className="box" x="20" y="394" width="204" height="86" rx="6"/>
                <text className="nm" x="34" y="420">Outfitter</text>
                <text className="rl" x="34" y="436">Optional</text>
                <text className="tx" x="34" y="455">Places jobs under a</text>
                <text className="tx" x="34" y="469">budget ceiling</text>
                <circle className="gate" cx="208" cy="410" r="8"/><text className="gate-t" x="208" y="413.5" textAnchor="middle">✓</text>

                <rect className="box" x="20" y="492" width="204" height="72" rx="6"/>
                <text className="nm" x="34" y="518">Waypoint</text>
                <text className="tx" x="34" y="538">Hosting and institutional</text>
                <text className="tx" x="34" y="552">sign-in</text>

                <rect className="box-ext" x="244" y="106" width="130" height="74" rx="6"/>
                <text className="nm-sm" x="254" y="128">Git hosts</text>
                <text className="tx-sm" x="254" y="146">GitHub · GitLab</text>
                <text className="tx-sm" x="254" y="160">Forgejo · Gitea</text>

                <rect className="box-ext" x="244" y="302" width="130" height="74" rx="6"/>
                <text className="nm-sm" x="254" y="324">Models</text>
                <text className="tx-sm" x="254" y="342">open-weight first;</text>
                <text className="tx-sm" x="254" y="356">staff-only for APIs</text>

                <rect className="box-ext" x="244" y="400" width="130" height="74" rx="6"/>
                <text className="nm-sm" x="254" y="422">Compute</text>
                <text className="tx-sm" x="254" y="440">HPC · Jetstream2</text>
                <text className="tx-sm" x="254" y="454">containers</text>

                <path className="ln-a" d="M224,143 L240,143" markerEnd="url(#ata)" markerStart="url(#ata)"/>
                <path className="ln-a" d="M224,339 L240,339" markerEnd="url(#ata)"/>
                <path className="ln-a" d="M224,437 L240,437" markerEnd="url(#ata)"/>

                <text className="note-b" x="10" y="612">Only Git usernames are stored.</text>
                <text className="note" x="10" y="630">No student names, SIS identifiers or plaintext</text>
                <text className="note" x="10" y="646">emails exist anywhere in the system.</text>
                <circle className="gate" cx="18" cy="674" r="8"/><text className="gate-t" x="18" y="677.5" textAnchor="middle">✓</text>
                <text className="note" x="34" y="678">Deterministic gate — a runner decides, not a model.</text>
              </svg>

              <figcaption>
                Each module is optional except the one you start with. Adding another is
                a deployment step, not a migration of what already runs.
              </figcaption>
            </figure>

            <details className="dia-alt">
              <summary>Read the architecture as text</summary>
              <p className="vh">The platform in six layers, from the people using it down to the hosting substrate.</p>
            <div className="stack">

              <div className="layer people">
                <span className="who">Instructors &amp; students<span className="sub">the only people involved</span></span>
                <span className="what">Push code, get feedback, ask the tutor for help, see scores.</span>
              </div>
              <p className="joint" aria-hidden="true">↓</p>

              <div className="layer core">
                <span className="who">Cairn<span className="sub">start here — the classroom layer</span></span>
                <span className="what">Distributes assignments to per-student Git repos, collects them, grades in sandboxed containers, exports scores. Runs standalone. <strong>This alone replaces GitHub Classroom.</strong></span>
              </div>
              <p className="joint" aria-hidden="true">↓ &nbsp;add if you want a tutor</p>

              <div className="layer optional">
                <span className="who">Belay<span className="sub">optional</span></span>
                <span className="what">The peer tutor sits beside the coursework. Its leak gate is deterministic, so it cannot reveal a solution regardless of how it is prompted.</span>
              </div>
              <p className="joint" aria-hidden="true">↓ &nbsp;add to govern where AI runs</p>

              <div className="layer optional">
                <span className="who">Portage<span className="sub">optional</span></span>
                <span className="what">Every AI call from any module routes through here. Policy decides which infrastructure is even reachable for a given lane — student lanes contain no external providers.</span>
              </div>
              <p className="joint" aria-hidden="true">↓ &nbsp;add to control compute cost</p>

              <div className="layer optional">
                <span className="who">Outfitter<span className="sub">optional</span></span>
                <span className="what">Places grading jobs and student environments onto whatever compute you have, under a budget ceiling with per-course cost attribution.</span>
              </div>
              <p className="joint" aria-hidden="true">↓ &nbsp;the substrate underneath</p>

              <div className="layer">
                <span className="who">Waypoint<span className="sub">hosting &amp; identity</span></span>
                <span className="what">Hosts whichever modules you deploy and provides institutional sign-in. At federation scale, each site keeps its own registry.</span>
              </div>
            </div>
            </details>
          </div>
        </section>

        <section aria-labelledby="rule-h">
          <div className="wrap">
            <div className="prose">
              <p className="kicker">The design rule</p>
              <h2 className="section" id="rule-h">Nothing is trusted to grade itself</h2>
            </div>
            <div className="rule-box">
              <blockquote>No module trusts a model's — or a vendor's — report of its own success.</blockquote>
              <p className="attrib">
                Cairn's autograder, Belay's leak gate, Portage's verification step, and
                Outfitter's budget guards are the same idea applied four times: a
                deterministic runner decides whether something worked. A model saying it
                worked is never sufficient.
              </p>
            </div>
            <div className="prose">
              <p>
                This is the part that is genuinely hard to retrofit, and it is why the
                platform is built the way it is rather than as a thin wrapper over an API.
                It is also what makes claims about it checkable: efficiency and quality
                claims are measured against a preregistered benchmark rather than asserted.
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="now-h">
          <div className="wrap prose">
            <p className="kicker">Status</p>
            <h2 className="section" id="now-h">Where the project actually is</h2>
            <p>
              Cairn's core workflow and all three host adapters are built; the migration
              tooling and deploy polish are the active work. Belay's framework is complete
              with a large deterministic test baseline, and instructor mode is its
              remaining product gap. Portage's routing spine is built and running as a
              working deployment. Waypoint's stack is proven locally and awaits a
              provisioned server. Outfitter is fully specified and implementation has not
              started.
            </p>
            <p>
              A pilot course section runs in Fall 2026. Everything is Apache-2.0 with a
              Developer Certificate of Origin, documentation is CC BY, institutions
              self-host, and there are no per-seat fees.
            </p>
          </div>
        </section>

        <section aria-labelledby="involved-h">
          <div className="wrap">
            <div className="prose">
              <p className="kicker">Getting involved</p>
              <h2 className="section" id="involved-h">Three ways in</h2>
              <p>
                <strong>Instructors</strong> — pilot Cairn as your classroom layer, and
                tell me where it breaks. <strong>Institutions</strong> — flagship
                deployments and federation pilots. <strong>Contributors</strong> — the
                plugin boundaries (Git hosts, compute providers, tutoring domains) are the
                intended entry points.
              </p>
            </div>
            <ul className="links">
              <li><a href="https://github.com/EduCloud-Ecosystem">
                <span className="t">Source on GitHub</span>
                <span className="d">All modules, Apache-2.0 under a DCO</span></a></li>
              <li><a href="mailto:gchism94@gmail.com?subject=EduCloud">
                <span className="t">Get in touch</span>
                <span className="d">Piloting, collaborating, or questions</span></a></li>
            </ul>
          </div>
        </section>

      </main>

      <footer>
        <div className="wrap">
          <p>
            EduCloud is built by <a href="/">Greg Chism</a>. Text on this page is
            CC BY 4.0; the software is Apache-2.0.
          </p>
          <p>
            Module names were previously Quad (Cairn), Sol (Belay), the EduCloud
            Registry (Waypoint), and Commons (Portage); older documents may still use them.
          </p>
        </div>
      </footer>
    </div>
  )
}
