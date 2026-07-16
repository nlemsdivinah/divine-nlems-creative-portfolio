# Security Notes

## What's already implemented

**HTTP security headers** (`next.config.mjs`) — applied to every response:
- `Content-Security-Policy` restricting script/style/frame sources to self, Google Fonts, and
  Cloudflare Turnstile
- `Strict-Transport-Security` (HSTS) forcing HTTPS
- `X-Frame-Options: DENY` and a CSP `frame-ancestors 'none'` to prevent clickjacking
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` disabling camera/mic/geolocation the site never needs

**Contact form** (`src/app/api/contact/route.ts`):
- Server-side validation with Zod — every field is type- and length-checked before anything else runs
- **Cloudflare Turnstile** verified server-side (never trust a client-side "success" alone)
- Honeypot field (`company`) — invisible to real users, silently rejects bots that fill it
- Output escaping (`escapeHtml`) on every field before it's interpolated into the outgoing email, to
  prevent HTML/script injection in your inbox
- In-memory rate limiting (5 requests/minute per IP) — see the note below on scaling this
- All secrets (Turnstile secret key, email API key) live server-side only, read from environment
  variables, never shipped to the browser bundle

**General:**
- No API keys or secrets anywhere in client-side code — anything prefixed `NEXT_PUBLIC_` is safe to
  expose (it's public by design, e.g. the Turnstile *site* key); anything without that prefix stays
  server-only
- Images are only ever loaded from your own domain and `cdn.sanity.io` (enforced by both CSP and
  `next.config.mjs` image remote patterns)
- Sanity Studio at `/studio` requires a Sanity account login — it isn't public-write

## Before you launch: things to configure yourself

1. **CSRF**: Next.js Route Handlers combined with `SameSite=Lax` cookies (the default) already
   mitigate most CSRF risk for this form, since it doesn't use cookie-based auth. If you later add
   authenticated admin actions beyond Sanity Studio, add an explicit CSRF token.
2. **Rate limiting at scale**: the built-in limiter is in-memory, which resets on every deploy and
   doesn't share state across multiple serverless instances. Fine for a portfolio's traffic. If you
   expect higher volume, swap in [Upstash Redis](https://upstash.com) with `@upstash/ratelimit`:
   ```ts
   import { Ratelimit } from "@upstash/ratelimit";
   import { Redis } from "@upstash/redis";
   const ratelimit = new Ratelimit({ redis: Redis.fromEnv(), limiter: Ratelimit.slidingWindow(5, "1 m") });
   ```
3. **Email provider**: the contact route ships wired for [Resend](https://resend.com) — verify your
   sending domain (SPF/DKIM) there so messages don't land in spam. Swap providers by editing the
   `fetch` call in `src/app/api/contact/route.ts`.
4. **Dependency hygiene**: run `npm audit` before launch and periodically after
   (`npm audit fix` for non-breaking patches). Consider enabling Dependabot on the GitHub repo.
5. **Sanity dataset visibility**: keep the dataset **public read-only** (the default) so the site can
   fetch content without a token — writes still require Studio login. If you switch it private, set
   `SANITY_API_READ_TOKEN` (read-only token, never a write token) in your environment.
6. **HTTPS enforcement**: automatic on Vercel — every domain gets a free auto-renewing certificate,
   and HTTP requests redirect to HTTPS by default.
7. **Login/auth**: this site has no user accounts or admin login of its own (CMS access is entirely
   handled by Sanity's own authenticated Studio). If you later add a client login area, use a vetted
   library like NextAuth.js/Auth.js rather than rolling your own session handling.

## Reporting

If you (or someone else) find a security issue in this codebase, fix it before it reaches production
by testing changes on a Vercel **Preview** deployment first — preview URLs are unlisted but not
secret, so don't put real client data in preview environments.
