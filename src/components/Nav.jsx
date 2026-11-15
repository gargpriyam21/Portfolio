import { useEffect, useRef, useState } from 'react'
import { Download, Menu, Moon, Search, Sun, X } from 'lucide-react'
import { profile } from '../data/profile.js'
import ExternalLink from './ExternalLink.jsx'
import useActiveSection from '../hooks/useActiveSection.js'
import useTheme, { toggleTheme } from '../hooks/useTheme.js'
import { resumeHref } from '../lib/resume.js'
import { openPalette, paletteShortcut } from './CommandPalette.jsx'

// Floating navigation: a rounded bar clear of the page edges. Desktop shows the
// main sections; everything else is one keystroke away in the command palette.
export default function Nav({ sections, primary }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const barRef = useRef(null)
  const buttonRef = useRef(null)
  const theme = useTheme()
  const active = useActiveSection(sections.map((s) => s.id))
  const links = sections.filter((s) => primary.includes(s.id))
  const initials = profile.name.split(/\s+/).map((w) => w[0]).join('')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8)
      // Reading-progress bar: written straight to the element to avoid re-renders.
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (barRef.current) barRef.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const { github, linkedin } = profile.links
  const nextTheme = theme === 'dark' ? 'light' : 'dark'
  const iconButton =
    'inline-flex size-11 items-center justify-center rounded-xl text-fog transition-colors hover:bg-raise hover:text-paper'

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div ref={barRef} aria-hidden="true" className="h-0.5 origin-left scale-x-0 bg-accent" />

      <div className="shell pt-3">
        <div
          className={`rounded-2xl border transition-[background-color,border-color,box-shadow] duration-200 ${
            open
              ? 'border-line bg-panel card-shadow'
              : scrolled
                ? 'border-line bg-panel/85 card-shadow backdrop-blur-md'
                : 'border-transparent bg-transparent'
          }`}
        >
          <nav aria-label="Main" className="flex h-14 items-center justify-between gap-2 pl-2.5 pr-1.5">
            <a href="#home" className="flex min-h-11 items-center gap-3 rounded-xl pr-2">
              <span
                aria-hidden="true"
                className="inline-flex size-9 items-center justify-center rounded-xl bg-accent font-display text-sm font-semibold text-on-accent"
              >
                {initials}
              </span>
              <span className="font-display text-lg font-semibold tracking-tight">{profile.name}</span>
            </a>

            <ul className="hidden items-center gap-0.5 lg:flex">
              {links.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    aria-current={active === s.id ? 'true' : undefined}
                    className={`inline-flex min-h-10 items-center rounded-full px-3.5 text-[0.9375rem] transition-colors ${
                      active === s.id ? 'bg-raise text-paper' : 'text-fog hover:text-paper'
                    }`}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={openPalette}
                className="hidden min-h-10 items-center gap-2 rounded-full border border-line px-3 text-sm text-fog transition-colors hover:border-line-strong hover:text-paper lg:inline-flex"
              >
                <Search aria-hidden="true" className="size-4" />
                <span className="sr-only">Search the page</span>
                <kbd className="font-sans">{paletteShortcut}</kbd>
              </button>
              <button type="button" onClick={openPalette} className={`${iconButton} lg:hidden`} aria-label="Search the page">
                <Search aria-hidden="true" className="size-5" />
              </button>
              <button
                type="button"
                onClick={toggleTheme}
                className={iconButton}
                aria-label={`Switch to ${nextTheme} theme`}
                title={`Switch to ${nextTheme} theme`}
              >
                {theme === 'dark' ? <Sun aria-hidden="true" className="size-5" /> : <Moon aria-hidden="true" className="size-5" />}
              </button>
              <a
                href="#contact"
                aria-current={active === 'contact' ? 'true' : undefined}
                className="ml-1 hidden min-h-10 items-center rounded-full bg-accent px-4 text-[0.9375rem] font-semibold text-on-accent transition-colors hover:bg-[color-mix(in_oklab,var(--accent)_86%,var(--paper))] lg:inline-flex"
              >
                Get in touch
              </a>
              <button
                ref={buttonRef}
                type="button"
                className="inline-flex size-11 items-center justify-center rounded-xl text-paper lg:hidden"
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? 'Close menu' : 'Open menu'}
                onClick={() => setOpen((v) => !v)}
              >
                {open ? <X aria-hidden="true" className="size-6" /> : <Menu aria-hidden="true" className="size-6" />}
              </button>
            </div>
          </nav>

          <div id="mobile-menu" hidden={!open} className="border-t border-line lg:hidden">
            <ul className="flex flex-col px-4 py-2">
              {sections
                .filter((s) => s.id !== 'home')
                .map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      onClick={() => setOpen(false)}
                      aria-current={active === s.id ? 'true' : undefined}
                      className={`flex min-h-11 items-center font-display text-xl font-medium ${
                        active === s.id ? 'text-accent' : 'text-paper'
                      }`}
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              <li className="mt-2 flex flex-wrap items-center gap-x-6 border-t border-line pt-2 pb-1 text-fog">
                {resumeHref && (
                  <a href={resumeHref} download className="inline-flex min-h-11 items-center gap-2 text-paper hover:text-accent">
                    <Download aria-hidden="true" className="size-4" />
                    Resume
                  </a>
                )}
                <ExternalLink href={github} className="inline-flex min-h-11 items-center gap-1 hover:text-accent">
                  GitHub
                </ExternalLink>
                <ExternalLink href={linkedin} className="inline-flex min-h-11 items-center gap-1 hover:text-accent">
                  LinkedIn
                </ExternalLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  )
}
