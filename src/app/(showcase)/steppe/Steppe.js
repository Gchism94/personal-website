'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const CSS = `
.hd {
  /* ── palette · Greg Chism / Central Oregon ── */
  --paper:#F5EFE6;
  --paper-2:#ECE3D4;
  --ink:#3B2F2F;
  --ink-2:#5A4F4A;
  --ink-3:#6B6560;
  --sage:#7A9E87;
  --sage-deep:#4A7C6F;
  --juniper:#22302A;
  --rust:#B5532A;
  --rust-deep:#8A4426;
  --sky:#9fd0c2;
  --line:#D9C8B0;
  --line-soft:#E7DBC7;
  --dark:#1E2A23;
  --dark-2:#243029;
  --paper-dim:rgba(243,234,223,.70);
  --sage-light:#A9C2AE;
  --rust-light:#D2814F;
  --sun:#E7CCA2;
  --ridge-far:#9fd0c2;
  --ridge-mid:#7A9E87;
  --ridge-near:#4A7C6F;
  --ridge-fore:#22302A;
  --ff-display: var(--font-playfair), 'Playfair Display', Georgia, serif;
  --ff-body: var(--font-dm-sans), 'DM Sans', system-ui, sans-serif;
  --ff-mono: var(--font-mono), 'DM Mono', ui-monospace, monospace;

  position:relative;
  background:var(--paper);
  color:var(--ink);
  font-family:var(--ff-body);
  font-size:19px;
  line-height:1.68;
  font-weight:300;
  -webkit-font-smoothing:antialiased;
  text-rendering:optimizeLegibility;
  overflow-x:hidden;
  min-height:100vh;
}
/* keep the page self-contained regardless of the site's global theme */
html body:has(.hd){background:#F5EFE6 !important;}

.hd *{box-sizing:border-box;}
.hd p{margin:0;}
.hd em,.hd i{font-style:italic;}
.hd strong{font-weight:500;color:var(--ink);}
.hd .dark strong{color:var(--paper);}

/* paper grain */
.hd-grain{
  position:fixed;inset:0;z-index:60;pointer-events:none;
  opacity:.05;mix-blend-mode:multiply;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* eyebrow / section labels */
.hd .eyebrow{
  font-family:var(--ff-mono);
  font-size:12px;font-weight:400;
  letter-spacing:.26em;text-transform:uppercase;
  color:var(--ink-2);
  display:flex;align-items:center;gap:.85em;
}
.hd .eyebrow::before{content:"";width:34px;height:1px;background:var(--rust);display:inline-block;}
.hd .dark .eyebrow{color:var(--paper-dim);}
.hd .dark .eyebrow::before{background:var(--rust-light);}

/* layout */
.hd .wrap{max-width:1120px;margin:0 auto;padding:0 28px;}
.hd section{padding:clamp(72px,10vw,128px) 0;}
.hd .col{max-width:760px;margin:0 auto;}
.hd .col-wide{max-width:880px;margin:0 auto;}

.hd h2{
  font-family:var(--ff-display);
  font-weight:700;
  font-size:clamp(2rem,4.6vw,3.2rem);
  line-height:1.06;
  letter-spacing:-.012em;
  margin:.55em 0 .7em;
}
.hd .lede{
  font-size:clamp(1.18rem,2.1vw,1.42rem);
  line-height:1.5;
  color:var(--ink-2);
  font-weight:300;
}
.hd p + p{margin-top:1.05em;}
.hd .body p{color:var(--ink-2);}
.hd .dark .body p{color:var(--paper-dim);}

/* ── top bar ── */
.hd .top{
  border-bottom:1px solid var(--line);
  background:rgba(245,239,230,.72);
  backdrop-filter:saturate(120%) blur(4px);
  position:relative;z-index:5;
}
.hd .topbar{
  display:flex;justify-content:space-between;align-items:center;gap:1.2em;
  padding:16px 28px;max-width:1120px;margin:0 auto;
}
.hd .top-left{display:flex;align-items:center;gap:18px;}
.hd .back{
  font-family:var(--ff-mono);
  font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--ink-3);
  text-decoration:none;border-bottom:1px solid transparent;transition:color .2s,border-color .2s;
  white-space:nowrap;
}
.hd .back:hover{color:var(--sage-deep);border-color:var(--sage-deep);}
.hd .brand{
  font-family:var(--ff-mono);
  font-weight:400;font-size:13px;letter-spacing:.24em;text-transform:uppercase;
  color:var(--ink);
}
.hd .brand span{color:var(--rust);}
.hd .top-right{
  font-family:var(--ff-mono);
  font-size:11.5px;letter-spacing:.2em;text-transform:uppercase;color:var(--ink-3);
}

/* ── hero ── */
.hd .hero{
  position:relative;
  min-height:90vh;
  display:flex;flex-direction:column;justify-content:flex-start;
  background:linear-gradient(180deg,#F5EFE6 0%,#E6EBE3 34%,#D7DFD9 55%,#E9DABE 100%);
  overflow:hidden;
  isolation:isolate;
}
.hd .hero-inner{
  max-width:1120px;width:100%;margin:0 auto;padding:clamp(48px,8vw,96px) 28px 0;
  position:relative;z-index:3;
}
.hd .hero .eyebrow{margin-bottom:26px;}
.hd .wordmark{
  font-family:var(--ff-display);
  font-weight:700;
  font-size:clamp(3.6rem,15vw,11rem);
  line-height:.9;
  letter-spacing:-.022em;
  color:var(--ink);
  margin:0;
}
.hd .tagline{
  font-family:var(--ff-display);
  font-style:italic;font-weight:400;
  font-size:clamp(1.25rem,2.7vw,1.85rem);
  color:var(--sage-deep);
  margin-top:.55em;max-width:24ch;
}
.hd .towns{
  margin-top:34px;
  font-family:var(--ff-mono);
  font-size:12px;letter-spacing:.22em;text-transform:uppercase;color:var(--ink-2);
  display:flex;flex-wrap:wrap;gap:.55em 1.1em;align-items:center;
}
.hd .towns .dot{color:var(--rust);}

.hd .landscape{
  position:absolute;left:0;right:0;bottom:-1px;width:100%;height:46%;
  z-index:1;display:block;
}

/* hero load animation */
.hd .fx{opacity:0;transform:translateY(20px);}
.hd .hero.loaded .fx{animation:hd-rise .9s cubic-bezier(.2,.7,.2,1) forwards;}
.hd .hero.loaded .fx:nth-child(1){animation-delay:.05s;}
.hd .hero.loaded .fx:nth-child(2){animation-delay:.18s;}
.hd .hero.loaded .fx:nth-child(3){animation-delay:.32s;}
.hd .hero.loaded .fx:nth-child(4){animation-delay:.46s;}
@keyframes hd-rise{to{opacity:1;transform:translateY(0);}}

/* quick facts grid */
.hd .facts{
  display:grid;grid-template-columns:repeat(2,1fr);
  gap:1px;background:var(--line-soft);
  border:1px solid var(--line-soft);
  margin-top:2.4em;
}
.hd .fact{background:var(--paper);padding:24px 26px;}
.hd .fact .k{
  font-family:var(--ff-mono);font-size:11px;font-weight:400;
  letter-spacing:.2em;text-transform:uppercase;color:var(--rust-deep);
  display:block;margin-bottom:9px;
}
.hd .fact .v{font-size:1.05rem;line-height:1.4;color:var(--ink);font-weight:300;}

/* dark philosophy section */
.hd .dark{background:var(--dark);color:var(--paper);}
.hd .dark h2{color:var(--paper);}
.hd .dark .lede{color:var(--paper-dim);}

.hd .ideas{margin-top:3.2em;}
.hd .idea{
  padding:2.2em 0;
  border-top:1px solid rgba(243,234,223,.13);
}
.hd .idea:last-child{border-bottom:1px solid rgba(243,234,223,.13);}
.hd .idea-head{display:flex;align-items:baseline;gap:.7em;flex-wrap:wrap;}
.hd .idx{
  font-family:var(--ff-display);font-weight:700;font-style:italic;
  font-size:1.5rem;color:var(--rust-light);line-height:1;
  transition:color .3s ease;
}
.hd .idea-name{
  font-family:var(--ff-display);font-weight:700;
  font-size:clamp(1.45rem,3vw,1.95rem);line-height:1.1;color:var(--paper);
  letter-spacing:-.01em;
}
.hd .idea-tag{
  font-family:var(--ff-mono);font-size:11px;letter-spacing:.2em;
  text-transform:uppercase;color:var(--sage-light);
  border:1px solid rgba(169,194,174,.4);border-radius:100px;
  padding:4px 11px;margin-left:auto;align-self:center;white-space:nowrap;
}
.hd .idea p{color:var(--paper-dim);margin-top:1em;max-width:62ch;}
.hd .consequence{
  margin-top:1.2em;padding-left:1.1em;border-left:2px solid var(--rust-light);
  color:var(--paper);
}
.hd .consequence .lbl{
  font-family:var(--ff-mono);font-size:10.5px;letter-spacing:.22em;
  text-transform:uppercase;color:var(--rust-light);display:block;margin-bottom:.4em;
}
.hd .consequence p{color:var(--paper);margin-top:0;font-weight:300;}
.hd .idea:hover .idx{color:var(--sage-light);}

/* support / community section */
.hd .pillars{margin-top:2.8em;display:grid;gap:0;}
.hd .pillar{
  display:grid;grid-template-columns:auto 1fr;gap:1.4em;
  padding:1.7em 0;border-top:1px solid var(--line);
}
.hd .pillar:last-child{border-bottom:1px solid var(--line);}
.hd .pillar .mark{
  font-family:var(--ff-display);font-style:italic;font-weight:700;font-size:1.35rem;
  color:var(--rust);line-height:1.1;padding-top:.05em;min-width:1.4em;
}
.hd .pillar h3{
  font-family:var(--ff-display);font-weight:700;font-size:1.3rem;line-height:1.2;
  color:var(--ink);margin-bottom:.35em;letter-spacing:-.005em;
}
.hd .pillar p{color:var(--ink-2);font-size:1.04rem;line-height:1.55;}

.hd .note-warmsprings{
  margin-top:2.6em;padding:1.7em 1.9em;
  background:var(--paper-2);border:1px solid var(--line);
  border-left:3px solid var(--sage);
}
.hd .note-warmsprings .lbl{
  font-family:var(--ff-mono);font-size:11px;letter-spacing:.2em;
  text-transform:uppercase;color:var(--sage-deep);display:block;margin-bottom:.6em;
}
.hd .note-warmsprings p{color:var(--ink-2);font-size:1.02rem;}

/* commitments */
.hd .commitments{margin-top:2.8em;border-top:1px solid var(--line);}
.hd .commit{
  display:grid;grid-template-columns:200px 1fr;gap:1.6em;
  padding:1.25em 0;border-bottom:1px solid var(--line-soft);align-items:baseline;
}
.hd .commit .term{
  font-family:var(--ff-mono);font-size:12px;font-weight:400;
  letter-spacing:.13em;text-transform:uppercase;color:var(--rust-deep);
}
.hd .commit .desc{color:var(--ink-2);font-size:1.05rem;line-height:1.5;}
.hd .commit .desc strong{color:var(--ink);font-weight:500;}

/* timeline */
.hd .timeline{margin-top:2.8em;position:relative;padding-left:30px;}
.hd .timeline::before{content:"";position:absolute;left:5px;top:8px;bottom:8px;width:1px;background:var(--line);}
.hd .tl{position:relative;padding:0 0 2em 0;}
.hd .tl:last-child{padding-bottom:0;}
.hd .tl::before{
  content:"";position:absolute;left:-29px;top:7px;width:11px;height:11px;border-radius:50%;
  background:var(--paper);border:2px solid var(--sage);
}
.hd .tl.now::before{background:var(--rust);border-color:var(--rust);}
.hd .tl .when{
  font-family:var(--ff-mono);font-size:11.5px;letter-spacing:.18em;
  text-transform:uppercase;color:var(--rust-deep);display:block;margin-bottom:.25em;
}
.hd .tl .what{font-size:1.08rem;color:var(--ink);line-height:1.45;}
.hd .tl .what span{color:var(--ink-3);}

/* pullquote */
.hd .pull{
  text-align:center;padding:clamp(56px,9vw,104px) 0;
}
.hd .pull blockquote{
  font-family:var(--ff-display);font-weight:400;font-style:italic;
  font-size:clamp(1.7rem,4.2vw,2.7rem);line-height:1.22;letter-spacing:-.012em;
  color:var(--ink);max-width:18ch;margin:0 auto;
}
.hd .pull .src{
  margin-top:1.4em;font-family:var(--ff-mono);font-size:11px;
  letter-spacing:.24em;text-transform:uppercase;color:var(--ink-3);
}

/* footer */
.hd footer{
  background:var(--juniper);color:var(--paper);
  padding:clamp(64px,9vw,112px) 0 56px;
}
.hd footer .eyebrow{color:var(--paper-dim);}
.hd footer .eyebrow::before{background:var(--rust-light);}
.hd footer h2{color:var(--paper);}
.hd .closing p{color:var(--paper-dim);max-width:60ch;font-size:1.12rem;}
.hd .signoff{
  margin-top:3em;padding-top:1.7em;border-top:1px solid rgba(243,234,223,.16);
  display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:1.2em;
}
.hd .signoff .who{font-family:var(--ff-display);font-size:1.25rem;color:var(--paper);}
.hd .signoff .who small{display:block;font-family:var(--ff-mono);font-size:11px;
  letter-spacing:.16em;text-transform:uppercase;color:var(--paper-dim);margin-top:.5em;font-weight:400;}
.hd .signoff .place{font-family:var(--ff-mono);font-size:11px;letter-spacing:.2em;
  text-transform:uppercase;color:var(--paper-dim);text-align:right;}

/* scroll reveal */
.hd .reveal{opacity:0;transform:translateY(22px);transition:opacity .8s ease,transform .8s cubic-bezier(.2,.7,.2,1);}
.hd .reveal.in{opacity:1;transform:none;}

@media (max-width:640px){
  .hd{font-size:18px;}
  .hd .facts{grid-template-columns:1fr;}
  .hd .commit{grid-template-columns:1fr;gap:.4em;}
  .hd .commit .term{color:var(--rust);}
  .hd .idea-tag{margin-left:0;}
  .hd .pillar{grid-template-columns:1fr;gap:.5em;}
  .hd .pillar .mark{display:none;}
  .hd .topbar .top-right{display:none;}
}

@media (prefers-reduced-motion:reduce){
  .hd *{animation:none!important;transition:none!important;}
  .hd .fx,.hd .reveal{opacity:1!important;transform:none!important;}
}
`

export default function Steppe() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // hero load-in
    const raf = requestAnimationFrame(() => setLoaded(true))

    // scroll reveal
    const els = document.querySelectorAll('.hd .reveal')
    if (!('IntersectionObserver' in window)) {
      els.forEach((e) => e.classList.add('in'))
      return () => cancelAnimationFrame(raf)
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('in')
            io.unobserve(en.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )
    els.forEach((e) => io.observe(e))
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
    }
  }, [])

  return (
    <div className="hd">
      <style suppressHydrationWarning>{CSS}</style>
      <div className="hd-grain" aria-hidden="true" />

      <header className="top">
        <div className="topbar">
          <div className="top-left">
            <Link href="/work" className="back">← Work</Link>
            <div className="brand">Steppe</div>
          </div>
          <div className="top-right">An Overview · Central Oregon</div>
        </div>
      </header>

      {/* HERO */}
      <div className={`hero${loaded ? ' loaded' : ''}`}>
        <div className="hero-inner">
          <div className="eyebrow fx">Member-owned · Central Oregon</div>
          <h1 className="wordmark fx">Steppe</h1>
          <p className="tagline fx">A place that belongs to the people in it.</p>
          <div className="towns fx">
            The Commons, Redmond <span className="dot">/</span> Central Oregon <span className="dot">/</span> est. 2026
          </div>
        </div>
        <svg className="landscape" viewBox="0 0 1440 460" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
          <circle cx="1086" cy="248" r="56" fill="var(--sun)" opacity="0.85" />
          <path fill="var(--ridge-far)" d="M0,300 L120,252 L210,286 L300,212 L362,252 L470,152 L560,250 L660,206 L760,270 L880,236 L980,276 L1120,242 L1240,286 L1340,256 L1440,290 L1440,460 L0,460 Z" />
          <path fill="var(--ridge-mid)" d="M0,342 C180,302 320,360 520,332 C720,304 860,360 1040,336 C1200,314 1320,350 1440,332 L1440,460 L0,460 Z" />
          <path fill="var(--ridge-near)" d="M0,382 C200,356 360,396 600,376 C820,358 980,400 1180,382 C1300,370 1380,388 1440,380 L1440,460 L0,460 Z" />
          <path fill="var(--ridge-fore)" d="M0,420 C240,406 420,432 680,418 C900,406 1080,436 1280,420 C1360,414 1410,424 1440,420 L1440,460 L0,460 Z" />
          <g fill="var(--ridge-fore)" opacity="0.92">
            <ellipse cx="220" cy="426" rx="9" ry="13" /><ellipse cx="238" cy="428" rx="7" ry="10" />
            <ellipse cx="1015" cy="430" rx="10" ry="14" /><ellipse cx="1032" cy="432" rx="7" ry="10" />
            <ellipse cx="640" cy="436" rx="8" ry="11" />
          </g>
        </svg>
      </div>

      {/* 01 PREMISE */}
      <section>
        <div className="wrap">
          <div className="col body">
            <div className="eyebrow reveal">01 — The premise</div>
            <h2 className="reveal">A town deserves a gathering place that belongs to the town.</h2>
            <p className="reveal">The platforms most of us use every day were never built for us. They were built to gather our attention and sell it, and so they follow a familiar arc — more ads, more noise, more outrage, and steadily less of the people we actually came to find. Cory Doctorow has a name for that slow rot. Steppe begins by refusing it.</p>
            <p className="reveal">The question underneath the whole project is simple. What if the place where Central Oregon gathers online were owned by Central Oregon — not by shareholders, not by advertisers, but by the neighbors who use it every day?</p>
          </div>
        </div>
      </section>

      {/* 02 WHAT IT IS */}
      <section style={{ background: 'var(--paper-2)' }}>
        <div className="wrap">
          <div className="col body">
            <div className="eyebrow reveal">02 — What it is</div>
            <h2 className="reveal">Local civic infrastructure, owned in common.</h2>
            <p className="reveal">Steppe is a members&apos; commons for Central Oregon — built as shared community infrastructure rather than a product. It is small on purpose, honest by design, and accountable to its members instead of to a market.</p>
            <div className="facts reveal">
              <div className="fact"><span className="k">Who owns it</span><span className="v">Members do, collectively — one member, one vote on how it runs.</span></div>
              <div className="fact"><span className="k">Who&apos;s here</span><span className="v">Verified neighbors — you confirm you live here once, then the proof is deleted.</span></div>
              <div className="fact"><span className="k">How it&apos;s funded</span><span className="v">No ads, ever. $4 / month, with a hardship waiver for anyone who needs it.</span></div>
              <div className="fact"><span className="k">What it is</span><span className="v">A member-governed Oregon public benefit nonprofit. No owner; it can&apos;t be sold.</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* 03 THE IDEAS (DARK) */}
      <section className="dark">
        <div className="wrap">
          <div className="col-wide">
            <div className="eyebrow reveal">03 — The ideas underneath</div>
            <h2 className="reveal">It isn&apos;t a startup hunting a market. It&apos;s an argument.</h2>
            <p className="lede reveal">Steppe is built from a small shelf of books — a belief that a healthier digital commons is genuinely possible, if you design for it from the very first decision. Five ideas do most of the work.</p>

            <div className="ideas">
              <div className="idea reveal">
                <div className="idea-head">
                  <span className="idx">i.</span>
                  <span className="idea-name">Cory Doctorow</span>
                  <span className="idea-tag">Platform decay</span>
                </div>
                <p>Platforms rot when their incentive is to extract — first they&apos;re good to users, then they squeeze users to please advertisers, then they squeeze everyone to please themselves. The decline isn&apos;t a failure of the model; it <em>is</em> the model.</p>
                <div className="consequence">
                  <span className="lbl">In Steppe</span>
                  <p>No advertising, ever — it&apos;s entrenched in the charter and can&apos;t be removed. Members set the budget, so the place answers to them, not to advertisers. Remove the incentive to get worse, and it&apos;s free to stay good.</p>
                </div>
              </div>

              <div className="idea reveal">
                <div className="idea-head">
                  <span className="idx">ii.</span>
                  <span className="idea-name">Donella Meadows</span>
                  <span className="idea-tag">Systems thinking</span>
                </div>
                <p>You cannot improve a system you don&apos;t understand. Real change comes from finding a system&apos;s leverage points — not from chasing its symptoms or imposing a plan from outside.</p>
                <div className="consequence">
                  <span className="lbl">In Steppe</span>
                  <p>Before a single feature ships, we study the community as it actually is — who lives here, what&apos;s under strain (housing, water, wildfire), how people already find one another. We listen before we build.</p>
                </div>
              </div>

              <div className="idea reveal">
                <div className="idea-head">
                  <span className="idx">iii.</span>
                  <span className="idea-name">Elinor Ostrom</span>
                  <span className="idea-tag">The commons</span>
                </div>
                <p>Ostrom won a Nobel Prize for showing what economists had assumed impossible: ordinary communities can steward a shared resource well, for generations, without a corporation or a government in charge — provided a handful of design principles are in place.</p>
                <div className="consequence">
                  <span className="lbl">In Steppe</span>
                  <p>Genuine self-governance. One member, one vote — members set the budget, elect the board, and can recall it. Consequences are graduated and fair, always with a path back. The whole design is being audited against her eight principles, one by one.</p>
                </div>
              </div>

              <div className="idea reveal">
                <div className="idea-head">
                  <span className="idx">iv.</span>
                  <span className="idea-name">Albert O. Hirschman</span>
                  <span className="idea-tag">Voice &amp; exit</span>
                </div>
                <p>When something you belong to begins to slip, you have two options: leave it, or speak up to mend it. Most platforms only ever let you leave. The capacity to stay and improve a thing has to be built deliberately.</p>
                <div className="consequence">
                  <span className="lbl">In Steppe</span>
                  <p>Voice is designed in from the start, so members shape the place rather than abandon it. Because they own it, staying and improving becomes the rational choice — not just the loyal one.</p>
                </div>
              </div>

              <div className="idea reveal">
                <div className="idea-head">
                  <span className="idx">v.</span>
                  <span className="idea-name">Mehrsa Baradaran</span>
                  <span className="idea-tag">Structure is destiny</span>
                </div>
                <p>Who owns a thing — and how it is financed — quietly decides who it will ultimately serve. Values stated in a mission statement rarely survive an ownership structure that points the other way.</p>
                <div className="consequence">
                  <span className="lbl">In Steppe</span>
                  <p>Ownership and economics are settled on day one: a member-governed nonprofit that can&apos;t be sold, no founder with the last word, and your data yours to take and leave with. The structure isn&apos;t paperwork — it&apos;s the promise.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PULLQUOTE */}
      <div className="pull wrap">
        <blockquote className="reveal">Connection with roots, on infrastructure the community holds.</blockquote>
        <div className="src reveal">The whole idea, in one line</div>
      </div>

      {/* 04 SUPPORT ONE ANOTHER */}
      <section style={{ background: 'var(--paper-2)' }}>
        <div className="wrap">
          <div className="col body">
            <div className="eyebrow reveal">04 — A community that supports one another</div>
            <h2 className="reveal">Built so people can actually show up for each other.</h2>
            <p className="reveal">A platform can corrode a community or it can knit one together. The difference is almost entirely in the design choices. Steppe is shaped, end to end, around mutual support.</p>

            <div className="pillars">
              <div className="pillar reveal">
                <div className="mark">—</div>
                <div>
                  <h3>Neighbors, not strangers</h3>
                  <p>Residency verification means the people you meet here genuinely share your place. A favor asked, a tool borrowed, a recommendation given — it all has roots, because it&apos;s all local.</p>
                </div>
              </div>
              <div className="pillar reveal">
                <div className="mark">—</div>
                <div>
                  <h3>No algorithm deciding for you</h3>
                  <p>The feed is chronological and honest. You follow what you choose; nothing is engineered to enrage you, addict you, or keep you scrolling past the point of usefulness. Your attention is yours.</p>
                </div>
              </div>
              <div className="pillar reveal">
                <div className="mark">—</div>
                <div>
                  <h3>Everyone gets a real seat</h3>
                  <p>Every genuine community event is welcome, across the political and religious spectrum — the test is whether something serves the community, never whether we happen to agree with it. And the founding group is built to actually resemble Central Oregon, not just its newest arrivals.</p>
                </div>
              </div>
              <div className="pillar reveal">
                <div className="mark">—</div>
                <div>
                  <h3>What it earns, it gives back</h3>
                  <p>Member dues pay for Steppe, so it answers to members, not advertisers. Anything beyond running it goes back to the community that owns it — never an end in itself.</p>
                </div>
              </div>
            </div>

            <div className="note-warmsprings reveal">
              <span className="lbl">On the long horizon</span>
              <p>Further out, we hope to build a peer partnership with the Confederated Tribes of Warm Springs — beginning with questions rather than plans, and grounded firmly in tribal sovereignty and genuine co-ownership. It is an aspiration to earn slowly and on their terms, not a feature to announce.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 05 COMMITMENTS */}
      <section>
        <div className="wrap">
          <div className="col body">
            <div className="eyebrow reveal">05 — Commitments, in writing</div>
            <h2 className="reveal">The philosophy, made concrete and binding.</h2>
            <p className="reveal">Principles are easy to state and easy to abandon. These are the decisions that are already locked — the ones that turn the ideas above into promises a member can hold us to.</p>

            <div className="commitments reveal">
              <div className="commit"><span className="term">No ads</span><span className="desc"><strong>Ever.</strong> It&apos;s entrenched in the charter and can&apos;t be removed.</span></div>
              <div className="commit"><span className="term">$4 / month</span><span className="desc">With a hardship waiver, no questions asked. Members set the budget.</span></div>
              <div className="commit"><span className="term">One member, one vote</span><span className="desc">Members set the budget, elect the board, and can recall it. Ballots are secret.</span></div>
              <div className="commit"><span className="term">Verify, then forget</span><span className="desc">You prove you live here once; the proof is deleted. Membership stays local and private.</span></div>
              <div className="commit"><span className="term">Your data is yours</span><span className="desc">Take everything you&apos;ve added and leave whenever you want. Never sold.</span></div>
              <div className="commit"><span className="term">Fair consequences</span><span className="desc">Automated moderation with volunteer human review; a three-month maximum ban, and a right to appeal.</span></div>
              <div className="commit"><span className="term">A nonprofit by structure</span><span className="desc">A member-governed Oregon public benefit nonprofit. No owner; it can&apos;t be sold.</span></div>
              <div className="commit"><span className="term">Led, not owned</span><span className="desc">Founder pay is public and set <strong>below</strong> an academic salary. No founder gets the last word.</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* 06 TIMELINE */}
      <section style={{ background: 'var(--paper-2)' }}>
        <div className="wrap">
          <div className="col body">
            <div className="eyebrow reveal">06 — Where it&apos;s going</div>
            <h2 className="reveal">Slowly, in the open, and never bigger than it should be.</h2>
            <div className="timeline reveal">
              <div className="tl now">
                <span className="when">Now</span>
                <div className="what">Founding members. <span>Steppe runs once enough neighbors in Redmond join to sustain it — be counted.</span></div>
              </div>
              <div className="tl">
                <span className="when">2026</span>
                <div className="what">The Commons opens. <span>Verified members start groups, post to the local exchange, and set the budget.</span></div>
              </div>
              <div className="tl">
                <span className="when">Next</span>
                <div className="what">Across Central Oregon. <span>New neighborhoods join as members are ready — by petition, never by growth targets.</span></div>
              </div>
              <div className="tl">
                <span className="when">Always</span>
                <div className="what">Member-governed. <span>The charter&apos;s promises stay entrenched; the rest, members decide together.</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER / CLOSE */}
      <footer>
        <div className="wrap">
          <div className="col closing">
            <div className="eyebrow reveal">In closing</div>
            <h2 className="reveal">None of this works alone.</h2>
            <p className="reveal">The web that holds a community together is woven by a lot of hands — the people highlighting local businesses, the ones organizing the markets and the meet-ups, the ones who simply keep showing up. Steppe is one thread among many. We would far rather build it alongside the others than apart from them.</p>
            <div className="signoff reveal">
              <div className="who">Greg Chism, Ph.D.
                <small>Leads Steppe · Asst. Professor of Practice, University of Arizona</small>
              </div>
              <div className="place">Steppe<br />Redmond, Central Oregon</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
