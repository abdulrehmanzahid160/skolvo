import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Build Journal',
  description: 'Product decisions, technical boundaries, and honest build-status notes from Skolvo.',
};

export default function JournalLayout({ children }: { children: React.ReactNode }) {
  return children;
}
