# BRC — Bharata Rashtra Cockroaches

> The ignored are speaking. A cinematic political movement website.

A dark, dramatic, revolutionary-styled movement site built with **Next.js 16**, **TypeScript**, **Tailwind CSS** and **Framer Motion**. Includes a full admin command center.

## Stack

- **Next.js 16** (App Router)
- **TypeScript**, strict
- **Tailwind CSS** with custom cinematic palette
- **Framer Motion** for cinematic transitions and counters
- **Lucide React** icons
- **Cookie-session admin auth** with route-group middleware
- **MongoDB** (optional) or local **JSON file** for state
- **Cloudinary** (optional) for branding/media uploads

## Project structure

```
src/
├── app/
│   ├── layout.tsx, page.tsx, globals.css
│   ├── manifesto/, voices/submit/
│   ├── api/
│   │   ├── auth/login/, members/, stories/,
│   │   ├── complaints/, content/, issues/,
│   │   ├── media/, notifications/, analytics/,
│   │   ├── branding/logo/
│   │   └── health/                  # liveness probe (no DB)
│   └── admin/
│       ├── layout.tsx, login/page.tsx
│       └── (shell)/                 # protected dashboard route group
├── components/
│   ├── Nav, Hero, Marquee, Issues, Reality,
│   ├── Voices, Manifesto, Join, Footer,
│   ├── CockroachEmblem, AnalyticsBeacon
│   └── admin/{AdminShell, PageHeader, StatCard}
├── lib/
│   ├── api.ts                       # apiUrl() + HAS_BACKEND helpers
│   ├── data.ts                      # seed: issues, voices, members, complaints
│   ├── db.ts                        # storage layer (Mongo or JSON file)
│   └── utils.ts
└── middleware.ts                    # admin auth + /api CORS
```

## Local development

```bash
npm install
npm run dev
```

- Landing: <http://localhost:3000>
- Manifesto: <http://localhost:3000/manifesto>
- Submit a story: <http://localhost:3000/voices/submit>
- Admin login: <http://localhost:3000/admin>
- Liveness: <http://localhost:3000/api/health>

### `.env.local`

```ini
# --- Admin auth (required for /admin) ---
ADMIN_USER=changeme
ADMIN_PASS=changeme
SESSION_SECRET=long-random-string

# --- Storage backend (optional) ---
# Set to use MongoDB. Leave empty to use ./data/db.json on disk.
MONGODB_URI=

# --- Branding uploads (optional) ---
# Required only if you upload a logo through the admin UI.
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# --- Backend CORS (only the dynamic build cares) ---
# Comma-separated list of origins that may call /api/*. Use "*" to disable
# the allowlist. Leave empty for same-origin only.
ALLOWED_ORIGINS=
```

The dev server is same-origin, so `ALLOWED_ORIGINS` and `NEXT_PUBLIC_API_BASE` are not needed.

## Deployment shapes

The codebase supports three.

### A) Single-host dynamic (Fly.io / Render / Docker)

Best when you want everything in one place: server-rendered pages, admin UI, and the API all on the same origin.

```bash
npm run build
npm start
```

Fly.io is wired up via `Dockerfile` + `fly.toml`:

```bash
flyctl launch --no-deploy           # only first time
flyctl secrets set \
  ADMIN_USER='...'                  \
  ADMIN_PASS='...'                  \
  SESSION_SECRET='...'              \
  MONGODB_URI='mongodb+srv://...'   \
  ALLOWED_ORIGINS='https://bharatarashtracockroaches.org'
flyctl deploy
```

Liveness check: `GET https://<your-app>.fly.dev/api/health`.

If `MONGODB_URI` is unset, the app uses `data/db.json` on the persistent volume (`brc_data_vol` in `fly.toml`). Uploaded media still needs Cloudinary unless you skip that feature.

### B) Static frontend on GitHub Pages + dynamic backend on Fly.io ("just a domain")

This is the recommended split for a public movement site that wants free, unlimited frontend bandwidth and only pays for the backend.

```
┌─ GitHub Pages ────────────┐    ┌─ Fly.io ─────────────────────┐
│ bharatarashtracockroaches │ →  │ api.bharatarashtracockroaches │
│ /out static export        │    │ Next.js dynamic + Mongo/file  │
└───────────────────────────┘    └───────────────────────────────┘
```

**Backend (Fly.io):**

1. Deploy as in A, but set `ALLOWED_ORIGINS` to your custom GitHub Pages domain:

   ```bash
   flyctl secrets set ALLOWED_ORIGINS='https://bharatarashtracockroaches.org'
   ```

2. Point a DNS subdomain (e.g. `api.bharatarashtracockroaches.org`) at the Fly.io app:

   ```bash
   flyctl certs add api.bharatarashtracockroaches.org
   ```

   Add the A/AAAA/CNAME records Fly prints out.

**Frontend (GitHub Pages):**

1. In your GitHub repo, go to **Settings → Variables → Actions** and add:

   | Variable | Example | Purpose |
   |---|---|---|
   | `SITE_DOMAIN` | `bharatarashtracockroaches.org` | Written to `out/CNAME` so Pages binds to your custom domain. |
   | `SITE_BASE_PATH` | _(empty)_ | Empty for custom-domain root. Use `/BRC` only for `username.github.io/BRC`. |
   | `NEXT_PUBLIC_API_BASE` | `https://api.bharatarashtracockroaches.org` | Where the static frontend should send `/api/*` requests. |

2. In your DNS provider, point `bharatarashtracockroaches.org` at GitHub Pages (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`), or use a CNAME for `www`.

3. In **Settings → Pages**, choose source **GitHub Actions** and (after the first deploy) verify the custom domain.

4. Push to `main`. The included workflow `.github/workflows/deploy.yml` will:
   - run `npm run build:static`
   - drop `.nojekyll` and `CNAME` into `./out`
   - publish to GitHub Pages.

The static frontend gracefully simulates form submissions if `NEXT_PUBLIC_API_BASE` is unset, so deploying _just_ the frontend still produces a working-looking site.

### C) Static frontend only (no backend)

Set up the workflow exactly as in B but **leave `NEXT_PUBLIC_API_BASE` empty**. Forms still feel responsive — submissions are dropped — and the live member counter freezes on the seed value. Useful for a launch teaser.

## Manual static preview

```bash
npm run build:static
npx serve out -l 5050
```

Visit `http://localhost:5050/`. If `SITE_BASE_PATH=/BRC` was set, visit `http://localhost:5050/BRC/` instead.

## Admin features

- **Dashboard**: visitors, signups, top issues, latest members & complaints
- **Content**: edit homepage taglines, manifesto, manage issues, posters
- **Stories**: approve / reject / highlight public submissions
- **Members**: roster with state, role, search, filter
- **Analytics**: cinematic sparkline charts, engagement stats
- **Notifications**: send Email / Push / Telegram broadcasts
- **Media**: posters, reels, cinematic backgrounds library
- **Issue Tracker**: live complaint board with status workflow
- **Settings**: branding, theme palette, slogans, homepage toggles

The admin shell only ships with the dynamic build. The static GitHub Pages export deliberately strips `/admin`, `/api` and `middleware.ts` so it can never authenticate against a missing backend.

## License

The movement is for the people. Use, fork, and amplify.
