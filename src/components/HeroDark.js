'use client'

import { useEffect, useRef } from 'react'
import styles from './HeroDark.module.css'

export default function HeroDark() {
  const canvasRef = useRef(null)
  const heroRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const hero = heroRef.current
    if (!canvas || !hero) return

    const TWO_PI = Math.PI * 2

    function mulberry32(seed) {
      return () => {
        let t = seed += 0x6D2B79F5
        t = Math.imul(t ^ t >>> 15, t | 1)
        t ^= t + Math.imul(t ^ t >>> 7, t | 61)
        return ((t ^ t >>> 14) >>> 0) / 4294967296
      }
    }

    const starCtx = canvas.getContext('2d', { alpha: false })

    function starColor(r) {
      const t = r()
      if (t < 0.003) return [160,185,255]
      if (t < 0.025) return [175,205,255]
      if (t < 0.085) return [215,232,255]
      if (t < 0.190) return [255,248,220]
      if (t < 0.380) return [255,228,158]
      if (t < 0.680) return [255,192,108]
      return                [255,148, 88]
    }

    function drawStarfield() {
      const dpr  = Math.min(window.devicePixelRatio || 1, 2)
      const cssW = Math.max(320, window.innerWidth)
      const cssH = Math.max(500, window.innerHeight)
      const W = Math.floor(cssW * dpr)
      const H = Math.floor(cssH * dpr)

      canvas.width  = W; canvas.height  = H
      canvas.style.width  = cssW + 'px'
      canvas.style.height = cssH + 'px'

      const rand = mulberry32(0xC0DE5EED)

      const bg = starCtx.createLinearGradient(0, 0, 0, H)
      bg.addColorStop(0,   '#06091a')
      bg.addColorStop(0.5, '#040815')
      bg.addColorStop(1,   '#02040a')
      starCtx.fillStyle = bg
      starCtx.fillRect(0, 0, W, H)

      const softGlow = (x, y, r, col, a) => {
        const g = starCtx.createRadialGradient(x, y, 0, x, y, r)
        g.addColorStop(0,    `rgba(${col},${a})`)
        g.addColorStop(0.45, `rgba(${col},${a * 0.28})`)
        g.addColorStop(1,    `rgba(${col},0)`)
        starCtx.fillStyle = g
        starCtx.beginPath()
        starCtx.arc(x, y, r, 0, TWO_PI)
        starCtx.fill()
      }
      softGlow(W * 0.72, H * 0.18, H * 0.38, '48,58,110', 0.10)
      softGlow(W * 0.18, H * 0.80, H * 0.30, '12,44,62',  0.08)

      const mobile = cssW < 760
      const total  = Math.floor(W * H / (mobile ? 1200 : 1800))

      for (let i = 0; i < total; i++) {
        const x   = rand() * W
        const y   = rand() * H
        const col = starColor(rand)
        const sz  = rand()
        const r   = sz < 0.72 ? (rand() * 0.38 + 0.12) * dpr
                  : sz < 0.96 ? (rand() * 0.55 + 0.38) * dpr
                  :             (rand() * 0.90 + 0.70) * dpr
        const alpha = rand() * 0.55 + 0.18

        starCtx.fillStyle = `rgba(${col[0]},${col[1]},${col[2]},${alpha})`
        starCtx.beginPath()
        starCtx.arc(x, y, r, 0, TWO_PI)
        starCtx.fill()

        if (rand() > 0.988) {
          const gr = starCtx.createRadialGradient(x, y, 0, x, y, r * 9)
          gr.addColorStop(0, `rgba(${col[0]},${col[1]},${col[2]},${alpha * 0.18})`)
          gr.addColorStop(1, `rgba(${col[0]},${col[1]},${col[2]},0)`)
          starCtx.fillStyle = gr
          starCtx.beginPath()
          starCtx.arc(x, y, r * 9, 0, TWO_PI)
          starCtx.fill()
        }
      }

      const shade = starCtx.createRadialGradient(W * 0.08, H * 0.88, 0, W * 0.08, H * 0.88, H * 0.38)
      shade.addColorStop(0, 'rgba(2,4,10,.28)')
      shade.addColorStop(1, 'rgba(2,4,10,0)')
      starCtx.fillStyle = shade
      starCtx.fillRect(0, 0, W, H)
    }

    drawStarfield()
    let resizeTimer
    const onResize = () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(drawStarfield, 150) }
    window.addEventListener('resize', onResize)

    // Meteors
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return () => { window.removeEventListener('resize', onResize); clearTimeout(resizeTimer) }
    }

    const rand = mulberry32(0xDEADC0DE)
    const ANGLE_DEG = 141
    const COS = Math.cos((180 - ANGLE_DEG) * Math.PI / 180)
    const SIN = Math.sin((180 - ANGLE_DEG) * Math.PI / 180)
    const TOTAL = 16
    const LONG_COUNT = Math.round(TOTAL * 0.40)

    function rnd(min, max) { return min + rand() * (max - min) }

    function createMeteors() {
      hero.querySelectorAll('.meteor').forEach(el => el.remove())
      const vw = window.innerWidth
      const delays = Array.from({ length: TOTAL }, () => -rnd(0, 20))

      for (let i = 0; i < TOTAL; i++) {
        const isLong = i < LONG_COUNT
        const startX = rnd(5, 95)
        const startY = rnd(3, 75)
        const travelScreenPx = isLong ? rnd(0.55, 0.85) * vw : rnd(0.08, 0.22) * vw
        const travelX = -(travelScreenPx * COS)
        const travelY =   travelScreenPx * SIN
        const barWidth = isLong ? rnd(9, 15) : rnd(4, 8.5)
        const dur = isLong ? rnd(12, 20) : rnd(9, 17)
        const el = document.createElement('div')
        el.className = 'meteor'
        el.setAttribute('aria-hidden', 'true')
        el.style.cssText = `left:${startX}%;top:${startY}%;width:${barWidth}rem;--travel-x:${travelX.toFixed(1)}px;--travel-y:${travelY.toFixed(1)}px;--dur:${dur.toFixed(2)}s;--delay:${delays[i].toFixed(2)}s;`
        hero.appendChild(el)
      }
    }

    createMeteors()
    const onResizeMeteors = () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(createMeteors, 200) }
    window.addEventListener('resize', onResizeMeteors)

    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('resize', onResizeMeteors)
      clearTimeout(resizeTimer)
    }
  }, [])

  return (
    <div className={styles.heroDark} ref={heroRef} aria-label="Greg T. Chism personal site hero">
      <canvas id="stars-canvas" ref={canvasRef} aria-hidden="true" />
      <div className={styles.grain}    aria-hidden="true" />
      <div className={styles.vignette} aria-hidden="true" />
      <section className={styles.content}>
        <p className={styles.eyebrow}>Data Scientist · Bend, OR</p>
        <h1>Greg<br />T. <em>Chism</em></h1>
        <p className={styles.lede}>Turning complex data into decisions that matter — for universities, health systems, and the communities between them.</p>
      </section>
    </div>
  )
}
