import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Transparent free allowances and planned subscription pricing for Skolvo Agent, CampusNova, and SignalWatch.',
  openGraph: {
    title: 'Skolvo Pricing',
    description: 'Free allowances and subscription pricing for three Skolvo software products.',
    url: 'https://www.skolvo.online/pricing',
  },
  twitter: {
    title: 'Skolvo Pricing',
    description: 'Free allowances and subscription pricing for three Skolvo software products.',
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
