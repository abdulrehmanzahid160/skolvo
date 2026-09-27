import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Build Journal',
  description: 'Product decisions, honest build-status notes, and practical guides to focused business workflows from Skolvo.',
};

export default function JournalLayout({ children }: { children: React.ReactNode }) {
  return children;
}
