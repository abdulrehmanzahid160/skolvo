import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'The team behind CampusNova and FDA Regulatory Watchdog, and why we build privacy-first tools for institutions that cannot absorb a mistake.',
  openGraph: {
    title: 'About Skolvo: The Team Behind CampusNova',
    description:
      'Meet the engineers and ML practitioners building CampusNova. Our mission: intelligent, role-secure, privacy-first software for academies and schools.',
    url: 'https://app.skolvo.online/about',
  },
  twitter: {
    title: 'About Skolvo: The Team Behind CampusNova',
    description:
      'Meet the engineers and ML practitioners building CampusNova. Our mission: intelligent, role-secure, privacy-first software for academies and schools.',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
