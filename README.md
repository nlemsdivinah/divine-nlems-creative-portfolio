# Divine — Creative Portfolio

A production-ready portfolio site for a creative graphic designer, built with:

- **Next.js 14** (App Router) + **TypeScript** — performance, SSG/ISR, clean routing
- **Tailwind CSS** — design system in `tailwind.config.ts`
- **Sanity CMS** — edit every project, service, testimonial, and page of copy with no code, mounted at `/studio`
- **Framer Motion** — page-load reveals, hover states, scroll-triggered animation
- **Cloudflare Turnstile** — spam protection on the contact form
- **Vercel** — hosting, HTTPS, deploy previews

Design concept: the portfolio is framed as a printed design catalog. Each project is a numbered
**plate**; the portfolio page is **the Index**; case studies read like catalog entries — problem,
process, solution, results — not just an image grid.

## Project structure

```
sanity/                  Sanity Studio config + content schemas (edit these to change what's editable)
  schemaTypes/
    project.ts            Portfolio case study fields
    service.ts             Services list
    testimonial.ts          Client testimonials
    siteSettings.ts          Bio, hero copy, stats, contact info, SEO defaults (singleton)
    post.ts                   Blog posts
src/
  app/                    Pages (App Router). One folder = one route.
  components/             Reusable UI (Hero, ProjectIndex, ContactForm, etc.)
  lib/                    Sanity client, GROQ queries, types, Turnstile + rate-limit helpers
docs/
  ADMIN-GUIDE.md          How to edit content — written for a non-developer
  DEPLOYMENT.md           How to deploy to Vercel and connect a custom domain
  SECURITY.md             What's implemented and what to configure before launch
```

## Local setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create a Sanity project** (free tier is enough)
   ```bash
   npx sanity@latest init
   ```
   This gives you a Project ID and dataset name (usually `production`).

3. **Copy environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Fill in:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` / `NEXT_PUBLIC_SANITY_DATASET` — from step 2
   - `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` — from the Cloudflare dashboard (Turnstile → Add site)
   - `RESEND_API_KEY` / `CONTACT_TO_EMAIL` — or swap the provider in `src/app/api/contact/route.ts`
   - `NEXT_PUBLIC_SITE_URL` — your production domain, used for sitemap/canonical URLs

4. **Run the site**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000` for the site and `http://localhost:3000/studio` for the CMS.

5. **Add your first content**
   Open `/studio`, fill in **Site Settings** first (hero headline, bio, contact info), then add a
   **Service**, a **Testimonial**, and a **Portfolio Project**. The site reads live from Sanity, so
   changes appear on refresh (content revalidates every 60 seconds in production).

## Adding a new portfolio project (quick version)

In `/studio` → **Portfolio Projects** → **+ Create**. See `docs/ADMIN-GUIDE.md` for the full walkthrough
of every field, image sizing tips, and how the case study sections map to the page layout.

## Where to look if you want to change something

| I want to change...                    | Edit this                                  |
|-----------------------------------------|---------------------------------------------|
| Colors, fonts, spacing                  | `tailwind.config.ts`, `src/app/globals.css` |
| What content fields exist in the CMS    | `sanity/schemaTypes/*.ts`                   |
| Page layout / sections                  | `src/app/**/page.tsx`                       |
| A specific visual component             | `src/components/*.tsx`                      |
| Contact form behavior / email delivery  | `src/app/api/contact/route.ts`              |
| SEO defaults, meta tags                 | `src/app/layout.tsx` + Site Settings in CMS |

Non-developers should only ever need `/studio` — see `docs/ADMIN-GUIDE.md`.
