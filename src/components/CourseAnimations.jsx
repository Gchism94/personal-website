'use client'

import { useEffect, useRef } from 'react'

/* ── Shared palette ── */
const C = {
  linen:   '#F5EFE6',
  bark:    '#3B2F2F',
  juniper: '#4A7C6F',
  ash:     '#9B9187',
  ashLt:   '#C4BCB3',
  sand:    '#D4B896',
  rust:    '#B5532A',
}

const lerp  = (a, b, t) => a + (b - a) * t
const clamp = (x, lo, hi) => Math.max(lo, Math.min(hi, x))
const ease  = t => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2

/* Size the canvas backing store for the device pixel ratio, but keep the
   drawing coordinate system in CSS pixels via a base transform. Returns the
   CSS-pixel [W, H] so existing draw code is unchanged. */
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
   1. DATA MINING
   Concept: scattered points that slowly coalesce into
   three labeled clusters, then dissolve and repeat.
   ══════════════════════════════════════════════════════ */
export function DataMiningAnim({ className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf, W, H

    const CLUSTERS = [
      { cx: .28, cy: .38, color: C.juniper },
      { cx: .68, cy: .32, color: C.rust },
      { cx: .50, cy: .70, color: C.ash },
    ]
    const N = 54

    // Seed deterministic points
    const lcg = s => { s = (s ^ (s << 13)) ^ (s >>> 17) ^ (s << 5); return (s & 0x7fffffff) / 0x7fffffff }
    const pts = Array.from({ length: N }, (_, i) => ({
      sx: lcg(i * 1273 + 7),
      sy: lcg(i * 9871 + 3),
      cluster: i % 3,
      r: 2.2 + lcg(i * 331) * 1.6,
      phase: lcg(i * 557) * Math.PI * 2,
    }))

    function resize() { [W, H] = fitCanvas(canvas, ctx) }
    resize()

    const CYCLE = 5200 // ms per full cycle
    let t0 = null

    function frame(ts) {
      if (!t0) t0 = ts
      const elapsed = (ts - t0) % CYCLE
      // 0–40%: scatter → cluster   40–70%: hold   70–100%: dissolve
      let progress
      const pct = elapsed / CYCLE
      if (pct < .40)       progress = ease(pct / .40)
      else if (pct < .70)  progress = 1
      else                 progress = 1 - ease((pct - .70) / .30)

      ctx.clearRect(0, 0, W, H)

      // Background
      ctx.fillStyle = C.linen
      ctx.fillRect(0, 0, W, H)

      // Draw faint grid lines
      ctx.strokeStyle = C.ashLt
      ctx.lineWidth = .4
      ctx.globalAlpha = .35
      for (let gx = 0; gx <= 4; gx++) {
        ctx.beginPath(); ctx.moveTo(gx / 4 * W, 0); ctx.lineTo(gx / 4 * W, H); ctx.stroke()
      }
      for (let gy = 0; gy <= 3; gy++) {
        ctx.beginPath(); ctx.moveTo(0, gy / 3 * H); ctx.lineTo(W, gy / 3 * H); ctx.stroke()
      }
      ctx.globalAlpha = 1

      // Draw cluster halos
      CLUSTERS.forEach(cl => {
        const cx = cl.cx * W, cy = cl.cy * H
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, W * .18)
        const alpha = Math.round(progress * 28).toString(16).padStart(2, '0')
        grad.addColorStop(0, cl.color + alpha)
        grad.addColorStop(1, cl.color + '00')
        ctx.fillStyle = grad
        ctx.beginPath(); ctx.arc(cx, cy, W * .18, 0, Math.PI * 2); ctx.fill()
      })

      // Draw points
      pts.forEach((p, i) => {
        const cl   = CLUSTERS[p.cluster]
        const tx   = cl.cx * W
        const ty   = cl.cy * H
        const wobble = Math.sin(ts * .001 + p.phase) * 3 * (1 - progress)
        const x    = lerp(p.sx * W, tx + wobble, progress)
        const y    = lerp(p.sy * H, ty + wobble, progress)
        const alpha = lerp(.22, .9, progress)

        ctx.globalAlpha = alpha
        ctx.fillStyle = progress > .5 ? cl.color : C.ash
        ctx.beginPath()
        ctx.arc(x, y, p.r, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.globalAlpha = 1

      // Label clusters when clustered
      if (progress > .55) {
        const labelAlpha = clamp((progress - .55) / .15, 0, 1)
        ctx.globalAlpha = labelAlpha
        ctx.font = `500 ${Math.round(W * .045)}px "DM Mono", monospace`
        ctx.textAlign = 'center'
        const labels = ['Cluster A', 'Cluster B', 'Cluster C']
        CLUSTERS.forEach((cl, i) => {
          ctx.fillStyle = cl.color
          ctx.fillText(labels[i], cl.cx * W, cl.cy * H + W * .13)
        })
        ctx.globalAlpha = 1
      }

      // Axis labels
      ctx.font = `300 ${Math.round(W * .038)}px "DM Mono", monospace`
      ctx.fillStyle = C.ashLt
      ctx.textAlign = 'left'
      ctx.fillText('feature₁', W * .03, H - W * .04)
      ctx.save(); ctx.translate(W * .06, H * .5)
      ctx.rotate(-Math.PI / 2); ctx.textAlign = 'center'
      ctx.fillText('feature₂', 0, 0); ctx.restore()

      raf = requestAnimationFrame(frame)
    }

    raf = requestAnimationFrame(frame)
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <canvas
      ref={ref}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%' }}
      aria-hidden="true"
    />
  )
}

/* ══════════════════════════════════════════════════════
   2. DATA VISUALIZATION
   Concept: a small multi-series bar chart that builds
   bar by bar, then a line traces the trend, pauses,
   and the whole thing fades and restarts.
   ══════════════════════════════════════════════════════ */
export function DataVizAnim({ className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf, W, H

    const DATA = [
      [.42, .58],
      [.61, .35],
      [.28, .72],
      [.75, .50],
      [.53, .64],
      [.38, .80],
    ]
    const LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']

    function resize() { [W, H] = fitCanvas(canvas, ctx) }
    resize()

    const CYCLE = 6000
    let t0 = null

    function frame(ts) {
      if (!t0) t0 = ts
      const elapsed = (ts - t0) % CYCLE
      const pct = elapsed / CYCLE
      // 0–50%: bars build  50–80%: line traces  80–100%: fade out
      const barProg  = clamp(pct / .50, 0, 1)
      const lineProg = clamp((pct - .50) / .30, 0, 1)
      const fadeAlpha = pct > .82 ? 1 - ease((pct - .82) / .18) : 1

      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = C.linen
      ctx.fillRect(0, 0, W, H)
      ctx.globalAlpha = fadeAlpha

      const PAD  = { l: W * .10, r: W * .06, t: H * .10, b: H * .22 }
      const CW   = W - PAD.l - PAD.r
      const CH   = H - PAD.t - PAD.b
      const N    = DATA.length
      const BW   = (CW / N) * .38
      const GAP  = (CW / N) * .62

      // Axes
      ctx.strokeStyle = C.ashLt
      ctx.lineWidth = .8
      ctx.beginPath()
      ctx.moveTo(PAD.l, PAD.t)
      ctx.lineTo(PAD.l, PAD.t + CH)
      ctx.lineTo(PAD.l + CW, PAD.t + CH)
      ctx.stroke()

      // Y grid
      ctx.globalAlpha = fadeAlpha * .3
      ctx.strokeStyle = C.ashLt
      ctx.lineWidth = .5
      ;[.25, .50, .75, 1].forEach(g => {
        const y = PAD.t + CH - g * CH
        ctx.beginPath(); ctx.moveTo(PAD.l, y); ctx.lineTo(PAD.l + CW, y); ctx.stroke()
      })
      ctx.globalAlpha = fadeAlpha

      // Bars — Series A (juniper) and Series B (sand)
      DATA.forEach((d, i) => {
        const xC  = PAD.l + (i + .5) * (CW / N)
        const x0  = xC - BW
        const x1  = xC

        // bar A
        const hA = CH * d[0] * Math.min(1, barProg * N - i)
        if (hA > 0) {
          ctx.fillStyle = C.juniper
          ctx.globalAlpha = fadeAlpha * .82
          ctx.fillRect(x0, PAD.t + CH - hA, BW * .92, hA)
        }

        // bar B
        const hB = CH * d[1] * Math.min(1, barProg * N - i)
        if (hB > 0) {
          ctx.fillStyle = C.sand
          ctx.globalAlpha = fadeAlpha * .70
          ctx.fillRect(x1, PAD.t + CH - hB, BW * .92, hB)
        }

        // x labels
        ctx.globalAlpha = fadeAlpha * .6
        ctx.fillStyle = C.ash
        ctx.font = `300 ${Math.round(W * .038)}px "DM Mono", monospace`
        ctx.textAlign = 'center'
        ctx.fillText(LABELS[i], xC + BW * .46, PAD.t + CH + H * .09)
        ctx.globalAlpha = fadeAlpha
      })

      // Trend line over series A peaks
      if (lineProg > 0) {
        ctx.save()
        ctx.strokeStyle = C.rust
        ctx.lineWidth = 1.6
        ctx.lineJoin = 'round'
        ctx.lineCap  = 'round'
        ctx.setLineDash([4, 3])
        ctx.globalAlpha = fadeAlpha * .85

        const points = DATA.map((d, i) => ({
          x: PAD.l + (i + .5) * (CW / N),
          y: PAD.t + CH - CH * d[0],
        }))
        const maxI = Math.floor(lineProg * (points.length - 1))
        const frac = lineProg * (points.length - 1) - maxI

        ctx.beginPath()
        ctx.moveTo(points[0].x, points[0].y)
        for (let i = 1; i <= maxI; i++) ctx.lineTo(points[i].x, points[i].y)
        if (maxI < points.length - 1) {
          const p0 = points[maxI], p1 = points[maxI + 1]
          ctx.lineTo(lerp(p0.x, p1.x, frac), lerp(p0.y, p1.y, frac))
        }
        ctx.stroke()

        // Dot on front of line
        const front = maxI < points.length - 1
          ? { x: lerp(points[maxI].x, points[maxI + 1].x, frac), y: lerp(points[maxI].y, points[maxI + 1].y, frac) }
          : points[points.length - 1]
        ctx.setLineDash([])
        ctx.fillStyle = C.rust
        ctx.beginPath(); ctx.arc(front.x, front.y, 3.5, 0, Math.PI * 2); ctx.fill()
        ctx.restore()
      }

      // Legend
      ctx.globalAlpha = fadeAlpha * .75
      ctx.font = `300 ${Math.round(W * .036)}px "DM Mono", monospace`
      ctx.textAlign = 'left'
      ;[[C.juniper, 'Series A'], [C.sand, 'Series B']].forEach(([col, lbl], i) => {
        const lx = PAD.l + i * W * .38
        ctx.fillStyle = col
        ctx.fillRect(lx, PAD.t - H * .06, W * .026, W * .026)
        ctx.fillStyle = C.ash
        ctx.fillText(lbl, lx + W * .04, PAD.t - H * .03)
      })

      ctx.globalAlpha = 1
      raf = requestAnimationFrame(frame)
    }

    raf = requestAnimationFrame(frame)
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <canvas
      ref={ref}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%' }}
      aria-hidden="true"
    />
  )
}

/* ══════════════════════════════════════════════════════
   3. FUNDAMENTALS OF DATA SCIENCE
   Concept: a data science lifecycle pipeline — five
   nodes connected by edges, with a glowing packet
   traveling along the path in a continuous loop.
   ══════════════════════════════════════════════════════ */
export function FundamentalsAnim({ className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf, W, H

    const STEPS = ['Collect', 'Clean', 'Analyze', 'Visualize', 'Communicate']

    function resize() { [W, H] = fitCanvas(canvas, ctx) }
    resize()

    function nodePos(i) {
      // Lay out in an arc
      const n = STEPS.length
      const t = i / (n - 1)
      return {
        x: lerp(W * .12, W * .88, t),
        y: H * .42 - Math.sin(t * Math.PI) * H * .18,
      }
    }

    let t0 = null
    const PACKET_DUR = 3200 // ms for packet to traverse full pipeline
    const TRAIL = 8 // trail segments

    function drawNode(i, glowAmt) {
      const { x, y } = nodePos(i)
      const R = Math.max(W, H) * .042
      const colors = [C.ash, C.sand, C.juniper, C.rust, C.bark]

      // Glow
      if (glowAmt > 0) {
        const grad = ctx.createRadialGradient(x, y, 0, x, y, R * 2.4)
        grad.addColorStop(0, colors[i] + Math.round(glowAmt * 80).toString(16).padStart(2, '0'))
        grad.addColorStop(1, colors[i] + '00')
        ctx.fillStyle = grad
        ctx.beginPath(); ctx.arc(x, y, R * 2.4, 0, Math.PI * 2); ctx.fill()
      }

      // Node ring
      ctx.strokeStyle = colors[i]
      ctx.lineWidth = glowAmt > .5 ? 2 : 1.2
      ctx.globalAlpha = lerp(.45, 1, glowAmt)
      ctx.fillStyle = lerp === undefined ? C.linen : C.linen
      ctx.beginPath(); ctx.arc(x, y, R, 0, Math.PI * 2)
      ctx.fillStyle = C.linen; ctx.fill(); ctx.stroke()
      ctx.globalAlpha = 1

      // Label below
      ctx.font = `300 ${Math.round(Math.min(W, H) * .058)}px "DM Mono", monospace`
      ctx.textAlign = 'center'
      ctx.fillStyle = glowAmt > .4 ? colors[i] : C.ashLt
      ctx.globalAlpha = lerp(.5, 1, glowAmt)
      ctx.fillText(STEPS[i], x, y + R + H * .11)
      ctx.globalAlpha = 1
    }

    function getPacketPos(progress) {
      // progress 0–1 across all edges
      const n = STEPS.length - 1
      const seg = progress * n
      const i = Math.min(Math.floor(seg), n - 1)
      const t = seg - i
      const a = nodePos(i), b = nodePos(i + 1)
      return {
        x: lerp(a.x, b.x, ease(t)),
        y: lerp(a.y, b.y, ease(t)),
        nearNode: Math.min(t, 1 - t) < .12 ? (t < .5 ? i : i + 1) : -1,
        segIdx: i,
        segT: t,
      }
    }

    function frame(ts) {
      if (!t0) t0 = ts
      const elapsed = ts - t0

      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = C.linen
      ctx.fillRect(0, 0, W, H)

      const packetProg = (elapsed % PACKET_DUR) / PACKET_DUR

      // Draw edges
      for (let i = 0; i < STEPS.length - 1; i++) {
        const a = nodePos(i), b = nodePos(i + 1)
        // How far along the packet is on this segment
        const segProg = clamp(packetProg * (STEPS.length - 1) - i, 0, 1)
        // Lit portion of edge
        if (segProg > 0) {
          const midX = lerp(a.x, lerp(a.x, b.x, segProg), 1)
          ctx.strokeStyle = C.juniper
          ctx.lineWidth = 1.4
          ctx.globalAlpha = .55
          ctx.setLineDash([])
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(lerp(a.x, b.x, segProg), lerp(a.y, b.y, segProg))
          ctx.stroke()
        }
        // Unlit edge
        ctx.strokeStyle = C.ashLt
        ctx.lineWidth = 1
        ctx.globalAlpha = .3
        ctx.setLineDash([4, 4])
        const startT = clamp(packetProg * (STEPS.length - 1) - i, 0, 1)
        ctx.beginPath()
        ctx.moveTo(lerp(a.x, b.x, startT), lerp(a.y, b.y, startT))
        ctx.lineTo(b.x, b.y)
        ctx.stroke()
        ctx.setLineDash([])
        ctx.globalAlpha = 1
      }

      // Compute glow amounts per node
      const glows = STEPS.map((_, i) => {
        const d = Math.abs(packetProg * (STEPS.length - 1) - i)
        return clamp(1 - d / .7, 0, 1)
      })

      STEPS.forEach((_, i) => drawNode(i, glows[i]))

      // Packet + trail
      const pkt = getPacketPos(packetProg)
      for (let t = 0; t < TRAIL; t++) {
        const tProg = Math.max(0, packetProg - (t / TRAIL) * .04)
        const tp    = getPacketPos(tProg)
        const alpha = lerp(.08, .7, (TRAIL - t) / TRAIL)
        const r     = lerp(1.5, 5, (TRAIL - t) / TRAIL)
        ctx.globalAlpha = alpha
        ctx.fillStyle = C.juniper
        ctx.beginPath(); ctx.arc(tp.x, tp.y, r, 0, Math.PI * 2); ctx.fill()
      }

      // Packet head
      ctx.globalAlpha = 1
      const headGrad = ctx.createRadialGradient(pkt.x, pkt.y, 0, pkt.x, pkt.y, 9)
      headGrad.addColorStop(0, C.juniper + 'ff')
      headGrad.addColorStop(1, C.juniper + '00')
      ctx.fillStyle = headGrad
      ctx.beginPath(); ctx.arc(pkt.x, pkt.y, 9, 0, Math.PI * 2); ctx.fill()
      ctx.fillStyle = '#fff'
      ctx.beginPath(); ctx.arc(pkt.x, pkt.y, 3, 0, Math.PI * 2); ctx.fill()

      raf = requestAnimationFrame(frame)
    }

    raf = requestAnimationFrame(frame)
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <canvas
      ref={ref}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%' }}
      aria-hidden="true"
    />
  )
}

/* ══════════════════════════════════════════════════════
   4. NEURAL NETWORKS (INFO 557)
   Concept: feed-forward network (4→5→3→2), a forward
   pass pulse sweeps left→right activating edges and
   nodes, then a rust backprop sweep returns right→left.
   ══════════════════════════════════════════════════════ */
export function NeuralNetAnim({ className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf, W, H

    const SIZES  = [4, 5, 3, 2]
    const LABELS = ['input', 'hidden', 'hidden', 'output']
    const L = SIZES.length

    function resize() { [W, H] = fitCanvas(canvas, ctx) }
    resize()

    function nodePos(layer, node) {
      const n = SIZES[layer]
      const x = lerp(W * .11, W * .89, layer / (L - 1))
      const span = H * .64
      const top  = (H - span) / 2
      return {
        x,
        y: n === 1 ? H / 2 : top + node * span / (n - 1),
      }
    }

    function draw(fp, bp) {
      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = C.linen
      ctx.fillRect(0, 0, W, H)

      const R = Math.min(W, H) * .038

      // ── Edges ──
      for (let l = 0; l < L - 1; l++) {
        const segW = 1 / (L - 1)
        const fEdge = clamp((fp - l * segW) / segW, 0, 1)
        // Backprop goes right→left: layer L-2 → L-3 → ... → 0
        const bpSeg = L - 2 - l
        const bEdge = bp > 0 ? clamp((bp - bpSeg * segW) / segW, 0, 1) : 0

        for (let i = 0; i < SIZES[l]; i++) {
          for (let j = 0; j < SIZES[l + 1]; j++) {
            const a = nodePos(l, i)
            const b = nodePos(l + 1, j)
            if (bEdge > 0) {
              ctx.strokeStyle = C.rust
              ctx.lineWidth = .7
              ctx.globalAlpha = bEdge * .55
            } else if (fEdge > 0) {
              ctx.strokeStyle = C.juniper
              ctx.lineWidth = .7
              ctx.globalAlpha = fEdge * .45
            } else {
              ctx.strokeStyle = C.ashLt
              ctx.lineWidth = .4
              ctx.globalAlpha = .15
            }
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
            ctx.globalAlpha = 1
          }
        }
      }

      // ── Nodes ──
      for (let l = 0; l < L; l++) {
        const segW = 1 / (L - 1)
        // Input layer (l=0) starts active immediately; others after their segment begins
        const fNode = l === 0
          ? clamp(fp * 4, 0, 1)
          : clamp((fp - l * segW) / (segW * .9), 0, 1)
        // Backprop arrives right→left: output (L-1) first, input (0) last
        const bpLayer = L - 1 - l
        const bNode = bp > 0 ? clamp((bp - bpLayer * segW) / (segW * .9), 0, 1) : 0

        const isF = fNode > .05
        const isB = bNode > .05
        const nodeColor = isB ? C.rust : (isF ? C.juniper : C.ashLt)
        const glow = isB ? bNode : fNode

        for (let n = 0; n < SIZES[l]; n++) {
          const { x, y } = nodePos(l, n)

          // Glow halo
          if (glow > .1) {
            const g = ctx.createRadialGradient(x, y, 0, x, y, R * 2.8)
            g.addColorStop(0, nodeColor + Math.round(glow * 55).toString(16).padStart(2, '0'))
            g.addColorStop(1, nodeColor + '00')
            ctx.fillStyle = g
            ctx.beginPath(); ctx.arc(x, y, R * 2.8, 0, Math.PI * 2); ctx.fill()
          }

          // Node ring
          ctx.strokeStyle = nodeColor
          ctx.lineWidth = glow > .3 ? 1.5 : .8
          ctx.globalAlpha = lerp(.28, 1, glow)
          ctx.fillStyle = C.linen
          ctx.beginPath(); ctx.arc(x, y, R, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
          ctx.globalAlpha = 1

          // Output node fill when forward pass arrives
          if (l === L - 1 && fNode > .4) {
            ctx.fillStyle = C.juniper
            ctx.globalAlpha = ((fNode - .4) / .6) * .6
            ctx.beginPath(); ctx.arc(x, y, R * .42, 0, Math.PI * 2); ctx.fill()
            ctx.globalAlpha = 1
          }
        }

        // Layer caption at bottom
        ctx.font = `300 ${Math.round(Math.min(W, H) * .048)}px "DM Mono", monospace`
        ctx.textAlign = 'center'
        ctx.fillStyle = isB ? C.rust : (isF ? C.juniper : C.ashLt)
        ctx.globalAlpha = isF || isB ? .85 : .42
        ctx.fillText(LABELS[l], nodePos(l, 0).x, H * .94)
        ctx.globalAlpha = 1
      }
    }

    const FORWARD = 3600, BACKPROP = 1100, HOLD = 500
    const CYCLE = FORWARD + BACKPROP + HOLD
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let t0 = null

    function frame(ts) {
      if (!t0) t0 = ts
      const e = (ts - t0) % CYCLE
      let fp, bp
      if (e < FORWARD) {
        fp = ease(e / FORWARD); bp = 0
      } else if (e < FORWARD + BACKPROP) {
        fp = 1; bp = ease((e - FORWARD) / BACKPROP)
      } else {
        fp = 1; bp = 1
      }
      draw(fp, bp)
      raf = requestAnimationFrame(frame)
    }

    const onResize = () => { resize(); if (reduced) draw(.5, 0) }
    if (reduced) { draw(.5, 0) } else { raf = requestAnimationFrame(frame) }
    window.addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize) }
  }, [])

  return (
    <canvas
      ref={ref}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%' }}
      aria-hidden="true"
    />
  )
}

/* ══════════════════════════════════════════════════════
   5. DATA SCIENCE CAPSTONE (INFO 698)
   Concept: four inbound streams (sponsor, students,
   computing, mentorship) flow from the left edge and
   converge into a single keystone node on the right.
   Phase labels (Scope · Build · Deliver) at the top
   highlight as the animation progresses.
   ══════════════════════════════════════════════════════ */
export function CapstoneAnim({ className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf, W, H

    // Staggered start: each stream departs at delay * TRAVEL_MS
    const STREAMS = [
      { label: 'sponsor',    color: C.juniper, delay: 0    },
      { label: 'students',   color: C.sand,    delay: .18  },
      { label: 'computing',  color: C.rust,    delay: .34  },
      { label: 'mentorship', color: C.ash,     delay: .50  },
    ]
    const PHASES = ['Scope', 'Build', 'Deliver']

    function resize() { [W, H] = fitCanvas(canvas, ctx) }
    resize()

    function srcPos(i) {
      return { x: W * .14, y: lerp(H * .20, H * .80, i / (STREAMS.length - 1)) }
    }
    function keystonePos() { return { x: W * .80, y: H * .50 } }

    // streamT: 0→1 over the travel window for this stream
    function streamProgress(delay, elapsedMs, travelMs) {
      if (elapsedMs < delay * travelMs) return 0
      return clamp((elapsedMs - delay * travelMs) / ((1 - delay) * travelMs), 0, 1)
    }

    const TRAVEL = 2800, HOLD = 700
    const CYCLE = TRAVEL + HOLD
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let t0 = null

    function draw(elapsedMs) {
      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = C.linen
      ctx.fillRect(0, 0, W, H)

      const KP = keystonePos()
      const KR = Math.min(W, H) * .062
      const SR = Math.min(W, H) * .030

      // Phase of cycle: 0=travel, 1=hold
      const inHold = elapsedMs >= TRAVEL
      // Phase label progress (0→3 over travel)
      const phaseProg = Math.min(elapsedMs / TRAVEL, 1)

      // ── Phase labels at top ──
      ctx.font = `300 ${Math.round(Math.min(W, H) * .048)}px "DM Mono", monospace`
      ctx.textAlign = 'center'
      const phaseSpacing = W / (PHASES.length + 1)
      PHASES.forEach((ph, pi) => {
        // Active phase bracket: 0→0.33 = Scope, 0.33→0.67 = Build, 0.67→1.0 = Deliver
        const phaseActive = phaseProg >= pi / PHASES.length
        ctx.fillStyle = phaseActive ? C.juniper : C.ashLt
        ctx.globalAlpha = phaseActive ? .85 : .35
        ctx.fillText(ph, phaseSpacing * (pi + 1), H * .10)
        // Separator dot between phases
        if (pi < PHASES.length - 1) {
          ctx.fillStyle = C.ashLt
          ctx.globalAlpha = .3
          ctx.fillText('·', phaseSpacing * (pi + 1) + phaseSpacing / 2, H * .10)
        }
      })
      ctx.globalAlpha = 1

      // ── Stream progress values ──
      const sProgress = STREAMS.map(s => streamProgress(s.delay, elapsedMs, TRAVEL))
      const avgProgress = sProgress.reduce((a, b) => a + b, 0) / STREAMS.length
      const allArrived = inHold

      // ── Faint guide lines ──
      STREAMS.forEach((s, i) => {
        const sp = srcPos(i)
        ctx.strokeStyle = s.color
        ctx.lineWidth = .4
        ctx.globalAlpha = .10
        ctx.setLineDash([3, 5])
        ctx.beginPath(); ctx.moveTo(sp.x, sp.y); ctx.lineTo(KP.x, KP.y); ctx.stroke()
        ctx.setLineDash([])
        ctx.globalAlpha = 1
      })

      // ── Keystone glow and fill ──
      const keystoneAlpha = allArrived ? 1 : avgProgress
      if (keystoneAlpha > 0.05) {
        const holdE = inHold ? (elapsedMs - TRAVEL) / HOLD : 0
        const pulse = allArrived ? .75 + .25 * Math.sin(holdE * Math.PI * 4) : avgProgress * .5
        const g = ctx.createRadialGradient(KP.x, KP.y, 0, KP.x, KP.y, KR * 3.2)
        g.addColorStop(0, C.juniper + Math.round(pulse * 70).toString(16).padStart(2, '0'))
        g.addColorStop(1, C.juniper + '00')
        ctx.fillStyle = g
        ctx.beginPath(); ctx.arc(KP.x, KP.y, KR * 3.2, 0, Math.PI * 2); ctx.fill()
      }

      ctx.strokeStyle = C.juniper
      ctx.lineWidth = allArrived ? 2 : 1.2
      ctx.fillStyle = allArrived ? C.juniper : C.linen
      ctx.globalAlpha = lerp(.35, 1, keystoneAlpha)
      ctx.beginPath(); ctx.arc(KP.x, KP.y, KR, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
      ctx.globalAlpha = 1

      // Inner ring indicator
      if (avgProgress > .05) {
        ctx.fillStyle = allArrived ? C.linen : C.juniper
        ctx.globalAlpha = allArrived ? .85 : avgProgress * .55
        ctx.beginPath(); ctx.arc(KP.x, KP.y, KR * .40, 0, Math.PI * 2); ctx.fill()
        ctx.globalAlpha = 1
      }

      // Keystone label
      ctx.font = `300 ${Math.round(Math.min(W, H) * .048)}px "DM Mono", monospace`
      ctx.textAlign = 'center'
      ctx.fillStyle = allArrived ? C.linen : C.juniper
      ctx.globalAlpha = .80
      ctx.fillText('capstone', KP.x, KP.y + KR + H * .10)
      ctx.globalAlpha = 1

      // ── Stream source nodes + particles ──
      STREAMS.forEach((s, i) => {
        const sp = srcPos(i)
        const st = sProgress[i]
        const arrived = st >= 1

        // Source node
        ctx.strokeStyle = s.color
        ctx.lineWidth = .9
        ctx.fillStyle = C.linen
        ctx.globalAlpha = arrived ? .25 : lerp(.38, .88, ease(st))
        ctx.beginPath(); ctx.arc(sp.x, sp.y, SR, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
        ctx.globalAlpha = 1

        // Source label (right of node)
        ctx.font = `300 ${Math.round(Math.min(W, H) * .046)}px "DM Mono", monospace`
        ctx.textAlign = 'left'
        ctx.fillStyle = arrived ? C.ashLt : s.color
        ctx.globalAlpha = arrived ? .30 : lerp(.45, .85, ease(st))
        ctx.fillText(s.label, sp.x + SR + W * .015, sp.y + Math.min(W, H) * .016)
        ctx.globalAlpha = 1

        // Particle in transit
        if (st > 0 && st < 1) {
          const px = lerp(sp.x, KP.x, ease(st))
          const py = lerp(sp.y, KP.y, ease(st))

          // Trail
          for (let t = 1; t <= 6; t++) {
            const tBack = Math.max(0, st - t * .045)
            const tx = lerp(sp.x, KP.x, ease(tBack))
            const ty = lerp(sp.y, KP.y, ease(tBack))
            ctx.fillStyle = s.color
            ctx.globalAlpha = ((6 - t) / 6) * .38
            ctx.beginPath(); ctx.arc(tx, ty, lerp(1.2, 3.5, (6 - t) / 6), 0, Math.PI * 2); ctx.fill()
          }
          ctx.globalAlpha = 1

          // Head
          ctx.fillStyle = s.color
          ctx.globalAlpha = .92
          ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill()
          ctx.fillStyle = C.linen
          ctx.globalAlpha = .80
          ctx.beginPath(); ctx.arc(px, py, 1.8, 0, Math.PI * 2); ctx.fill()
          ctx.globalAlpha = 1
        }
      })
    }

    function frame(ts) {
      if (!t0) t0 = ts
      draw((ts - t0) % CYCLE)
      raf = requestAnimationFrame(frame)
    }

    const onResize = () => { resize(); if (reduced) draw(TRAVEL) }
    if (reduced) { draw(TRAVEL) } else { raf = requestAnimationFrame(frame) }
    window.addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize) }
  }, [])

  return (
    <canvas
      ref={ref}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%' }}
      aria-hidden="true"
    />
  )
}

/* ══════════════════════════════════════════════════════
   0. INTRO TO MACHINE LEARNING (INFO 521)
   Concept: juniper scatter around a latent linear trend;
   a rust best-fit line animates from a deliberately poor
   starting slope toward the least-squares solution as
   ash residual segments shrink; "least squares" label
   appears at convergence, then the line gently flexes
   into a curve hinting at model refinement, then resets.
   ══════════════════════════════════════════════════════ */
export function RegressionAnim({ className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf, W, H

    const lcg = s => {
      s = (s ^ (s << 13)) ^ (s >>> 17) ^ (s << 5)
      return (s & 0x7fffffff) / 0x7fffffff
    }

    // True line and bad initial line (normalized plot-area coords, y ↓ = screen-down)
    const M_TRUE = 0.48,  B_TRUE = 0.10
    const M_BAD  = -0.28, B_BAD  = 0.80

    const N = 26
    const pts = Array.from({ length: N }, (_, i) => {
      const xn = 0.04 + lcg(i * 1273 + 7) * 0.92
      const yn = clamp(M_TRUE * xn + B_TRUE + (lcg(i * 9871 + 3) - 0.5) * 0.26, 0.02, 0.97)
      return { xn, yn, r: 2.3 + lcg(i * 331) * 1.4 }
    })

    // Plot-area padding (fractions of canvas dimensions)
    const PL = 0.13, PR = 0.05, PT = 0.13, PB = 0.20

    function ptX(xn) { return (PL + xn * (1 - PL - PR)) * W }
    function ptY(yn) { return (PT + yn * (1 - PT - PB)) * H }
    function lineY(xn, m, b) { return ptY(m * xn + b) }

    function resize() { [W, H] = fitCanvas(canvas, ctx) }
    resize()

    // Phase durations (ms)
    const FIT   = 2600   // bad → least-squares convergence
    const HOLD  = 900    // pause — "least squares" label visible
    const CRVE  = 780    // gentle model-refinement flex
    const HOLD2 = 480    // hold curve
    const FADE  = 440    // fade out before reset
    const CYCLE = FIT + HOLD + CRVE + HOLD2 + FADE

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let t0 = null

    function draw(e) {
      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = C.linen
      ctx.fillRect(0, 0, W, H)

      // End-of-cycle global fade
      const fadeAlpha = e > FIT + HOLD + CRVE + HOLD2
        ? 1 - ease((e - FIT - HOLD - CRVE - HOLD2) / FADE)
        : 1

      // Current line parameters: lerp from bad → LS
      const fitProg = clamp(ease(e / FIT), 0, 1)
      const m = lerp(M_BAD, M_TRUE, fitProg)
      const b = lerp(B_BAD, B_TRUE, fitProg)

      // Curve flex (0 during FIT/HOLD, rises during CRVE)
      const curveProg = e > FIT + HOLD
        ? clamp(ease((e - FIT - HOLD) / CRVE), 0, 1)
        : 0

      // ── Axes ──
      ctx.strokeStyle = C.ashLt
      ctx.lineWidth = .8
      ctx.globalAlpha = .50 * fadeAlpha
      ctx.beginPath()
      ctx.moveTo(ptX(0), ptY(0))
      ctx.lineTo(ptX(0), ptY(1))
      ctx.lineTo(ptX(1), ptY(1))
      ctx.stroke()
      ctx.globalAlpha = 1

      // ── Residual segments (ash, dashed) — naturally shrink as line approaches LS ──
      const resAlpha = clamp(1.1 - fitProg, 0.08, 0.55) * fadeAlpha
      ctx.strokeStyle = C.ash
      ctx.lineWidth = .6
      ctx.globalAlpha = resAlpha
      ctx.setLineDash([2, 3])
      pts.forEach(p => {
        ctx.beginPath()
        ctx.moveTo(ptX(p.xn), ptY(p.yn))
        ctx.lineTo(ptX(p.xn), lineY(p.xn, m, b))
        ctx.stroke()
      })
      ctx.setLineDash([])
      ctx.globalAlpha = 1

      // ── Best-fit line (rust, with optional curve flex) ──
      const x0 = ptX(0), x1 = ptX(1)
      const y0 = lineY(0, m, b), y1 = lineY(1, m, b)
      // Control point: midpoint pulled upward for a concave arc at full flex
      const cpX = (x0 + x1) / 2
      const cpY = (y0 + y1) / 2 - curveProg * H * 0.12

      ctx.strokeStyle = C.rust
      ctx.lineWidth = 1.8
      ctx.lineCap  = 'round'
      ctx.globalAlpha = (fitProg * .72 + .12) * fadeAlpha
      ctx.beginPath()
      if (curveProg > 0.02) {
        ctx.moveTo(x0, y0)
        ctx.quadraticCurveTo(cpX, cpY, x1, y1)
      } else {
        ctx.moveTo(x0, y0)
        ctx.lineTo(x1, y1)
      }
      ctx.stroke()
      ctx.globalAlpha = 1

      // ── Data points (juniper) ──
      ctx.fillStyle = C.juniper
      ctx.globalAlpha = 0.76 * fadeAlpha
      pts.forEach(p => {
        ctx.beginPath()
        ctx.arc(ptX(p.xn), ptY(p.yn), p.r, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.globalAlpha = 1

      // ── "least squares" label: fades in near convergence, out when curve starts ──
      if (e > FIT * 0.85) {
        const fadeIn  = ease(clamp((e - FIT * 0.85) / (FIT * 0.15), 0, 1))
        const fadeOut = curveProg > 0 ? ease(Math.min(curveProg * 3, 1)) : 0
        const lAlpha  = fadeIn * (1 - fadeOut) * fadeAlpha
        if (lAlpha > 0.01) {
          ctx.globalAlpha = lAlpha
          ctx.font = `300 ${Math.round(W * .042)}px "DM Mono", monospace`
          ctx.textAlign = 'right'
          ctx.fillStyle = C.rust
          ctx.fillText('least squares', ptX(0.92), lineY(0.92, M_TRUE, B_TRUE) - H * .044)
          ctx.globalAlpha = 1
        }
      }

      // ── Axis labels ──
      ctx.font = `300 ${Math.round(W * .038)}px "DM Mono", monospace`
      ctx.fillStyle = C.ashLt
      ctx.globalAlpha = .42 * fadeAlpha
      ctx.textAlign = 'center'
      ctx.fillText('x', ptX(.5), ptY(1) + H * .10)
      ctx.save()
      ctx.translate(W * .055, ptY(.5))
      ctx.rotate(-Math.PI / 2)
      ctx.fillText('y', 0, 0)
      ctx.restore()
      ctx.globalAlpha = 1
    }

    function frame(ts) {
      if (!t0) t0 = ts
      draw((ts - t0) % CYCLE)
      raf = requestAnimationFrame(frame)
    }

    // Reduced motion: static frame at LS convergence with label visible
    const onResize = () => { resize(); if (reduced) draw(FIT * 0.96 + HOLD * 0.4) }
    if (reduced) { draw(FIT * 0.96 + HOLD * 0.4) } else { raf = requestAnimationFrame(frame) }
    window.addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize) }
  }, [])

  return (
    <canvas
      ref={ref}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%' }}
      aria-hidden="true"
    />
  )
}
