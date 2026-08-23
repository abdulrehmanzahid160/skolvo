import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

/**
 * Shared shell for the legal pages so Privacy, Terms, and Security read as one
 * document set rather than three separately-styled pages.
 *
 * Measure is capped at max-w-3xl and the body runs at --text-body rather than
 * the old 14.5px, because these are the pages most likely to be read start to
 * finish and legibility beats density here.
 */
export default function LegalLayout({
  eyebrow,
  title,
  updated,
  summary,
  children,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  summary: string;
  children: React.ReactNode;
}) {
  return (
    <div className="legal-page mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <Link
        href="/"
        className="link-underline inline-flex min-h-11 items-center gap-1.5 text-body-sm font-semibold text-ink-mute transition-colors hover:text-accent"
      >
        <ArrowLeft aria-hidden className="h-3.5 w-3.5" />
        Back to Skolvo
      </Link>

      <header className="mt-6 border-b border-line pb-9">
        <p className="label">{eyebrow}</p>
        <h1 className="font-display-lg mt-3 text-display text-ink">{title}</h1>
        <p className="font-data mt-3 text-data text-ink-mute">Last updated {updated}</p>
        <p className="mt-5 text-lead text-ink-soft">{summary}</p>
      </header>

      <div className="mt-12 space-y-10">{children}</div>

      <footer className="mt-16 rounded-card border border-line bg-surface p-6">
        <h2 className="font-display text-body font-semibold text-ink">
          Questions about this page?
        </h2>
        <p className="mt-2 text-body-sm text-ink-soft">
          If something here is unclear, or you need a commitment in writing before sharing data,
          write and ask.
        </p>
        <a
          href="mailto:support@skolvo.online"
          className="link-underline mt-3 inline-flex min-h-11 items-center text-body-sm font-semibold text-accent"
        >
          support@skolvo.online
        </a>
      </footer>
    </div>
  );
}

export function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-title text-ink">{heading}</h2>
      <div className="mt-3 space-y-3 text-body text-ink-soft">{children}</div>
    </section>
  );
}
