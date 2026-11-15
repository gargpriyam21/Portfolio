import { useEffect, useRef, useState } from 'react'
import { profile } from '../data/profile.js'

// A one-line drawing of the Seattle skyline: mountain, downtown, the Space Needle,
// the waterfront wheel and the water, all as a single continuous stroke.
// The line draws itself once, the first time it scrolls into view.
const LINE =
  'M0,200 H40 L110,150 L140,168 L200,96 L228,120 L244,112 L310,200 H340 ' +
  'V150 H366 V170 H382 V118 H414 V200 H426 V134 H450 V96 L462,84 L474,96 V200 ' +
  'H486 V70 H493 V52 H500 V70 H518 V200 H530 V140 H556 V200 H580 ' +
  'L592,200 L596,92 L570,86 L580,76 L596,72 L599,62 L600,22 L601,62 L604,72 L620,76 L630,86 L604,92 L608,200 H640 ' +
  'V128 H672 V158 H690 V200 H704 V108 H736 V146 H756 V200 H780 V162 H808 V200 H850 ' +
  'V182 A32,32 0 1 1 850.1,182 V200 H900 ' +
  'q14,-12 28,0 t28,0 t28,0 t28,0 t28,0 t28,0 t28,0 t28,0 t28,0 t28,0 H1200'

export default function Skyline() {
  const ref = useRef(null)
  const [drawn, setDrawn] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) {
      setDrawn(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  if (!profile.location) return null

  // The flat baseline of the drawing doubles as a divider, so it needs no border.
  return (
    <div ref={ref} className="flex justify-center overflow-hidden">
      <svg
        viewBox="0 12 1200 198"
        role="img"
        aria-label="Line drawing of the Seattle skyline with the Space Needle"
        className="w-[max(100%,46rem)] shrink-0"
      >
        <path
          d={LINE}
          pathLength="1"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          className={`skyline-line ${drawn ? 'is-drawn' : ''}`}
        />
      </svg>
    </div>
  )
}

// Small Space Needle glyph for the location line in the hero.
export function NeedleIcon({ className = 'size-5' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 2v5" />
      <path d="M5 10c2.2-2.7 11.8-2.7 14 0l-3.5 2h-7z" />
      <path d="M10 12 8.5 22" />
      <path d="M14 12l1.5 10" />
      <path d="M7 22h10" />
    </svg>
  )
}
