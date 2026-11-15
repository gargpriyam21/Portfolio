// Shows an organisation's logo when a matching file exists in src/assets/logos,
// and a lettered tile when it does not. See src/assets/logos/README.md.
const files = import.meta.glob('../assets/logos/*.{svg,png,webp,jpg,jpeg}', {
  eager: true,
  query: '?url',
  import: 'default',
})
const byKey = Object.fromEntries(
  Object.entries(files).map(([path, url]) => [path.split('/').pop().replace(/\.[^.]+$/, '').toLowerCase(), url]),
)

const sizes = { sm: 'size-10 rounded-lg', md: 'size-12 rounded-xl', lg: 'size-16 rounded-2xl', xl: 'size-24 rounded-3xl p-3' }

export default function Logo({ file, name, mark, size = 'md' }) {
  const box = sizes[size] || sizes.md
  const url = file ? byKey[file.toLowerCase()] : undefined
  const letters = mark || name.split(/\s+/).map((w) => w[0]).join('').slice(0, 3).toUpperCase()

  if (url) {
    return (
      <span className={`inline-flex shrink-0 items-center justify-center overflow-hidden bg-white p-2 ring-1 ring-line ${box}`}>
        <img src={url} alt={`${name} logo`} loading="lazy" decoding="async" className="max-h-full max-w-full object-contain" />
      </span>
    )
  }

  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center border border-line bg-raise font-display font-semibold tracking-tight text-accent ${box} ${
        letters.length > 2 ? 'text-xs' : 'text-base'
      }`}
    >
      {letters}
    </span>
  )
}
