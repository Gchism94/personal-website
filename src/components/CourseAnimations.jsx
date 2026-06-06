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

    function resize() {
      W = canvas.width  = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }
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

    function resize() {
      W = canvas.width  = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }
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

    function resize() {
      W = canvas.width  = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }
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
