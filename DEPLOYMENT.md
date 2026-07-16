# Deployment Guide

## 1. Push the project to GitHub

```bash
git init
git add .
git commit -m "Initial portfolio site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

## 2. Deploy to Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and import the GitHub repo.
2. Vercel auto-detects Next.js — leave the build settings as default
   (`next build`, output directory auto-managed).
3. Add environment variables under **Project → Settings → Environment Variables**. Copy every key
   from `.env.example` and fill in real values for **Production**, **Preview**, and **Development**:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `SANITY_API_READ_TOKEN` (only if your dataset is private)
   - `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
   - `TURNSTILE_SECRET_KEY`
   - `RESEND_API_KEY`, `CONTACT_TO_EMAIL`
   - `NEXT_PUBLIC_SITE_URL` (set this to your final domain, e.g. `https://www.yourname.com`)
4. Click **Deploy**. Vercel gives you a `*.vercel.app` URL immediately — this is a fully working
   preview with automatic HTTPS.

## 3. Connect your own domain

1. Buy a domain if you don't have one (Namecheap, Google Domains successor Squarespace Domains,
   Cloudflare Registrar, etc.).
2. In Vercel: **Project → Settings → Domains → Add**, type your domain (e.g. `yourname.com`).
3. Vercel shows you the DNS records to add. Typically:
   - **Root domain** (`yourname.com`): an `A` record pointing to `76.76.21.21`
   - **www subdomain**: a `CNAME` record pointing to `cname.vercel-dns.com`
4. Go to your domain registrar's DNS settings and add those exact records.
5. Wait for propagation (usually minutes, sometimes up to a few hours). Vercel automatically
   issues and renews an SSL certificate once DNS resolves — no extra steps needed for HTTPS.
6. Set your preferred domain (`www` vs root) as primary in Vercel; the other redirects to it.

## 4. Set up Sanity CORS + the Studio

Sanity needs to know your production domain is allowed to read/write content:

```bash
npx sanity cors add https://www.yourname.com --credentials
```

Your Studio is already part of this app at `/studio` (e.g. `https://www.yourname.com/studio`) — no
separate deployment needed. Log in there with your Sanity account to start editing content.

## 5. Set up Cloudflare Turnstile for your real domain

1. In the Cloudflare dashboard → **Turnstile → Add site**.
2. Enter your production domain (and `localhost` for local dev, in a separate widget or as an
   additional hostname).
3. Copy the **Site Key** into `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and the **Secret Key** into
   `TURNSTILE_SECRET_KEY` in Vercel's environment variables, then redeploy.

## 6. Every future update

Once connected, every `git push` to `main` triggers a new deploy automatically. Content edits in
`/studio` don't need a redeploy — they update live via the Sanity API.

## Alternative hosts

The app is standard Next.js and also deploys cleanly to **Netlify** (via the official Next.js
runtime plugin) or **Cloudflare Pages** (via `@cloudflare/next-on-pages`). Vercel is recommended
because App Router, ISR, and image optimization work out of the box with zero extra configuration.
