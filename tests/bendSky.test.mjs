import test from 'node:test'
import assert from 'node:assert/strict'
import {createBendSky, project} from '../src/lib/bendSky.mjs'

test('overhead map places the cardinal directions correctly', () => {
  assert.deepEqual(project({x:0,y:0,z:1}),{x:0,y:-0,altitude:90})
  assert.equal(project({x:1,y:0,z:0}).y,-1) // north, top
  assert.equal(project({x:0,y:-1,z:0}).x,-1) // east, left
  assert.equal(project({x:0,y:1,z:0}).x,1) // west, right
})

test('known 2024 eclipse dates produce new and full Moons', () => {
  // NASA eclipse catalogue: total solar eclipse Apr 8; penumbral lunar Mar 25.
  const solar=createBendSky(new Date('2024-04-08T18:21:00Z'))
  const lunar=createBendSky(new Date('2024-03-25T07:00:00Z'))
  assert.ok(solar.moon.fraction<.001)
  assert.ok(lunar.moon.fraction>.999)
})

test('Polaris remains near Bend latitude; sky turns as time advances', () => {
  const a=createBendSky(new Date('2026-10-21T05:00:00Z'))
  const b=createBendSky(new Date('2026-10-21T11:00:00Z'))
  const polaris=s=>s.stars.find(v=>v.id===424)
  assert.ok(Math.abs(polaris(a).altitude-44.058)<1)
  assert.ok(Math.abs(polaris(b).altitude-44.058)<1)
  const caph=s=>s.stars.find(v=>v.id===21)
  assert.ok(Math.hypot(caph(a).x-caph(b).x,caph(a).y-caph(b).y)>.3)
})

test('all seasons have finite, above-horizon stars and registered line endpoints', () => {
  for(const month of [0,3,6,9]) {
    const sky=createBendSky(new Date(Date.UTC(2026,month,15,5)))
    const ids=new Map(sky.stars.map(s=>[s.id,s]))
    assert.ok(sky.stars.length>800)
    for(const s of sky.stars) {
      assert.ok(Number.isFinite(s.x+s.y))
      assert.ok(s.altitude>=0 && Math.hypot(s.x,s.y)<=1.000001)
    }
    for(const figure of sky.constellations) for(const edge of figure.edges) for(const point of edge) assert.equal(point,ids.get(point.id))
    assert.equal(sky.moonTrack.at(-1).hours,24)
    assert.ok(Math.abs(sky.moonTrack[0].x-sky.moon.x)<1e-9)
    assert.ok(Math.abs(sky.moonTrack[0].y-sky.moon.y)<1e-9)
  }
})

test('daylight, horizon visibility, and Bend daylight-saving time remain explicit', () => {
  const day=createBendSky(new Date('2026-10-20T20:00:00Z'))
  const night=createBendSky(new Date('2026-10-21T05:00:00Z'))
  const winter=createBendSky(new Date('2026-12-21T06:00:00Z'))
  assert.equal(day.light,'Daylight')
  assert.equal(night.light,'Night')
  assert.match(night.clock,/10:00 PM PDT/)
  assert.match(winter.clock,/10:00 PM PST/)
  const daily=Array.from({length:24},(_,h)=>createBendSky(new Date(Date.UTC(2026,9,20,h))).moon.altitude)
  assert.ok(daily.some(a=>a<0) && daily.some(a=>a>0))
})
