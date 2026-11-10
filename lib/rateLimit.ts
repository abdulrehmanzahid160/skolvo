import type { NextRequest } from 'next/server';

/*
 * Best-effort in-memory limiter. Serverless instances do not share memory,
 * so this only blunts bursts from one client hitting one instance — enough
 * for a contact form alongside the honeypot and minimum fill time.
 */
const hits = new Map<string, number[]>();

export function clientIp(req: NextRequest) {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown';
}

export function rateLimited(key: string, limit = 5, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > limit;
}
