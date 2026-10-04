import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Introductory subscription prices and starting budgets for Skolvo custom projects.',
  openGraph: {
    title: 'Skolvo Pricing',
    description: 'Introductory subscription prices and starting budgets for Skolvo custom projects.',
    url: 'https://www.skolvo.online/pricing',
  },
  twitter: {
    title: 'Skolvo Pricing',
    description: 'Introductory subscription prices and starting budgets for Skolvo custom projects.',
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
