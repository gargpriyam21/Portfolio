import { profile } from '../data/profile.js'
import Section from './Section.jsx'
import TechList from './TechList.jsx'
import PipelineDiagram from './PipelineDiagram.jsx'
import Logo from './Logo.jsx'

export default function Work({ tone }) {
  const { company, role, dates, location, summary, highlights, tech, logo, mark } = profile.work
  return (
    <Section id="work" title="Work" lead={`${role} at ${company}`} tone={tone}>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        <Logo file={logo} name={company} mark={mark} size="lg" />
        <div>
          <p className="text-fog">{[dates, location].filter(Boolean).join(', ')}</p>
          {summary && <p className="mt-3 text-xl text-paper/90">{summary}</p>}
          <TechList items={tech} className="mt-6" />
        </div>
      </div>

      <PipelineDiagram />

      {highlights?.length > 0 && (
        <ul className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((item) => (
            <li key={item.title} className="border-t-2 border-accent/70 pt-5">
              <h3 className="text-xl font-semibold text-paper">{item.title}</h3>
              <p className="mt-2 text-fog">{item.body}</p>
            </li>
          ))}
        </ul>
      )}
    </Section>
  )
}
