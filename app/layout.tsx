import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  // Title template: sub-pages export `title: 'Page Name'` and automatically
  // get "Page Name | Skolvo". The `default` is used for the homepage and any
  // page that doesn't export its own metadata.
  title: {
    default: 'Skolvo — Building Purpose-Driven SaaS for the Modern Era',
    template: '%s | Skolvo',
  },
  description:
    'Skolvo is a SaaS studio building intelligent, secure, privacy-first software products. Creators of CampusNova — an AI-powered academy and school management platform with biometric attendance, automated fee tracking, and role-gated access control.',
  keywords: [
    'Skolvo',
    'CampusNova',
    'SaaS Parent Company',
    'Academy Management System',
    'Biometric Attendance',
    'AI Academy Chatbot',
    'Mass WhatsApp Reminders',
    'EdTech SaaS',
  ],
  authors: [{ name: 'Skolvo Team' }],
  metadataBase: new URL('https://app.skolvo.online'),
  openGraph: {
    title: 'Skolvo | Next-Gen Specialized SaaS Products',
    description:
      'Home of CampusNova — AI-powered academy management with biometric attendance, automated fee reminders, and role-gated access control.',
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
    title: 'Skolvo | Next-Gen Specialized SaaS Products',
    description:
      'Home of CampusNova — AI-powered academy management with biometric attendance, automated fee reminders, and role-gated access control.',
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
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#FDF6F0] text-[#1A1A1A] flex flex-col font-sans antialiased selection:bg-[#E6357F] selection:text-white">
        <Navbar />
        <main className="flex-grow pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
