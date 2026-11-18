import { profile } from './data/profile.js'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Highlights from './components/Highlights.jsx'
import About from './components/About.jsx'
import Work from './components/Work.jsx'
import Career from './components/Career.jsx'
import Education from './components/Education.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Publications from './components/Publications.jsx'
import Contact from './components/Contact.jsx'
import Achievements from './components/Achievements.jsx'
import Footer from './components/Footer.jsx'
import CommandPalette from './components/CommandPalette.jsx'

const has = (list) => Array.isArray(list) && list.length > 0

// Page order. A section appears only when it has content.
const order = [
  { id: 'highlights', label: 'Highlights', Component: Highlights, show: Boolean(profile.highlights) },
  { id: 'about', label: 'About', Component: About, show: Boolean(profile.aboutLead) || has(profile.about) },
  { id: 'work', label: 'Work', Component: Work, show: Boolean(profile.work?.summary) },
  { id: 'career', label: 'Career', Component: Career, show: has(profile.career) },
  { id: 'education', label: 'Education', Component: Education, show: has(profile.education) },
  { id: 'skills', label: 'Skills', Component: Skills, show: has(profile.skills) },
  { id: 'projects', label: 'Projects', Component: Projects, show: has(profile.projects) },
  { id: 'publications', label: 'Publications', Component: Publications, show: has(profile.publications) },
  { id: 'achievements', label: 'Achievements', Component: Achievements, show: has(profile.achievements) },
  { id: 'contact', label: 'Contact', Component: Contact, show: true },
]

// Sections linked from the desktop navigation bar; the rest live in the
// mobile menu and the command palette.
const primary = ['about', 'work', 'career', 'education', 'projects']

export default function App() {
  const visible = order.filter((s) => s.show)
  const sections = [{ id: 'home', label: 'Home' }, ...visible.map(({ id, label }) => ({ id, label }))]

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:font-semibold focus:text-on-accent"
      >
        Skip to content
      </a>
      <Nav sections={sections} primary={primary} />
      <main id="main">
        <Hero />
        {/* Backgrounds alternate automatically, starting with the alternate tone after the hero. */}
        {visible.map(({ id, Component }, i) => (
          <Component key={id} tone={i % 2 === 0 ? 'alt' : 'base'} />
        ))}
      </main>
      <Footer />
      <CommandPalette sections={sections.filter((s) => s.id !== 'home')} />
    </>
  )
}
