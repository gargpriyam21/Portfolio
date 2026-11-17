import { useCallback, useEffect, useRef, useState } from 'react'
import { Check, RotateCcw, X } from 'lucide-react'
import { profile } from '../data/profile.js'
import Photo from './Photo.jsx'

// The hero's signature: a generic replay of the pattern. Three agents read
// sources in parallel and save the facts they find into a shared knowledge graph.
// One agent's worker is lost and it resumes from its checkpoint. Then a
// question is answered by querying the graph. Everything is driven by one
// clock (`tick`), and every block is always laid out, so the card never
// changes height while it plays.

const TICK_MS = 110
const END = 74

// Agent timelines, in ticks: start, end, and an optional failure window.
const AGENTS = [
  { from: 2, to: 40 },
  { from: 2, to: 50, lost: [21, 31], resume: 2 },
  { from: 4, to: 36 },
]

// The graph. Each fact is a relationship one agent saved at a given tick.
const NODES = {
  job: { label: 'source', x: 40, y: 70 },
  pa: { label: 'entity A', x: 128, y: 22 },
  pb: { label: 'entity B', x: 128, y: 70 },
  pc: { label: 'entity C', x: 128, y: 118 },
  acct: { label: 'entity D', x: 220, y: 70 },
  pay: { label: 'entity E', x: 220, y: 118 },
  bal: { label: 'rule 1', x: 302, y: 22 },
  fee: { label: 'rule 2', x: 302, y: 118 },
}
const FACTS = [
  { a: 'job', b: 'pa', at: 10, agent: 2 },
  { a: 'pc', b: 'pay', at: 12, agent: 1 },
  { a: 'pa', b: 'acct', at: 14, agent: 0 },
  { a: 'job', b: 'pb', at: 22, agent: 2 },
  { a: 'pb', b: 'acct', at: 26, agent: 0 },
  { a: 'pb', b: 'bal', at: 32, agent: 1 },
  { a: 'job', b: 'pc', at: 34, agent: 2 },
  { a: 'pa', b: 'bal', at: 38, agent: 0 },
  { a: 'pay', b: 'fee', at: 44, agent: 1 },
]
const ANSWER_PATH = new Set(['pa-bal', 'pb-bal'])
const ANSWER_NODES = new Set(['pa', 'pb', 'bal'])
const LOST = AGENTS[1].lost
const Q_ASK = 54
const Q_HIT = 60
const Q_ANSWER = 66

function agentState(a, tick) {
  if (tick < a.from) return { pct: 0, label: 'queued', state: 'queued' }
  const pause = a.lost ? a.lost[1] - a.lost[0] : 0
  const span = a.to - a.from - pause
  let worked = Math.min(tick, a.to) - a.from
  let recovered = false
  if (a.lost) {
    const [l0, l1] = a.lost
    const atFail = ((l0 - a.from) / span) * 100
    if (tick >= l0 && tick < l0 + 6) return { pct: atFail, label: 'worker lost mid-run', state: 'lost' }
    if (tick >= l0 + 6 && tick < l1) return { pct: atFail, label: `restoring from checkpoint ${a.resume}`, state: 'restore' }
    if (tick >= l1) {
      worked -= pause
      recovered = true
    }
  }
  const pct = Math.min(worked / span, 1) * 100
  if (tick >= a.to) return { pct: 100, label: recovered ? 'done, nothing redone' : 'done', state: 'done' }
  if (recovered) return { pct, label: `resumed at checkpoint ${a.resume}`, state: 'running' }
  const label = pct < 35 ? 'reading sources' : pct < 70 ? 'extracting facts' : 'saving facts to the graph'
  return { pct, label, state: 'running' }
}

function Operator() {
  const initials = profile.name
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
  return (
    <div className="flex min-w-0 items-center gap-3.5">
      <Photo
        name={profile.photo}
        alt={`Portrait of ${profile.name}`}
        eager
        className="size-16 shrink-0 rounded-2xl ring-2 ring-accent/70 ring-offset-2 ring-offset-panel"
        fallback={
          <span
            aria-hidden="true"
            className="inline-flex size-16 shrink-0 items-center justify-center rounded-2xl bg-raise font-display text-xl font-semibold text-accent-ink ring-2 ring-accent/70 ring-offset-2 ring-offset-panel"
          >
            {initials}
          </span>
        }
      />
      <div className="min-w-0">
        <p className="font-display text-lg font-semibold leading-tight text-paper">{profile.name}</p>
        <p className="text-sm leading-snug text-fog">{profile.role}, AWS</p>
      </div>
    </div>
  )
}

function StatusIcon({ state }) {
  if (state === 'lost') return <X aria-label="failed" className="size-4 text-danger" strokeWidth={2.5} />
  if (state === 'done') return <Check aria-label="done" className="size-4 text-accent-ink" strokeWidth={2.5} />
  if (state === 'restore') return <RotateCcw aria-label="restoring" className="trace-pulse size-4 text-accent-ink" strokeWidth={2.5} />
  if (state === 'running') return <span aria-label="running" className="trace-pulse size-2.5 rounded-full bg-accent" />
  return <span aria-label="queued" className="size-2.5 rounded-full border border-line-strong" />
}

function Graph({ tick }) {
  const saved = FACTS.filter((f) => tick >= f.at)
  const seen = new Set(saved.flatMap((f) => [f.a, f.b]))
  const hit = tick >= Q_HIT
  return (
    <svg viewBox="0 0 350 140" className="h-auto w-full" aria-hidden="true">
      {saved.map((f) => {
        const on = hit && ANSWER_PATH.has(`${f.a}-${f.b}`)
        return (
          <line
            key={`${f.a}-${f.b}`}
            x1={NODES[f.a].x}
            y1={NODES[f.a].y}
            x2={NODES[f.b].x}
            y2={NODES[f.b].y}
            pathLength="1"
            className="kg-edge"
            style={{ '--k': 0 }}
            stroke={on ? 'var(--accent)' : 'var(--line-strong)'}
            strokeWidth={on ? 2.5 : 1.25}
            opacity={hit && !on ? 0.45 : 1}
          />
        )
      })}
      {Object.entries(NODES)
        .filter(([id]) => seen.has(id))
        .map(([id, n]) => {
          const w = n.label.length * 5.9 + 14
          const on = hit && ANSWER_NODES.has(id)
          return (
            <g key={id} className="kg-node" style={{ '--k': 0 }}>
              <g opacity={hit && !on ? 0.55 : 1}>
                <rect
                  x={n.x - w / 2}
                  y={n.y - 9}
                  width={w}
                  height="18"
                  rx="9"
                  fill={on ? 'var(--accent)' : 'var(--raise)'}
                  stroke={on ? 'var(--accent)' : 'var(--line-strong)'}
                />
                <text
                  x={n.x}
                  y={n.y + 3.4}
                  textAnchor="middle"
                  className={`font-mono ${on ? 'fill-on-accent' : 'fill-paper'}`}
                  style={{ fontSize: 10 }}
                >
                  {n.label}
                </text>
              </g>
            </g>
          )
        })}
    </svg>
  )
}

export default function RunTrace() {
  const { run, agents, question, answer, answerNote, result, note } = profile.trace
  const reduced = useRef(typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [tick, setTick] = useState(reduced.current ? END : 0)
  const timer = useRef(null)

  const play = useCallback(() => {
    clearInterval(timer.current)
    if (reduced.current) {
      setTick(END)
      return
    }
    setTick(0)
    timer.current = setInterval(() => {
      setTick((t) => {
        if (t + 1 >= END) clearInterval(timer.current)
        return Math.min(t + 1, END)
      })
    }, TICK_MS)
  }, [])

  useEffect(() => {
    play()
    window.addEventListener('replay-run', play)
    return () => {
      clearInterval(timer.current)
      window.removeEventListener('replay-run', play)
    }
  }, [play])

  const done = tick >= END
  const facts = FACTS.filter((f) => tick >= f.at).length
  const phase = done
    ? 'complete'
    : tick >= Q_ASK
      ? 'querying the graph'
      : tick >= LOST[0] && tick < LOST[1]
        ? 'recovering agent 2'
        : tick > 0
          ? 'agents running'
          : 'starting'

  return (
    <figure className="w-full">
      <div className="overflow-hidden rounded-2xl border border-line bg-panel card-shadow">
        <div className="flex items-center justify-between gap-4 p-4 sm:px-5">
          <Operator />
          <button
            type="button"
            onClick={play}
            className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-line-strong px-3.5 text-sm font-medium text-paper transition-colors hover:border-accent hover:text-accent-ink"
          >
            <RotateCcw aria-hidden="true" className="size-4" />
            Replay
          </button>
        </div>

        <div className="flex items-center justify-between border-y border-line bg-raise/60 px-4 py-2 font-mono text-xs text-fog sm:px-5">
          <span>{run}</span>
          <span aria-hidden="true">{phase}</span>
        </div>
        <div aria-hidden="true" className="h-0.5 bg-line">
          <div className="trace-progress h-full bg-accent" style={{ transform: `scaleX(${tick / END})` }} />
        </div>

        {/* Agents, in parallel */}
        <ol className="space-y-2.5 px-4 pb-1 pt-4 sm:px-5" aria-label="Agents working in parallel">
          {agents.map((name, i) => {
            const s = agentState(AGENTS[i], tick)
            const lost = s.state === 'lost'
            return (
              <li key={name} className="grid grid-cols-[4.25rem_minmax(0,1fr)_1rem] items-center gap-x-3">
                <span className={`font-mono text-sm ${lost ? 'text-danger' : 'text-paper'}`}>{name}</span>
                <span className="min-w-0">
                  <span className="relative block h-1.5 overflow-hidden rounded-full bg-line">
                    <span
                      className={`block h-full rounded-full transition-[width] duration-100 ${lost ? 'bg-danger' : 'bg-accent'}`}
                      style={{ width: `${s.pct}%` }}
                    />
                    {[25, 50, 75].map((c) => (
                      <span key={c} aria-hidden="true" className="absolute inset-y-0 w-0.5 bg-panel" style={{ left: `${c}%` }} />
                    ))}
                  </span>
                  <span className={`mt-1 block truncate text-sm leading-snug ${lost ? 'text-danger' : 'text-fog'}`}>
                    {s.label}
                  </span>
                </span>
                <span className="flex justify-end">
                  <StatusIcon state={s.state} />
                </span>
              </li>
            )
          })}
        </ol>

        {/* Failure and recovery */}
        <div className="space-y-1.5 px-4 pt-3 sm:px-5">
          <div className={`grid grid-cols-[4.25rem_minmax(0,1fr)] gap-x-3 ${tick >= LOST[0] ? 'trace-row' : 'invisible'}`}>
            <span className="pt-px font-mono text-sm text-danger">failure</span>
            <span className="text-sm leading-snug text-danger">Agent 2 lost its worker mid-run</span>
          </div>
          <div className={`grid grid-cols-[4.25rem_minmax(0,1fr)] gap-x-3 ${tick >= LOST[1] ? 'trace-row' : 'invisible'}`}>
            <span className="pt-px font-mono text-sm text-accent-ink">restore</span>
            <span className="text-sm leading-snug text-paper">
              Picked up from checkpoint 2. Nothing redone, no facts lost.
            </span>
          </div>
        </div>

        {/* The shared knowledge graph */}
        <div className="mx-4 mt-3 rounded-xl border border-line bg-ink/40 p-3 sm:mx-5">
          <p className="flex items-center justify-between font-mono text-xs text-fog">
            <span>knowledge graph</span>
            <span className="tabular">{facts} facts saved</span>
          </p>
          <div className="mt-2">
            <Graph tick={tick} />
          </div>
        </div>

        {/* Query the graph */}
        <div className="space-y-2 px-4 py-4 sm:px-5">
          <div
            className={`grid grid-cols-[4.25rem_minmax(0,1fr)] gap-x-3 ${tick >= Q_ASK ? 'trace-row' : 'invisible'}`}
          >
            <span className="pt-px font-mono text-sm text-paper">query</span>
            <span className="text-sm leading-snug text-paper">{question}</span>
          </div>
          <div
            className={`grid grid-cols-[4.25rem_minmax(0,1fr)] gap-x-3 ${tick >= Q_ANSWER ? 'trace-row' : 'invisible'}`}
          >
            <span className="pt-px font-mono text-sm text-accent-ink">answer</span>
            <span className="text-sm leading-snug">
              <span className="block text-paper">{answer}</span>
              <span className="block text-fog">{answerNote}</span>
            </span>
          </div>
        </div>

        <div className={`border-t border-line bg-raise/60 px-4 py-3.5 sm:px-5 ${done ? 'trace-row' : 'invisible'}`}>
          <p className="font-display text-lg font-semibold leading-snug text-paper">{result}</p>
          <a href="#highlights" className="text-link mt-1 inline-flex min-h-11 items-center text-sm font-medium">
            See the real results
          </a>
        </div>
      </div>
      <figcaption className="mt-3 text-sm text-fog">{note}</figcaption>
      <p className="sr-only" role="status">
        {done ? `Agent run complete. Agent 2 lost its worker and resumed from checkpoint 2. ${question} ${answer}` : ''}
      </p>
    </figure>
  )
}
