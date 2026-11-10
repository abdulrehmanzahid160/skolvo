import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Start a Project',
  description:
    'Tell Skolvo what you need — a business website, e-commerce store, management system or mobile app — and get a proposal within 24 hours.',
  alternates: { canonical: '/start-project' },
  openGraph: {
    title: 'Start a project with Skolvo',
    description:
      'Websites, e-commerce stores, management systems and mobile apps. Share your requirements and get a proposal within 24 hours.',
    url: 'https://www.skolvo.online/start-project',
  },
  twitter: {
    title: 'Start a project with Skolvo',
    description:
      'Websites, e-commerce stores, management systems and mobile apps. Share your requirements and get a proposal within 24 hours.',
  },
};

export default function StartProjectLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
