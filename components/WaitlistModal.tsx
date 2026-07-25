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
    }
  }, [isOpen]);

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
            className="fixed inset-0 bg-[#0B0B14]/80 backdrop-blur-md"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-[#131322] border border-[#6D5CFB]/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-[#6D5CFB]/20 overflow-hidden z-10"
          >
            {/* Ambient Background Lights */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#6D5CFB]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#FF6B4A]/15 rounded-full blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <div>
                <div className="flex items-center gap-2 px-3 py-1 bg-[#6D5CFB]/10 border border-[#6D5CFB]/30 rounded-full w-fit mb-4">
                  <Sparkles className="w-3.5 h-3.5 text-[#8A7DFF]" />
                  <span className="text-xs font-semibold text-[#8A7DFF] uppercase tracking-wider">
                    Early Access Priority
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold font-display text-white mb-2">
                  Get Early Access to <span className="text-gradient">{defaultProduct}</span>
                </h3>

                <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                  Be among the first educational institutions to transform attendance, parent communication, and fee operations with secure AI.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
                      Work / Personal Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="owner@academy.com"
                      className="w-full px-4 py-3 bg-[#0B0B14] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#6D5CFB] focus:ring-1 focus:ring-[#6D5CFB] transition-all text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
                      Your Primary Role
                    </label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full px-4 py-3 bg-[#0B0B14] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#6D5CFB] focus:ring-1 focus:ring-[#6D5CFB] transition-all text-sm"
                    >
                      <option value="School / Coaching Owner">Academy Owner / Administrator</option>
                      <option value="School Principal / Director">School Principal / Director</option>
                      <option value="Teacher / Educator">Teacher / Educator</option>
                      <option value="IT & Operations Manager">IT & Operations Manager</option>
                      <option value="Independent Tutor">Independent Tutor / Small Business</option>
                      <option value="Other Interested Individual">Other Interested Individual</option>
                    </select>
                  </div>

                  {error && (
                    <p className="text-xs text-red-400 bg-red-950/30 border border-red-800/40 p-2.5 rounded-lg">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-6 bg-gradient-to-r from-[#6D5CFB] to-[#5343E0] hover:from-[#8A7DFF] hover:to-[#6D5CFB] text-white font-semibold rounded-xl shadow-lg shadow-[#6D5CFB]/25 flex items-center justify-center gap-2 transition-all transform active:scale-95 text-sm"
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

                <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-400">
                  <ShieldCheck className="w-4 h-4 text-[#FF6B4A]" />
                  <span>Zero spam. Direct priority invite when public beta opens.</span>
                </div>
              </div>
            ) : (
              <div className="py-6 text-center">
                <div className="w-16 h-16 bg-[#6D5CFB]/20 border border-[#6D5CFB]/50 rounded-full flex items-center justify-center mx-auto mb-4 text-[#8A7DFF]">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold font-display text-white mb-2">
                  You&apos;re On The List!
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  Thank you for joining the <strong className="text-white">{defaultProduct}</strong> early access waitlist. We will notify you directly at <strong className="text-[#8A7DFF]">{email}</strong>.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl text-sm transition-colors"
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
