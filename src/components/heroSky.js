// Repeatable positions keep the visible sky and its revealed geometry aligned.
// This is an imagined sky, not an astronomical chart.
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

export function drawSkyGeometry(ctx) {
  ctx.fillStyle = '#040815'
  ctx.fillRect(0, 0, 1440, 900)
  // Curved coordinate lines suggest a celestial sphere.
  ctx.strokeStyle = 'rgba(159,208,194,.14)'
  ctx.lineWidth = .7
  for (let radius = 150; radius < 1200; radius += 105) {
    ctx.beginPath(); ctx.ellipse(960, 330, radius, radius * .62, -.25, 0, Math.PI * 2); ctx.stroke()
  }
  const anchors = STARS.slice(0, 42)
  anchors.forEach((star, i) => {
    const nearest = anchors.map((other, j) => ({ other, j, distance: Math.hypot(star.x - other.x, star.y - other.y) }))
      .filter(({ j, distance }) => j !== i && distance < 240)
      .sort((a, b) => a.distance - b.distance).slice(0, 2)
    nearest.forEach(({ other, j }) => {
      if (j < i) return
      ctx.strokeStyle = 'rgba(159,208,194,.55)'
      ctx.beginPath(); ctx.moveTo(star.x, star.y); ctx.lineTo(other.x, other.y); ctx.stroke()
    })
    ctx.strokeStyle = 'rgba(212,184,150,.7)'
    ctx.beginPath(); ctx.arc(star.x, star.y, 7, 0, Math.PI * 2); ctx.stroke()
  })
  STARS.forEach(star => {
    ctx.fillStyle = star.color; ctx.globalAlpha = star.opacity
    ctx.beginPath(); ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2); ctx.fill()
  })
  ctx.globalAlpha = 1
  // Orbital ellipses and a focus reveal a second kind of celestial pattern.
  ctx.save(); ctx.translate(1010, 320); ctx.rotate(-.35)
  for (const radius of [90, 145, 205]) {
    ctx.strokeStyle = 'rgba(212,184,150,.55)'
    ctx.beginPath(); ctx.ellipse(0, 0, radius, radius * .55, 0, 0, Math.PI * 2); ctx.stroke()
  }
  ctx.restore()
  ctx.font = '11px ui-monospace, monospace'
  ctx.fillStyle = '#d4b896'
  ctx.fillText('ORBITS / SHARED GRAVITY', 900, 565)
  ctx.fillText('LOCAL CONNECTIONS / DISTANT LIGHT', 490, 200)
  ctx.fillText('F ∝ 1/r²', 1160, 245)
}

export default function NightSky() {
  return (
    <div className="night-sky" aria-hidden="true">
      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <defs><radialGradient id="sky-glow"><stop stopColor="#111b37" /><stop offset="1" stopColor="#02040a" /></radialGradient></defs>
        <rect width="1440" height="900" fill="url(#sky-glow)" />
        {STARS.map((star, i) => <circle key={i} cx={star.x} cy={star.y} r={star.radius} fill={star.color} opacity={star.opacity} className={i < 42 ? 'sky-twinkle' : undefined} style={i < 42 ? { '--star-opacity': star.opacity, '--star-duration': `${star.duration}s`, '--star-delay': `${star.delay}s` } : undefined} />)}
      </svg>
      {Array.from({ length: 8 }, (_, i) => <span key={i} className="sky-meteor" style={{ left: `${25 + (i * 19) % 70}%`, top: `${8 + (i * 13) % 55}%`, '--meteor-duration': `${12 + i * 1.7}s`, '--meteor-delay': `${-i * 3.1}s`, '--meteor-distance': `${24 + (i % 3) * 14}vw` }} />)}
    </div>
  )
}
