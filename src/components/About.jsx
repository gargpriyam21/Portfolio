import { profile } from '../data/profile.js'
import Section from './Section.jsx'
import RevealText from './RevealText.jsx'
import Photo from './Photo.jsx'

export default function About({ tone }) {
  const { aboutLead, about, facts, aboutPhoto } = profile
  return (
    <Section id="about" title="About" tone={tone}>
      {aboutLead && (
        <RevealText
          text={aboutLead}
          className="font-display text-[1.75rem] font-semibold leading-[1.25] tracking-[-0.015em] sm:text-4xl sm:leading-[1.2]"
        />
      )}

      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-14">
        {aboutPhoto && (
          <Photo
            name={aboutPhoto}
            alt={`Portrait of ${profile.name}`}
            className="aspect-[4/5] w-full max-w-sm self-start rounded-2xl border border-line card-shadow lg:sticky lg:top-28 lg:max-w-none"
          />
        )}

        <div>
          <div className="space-y-5 text-lg text-paper/90">
            {about.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>

          {facts?.length > 0 && (
            <dl className="surface mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 xl:grid-cols-3">
              {facts.map((f) => (
                <div key={f.label} className="surface px-5 py-4">
                  <dt className="text-sm text-fog">{f.label}</dt>
                  <dd className="mt-1 font-medium leading-snug text-paper">{f.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>
    </Section>
  )
}
