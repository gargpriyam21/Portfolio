import { profile } from '../data/profile.js'
import Logo from './Logo.jsx'
import { photoUrl } from './Photo.jsx'
import Section from './Section.jsx'

// The master's is a campus photo with its details laid over it and the school's
// logo on the right. The earlier two are compact cards: logo beside the degree
// and school, then dates and grade across the full width.

function Featured({ e }) {
  const url = photoUrl(e.photo)
  const meta = [e.dates, e.location].filter(Boolean).join(', ')
  // Over a photo the text sits on a dark scrim, so it stays light in both themes.
  const ink = url ? 'text-white' : 'text-paper'
  const soft = url ? 'text-white/80' : 'text-fog'

  return (
    <article className="surface-2 relative isolate overflow-hidden rounded-2xl border border-line">
      {url && (
        <>
          <img src={url} alt={`${e.school} campus`} loading="lazy" decoding="async" className="absolute inset-0 -z-10 size-full object-cover" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/50 to-black/5" />
        </>
      )}
      {!url && import.meta.env.DEV && e.photo && (
        <p className="absolute left-4 top-3 font-mono text-xs text-fog">Add src/assets/photos/{e.photo}.jpg</p>
      )}

      <div className={`flex flex-col justify-end gap-6 p-6 sm:p-9 ${url ? 'min-h-[26rem] pt-40 sm:min-h-[30rem]' : import.meta.env.DEV ? 'pt-12' : ''}`}>
        <div className="flex items-end justify-between gap-6">
          <div className="min-w-0">
            <h3 className={`text-3xl font-semibold sm:text-4xl ${ink}`}>{e.degree}</h3>
            <p className={`mt-2 text-lg sm:text-xl ${ink}`}>{e.school}</p>
            <p className={`mt-1 ${soft}`}>{meta}</p>
            {e.grade && (
              <p className="mt-4 flex flex-wrap items-baseline gap-x-2.5">
                <span className={`font-display text-4xl font-semibold leading-none ${url ? 'text-white' : 'text-accent'}`}>
                  {e.grade}
                </span>
                <span className={`text-sm ${soft}`}>{e.gradeLabel}</span>
              </p>
            )}
          </div>
          <div className="shrink-0">
            <Logo file={e.logo} name={e.school} mark={e.mark} size="lg" />
          </div>
        </div>
        {e.courses?.length > 0 && (
          <p className={`border-t pt-5 ${url ? 'border-white/25 text-white/85' : 'border-line text-fog'}`}>
            <span className={ink}>{e.coursesLabel || 'Coursework'}: </span>
            {e.courses.join(', ')}
          </p>
        )}
      </div>
    </article>
  )
}

function Compact({ e }) {
  return (
    <li className="surface rounded-2xl border border-line p-5 sm:p-6">
      <div className="flex items-center gap-4">
        <Logo file={e.logo} name={e.school} mark={e.mark} />
        <div className="min-w-0">
          <h3 className="text-lg font-semibold leading-snug text-paper">{e.degree}</h3>
          <p className="leading-snug text-paper/90">{e.school}</p>
        </div>
      </div>
      <p className="mt-4 text-sm text-fog">{[e.dates, e.location].filter(Boolean).join(', ')}</p>
      {e.grade && (
        <p className="mt-2 flex flex-wrap items-baseline gap-x-2">
          <span className="font-display text-2xl font-semibold leading-none text-accent">{e.grade}</span>
          <span className="text-sm text-fog">{e.gradeLabel}</span>
        </p>
      )}
      {(e.note || e.stream) && (
        <p className="mt-2 text-sm text-fog">{[e.note, e.stream].filter(Boolean).join('. ')}</p>
      )}
    </li>
  )
}

export default function Education({ tone }) {
  const [lead, ...rest] = profile.education || []
  if (!lead) return null
  return (
    <Section id="education" title="Education" tone={tone}>
      <Featured e={lead} />
      {rest.length > 0 && (
        <ul className="mt-5 grid gap-5 md:grid-cols-2">
          {rest.map((e) => (
            <Compact key={e.school} e={e} />
          ))}
        </ul>
      )}
    </Section>
  )
}
