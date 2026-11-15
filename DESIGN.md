---
name: Priyam Garg, portfolio
description: Ink-navy and coral, one accent, an agent run that proves the work.
colors:
  ink: "#0d1220"
  panel: "#141c30"
  raise: "#1c2540"
  line: "#2a3553"
  line-strong: "#5b6889"
  fog: "#a3adc4"
  paper: "#eceff6"
  accent: "#ff7a59"
  danger: "#ff8f8f"
  light-ink: "#f3f5f9"
  light-panel: "#ffffff"
  light-raise: "#e8ecf4"
  light-line: "#d3d9e6"
  light-line-strong: "#7d88a3"
  light-fog: "#4c5872"
  light-paper: "#111830"
  light-accent: "#a84f00"
  light-danger: "#b4232a"
typography:
  display-name:
    fontFamily: "Bricolage Grotesque Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "6.25rem"
    fontWeight: 600
    lineHeight: 0.95
    letterSpacing: "-0.035em"
  heading-section:
    fontFamily: "Bricolage Grotesque Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "3rem"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  heading-card:
    fontFamily: "Bricolage Grotesque Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  lead-reveal:
    fontFamily: "Bricolage Grotesque Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.015em"
  body:
    fontFamily: "IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
  trace-data:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
rounded:
  sm: "6px"
  md: "12px"
  lg: "16px"
  pill: "999px"
spacing:
  section-y: "112px"
  section-y-phone: "80px"
  shell-x: "32px"
  shell-x-phone: "20px"
  card: "28px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "10px 20px"
    height: "46px"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "10px 20px"
    height: "46px"
  card:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.paper}"
    rounded: "{rounded.lg}"
    padding: "{spacing.card}"
  tag:
    backgroundColor: "transparent"
    textColor: "{colors.fog}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
  nav-bar:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.fog}"
    rounded: "{rounded.lg}"
    height: "56px"
---

## Overview

A dark, engineered portfolio for a software engineer who builds production AI agents. The page proves the work instead of claiming it: the hero holds a replayable run in which three agents work in parallel, save facts into a shared knowledge graph (one loses its worker and resumes from a checkpoint), and a question is then answered from the graph, and outcomes are drawn as small diagrams of the change. One coral accent on ink navy; light mode is the same world in daylight on cool off-white, never cream, with a dark AWS-style orange as its accent. The one-line Seattle skyline is the signature drawing.

## Colors

Two themes share one set of role names; components only ever use the roles (`ink`, `panel`, `raise`, `line`, `line-strong`, `fog`, `paper`, `accent`, `danger`), and `:root[data-theme]` swaps the values. The `light-*` tokens above are the light values of the same roles.

- **ink**: page ground and the "base" section tone.
- **panel**: the "alt" section tone and the default card ground. Section tones alternate down the page automatically; a card always takes the surface that contrasts with the section it sits on.
- **raise**: selected rows, hover fills, header strips inside cards.
- **line / line-strong**: hairlines and decorative borders use `line`; anything a person must see to operate (input borders, quiet-button borders) uses `line-strong` for at least 3:1.
- **fog**: secondary text (7:1 or better in both themes).
- **accent**: the only colour. Primary actions, the name's role line, active state, checks in the trace, diagram strokes, the skyline. Light theme uses a dark AWS-style orange (#a84f00) for text contrast.
- **danger**: only for failure inside a trace or diagram.

## Typography

Bricolage Grotesque for display (name, section headings, card headings, the About lead); IBM Plex Sans for reading; IBM Plex Mono only for data that is genuinely data (timestamps, step names and run ids in the trace). Headings balance their lines; body text uses pretty wrapping. Body paragraphs at 60+ characters per line are justified from tablet width up with automatic hyphenation; hero copy, short columns and phones stay ragged-right.

## Layout

A 72rem shell with 32px side padding (20px on phones). Sections: 112px vertical rhythm (80px on phones), heading block above the content with more space above than below. The hero is a 7:5 split (claim left, run trace right) with the skyline as its bottom divider. Grids vary by content rather than repeating one card size: Highlights is a 3+3 / 2+2+2 bento, Career is a 5:7 list-and-detail card, Skills are labelled rows.

## Elevation & Depth

Flat by default. One soft shadow (`0 18px 40px -18px`, darker in dark mode) for floating things only: the scrolled nav bar, the run trace card, the command palette. The palette's backdrop blurs the page lightly.

## Shapes

16px radius for cards and the nav bar, 12px for rows and inputs, pills for buttons and tags, 6px for small diagram blocks. Logos sit on a white rounded tile with a hairline ring so any brand colour reads in both themes.

## Components

- **Run trace**: header with the operator photo (initials until a portrait exists), Replay button, a run strip with status, a progress line, then rows of timestamp, step and detail with a check, a pulsing dot while running, or a cross on the failed row. Rows are always laid out and revealed in place, so the card never changes height. Labelled as a simplified replay with made-up data.
- **Highlight diagrams**: before/after bars, call blocks with dashed removed slots, a checkpoint track with a break and a resume arc, a stepped growth list, paper marks on a year line.
- **Career card**: stops on a rail (logo, organisation, first role, years); laptops show the chosen stop beside the list, which stays sticky; phones open the stop in place. Each role leads with one bold outcome line, then bullets.
- **Nav bar**: floating rounded bar, initials mark, five section links, search (Cmd/Ctrl K), theme toggle, primary "Get in touch". Reading-progress line on top.
- **Command palette**: native dialog, filter input, grouped results, keyboard hints.
- **Photo and logo slots**: filled by file name from `src/assets`; missing photos are hidden in production and shown as a dashed, named placeholder in development.

## Do's and Don'ts

- Do show the mechanism working (replay, diagram) before stating a number.
- Do keep a single accent; failure states are the only other colour.
- Do keep numbers generic and claims honest; label synthetic data.
- Don't stack identical icon-plus-heading cards; draw the content instead.
- Don't put a small label or eyebrow above a heading.
- Don't use mono as decoration; it is for data only.
- Don't let light mode drift to cream or warm paper; it stays cool off-white.
