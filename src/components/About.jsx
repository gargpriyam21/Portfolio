import { profile } from '../data/profile.js'
import Section from './Section.jsx'
import RevealText from './RevealText.jsx'

export default function About({ tone }) {
  const { aboutLead, about, facts } = profile
  return (
    <Section id="about" title="About" tone={tone}>
      {aboutLead && (
        <RevealText
          text={aboutLead}
          className="font-display text-[1.75rem] font-semibold leading-[1.25] tracking-[-0.015em] sm:text-4xl sm:leading-[1.2]"
        />
      )}

      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14">
        <div className="space-y-5 text-lg text-paper/90">
          {about.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>
              {paragraph}
            </p>
          ))}
        </div>

        {facts?.length > 0 && (
          <dl className="surface grid grid-cols-1 gap-px self-start overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
            {facts.map((f) => (
              <div key={f.label} className="surface px-5 py-4">
                <dt className="text-sm text-fog">{f.label}</dt>
                <dd className="mt-1 font-medium leading-snug text-paper">{f.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </Section>
  )
}
