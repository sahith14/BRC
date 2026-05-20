# BRC — Bharata Rashtra Cockroaches

> The ignored are speaking. A cinematic political movement website.

A dark, dramatic, revolutionary-styled movement site built with **Next.js 15**, **TypeScript**, **Tailwind CSS** and **Framer Motion**. Includes a full admin command center.

## Stack

- **Next.js 15** (App Router)
- **TypeScript**, strict
- **Tailwind CSS** with custom cinematic palette
- **Framer Motion** for cinematic transitions and counters
- **Lucide React** icons
- **Cookie-session admin auth** with route-group middleware

## Project structure

```
src/
├── app/
│   ├── layout.tsx           # Root layout, fonts, SEO
│   ├── page.tsx             # Landing page
│   ├── globals.css          # Tailwind + cinematic utilities
│   ├── manifesto/page.tsx
│   ├── voices/submit/page.tsx
│   ├── api/
│   │   ├── auth/login/route.ts
│   │   ├── members/route.ts
│   │   └── stories/route.ts
│   └── admin/
│       ├── layout.tsx
│       ├── login/page.tsx
│       └── (shell)/         # Protected dashboard route group
│           ├── layout.tsx
│           ├── page.tsx     # Dashboard
│           ├── content/
│           ├── stories/
│           ├── members/
│           ├── analytics/
│           ├── notifications/
│           ├── media/
│           ├── tracker/
│           └── settings/
├── components/
│   ├── Nav.tsx, Hero.tsx, Marquee.tsx,
│   ├── Issues.tsx, Reality.tsx, Voices.tsx,
│   ├── Manifesto.tsx, Join.tsx, Footer.tsx,
│   ├── CockroachEmblem.tsx
│   └── admin/
│       ├── AdminShell.tsx
│       ├── PageHeader.tsx
│       └── StatCard.tsx
├── lib/
│   ├── data.ts              # Issues, voices, members, complaints, analytics
│   └── utils.ts
└── middleware.ts            # Protects /admin/*
```

## Setup

```bash
npm install
npm run dev
```

Visit:

- **Landing**: http://localhost:3000
- **Manifesto**: http://localhost:3000/manifesto
- **Submit story**: http://localhost:3000/voices/submit
- **Admin login**: http://localhost:3000/admin
  - Configure credentials in `.env.local`:
    ```
    ADMIN_USER=...
    ADMIN_PASS=...
    SESSION_SECRET=...
    ```
  - Without these, login is disabled (returns 503).

## Build & deploy

```bash
npm run build
npm start
```

Deploy easily to Vercel or Netlify. The site is fully SSR/edge friendly.

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

## License

The movement is for the people. Use, fork, and amplify.
