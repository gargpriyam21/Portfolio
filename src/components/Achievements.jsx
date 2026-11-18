import { Award, Guitar, Presentation, Users } from 'lucide-react'
import { profile } from '../data/profile.js'
import Section from './Section.jsx'

const ICONS = { talk: Presentation, teach: Users, award: Award, music: Guitar }

export default function Achievements({ tone }) {
  const items = profile.achievements || []
  if (!items.length) return null
  return (
    <Section id="achievements" title="Leadership and achievements" tone={tone}>
      <ul className="grid gap-5 md:grid-cols-2">
        {items.map((a) => {
          const Icon = ICONS[a.icon] || Award
          return (
            <li key={a.title} className="surface flex gap-5 rounded-2xl border border-line p-6 sm:p-7">
              <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-accent/12 text-accent-ink">
                <Icon aria-hidden="true" className="size-6" strokeWidth={1.75} />
              </span>
              <div className="min-w-0">
                <h3 className="text-xl font-semibold leading-snug text-paper">{a.title}</h3>
                <p className="mt-2 text-fog">{a.body}</p>
                {a.link && (
                  <a href={a.link.href} className="text-link mt-1 inline-flex min-h-11 items-center text-sm font-medium">
                    {a.link.label}
                  </a>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
