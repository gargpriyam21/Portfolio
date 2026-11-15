import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { MousePointerClick } from 'lucide-react'
import { profile } from '../data/profile.js'
import Section from './Section.jsx'
import Logo from './Logo.jsx'
import Photo from './Photo.jsx'

// Career as a route: one line runs through time on two lanes, professional career
// on top and education below, and switches lanes at each move. Every stop is a button;
// the chosen stop's details open in the panel under the line.

const ROW = 34 // height of one row of labels
const BTN = 30 // label button height
const LANE_GAP = 64 // distance between the two lanes
const FONT = '500 14px "IBM Plex Sans", system-ui, sans-serif'

const toYear = (ym, now) => {
  if (!ym) return now
  const [y, m] = ym.split('-').map(Number)
  return y + (m - 1) / 12
}

let canvas
function textWidth(text) {
  canvas = canvas || document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  ctx.font = FONT
  return ctx.measureText(text).width
}

// Places labels in rows so none overlap: each label takes the first row whose
// last label ends before it starts.
function stackRows(items) {
  const ends = []
  for (const it of [...items].sort((a, b) => a.left - b.left)) {
    let r = ends.findIndex((end) => it.left >= end + 6)
    if (r === -1) r = ends.length
    ends[r] = it.left + it.w
    it.row = r
  }
  return ends.length
}

function useWidth() {
  const ref = useRef(null)
  const [width, setWidth] = useState(0)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const measure = () => setWidth(el.clientWidth)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    document.fonts?.ready.then(measure)
    return () => ro.disconnect()
  }, [])
  return [ref, width]
}

function layout(route, width) {
  const d = new Date()
  const now = d.getFullYear() + d.getMonth() / 12
  const narrow = width < 560
  const gutter = narrow ? 0 : 92
  const t0 = Math.floor(toYear(route[0].from, now))
  const t1 = Math.floor(now) + 1
  const plot = width - gutter - 4
  const x = (t) => gutter + ((t - t0) / (t1 - t0)) * plot

  const stops = route.map((s) => {
    const a = x(toYear(s.from, now))
    const b = x(toYear(s.to, now))
    const text = narrow ? s.short : s.label
    const w = Math.ceil(textWidth(text)) + 22
    const cx = (a + b) / 2
    const left = Math.min(Math.max(cx - w / 2, gutter), width - w)
    return { ...s, a, b: Math.max(b, a + 6), cx, text, w, left, ongoing: !s.to }
  })

  // Professional career runs on the top lane, education on the bottom one.
  const workRows = stackRows(stops.filter((s) => s.lane === 'work'))
  const studyRows = stackRows(stops.filter((s) => s.lane === 'study'))
  const workY = workRows * ROW + 14
  const studyY = workY + LANE_GAP
  const axisY = studyY + 14 + studyRows * ROW + 6
  const height = axisY + 24

  for (const s of stops) {
    s.y = s.lane === 'study' ? studyY : workY
    s.top =
      s.lane === 'work'
        ? workY - 10 - (s.row + 1) * ROW + (ROW - BTN)
        : studyY + 10 + s.row * ROW
  }

  // The route: join each stop to the next one by start date.
  const order = [...stops].sort((p, q) => p.a - q.a)
  const links = []
  for (let i = 1; i < order.length; i++) {
    const p = order[i - 1]
    const q = order[i]
    const fromX = Math.min(p.b, q.a)
    if (p.lane === q.lane) {
      if (q.a > p.b) links.push(`M${p.b} ${p.y} H${q.a}`)
    } else {
      const midY = (p.y + q.y) / 2
      links.push(`M${fromX} ${p.y} C${fromX} ${midY} ${q.a} ${midY} ${q.a} ${q.y}`)
    }
  }

  const step = plot < 640 ? 2 : 1
  const ticks = []
  for (let t = t0; t <= t1; t += step) if (Math.abs(x(t) - x(now)) > 34) ticks.push({ t, x: x(t) })

  return { stops, links, ticks, studyY, workY, axisY, height, gutter, nowX: x(now), narrow }
}

function Roles({ roles }) {
  return (
    <div className="space-y-6">
      {roles.map((r) => (
        <div key={`${r.title}-${r.team || ''}-${r.period || ''}`}>
          <p className="font-display text-xl font-semibold text-paper">
            {r.title}
            {r.team && <span className="font-normal text-fog">, {r.team}</span>}
            {r.period && (
              <span
                className={`tag ml-2.5 align-middle font-sans font-normal ${r.period === 'Now' ? 'border-accent/60 text-accent' : ''}`}
              >
                {r.period}
              </span>
            )}
          </p>
          {r.outcome && <p className="mt-2 font-medium leading-snug text-paper">{r.outcome}</p>}
          {r.points?.length > 0 && (
            <ul className="mt-3 space-y-2 text-fog">
              {r.points.map((pt) => (
                <li key={pt.slice(0, 32)} className="relative pl-5">
                  <span aria-hidden="true" className="absolute left-0 top-[0.7em] size-1.5 rounded-full bg-accent" />
                  {pt}
                </li>
              ))}
            </ul>
          )}
          {r.more && (
            <a href={r.more.href} className="text-link mt-1 inline-flex min-h-11 items-center text-sm font-medium">
              {r.more.label}
            </a>
          )}
        </div>
      ))}
    </div>
  )
}

function Panel({ stop }) {
  const job = stop.ref.career && profile.career.find((c) => c.id === stop.ref.career)
  const edu = stop.ref.education !== undefined && profile.education[stop.ref.education]
  const head = job
    ? { logo: job.logo, mark: job.mark, name: job.org, meta: [job.dates, job.place], story: job.story, photo: job.photo }
    : { logo: edu.logo, mark: edu.mark, name: edu.school, meta: [edu.dates, edu.location] }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-10">
      <div>
        <div className="flex items-center gap-4">
          <Logo file={head.logo} name={head.name} mark={head.mark} />
          <div className="min-w-0">
            <h3 id="career-panel-title" className="text-xl font-semibold leading-snug text-paper">
              {head.name}
            </h3>
            <p className="text-sm text-fog">{head.meta.filter(Boolean).join(', ')}</p>
          </div>
        </div>
        {head.story && <p className="mt-4 text-paper/90">{head.story}</p>}
        {head.photo && <Photo name={head.photo} alt={head.name} className="mt-5 hidden aspect-[4/3] w-full rounded-xl lg:flex" />}
      </div>

      {job ? (
        <Roles roles={job.roles} />
      ) : (
        <div>
          <p className="font-display text-xl font-semibold text-paper">{edu.degree}</p>
          {edu.grade && (
            <p className="mt-2 text-paper">
              <span className="font-semibold text-accent">{edu.grade}</span> {edu.gradeLabel}
            </p>
          )}
          {edu.courses?.length > 0 && (
            <p className="mt-3 text-fog">
              <span className="text-paper">{edu.coursesLabel || 'Coursework'}: </span>
              {edu.courses.join(', ')}
            </p>
          )}
          <a href="#education" className="text-link mt-1 inline-flex min-h-11 items-center text-sm font-medium">
            See Education
          </a>
        </div>
      )}
    </div>
  )
}

export default function Career({ tone }) {
  const route = profile.route || []
  const [ref, width] = useWidth()
  const [current, setCurrent] = useState(route[route.length - 1]?.id)
  const buttons = useRef({})
  const map = useMemo(() => (width ? layout(route, width) : null), [route, width])
  if (!route.length) return null
  const chosen = route.find((s) => s.id === current) || route[route.length - 1]

  const onKeyDown = (e) => {
    const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!step) return
    e.preventDefault()
    const i = route.findIndex((s) => s.id === chosen.id)
    const next = route[(i + step + route.length) % route.length]
    setCurrent(next.id)
    buttons.current[next.id]?.focus()
  }

  return (
    <Section id="career" title="Career" lead="From study to work, one stop at a time." tone={tone}>
      <div className="surface rounded-2xl border border-line">
        <div className="px-5 pt-6 sm:px-8 sm:pt-8">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-sm text-fog">
            <p className="inline-flex items-center gap-2">
              <MousePointerClick aria-hidden="true" className="size-4 text-accent" />
              Select a stop on the line to see its details below.
            </p>
            {map?.narrow && (
              <p className="flex flex-col">
                <span>Top line: professional career</span>
                <span>Bottom line: education</span>
              </p>
            )}
          </div>
          <div ref={ref} className="relative" style={{ height: map?.height ?? 220 }}>
            {map && (
              <>
                <svg width={width} height={map.height} className="absolute inset-0 overflow-visible" aria-hidden="true">
                  {!map.narrow && (
                    <g className="fill-fog text-sm">
                      <text x="0" y={map.workY - 3}>Professional</text>
                      <text x="0" y={map.workY + 14}>career</text>
                      <text x="0" y={map.studyY + 5}>Education</text>
                    </g>
                  )}
                  {[map.studyY, map.workY].map((y) => (
                    <line key={y} x1={map.gutter} x2={width} y1={y} y2={y} stroke="var(--line)" strokeDasharray="2 6" />
                  ))}
                  <line x1={map.nowX} x2={map.nowX} y1={0} y2={map.axisY} stroke="var(--accent)" strokeOpacity="0.45" strokeDasharray="3 4" />
                  {map.links.map((d) => (
                    <path key={d} d={d} fill="none" stroke="var(--line-strong)" strokeWidth="2" />
                  ))}
                  {map.stops.map((s) => {
                    const on = s.id === chosen.id
                    const edge = s.lane === 'work' ? s.top + BTN : s.top
                    const near = s.lane === 'work' ? s.y - 5 : s.y + 5
                    return (
                      <g key={s.id}>
                        <line
                          x1={Math.min(Math.max(s.left + s.w / 2, s.a + 3), Math.max(s.b - 3, s.a + 3))}
                          x2={s.left + s.w / 2}
                          y1={near}
                          y2={edge}
                          stroke={on ? 'var(--accent)' : 'var(--line-strong)'}
                        />
                        <rect
                          x={s.a}
                          y={s.y - 5}
                          width={s.b - s.a}
                          height="10"
                          rx="5"
                          fill={on ? 'var(--accent)' : 'var(--line-strong)'}
                          className="cursor-pointer"
                          onClick={() => setCurrent(s.id)}
                        />
                      </g>
                    )
                  })}
                  <circle cx={map.nowX} cy={map.workY} r="9" fill="var(--accent)" className="trace-pulse" opacity="0.35" />
                  <circle cx={map.nowX} cy={map.workY} r="4" fill="var(--accent)" />
                  <g className="fill-fog text-xs tabular">
                    {map.ticks.map((t) => (
                      <text key={t.t} x={t.x} y={map.axisY + 16} textAnchor={t.x < map.gutter + 14 ? 'start' : 'middle'}>
                        {t.t}
                      </text>
                    ))}
                    <text x={map.nowX} y={map.axisY + 16} textAnchor="end" className="fill-accent">
                      now
                    </text>
                  </g>
                </svg>

                <div role="group" aria-label="Career stops, oldest first" onKeyDown={onKeyDown}>
                  {map.stops.map((s) => {
                    const on = s.id === chosen.id
                    return (
                      <button
                        key={s.id}
                        ref={(el) => (buttons.current[s.id] = el)}
                        type="button"
                        aria-pressed={on}
                        aria-controls="career-panel"
                        aria-label={s.label}
                        tabIndex={on ? 0 : -1}
                        onClick={() => setCurrent(s.id)}
                        className={`absolute whitespace-nowrap rounded-full px-[11px] text-sm font-medium transition-colors ${
                          on ? 'bg-accent text-on-accent' : 'bg-raise text-paper hover:bg-line'
                        }`}
                        style={{ left: s.left, top: s.top, height: BTN, width: s.w }}
                      >
                        {s.text}
                      </button>
                    )
                  })}
                </div>
              </>
            )}
          </div>
        </div>

        <div
          id="career-panel"
          role="region"
          aria-labelledby="career-panel-title"
          aria-live="polite"
          className="mt-4 border-t border-line p-5 sm:p-8"
        >
          <Panel key={chosen.id} stop={chosen} />
        </div>
      </div>
    </Section>
  )
}
