# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo actually is

A single static single-page personal portfolio site for Ahashan, living in **`portfolio/`** (the only workspace). It has no backend: the contact form posts to a formsubmit.co endpoint and the chatbot (`src/components/Chatbot.tsx`) is rule-based keyword matching, not an LLM. Vercel builds and deploys the portfolio (`vercel.json`).

> The old monorepo scaffolding (Express API server, Drizzle/Postgres DB layer, OpenAPI codegen `lib/*` packages, `artifacts/`, `scripts/`, replit files, `attached_assets/`) has been **removed** — the repo is now just the portfolio app under a thin root workspace.

## Package manager: npm

Driven by **npm workspaces** — root `package.json` has `"workspaces": ["portfolio"]`, there's a committed `package-lock.json`, all root scripts shell out to `npm`, and Vercel runs `npm install`. Use `npm`.

## Commands

Run from the repo root:

```bash
npm run dev        # start portfolio dev server (PORT=3000, base "/")
npm run build      # vite build -> portfolio/dist/public
npm run typecheck  # tsc -p portfolio/tsconfig.json --noEmit
npm run serve      # vite preview
```

These delegate to the `portfolio` workspace (`npm run --workspace portfolio <script>`).

There is **no test runner and no linter configured** in this repo — do not assume `npm test` or eslint exist. Verification is typecheck + build.

## BASE_PATH / routing gotcha

The site can be served under a base path via the `BASE_PATH` env var (`vite.config.ts` reads `process.env.BASE_PATH`, default `/`; Vercel deploys at `/`, the GitHub Pages workflow builds with `/my-portfolio/`). This flows through two places that must stay in sync:
- Vite's `base` option (asset URLs).
- Wouter's router base in `App.tsx`: `<WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>`.

The recent commit history ("path fixed") is entirely about getting this base-path config right for Vercel. When touching routing or deploy config, verify both the Vite base and the Wouter base together.

## Portfolio architecture

- Single route (`/`) rendering `src/pages/Portfolio.tsx`, which composes ordered section components from `src/components/sections/` (Hero, About, Experience, Education, Skills, Services, Projects, Achievements, Publications, Contact) plus `layout/Navbar`, `layout/Footer`, a global `AnimatedBackground`, and the floating `Chatbot`.
- **The personal/content data (job titles, projects, publications, etc.) is hardcoded inside the section components and the Chatbot's `getResponse`.** Updating the portfolio's content means editing those component files directly — there is no CMS or data file.
- UI is **shadcn/ui (new-york style)** in `src/components/ui/` over Radix primitives. `components.json` defines aliases; `@/*` → `src/*`.
- Styling is **Tailwind CSS v4** (via `@tailwindcss/vite`, no `tailwind.config.js`). Theme tokens are HSL CSS variables in `src/index.css`. Fonts: **Sora** (`--font-display`, headings), **Inter** (`--font-sans`, body), **JetBrains Mono** (`--font-mono`, labels/HUD text).
- Animations use **framer-motion**; the Skills radar uses **recharts**; data-fetching scaffolding uses `@tanstack/react-query` (client is set up but there's no real API).
- React 19, Vite 7, wouter for routing.

## Design system (visual conventions)

The whole portfolio follows one deliberate look: **glossy-blue, neon, cyberpunk — dark-first**. All of it is token/utility-driven in `src/index.css`, so match these conventions when adding or editing UI rather than inventing new styles.

- **Theme:** dark is default; light/dark toggle via `next-themes` (`attribute="class"`, wired in `App.tsx`). Dark tokens live under `:root, .dark`; light under `.light`. `@custom-variant dark` makes `dark:` utilities respond to the class. Every component must read correct in **both** themes — use tokens (`bg-card`, `text-foreground`, `border-primary`…), never hardcoded `bg-white`/`text-white` (removing those was most of the redesign).
- **Palette (theme-split by design):** dark mode = neon terminal (primary electric cyan, accent teal, accent-2 spring green on deep teal-black); light mode = engineering blueprint (primary indigo ink, accent azure, accent-2 drafting teal on cool paper with a drafting-grid overlay). The two modes are intentionally different worlds. Gradients are 3-stop: `from-primary via-accent to-accent-2`. Gradient-filled buttons use `text-primary-foreground`, never `text-white`.
- **NO diffuse background glow** — this is an explicit, repeated user rule. No large blurred `box-shadow` blooms (`0 0 40px`), radial glow blobs, `-inset blur` halos, or glowing grid backdrops behind content. See the `portfolio-visual-style` memory.
- **Neon EDGE glow is wanted** — a tight glow hugging outlines. Use the `.neon-glow` / `.neon-glow-sm` utilities (defined in `index.css`), not ad-hoc big shadows.
- **Reusable utilities in `index.css`** (prefer these): `.eyebrow` (mono `// LABEL` section kicker), `.text-gradient` (blue→azure heading text), `.glass-card`, `.clip-hud` / `.clip-hud-sm` (angular cut-corner HUD shape), `.neon-glow*`, `.neon-text`, and the `holo-scanbar` / `holo-flicker` / `holo-scanlines` keyframes (holographic/CRT effects). All respect `prefers-reduced-motion` where relevant.
- **Section pattern:** centered `.eyebrow` + gradient heading + gradient divider, then content in **neon-bordered glass cards** (`border-primary/… bg-card/80 backdrop-blur` + `.neon-glow-sm`) with a top-right HUD corner bracket, cut-corner icon tiles (`.clip-hud-sm`), and mono meta/labels.
- **Notable custom pieces:** `components/HeroTerminal.tsx` (looping token-streamed terminal intro; renders all lines at fixed height so the panel never resizes), the `AnimatedBackground` canvas particle-network (theme-aware, reads accent color via a probe element), and the Skills capability **radar** chart.
- The persistent memory `portfolio-visual-style` records the glossy-blue / neon-edge rules.

## TypeScript

`portfolio/tsconfig.json` is a standalone config (es2022, bundler resolution, `strict`, `noEmit`, `@/*` → `src/*`). Typecheck with `npm run typecheck` (→ `tsc -p portfolio/tsconfig.json --noEmit`); bundling is done by vite/esbuild, not `tsc`.
