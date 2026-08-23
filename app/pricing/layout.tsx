import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Availability',
  description: 'Current product stages and availability for SignalWatch and CampusNova. Public pricing has not been published.',
  openGraph: {
    title: 'Skolvo Product Availability',
    description: 'Current stages for SignalWatch and CampusNova, without invented plans or launch pricing.',
    url: 'https://www.skolvo.online/pricing',
  },
  twitter: {
    title: 'Skolvo Product Availability',
    description: 'Current stages for SignalWatch and CampusNova, without invented plans or launch pricing.',
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
