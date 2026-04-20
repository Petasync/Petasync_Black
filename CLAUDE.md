# CLAUDE.md - Petasync Black

## Project Overview

Petasync is a full-stack web application for a German IT service company (Ansbach/Nürnberg area). It includes a public-facing website with service listings, pricing, and templates showcase, plus a private admin dashboard for managing inquiries, appointments, invoices, and quotes.

**Live site:** https://petasync.de

## Tech Stack

- **Frontend:** React 18 + TypeScript, Vite (SWC), Tailwind CSS 3, shadcn/ui (Radix UI)
- **Backend:** PHP API (`/api/` directory), PostgreSQL database
- **Auth:** JWT with refresh token rotation, TOTP 2FA
- **Animations:** GSAP, Framer Motion, Three.js (3D hero)
- **State:** Zustand, Tanstack React Query
- **Forms:** React Hook Form + Zod validation
- **Deployment:** Hetzner via FTPS, GitHub Actions CI/CD

## Commands

```bash
npm run dev          # Start dev server (port 8080)
npm run build        # Production build + SSG prerendering (35+ routes via Puppeteer)
npm run build:quick  # Production build without prerendering
npm run build:dev    # Development build with source maps
npm run lint         # ESLint check (TypeScript + React Hooks)
npm run preview      # Preview production build locally
npm run deploy       # Deploy to Hetzner (runs build + FTPS upload)
```

## Project Structure

```
├── api/                    # PHP backend API
│   ├── v1.php             # Main API router
│   ├── auth.php           # Authentication endpoints
│   ├── config.php         # DB/API config (defaults)
│   ├── config.local.example.php  # Local config template
│   └── lib/               # PHP utilities (Database, Router, JWT, Auth, Response)
│
├── src/
│   ├── main.tsx           # Entry point
│   ├── App.tsx            # Root router with lazy loading + retry logic
│   ├── pages/
│   │   ├── Index.tsx      # Home page (eager-loaded, all others lazy)
│   │   ├── services/      # 14 service detail pages
│   │   ├── websites/      # Website package pages (Template, Starter, Business, Enterprise)
│   │   └── admin/         # Admin pages (Dashboard, Inquiries, Invoices, Quotes, etc.)
│   ├── components/
│   │   ├── ui/            # shadcn/ui components (40+)
│   │   └── admin/         # Admin-specific components
│   ├── hooks/             # Custom hooks (auth, SEO, tracking, scroll)
│   ├── contexts/          # AuthContext for admin authentication
│   ├── lib/               # Utilities (api-client, analytics, pdf-generator, admin-store)
│   └── integrations/      # Supabase integration (legacy)
│
├── public/                # Static files (.htaccess, robots.txt, sitemap.xml, favicons)
├── database/              # PostgreSQL schema (schema.sql, migration_data.sql)
├── scripts/               # Build scripts (deploy.sh, prerender.mjs)
├── .github/workflows/     # CI/CD (deploy-hetzner.yml)
└── docs/                  # Operational documentation
```

## Key Architecture Patterns

### Lazy Loading with Retry
All pages except `Index.tsx` use `lazyWithRetry()` in `App.tsx` - a wrapper that auto-reloads the page on chunk load failures (stale chunks after deployment), with a session flag to prevent infinite loops.

### Path Aliases
`@/*` maps to `./src/*` (configured in `tsconfig.json` and `vite.config.ts`).

### SSG Prerendering
`scripts/prerender.mjs` uses Puppeteer to prerender 35+ public routes at build time for SEO. The build script runs `vite build && node scripts/prerender.mjs`.

### Admin Authentication
JWT-based with refresh token rotation. TOTP 2FA via OTPLib. Protected routes use `AdminProtectedRoute` component. Auth state managed via `AuthContext`.

### API Client
`src/lib/api-client.ts` provides a centralized API client with automatic token refresh on 401 responses.

### Code Splitting
Manual chunks in `vite.config.ts`: `react-vendor`, `three-vendor`, `ui-vendor`.

## Coding Conventions

- **Language:** TypeScript (strict mode OFF, `noImplicitAny: false`)
- **Styling:** Tailwind CSS utility classes; shadcn/ui for UI components
- **Components:** Functional components with hooks; shadcn/ui pattern for reusable UI
- **State:** Zustand for admin store; React Query for server state
- **Imports:** Use `@/` path alias for all `src/` imports
- **Content language:** German (UI text, page names, service descriptions)
- **Unused vars:** ESLint rule `@typescript-eslint/no-unused-vars` is OFF

## Environment Variables

Required env vars (see `.env.example`):
```
VITE_SUPABASE_PROJECT_ID
VITE_SUPABASE_PUBLISHABLE_KEY
VITE_SUPABASE_URL
VITE_GOOGLE_ANALYTICS_ID
VITE_MICROSOFT_CLARITY_ID
VITE_TURNSTILE_SITE_KEY
VITE_SITE_URL
```

## CI/CD Pipeline

GitHub Actions workflow (`.github/workflows/deploy-hetzner.yml`):
1. Triggers on push to `main` or manual dispatch
2. Node.js 20, `npm ci`, creates `.env` from GitHub Secrets
3. Builds project (`npm run build`)
4. Deploys `dist/` + `api/` to Hetzner via FTPS

## Testing

No test framework is configured. Use `npm run lint` for code quality checks.

## Important Notes

- **No Docker** - direct FTPS deployment to Hetzner
- **No pre-commit hooks** - no Husky or lint-staged configured
- **Apache server** - `.htaccess` handles SPA routing and security headers
- **PWA enabled** - service worker with auto-update; disabled in dev mode
- **Image optimization** - Sharp + SVGO in production builds only
- **Console logs** - stripped in production via Terser
- **Bot protection** - Cloudflare Turnstile on contact forms
- **DOM monkey-patch** - `index.html` patches `removeChild` to prevent browser extension crashes
