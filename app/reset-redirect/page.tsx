'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Smartphone as MobileIcon,
  Download,
  AlertTriangle,
  Shield,
  Loader2,
  Copy,
  Check,
  KeyRound,
} from 'lucide-react';

// Must match DeepLinks.scheme in the Flutter app (lib/config/deep_links.dart)
// and the campusnova scheme registered in AndroidManifest.xml.
const APP_SCHEME = 'campusnova';

// How long to wait for the OS to hand off to the app before concluding it
// isn't installed. Matches accept-invite.
const DEEP_LINK_TIMEOUT_MS = 1800;

function RedirectContent() {
  const searchParams = useSearchParams();

  // Supabase's PKCE flow sends ?code=. Our own links use ?token=. Accept both
  // so this page keeps working regardless of which flow is configured.
  const token = searchParams.get('token') || searchParams.get('code') || '';
  const email = searchParams.get('email') || '';

  // 'loading'  → deep-link attempt in progress
  // 'fallback' → timeout elapsed, app didn't open → show install prompt
  // 'no_token' → nothing to forward → explain rather than bounce
  const [status, setStatus] = useState<'loading' | 'fallback' | 'no_token'>('loading');
  const [copied, setCopied] = useState(false);

  const deepLinkUrl = `${APP_SCHEME}://reset-password?token=${encodeURIComponent(token)}${
    email ? `&email=${encodeURIComponent(email)}` : ''
  }`;

  useEffect(() => {
    if (!token) {
      setStatus('no_token');
      return;
    }

    window.location.href = deepLinkUrl;

    // ── Visibility-aware fallback timer ────────────────────────────────────
    //
    // A plain setTimeout keeps running while the OS backgrounds this tab to hand
    // off to the app, so it fires during the handoff and the fallback UI flashes
    // in behind the app. Ticking only while the page is visible means a
    // successful handoff pauses the clock and the fallback never fires.
    //
    // Previously this page ran an unconditional 3s countdown that then navigated
    // to /reset-password — a route that does not exist on this site, so a
    // successful app handoff was followed by a 404 in the browser behind it.
    const TICK_MS = 100;
    let elapsed = 0;

    const tick = setInterval(() => {
      if (document.visibilityState !== 'visible') return;

      elapsed += TICK_MS;
      if (elapsed >= DEEP_LINK_TIMEOUT_MS) {
        clearInterval(tick);
        setStatus('fallback');
      }
    }, TICK_MS);

    // Safe on every exit path — normal timeout, unmount, pagehide, or React
    // StrictMode's double-invoke. clearInterval on a stopped interval is a no-op.
    return () => clearInterval(tick);
  }, [token, deepLinkUrl]);

  const handleCopyToken = () => {
    if (!token) return;
    navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ── No token ──────────────────────────────────────────────────────────────
  if (status === 'no_token') {
    return (
      <PageShell>
        <div className="space-y-3 pt-2">
          <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-red-500/10 border border-red-500/30" />
            <AlertTriangle className="w-7 h-7 text-red-400" />
          </div>

          <h2 className="text-xl font-bold font-display text-white">
            Invalid reset link
          </h2>

          <p className="text-sm text-gray-400 leading-relaxed">
            This link is missing its security code. Password reset links can only
            be used once and expire after a short while.
          </p>

          <p className="text-xs text-gray-500 leading-relaxed">
            Open <strong className="text-gray-300">Forgot password?</strong> in the
            CampusNova app to request a fresh link.
          </p>
        </div>

        <div className="pt-4 border-t border-white/10">
          <SecurityFooter />
        </div>
      </PageShell>
    );
  }

  // ── Fallback: app didn't open ─────────────────────────────────────────────
  if (status === 'fallback') {
    return (
      <PageShell>
        <div className="space-y-3 pt-2">
          <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-[#0F6B54]/10 border border-[#0F6B54]/30" />
            <MobileIcon className="w-7 h-7 text-[#0F6B54]" />
          </div>

          <h2 className="text-xl font-bold font-display text-white">
            Open this on your phone
          </h2>

          <p className="text-sm text-gray-400 leading-relaxed">
            Passwords are reset inside the{' '}
            <strong className="text-white">CampusNova mobile app</strong>. Open this
            link on the device where the app is installed.
          </p>
        </div>

        <div className="pt-4 border-t border-white/10 space-y-2.5 text-xs">
          <a
            href={deepLinkUrl}
            className="w-full py-3 px-4 bg-gradient-to-r from-[#0F6B54] to-[#0C5744] hover:from-[#0F6B54] hover:to-[#0F6B54] text-white font-semibold rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all"
          >
            <MobileIcon className="w-4 h-4" />
            Open CampusNova app
          </a>

          {/* TODO: STORE_URL_PLACEHOLDER — same as accept-invite. Replace with
              real store links once the app is published. */}
          <button
            disabled
            title="Coming soon to the Google Play Store"
            className="w-full py-3 px-4 bg-white/10 opacity-60 cursor-not-allowed text-white font-semibold rounded-xl border border-white/10 flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4 text-[#E0A21B]" />
            Get the app
            <span className="ml-auto text-data font-normal bg-white/10 px-2 py-0.5 rounded-full text-gray-400">
              Coming soon
            </span>
          </button>

          {token && (
            <button
              onClick={handleCopyToken}
              className="w-full py-2 px-3 bg-white/5 hover:bg-white/10 text-gray-300 text-data rounded-lg flex items-center justify-center gap-1.5 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#3FAE8C]" /> Code copied
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> Copy security code
                </>
              )}
            </button>
          )}
        </div>

        <div className="pt-2">
          <SecurityFooter />
        </div>
      </PageShell>
    );
  }

  // ── Loading: handoff in progress ──────────────────────────────────────────
  return (
    <PageShell>
      <div className="space-y-3 pt-2">
        <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-t-[#0F6B54] border-r-[#E0A21B] border-b-transparent border-l-transparent animate-spin" />
          <KeyRound className="w-7 h-7 text-[#0F6B54] animate-pulse" />
        </div>

        <h2 className="text-xl font-bold font-display text-white">
          Opening CampusNova&hellip;
        </h2>

        <p className="text-xs text-gray-300 leading-relaxed">
          Launching the <strong className="text-white">CampusNova app</strong> so you
          can set a new password.
        </p>

        <div className="px-3 py-1.5 bg-[#0B0B14] border border-white/10 rounded-full w-fit mx-auto text-data text-[#0F6B54] font-mono">
          Redirecting&hellip;
        </div>
      </div>

      <div className="pt-4 border-t border-white/10 text-xs text-center text-gray-500">
        Not opening?{' '}
        <span className="text-gray-400">
          Make sure the CampusNova app is installed on this device.
        </span>
      </div>

      <div className="pt-2">
        <SecurityFooter />
      </div>
    </PageShell>
  );
}

// ── Shared layout shell — matches accept-invite ──────────────────────────────

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center p-4 sm:p-6 overflow-hidden font-sans">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#0F6B54]/20 rounded-full blur-[140px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md bg-[#131322] border border-[#0F6B54]/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-[#0F6B54]/20 text-center space-y-6 overflow-hidden"
      >
        <div className="flex items-center justify-center gap-2">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-[#0F6B54]/30 bg-white">
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

        {children}
      </motion.div>
    </div>
  );
}

function SecurityFooter() {
  return (
    <div className="flex items-center justify-center gap-1.5 text-data text-gray-500">
      <Shield className="w-3.5 h-3.5 text-[#3FAE8C]" />
      <span>Encrypted Auth Portal • Official Domain skolvo.online</span>
    </div>
  );
}

export default function ResetRedirectPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[70vh] flex items-center justify-center text-white">
          <Loader2 className="w-8 h-8 animate-spin text-[#0F6B54]" />
        </div>
      }
    >
      <RedirectContent />
    </Suspense>
  );
}
