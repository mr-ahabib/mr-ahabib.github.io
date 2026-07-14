# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo actually is

Despite the monorepo scaffolding (Express API server, Drizzle/Postgres DB layer, OpenAPI codegen packages), **the only active, deployed application is `artifacts/portfolio`** — a static single-page personal portfolio site for Ahashan. It has no backend: the contact form is a UI mock (toast on submit) and the chatbot (`src/components/Chatbot.tsx`) is rule-based keyword matching, not an LLM. The portfolio does **not** import any `@workspace/api*` or `@workspace/db` package. Vercel builds and deploys only the portfolio (`vercel.json`).

Treat `artifacts/api-server`, `artifacts/mockup-sandbox`, and the `lib/*` packages as inert template boilerplate unless a task explicitly involves them.

## Package manager: npm, not pnpm

`replit.md` describes this as a pnpm workspace, but the repo is actually driven by **npm workspaces** — root `package.json` has a `workspaces` field, there's a committed `package-lock.json`, all root scripts shell out to `npm`, and Vercel runs `npm install`. Use `npm`, not `pnpm`, regardless of what `replit.md` / `pnpm-workspace.yaml` say.

## Commands

Run from the repo root:

```bash
npm run dev        # start portfolio dev server (PORT=3000, BASE_PATH=/my-portfolio/)
npm run build      # typecheck all workspaces, then build each workspace's build script
npm run typecheck  # tsc --build across project references (see below)
```

Portfolio-specific (from root, targeting the workspace):

```bash
npm run --workspace @workspace/portfolio dev        # vite dev
npm run --workspace @workspace/portfolio build      # vite build -> artifacts/portfolio/dist/public
npm run --workspace @workspace/portfolio serve      # vite preview
npm run --workspace @workspace/portfolio typecheck  # tsc -p ... --noEmit
```

There is **no test runner and no linter configured** in this repo — do not assume `npm test` or eslint exist. Verification is typecheck + build.

## BASE_PATH / routing gotcha

The site is served under a base path (`/my-portfolio/` in dev via the `BASE_PATH` env var; `vite.config.ts` reads `process.env.BASE_PATH`, default `/`). This flows through two places that must stay in sync:
- Vite's `base` option (asset URLs).
- Wouter's router base in `App.tsx`: `<WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>`.

The recent commit history ("path fixed") is entirely about getting this base-path config right for Vercel. When touching routing or deploy config, verify both the Vite base and the Wouter base together.

## Portfolio architecture

- Single route (`/`) rendering `src/pages/Portfolio.tsx`, which composes ordered section components from `src/components/sections/` (Hero, About, Experience, Education, Skills, Services, Projects, Achievements, Publications, Contact) plus `layout/Navbar`, `layout/Footer`, a global `AnimatedBackground`, and the floating `Chatbot`.
- **The personal/content data (job titles, projects, publications, etc.) is hardcoded inside the section components and the Chatbot's `getResponse`.** Updating the portfolio's content means editing those component files directly — there is no CMS or data file.
- UI is **shadcn/ui (new-york style)** in `src/components/ui/` over Radix primitives. `components.json` defines aliases; `@/*` → `src/*`, `@assets` → `../../attached_assets`.
- Styling is **Tailwind CSS v4** (via `@tailwindcss/vite`, no `tailwind.config.js`). Theme tokens are HSL CSS variables defined in `src/index.css` under `@theme inline` + `:root`. Fonts: DM Sans (body), Outfit (display).
- Animations use **framer-motion**; data-fetching scaffolding uses `@tanstack/react-query` (client is set up but there's no real API).
- React 19, Vite 7, wouter for routing.

## Monorepo TypeScript (only relevant if touching lib/* packages)

Every package extends `tsconfig.base.json` (`composite: true`, bundler resolution, es2022). Root `tsconfig.json` lists packages as project references. Always typecheck from the root (`npm run typecheck` → `tsc --build`) so cross-package `.d.ts` outputs resolve; running `tsc` inside a single package can fail if dependencies aren't built. Typecheck is `emitDeclarationOnly` — bundling is done by vite/esbuild, not `tsc`.

`replit.md` documents the full template (api-server routes, Drizzle DB layer, Orval OpenAPI codegen in `lib/api-spec`) — consult it if a task genuinely reaches into those packages.
