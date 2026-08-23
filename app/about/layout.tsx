import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'The three-person team developing SignalWatch and CampusNova, and the product boundaries guiding the work.',
  openGraph: {
    title: 'About the Skolvo Studio',
    description:
      'Meet the three-person team developing SignalWatch and CampusNova.',
    url: 'https://www.skolvo.online/about',
  },
  twitter: {
    title: 'About the Skolvo Studio',
    description:
      'Meet the three-person team developing SignalWatch and CampusNova.',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
