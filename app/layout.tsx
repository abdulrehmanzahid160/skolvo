import type { Metadata } from 'next';
import { Fraunces, Public_Sans, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Display: engraved, diploma-adjacent authority. Used with restraint.
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

// Body: Public Sans is the typeface of the US federal design system —
// a deliberate choice for a studio whose product reads FDA data.
const publicSans = Public_Sans({
  subsets: ['latin'],
  variable: '--font-public-sans',
  display: 'swap',
});

// Utility: instrumentation, record IDs, timestamps, 510(k) numbers.
const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-plex-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  // Title template: sub-pages export `title: 'Page Name'` and automatically
  // get "Page Name | Skolvo". The `default` is used for the homepage and any
  // page that doesn't export its own metadata.
  title: {
    default: 'Skolvo — Software for Places Where Being Wrong Is Expensive',
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
        alt: 'Skolvo — Next-Gen SaaS Studio',
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
      className={`${fraunces.variable} ${publicSans.variable} ${plexMono.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#EDF1EE] text-[#101C18] flex flex-col antialiased selection:bg-[#0F7A5F] selection:text-white">
        <Navbar />
        <main className="flex-grow pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
