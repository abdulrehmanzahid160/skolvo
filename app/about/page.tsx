'use client';

import React from 'react';
import { ArrowRight, Cpu, Linkedin, Mail, ShieldCheck } from 'lucide-react';
import { useWaitlist } from '@/components/waitlist/WaitlistProvider';
import { Button } from '@/components/ui/Button';
import {
  Reveal,
  RevealGroup,
  RevealItem,
  SectionHeading,
} from '@/components/motion/Primitives';

/* ============================================================
   ABOUT

   The team cards previously used gradient-filled rounded squares
   with the member's initials knocked out of them. That treatment
   is a recognisable stock pattern and it also implied a brand
   gradient that exists nowhere else on the site. Initials now sit
   flat on the accent wash, with the same information and less
   costume.

   TODO(assets): if real team photographs become available, drop
   them in at 400x400 (square, rendered at 56px) and the initials
   become the loading fallback.
   ============================================================ */

const TEAM = [
  {
    name: 'Abdul Rehman',
    role: 'Generative AI',
    bio: 'Builds structured data infrastructure for AI companies, with production LLM systems spanning retrieval, evaluation, and agentic pipelines.',
    initials: 'AR',
    skills: ['Generative AI', 'RAG systems', 'LLM evaluation', 'Agentic pipelines'],
    linkedin: 'https://www.linkedin.com/in/abdul-rehman-5845373a4/',
  },
  {
    name: 'Muhammad Hammad',
    role: 'Machine learning and biometrics',
    bio: 'Works on real-time computer vision, on-device facial recognition, liveness verification, and privacy-preserving models.',
    initials: 'MH',
    skills: ['Computer vision', 'On-device ML', 'Liveness detection', 'Model integration'],
    linkedin: 'https://www.linkedin.com/in/muhammad-hammad-9a8905379/',
  },
  {
    name: 'Waqar Ahmad',
    role: 'Full-stack and infrastructure',
    bio: 'Full-stack engineer across cloud ecosystems, role-gated backend APIs, real-time messaging pipelines, and database performance.',
    initials: 'WA',
    skills: ['Next.js', 'Role security', 'MongoDB Atlas', 'Real-time APIs'],
    linkedin: 'https://www.linkedin.com/in/waqar-ahmed-2592aa332/',
  },
];

export default function AboutPage() {
  const { openWaitlist } = useWaitlist();

  return (
    <>
      {/* ── Header ──────────────────────────────────────────────── */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 pb-14 pt-16 sm:px-6 lg:px-8 lg:pt-24">
          <Reveal>
            <p className="label">About Skolvo</p>
            <h1 className="font-display-lg mt-4 max-w-[24ch] text-display-lg text-ink">
              We build for the jobs where nobody gets a second try.
            </h1>
            <p className="prose-measure mt-5 text-lead text-ink-soft">
              Software for high-stakes work should be private by default, role-secure, and small
              enough to understand.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Story: split, text beside two claim tiles ───────────── */}
      <section className="border-b border-line bg-sunk">
        <div className="mx-auto max-w-6xl px-4 py-[var(--section-y)] sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Reveal>
                <h2 className="font-display text-display text-ink">
                  A studio, not one app with a company page attached.
                </h2>
                <div className="prose-measure mt-5 space-y-4 text-body text-ink-soft">
                  <p>
                    Institutions run on software that grew heavy: security gaps, interfaces nobody
                    can teach, and manual work the software was supposed to remove.
                  </p>
                  <p>
                    So we build a small number of products instead of one large one. Each gets its
                    own audience, its own pricing, and its own release schedule. CampusNova handles
                    the school gate. Regulatory Watchdog handles the FDA record. Both inherit the
                    same engineering standard.
                  </p>
                </div>
              </Reveal>
            </div>

            <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
              {[
                {
                  icon: ShieldCheck,
                  title: 'Private by default',
                  body: 'Biometric processing happens on the device. There is no photo archive to breach, subpoena, or lose.',
                },
                {
                  icon: Cpu,
                  title: 'Small enough to audit',
                  body: 'Each product does one job completely, which keeps the surface area small enough to reason about.',
                },
              ].map((c) => {
                const Icon = c.icon;
                return (
                  <RevealItem key={c.title}>
                    <div className="panel p-6">
                      <Icon aria-hidden className="h-5 w-5 text-accent" />
                      <h3 className="font-display mt-3 text-body font-semibold text-ink">
                        {c.title}
                      </h3>
                      <p className="mt-2 text-body-sm text-ink-soft">{c.body}</p>
                    </div>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* ── Team: rows, not floating cards ──────────────────────── */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-[var(--section-y)] sm:px-6 lg:px-8">
          <SectionHeading title="Who builds it." />

          <RevealGroup className="mt-10">
            <ul className="border-t border-line">
              {TEAM.map((m) => (
                <RevealItem key={m.name}>
                  <li className="grid gap-5 border-b border-line py-8 md:grid-cols-12 md:gap-8">
                    <div className="flex items-center gap-4 md:col-span-4">
                      <span
                        aria-hidden
                        className="font-display flex h-14 w-14 shrink-0 items-center justify-center rounded-control border border-accent-line bg-accent-wash text-body font-semibold text-accent"
                      >
                        {m.initials}
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-display text-body font-semibold text-ink">{m.name}</h3>
                        <p className="mt-0.5 text-body-sm text-ink-mute">{m.role}</p>
                      </div>
                    </div>

                    <div className="md:col-span-6">
                      <p className="text-body-sm text-ink-soft">{m.bio}</p>
                      <ul className="mt-3 flex flex-wrap gap-1.5">
                        {m.skills.map((s) => (
                          <li
                            key={s}
                            className="rounded-full border border-line bg-sunk px-2.5 py-1 text-data font-medium text-ink-soft"
                          >
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-start gap-2 md:col-span-2 md:justify-end">
                      {/* Rendered only when a real profile exists. An icon that
                          links to "#" is worse than no icon at all. */}
                      {m.linkedin && (
                        <a
                          href={m.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-ink-soft transition-colors hover:border-accent hover:text-accent"
                          aria-label={`${m.name} on LinkedIn`}
                        >
                          <Linkedin aria-hidden className="h-4 w-4" />
                        </a>
                      )}
                      <a
                        href="mailto:support@skolvo.online"
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-ink-soft transition-colors hover:border-accent hover:text-accent"
                        aria-label={`Email us about ${m.name}`}
                      >
                        <Mail aria-hidden className="h-4 w-4" />
                      </a>
                    </div>
                  </li>
                </RevealItem>
              ))}
            </ul>
          </RevealGroup>
        </div>
      </section>

      {/* ── Close ───────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-[var(--section-y)] sm:px-6 lg:px-8">
        <Reveal>
          <div className="on-dark flex flex-col gap-6 rounded-card bg-ink p-8 sm:p-14 md:flex-row md:items-center md:justify-between">
            <h2 className="font-display max-w-[26ch] text-display text-white">
              Both products are in early access.
            </h2>
            <Button
              onClick={() => openWaitlist()}
              className="shrink-0 bg-white text-ink hover:bg-[color:var(--ink-invert-soft)]"
            >
              Request access
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
