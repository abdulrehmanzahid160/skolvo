import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

/**
 * Shared shell for the legal pages so Privacy / Terms / Security read as one
 * document set rather than three separately-styled pages.
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
    <div className="relative bg-[#EDF1EE] py-14 text-[#101C18] sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="label-caps inline-flex items-center gap-1.5 text-[#67796F] transition-colors hover:text-[#0F7A5F]"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to Skolvo
        </Link>

        <header className="mt-6 border-b border-[#D2DBD5] pb-8">
          <span className="label-caps text-[#0F7A5F]">{eyebrow}</span>
          <h1 className="font-display mt-3 text-3xl font-semibold tracking-tight sm:text-[2.6rem]">
            {title}
          </h1>
          <p className="font-data mt-3 text-[11px] text-[#67796F]">Last updated {updated}</p>
          <p className="mt-5 text-[15.5px] leading-relaxed text-[#3D4F47]">{summary}</p>
        </header>

        <div className="legal-body mt-10 space-y-9">{children}</div>

        <footer className="mt-14 rounded-2xl border border-[#D2DBD5] bg-white p-6">
          <h2 className="font-display text-base font-semibold">Questions about this page?</h2>
          <p className="mt-2 text-[13.5px] leading-relaxed text-[#3D4F47]">
            A real person answers this address. If something here is unclear, or you want a
            commitment in writing before you trust us with data, write to us and ask.
          </p>
          <a
            href="mailto:support@skolvo.online"
            className="mt-3 inline-block text-[13.5px] font-semibold text-[#0F7A5F] underline underline-offset-4"
          >
            support@skolvo.online
          </a>
        </footer>
      </div>
    </div>
  );
}

export function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-xl font-semibold text-[#101C18]">{heading}</h2>
      <div className="mt-3 space-y-3 text-[14.5px] leading-relaxed text-[#3D4F47]">{children}</div>
    </section>
  );
}
