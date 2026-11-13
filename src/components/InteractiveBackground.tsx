import { useEffect, useRef } from 'react'
import { useApp } from '../context/AppContext'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  baseAlpha: number
  phase: number
}

interface Glyph {
  x: number
  y: number
  vx: number
  vy: number
  text: string
  alpha: number
  size: number
  rot: number
  vr: number
}

const GLYPHS = ['</>', '{ }', '01', '//', '=>', '[]', '&&', 'fn']

export function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const { theme } = useApp()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0
    let dpr = 1
    let raf = 0
    let t = 0
    const mouse = { x: -9999, y: -9999, active: false }
    const particles: Particle[] = []
    const glyphs: Glyph[] = []

    const resize = () => {
      const mobile = window.innerWidth < 768
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const base = mobile ? 28 : Math.min(110, Math.max(65, Math.floor((w * h) / 18000)))
      const target = mobile ? Math.min(28, base) : base
      while (particles.length < target) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          r: 2 + Math.random() * 2,
          baseAlpha: 0.55 + Math.random() * 0.25,
          phase: Math.random() * Math.PI * 2,
        })
      }
      while (particles.length > target) particles.pop()

      const gTarget = mobile ? Math.min(10, Math.max(6, Math.floor(w / 120))) : Math.min(22, Math.max(10, Math.floor(w / 90)))
      while (glyphs.length < gTarget) {
        glyphs.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.18,
          vy: -0.12 - Math.random() * 0.18,
          text: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
          alpha: 0.18 + Math.random() * 0.12,
          size: 11 + Math.random() * 6,
          rot: (Math.random() - 0.5) * 0.4,
          vr: (Math.random() - 0.5) * 0.002,
        })
      }
      while (glyphs.length > gTarget) glyphs.pop()
    }

    const onMove = (clientX: number, clientY: number) => {
      mouse.x = clientX
      mouse.y = clientY
      mouse.active = true
    }
    const onPointerMove = (e: PointerEvent) => onMove(e.clientX, e.clientY)
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length) onMove(e.touches[0].clientX, e.touches[0].clientY)
    }
    const onLeave = () => { mouse.active = false }

    const draw = () => {
      t += 0.012
      ctx.clearRect(0, 0, w, h)
      const dark = theme === 'dark'
      const nodeRgb = dark ? '13,148,136' : '15,118,110'
      const nodeAltRgb = dark ? '6,182,212' : '100,116,139'
      const lineRgb = dark ? '13,148,136' : '15,118,110'
      const cursorRgb = dark ? '6,182,212' : '100,116,139'
      const lineBase = dark ? 0.35 : 0.18
      const pulseMul = dark ? 1.4 : 1.1
      const cursorLineBase = dark ? 0.55 : 0.22
      const nodeAlphaMul = dark ? 1 : 0.32
      const haloMul = dark ? 0.35 : 0.2
      const glowCenter = dark ? 'rgba(13,148,136,0.16)' : 'rgba(15,118,110,0.1)'
      const glowMid = dark ? 'rgba(6,182,212,0.06)' : 'rgba(100,116,139,0.05)'
      const glyphAlphaBase = dark ? 0.07 : 0
      const glyphRgb = dark ? '148,163,184' : '100,116,139'

      for (const p of particles) {
        if (mouse.active) {
          const dx = mouse.x - p.x
          const dy = mouse.y - p.y
          const dist = Math.hypot(dx, dy)
          if (dist < 220 && dist > 0.001) {
            const force = (1 - dist / 220) * 0.015
            p.vx -= (dx / dist) * force
            p.vy -= (dy / dist) * force
          }
        }
        p.vx *= 0.995
        p.vy *= 0.995
        const speed = Math.hypot(p.vx, p.vy)
        if (speed < 0.15) { p.vx += (Math.random() - 0.5) * 0.02; p.vy += (Math.random() - 0.5) * 0.02 }
        if (speed > 0.8) { p.vx *= 0.95; p.vy *= 0.95 }
        p.x += p.vx
        p.y += p.vy
        if (p.x < -30) p.x = w + 30
        if (p.x > w + 30) p.x = -30
        if (p.y < -30) p.y = h + 30
        if (p.y > h + 30) p.y = -30
      }

      const maxDist = 150
      const mouseDist = 200
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * lineBase
            ctx.strokeStyle = `rgba(${lineRgb},${alpha})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()

            const pulsePos = (t * 0.6 + i * 0.13 + j * 0.07) % 1
            const px = a.x + (b.x - a.x) * pulsePos
            const py = a.y + (b.y - a.y) * pulsePos
            ctx.fillStyle = `rgba(${nodeAltRgb},${alpha * pulseMul})`
            ctx.beginPath()
            ctx.arc(px, py, 1.6, 0, Math.PI * 2)
            ctx.fill()
          }
        }
        if (mouse.active) {
          const dxm = a.x - mouse.x
          const dym = a.y - mouse.y
          const dm = Math.hypot(dxm, dym)
          if (dm < mouseDist) {
            ctx.strokeStyle = `rgba(${cursorRgb},${(1 - dm / mouseDist) * cursorLineBase})`
            ctx.lineWidth = 1.2
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.stroke()
          }
        }
        const twinkle = 0.75 + 0.25 * Math.sin(t * 1.4 + a.phase)
        const aAlpha = a.baseAlpha * twinkle * nodeAlphaMul
        ctx.fillStyle = `rgba(${nodeRgb},${aAlpha})`
        ctx.beginPath()
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = `rgba(${nodeAltRgb},${aAlpha * haloMul})`
        ctx.beginPath()
        ctx.arc(a.x, a.y, a.r * 2.2, 0, Math.PI * 2)
        ctx.fill()
      }

      if (mouse.active) {
        const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 180)
        grad.addColorStop(0, glowCenter)
        grad.addColorStop(0.5, glowMid)
        grad.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, 180, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      for (const g of glyphs) {
        g.x += g.vx + Math.sin(t * 0.7 + g.y * 0.01) * 0.08
        g.y += g.vy
        g.rot += g.vr
        if (g.y < -40) { g.y = h + 40; g.x = Math.random() * w }
        if (g.x < -40) g.x = w + 40
        if (g.x > w + 40) g.x = -40
        ctx.save()
        ctx.translate(g.x, g.y)
        ctx.rotate(g.rot)
        ctx.font = `500 ${g.size}px "JetBrains Mono", ui-monospace, monospace`
        ctx.fillStyle = `rgba(${glyphRgb},${g.alpha * (dark ? 1.4 : 0.9) + glyphAlphaBase})`
        ctx.fillText(g.text, 0, 0)
        ctx.restore()
      }

      raf = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerleave', onLeave)
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onLeave, { passive: true })
    raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onLeave)
    }
  }, [theme])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden print:hidden" aria-hidden="true">
      <div className="absolute inset-0">
        <div
          className="absolute -left-24 -top-24 h-[34rem] w-[34rem] rounded-full blur-3xl"
          style={{
            background: theme === 'dark' ? 'rgba(13,148,136,0.22)' : 'rgba(15,118,110,0.16)',
            animation: 'orb-drift-a 22s ease-in-out infinite',
          }}
        />
        <div
          className="absolute right-[-10%] top-[20%] h-[30rem] w-[30rem] rounded-full blur-3xl"
          style={{
            background: theme === 'dark' ? 'rgba(6,182,212,0.16)' : 'rgba(100,116,139,0.14)',
            animation: 'orb-drift-b 25s ease-in-out infinite',
          }}
        />
        <div
          className="absolute bottom-[-12%] left-[25%] h-[32rem] w-[32rem] rounded-full blur-3xl"
          style={{
            background: theme === 'dark' ? 'rgba(59,130,246,0.14)' : 'rgba(15,118,110,0.14)',
            animation: 'orb-drift-c 19s ease-in-out infinite',
          }}
        />
      </div>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  )
}
