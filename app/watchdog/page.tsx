import type { Metadata } from 'next';
import WatchdogPageClient from './WatchdogPageClient';

export const metadata: Metadata = {
  title: 'SignalWatch Regulatory Intelligence',
  description: 'A validation build for source-linked monitoring of public FDA device records across separate consultant client workspaces.',
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
