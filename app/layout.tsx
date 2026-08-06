import type { Metadata } from 'next';
import { Geist, Public_Sans, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WaitlistProvider from '@/components/waitlist/WaitlistProvider';

// Display: geometric and engineered rather than engraved. Headlines are the
// calmest part of the page, so the display face carries structure through
// tracking and weight instead of ornament.
const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
});

// Body: Public Sans is the typeface of the US federal design system, which is
// a deliberate choice for a studio whose flagship product reads FDA data.
const publicSans = Public_Sans({
  subsets: ['latin'],
  variable: '--font-public-sans',
  display: 'swap',
});

// Utility: record IDs, timestamps, 510(k) numbers. Not for decorative labels.
const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  // Title template: sub-pages export `title: 'Page Name'` and automatically
  // get "Page Name | Skolvo". The `default` is used for the homepage and any
  // page that doesn't export its own metadata.
  title: {
    default: 'Skolvo: Software for Places Where Being Wrong Is Expensive',
    template: '%s | Skolvo',
  },
  description:
    'Skolvo is a software studio building focused, privacy-first tools for high-stakes industries. Makers of CampusNova (on-device biometric attendance and fee automation for academies) and FDA Regulatory Watchdog (weekly plain-English FDA monitoring for regulatory consultants).',
  keywords: [
    'Skolvo',
    'CampusNova',
    'FDA Regulatory Watchdog',
    'FDA 510(k) monitoring',
    'FDA recall alerts',
    'regulatory consultant software',
    'medical device regulatory monitoring',
    'Academy Management System',
    'Biometric Attendance',
    'On-Device Facial Recognition',
  ],
  authors: [{ name: 'Skolvo Team' }],
  metadataBase: new URL('https://app.skolvo.online'),
  openGraph: {
    title: 'Skolvo | A Studio for High-Stakes Software',
    description:
      'Two products live: CampusNova for academies, and FDA Regulatory Watchdog for medical-device regulatory consultants.',
    url: 'https://app.skolvo.online',
    siteName: 'Skolvo',
    // NOTE: /logo.png is a square app icon (1024×1024), which works for
    // summary cards but is not ideal for link previews (1200×630 is the
    // recommended OG image size). A proper landscape OG banner image
    // (og-image.png) should be designed and placed in /public/, then
    // replace '/logo.png' below with '/og-image.png'.
    images: [
      {
        url: '/logo.png',
        width: 1024,
        height: 1024,
        alt: 'Skolvo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Skolvo | A Studio for High-Stakes Software',
    description:
      'Two products live: CampusNova for academies, and FDA Regulatory Watchdog for medical-device regulatory consultants.',
    images: ['/logo.png'],
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${publicSans.variable} ${plexMono.variable} scroll-smooth`}
    >
      <body className="flex min-h-dvh flex-col bg-paper text-ink selection:bg-accent selection:text-white">
        <WaitlistProvider>
          {/* Skip link: the nav holds six links before main content. */}
          <a
            href="#main"
            className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[200] focus-visible:rounded-full focus-visible:bg-ink focus-visible:px-4 focus-visible:py-2 focus-visible:text-body-sm focus-visible:font-semibold focus-visible:text-white"
          >
            Skip to main content
          </a>
          <Navbar />
          {/* pt matches --nav-h so fixed-nav content is never occluded. */}
          <main id="main" className="flex-grow pt-16">
            {children}
          </main>
          <Footer />
        </WaitlistProvider>
      </body>
    </html>
  );
}
