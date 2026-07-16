// Simple in-memory rate limiter. Fine for a low-traffic single-instance portfolio site.
// For higher traffic or multi-region deployments on Vercel, replace with Upstash Redis
// (@upstash/ratelimit) — see docs/SECURITY.md for the drop-in snippet.

const WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS = 5;

const hits = new Map<string, number[]>();

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(key) || []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  hits.set(key, timestamps);
  return timestamps.length > MAX_REQUESTS;
}
