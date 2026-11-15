// Shared section frame: consistent spacing, a labelled landmark and one h2.
// `tone` alternates the background between sections ('base' or 'alt'); cards
// inside pick the contrasting surface automatically through the `surface` class.
export default function Section({ id, title, lead, children, tone = 'base' }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`tone-${tone} py-20 sm:py-28`}>
      <div className="shell">
        <div className="mb-10 sm:mb-14">
          <h2 id={`${id}-title`} className="text-4xl font-semibold sm:text-5xl">
            {title}
          </h2>
          {lead && <p className="mt-4 text-lg text-fog">{lead}</p>}
        </div>
        {children}
      </div>
    </section>
  )
}
