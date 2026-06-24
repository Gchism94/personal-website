'use client'

import { useEffect, useRef } from 'react'

/* ── Shared palette (mirrors CourseAnimations.jsx exactly) ── */
const C = {
  linen:   '#F5EFE6',
  bark:    '#3B2F2F',
  juniper: '#4A7C6F',
  ash:     '#9B9187',
  ashLt:   '#C4BCB3',
  sand:    '#D4B896',
  rust:    '#B5532A',
  teal:    '#9fd0c2',
}

const lerp  = (a, b, t) => a + (b - a) * t
const clamp = (x, lo, hi) => Math.max(lo, Math.min(hi, x))
const ease  = t => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2

function fitCanvas(canvas, ctx) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const w = canvas.offsetWidth || 1
  const h = canvas.offsetHeight || 1
  canvas.width  = Math.round(w * dpr)
  canvas.height = Math.round(h * dpr)
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  return [w, h]
}

/* ══════════════════════════════════════════════════════
   1. THREE CANYON CONSULTING
   Four layered canyon ridgelines (ashLt / sand / juniper
   / bark) drifting with a gentle parallax; a rust insight
   point traces along the mid-ridge and loops.
   ══════════════════════════════════════════════════════ */
export function ConsultingAnim({ className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf, W, H

    function resize() { [W, H] = fitCanvas(canvas, ctx) }
    resize()

    // Return the canvas-pixel Y of a sinusoidal ridgeline at position xPx
    function ridgeY(xPx, timeSec, baseR, f1, a1, f2, a2, spd) {
      return H * baseR
        + Math.sin(xPx / W * f1 * Math.PI * 2 + timeSec * spd) * a1 * H
        + Math.sin(xPx / W * f2 * Math.PI * 2 + timeSec * spd * 0.71) * a2 * H
    }

    // Fill a ridge polygon down to the canvas bottom
    function drawRidge(timeSec, baseR, f1, a1, f2, a2, spd, color, alpha) {
      const step = Math.max(2, Math.ceil(W / 120))
      ctx.fillStyle = color
      ctx.globalAlpha = alpha
      ctx.beginPath()
      let first = true
      for (let x = 0; x <= W; x += step) {
        const y = ridgeY(x, timeSec, baseR, f1, a1, f2, a2, spd)
        first ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        first = false
      }
      ctx.lineTo(W, H); ctx.lineTo(0, H)
      ctx.closePath(); ctx.fill()
      ctx.globalAlpha = 1
    }

    const CYCLE = 6000
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let t0 = null

    function draw(elapsedMs) {
      const timeSec = elapsedMs / 1000
      const cycleT  = (elapsedMs % CYCLE) / CYCLE

      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = C.linen
      ctx.fillRect(0, 0, W, H)

      // Warm sky wash
      const sky = ctx.createLinearGradient(0, 0, 0, H * 0.56)
      sky.addColorStop(0, '#EDE4D6')
      sky.addColorStop(1, C.linen)
      ctx.fillStyle = sky
      ctx.globalAlpha = 0.52
      ctx.fillRect(0, 0, W, H * 0.56)
      ctx.globalAlpha = 1

      // Ridges: far (ashLt) → mid-far (sand) → mid-near (juniper) → fore (bark)
      drawRidge(timeSec, 0.50, 2.2, 0.038, 1.6, 0.022, 0.014, C.ashLt,  0.88)
      drawRidge(timeSec, 0.62, 2.9, 0.045, 2.1, 0.020, 0.016, C.sand,   0.92)
      drawRidge(timeSec, 0.74, 3.4, 0.032, 1.5, 0.025, 0.012, C.juniper, 0.70)
      drawRidge(timeSec, 0.86, 2.6, 0.026, 1.3, 0.018, 0.011, C.bark,   0.68)

      // Traveling rust insight point along the mid-far (sand) ridge
      const ptX = lerp(W * 0.04, W * 0.96, ease(cycleT))
      const ptY = ridgeY(ptX, timeSec, 0.62, 2.9, 0.045, 2.1, 0.020, 0.016)

      // Trail (drawn back to front so newer = on top)
      for (let i = 5; i >= 1; i--) {
        const prog  = (5 - i + 1) / 5
        const tBack = Math.max(0, cycleT - i * 0.022)
        const tx = lerp(W * 0.04, W * 0.96, ease(tBack))
        const ty = ridgeY(tx, timeSec, 0.62, 2.9, 0.045, 2.1, 0.020, 0.016)
        ctx.fillStyle = C.rust
        ctx.globalAlpha = prog * 0.28
        ctx.beginPath()
        ctx.arc(tx, ty, lerp(1.2, 3, prog), 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1

      // Point head with glow
      const hg = ctx.createRadialGradient(ptX, ptY, 0, ptX, ptY, 8)
      hg.addColorStop(0, C.rust + 'bb')
      hg.addColorStop(1, C.rust + '00')
      ctx.fillStyle = hg
      ctx.beginPath(); ctx.arc(ptX, ptY, 8, 0, Math.PI * 2); ctx.fill()
      ctx.fillStyle = C.rust
      ctx.beginPath(); ctx.arc(ptX, ptY, 3.5, 0, Math.PI * 2); ctx.fill()
      ctx.fillStyle = C.linen
      ctx.globalAlpha = 0.70
      ctx.beginPath(); ctx.arc(ptX, ptY, 1.4, 0, Math.PI * 2); ctx.fill()
      ctx.globalAlpha = 1
    }

    function frame(ts) {
      if (!t0) t0 = ts
      draw(ts - t0)
      raf = requestAnimationFrame(frame)
    }

    const onResize = () => { resize(); if (reduced) draw(CYCLE * 0.4) }
    if (reduced) { draw(CYCLE * 0.4) } else { raf = requestAnimationFrame(frame) }
    window.addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize) }
  }, [])

  return (
    <canvas ref={ref} className={className}
      style={{ display: 'block', width: '100%', height: '100%' }} aria-hidden="true" />
  )
}

/* ══════════════════════════════════════════════════════
   2. STEPPE
   A low mesa horizon (sand / bark silhouette) with a
   bounded lattice of community nodes (juniper / teal)
   above; routing pulses travel edge-to-edge; warm
   ember/star accents in the sky.
   ══════════════════════════════════════════════════════ */
export function SteppeAnim({ className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf, W, H

    function resize() { [W, H] = fitCanvas(canvas, ctx) }
    resize()

    // Community nodes (normalized, all sit above the mesa horizon ~0.60)
    const NODES = [
      { x: 0.18, y: 0.18 },
      { x: 0.50, y: 0.12 },
      { x: 0.82, y: 0.18 },
      { x: 0.10, y: 0.38 },
      { x: 0.36, y: 0.34 },
      { x: 0.64, y: 0.34 },
      { x: 0.90, y: 0.38 },
      { x: 0.28, y: 0.52 },
      { x: 0.72, y: 0.52 },
    ]
    const EDGES = [
      [0,1],[1,2],[0,3],[0,4],[1,4],[1,5],[2,5],[2,6],
      [3,4],[4,5],[5,6],[3,7],[4,7],[5,8],[6,8],[7,8],
    ]
    const STARS = [
      { x: 0.13, y: 0.055, r: 1.7 },
      { x: 0.60, y: 0.038, r: 1.3 },
      { x: 0.84, y: 0.072, r: 1.5 },
      { x: 0.40, y: 0.082, r: 1.1 },
    ]

    const PULSE_PERIOD = 720  // ms each pulse spends on one edge
    const TOTAL = EDGES.length * PULSE_PERIOD  // 11 520 ms full rotation

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let t0 = null

    function draw(elapsedMs) {
      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = C.linen
      ctx.fillRect(0, 0, W, H)

      const NR = Math.min(W, H) * 0.038

      // ── Far mesa (sand) ──
      ctx.fillStyle = C.sand
      ctx.globalAlpha = 0.58
      ctx.beginPath()
      ctx.moveTo(0, H * 0.72)
      ctx.lineTo(W * 0.18, H * 0.66)
      ctx.lineTo(W * 0.40, H * 0.63)
      ctx.lineTo(W * 0.58, H * 0.64)
      ctx.lineTo(W * 0.78, H * 0.68)
      ctx.lineTo(W, H * 0.72)
      ctx.lineTo(W, H); ctx.lineTo(0, H)
      ctx.closePath(); ctx.fill()

      // ── Near mesa (bark) ──
      ctx.fillStyle = C.bark
      ctx.globalAlpha = 0.70
      ctx.beginPath()
      ctx.moveTo(0, H * 0.82)
      ctx.lineTo(W * 0.20, H * 0.76)
      ctx.lineTo(W * 0.38, H * 0.73)
      ctx.lineTo(W * 0.55, H * 0.73)
      ctx.lineTo(W * 0.70, H * 0.78)
      ctx.lineTo(W, H * 0.84)
      ctx.lineTo(W, H); ctx.lineTo(0, H)
      ctx.closePath(); ctx.fill()
      ctx.globalAlpha = 1

      // ── Edges (faint) ──
      ctx.strokeStyle = C.juniper
      ctx.lineWidth = 0.7
      ctx.globalAlpha = 0.18
      EDGES.forEach(([a, b]) => {
        ctx.beginPath()
        ctx.moveTo(NODES[a].x * W, NODES[a].y * H)
        ctx.lineTo(NODES[b].x * W, NODES[b].y * H)
        ctx.stroke()
      })
      ctx.globalAlpha = 1

      // ── 3 staggered pulse packets ──
      for (let p = 0; p < 3; p++) {
        const phase  = (elapsedMs + p * (TOTAL / 3)) % TOTAL
        const eIdx   = Math.floor(phase / PULSE_PERIOD) % EDGES.length
        const edgeT  = ease((phase % PULSE_PERIOD) / PULSE_PERIOD)
        const [a, b] = EDGES[eIdx]
        const px = lerp(NODES[a].x * W, NODES[b].x * W, edgeT)
        const py = lerp(NODES[a].y * H, NODES[b].y * H, edgeT)
        const col = p === 1 ? C.teal : C.juniper

        const g = ctx.createRadialGradient(px, py, 0, px, py, NR * 1.8)
        g.addColorStop(0, col + '55'); g.addColorStop(1, col + '00')
        ctx.fillStyle = g
        ctx.beginPath(); ctx.arc(px, py, NR * 1.8, 0, Math.PI * 2); ctx.fill()
        ctx.fillStyle = col
        ctx.globalAlpha = 0.90
        ctx.beginPath(); ctx.arc(px, py, 3, 0, Math.PI * 2); ctx.fill()
        ctx.globalAlpha = 1
      }

      // ── Nodes ──
      NODES.forEach((n, i) => {
        ctx.strokeStyle = C.juniper
        ctx.fillStyle   = C.linen
        ctx.lineWidth   = 1.2
        ctx.globalAlpha = 0.76
        ctx.beginPath()
        ctx.arc(n.x * W, n.y * H, NR, 0, Math.PI * 2)
        ctx.fill(); ctx.stroke()
        ctx.globalAlpha = 1
      })
      // Teal center-top accent node
      ctx.fillStyle = C.teal
      ctx.globalAlpha = 0.52
      ctx.beginPath()
      ctx.arc(NODES[1].x * W, NODES[1].y * H, NR * 0.44, 0, Math.PI * 2)
      ctx.fill()
      ctx.globalAlpha = 1

      // ── Star/ember accents ──
      STARS.forEach((s, i) => {
        const pulse = 0.62 + 0.38 * Math.sin(elapsedMs / 1500 + i * 1.3)
        ctx.fillStyle = C.sand
        ctx.globalAlpha = pulse * 0.68
        ctx.beginPath()
        ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.globalAlpha = 1
    }

    function frame(ts) {
      if (!t0) t0 = ts
      draw(ts - t0)
      raf = requestAnimationFrame(frame)
    }

    const onResize = () => { resize(); if (reduced) draw(TOTAL * 0.22) }
    if (reduced) { draw(TOTAL * 0.22) } else { raf = requestAnimationFrame(frame) }
    window.addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize) }
  }, [])

  return (
    <canvas ref={ref} className={className}
      style={{ display: 'block', width: '100%', height: '100%' }} aria-hidden="true" />
  )
}

/* ══════════════════════════════════════════════════════
   3. EDUCLOUD × QUAD
   Two horizontal planes of nodes (top = Quad, juniper;
   bottom = EduCloud, sand) joined by a teal dashed seam
   at the center. Pulses travel left→right on top,
   right→left on bottom; a seam-crossing pulse fires as
   each plane's packet passes the center node.
   ══════════════════════════════════════════════════════ */
export function EduCloudAnim({ className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf, W, H

    function resize() { [W, H] = fitCanvas(canvas, ctx) }
    resize()

    // 5 node positions per plane (normalized x)
    const NX    = [0.10, 0.28, 0.50, 0.72, 0.90]
    const TOP_Y = 0.26   // normalized y for top plane
    const BOT_Y = 0.74   // normalized y for bottom plane
    const SEAM  = 2      // index of center / seam node

    const PLANE_EDGES = [[0,1],[1,2],[2,3],[3,4]]

    // Position of pulse at progress t ∈ [0,1] along a plane
    function planePulsePos(yNorm, t) {
      const numE = PLANE_EDGES.length
      const et   = t * numE
      const ei   = Math.min(Math.floor(et), numE - 1)
      const frac = ease(et - ei)
      const [a, b] = PLANE_EDGES[ei]
      return {
        x: lerp(NX[a] * W, NX[b] * W, frac),
        y: yNorm * H,
      }
    }

    const CYCLE = 4400
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let t0 = null

    function drawPulse(x, y, color) {
      const NR = Math.min(W, H) * 0.036
      const g = ctx.createRadialGradient(x, y, 0, x, y, NR * 2)
      g.addColorStop(0, color + '66'); g.addColorStop(1, color + '00')
      ctx.fillStyle = g
      ctx.beginPath(); ctx.arc(x, y, NR * 2, 0, Math.PI * 2); ctx.fill()
      ctx.fillStyle = color
      ctx.globalAlpha = 0.92
      ctx.beginPath(); ctx.arc(x, y, 3.5, 0, Math.PI * 2); ctx.fill()
      ctx.fillStyle = C.linen
      ctx.globalAlpha = 0.68
      ctx.beginPath(); ctx.arc(x, y, 1.5, 0, Math.PI * 2); ctx.fill()
      ctx.globalAlpha = 1
    }

    function drawNode(xNorm, yNorm, color, isSeam) {
      const NR = Math.min(W, H) * 0.036
      const x = xNorm * W, y = yNorm * H
      if (isSeam) {
        const g = ctx.createRadialGradient(x, y, 0, x, y, NR * 2)
        g.addColorStop(0, C.teal + '44'); g.addColorStop(1, C.teal + '00')
        ctx.fillStyle = g
        ctx.beginPath(); ctx.arc(x, y, NR * 2, 0, Math.PI * 2); ctx.fill()
      }
      ctx.strokeStyle = color
      ctx.fillStyle   = C.linen
      ctx.lineWidth   = isSeam ? 1.6 : 1.0
      ctx.globalAlpha = isSeam ? 0.95 : 0.70
      ctx.beginPath(); ctx.arc(x, y, NR, 0, Math.PI * 2)
      ctx.fill(); ctx.stroke()
      ctx.globalAlpha = 1
    }

    function draw(elapsedMs) {
      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = C.linen
      ctx.fillRect(0, 0, W, H)

      const t  = (elapsedMs % CYCLE) / CYCLE
      // Bottom plane is offset so pulses reach seam at different times
      const t2 = ((elapsedMs + CYCLE * 0.45) % CYCLE) / CYCLE

      // Top pulse travels left → right; bottom travels right → left
      const topPt = planePulsePos(TOP_Y, t)
      const botPt = planePulsePos(BOT_Y, 1 - t2)

      // Seam crossing fires when top pulse passes SEAM node (t ≈ 0.5)
      const downActive = t > 0.44 && t < 0.60
      const downT = downActive ? ease((t - 0.44) / 0.16) : 0
      // Seam crossing fires when bottom pulse passes SEAM node (1-t2 ≈ 0.5 → t2 ≈ 0.5)
      const upActive = t2 > 0.44 && t2 < 0.60
      const upT = upActive ? ease((t2 - 0.44) / 0.16) : 0

      const seamTopX = NX[SEAM] * W, seamTopY = TOP_Y * H
      const seamBotX = NX[SEAM] * W, seamBotY = BOT_Y * H

      // ── Top plane edges ──
      ctx.strokeStyle = C.juniper; ctx.lineWidth = 0.8; ctx.globalAlpha = 0.20
      PLANE_EDGES.forEach(([a, b]) => {
        ctx.beginPath()
        ctx.moveTo(NX[a] * W, TOP_Y * H)
        ctx.lineTo(NX[b] * W, TOP_Y * H)
        ctx.stroke()
      })

      // ── Bottom plane edges ──
      ctx.strokeStyle = C.sand; ctx.globalAlpha = 0.22
      PLANE_EDGES.forEach(([a, b]) => {
        ctx.beginPath()
        ctx.moveTo(NX[a] * W, BOT_Y * H)
        ctx.lineTo(NX[b] * W, BOT_Y * H)
        ctx.stroke()
      })
      ctx.globalAlpha = 1

      // ── Seam (center dashed teal line) ──
      ctx.strokeStyle = C.teal; ctx.lineWidth = 1; ctx.globalAlpha = 0.30
      ctx.setLineDash([3, 4])
      ctx.beginPath()
      ctx.moveTo(seamTopX, seamTopY)
      ctx.lineTo(seamBotX, seamBotY)
      ctx.stroke()
      ctx.setLineDash([]); ctx.globalAlpha = 1

      // ── Pulses ──
      drawPulse(topPt.x, topPt.y, C.juniper)
      drawPulse(botPt.x, botPt.y, C.sand)
      if (downActive) drawPulse(lerp(seamTopX, seamBotX, downT), lerp(seamTopY, seamBotY, downT), C.teal)
      if (upActive)   drawPulse(lerp(seamBotX, seamTopX, upT),   lerp(seamBotY, seamTopY, upT),   C.rust)

      // ── Nodes ──
      NX.forEach((x, i) => drawNode(x, TOP_Y, C.juniper, i === SEAM))
      NX.forEach((x, i) => drawNode(x, BOT_Y, C.sand,    i === SEAM))
    }

    function frame(ts) {
      if (!t0) t0 = ts
      draw(ts - t0)
      raf = requestAnimationFrame(frame)
    }

    const onResize = () => { resize(); if (reduced) draw(CYCLE * 0.30) }
    if (reduced) { draw(CYCLE * 0.30) } else { raf = requestAnimationFrame(frame) }
    window.addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize) }
  }, [])

  return (
    <canvas ref={ref} className={className}
      style={{ display: 'block', width: '100%', height: '100%' }} aria-hidden="true" />
  )
}
