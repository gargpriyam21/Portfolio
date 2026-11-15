import { useEffect, useRef } from 'react'

// A paragraph that brightens word by word as it scrolls up through the
// viewport. Without JavaScript, or with reduced motion, it is fully lit.
export default function RevealText({ text, as: Tag = 'p', className = '' }) {
  const ref = useRef(null)
  const words = text.split(/\s+/)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    const update = () => {
      frame = 0
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      // 0 when the top enters the lower part of the screen, 1 when the
      // paragraph has risen to the upper third.
      const p = (vh * 0.85 - rect.top) / (rect.height + vh * 0.45)
      el.style.setProperty('--p', Math.min(1, Math.max(0, p)).toFixed(3))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <Tag ref={ref} className={className} style={{ '--n': words.length }}>
      {words.map((w, i) => (
        <span key={i} className="reveal-word" style={{ '--i': i }}>
          {w}{' '}
        </span>
      ))}
    </Tag>
  )
}
