import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Explore CampusNova pricing tiers — from a free fee-tracking plan to Premium biometric attendance and Premium Plus autonomous AI. Join the early access waitlist to lock in launch discounts.',
  openGraph: {
    title: 'CampusNova Pricing — Free, Premium & Premium Plus Tiers',
    description:
      'Simple, transparent early-access pricing for CampusNova. Free fee tracking, Premium facial biometrics, or Premium Plus with a 24/7 autonomous AI assistant.',
    url: 'https://app.skolvo.online/pricing',
  },
  twitter: {
    title: 'CampusNova Pricing — Free, Premium & Premium Plus Tiers',
    description:
      'Simple, transparent early-access pricing for CampusNova. Free fee tracking, Premium facial biometrics, or Premium Plus with a 24/7 autonomous AI assistant.',
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
