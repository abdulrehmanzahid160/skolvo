import type { Metadata } from 'next';
import AgentPageClient from '@/components/agent/AgentPageClient';

export const metadata: Metadata = {
  title: 'Skolvo Agent — Job Opportunity Workspace',
  description: 'Job discovery, fit and eligibility review, application preparation, tracking, and user decisions in one workspace. Public paid access is coming soon.',
  alternates: { canonical: '/agent' },
  openGraph: {
    title: 'Skolvo Agent — Job Opportunity Workspace',
    description: 'An implemented job-opportunity workflow with public hosting and paid access still pending.',
    url: '/agent',
    images: [{ url: '/skolvo-agent-promo.jpg', width: 1122, height: 1402, alt: 'Skolvo Agent concept visual' }],
  },
};

export default function AgentPage() {
  return <AgentPageClient />;
}
