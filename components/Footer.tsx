'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, Mail } from 'lucide-react';
import { useWaitlist } from '@/components/waitlist/WaitlistProvider';

/**
 * Footer. Three columns rather than five, and no decorative trust badge.
 *
 * The previous version carried an "Enterprise Privacy & Encryption" chip that
 * asserted a certification the site cannot evidence, alongside 10px body copy
 * on a tinted surface that measured 3.84:1. Both are gone.
 */

const PRODUCTS = [
  { name: 'FDA Regulatory Watchdog', href: '/watchdog' },
  { name: 'CampusNova', href: '/#campusnova' },
];

const COMPANY = [
  { name: 'Pricing', href: '/pricing' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

const LEGAL = [
  { name: 'Privacy', href: '/privacy' },
  { name: 'Terms', href: '/terms' },
  { name: 'Security', href: '/security' },
  // Retained from the previous footer. A demo-token link to the app's password
  // reset portal is unusual in a public footer, but removing a navigation entry
  // is an IA decision, not a visual one.
  { name: 'Password reset', href: '/reset-redirect?token=demo' },
];

export default function Footer() {
  const { openWaitlist } = useWaitlist();

  return (
    <footer className="border-t border-line bg-sunk">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link href="/" className="flex min-h-11 w-fit items-center gap-2.5" aria-label="Skolvo home">
              <span className="relative h-8 w-8 overflow-hidden rounded-control border border-line bg-white">
                <Image src="/logo.png" alt="" fill sizes="32px" className="object-contain p-0.5" />
              </span>
              <span className="font-display text-title text-ink">Skolvo</span>
            </Link>

            <p className="prose-measure mt-4 text-body-sm text-ink-soft">
              A software studio building focused tools for industries where a mistake is expensive:
              children&apos;s biometric data at the school gate, and medical-device safety filings
              at the FDA.
            </p>

            <div className="mt-6 flex items-center gap-2">
              <a
                href="https://www.linkedin.com/company/skolvo/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-ink-soft transition-colors hover:border-accent hover:text-accent"
                aria-label="Skolvo on LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="mailto:support@skolvo.online"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-ink-soft transition-colors hover:border-accent hover:text-accent"
                aria-label="Email Skolvo"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Link columns. min-h on every row keeps footer links at a usable
              touch size, which text-only lists normally fail. */}
          <nav className="md:col-span-3" aria-label="Products">
            <h2 className="text-label font-semibold text-ink">Products</h2>
            <ul className="mt-3">
              {PRODUCTS.map((l) => (
                <li key={l.name}>
                  <Link
                    href={l.href}
                    className="flex min-h-11 items-center text-body-sm text-ink-soft transition-colors hover:text-accent"
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={() => openWaitlist()}
                  className="flex min-h-11 cursor-pointer items-center text-left text-body-sm text-ink-soft transition-colors hover:text-accent"
                >
                  What we are building next
                </button>
              </li>
            </ul>
          </nav>

          <nav className="md:col-span-2" aria-label="Company">
            <h2 className="text-label font-semibold text-ink">Company</h2>
            <ul className="mt-3">
              {COMPANY.map((l) => (
                <li key={l.name}>
                  <Link
                    href={l.href}
                    className="flex min-h-11 items-center text-body-sm text-ink-soft transition-colors hover:text-accent"
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="md:col-span-2" aria-label="Legal">
            <h2 className="text-label font-semibold text-ink">Legal</h2>
            <ul className="mt-3">
              {LEGAL.map((l) => (
                <li key={l.name}>
                  <Link
                    href={l.href}
                    className="flex min-h-11 items-center text-body-sm text-ink-soft transition-colors hover:text-accent"
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 text-body-sm text-ink-mute sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Skolvo. All rights reserved.</p>
          <a href="mailto:support@skolvo.online" className="link-underline flex min-h-11 w-fit items-center hover:text-ink">
            support@skolvo.online
          </a>
        </div>
      </div>
    </footer>
  );
}
