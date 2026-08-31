'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react';
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';
import { useWaitlist } from '@/components/waitlist/WaitlistProvider';
import { ScrollProgress, EASE, DUR_EXIT } from '@/components/motion/Primitives';
import { Button } from '@/components/ui/Button';

const NAV_LINKS = [
  { name: 'Pricing', href: '/pricing' },
  { name: 'Journal', href: '/journal' },
  { name: 'Studio', href: '/about' },
];

const PRODUCT_LINKS = [
  { name: 'Skolvo Agent', href: '/agent', description: 'Job discovery, fit review, preparation, and application tracking.' },
  { name: 'CampusNova', href: '/campusnova', description: 'Student, teacher, fee, receipt, and academy reporting workflows.' },
  { name: 'SignalWatch', href: '/watchdog', description: 'Source-linked FDA regulatory monitoring and intelligence.' },
] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const pathname = usePathname();
  const { openWaitlist } = useWaitlist();

  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const productsToggleRef = useRef<HTMLButtonElement>(null);

  // useScroll instead of a scroll event listener: Motion batches reads on its
  // own frame loop, so this never contributes a layout read per scroll frame.
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (v) => {
    const next = v > 8;
    setScrolled((prev) => (prev === next ? prev : next));
  });

  // Close on route change, so tapping a link in the drawer does not leave it open.
  useEffect(() => {
    setMenuOpen(false);
    setProductsOpen(false);
    setMobileProductsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!productsOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!productsRef.current?.contains(event.target as Node)) setProductsOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [productsOpen]);

  // Escape to dismiss, and return focus to the control that opened the drawer.
  useEffect(() => {
    if (!menuOpen && !productsOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (productsOpen) {
          setProductsOpen(false);
          productsToggleRef.current?.focus();
        } else {
          setMenuOpen(false);
          toggleRef.current?.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen, productsOpen]);

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
      className={`skolvo-nav fixed inset-x-0 top-0 z-50 h-16 border-b text-white transition-all duration-[--dur] ${
        scrolled
          ? 'border-white/10 bg-[#09100d]/90 shadow-[0_8px_30px_rgba(0,0,0,.16)] backdrop-blur-xl'
          : 'border-white/10 bg-[#09100d]'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex min-h-11 items-center gap-2.5"
          aria-label="Skolvo home"
        >
          <span className="relative h-8 w-8 overflow-hidden rounded-control border border-white/15 bg-white">
            <Image src="/logo.png" alt="" fill sizes="32px" className="object-contain p-0.5" priority />
          </span>
          <span className="font-display text-title text-white">Skolvo</span>
          <span className="hidden font-data text-[10px] tracking-[.12em] text-white/35 sm:inline">STUDIO / 2026</span>
        </Link>

        {/* Desktop nav. Five items on one line, well inside the 1024px breakpoint. */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          <div ref={productsRef} className="relative">
            <button
              ref={productsToggleRef}
              type="button"
              onClick={() => setProductsOpen((open) => !open)}
              aria-expanded={productsOpen}
              aria-controls="desktop-products-menu"
              className={`relative flex items-center gap-1 rounded-full px-3.5 py-2 text-body-sm font-medium transition-colors duration-[--dur] ${PRODUCT_LINKS.some((product) => pathname === product.href) ? 'text-white' : 'text-white/55 hover:text-white'}`}
            >
              Products
              <motion.span aria-hidden animate={{ rotate: productsOpen ? 180 : 0 }} transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 28 }}><ChevronDown className="h-3.5 w-3.5" /></motion.span>
              {PRODUCT_LINKS.some((product) => pathname === product.href) && <span className="absolute inset-x-3.5 -bottom-0.5 h-[2px] rounded-full bg-[#79e7bf]" />}
            </button>
            <AnimatePresence>
              {productsOpen && (
                <motion.div
                  id="desktop-products-menu"
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12, scale: .96, clipPath: 'inset(0 0 100% 0 round 16px)' }}
                  animate={{ opacity: 1, y: 0, scale: 1, clipPath: 'inset(0 0 0% 0 round 16px)' }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: .98, clipPath: 'inset(0 0 20% 0 round 16px)' }}
                  transition={reduceMotion ? { duration: 0 } : { duration: .32, ease: EASE }}
                  className="absolute left-1/2 top-[calc(100%+1rem)] w-[29rem] -translate-x-1/2 overflow-hidden rounded-card border border-white/10 bg-[#101a16] p-2 shadow-[0_24px_60px_rgba(0,0,0,.35)]"
                >
                  <motion.span aria-hidden className="absolute inset-x-0 top-0 h-px origin-left bg-[#79e7bf]" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={reduceMotion ? { duration: 0 } : { duration: .55, delay: .08, ease: EASE }} />
                  <motion.p initial={reduceMotion ? false : { opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: reduceMotion ? 0 : .3, delay: reduceMotion ? 0 : .1, ease: EASE }} className="px-3 pb-2 pt-2 font-data text-[9px] tracking-[.13em] text-white/35">SKOLVO PRODUCTS / SELECT A WORKSPACE</motion.p>
                  {PRODUCT_LINKS.map((product, index) => (
                    <motion.div key={product.href} initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : .32, delay: reduceMotion ? 0 : .13 + index * .055, ease: EASE }} whileHover={reduceMotion ? undefined : { x: 4 }}>
                      <Link href={product.href} className="group relative grid grid-cols-[1fr_auto] items-center gap-4 overflow-hidden rounded-control px-3 py-3 transition-colors hover:bg-white/[.06] focus-visible:bg-white/[.06] focus-visible:outline-none">
                        <motion.span aria-hidden className="absolute inset-y-2 left-0 w-[2px] origin-top bg-[#79e7bf]" initial={{ scaleY: 0 }} whileHover={{ scaleY: 1 }} transition={{ duration: .2, ease: EASE }} />
                        <span><strong className="block text-body-sm text-white">{product.name}</strong><small className="mt-1 block text-xs leading-relaxed text-white/48 transition-colors group-hover:text-white/66">{product.description}</small></span>
                        <motion.span aria-hidden whileHover={reduceMotion ? undefined : { x: 4 }} transition={{ type: 'spring', stiffness: 500, damping: 28 }}><ArrowRight className="h-4 w-4 text-[#79e7bf]" /></motion.span>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {NAV_LINKS.map((link) => {
            // Hash links (/#campusnova) are sections of the homepage, not
            // routes, so they never take the active underline.
            const isActive = link.href === '/journal' ? pathname.startsWith('/journal') : pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                className={`relative rounded-full px-3.5 py-2 text-body-sm font-medium transition-colors duration-[--dur] ${
                  isActive ? 'text-white' : 'text-white/55 hover:text-white'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-3.5 -bottom-0.5 h-[2px] rounded-full bg-[#79e7bf]"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Link href="/contact" className="flex min-h-10 items-center rounded-full border border-white/20 px-5 text-body-sm font-semibold text-white transition-colors hover:border-[#79e7bf] hover:bg-[#79e7bf] hover:text-[#09100d]">Start a conversation</Link>
        </div>

        <button
          ref={toggleRef}
          onClick={() => setMenuOpen((o) => !o)}
          className="flex h-11 w-11 items-center justify-center rounded-control border border-white/15 bg-white/5 text-white md:hidden"
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
            className="absolute inset-x-0 top-16 border-b border-white/10 bg-[#09100d] shadow-[var(--shadow-lg)] md:hidden"
          >
            <nav className="mx-auto max-w-6xl px-4 py-4" aria-label="Mobile">
              <ul className="flex flex-col">
                <li>
                  <button type="button" onClick={() => setMobileProductsOpen((open) => !open)} aria-expanded={mobileProductsOpen} aria-controls="mobile-products-list" className="flex min-h-12 w-full items-center justify-between rounded-control px-3 text-body font-medium text-white/65 transition-colors hover:bg-white/5 hover:text-white">
                    Products <motion.span aria-hidden animate={{ rotate: mobileProductsOpen ? 180 : 0 }} transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 28 }}><ChevronDown className="h-4 w-4" /></motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {mobileProductsOpen && (
                      <motion.ul id="mobile-products-list" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reduceMotion ? 0 : .3, ease: EASE }} className="overflow-hidden border-l border-white/12 pl-2">
                        {PRODUCT_LINKS.map((product, index) => <motion.li key={product.href} initial={reduceMotion ? false : { opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: reduceMotion ? 0 : .28, delay: reduceMotion ? 0 : .08 + index * .05, ease: EASE }}><Link href={product.href} onClick={() => setMenuOpen(false)} className="group grid min-h-16 grid-cols-[1fr_auto] items-center gap-3 rounded-control px-3 py-2 hover:bg-white/5"><span><strong className="block text-sm text-white">{product.name}</strong><small className="mt-0.5 block text-[11px] leading-snug text-white/42">{product.description}</small></span><motion.span aria-hidden whileTap={reduceMotion ? undefined : { x: 4 }}><ArrowRight className="h-4 w-4 text-[#79e7bf]" /></motion.span></Link></motion.li>)}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
                {NAV_LINKS.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex min-h-12 items-center rounded-control px-3 text-body font-medium text-white/65 transition-colors hover:bg-white/5 hover:text-white"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-3 border-t border-white/10 pt-3">
                <Button
                  onClick={() => {
                    setMenuOpen(false);
                    openWaitlist();
                  }}
                  className="w-full bg-[#79e7bf] text-[#09100d] hover:bg-white"
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
