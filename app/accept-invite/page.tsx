'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Smartphone as MobileIcon,
  Download,
  AlertTriangle,
  Loader2,
  Shield,
  UserPlus,
} from 'lucide-react';

// The custom URI scheme used by the CampusNova mobile app.
// This must match the scheme registered in the Flutter app's AndroidManifest.xml / Info.plist.
const APP_SCHEME = 'campusnova';

// How long (ms) to wait after attempting the deep link before concluding
// the app is not installed and showing the fallback UI.
const DEEP_LINK_TIMEOUT_MS = 1800;

// ---------------------------------------------------------------------------
// TODO: Replace these placeholder URLs with the real store listings once the
//       app is published. Search for "STORE_URL_PLACEHOLDER" in this file.
// ---------------------------------------------------------------------------

/** @todo STORE_URL_PLACEHOLDER – replace with real Google Play Store URL */
const PLAY_STORE_URL = null; // e.g. 'https://play.google.com/store/apps/details?id=com.skolvo.campusnova'

/** @todo STORE_URL_PLACEHOLDER – replace with real Apple App Store URL */
const APP_STORE_URL = null; // e.g. 'https://apps.apple.com/app/campusnova/id0000000000'

// ---------------------------------------------------------------------------

function AcceptInviteContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') ?? '';

  // 'loading'   → page just mounted, deep-link attempt in progress
  // 'fallback'  → timeout elapsed, app didn't open → show install prompt
  // 'no_token'  → token param is missing or empty → show error
  const [status, setStatus] = useState<'loading' | 'fallback' | 'no_token'>('loading');

  useEffect(() => {
    // Guard: if there's no token, skip the deep-link attempt entirely.
    if (!token) {
      setStatus('no_token');
      return;
    }

    // Attempt to open the mobile app via custom URI scheme.
    // Email clients strip native schemes, so this page is the bridge:
    //   https://app.skolvo.online/accept-invite?token=XYZ
    //     → tries campusnova://accept-invite?token=XYZ
    //       → if app is installed, OS hands off to the app
    //       → if not installed, browser ignores it; timer fires → fallback UI
    const deepLinkUrl = `${APP_SCHEME}://accept-invite?token=${encodeURIComponent(token)}`;
    window.location.href = deepLinkUrl;

    // ── Visibility-aware fallback timer ────────────────────────────────────
    //
    // WHY NOT setTimeout:
    //   On Android Chrome, a successful deep link backgrounds the browser tab
    //   while the OS hands off to the app. A plain setTimeout keeps ticking
    //   during that hidden period, so it can fire while the tab is still in the
    //   background — causing the fallback UI to flash in and confuse the user
    //   when they eventually return to the browser.
    //
    // THE FIX — tick-based timer that pauses while the page is hidden:
    //   We use setInterval at a fine granularity (100 ms) and only advance our
    //   elapsed counter when document.visibilityState === 'visible'. If the OS
    //   hides the tab (app handoff in progress), elapsed stops advancing, so
    //   the fallback never fires prematurely.
    //
    // WHAT ABOUT pagehide:
    //   `pagehide` fires when the browser fully removes the page from the
    //   active navigation stack (back-forward cache eviction, tab kill, etc.).
    //   After `pagehide` the page is either frozen or destroyed — the JS
    //   event loop is suspended, so setInterval callbacks simply stop running.
    //   There is no risk of a throw or a leak: the cleanup function returned
    //   below calls clearInterval, which is safe to call on an already-cleared
    //   or never-fired interval ID. React also calls cleanup on unmount, which
    //   covers the case where the component is torn down for any reason
    //   (including a full page navigation triggered by the deep link itself on
    //   some browsers). So the single clearInterval in the cleanup handles
    //   every exit path — setTimeout, pagehide, and unmount — correctly.

    const TICK_MS = 100; // resolution of the visibility check
    let elapsed = 0;

    const tick = setInterval(() => {
      // Only advance the clock while the tab is visible. If the OS has
      // backgrounded the browser for an app handoff, visibilityState will be
      // 'hidden' and we simply skip this tick without incrementing elapsed.
      if (document.visibilityState !== 'visible') return;

      elapsed += TICK_MS;

      if (elapsed >= DEEP_LINK_TIMEOUT_MS) {
        clearInterval(tick);
        setStatus('fallback');
      }
    }, TICK_MS);

    // Cleanup: always clear the interval, regardless of which exit path fires
    // (normal timeout, component unmount, pagehide, or React StrictMode
    // double-invoke). clearInterval on a stopped interval is a no-op, so this
    // is always safe.
    return () => clearInterval(tick);
  }, [token]);

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
            Invalid Invite Link
          </h2>

          <p className="text-sm text-gray-400 leading-relaxed">
            This invite link is missing a required token. Please check your email
            for the original invitation and tap the link there.
          </p>

          <p className="text-xs text-gray-500 leading-relaxed">
            If you believe this is a mistake, ask your academy admin to resend
            the invitation.
          </p>
        </div>

        <div className="pt-4 border-t border-white/10">
          <SecurityFooter />
        </div>
      </PageShell>
    );
  }

  // ── Fallback: app not installed ───────────────────────────────────────────
  if (status === 'fallback') {
    return (
      <PageShell>
        <div className="space-y-3 pt-2">
          <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-[#0F6B54]/10 border border-[#0F6B54]/30" />
            <MobileIcon className="w-7 h-7 text-[#0F6B54]" />
          </div>

          <h2 className="text-xl font-bold font-display text-white">
            You need the Skolvo app
          </h2>

          <p className="text-sm text-gray-400 leading-relaxed">
            To accept this staff invite and set up your account, you&apos;ll need the{' '}
            <strong className="text-white">CampusNova mobile app</strong> installed
            on your device.
          </p>
        </div>

        {/* Store buttons */}
        <div className="pt-4 border-t border-white/10 space-y-2.5 text-xs">
          <span className="text-data text-gray-400 font-semibold uppercase tracking-wider block">
            Download the app
          </span>

          {/*
           * TODO: STORE_URL_PLACEHOLDER
           * Replace the `href="#"` and disabled state below with real store URLs
           * once the app is published. Remove the "(Coming Soon)" badge too.
           * Example: href={PLAY_STORE_URL ?? '#'}
           */}
          <button
            disabled
            title="Coming soon to the Google Play Store"
            className="w-full py-3 px-4 bg-gradient-to-r from-[#0F6B54] to-[#0C5744] opacity-60 cursor-not-allowed text-white font-semibold rounded-xl shadow-lg flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Google Play Store
            <span className="ml-auto text-data font-normal bg-white/20 px-2 py-0.5 rounded-full">
              Coming soon
            </span>
          </button>

          {/*
           * TODO: STORE_URL_PLACEHOLDER
           * Same as above — replace with real App Store URL when available.
           */}
          <button
            disabled
            title="Coming soon to the Apple App Store"
            className="w-full py-3 px-4 bg-white/10 opacity-60 cursor-not-allowed text-white font-semibold rounded-xl border border-white/10 flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4 text-[#E0A21B]" />
            Apple App Store
            <span className="ml-auto text-data font-normal bg-white/10 px-2 py-0.5 rounded-full text-gray-400">
              Coming soon
            </span>
          </button>

          {/* Retry deep link in case the user just installed the app */}
          <a
            href={`${APP_SCHEME}://accept-invite?token=${encodeURIComponent(token)}`}
            className="w-full py-2 px-3 bg-white/5 hover:bg-white/10 text-gray-300 text-data rounded-lg flex items-center justify-center gap-1.5 transition-colors"
          >
            <MobileIcon className="w-3.5 h-3.5" />
            Already installed? Open the app
          </a>
        </div>

        <div className="pt-2">
          <SecurityFooter />
        </div>
      </PageShell>
    );
  }

  // ── Loading: deep-link attempt in progress ────────────────────────────────
  return (
    <PageShell>
      <div className="space-y-3 pt-2">
        <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-t-[#0F6B54] border-r-[#E0A21B] border-b-transparent border-l-transparent animate-spin" />
          <UserPlus className="w-7 h-7 text-[#0F6B54] animate-pulse" />
        </div>

        <h2 className="text-xl font-bold font-display text-white">
          Opening CampusNova&hellip;
        </h2>

        <p className="text-xs text-gray-300 leading-relaxed">
          Launching the <strong className="text-white">CampusNova app</strong> to
          complete your staff invitation.
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

// ── Shared layout shell ──────────────────────────────────────────────────────

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center p-4 sm:p-6 overflow-hidden font-sans">
      {/* Background glow — matches reset-redirect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#0F6B54]/20 rounded-full blur-[140px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md bg-[#131322] border border-[#0F6B54]/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-[#0F6B54]/20 text-center space-y-6 overflow-hidden"
      >
        {/* Brand header */}
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

// ── Security footer — same as reset-redirect ─────────────────────────────────

function SecurityFooter() {
  return (
    <div className="flex items-center justify-center gap-1.5 text-data text-gray-500">
      <Shield className="w-3.5 h-3.5 text-[#3FAE8C]" />
      <span>Secure Invite Portal • Official Domain skolvo.online</span>
    </div>
  );
}

// ── Page export with Suspense boundary (required for useSearchParams) ─────────

export default function AcceptInvitePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[70vh] flex items-center justify-center text-white">
          <Loader2 className="w-8 h-8 animate-spin text-[#0F6B54]" />
        </div>
      }
    >
      <AcceptInviteContent />
    </Suspense>
  );
}
