import { MetadataRoute } from 'next';
import { journalPosts } from '@/lib/journal';

// Canonical marketing domain. www.skolvo.online is the canonical form —
// bare skolvo.online redirects to www via middleware.
// app.skolvo.online is excluded from the sitemap entirely; it hosts only
// functional auth/deep-link pages with no indexable content.
const BASE_URL = 'https://www.skolvo.online';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      // Flagship product page — highest-priority route after the homepage.
      url: `${BASE_URL}/watchdog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/journal`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/security`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
  ];

  return [
    ...routes,
    ...journalPosts.map((post) => ({
      url: `${BASE_URL}/journal/${post.slug}`,
      lastModified: new Date('2026-08-24'),
      changeFrequency: 'yearly' as const,
      priority: 0.65,
    })),
  ];
}
