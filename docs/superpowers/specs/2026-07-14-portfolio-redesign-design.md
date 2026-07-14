# Portfolio Redesign — Design Spec

**Date:** 2026-07-14
**Scope:** Full visual redesign of `artifacts/portfolio`, executed section by section with live review after each part.

## Direction

- **Aesthetic:** Dark & techy (AI/ML engineer). Dark theme is the primary look.
- **Accent:** Electric cyan/blue.
- **Background:** Animated particle-network (connected drifting nodes) in cyan.
- **Theme mode:** Light + dark **toggle** (navbar, via `next-themes`). Dark is default; light is a refined alternate. Every section must look correct in both.

## Design system (Part 0 — foundation)

Lives in `src/index.css` + `AnimatedBackground.tsx` + navbar theme toggle.

### Palette (HSL tokens)

Dark (default):
- `background` `222 47% 6%`, `foreground` `210 40% 96%`
- `card` `222 40% 10%` (~60% alpha), `card-foreground` `210 40% 96%`
- `primary` (cyan) `189 94% 55%`, `primary-foreground` `222 47% 6%`
- `accent` (blue partner) `205 100% 60%`
- `muted-foreground` `215 20% 60%`
- `border`/`input` cyan-tinted low opacity

Light (alternate): refined version of current light palette, same cyan primary so accents are consistent across modes.

### Typography

- **Outfit** — display headings (existing).
- **DM Sans** — body (existing).
- **JetBrains Mono** — NEW; small uppercase eyebrow labels above sections (e.g. `// EXPERIENCE`). Add to the Google Fonts import and a `--font-mono` token.
- Headings use cyan→blue `.text-gradient`.

### Global background

Rewrite `AnimatedBackground.tsx` as a canvas particle-network: slow-drifting cyan nodes, faint connecting lines when near, low density, low opacity behind content. Respects `prefers-reduced-motion` (static fallback). Must read well in both themes.

### Section language (applied per section)

- Mono uppercase eyebrow → gradient display heading → content.
- Dark-glass cards: translucent surface, cyan hairline border, soft cyan glow on hover. Replaces the current white `.glass-card` (keep the class name, restyle it, and make it theme-aware).
- Cyan for links, icons, active nav, focus rings.
- Preserve all existing content (job titles, projects, publications, chatbot responses) — this is visual only.

## Execution order (part by part)

Each part: redesign → run app for live review → user approves → next.

0. **Foundation** — tokens, fonts, `.glass-card`/`.text-gradient` restyle, `AnimatedBackground`, theme toggle wiring
1. Navbar (incl. theme toggle button)
2. Hero
3. About
4. Experience
5. Education
6. Skills
7. Services
8. Projects
9. Achievements
10. Publications
11. Contact
12. Footer
13. Chatbot

## Constraints / non-goals

- No content changes; no backend. Contact form stays a mock; chatbot stays rule-based.
- Keep the base-path routing intact (Vite `base` + Wouter base) — do not touch deploy config.
- Verify each part with `npm run --workspace @workspace/portfolio typecheck` and by running the dev server.
