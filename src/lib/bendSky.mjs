import { Body, Observer, Vector, MakeTime, Rotation_EQJ_HOR, Rotation_ECL_HOR, RotateVector, Equator, Illumination, MoonPhase } from 'astronomy-engine'
import { stars as catalog, figures } from '../data/skyCatalog.mjs'

export const BEND = new Observer(44.058, -121.315, 1100)
const RAD = Math.PI / 180
const names = { And: 'Andromeda', Aql: 'Aquila', Aqr: 'Aquarius', Ari: 'Aries', Aur: 'Auriga', Boo: 'Boötes', CMa: 'Canis Major', CMi: 'Canis Minor', Cas: 'Cassiopeia', Cep: 'Cepheus', Cet: 'Cetus', Cyg: 'Cygnus', Dra: 'Draco', Gem: 'Gemini', Her: 'Hercules', Leo: 'Leo', Lib: 'Libra', Lyr: 'Lyra', Ori: 'Orion', Peg: 'Pegasus', Per: 'Perseus', Psc: 'Pisces', Sgr: 'Sagittarius', Sco: 'Scorpius', Tau: 'Taurus', UMa: 'Ursa Major', UMi: 'Ursa Minor', Vir: 'Virgo' }

// A single stereographic map of the hemisphere: looking up, north at the top,
// east at the left. HOR vectors use north/west/zenith (a right-handed frame).
export function project(vector) {
  const length = Math.hypot(vector.x, vector.y, vector.z)
  const north = vector.x / length, west = vector.y / length, up = vector.z / length
  const denominator = Math.max(1e-9, 1 + up)
  return { x: west / denominator, y: -north / denominator, altitude: Math.asin(Math.max(-1, Math.min(1, up))) / RAD }
}

export function skyLayout(width, height) {
  // One shared, enlarged projection fills the hero; the viewport crops its edges.
  return width <= 760
    ? { x: width * .65, y: height * .32, radius: Math.max(width * .85, height * .6) }
    : { x: width * .6, y: height * .4, radius: Math.max(width * .6, height * .7) }
}

export function createBendSky(date = new Date()) {
  const time = MakeTime(date), rotation = Rotation_EQJ_HOR(time, BEND)
  const years = time.ut / 365.25
  const stars = catalog.map(([id, ra, dec, magnitude, bv, pmRa, pmDec]) => {
    // BSC proper motion in RA is already multiplied by cos(declination).
    const a = ra * RAD + pmRa * years * RAD / (3600 * Math.cos(dec * RAD))
    const d = (dec + pmDec * years / 3600) * RAD
    const v = new Vector(Math.cos(d) * Math.cos(a), Math.cos(d) * Math.sin(a), Math.sin(d), time)
    return { id, magnitude, ...project(RotateVector(rotation, v)),
      radius: Math.max(.45, 2.5 - magnitude * .34),
      color: bv > 1.1 ? '#efd2ac' : bv < .1 ? '#c9ddff' : '#f7eddb',
      opacity: Math.max(.25, Math.min(.95, 1 - magnitude * .12)) }
  })
  const byId = new Map(stars.map(s => [s.id, s]))
  const constellations = figures.map(([id, line], index) => {
    const members = [...new Set(line)].map(id => byId.get(id))
    const edges = [], seen = new Set()
    for (let i = 1; i < line.length; i++) {
      const a = byId.get(line[i-1]), b = byId.get(line[i])
      const key = [a.id, b.id].sort().join('-')
      if (seen.has(key)) continue
      seen.add(key)
      // Never connect across the hidden hemisphere.
      if (a.altitude >= 0 && b.altitude >= 0) edges.push([a,b])
    }
    return { id: `${id}-${index}`, name: names[id] || id, edges,
      label: names[id] && members.every(s => s.altitude > 8) ? {
        x: members.reduce((n,s) => n+s.x,0)/members.length,
        y: members.reduce((n,s) => n+s.y,0)/members.length,
      } : null }
  })
  function bodyVector(body, when, matrix = Rotation_EQJ_HOR(when, BEND)) {
    return RotateVector(matrix, Equator(body, when, BEND, false, true).vec)
  }
  const moonVector = bodyVector(Body.Moon, time, rotation)
  const sunVector = bodyVector(Body.Sun, time, rotation)
  const moon = project(moonVector), sun = project(sunVector)
  const unit = v => { const r = Math.hypot(v.x,v.y,v.z); return [v.x/r,v.y/r,v.z/r] }
  const m = unit(moonVector), s = unit(sunVector), dot = m.reduce((v,n,i) => v+n*s[i],0)
  const tangent = s.map((n,i) => n-dot*m[i])
  const towardSun = project({ x:m[0]+.001*tangent[0], y:m[1]+.001*tangent[1], z:m[2]+.001*tangent[2] })
  moon.angle = Math.atan2(towardSun.y-moon.y, towardSun.x-moon.x)
  moon.fraction = Illumination(Body.Moon, time).phase_fraction
  moon.phase = MoonPhase(time)
  moon.phaseName = moon.fraction < .01 ? 'New Moon' : moon.fraction > .99 ? 'Full Moon' : `${moon.phase < 180 ? 'Waxing' : 'Waning'} ${moon.fraction < .5 ? 'crescent' : 'gibbous'}`
  if (Math.abs(moon.fraction-.5)<.015) moon.phaseName = moon.phase < 180 ? 'First quarter' : 'Last quarter'
  // Apparent track: both the Moon's orbit and Earth's rotation advance.
  // This is not an ellipse in space or a path in the fixed stellar frame.
  const moonTrack = Array.from({length:145}, (_,i) => {
    const when = new Date(date.getTime()+i*10*60*1000)
    return { ...project(bodyVector(Body.Moon, when)), hours:i/6 }
  })
  const eclipticRotation = Rotation_ECL_HOR(time, BEND)
  const ecliptic = Array.from({length:181}, (_,i) => project(RotateVector(eclipticRotation, new Vector(Math.cos(i*2*RAD),Math.sin(i*2*RAD),0,time))))
  const light = sun.altitude >= 0 ? 'Daylight' : sun.altitude > -18 ? 'Twilight' : 'Night'
  const clock = new Intl.DateTimeFormat('en-US', {timeZone:'America/Los_Angeles', hour:'numeric', minute:'2-digit',timeZoneName:'short'}).format(date)
  return { date:date.toISOString(), stars:stars.filter(s => s.altitude>=0), constellations, moon, moonTrack, ecliptic, sun, light, clock }
}

// The illuminated boundary is a projected hemisphere; local +x faces the Sun.
export function moonLitPath(radius, fraction) {
  const points = []
  for (let i=0;i<=40;i++) {
    const a=-Math.PI/2+i*Math.PI/40
    points.push([radius*Math.cos(a), radius*Math.sin(a)])
  }
  for (let i=40;i>=0;i--) {
    const a=-Math.PI/2+i*Math.PI/40
    points.push([(1-2*fraction)*radius*Math.cos(a), radius*Math.sin(a)])
  }
  return `M ${points.map(p => p.join(' ')).join(' L ')} Z`
}
