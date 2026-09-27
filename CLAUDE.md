# OCTRI Website — Project Notes

Static marketing site for the Ocean Triathlon Team (OCTRI).

- GitHub repo: **`octri-egypt/octri-egypt.github.io`** (this is a GitHub Pages **user/org site**,
  so it is served at the **domain root**: **https://octri-egypt.github.io/**).
- Remote URL: `https://github.com/octri-egypt/octri-egypt.github.io.git`.
- Deployed via GitHub Actions to GitHub Pages (Settings → Pages → Source: GitHub Actions).

## Critical context: this is a STATIC SPA

The site was **migrated away from the original Lovable/TanStack Start + Cloudflare Workers
SSR setup**, which cannot run on GitHub Pages (static file host only). Do **not** reintroduce
SSR, server routes, Cloudflare Workers, TanStack Start/Query, or any backend runtime. The site
must stay fully static and client-rendered.

## Stack

- **Vite 7** + **React 19** + **React Router 7** (SPA, `createBrowserRouter`)
- **Tailwind CSS v4** (CSS-first config via `@tailwindcss/vite`, theme tokens in `src/styles.css`)
- No component library — only the small custom components in `src/components`. (The 50+ shadcn/Radix
  UI files from the original project were deleted as dead weight.)

## How it works

- `index.html` mounts `#root` via `src/main.tsx`.
- `src/App.tsx` = layout (Header/Footer) + `<Outlet/>` + error view.
- Pages live in `src/routes/*` as **default-exported** components. Page titles are set with the
  `useDocumentTitle` hook (not per-route meta).
- Shared page header markup is in `src/components/PageHeader.tsx` (eyebrow/title/description).
- Shared site constants (join form, contact info, social links, site URL) live in `src/lib/constants.ts`.
  **All "Join Us" / "Join OCTRI" CTAs must use the `JOIN_FORM` constant — keep a single source of truth.**

## Routes / page structure

- `/` (Home), `/about`, `/services` (Programs), `/offers`, `/achievements`, `/events`,
  `/partners`, `/fitness`, `/schedule`, `/contact`, `*` (404).
- Header nav collapses dropdowns: **Team** → Achievements/Events/Partners,
  **Training** → Fitness/Schedule. Dropdown hover uses a 200ms close-delay tolerance
  (no margin gap — see `Header.tsx`); mobile uses a flat list.
- `@` alias → `src/` (configured in `vite.config.ts`).
- Images in `src/assets/` (fingerprinted into `dist/assets/` on build).
- `public/` → `favicon.svg`, `manifest.json`, `robots.txt`, `sitemap.xml` (copied verbatim).

## Deployment (GitHub Pages via GitHub Actions)

- `.github/workflows/deploy.yml`: push to `main` (or manual dispatch) → `npm ci` → `npm run build`
  → upload `dist/` → deploy with `actions/deploy-pages@v4`.
- **`dist/` is never committed** — it is built in CI. (`.gitignore` excludes it.)
- **SPA fallback:** `postbuild` copies `dist/index.html` → `dist/404.html` so deep links
  (`/about`, `/schedule`) resolve on refresh/direct open.

## Base path (IMPORTANT)

- Base path is set in `vite.config.ts` (`base: "/"`). This is correct because the repo is a
  `<user>.github.io` **user/org site** served at the domain root. **Do not change it to a subpath.**
- If this were ever moved to a **project repo** (`<user>/<repo>`), you would set `base: "/<repo>/"`
  and rebuild — otherwise assets 404. (That is not the case here.)
- Keep `sitemap.xml` and `robots.txt` URLs pointing at `https://octri-egypt.github.io/`.

## Deep-link / 404 behavior (expected)

- Deep links like `/schedule` or `/about` return **HTTP 404 status** but still serve the app
  (`#root` + JS bundle) via the `404.html` fallback, so the page boots and React Router renders it.
  This is normal GitHub Pages SPA behavior (no server rewrites). Status code only; UX is fine.
- To get a clean 200 on deep links you would need a **custom domain** with SPA-rewrite support;
  not possible on the bare `*.github.io` static host.

## Common commands

```bash
npm install
npm run dev        # localhost:5173 (hot reload)
npm run build      # tsc --noEmit && vite build (+ 404.html copy)
npm run preview    # serve dist/ at localhost:4173
npm run lint
```

## Notes

- "Join Us" / "Join OCTRI" CTAs link to a Google Form via the `JOIN_FORM` constant in
  `src/lib/constants.ts` (single source of truth). Footer also has a "Find Us on Maps" button
  to a Google Maps short link (kept as `MAPS_URL` in `Footer.tsx`).
- The reference site (octri-egypt.com) is the content source; this site preserves its own theme.
  Reference `/blogs` is empty — no blog page was created. Fitness/offer descriptions were written
  on-brand because the reference had none; swap in real program details + photos when available.
- Images are full-resolution JPEG/PNG; convert to AVIF/WebP + `srcset` for better Lighthouse scores.
- `public/favicon.svg` must have inline `fill="#ffffff"` on the `<path>` element and no `<style>`/`@media (prefers-color-scheme)` blocks. SVGs used as `<img>` sources don't apply internal CSS stylesheets on Android browsers, causing the logo to render dimly — always hardcode fill colors for cross-platform consistency.
