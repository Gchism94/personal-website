import { moonLitPath, skyLayout } from '@/lib/bendSky.mjs'

function paintMoon(ctx, sky, layout) {
  const moon = sky.moon
  if (moon.altitude < 0) return
  const x = layout.x + moon.x * layout.radius, y = layout.y + moon.y * layout.radius
  ctx.save(); ctx.translate(x,y); ctx.rotate(moon.angle)
  ctx.fillStyle = '#273246'; ctx.beginPath(); ctx.arc(0,0,9,0,Math.PI*2); ctx.fill()
  ctx.fillStyle = '#f3dfb7'; ctx.fill(new Path2D(moonLitPath(9,moon.fraction)))
  ctx.restore()
}

export function drawSkyGeometry(ctx, sky, width, height) {
  ctx.fillStyle = '#040815'; ctx.fillRect(0,0,width,height)
  if (!sky) return
  const layout = skyLayout(width,height), {x:cx,y:cy,radius} = layout
  const xy = p => [cx+p.x*radius,cy+p.y*radius]
  ctx.save()
  ctx.beginPath(); ctx.arc(cx,cy,radius,0,Math.PI*2); ctx.clip()
  ctx.strokeStyle = 'rgba(159,208,194,.17)'; ctx.lineWidth = .7
  for (const altitude of [0,30,60]) {
    const r = radius*Math.tan((90-altitude)*Math.PI/360)
    ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2); ctx.stroke()
  }
  for (let a=0;a<Math.PI*2;a+=Math.PI/6) {
    ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(cx+radius*Math.cos(a),cy+radius*Math.sin(a)); ctx.stroke()
  }
  sky.stars.forEach(star => {
    ctx.fillStyle = star.color; ctx.globalAlpha = star.opacity
    ctx.beginPath(); ctx.arc(...xy(star),star.radius,0,Math.PI*2); ctx.fill()
  })
  ctx.globalAlpha = 1
  ctx.strokeStyle = 'rgba(180,236,220,.88)'; ctx.lineWidth = width<=760 ? 1 : 1.4
  ctx.shadowColor = 'rgba(159,208,194,.55)'; ctx.shadowBlur = 5
  for (const figure of sky.constellations) {
    for (const [a,b] of figure.edges) {
      ctx.beginPath(); ctx.moveTo(...xy(a)); ctx.lineTo(...xy(b)); ctx.stroke()
    }
  }
  ctx.shadowBlur = 0
  function track(points, color, dash) {
    ctx.strokeStyle = color; ctx.lineWidth = 1.5; ctx.setLineDash(dash)
    ctx.beginPath()
    let active = false
    for (const point of points) {
      if (point.altitude<0) { active=false; continue }
      if (active) ctx.lineTo(...xy(point)); else ctx.moveTo(...xy(point))
      active=true
    }
    ctx.stroke(); ctx.setLineDash([])
  }
  track(sky.ecliptic,'rgba(180,205,235,.5)',[2,6])
  track(sky.moonTrack,'rgba(239,205,153,.95)',[7,4])
  ctx.restore()
  // Keep names legible and avoid stacking neighboring labels on smaller screens.
  const labels=[]
  ctx.font = `${width<=760 ? 9 : 11}px ui-monospace, monospace`
  ctx.textAlign='center'; ctx.fillStyle='#c8f1e3'
  for (const figure of sky.constellations) {
    if (!figure.label) continue
    const [x,y]=xy(figure.label), w=ctx.measureText(figure.name.toUpperCase()).width
    if (labels.some(b => Math.abs(x-b.x)<(w+b.w)/2+10 && Math.abs(y-b.y)<23)) continue
    labels.push({x,y,w})
    ctx.fillStyle='#040815'; ctx.fillRect(x-w/2-3,y-19,w+6,14)
    ctx.fillStyle='#c8f1e3'; ctx.fillText(figure.name.toUpperCase(),x,y-8)
  }
  paintMoon(ctx,sky,layout)
  ctx.font='10px ui-monospace, monospace'; ctx.fillStyle='#c0cbd9'
  for (const [label,x,y] of [['N',cx,cy-radius-10],['S',cx,cy+radius+18],['E',cx-radius-12,cy+3],['W',cx+radius+12,cy+3]]) ctx.fillText(label,x,y)
  ctx.fillStyle='#efcd99'
  ctx.fillText('MOON · NEXT 24 HOURS',cx,cy+radius+39)
  ctx.fillStyle='#9bafc7'; ctx.font='9px ui-monospace, monospace'
  ctx.fillText('DOTTED · ECLIPTIC',cx,cy+radius+55)
  ctx.textAlign='start'
}

export default function NightSky({sky, size}) {
  const layout=skyLayout(size.width,size.height)
  const moon=sky?.moon
  return (
    <div className="night-sky" aria-hidden="true" data-sky-time={sky?.date} data-moon-visible={moon ? moon.altitude>=0 : false}>
      <svg viewBox={`0 0 ${size.width} ${size.height}`} preserveAspectRatio="none">
        <defs><radialGradient id="sky-glow"><stop stopColor="#111b37" /><stop offset="1" stopColor="#02040a" /></radialGradient></defs>
        <rect width={size.width} height={size.height} fill="url(#sky-glow)" />
        {sky?.stars.map(star => <circle key={star.id} cx={layout.x+star.x*layout.radius} cy={layout.y+star.y*layout.radius} r={star.radius} fill={star.color} opacity={star.opacity} className={star.magnitude<2.7 ? 'sky-twinkle' : undefined} style={{'--star-opacity':star.opacity,'--star-duration':`${3+star.id%6}s`,'--star-delay':`${-star.id%12}s`}} />)}
        {moon?.altitude>=0 && <g transform={`translate(${layout.x+moon.x*layout.radius} ${layout.y+moon.y*layout.radius}) rotate(${moon.angle*180/Math.PI})`}><circle r="9" fill="#273246" /><path d={moonLitPath(9,moon.fraction)} fill="#f3dfb7" /></g>}
      </svg>
      {Array.from({ length: 8 }, (_, i) => <span key={i} className="sky-meteor" style={{ left: `${25 + (i * 19) % 70}%`, top: `${8 + (i * 13) % 55}%`, '--meteor-duration': `${12 + i * 1.7}s`, '--meteor-delay': `${-i * 3.1}s`, '--meteor-distance': `${24 + (i % 3) * 14}vw` }} />)}
    </div>
  )
}
