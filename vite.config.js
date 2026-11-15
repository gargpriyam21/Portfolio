import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages base path:
//   "/"             for a username.github.io repo or a custom domain
//   "/<repo-name>/" for a project repo (for example "/portfolio/")
// This site lives in the repository github.com/gargpriyam21/Portfolio, so it is
// served from /Portfolio/ (the path is case-sensitive).
// Override without editing this file: VITE_BASE=/ npm run build
export default defineConfig({
  base: process.env.VITE_BASE || '/Portfolio/',
  plugins: [react(), tailwindcss()],
})
