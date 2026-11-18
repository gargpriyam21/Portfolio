import { profile } from '../data/profile.js'
import Section from './Section.jsx'
import TechList from './TechList.jsx'
import ExternalLink from './ExternalLink.jsx'
import Photo, { photoUrl } from './Photo.jsx'
import ProjectCover from './ProjectCover.jsx'

function ProjectCard({ project }) {
  return (
    <li className="surface flex h-full flex-col overflow-hidden rounded-2xl border border-line">
      {photoUrl(project.photo) || !project.cover ? (
        <Photo name={project.photo} alt={`${project.name} screenshot`} className="aspect-[16/9] w-full border-b border-line" />
      ) : (
        <ProjectCover id={project.cover} className="border-b border-line" />
      )}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
      <h3 className="text-2xl font-semibold">{project.name}</h3>
      {(project.category || project.year) && (
        <p className="mt-1.5 text-sm text-fog">{[project.category, project.year].filter(Boolean).join(', ')}</p>
      )}
      {project.problem && <p className="mt-3 text-fog">{project.problem}</p>}
      <p className="mt-3 text-paper/90">{project.description}</p>
      <TechList items={project.tech} className="mt-5" />
      {(project.repo || project.demo) && (
        <div className="mt-auto flex flex-wrap gap-x-6 gap-y-1 pt-4 [&_a]:inline-flex [&_a]:min-h-11 [&_a]:items-center [&_a]:gap-1">
          <ExternalLink href={project.repo} className="text-link font-medium">
            Source code
            <span className="sr-only"> for {project.name}</span>
          </ExternalLink>
          <ExternalLink href={project.demo} className="text-link font-medium">
            {project.demoLabel || 'Live demo'}
            <span className="sr-only"> for {project.name}</span>
          </ExternalLink>
        </div>
      )}
      </div>
    </li>
  )
}

export default function Projects({ tone }) {
  return (
    <Section
      tone={tone}
      id="projects"
      title="Projects"
      lead="Things I built during my master’s and undergraduate years, outside of work."
    >
      <ul className="grid gap-5 md:grid-cols-2">
        {profile.projects.map((p) => (
          <ProjectCard key={p.name} project={p} />
        ))}
      </ul>
    </Section>
  )
}
