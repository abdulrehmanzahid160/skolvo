'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, CheckCircle2, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProduct?: string;
}

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

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setError('');
      setEmail('');
      setRole(isWatchdog ? 'Independent Regulatory Consultant' : 'School / Coaching Owner');
    }
  }, [isOpen, isWatchdog]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
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
        setError(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden z-10 text-[#101C18]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 text-neutral-500 hover:text-black bg-neutral-100 hover:bg-neutral-200 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <div>
                <div className="flex items-center gap-2 px-3 py-1 bg-[#0F7A5F]/10 border border-[#0F7A5F]/30 rounded-full w-fit mb-4">
                  <Sparkles className="w-3.5 h-3.5 text-[#0F7A5F]" />
                  <span className="text-xs font-bold text-[#0F7A5F] uppercase tracking-wider">
                    Early Access Priority
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-[#101C18] mb-2">
                  Get Early Access to <span className="text-[#0F7A5F]">{defaultProduct}</span>
                </h3>

                <p className="text-neutral-600 text-sm mb-6 leading-relaxed">
                  {isWatchdog
                    ? 'Get the weekly FDA digest for your category — competitor clearances, adverse events, and recalls in plain English, with a link to every original record.'
                    : 'Be among the first academies to hand attendance, parent messaging, and fee reconciliation to software that runs on its own.'}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                      Work / Personal Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={isWatchdog ? 'you@consulting.com' : 'owner@academy.com'}
                      className="w-full px-4 py-3 bg-[#EDF1EE] border border-neutral-300 rounded-xl text-[#101C18] placeholder-neutral-400 focus:outline-none focus:border-[#101C18] focus:ring-1 focus:ring-[#101C18] transition-all text-sm font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                      Your Primary Role
                    </label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full px-4 py-3 bg-[#EDF1EE] border border-neutral-300 rounded-xl text-[#101C18] focus:outline-none focus:border-[#101C18] focus:ring-1 focus:ring-[#101C18] transition-all text-sm font-medium"
                    >
                      {isWatchdog ? (
                        <>
                          <option value="Independent Regulatory Consultant">
                            Independent Regulatory Consultant
                          </option>
                          <option value="Small Medical Device Company">
                            Small / Mid Medical Device Company
                          </option>
                          <option value="Quality & Compliance Lead">
                            Quality &amp; Compliance Lead
                          </option>
                          <option value="Regulatory Affairs Team">Regulatory Affairs Team</option>
                          <option value="Other Interested Individual">Something else</option>
                        </>
                      ) : (
                        <>
                          <option value="School / Coaching Owner">Academy Owner / Administrator</option>
                          <option value="School Principal / Director">School Principal / Director</option>
                          <option value="Teacher / Educator">Teacher / Educator</option>
                          <option value="IT & Operations Manager">IT &amp; Operations Manager</option>
                          <option value="Independent Tutor">Independent Tutor / Small Business</option>
                          <option value="Other Interested Individual">Something else</option>
                        </>
                      )}
                    </select>
                  </div>

                  {error && (
                    <p className="text-xs text-red-600 bg-red-50 border border-red-200 p-2.5 rounded-lg font-medium">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-6 bg-[#101C18] hover:bg-black text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition-all transform active:scale-95 text-sm"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Securing your spot...
                      </>
                    ) : (
                      <>
                        Request Early Access Invites
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-5 flex items-center justify-center gap-2 text-xs text-neutral-500 font-medium">
                  <ShieldCheck className="w-4 h-4 text-[#E0A21B]" />
                  <span>Zero spam. Direct priority invite when public beta opens.</span>
                </div>
              </div>
            ) : (
              <div className="py-6 text-center">
                <div className="w-16 h-16 bg-[#E4F1EC] border border-[#B5D8CB] rounded-full flex items-center justify-center mx-auto mb-4 text-[#0F7A5F]">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold font-display text-[#101C18] mb-2">
                  You&apos;re On The List!
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed mb-6">
                  Thank you for joining the <strong className="text-[#101C18]">{defaultProduct}</strong> early access waitlist. We will notify you directly at <strong className="text-[#0F7A5F]">{email}</strong>.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-[#101C18] font-bold rounded-xl text-sm transition-colors"
                >
                  Close Window
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
