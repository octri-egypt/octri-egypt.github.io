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

## Vanta WAVES Redesign (2026-09-30, uncommitted → committed same day)

Site-wide visual overhaul into a premium blue sports-performance theme with the real
Vanta WAVES animation (three.js **r121** — `three@0.121.1` is pinned because Vanta's
waves plugin requires the old three.js API; do not upgrade three blindly).

- **`src/components/WaveBackground.tsx`** — Vanta WAVES host. Static `.wave-bg` ocean
  gradient paints instantly, then the canvas initializes on top. Destroyed/re-inited via
  IntersectionObserver when offscreen (performance). `subtle` prop variant for inner-page
  headers/footer. Respects `prefers-reduced-motion: reduce` (static fallback only) and
  WebGL unavailability.
- **Waves are site-wide**, not just the homepage hero: homepage hero + inner-page
  `PageHeader` + Footer all host the animation.
- **`src/components/PageHeader.tsx`** — inner-page hero. The wave band is full-bleed via
  the **50vw trick** (`left-1/2 -translate-x-1/2 w-screen`) and masked toward the bottom
  (`linear-gradient(180deg, black 55%, transparent 100%)`). **Gotcha:** the 50vw trick
  requires the positioning parent to be centered on the viewport — the band must hang off
  a full-width `relative` wrapper, NOT a left-aligned `max-w-3xl` one (that was the
  desktop full-width bug). Text stays in an inner `relative max-w-3xl`.
- **`src/styles.css`** — theme tokens retuned to the Vanta navy (`--background: oklch(0.145 0.05 252)`),
  glass cards, `.wave-bg`/`.page-hero` gradients, reveal animations. `html` has
  `overflow-x: clip` — required because `w-screen` (100vw) includes the Windows scrollbar
  width and would otherwise cause a horizontal scrollbar. Safe: the Header is `fixed`,
  not `sticky` (clip breaks sticky positioning).
- Smaller photo cards across pages (services `max-w-lg`, about `max-w-md`, 16/9 fitness cards).
- Fonts: Oswald display + Inter body via `--font-display`/`--font-sans` tokens.

## Recent Image Updates (2026-09-28)

### Homepage (`src/routes/index.tsx`)
- **Hero section**: `hero-swim.jpg` → `hero.webp`
- **Services - Swimming**: `swim.jpg` → `swimming_program.webp`
- **Services - Cycling**: `cycle.jpg` → `cycling_program.webp`
- **Services - Running**: `run.jpg` → `running_program.webp`
- **About OCTRI**: `team.jpg` → `about_octri.webp`
- **Organize your goals**: `community.jpg` → `Organize_your_goals_with_us.webp`

### About Page (`src/routes/about.tsx`)
- **Main image**: `team.jpg` → `about.webp`

### Services Page (`src/routes/services.tsx`)
- **Swimming Program**: `swim.jpg` → `swimming_service.webp`
- **Cycling Program**: `cycle.jpg` → `cycling_service.webp`
- **Running Program**: `run.jpg` → `running_service.webp`

All new images are WebP format, imported via `@/assets/` alias, with improved accessibility alt texts.
Old images retained in `src/assets/` as they're still used by other pages (fitness.tsx, etc.).

## PWA Implementation (Added 2026-09-24)

### Stack
- **Workbox** via `vite-plugin-pwa` (generateSW mode)
- **Web App Manifest** with icons, shortcuts, categories
- **Service Worker** with precaching, runtime caching, SPA navigation fallback

### Key Files
- `vite.config.ts` — VitePWA config with Workbox settings
- `src/hooks/use-pwa-install.ts` — Installation detection hook (cross-platform)
- `src/components/PWAInstallBanner.tsx` — Platform-aware install banner
- `src/main.tsx` — SW registration with update detection
- `index.html` — Apple PWA meta tags, theme-color, manifest link
- `scripts/generate-pwa-icons.js` — Sharp script generating icons from `octri_logo - cycle.webp`
- `public/icons/` — Generated icons (72-512px, maskable, apple-touch-icon)

### Manifest Configuration
- `start_url: "/"` — Root path (SW handles GitHub Pages 404)
- `display: "standalone"` — App-like experience
- `scope: "/"` — Full site scope
- Icons: 10 sizes (72-512px) + maskable (192x192) + apple-touch-icon (180x180)
- Shortcuts: Join, Programs, Schedule, Contact
- Categories: sports, health, fitness

### Service Worker Strategy
- **Precache**: All static assets (HTML, JS, CSS, images, fonts, manifest)
- **Runtime Caching**:
  - Google Fonts (stylesheets + webfonts) — CacheFirst, 1 year
  - Google APIs — StaleWhileRevalidate, 30 days
  - Root path `/` — NetworkFirst, 3s timeout
- **SPA Navigation Fallback**: `NavigationRoute` with `createHandlerBoundToURL("/index.html")`
  - Serves precached `index.html` (200) for all navigations
  - Fixes GitHub Pages 404 status for `/` and deep links
  - Denylist: `/_/*` and file extensions

### Installation UX
- **Android/Chromium Desktop**: Native install button via `beforeinstallprompt`
- **iOS/iPadOS**: Instructional modal (Share → Add to Home Screen)
- **Unsupported browsers**: No banner shown
- **Dismissal**: Persisted in localStorage (`octri-pwa-banner-dismissed-permanently`)
- **Engagement heuristic**: Banner shows after 3s delay when `isInstallable=true` or iOS

### Icon Generation
- Source: `src/assets/octri_logo - cycle.webp` (white cycle on transparent)
- Background: **Solid black** (`#000000`)
- Padding: **15% all sides** (logo at 70% of canvas)
- Maskable icon: **40% safe zone** (logo at 60%) for Android adaptive icons
- All icons flattened (RGB, no alpha)
- Run: `node scripts/generate-pwa-icons.js`

### GitHub Pages PWA Quirks
1. **Root path `/` returns 404** — Fixed by SW NavigationRoute serving precached `index.html` with 200
2. **`start_url` must return 200** — SW handles this; manifest uses `/`
3. **Deep links** — SW serves `index.html` (200), React Router handles routing
4. **Icons cached at install** — Users must **uninstall/reinstall** for icon updates
5. **SW updates** — `autoUpdate` mode; hourly update check in `main.tsx`

### Common PWA Commands
```bash
node scripts/generate-pwa-icons.js  # Regenerate icons from source logo
npm run build                       # Build with SW and manifest
npm run preview                     # Test PWA locally (serves dist/)
```

### Troubleshooting
- **404 on launch**: Uninstall PWA, clear site data, reinstall fresh
- **Old icons showing**: Uninstall/reinstall (icons cached at install time)
- **Install button not appearing**: Chrome requires ~30s engagement; banner waits for `beforeinstallprompt`
- **Windows shows white icon**: Uninstall/reinstall; Windows caches icons at install
- **iOS no native prompt**: Expected; shows instructional modal instead
