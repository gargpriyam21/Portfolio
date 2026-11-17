import { ArrowDown, ArrowRight } from 'lucide-react'
import { profile } from '../data/profile.js'
import Icon from './Icon.jsx'

// Diagram of the system described in the Work section: input, agents, outputs.
// Built from ordinary elements so it reflows from a row to a column on phones.
function Arrow() {
  return (
    <span aria-hidden="true" className="flex items-center justify-center self-center text-accent-ink lg:mt-12 lg:self-start">
      <ArrowRight className="hidden size-6 lg:block" />
      <ArrowDown className="size-6 lg:hidden" />
    </span>
  )
}

function Node({ icon, title, detail }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-line surface px-4 py-3.5">
      <span className="text-accent-ink">
        <Icon name={icon} className="size-5" />
      </span>
      <div>
        <p className="font-medium leading-tight text-paper">{title}</p>
        {detail && <p className="mt-0.5 text-sm leading-snug text-fog">{detail}</p>}
      </div>
    </div>
  )
}

export default function PipelineDiagram() {
  const d = profile.work.diagram
  if (!d) return null
  return (
    <figure className="mt-14">
      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1.25fr)_auto_minmax(0,1fr)]">
        <div>
          <p className="mb-3 text-sm text-fog">{d.input.label}</p>
          <Node icon={d.input.icon} title={d.input.title} detail={d.input.detail} />
        </div>
        <Arrow />
        <div>
          <p className="mb-3 text-sm text-fog">{d.agents.label}</p>
          <div className="rounded-xl border border-accent/50 surface p-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex size-10 items-center justify-center rounded-lg bg-accent text-ink">
                <Icon name="bot" className="size-5" />
              </span>
              <p className="font-display text-xl font-semibold text-paper">{d.agents.title}</p>
            </div>
            <ul className="mt-4 flex flex-wrap gap-2">
              {d.agents.steps.map((s) => (
                <li key={s} className="rounded-full border border-line px-3 py-1 text-sm text-paper">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Arrow />
        <div>
          <p className="mb-3 text-sm text-fog">{d.outputs.label}</p>
          <ul className="space-y-2.5">
            {d.outputs.items.map((o) => (
              <li key={o.title}>
                <Node icon={o.icon} title={o.title} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      {d.caption && <figcaption className="mt-3 text-sm text-fog">{d.caption}</figcaption>}
    </figure>
  )
}
