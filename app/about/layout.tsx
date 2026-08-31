import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'The three-person team developing Skolvo Agent, CampusNova, and SignalWatch, and the product boundaries guiding the work.',
  openGraph: {
    title: 'About the Skolvo Studio',
    description:
      'Meet the team developing Skolvo Agent, CampusNova, and SignalWatch.',
    url: 'https://www.skolvo.online/about',
  },
  twitter: {
    title: 'About the Skolvo Studio',
    description:
      'Meet the team developing Skolvo Agent, CampusNova, and SignalWatch.',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
