import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/bricolage-grotesque/opsz.css'
import '@fontsource/ibm-plex-sans/latin-400.css'
import '@fontsource/ibm-plex-sans/latin-500.css'
import '@fontsource/ibm-plex-sans/latin-600.css'
import '@fontsource/ibm-plex-mono/latin-400.css'
import './index.css'
import App from './App.jsx'
import { profile } from './data/profile.js'

// Accent colours from profile.js, one per theme.
const root = document.documentElement.style
if (profile.accent?.dark) root.setProperty('--accent-dark', profile.accent.dark)
if (profile.accent?.light) root.setProperty('--accent-light', profile.accent.light)
if (profile.accent?.lightText) root.setProperty('--accent-light-ink', profile.accent.lightText)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
