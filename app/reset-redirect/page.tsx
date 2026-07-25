'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Smartphone as MobileIcon,
  Globe as WebIcon,
  Shield,
  Loader2,
  Copy,
  Check,
} from 'lucide-react';

// Configuration defaults (easily swappable via env or constants)
const DEFAULT_APP_SCHEME = process.env.NEXT_PUBLIC_CAMPUSNOVA_APP_SCHEME || 'campusnova://reset-password';
const DEFAULT_WEB_URL = process.env.NEXT_PUBLIC_CAMPUSNOVA_WEB_URL || 'https://app.skolvo.online/reset-password';

function RedirectContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || searchParams.get('code') || '';
  const email = searchParams.get('email') || '';

  const [status, setStatus] = useState<'initiating' | 'deep_linking' | 'fallback_web' | 'manual'>('initiating');
  const [countdown, setCountdown] = useState(3);
  const [copied, setCopied] = useState(false);

  // Construct target URLs
  const deepLinkUrl = token ? `${DEFAULT_APP_SCHEME}?token=${encodeURIComponent(token)}&email=${encodeURIComponent(email)}` : DEFAULT_APP_SCHEME;
  const webAppUrl = token ? `${DEFAULT_WEB_URL}?token=${encodeURIComponent(token)}&email=${encodeURIComponent(email)}` : DEFAULT_WEB_URL;

  useEffect(() => {
    setStatus('deep_linking');

    // Attempt custom URI scheme execution immediately
    if (typeof window !== 'undefined') {
      window.location.href = deepLinkUrl;
    }

    // Countdown for web fallback timer
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setStatus('fallback_web');
          if (typeof window !== 'undefined') {
            window.location.href = webAppUrl;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [deepLinkUrl, webAppUrl]);

  const handleCopyToken = () => {
    if (token) {
      navigator.clipboard.writeText(token);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center p-4 sm:p-6 overflow-hidden font-sans">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#6D5CFB]/20 rounded-full blur-[140px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md bg-[#131322] border border-[#6D5CFB]/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-[#6D5CFB]/20 text-center space-y-6 overflow-hidden"
      >
        {/* Brand Logo Header */}
        <div className="flex items-center justify-center gap-2">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-[#6D5CFB]/30 bg-white">
            <Image
              src="/logo.png"
              alt="Skolvo Logo"
              fill
              className="object-contain p-0.5"
              priority
            />
          </div>
          <span className="font-display font-extrabold text-2xl tracking-tight text-white">
            CampusNova
          </span>
        </div>

        {/* Dynamic Status Display */}
        <div className="space-y-3 pt-2">
          <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-t-[#6D5CFB] border-r-[#FF6B4A] border-b-transparent border-l-transparent animate-spin" />
            <MobileIcon className="w-7 h-7 text-[#8A7DFF] animate-pulse" />
          </div>

          <h2 className="text-xl font-bold font-display text-white">
            Redirecting to CampusNova...
          </h2>

          <p className="text-xs text-gray-300 leading-relaxed">
            Attempting to open the <strong className="text-white">CampusNova Mobile App</strong> via deep link.
          </p>

          <div className="px-3 py-1.5 bg-[#0B0B14] border border-white/10 rounded-full w-fit mx-auto text-[11px] text-[#8A7DFF] font-mono">
            {status === 'deep_linking'
              ? `Launching app... Fallback to Web in ${countdown}s`
              : 'Opening Web Application...'}
          </div>
        </div>

        {/* Fallback Action Buttons */}
        <div className="pt-4 border-t border-white/10 space-y-2.5 text-xs">
          <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block">
            Didn&apos;t open automatically? Choose option:
          </span>

          <a
            href={deepLinkUrl}
            className="w-full py-3 px-4 bg-gradient-to-r from-[#6D5CFB] to-[#5343E0] hover:from-[#8A7DFF] hover:to-[#6D5CFB] text-white font-semibold rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all"
          >
            <MobileIcon className="w-4 h-4" />
            Open CampusNova Mobile App
          </a>

          <a
            href={webAppUrl}
            className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/10 flex items-center justify-center gap-2 transition-all"
          >
            <WebIcon className="w-4 h-4 text-[#FF6B4A]" />
            Continue in Web Browser
          </a>

          {token && (
            <button
              onClick={handleCopyToken}
              className="w-full py-2 px-3 bg-white/5 hover:bg-white/10 text-gray-300 text-[11px] rounded-lg flex items-center justify-center gap-1.5 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> Token Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> Copy Password Reset Security Token
                </>
              )}
            </button>
          )}
        </div>

        {/* Security Footer Note */}
        <div className="pt-2 flex items-center justify-center gap-1.5 text-[10px] text-gray-500">
          <Shield className="w-3.5 h-3.5 text-emerald-400" />
          <span>Encrypted Auth Portal • Official Domain skolvo.online</span>
        </div>
      </motion.div>
    </div>
  );
}

export default function ResetRedirectPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[70vh] flex items-center justify-center text-white">
          <Loader2 className="w-8 h-8 animate-spin text-[#6D5CFB]" />
        </div>
      }
    >
      <RedirectContent />
    </Suspense>
  );
}
