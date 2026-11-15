import { Mail } from 'lucide-react'
import { profile } from '../data/profile.js'
import ExternalLink from './ExternalLink.jsx'
import ContactForm from './ContactForm.jsx'

// The close. With a form endpoint set, the form sits on the right; without one
// an info card takes its place, so nothing promises a form that isn't there.
function InfoCard() {
  const { topics } = profile.contact
  if (!topics?.length) return null
  return (
    <div className="surface self-start rounded-2xl border border-line p-6 sm:p-8">
      <h3 className="text-2xl font-semibold text-paper">Happy to talk about</h3>
      <ul className="mt-5 space-y-3 text-lg text-paper/90">
        {topics.map((t) => (
          <li key={t} className="relative pl-6">
            <span aria-hidden="true" className="absolute left-0 top-[0.7em] size-2 rounded-full bg-accent" />
            {t}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Contact({ tone = 'base' }) {
  const { heading, body, formEndpoint, withForm, withoutForm } = profile.contact
  const { email, linkedin, github } = profile.links
  const hasForm = Boolean(formEndpoint) || import.meta.env.VITE_FORM_PREVIEW === '1'
  const primary = email ? 'btn-quiet' : 'btn-solid'

  return (
    <section id="contact" aria-labelledby="contact-title" className={`tone-${tone} py-24 sm:py-32`}>
      <div className="shell grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:gap-14">
        <div>
          <h2 id="contact-title" className="text-6xl font-semibold tracking-[-0.03em] sm:text-8xl">
            {heading}
          </h2>
          <p className="mt-6 text-lg text-fog sm:text-xl">
            {body} {hasForm ? withForm : withoutForm}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            {email && (
              <a href={`mailto:${email}`} className="btn btn-solid">
                <Mail aria-hidden="true" className="size-4" />
                {email}
              </a>
            )}
            <ExternalLink href={linkedin} className={`btn ${primary}`}>
              Message me on LinkedIn
            </ExternalLink>
            <ExternalLink href={github} className="btn btn-quiet">
              See my GitHub
            </ExternalLink>
          </div>
        </div>
        {hasForm ? <ContactForm /> : <InfoCard />}
      </div>
    </section>
  )
}
