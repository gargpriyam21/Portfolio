import { profile } from '../data/profile.js'
import ExternalLink from './ExternalLink.jsx'
import { paletteShortcut } from './CommandPalette.jsx'

export default function Footer() {
  const { github, linkedin } = profile.links
  return (
    <footer className="border-t border-line py-8">
      <div className="shell flex flex-col gap-4 text-sm text-fog sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}
          <span className="hidden lg:inline">. Press {paletteShortcut} to jump anywhere.</span>
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-1 [&_a]:inline-flex [&_a]:min-h-11 [&_a]:items-center [&_a]:gap-1">
          <ExternalLink href={github} className="hover:text-accent">
            GitHub
          </ExternalLink>
          <ExternalLink href={linkedin} className="hover:text-accent">
            LinkedIn
          </ExternalLink>
          <a href="#home" className="hover:text-accent">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  )
}
