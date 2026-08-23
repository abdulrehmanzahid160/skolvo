import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact the Skolvo studio about SignalWatch, CampusNova, product validation, or technical questions.',
  openGraph: {
    title: 'Contact the Skolvo Studio',
    description:
      'Contact the studio about SignalWatch, CampusNova, or product validation.',
    url: 'https://www.skolvo.online/contact',
  },
  twitter: {
    title: 'Contact the Skolvo Studio',
    description:
      'Contact the studio about SignalWatch, CampusNova, or product validation.',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
