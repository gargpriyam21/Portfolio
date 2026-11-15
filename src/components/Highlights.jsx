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
        <span className="w-16 text-sm font-medium text-accent">{after}</span>
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

function Papers({ papers }) {
  // One mark per paper, placed on a year line.
  const years = [...new Set(papers.map((p) => p.year))].sort()
  return (
    <div className="mt-6" aria-hidden="true">
      <div className="relative flex items-end justify-between border-b-2 border-line-strong/60 pb-3">
        {years.map((y) => (
          <div key={y} className="flex flex-col items-center gap-1.5">
            {papers
              .filter((p) => p.year === y)
              .map((p) => (
                <span key={p.title} className="block h-2.5 w-9 rounded-sm bg-accent" />
              ))}
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-between text-sm text-fog">
        {years.map((y) => (
          <span key={y} className="tabular w-9 text-center">
            {y}
          </span>
        ))}
      </div>
    </div>
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
          <h3 className={title}>{h.growth.title}</h3>
          <Growth steps={h.growth.steps} />
        </li>

        <li className={`${card} md:col-span-2`}>
          <h3 className={title}>{h.research.title}</h3>
          <p className="mt-3 text-fog">{h.research.body}</p>
          <Papers papers={profile.publications} />
          <a href="#publications" className="text-link mt-auto inline-flex min-h-11 items-center self-start pt-3 text-sm font-medium">
            Read the papers
          </a>
        </li>
      </ul>
    </Section>
  )
}
