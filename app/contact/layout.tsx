import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact Skolvo about Skolvo Agent, CampusNova, SignalWatch, product access, support, or technical questions.',
  openGraph: {
    title: 'Contact the Skolvo Studio',
    description:
      'Contact Skolvo about Skolvo Agent, CampusNova, SignalWatch, support, or product access.',
    url: 'https://www.skolvo.online/contact',
  },
  twitter: {
    title: 'Contact the Skolvo Studio',
    description:
      'Contact Skolvo about Skolvo Agent, CampusNova, SignalWatch, support, or product access.',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
