'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Loader2, X } from 'lucide-react';
import { EASE, DUR_EXIT } from '@/components/motion/Primitives';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProduct?: string;
}

/**
 * Waitlist dialog. Mounted exactly once, at the layout root, by
 * WaitlistProvider.
 *
 * The network contract is unchanged: POST /api/waitlist with
 * { email, role, source }. Only presentation and accessibility differ from the
 * previous version.
 */
export default function WaitlistModal({
  isOpen,
  onClose,
  defaultProduct = 'CampusNova',
}: WaitlistModalProps) {
  const isWatchdog = defaultProduct.toLowerCase().includes('watchdog');

  const [email, setEmail] = useState('');
  const [role, setRole] = useState('School / Coaching Owner');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const panelRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  // Remember what had focus before opening so it can be restored on close.
  const restoreRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setError('');
      setEmail('');
      setRole(isWatchdog ? 'Independent Regulatory Consultant' : 'School / Coaching Owner');
    }
  }, [isOpen, isWatchdog]);

  // Focus the first field on open; restore the trigger's focus on close.
  useEffect(() => {
    if (isOpen) {
      restoreRef.current = document.activeElement as HTMLElement | null;
      // One frame's delay so the element exists and the entry animation has begun.
      const id = requestAnimationFrame(() => emailRef.current?.focus());
      return () => cancelAnimationFrame(id);
    }
    restoreRef.current?.focus?.();
  }, [isOpen]);

  // Lock background scroll. Without this the page behind the dialog scrolls
  // under the overlay on both wheel and touch.
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  // Escape to dismiss, and Tab confined to the dialog.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled])'
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
  }, [isOpen, onClose]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!email || !email.includes('@')) {
        setError('Enter an email address that includes an @ sign.');
        emailRef.current?.focus();
        return;
      }

      setLoading(true);
      setError('');

      try {
        const res = await fetch('/api/waitlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, role, source: defaultProduct }),
        });

        const data = await res.json();
        if (data.success) {
          setSubmitted(true);
        } else {
          setError(data.message || 'That did not go through. Try again in a moment.');
        }
      } catch {
        setError('No connection. Check your network and try again.');
      } finally {
        setLoading(false);
      }
    },
    [email, role, defaultProduct]
  );

  const fieldClass =
    'w-full min-h-11 rounded-control border border-line-strong bg-paper px-4 py-3 text-body-sm text-ink placeholder:text-ink-mute transition-colors focus:border-accent focus:outline-none';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: DUR_EXIT, ease: EASE } }}
            transition={{ duration: 0.24, ease: EASE }}
            onClick={onClose}
            className="fixed inset-0 bg-ink/55 backdrop-blur-sm"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="waitlist-title"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{
              opacity: 0,
              scale: 0.96,
              y: 12,
              transition: { duration: DUR_EXIT, ease: EASE },
            }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="relative z-10 w-full max-w-lg rounded-card border border-line bg-surface p-6 shadow-[var(--shadow-lg)] sm:p-8"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full text-ink-mute transition-colors hover:bg-sunk hover:text-ink"
              aria-label="Close dialog"
            >
              <X className="h-5 w-5" />
            </button>

            {!submitted ? (
              <>
                <h2
                  id="waitlist-title"
                  className="font-display max-w-[22ch] text-title text-ink sm:text-[1.625rem]"
                >
                  Request early access to {defaultProduct}
                </h2>

                <p className="prose-measure mt-3 text-body-sm text-ink-soft">
                  {isWatchdog
                    ? 'You get the weekly FDA digest for your category: competitor clearances, adverse events, and recalls in plain English, with a link to every original record.'
                    : 'Hand attendance, parent messaging, and fee reconciliation to software that runs on its own.'}
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="waitlist-email" className="text-label font-semibold text-ink">
                      Email address
                    </label>
                    <input
                      ref={emailRef}
                      id="waitlist-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      aria-describedby={error ? 'waitlist-error' : undefined}
                      aria-invalid={error ? true : undefined}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={isWatchdog ? 'you@consulting.com' : 'owner@academy.com'}
                      className={fieldClass}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="waitlist-role" className="text-label font-semibold text-ink">
                      Your role
                    </label>
                    <select
                      id="waitlist-role"
                      name="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className={fieldClass}
                    >
                      {isWatchdog ? (
                        <>
                          <option value="Independent Regulatory Consultant">
                            Independent regulatory consultant
                          </option>
                          <option value="Small Medical Device Company">
                            Small or mid-size medical device company
                          </option>
                          <option value="Quality & Compliance Lead">
                            Quality and compliance lead
                          </option>
                          <option value="Regulatory Affairs Team">Regulatory affairs team</option>
                          <option value="Other Interested Individual">Something else</option>
                        </>
                      ) : (
                        <>
                          <option value="School / Coaching Owner">
                            Academy owner or administrator
                          </option>
                          <option value="School Principal / Director">
                            School principal or director
                          </option>
                          <option value="Teacher / Educator">Teacher</option>
                          <option value="IT & Operations Manager">
                            IT and operations manager
                          </option>
                          <option value="Independent Tutor">Independent tutor</option>
                          <option value="Other Interested Individual">Something else</option>
                        </>
                      )}
                    </select>
                  </div>

                  {/* role="alert" so the failure is announced, not just drawn. */}
                  {error && (
                    <p
                      id="waitlist-error"
                      role="alert"
                      className="rounded-control border border-danger/25 bg-danger-wash px-3 py-2.5 text-body-sm text-danger"
                    >
                      {error}
                    </p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileTap={loading ? undefined : { scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    className="flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-ink px-6 text-body-sm font-semibold text-white shadow-[var(--shadow-md)] transition-colors hover:bg-[#0a130f] disabled:pointer-events-none disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending
                      </>
                    ) : (
                      <>
                        Request access
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </motion.button>
                </form>

                <p className="mt-4 text-center text-body-sm text-ink-mute">
                  No spam. One email when your invite is ready.
                </p>
              </>
            ) : (
              <div className="py-4 text-center">
                <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-accent-line bg-accent-wash text-accent">
                  <CheckCircle2 className="h-7 w-7" />
                </span>
                <h2 id="waitlist-title" className="font-display text-title text-ink">
                  You are on the list
                </h2>
                <p className="prose-measure mx-auto mt-3 text-body-sm text-ink-soft">
                  We will send your {defaultProduct} invite to{' '}
                  <strong className="font-semibold text-ink">{email}</strong>.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 min-h-11 cursor-pointer rounded-full border border-line-strong bg-surface px-6 text-body-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent-hover"
                >
                  Close
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
