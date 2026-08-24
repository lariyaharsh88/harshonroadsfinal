# HarshOnRoads

Weekend escapes from Delhi NCR — with road trips, travel tools, and India travel.

This is the public Next.js site for [HarshOnRoads](https://harshonroads.com). Calculators and checklists run in the browser. There is no authentication, database, payments, or AI API.

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- MDX
- ESLint
- GitHub + Vercel

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality checks

```bash
npm run lint
npm run typecheck
npm run build
```

## Deploy

No environment variables are required. Optional: `NEXT_PUBLIC_SITE_URL` (defaults to `https://harshonroads.com`). See `.env.example`.

1. Push the repository to GitHub.
2. Import the project in [Vercel](https://vercel.com). Framework: Next.js. Build: `npm run build`.
3. Add the production domain `harshonroads.com` (and `www` if you use it) in Vercel → Project → Settings → Domains.
4. Point DNS as Vercel instructs (A/CNAME or nameservers).
5. Confirm `https://harshonroads.com/sitemap.xml` and `https://harshonroads.com/robots.txt` after the first production deploy.

## Key URLs

- `/` homepage
- `/tools` travel tools directory
- `/tools/[slug]` individual tools
- `/weekend-trips`, `/destinations`, `/itineraries`
- `/road-trips`, `/travel-guides`, `/videos`
- `/about`, `/contact`, `/privacy`, `/terms`
- `/sitemap.xml`, `/robots.txt`

Site URL, canonicals, Open Graph and the sitemap are driven from `lib/seo.ts`.
