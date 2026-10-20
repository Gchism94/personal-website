'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useTheme } from './ThemeProvider'
import NightSky, { drawSkyGeometry } from './heroSky'

// The river follows the same centerline as the original landscape hero.
const RIVER = [[-.12,.355],[-.06,.355],[0,.355],[.03,.355],[.0326,.3869],[.0714,.4116],[.1024,.4452],[.1307,.4871],[.1688,.5122],[.2218,.5349],[.2891,.5399],[.3558,.5296],[.3979,.5431],[.4271,.5679],[.4679,.5802],[.5065,.6025],[.5467,.6031],[.6046,.5940],[.6651,.5945],[.7157,.604],[.7676,.635],[.8056,.6336],[.8418,.6141],[.8658,.5899],[.8927,.5717],[.9306,.5856],[.97,.5901],[1.02,.595],[1.1,.602]]
const SCENE_WIDTH = 1440
const SCENE_HEIGHT = 900
const FOREST = { x: 0, y: 24, width: 1440, height: 960 }
const riverPoints = RIVER.map(([x, y]) => [x * SCENE_WIDTH, y * SCENE_HEIGHT])

function riverY(x) {
  const right = riverPoints.findIndex(point => point[0] >= x)
  const a = riverPoints[Math.max(0, right - 1)]
  const b = riverPoints[right < 0 ? riverPoints.length - 1 : right]
  const t = Math.max(0, Math.min(1, (x - a[0]) / (b[0] - a[0] || 1)))
  return a[1] + (b[1] - a[1]) * t
}

// Catmull–Rom interpolation gives both layers the same continuous river.
function riverPath() {
  let path = `M ${riverPoints[0].join(' ')}`
  for (let i = 0; i < riverPoints.length - 1; i++) {
    const p0 = riverPoints[Math.max(0, i - 1)], p1 = riverPoints[i]
    const p2 = riverPoints[i + 1], p3 = riverPoints[Math.min(riverPoints.length - 1, i + 2)]
    path += ` C ${p1[0] + (p2[0] - p0[0]) / 6} ${p1[1] + (p2[1] - p0[1]) / 6} ${p2[0] - (p3[0] - p1[0]) / 6} ${p2[1] - (p3[1] - p1[1]) / 6} ${p2.join(' ')}`
  }
  return path
}
const RIVER_PATH = riverPath()
const FOREST_CLIP = `${RIVER_PATH} L 1600 -100 L -200 -100 Z`

export default function LandscapeHero() {
  const { isDark } = useTheme()
  const sceneRef = useRef(null)
  const revealRef = useRef(null)
  const canvasRef = useRef(null)
  const pointerFrame = useRef(null)
  const [revealed, setRevealed] = useState(false)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const scene = sceneRef.current
    let inView = true
    const sync = () => { scene.dataset.visible = String(inView && !document.hidden) }
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; sync() })
    observer.observe(scene)
    document.addEventListener('visibilitychange', sync)
    sync()
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', sync) }
  }, [])

  useEffect(() => {
    const scene = sceneRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let disposed = false
    let resizeFrame
    let samples = null
    const forestImage = new window.Image()

    function draw() {
      if (disposed) return
      const { width, height } = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      const scale = Math.max(width / SCENE_WIDTH, height / SCENE_HEIGHT)
      ctx.setTransform(dpr * scale, 0, 0, dpr * scale,
        dpr * (width - SCENE_WIDTH * scale) / 2,
        dpr * (height - SCENE_HEIGHT * scale) / 2)
      const dark = document.documentElement.classList.contains('dark')
      if (dark) { drawSkyGeometry(ctx); return }
      const paper = dark ? '#02040a' : '#F5EFE6'
      const line = dark ? '159,208,194' : '74,124,111'
      const annotation = dark ? '#D4B896' : '#B5532A'
      ctx.fillStyle = paper
      ctx.fillRect(0, 0, SCENE_WIDTH, SCENE_HEIGHT)

      // A coordinate field, rather than an unrelated decorative graphic.
      ctx.lineWidth = .6
      ctx.strokeStyle = `rgba(${line},.13)`
      for (let x = 0; x <= SCENE_WIDTH; x += 40) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, SCENE_HEIGHT); ctx.stroke()
      }
      for (let y = 0; y <= SCENE_HEIGHT; y += 40) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(SCENE_WIDTH, y); ctx.stroke()
      }

      // Sample the actual watercolor canopy. The point lattice is registered
      // to the original trees, so a revealed tree is still the same tree.
      if (samples) {
        const { pixels, width: sw, height: sh } = samples
        const points = new Map()
        for (let row = 0; row < sh; row++) {
          for (let col = 0; col < sw; col++) {
            const index = (row * sw + col) * 4
            const red = pixels[index], green = pixels[index + 1], blue = pixels[index + 2]
            const density = Math.min(1, Math.max(0, (green - red + green - blue - 16) / 100))
            const x = FOREST.x + col / sw * FOREST.width
            const y = FOREST.y + row / sh * FOREST.height
            if (density < .12 || y > riverY(x) - 5) continue
            points.set(`${col},${row}`, { x, y, density })
          }
        }
        for (const [key, point] of points) {
          const [col, row] = key.split(',').map(Number)
          ctx.strokeStyle = `rgba(${line},${.2 + point.density * .5})`
          ctx.lineWidth = .65
          for (const [dx, dy] of [[1, 0], [0, 1], [1, 1]]) {
            const next = points.get(`${col + dx},${row + dy}`)
            if (!next) continue
            ctx.beginPath(); ctx.moveTo(point.x, point.y); ctx.lineTo(next.x, next.y); ctx.stroke()
          }
          ctx.fillStyle = `rgba(${line},${.4 + point.density * .6})`
          ctx.beginPath(); ctx.arc(point.x, point.y, .7 + point.density, 0, Math.PI * 2); ctx.fill()
        }
      }

      // Offset streamlines and tangent vectors expose the geometry of the river.
      const path = new Path2D(RIVER_PATH)
      for (let i = -7; i <= 7; i++) {
        ctx.save(); ctx.translate(0, i * 9)
        ctx.strokeStyle = i === 0 ? `rgb(${line})` : `rgba(${line},${.4 - Math.abs(i) * .03})`
        ctx.lineWidth = i === 0 ? 2 : .8
        ctx.stroke(path); ctx.restore()
      }
      for (let x = 55; x < SCENE_WIDTH; x += 75) {
        const y = riverY(x)
        const angle = Math.atan2(riverY(x + 12) - riverY(x - 12), 24)
        ctx.save(); ctx.translate(x, y); ctx.rotate(angle)
        ctx.strokeStyle = annotation; ctx.lineWidth = 1.2
        ctx.beginPath(); ctx.moveTo(-10, 0); ctx.lineTo(10, 0); ctx.lineTo(5, -4); ctx.moveTo(10, 0); ctx.lineTo(5, 4); ctx.stroke(); ctx.restore()
      }
      ctx.font = '12px ui-monospace, monospace'
      ctx.fillStyle = annotation
      for (const [label, x, y] of [
        ['BRANCHING / SELF-SIMILARITY', 255, 190],
        ['LOCAL CONNECTIONS → COLLECTIVE PATTERNS', 760, 350],
        ['FLOW FIELD  ·  dx/dt = v(x)', 750, 680],
        ['G = (V, E)', 1120, 180],
      ]) {
        ctx.fillStyle = paper; ctx.fillRect(x - 7, y - 15, ctx.measureText(label).width + 14, 23)
        ctx.fillStyle = annotation; ctx.fillText(label, x, y)
      }
    }

    forestImage.onload = () => {
      if (disposed) return
      const samplingCanvas = document.createElement('canvas')
      samplingCanvas.width = 180; samplingCanvas.height = 120
      const samplingContext = samplingCanvas.getContext('2d', { willReadFrequently: true })
      if (!samplingContext) return
      samplingContext.drawImage(forestImage, 0, 0, 180, 120)
      samples = { pixels: samplingContext.getImageData(0, 0, 180, 120).data, width: 180, height: 120 }
      draw()
    }
    forestImage.src = '/images/tree-sketch.png'
    draw()
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(resizeFrame)
      resizeFrame = requestAnimationFrame(draw)
    })
    observer.observe(scene)
    return () => {
      disposed = true
      forestImage.onload = null
      observer.disconnect()
      cancelAnimationFrame(resizeFrame)
      cancelAnimationFrame(pointerFrame.current)
    }
  }, [isDark])

  function moveLens(event) {
    // Touch scrolling stays native; the button provides the same reveal on touch.
    if (event.pointerType === 'touch') return
    const { left, top } = revealRef.current.getBoundingClientRect()
    const x = event.clientX - left, y = event.clientY - top
    cancelAnimationFrame(pointerFrame.current)
    pointerFrame.current = requestAnimationFrame(() => {
      if (!revealRef.current) return
      revealRef.current.style.setProperty('--lens-x', `${x}px`)
      revealRef.current.style.setProperty('--lens-y', `${y}px`)
      revealRef.current.dataset.hovering = 'true'
    })
  }

  function hideLens() {
    cancelAnimationFrame(pointerFrame.current)
    if (revealRef.current) revealRef.current.dataset.hovering = 'false'
  }

  return (
    <section ref={sceneRef} className="river-hero" data-motion={paused ? 'paused' : 'running'} aria-labelledby="hero-heading"
      onPointerMove={moveLens} onPointerLeave={hideLens}>
      <NightSky />
      <svg key={String(isDark)} className="river-landscape" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <clipPath id="forest-bank"><path d={FOREST_CLIP} /></clipPath>
          <linearGradient id="forest-fade" x2="0" y2="1"><stop offset="0" stopColor="white" stopOpacity=".9" /><stop offset=".8" stopColor="white" stopOpacity=".8" /><stop offset="1" stopColor="white" stopOpacity=".2" /></linearGradient>
          <mask id="forest-paper"><rect width="1440" height="900" fill="url(#forest-fade)" /></mask>
        </defs>
        <g clipPath="url(#forest-bank)" mask="url(#forest-paper)">
          <image className="forest-watercolor" href="/images/tree-sketch.png" {...FOREST} preserveAspectRatio="none" />
        </g>
        <path className="river-wash river-draw" pathLength="1" d={RIVER_PATH} fill="none" strokeWidth="30" />
        <path className="river-bank river-draw" pathLength="1" d={RIVER_PATH} fill="none" strokeWidth="12" />
        <path className="river-current river-draw" pathLength="1" d={RIVER_PATH} fill="none" strokeWidth="2" />
        <g className="river-flow-arrival"><path className="river-flow" pathLength="1000" d={RIVER_PATH} fill="none" strokeWidth="2" /></g>
      </svg>
      <div ref={revealRef} className="systems-reveal" data-pinned={revealed} aria-hidden="true"><canvas ref={canvasRef} /></div>
      <div className="river-copy">
        <p className="editorial-label">Data scientist · Educator · Bend, Oregon</p>
        <h1 id="hero-heading">Greg<br />T. <em>Chism</em></h1>
        <p className="river-tagline">Building AI-native classrooms and shared computing infrastructure that give more people room to learn, experiment, and create.</p>
        <div className="river-links"><Link className="river-work-link" href="#selected-work">Explore my work <span aria-hidden="true">↗</span></Link><Link className="river-about-link" href="/about">About me</Link></div>
      </div>
      <div className="landscape-caption"><span>{isDark ? 'Under the Central Oregon sky' : 'Deschutes River · Central Oregon'}</span><span className="pointer-hint">Move your cursor to find the patterns {isDark ? 'in the sky' : 'beneath'}.</span><div className="landscape-controls"><button type="button" aria-pressed={revealed} onClick={() => setRevealed(!revealed)}>{revealed ? (isDark ? 'Return to the stars' : 'Return to the landscape') : 'Reveal the patterns'} <span aria-hidden="true">{revealed ? '−' : '+'}</span></button><button className="motion-control" type="button" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? 'Resume motion' : 'Pause motion'}</button></div>{isDark && <a className="sky-credit" href="/sky-sources.txt" target="_blank" rel="noopener noreferrer">About this sky ↗</a>}</div>
      <p className="sr-only">{isDark ? 'A twinkling sky reveals Cassiopeia, Cygnus, and Lyra, projected from catalogued star positions. The constellations are arranged separately for this composition, not as a live sky map. The orbital paths are illustrative.' : 'A watercolor forest fades in as the river flows into view. The cursor reveals a mathematical landscape exploring branching and flow, not measured geographic data.'} Use Reveal the patterns to view the full illustration without a mouse.</p>
    </section>
  )
}
