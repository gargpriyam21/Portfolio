// Photos are picked up from src/assets/photos by file name (see the README there).
const files = import.meta.glob('../assets/photos/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
})
const byKey = Object.fromEntries(
  Object.entries(files).map(([path, url]) => [path.split('/').pop().replace(/\.[^.]+$/, '').toLowerCase(), url]),
)

export function photoUrl(name) {
  return name ? byKey[name.toLowerCase()] : undefined
}

// Renders the photo when its file exists. When it does not, development builds
// show a dashed placeholder naming the file to add; the published site shows
// `fallback` (nothing by default).
export default function Photo({ name, alt, className = '', imgClassName = '', fallback = null, eager = false }) {
  const url = photoUrl(name)
  if (url) {
    return (
      <div className={`overflow-hidden ${className}`}>
        <img
          src={url}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className={`size-full object-cover ${imgClassName}`}
        />
      </div>
    )
  }
  if (import.meta.env.DEV && name) {
    return (
      <div
        className={`flex items-center justify-center border-2 border-dashed border-line p-3 text-center font-mono text-xs text-fog ${className}`}
      >
        Add src/assets/photos/{name}.jpg
      </div>
    )
  }
  return fallback
}
