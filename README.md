# Priyam Garg: portfolio

A single-page portfolio built with React, Vite and Tailwind CSS. Fully static, deployed to GitHub Pages.

## Run locally

```bash
npm install
npm run dev        # development server with hot reload
npm run build      # production build into dist/
npm run preview    # serve the production build locally
```

## Update the content

Everything on the page comes from one file: `src/data/profile.js`.

- Change text, skills, projects, career and links there. No component edits needed.
- Leave a field as `''` (or a list as `[]`) and that element or section is not rendered.
- `accent` sets the accent colour, one value per theme.
- `trace` is the replayable agent run in the hero (simplified, made-up data).
- `career` is the single career card, newest first. Each stop has a one-line `outcome` and its bullet `points`.
- `resume`: put a PDF in `public/` and set its file name (for example `'resume.pdf'`) to show download buttons and a palette action.
- `contact.formEndpoint`: create a form at a form service such as Formspree and paste its URL here. The form then replaces the info card in the contact section. Empty means no form.
- `links.email`: set an address to show an email button. It is empty by design.

### Logos and photos

- Logos: `src/assets/logos/`, file names listed in the README there (for example `aws.png`).
- Photos: `src/assets/photos/`, file names listed in the README there (`portrait`, `work-aws`, `edu-ncsu`, `project-dog-collar`, ...).

Both appear automatically once the file exists. While a photo is missing, `npm run dev` shows a dashed box naming the expected file; the published site hides the slot.

### Light and dark mode, command palette

- The site follows the visitor's system theme and remembers their choice from the sun/moon button.
- Press Cmd+K (Mac) or Ctrl+K to jump to any section or run an action.

### Design notes

`PRODUCT.md` and `.impeccable/` hold the design brief and review history used with the Impeccable design skill.

## Publish on GitHub Pages

The site is published from https://github.com/gargpriyam21/Portfolio and served at
https://gargpriyam21.github.io/Portfolio/.

1. Push to the `main` branch.
2. One time only: in the repository, open **Settings > Pages** and set **Source** to **GitHub Actions**.
3. Every push to `main` runs `.github/workflows/deploy.yml`, which builds the site and deploys `dist/`. It can also be run manually from the Actions tab.

The base path `/Portfolio/` is set in `vite.config.js` and must match the repository name exactly, including capital letters. If the repository is renamed, change it there and update the URLs in `index.html`.

### Custom domain

Add a file named `CNAME` in `public/` containing only the domain, set the base path to `/` in `vite.config.js`, and update the URLs in `index.html`.

## Structure

```
src/
  data/profile.js      all content
  components/          one component per section, plus small shared pieces
  hooks/               theme and active-section tracking
  assets/logos/        organisation logos, picked up by file name
  assets/photos/       photos, picked up by file name
  index.css            theme tokens (dark and light) and motion
public/                favicon and social preview image
.github/workflows/     GitHub Pages deployment
```
