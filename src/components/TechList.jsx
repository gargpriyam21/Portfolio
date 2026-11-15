// Small list of technologies used for one piece of work.
export default function TechList({ items, className = '' }) {
  if (!items?.length) return null
  return (
    <ul aria-label="Technologies" className={`flex flex-wrap gap-2 ${className}`}>
      {items.map((t) => (
        <li key={t} className="rounded-full border border-line px-3 py-1 text-sm text-fog">
          {t}
        </li>
      ))}
    </ul>
  )
}
