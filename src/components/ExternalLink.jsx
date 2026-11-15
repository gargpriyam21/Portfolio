import { ArrowUpRight } from 'lucide-react'

// Opens safely in a new tab and tells screen-reader users that it does.
export default function ExternalLink({ href, children, className = '', icon = true }) {
  if (!href) return null
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      {icon && <ArrowUpRight aria-hidden="true" className="inline-block size-[1em] shrink-0 translate-y-[-0.05em]" />}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}
