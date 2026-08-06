'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useWaitlist } from '@/components/waitlist/WaitlistProvider';
import { ScrollProgress, EASE, DUR_EXIT } from '@/components/motion/Primitives';
import { Button } from '@/components/ui/Button';

const NAV_LINKS = [
  { name: 'Watchdog', href: '/watchdog' },
  { name: 'CampusNova', href: '/#campusnova' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { openWaitlist } = useWaitlist();

  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // useScroll instead of a scroll event listener: Motion batches reads on its
  // own frame loop, so this never contributes a layout read per scroll frame.
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (v) => {
    const next = v > 8;
    setScrolled((prev) => (prev === next ? prev : next));
  });

  // Close on route change, so tapping a link in the drawer does not leave it open.
  useEffect(() => setMenuOpen(false), [pathname]);

  // Escape to dismiss, and return focus to the control that opened the drawer.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  // Keep Tab inside the open drawer. Without this, tabbing walks invisibly
  // through the page behind the overlay.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-16 transition-colors duration-[--dur] ${
        scrolled ? 'border-b border-line bg-paper/85 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex min-h-11 items-center gap-2.5"
          aria-label="Skolvo home"
        >
          <span className="relative h-8 w-8 overflow-hidden rounded-control border border-line bg-white">
            <Image src="/logo.png" alt="" fill sizes="32px" className="object-contain p-0.5" priority />
          </span>
          <span className="font-display text-title text-ink">Skolvo</span>
        </Link>

        {/* Desktop nav. Five items on one line, well inside the 1024px breakpoint. */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {NAV_LINKS.map((link) => {
            // Hash links (/#campusnova) are sections of the homepage, not
            // routes, so they never take the active underline.
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                className={`relative rounded-full px-3.5 py-2 text-body-sm font-medium transition-colors duration-[--dur] ${
                  isActive ? 'text-ink' : 'text-ink-soft hover:text-ink'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-3.5 -bottom-0.5 h-[2px] rounded-full bg-accent"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Button onClick={() => openWaitlist()} className="px-5">
            Request access
          </Button>
        </div>

        <button
          ref={toggleRef}
          onClick={() => setMenuOpen((o) => !o)}
          className="flex h-11 w-11 items-center justify-center rounded-control border border-line bg-surface text-ink md:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* The signature element: page progress as a 2px rule under the nav. */}
      <ScrollProgress />

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8, transition: { duration: DUR_EXIT, ease: EASE } }}
            transition={{ duration: 0.3, ease: EASE }}
            className="absolute inset-x-0 top-16 border-b border-line bg-paper shadow-[var(--shadow-lg)] md:hidden"
          >
            <nav className="mx-auto max-w-6xl px-4 py-4" aria-label="Mobile">
              <ul className="flex flex-col">
                {NAV_LINKS.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex min-h-12 items-center rounded-control px-3 text-body font-medium text-ink-soft transition-colors hover:bg-sunk hover:text-ink"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-3 border-t border-line pt-3">
                <Button
                  onClick={() => {
                    setMenuOpen(false);
                    openWaitlist();
                  }}
                  className="w-full"
                >
                  Request access
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
