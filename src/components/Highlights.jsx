import { profile } from '../data/profile.js'
import Section from './Section.jsx'
import { replayRun } from './CommandPalette.jsx'

// Each highlight is drawn as a small diagram of the change it describes.

function Bars({ before, after }) {
  return (
    <div className="mt-6 space-y-3" aria-hidden="true">
      <div className="flex items-center gap-3">
        <span className="w-16 shrink-0 text-sm text-fog">Before</span>
        <span className="h-3 flex-1 rounded-full bg-line-strong/60" />
        <span className="w-16 text-sm text-fog">{before}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="w-16 shrink-0 text-sm text-fog">After</span>
        <span className="flex-1">
          <span className="block h-3 w-[7%] min-w-3 rounded-full bg-accent" />
        </span>
        <span className="w-16 text-sm font-medium text-accent-ink">{after}</span>
      </div>
    </div>
  )
}

function Calls({ before, after }) {
  const blocks = Array.from({ length: before })
  return (
    <div className="mt-6 grid grid-cols-[4rem_minmax(0,1fr)] items-center gap-x-3 gap-y-3" aria-hidden="true">
      <span className="text-sm text-fog">Before</span>
      <span className="flex gap-1.5">
        {blocks.map((_, i) => (
          <span key={i} className="h-7 flex-1 rounded-md border border-line-strong/70 bg-line-strong/25" />
        ))}
      </span>
      <span className="text-sm text-fog">After</span>
      <span className="flex gap-1.5">
        {blocks.map((_, i) => (
          <span
            key={i}
            className={`h-7 flex-1 rounded-md ${i < after ? 'bg-accent' : 'border border-dashed border-line'}`}
          />
        ))}
      </span>
    </div>
  )
}

function Checkpoints() {
  // Four checkpoints; the run breaks after the third and resumes from it.
  return (
    <svg viewBox="0 0 260 64" className="mt-6 w-full" role="img" aria-label="A run that fails after checkpoint 3 and resumes from it">
      <line x1="10" y1="40" x2="150" y2="40" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" />
      <line x1="150" y1="40" x2="170" y2="40" stroke="var(--danger)" strokeWidth="3" strokeDasharray="3 4" />
      <path d="M165 31 l10 10 M175 31 l-10 10" stroke="var(--danger)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M140 40 C 150 8, 190 8, 200 40" fill="none" stroke="var(--accent)" strokeWidth="2" strokeDasharray="4 4" />
      <line x1="200" y1="40" x2="250" y2="40" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" />
      {[10, 55, 100, 140, 250].map((x, i) => (
        <circle key={x} cx={x} cy="40" r="6" fill={i === 4 ? 'var(--accent)' : 'var(--surface)'} stroke="var(--accent)" strokeWidth="2.5" />
      ))}
      <text x="183" y="62" textAnchor="middle" fontSize="11" fill="var(--fog)" fontFamily="var(--font-sans)">
        resume
      </text>
    </svg>
  )
}

function Growth({ steps }) {
  return (
    <ol className="mt-6 space-y-2.5">
      {steps.map((s, i) => (
        <li key={s} className="flex items-center gap-3" style={{ paddingLeft: `${i * 0.85}rem` }}>
          <span
            aria-hidden="true"
            className={`size-2.5 shrink-0 rounded-full ${i === steps.length - 1 ? 'bg-accent' : 'border-2 border-line-strong'}`}
          />
          <span className={`text-sm ${i === steps.length - 1 ? 'font-medium text-paper' : 'text-fog'}`}>{s}</span>
        </li>
      ))}
    </ol>
  )
}

function GraphGrowth() {
  // A small graph beside a much larger one: the same builder, far bigger input.
  let seed = 5
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280
    return seed / 233280
  }
  const cols = 6
  const rows = 3
  const big = []
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) big.push([150 + c * 24 + (rand() - 0.5) * 10, 18 + r * 26 + (rand() - 0.5) * 10])
  const bigEdges = []
  big.forEach((_, i) => {
    const c = i % cols
    const r = Math.floor(i / cols)
    if (c < cols - 1 && rand() < 0.8) bigEdges.push([i, i + 1])
    if (r < rows - 1 && rand() < 0.6) bigEdges.push([i, i + cols])
    if (c < cols - 1 && r < rows - 1 && rand() < 0.3) bigEdges.push([i, i + cols + 1])
  })
  const small = [
    [36, 31],
    [60, 31],
    [36, 57],
    [60, 57],
  ]
  const smallEdges = [
    [0, 1],
    [0, 2],
    [1, 3],
  ]
  return (
    <svg viewBox="0 0 280 104" className="mt-6 h-auto w-full" aria-hidden="true">
      {smallEdges.map(([a, b]) => (
        <line key={`s${a}${b}`} x1={small[a][0]} y1={small[a][1]} x2={small[b][0]} y2={small[b][1]} stroke="var(--line-strong)" strokeWidth="1.5" />
      ))}
      {small.map(([x, y]) => (
        <circle key={`sn${x}${y}`} cx={x} cy={y} r="4" fill="var(--line-strong)" />
      ))}
      <path d="M96 44 H124" stroke="var(--line-strong)" strokeWidth="1.5" />
      <path d="M120 40 L126 44 L120 48" fill="none" stroke="var(--line-strong)" strokeWidth="1.5" />
      {bigEdges.map(([a, b]) => (
        <line key={`b${a}-${b}`} x1={big[a][0]} y1={big[a][1]} x2={big[b][0]} y2={big[b][1]} stroke="var(--accent)" strokeOpacity="0.5" strokeWidth="1.25" />
      ))}
      {big.map(([x, y], i) => (
        <circle key={`bn${i}`} cx={x} cy={y} r="4" fill="var(--accent)" />
      ))}
      <text x="48" y="98" textAnchor="middle" className="fill-fog" style={{ fontSize: 12 }}>
        before
      </text>
      <text x="210" y="98" textAnchor="middle" className="fill-fog" style={{ fontSize: 12 }}>
        much larger inputs
      </text>
    </svg>
  )
}

export default function Highlights({ tone }) {
  const h = profile.highlights
  const card = 'surface flex flex-col rounded-2xl border border-line p-6 sm:p-7'
  const title = 'font-display text-3xl font-semibold tracking-tight text-paper sm:text-4xl'

  return (
    <Section id="highlights" title="Highlights" lead={h.lead} tone={tone}>
      <ul className="grid grid-cols-1 gap-5 md:grid-cols-6">
        <li className={`${card} md:col-span-3`}>
          <h3 className={title}>{h.speed.title}</h3>
          <p className="mt-3 text-fog">{h.speed.body}</p>
          <Bars before={h.speed.before} after={h.speed.after} />
        </li>

        <li className={`${card} md:col-span-3`}>
          <h3 className={title}>{h.calls.title}</h3>
          <p className="mt-3 text-fog">{h.calls.body}</p>
          <Calls before={h.calls.before} after={h.calls.after} />
        </li>

        <li className={`${card} md:col-span-2`}>
          <h3 className={title}>{h.recovery.title}</h3>
          <p className="mt-3 text-fog">{h.recovery.body}</p>
          <Checkpoints />
          <button
            type="button"
            onClick={() => {
              document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })
              replayRun()
            }}
            className="text-link mt-auto inline-flex min-h-11 items-center self-start pt-3 text-sm font-medium"
          >
            Watch the agent recover
          </button>
        </li>

        <li className={`${card} md:col-span-2`}>
          <h3 className={title}>{h.graph.title}</h3>
          <p className="mt-3 text-fog">{h.graph.body}</p>
          <GraphGrowth />
          <button
            type="button"
            onClick={() => {
              document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })
              replayRun()
            }}
            className="text-link mt-auto inline-flex min-h-11 items-center self-start pt-3 text-sm font-medium"
          >
            See a graph answer a question
          </button>
        </li>
        <li className={`${card} md:col-span-2`}>
          <h3 className={title}>{h.growth.title}</h3>
          <Growth steps={h.growth.steps} />
        </li>

      </ul>
    </Section>
  )
}
