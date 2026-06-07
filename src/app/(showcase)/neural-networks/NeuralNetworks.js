'use client'

import Link from 'next/link'

const CSS = `
.nn {
  position:fixed; inset:0;
  display:flex; flex-direction:column;
  background:#02040a;
  font-family:var(--font-mono),'DM Mono',ui-monospace,monospace;
  -webkit-font-smoothing:antialiased;
}
html body:has(.nn){ overflow:hidden; background:#02040a !important; }
.nn *{ box-sizing:border-box; margin:0; padding:0; }
.nn .topbar {
  flex-shrink:0;
  display:flex; align-items:center; gap:14px;
  padding:13px 22px;
  background:#02040a;
  border-bottom:1px solid #222838;
}
.nn .back-link {
  font-size:11px; letter-spacing:.16em; text-transform:uppercase;
  color:#a7a294; text-decoration:none;
  border-bottom:1px solid transparent;
  transition:color .2s, border-color .2s;
  white-space:nowrap;
}
.nn .back-link:hover { color:#9fd0c2; border-color:#9fd0c2; }
.nn .sep { width:1px; height:16px; background:#222838; flex-shrink:0; }
.nn .label { font-size:11px; letter-spacing:.12em; text-transform:uppercase; color:#74715f; }
.nn iframe { flex:1; border:0; background:#fff; display:block; width:100%; }
`

export default function NeuralNetworks() {
  return (
    <div className="nn">
      <style suppressHydrationWarning>{CSS}</style>
      <header className="topbar">
        <Link href="/research" className="back-link">&#8592; Research</Link>
        <div className="sep" aria-hidden="true" />
        <span className="label">INFO 557 · Neural Networks · Visualization</span>
      </header>
      <iframe
        src="https://gchism94.github.io/uofa-neural-networks/"
        title="INFO 557 Neural Networks Interactive Visualization"
        allow="fullscreen"
      />
    </div>
  )
}
