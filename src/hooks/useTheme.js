import { useEffect, useState } from 'react'

// The theme lives on <html data-theme>. index.html sets it before first paint
// from the saved choice or the system setting; this keeps React in step with it.
const read = () => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark')

export function setTheme(theme) {
  document.documentElement.dataset.theme = theme
  try {
    localStorage.setItem('theme', theme)
  } catch {
    // Storage can be unavailable (private mode); the choice then lasts for this visit.
  }
  window.dispatchEvent(new CustomEvent('themechange', { detail: theme }))
}

export function toggleTheme() {
  setTheme(read() === 'dark' ? 'light' : 'dark')
}

export default function useTheme() {
  const [theme, setState] = useState(read)

  useEffect(() => {
    const sync = () => setState(read())
    window.addEventListener('themechange', sync)

    // Follow the system setting until the visitor makes their own choice.
    const media = window.matchMedia('(prefers-color-scheme: light)')
    const onSystem = (e) => {
      let saved = null
      try {
        saved = localStorage.getItem('theme')
      } catch {
        saved = null
      }
      if (!saved) {
        document.documentElement.dataset.theme = e.matches ? 'light' : 'dark'
        sync()
      }
    }
    media.addEventListener('change', onSystem)
    return () => {
      window.removeEventListener('themechange', sync)
      media.removeEventListener('change', onSystem)
    }
  }, [])

  return theme
}
