import type { Metadata } from 'next';
import AgentPageClient from '@/components/agent/AgentPageClient';

export const metadata: Metadata = {
  title: 'Skolvo Agent — Job Opportunity Workspace',
  description: 'Open the live Skolvo Agent workspace for job discovery, fit and eligibility review, application preparation, tracking, and user decisions.',
  alternates: { canonical: '/agent' },
  openGraph: {
    title: 'Skolvo Agent — Job Opportunity Workspace',
    description: 'A live job-opportunity workspace for discovery, fit review, application preparation, and tracking.',
    url: '/agent',
    images: [{ url: '/skolvo-agent-promo.jpg', width: 1122, height: 1402, alt: 'Skolvo Agent concept visual' }],
  },
};

export default function AgentPage() {
  return <AgentPageClient />;
}
