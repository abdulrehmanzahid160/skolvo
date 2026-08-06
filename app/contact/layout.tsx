import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with the Skolvo team for demo requests, partnership inquiries, or questions about CampusNova. We respond to all institutional inquiries directly.',
  openGraph: {
    title: 'Contact Skolvo: Demo and Partnership Enquiries',
    description:
      'Reach out to the Skolvo team for demo requests, custom institutional features, or CampusNova partnership opportunities.',
    url: 'https://app.skolvo.online/contact',
  },
  twitter: {
    title: 'Contact Skolvo: Demo and Partnership Enquiries',
    description:
      'Reach out to the Skolvo team for demo requests, custom institutional features, or CampusNova partnership opportunities.',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
