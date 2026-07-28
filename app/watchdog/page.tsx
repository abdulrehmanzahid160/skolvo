import type { Metadata } from 'next';
import WatchdogPageClient from './WatchdogPageClient';

export const metadata: Metadata = {
  title: 'FDA Regulatory Watchdog',
  description:
    'Automatic weekly monitoring of public FDA data — competitor 510(k) clearances, adverse-event reports, and recalls in your product category, summarised in plain English. Built for independent regulatory consultants, priced without a sales call.',
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
