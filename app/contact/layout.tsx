import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact Skolvo about a business website, custom workflow, focused prototype, or an existing Skolvo product.',
  openGraph: {
    title: 'Contact the Skolvo Studio',
    description:
      'Discuss a business website, custom workflow, focused prototype, or an existing Skolvo product.',
    url: 'https://www.skolvo.online/contact',
  },
  twitter: {
    title: 'Contact the Skolvo Studio',
    description:
      'Discuss a business website, custom workflow, focused prototype, or an existing Skolvo product.',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
