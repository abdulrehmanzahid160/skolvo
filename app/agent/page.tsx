import type { Metadata } from 'next';
import AgentPageClient from '@/components/agent/AgentPageClient';

export const metadata: Metadata = {
  title: 'Skolvo Agent — Coming Soon',
  description: 'Skolvo Agent is an upcoming workspace for discovering, evaluating, preparing, and tracking job opportunities.',
  alternates: { canonical: '/agent' },
  openGraph: {
    title: 'Skolvo Agent — Coming Soon',
    description: 'A more intelligent way to discover and manage job opportunities.',
    url: '/agent',
    images: [{ url: '/skolvo-agent-promo.jpg', width: 1122, height: 1402, alt: 'Skolvo Agent concept visual' }],
  },
};

export default function AgentPage() {
  return <AgentPageClient />;
}
