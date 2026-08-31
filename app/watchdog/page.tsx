import type { Metadata } from 'next';
import WatchdogPageClient from './WatchdogPageClient';

export const metadata: Metadata = {
  title: 'SignalWatch Regulatory Intelligence',
  description: 'Source-linked 510(k), MAUDE, and FDA Enforcement monitoring for regulatory consultants. Historical evaluation is available; scheduled service is pending.',
  keywords: [
    'FDA monitoring software',
    'FDA 510(k) alerts',
    'FDA recall monitoring',
    'MAUDE adverse event monitoring',
    'regulatory consultant tools',
    'medical device competitive intelligence',
  ],
};

export default function WatchdogPage() {
  return <WatchdogPageClient />;
}
