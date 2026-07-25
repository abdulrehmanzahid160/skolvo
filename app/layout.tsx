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
  title: 'Skolvo | Next-Gen Specialized SaaS Products',
  description:
    'Skolvo is a modern parent SaaS studio crafting intelligent, secure, privacy-first software products. Creators of CampusNova academy management platform.',
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
  metadataBase: new URL('https://skolvo.online'),
  openGraph: {
    title: 'Skolvo | Next-Gen Specialized SaaS Products',
    description:
      'Home of CampusNova and next-generation SaaS tools built for educational institutions and modern enterprises.',
    url: 'https://skolvo.online',
    siteName: 'Skolvo',
    images: [
      {
        url: '/logo.png',
        width: 1024,
        height: 1024,
        alt: 'Skolvo Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Skolvo | Next-Gen Specialized SaaS Products',
    description:
      'Home of CampusNova and next-generation SaaS tools built for educational institutions and modern enterprises.',
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
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} dark scroll-smooth`}>
      <body className="min-h-screen bg-[#0B0B14] text-[#F3F4F6] flex flex-col font-sans antialiased selection:bg-[#6D5CFB] selection:text-white">
        <Navbar />
        <main className="flex-grow pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
