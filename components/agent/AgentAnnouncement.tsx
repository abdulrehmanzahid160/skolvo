'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, X } from 'lucide-react';
import { DUR_EXIT, EASE } from '@/components/motion/Primitives';

const STORAGE_KEY = 'skolvo-agent-launch-v1';
const OPEN_DELAY_MS = 1100;

export default function AgentAnnouncement() {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    try {
      if (window.localStorage.getItem(STORAGE_KEY)) return;
    } catch {
      // Storage can be unavailable in strict privacy modes.
    }
    const timer = window.setTimeout(() => {
      restoreRef.current = document.activeElement as HTMLElement | null;
      setIsOpen(true);
    }, OPEN_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const focusFrame = requestAnimationFrame(() => closeRef.current?.focus());
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const dismiss = useCallback(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, 'dismissed');
    } catch {
      // The dialog still closes when persistence is unavailable.
    }
    setIsOpen(false);
    requestAnimationFrame(() => restoreRef.current?.focus?.());
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        dismiss();
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [dismiss, isOpen]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <div className="fixed inset-0 z-[120] flex items-center justify-center overflow-y-auto p-3 sm:p-6">
          <motion.button
            type="button"
            aria-label="Dismiss Skolvo Agent announcement"
            className="fixed inset-0 cursor-default bg-[#09100d]/65 backdrop-blur-sm"
            onClick={dismiss}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: DUR_EXIT, ease: EASE } }}
            transition={{ duration: reduce ? 0 : 0.3, ease: EASE }}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="agent-announcement-title"
            aria-describedby="agent-announcement-description"
            className="relative z-10 grid max-h-[calc(100dvh-1.5rem)] w-full max-w-5xl overflow-hidden rounded-card border border-line bg-surface shadow-[var(--shadow-lg)] md:grid-cols-[minmax(0,1.05fr)_minmax(18rem,.75fr)]"
            initial={reduce ? false : { opacity: 0, y: 20, scale: 0.975 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.985, transition: { duration: DUR_EXIT, ease: EASE } }}
            transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 30 }}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={dismiss}
              className="absolute right-3 top-3 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface/95 text-ink-mute shadow-[var(--shadow-sm)] transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              aria-label="Close Skolvo Agent announcement"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
            <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-12">
              <div className="font-data text-[10px] font-semibold tracking-[.14em] text-accent">NOW LIVE / PRODUCT 03</div>
              <h2 id="agent-announcement-title" className="font-display mt-4 max-w-[12ch] text-display text-ink">Skolvo Agent</h2>
              <p className="font-display mt-4 max-w-[19ch] text-title leading-tight text-ink">Your job discovery and application workspace is live.</p>
              <p id="agent-announcement-description" className="prose-measure mt-4 text-body-sm text-ink-soft">Discover, evaluate, prepare, and track job opportunities in one focused workflow at agent.skolvo.online.</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a href="https://agent.skolvo.online" onClick={dismiss} className="studio-button">Open Skolvo Agent <ArrowRight aria-hidden /></a>
                <Link href="/agent" onClick={dismiss} className="studio-text-link justify-center sm:justify-start">View details</Link>
              </div>
            </div>
            <figure className="min-h-0 overflow-hidden border-t border-line bg-[#f7f4ed] md:border-l md:border-t-0">
              <div className="relative h-[38dvh] min-h-64 w-full md:h-full md:min-h-[36rem]">
                <Image src="/skolvo-agent-promo.jpg" alt="Skolvo Agent concept visual showing job discovery, profile matching, and application preparation" fill sizes="(max-width: 767px) 100vw, 38vw" className="object-contain" />
              </div>
            </figure>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
