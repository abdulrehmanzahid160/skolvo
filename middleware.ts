import { NextRequest, NextResponse } from 'next/server';

// ─────────────────────────────────────────────────────────────────────────────
// Domain split enforcement
//
// Both www.skolvo.online and app.skolvo.online point to the same Vercel
// deployment. This middleware enforces which routes are reachable on each:
//
//   www.skolvo.online / skolvo.online  →  marketing pages only
//   app.skolvo.online                 →  functional/auth pages only
//
// Local dev (localhost) and Vercel preview URLs (*.vercel.app) are passed
// through entirely so development is never broken.
//
// NOTE: The actual folder for the password-reset redirect page is
// /reset-redirect (not /reset-password). Both are listed in APP_ONLY_PATHS
// for safety in case the folder is ever renamed.
// ─────────────────────────────────────────────────────────────────────────────

const MARKETING_HOST_CANONICAL = 'https://www.skolvo.online';
const APP_HOST_CANONICAL       = 'https://app.skolvo.online';

// Paths that live exclusively on app.skolvo.online.
const APP_ONLY_PATHS = [
  '/reset-redirect',
  '/reset-password',  // future-proof if the folder is ever renamed
  '/accept-invite',
  '/auth',
];

// Internal paths that must always pass through on any host.
const ALWAYS_PASS = [
  '/_next',
  '/api',
  '/favicon.ico',
  '/logo.png',
];

function isAppOnly(pathname: string): boolean {
  return APP_ONLY_PATHS.some((p) => pathname === p || pathname.startsWith(p + '/') || pathname.startsWith(p + '?'));
}

function isAlwaysPass(pathname: string): boolean {
  return ALWAYS_PASS.some((p) => pathname === p || pathname.startsWith(p + '/'));
}

function buildRedirect(pathname: string, search: string, base: string): NextResponse {
  const url = new URL(pathname + search, base);
  return NextResponse.redirect(url, { status: 301 });
}

export function middleware(request: NextRequest) {
  const host     = request.headers.get('host') ?? '';
  const pathname = request.nextUrl.pathname;
  const search   = request.nextUrl.search; // preserves ?token=xyz etc.

  // ── 1. Always pass through internals ─────────────────────────────────────
  if (isAlwaysPass(pathname)) {
    return NextResponse.next();
  }

  // ── 2. host-aware /robots.txt — must be intercepted before Next.js serves
  //       the static file, because the response differs per domain.         ──
  if (pathname === '/robots.txt') {
    if (host === 'app.skolvo.online') {
      // Fully block indexing on the app subdomain — no content here.
      return new NextResponse('User-agent: *\nDisallow: /\n', {
        status: 200,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      });
    }
    // For www / bare domain: let Next.js serve the static robots.ts output.
    return NextResponse.next();
  }

  // ── 3. app.skolvo.online: only app-only paths allowed ────────────────────
  if (host === 'app.skolvo.online') {
    if (!isAppOnly(pathname)) {
      // e.g. app.skolvo.online/ or app.skolvo.online/about
      // → redirect to www, same path (most of the time this will just be /)
      return buildRedirect(pathname, search, MARKETING_HOST_CANONICAL);
    }
    return NextResponse.next();
  }

  // ── 4. www.skolvo.online / bare skolvo.online: only marketing paths ───────
  if (host === 'www.skolvo.online' || host === 'skolvo.online') {
    if (isAppOnly(pathname)) {
      // e.g. www.skolvo.online/accept-invite?token=XYZ
      // → redirect to app subdomain, token preserved
      return buildRedirect(pathname, search, APP_HOST_CANONICAL);
    }
    return NextResponse.next();
  }

  // ── 5. All other hosts (localhost, *.vercel.app preview URLs) ─────────────
  // No enforcement — every route resolves normally during local dev and
  // Vercel branch previews.
  return NextResponse.next();
}

export const config = {
  // Match every request path except Next.js static asset chunks and common
  // static file extensions — those never need domain routing logic.
  matcher: [
    '/((?!_next/static|_next/image|.*\\.(?:ico|png|jpg|jpeg|gif|svg|webp|woff2?|ttf|otf)).*)',
  ],
};
