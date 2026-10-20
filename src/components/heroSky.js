import { CONSTELLATIONS } from '@/data/constellations'

// Repeatable background stars surround catalogued constellation figures.
let seed = 0xC0DE5EED
function random() {
  let t = seed += 0x6D2B79F5
  t = Math.imul(t ^ t >>> 15, t | 1)
  t ^= t + Math.imul(t ^ t >>> 7, t | 61)
  return ((t ^ t >>> 14) >>> 0) / 4294967296
}
const COLORS = ['#d7e8ff', '#fff8dc', '#ffe49e', '#ffc06c', '#ff9458']
export const STARS = Array.from({ length: 720 }, (_, i) => ({
  x: random() * 1440,
  y: random() * 900,
  radius: i < 42 ? 1.1 + random() * .7 : .2 + random() * .65,
  opacity: .2 + random() * .55,
  color: COLORS[Math.floor(random() * COLORS.length)],
  duration: 3 + random() * 6,
  delay: -random() * 12,
}))

// A local tangent-plane projection preserves each constellation's shape.
// The separate figures are then fitted into the editorial composition.
const radians = degrees => degrees * Math.PI / 180
export const SKY_FIGURES = CONSTELLATIONS.map(figure => {
  const ra0 = radians(figure.stars.reduce((sum, star) => sum + star.ra, 0) / figure.stars.length)
  const dec0 = radians(figure.stars.reduce((sum, star) => sum + star.dec, 0) / figure.stars.length)
  const projected = figure.stars.map(star => {
    const ra = radians(star.ra), dec = radians(star.dec), delta = ra - ra0
    const denominator = Math.sin(dec0) * Math.sin(dec) + Math.cos(dec0) * Math.cos(dec) * Math.cos(delta)
    return { ...star,
      x: -Math.cos(dec) * Math.sin(delta) / denominator,
      y: -(Math.cos(dec0) * Math.sin(dec) - Math.sin(dec0) * Math.cos(dec) * Math.cos(delta)) / denominator,
    }
  })
  const minX = Math.min(...projected.map(star => star.x)), maxX = Math.max(...projected.map(star => star.x))
  const minY = Math.min(...projected.map(star => star.y)), maxY = Math.max(...projected.map(star => star.y))
  const [left, top, width, height] = figure.box
  const scale = Math.min(width / (maxX - minX), height / (maxY - minY))
  const stars = projected.map(star => ({ ...star,
    x: left + width / 2 + (star.x - (minX + maxX) / 2) * scale,
    y: top + height / 2 + (star.y - (minY + maxY) / 2) * scale,
    radius: Math.max(1.5, 3.2 - star.magnitude * .35),
  }))
  return { ...figure, stars }
})

export function drawSkyGeometry(ctx) {
  ctx.fillStyle = '#040815'
  ctx.fillRect(0, 0, 1440, 900)
  ctx.strokeStyle = 'rgba(159,208,194,.18)'
  ctx.lineWidth = .7
  for (let radius = 150; radius < 1200; radius += 105) {
    ctx.beginPath(); ctx.ellipse(960, 330, radius, radius * .62, -.25, 0, Math.PI * 2); ctx.stroke()
  }
  STARS.forEach(star => {
    ctx.fillStyle = star.color; ctx.globalAlpha = star.opacity
    ctx.beginPath(); ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2); ctx.fill()
  })
  ctx.globalAlpha = 1
  for (const figure of SKY_FIGURES) {
    const byId = new Map(figure.stars.map(star => [star.hr, star]))
    ctx.save()
    ctx.strokeStyle = 'rgba(180,236,220,.96)'
    ctx.lineWidth = 1.8
    ctx.lineJoin = 'round'
    ctx.shadowColor = 'rgba(159,208,194,.65)'
    ctx.shadowBlur = 7
    // Deduplicate retraced segments from the source's continuous polylines.
    const edges = new Set()
    for (let i = 1; i < figure.line.length; i++) {
      const ids = [figure.line[i - 1], figure.line[i]]
      const key = [...ids].sort((a, b) => a - b).join('-')
      if (edges.has(key)) continue
      edges.add(key)
      const a = byId.get(ids[0]), b = byId.get(ids[1])
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
    }
    for (const star of figure.stars) {
      ctx.fillStyle = '#fff5dd'
      ctx.beginPath(); ctx.arc(star.x, star.y, star.radius + .7, 0, Math.PI * 2); ctx.fill()
      ctx.strokeStyle = 'rgba(236,209,164,.8)'; ctx.lineWidth = 1
      ctx.beginPath(); ctx.arc(star.x, star.y, star.radius + 5, 0, Math.PI * 2); ctx.stroke()
    }
    ctx.restore()
    ctx.font = '500 13px ui-monospace, monospace'
    ctx.fillStyle = '#c8f1e3'
    ctx.fillText(figure.name.toUpperCase(), figure.box[0], figure.box[1] - 20)
  }
  // Illustrative orbital paths, kept separate from constellation line figures.
  ctx.save(); ctx.translate(1110, 635); ctx.rotate(-.35)
  ctx.strokeStyle = 'rgba(239,205,153,.88)'
  ctx.lineWidth = 1.5
  ctx.shadowColor = 'rgba(212,184,150,.55)'; ctx.shadowBlur = 6
  for (const radius of [65, 105, 150]) {
    ctx.beginPath(); ctx.ellipse(0, 0, radius, radius * .55, 0, 0, Math.PI * 2); ctx.stroke()
  }
  ctx.restore()
  ctx.font = '500 12px ui-monospace, monospace'
  ctx.fillStyle = '#efcd99'
  ctx.fillText('ORBITAL GEOMETRY', 1000, 520)
  ctx.fillText('F ∝ 1/r²', 1240, 555)
}

export default function NightSky() {
  return (
    <div className="night-sky" aria-hidden="true">
      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <defs><radialGradient id="sky-glow"><stop stopColor="#111b37" /><stop offset="1" stopColor="#02040a" /></radialGradient></defs>
        <rect width="1440" height="900" fill="url(#sky-glow)" />
        {STARS.map((star, i) => <circle key={i} cx={star.x} cy={star.y} r={star.radius} fill={star.color} opacity={star.opacity} className={i < 42 ? 'sky-twinkle' : undefined} style={i < 42 ? { '--star-opacity': star.opacity, '--star-duration': `${star.duration}s`, '--star-delay': `${star.delay}s` } : undefined} />)}
        {SKY_FIGURES.map(figure => <g key={figure.name}>{figure.stars.map(star => <circle key={star.hr} cx={star.x} cy={star.y} r={star.radius} fill="#f7eddb" opacity=".85" />)}</g>)}
      </svg>
      {Array.from({ length: 8 }, (_, i) => <span key={i} className="sky-meteor" style={{ left: `${25 + (i * 19) % 70}%`, top: `${8 + (i * 13) % 55}%`, '--meteor-duration': `${12 + i * 1.7}s`, '--meteor-delay': `${-i * 3.1}s`, '--meteor-distance': `${24 + (i % 3) * 14}vw` }} />)}
    </div>
  )
}
