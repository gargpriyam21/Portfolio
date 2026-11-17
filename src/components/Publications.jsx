import { profile } from '../data/profile.js'
import Section from './Section.jsx'
import ExternalLink from './ExternalLink.jsx'

export default function Publications({ tone }) {
  return (
    <Section id="publications" title="Publications" tone={tone}>
      <ul className="divide-y divide-line border-y border-line">
        {profile.publications.map((p) => (
          <li key={p.title} className="grid gap-2 py-6 md:grid-cols-[5rem_minmax(0,1fr)] md:gap-8">
            <p className="font-display text-xl font-semibold text-accent-ink">{p.year}</p>
            <div>
              <h3 className="font-sans text-lg font-medium leading-snug tracking-normal text-paper">
                {p.url ? (
                  <ExternalLink href={p.url} className="text-link">
                    {p.title}
                  </ExternalLink>
                ) : (
                  p.title
                )}
              </h3>
              <p className="mt-1.5 text-fog">{p.venue}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}
