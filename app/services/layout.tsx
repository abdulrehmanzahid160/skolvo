import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Websites and Custom Software Services',
  description:
    'Discuss a business website, focused workflow tool, or prototype with Skolvo. Explore practical starting points for eleven business workflows.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Websites and Custom Software Services | Skolvo',
    description:
      'Focused websites, workflow tools, and prototypes shaped around a real business process.',
    url: 'https://www.skolvo.online/services',
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
