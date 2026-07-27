import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Allow all crawlers to access public marketing/content pages.
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',          // Backend API routes — no public content
          '/auth/',         // Auth callback/redirect handlers
          '/reset-redirect/', // Deep-link bridge for password reset — not a content page
          '/accept-invite/',  // Deep-link bridge for staff invites — not a content page
        ],
      },
    ],
    sitemap: 'https://app.skolvo.online/sitemap.xml',
  };
}
