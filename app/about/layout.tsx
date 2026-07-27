import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Skolvo — the team behind CampusNova and our mission to build privacy-first, AI-powered SaaS tools for educational institutions and modern businesses.',
  openGraph: {
    title: 'About Skolvo — The Team Behind CampusNova',
    description:
      'Meet the engineers and ML practitioners building CampusNova. Our mission: intelligent, role-secure, privacy-first software for academies and schools.',
    url: 'https://app.skolvo.online/about',
  },
  twitter: {
    title: 'About Skolvo — The Team Behind CampusNova',
    description:
      'Meet the engineers and ML practitioners building CampusNova. Our mission: intelligent, role-secure, privacy-first software for academies and schools.',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
