import { MetadataRoute } from 'next';

// This file generates the static /robots.txt for the marketing domain
// (www.skolvo.online). It is served by Next.js's built-in MetadataRoute.
//
// For app.skolvo.online, the middleware in middleware.ts intercepts
// /robots.txt requests and returns "Disallow: /" before this file is
// ever reached — so this output is only ever seen by crawlers hitting
// the marketing domain.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',           // Backend API routes
          '/auth/',          // Auth callback handlers
          '/reset-redirect/',// Deep-link bridge — not a content page
          '/accept-invite/', // Deep-link bridge — not a content page
        ],
      },
    ],
    sitemap: 'https://www.skolvo.online/sitemap.xml',
  };
}
