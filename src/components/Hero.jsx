import { Download } from 'lucide-react'
import { profile } from '../data/profile.js'
import { resumeHref } from '../lib/resume.js'
import RunTrace from './RunTrace.jsx'
import Skyline, { NeedleIcon } from './Skyline.jsx'

export default function Hero() {
  const { name, role, team, location, headline, intro, availability } = profile

  return (
    <section id="home" aria-labelledby="home-title" className="pt-28 pb-14 sm:pt-32 sm:pb-16">
      <div className="shell grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14">
        <div>
          {availability && (
            <p className="hero-rise mb-6 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-sm text-paper">
              <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
              {availability}
            </p>
          )}

          <h1
            id="home-title"
            className="hero-rise font-display text-6xl font-semibold leading-[0.95] tracking-[-0.035em] text-paper sm:text-8xl lg:text-[5.25rem] xl:text-[6.25rem]"
            style={{ '--d': 0 }}
          >
            {name}
          </h1>

          <p className="hero-rise mt-6 font-display text-2xl font-medium leading-snug sm:text-3xl" style={{ '--d': 1 }}>
            <span className="block text-accent-ink">{role}</span>
            {team && <span className="block text-paper">{team}</span>}
          </p>

          <p className="hero-rise mt-7 text-xl text-paper sm:text-2xl" style={{ '--d': 2 }}>
            {headline}
          </p>
          <p className="hero-rise mt-4 text-lg text-fog" style={{ '--d': 2 }}>
            {intro}
          </p>

          <div className="hero-rise mt-9 flex flex-wrap gap-3" style={{ '--d': 3 }}>
            <a href="#work" className="btn btn-solid">
              View my work
            </a>
            <a href="#contact" className="btn btn-quiet">
              Get in touch
            </a>
            {resumeHref && (
              <a href={resumeHref} download className="btn btn-quiet">
                <Download aria-hidden="true" className="size-4" />
                Download resume
              </a>
            )}
          </div>

          {location && (
            <p className="hero-rise mt-6 inline-flex items-center gap-2 text-paper" style={{ '--d': 4 }}>
              <NeedleIcon className="size-5 text-accent-ink" />
              {location}
            </p>
          )}
        </div>

        <div className="hero-rise" style={{ '--d': 2 }}>
          <RunTrace />
        </div>
      </div>

      <div className="shell mt-12 sm:mt-16">
        <Skyline />
      </div>
    </section>
  )
}
