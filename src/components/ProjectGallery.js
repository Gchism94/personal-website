import Image from 'next/image'
import Link from 'next/link'
import { projects } from '@/data/projects'

function EduCloudDiagram() {
  const modules = [
    { name: 'Waypoint', role: 'Hosting & identity', x: 280, y: 55 },
    { name: 'Cairn', role: 'Classroom', x: 455, y: 148 },
    { name: 'Belay', role: 'Peer tutoring', x: 388, y: 290 },
    { name: 'Portage', role: 'Model routing', x: 172, y: 290 },
    { name: 'Outfitter', role: 'Compute', x: 105, y: 148 },
  ]
  return (
    <svg className="ecosystem-diagram" viewBox="0 0 560 360" fill="none">
      <circle cx="280" cy="180" r="128" stroke="#4A7C6F" strokeOpacity=".35" />
      {modules.map(({ name, role, x, y }) => <g key={name}>
        <path d={`M280 180 L${x} ${y}`} stroke="#3B2F2F" strokeOpacity=".4" strokeDasharray="3 5" />
        <rect x={x - 66} y={y - 26} width="132" height="52" rx="2" fill="#F5EFE6" stroke="#4A7C6F" strokeOpacity=".45" />
        <text x={x} y={y - 2} textAnchor="middle" fill="#3B2F2F" fontSize="16">{name}</text>
        <text x={x} y={y + 15} textAnchor="middle" fill="#6B6560" fontSize="9">{role}</text>
      </g>)}
      <circle cx="280" cy="180" r="63" fill="#4A7C6F" />
      <text x="280" y="185" fill="#F5EFE6" textAnchor="middle" fontSize="25">EduCloud</text>
    </svg>
  )
}

// The three access paths documented at https://idss-mesa.github.io/docs/.
// This is a conceptual illustration, not a reproduction of the portal UI.
function MesaDiagram() {
  return (
    <svg className="mesa-diagram" viewBox="0 0 560 360" fill="none">
      <text x="280" y="53" textAnchor="middle" fill="#3B2F2F" fontSize="38" fontWeight="400" letterSpacing="3">MESA</text>
      <text x="280" y="79" textAnchor="middle" fill="#6B6560" fontSize="10" letterSpacing="1.2">PATHWAYS INTO RESEARCH COMPUTING</text>
      <path d="M100 208 V239 H460 V208 M280 208 V263" stroke="#4A7C6F" strokeWidth="1.5" />
      {[{ x: 100, title: 'Portal', sub: 'Data & analyses' }, { x: 280, title: 'Research apps', sub: 'Notebooks & tools' }, { x: 460, title: 'AI agents', sub: 'Connected workflows' }].map(({ x, title, sub }) => <g key={title}>
        <rect x={x - 73} y="111" width="146" height="97" rx="3" fill="#F5EFE6" stroke="#4A7C6F" strokeOpacity=".5" />
        <text x={x} y="175" textAnchor="middle" fill="#3B2F2F" fontSize="15">{title}</text>
        <text x={x} y="192" textAnchor="middle" fill="#6B6560" fontSize="10">{sub}</text>
      </g>)}
      <g stroke="#4A7C6F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M85 131h11l4 5h16v17H85Z" />
        <rect x="264" y="128" width="32" height="25" rx="2" /><path d="m271 136 4 4-4 4m9 0h8" />
        <path d="M446 134 460 143 473 132M460 143l1 12" />
        <circle cx="446" cy="132" r="4" /><circle cx="475" cy="130" r="4" /><circle cx="461" cy="156" r="4" /><circle cx="460" cy="143" r="3" />
      </g>
      <rect x="115" y="263" width="330" height="60" rx="3" fill="#4A7C6F" />
      <text x="280" y="289" textAnchor="middle" fill="#F5EFE6" fontSize="20">CyVerse</text>
      <text x="280" y="309" textAnchor="middle" fill="#F5EFE6" fontSize="11" letterSpacing=".8">SHARED DATA + COMPUTING</text>
    </svg>
  )
}

export function ProjectArt({ kind, priority = false }) {
  return (
    <div className={`project-art project-art--${kind}`} aria-hidden="true">
      {kind === 'midniht' && <div className="midniht-brand"><Image src="/images/brands/midniht-mark.svg" alt="" width={240} height={240} priority={priority} /><span>Midniht</span><small>A library of your own.</small></div>}
      {kind === 'educloud' && <EduCloudDiagram />}
      {kind === 'talks' && <div className="talk-art"><small>A SPACE TO EXPLORE</small><span>What<br />if<span className="talk-question">?</span></span><div>Think together. Build together.</div></div>}
      {kind === 'mesa' && <MesaDiagram />}
    </div>
  )
}

export default function ProjectGallery({ full = false }) {
  return (
    <div className="project-gallery">
      {projects.map((project, index) => (
        <article className="project-feature" key={project.id} id={full ? project.id : undefined}>
          <Link href={project.href} className="project-art-link" aria-label={project.linkLabel}
            {...(project.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
            <ProjectArt kind={project.visual} priority={full && index === 0} />
            <span className="project-open" aria-hidden="true">↗</span>
          </Link>
          <div className="project-caption"><span>{String(index + 1).padStart(2, '0')} / {project.category}</span><span>{project.status}</span></div>
          <h3><Link href={project.href} {...(project.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{project.title}<span aria-hidden="true"> ↗</span></Link></h3>
          <p className="project-headline">{project.headline}</p>
          <p className="project-description">{project.description}</p>
          {full && <p className="project-description project-detail">{project.detail}</p>}
        </article>
      ))}
    </div>
  )
}
