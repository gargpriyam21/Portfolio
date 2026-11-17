import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowUpRight, CornerDownLeft, Download, Hash, Moon, Play, Search, Sun } from 'lucide-react'
import { profile } from '../data/profile.js'
import { toggleTheme } from '../hooks/useTheme.js'
import useTheme from '../hooks/useTheme.js'
import { resumeHref } from '../lib/resume.js'

export const openPalette = () => window.dispatchEvent(new CustomEvent('open-palette'))
export const replayRun = () => window.dispatchEvent(new CustomEvent('replay-run'))

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)
export const paletteShortcut = isMac ? '⌘K' : 'Ctrl K'

// Keyboard-first jump list: sections, links and a few actions.
export default function CommandPalette({ sections }) {
  const dialogRef = useRef(null)
  const inputRef = useRef(null)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const theme = useTheme()

  const items = useMemo(() => {
    const go = (id) => () => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      history.replaceState(null, '', `#${id}`)
    }
    const open = (url) => () => window.open(url, '_blank', 'noopener,noreferrer')
    const list = [
      ...sections.map((s) => ({ group: 'Go to', label: s.label, icon: Hash, run: go(s.id) })),
      {
        group: 'Actions',
        label: 'Replay the agent run',
        icon: Play,
        run: () => {
          go('home')()
          replayRun()
        },
      },
      {
        group: 'Actions',
        label: theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme',
        icon: theme === 'dark' ? Sun : Moon,
        run: toggleTheme,
      },
    ]
    if (resumeHref) {
      list.push({
        group: 'Actions',
        label: 'Download resume',
        icon: Download,
        run: () => {
          const a = document.createElement('a')
          a.href = resumeHref
          a.download = ''
          a.click()
        },
      })
    }
    if (profile.links.linkedin) list.push({ group: 'Links', label: 'Open LinkedIn', icon: ArrowUpRight, run: open(profile.links.linkedin) })
    if (profile.links.github) list.push({ group: 'Links', label: 'Open GitHub', icon: ArrowUpRight, run: open(profile.links.github) })
    return list
  }, [sections, theme])

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase()
    return q ? items.filter((i) => i.label.toLowerCase().includes(q) || i.group.toLowerCase().includes(q)) : items
  }, [items, query])

  useEffect(() => {
    const show = () => {
      const d = dialogRef.current
      if (!d || d.open) return
      setQuery('')
      setActive(0)
      d.showModal()
      requestAnimationFrame(() => inputRef.current?.focus())
    }
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        if (dialogRef.current?.open) dialogRef.current.close()
        else show()
      }
    }
    window.addEventListener('open-palette', show)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('open-palette', show)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  const choose = (item) => {
    dialogRef.current?.close()
    item?.run()
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => (shown.length ? (i + 1) % shown.length : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => (shown.length ? (i - 1 + shown.length) % shown.length : 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      choose(shown[active])
    }
  }

  let lastGroup = null
  return (
    <dialog
      ref={dialogRef}
      aria-label="Jump to a section or run an action"
      className="palette m-0 mx-auto mt-[12vh] w-[min(36rem,calc(100vw-2rem))] max-w-none rounded-2xl border border-line bg-panel p-0 text-paper card-shadow"
      onClick={(e) => {
        if (e.target === dialogRef.current) dialogRef.current.close()
      }}
    >
      <div className="flex items-center gap-3 border-b border-line px-4">
        <Search aria-hidden="true" className="size-5 shrink-0 text-fog" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setActive(0)
          }}
          onKeyDown={onKeyDown}
          placeholder="Jump to a section or run an action"
          aria-label="Search sections and actions"
          aria-controls="palette-list"
          aria-activedescendant={shown[active] ? `palette-item-${active}` : undefined}
          role="combobox"
          aria-expanded="true"
          className="h-14 w-full bg-transparent text-base text-paper outline-none placeholder:text-fog"
        />
      </div>

      <ul id="palette-list" role="listbox" aria-label="Results" className="max-h-[50vh] overflow-y-auto p-2">
        {shown.length === 0 && <li className="px-3 py-6 text-center text-fog">No match. Try a section name, such as Work.</li>}
        {shown.map((item, i) => {
          const header = item.group !== lastGroup
          lastGroup = item.group
          const Icon = item.icon
          return (
            <li key={`${item.group}-${item.label}`} role="none">
              {header && <p className="px-3 pb-1 pt-3 text-sm text-fog">{item.group}</p>}
              <button
                id={`palette-item-${i}`}
                type="button"
                role="option"
                aria-selected={i === active}
                onMouseMove={() => setActive(i)}
                onClick={() => choose(item)}
                className={`flex min-h-11 w-full items-center text-left gap-3 rounded-lg px-3 ${
                  i === active ? 'bg-raise text-paper' : 'text-paper/90'
                }`}
              >
                <Icon aria-hidden="true" className={`size-4 shrink-0 ${i === active ? 'text-accent-ink' : 'text-fog'}`} />
                <span className="flex-1">{item.label}</span>
                {i === active && <CornerDownLeft aria-hidden="true" className="size-4 text-fog" />}
              </button>
            </li>
          )
        })}
      </ul>

      <p className="flex gap-5 border-t border-line px-4 py-2.5 text-sm text-fog">
        <span>↑ ↓ to move</span>
        <span>Enter to open</span>
        <span>Esc to close</span>
      </p>
    </dialog>
  )
}
