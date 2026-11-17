import { profile } from '../data/profile.js'
import Section from './Section.jsx'

// Skills as labelled rows rather than a grid of identical cards.
export default function Skills({ tone }) {
  const groups = profile.skills.filter((g) => g.items?.length)
  return (
    <Section id="skills" title="Skills" tone={tone}>
      <dl className="divide-y divide-line border-y border-line">
        {groups.map((g, i) => (
          <div key={g.group} className="grid gap-3 py-6 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] md:gap-10">
            <dt className={`font-display text-xl font-semibold ${i === 0 ? 'text-accent-ink' : 'text-paper'}`}>{g.group}</dt>
            <dd>
              <ul className="flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <li
                    key={item}
                    className={`rounded-full border px-3.5 py-1.5 text-[0.9375rem] ${
                      i === 0 ? 'border-accent/50 text-paper' : 'border-line text-paper/90'
                    }`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
