'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Loader2, Pencil, Send } from 'lucide-react';
import { Reveal } from '@/components/motion/Primitives';
import {
  PROJECT_TYPES,
  SECTIONS,
  list,
  summarize,
  val,
  validateSection,
  visibleQuestions,
  type Answers,
  type Question,
} from '@/lib/requirements';
import { SITE_CONFIG } from '@/lib/site';

/* ============================================================
   START A PROJECT

   Multi-step requirements form. Questions, conditional follow-ups
   and validation all come from lib/requirements.ts, which the API
   route also uses — edit questions there, not here.
   ============================================================ */

const DRAFT_KEY = 'skolvo:project-draft:v1';
const REVIEW_STEP = SECTIONS.length;

const fieldBase =
  'w-full min-h-11 rounded-control border bg-paper px-4 py-3 text-body-sm text-ink placeholder:text-ink-mute transition-colors focus:outline-none';
const fieldClass = (hasError?: boolean) =>
  `${fieldBase} ${hasError ? 'border-danger focus:border-danger' : 'border-line-strong focus:border-accent'}`;

const chipClass =
  'flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-line-strong bg-paper px-4 py-2 text-body-sm text-ink transition-colors hover:border-accent peer-checked:border-accent peer-checked:bg-accent peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent';

export default function StartProjectPage() {
  const [answers, setAnswers] = useState<Answers>({});
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const startedAt = useRef(0);
  const topRef = useRef<HTMLDivElement>(null);
  const hydrated = useRef(false);

  /* Restore a draft, then apply ?type= from service links. */
  useEffect(() => {
    startedAt.current = Date.now();
    let restored: Answers = {};
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) restored = JSON.parse(raw) as Answers;
    } catch {
      /* storage unavailable — start fresh */
    }
    const preset = new URLSearchParams(window.location.search).get('type');
    if (preset && PROJECT_TYPES.some((p) => p.value === preset)) {
      restored = { ...restored, projectType: preset };
    }
    setAnswers(restored);
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (!hydrated.current || submitted) return;
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(answers));
    } catch {
      /* ignore */
    }
  }, [answers, submitted]);

  const goTo = (next: number) => {
    setStep(next);
    setErrors({});
    setFormError('');
    requestAnimationFrame(() => topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };

  const setAnswer = (id: string, value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) setErrors((prev) => ({ ...prev, [id]: '' }));
  };

  const toggleMulti = (id: string, value: string) => {
    const current = list(answers, id);
    setAnswer(id, current.includes(value) ? current.filter((v) => v !== value) : [...current, value]);
  };

  const next = () => {
    const section = SECTIONS[step];
    const found = validateSection(section, answers);
    if (Object.keys(found).length) {
      setErrors(found);
      const first = Object.keys(found)[0];
      requestAnimationFrame(() =>
        document.getElementById(`q-${first}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }),
      );
      return;
    }
    goTo(step + 1);
  };

  const submit = async () => {
    // Re-validate everything in case a field was edited from the review step.
    for (let i = 0; i < SECTIONS.length; i++) {
      const found = validateSection(SECTIONS[i], answers);
      if (Object.keys(found).length) {
        goTo(i);
        setErrors(found);
        return;
      }
    }

    setLoading(true);
    setFormError('');
    try {
      const res = await fetch('/api/project-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers, website: honeypot, startedAt: startedAt.current }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setSubmitted(true);
        try {
          localStorage.removeItem(DRAFT_KEY);
        } catch {
          /* ignore */
        }
        requestAnimationFrame(() => topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
      } else {
        setFormError(data.message || `That did not send. Please try again or email ${SITE_CONFIG.supportEmail}.`);
      }
    } catch {
      setFormError('No connection. Check your network and try again.');
    } finally {
      setLoading(false);
    }
  };

  const summary = useMemo(() => summarize(answers), [answers]);
  const section = SECTIONS[step];
  const progress = submitted ? 100 : Math.round((step / REVIEW_STEP) * 100);

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="studio-shell">
          <Reveal>
            <div className="studio-eyebrow studio-eyebrow--light">
              <span>SKOLVO / START A PROJECT</span>
              <span>PROPOSAL WITHIN 24 HOURS</span>
            </div>
            <h1>
              Start a<br />
              <i>project.</i>
            </h1>
            <p>
              Websites, e-commerce stores, management systems and mobile apps. Answer a few questions — about five
              minutes — and we will come back with a clear scope, price and timeline.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="contact-body">
        <div ref={topRef} className="mx-auto max-w-3xl scroll-mt-24 px-4 py-[var(--section-y)] sm:px-6 lg:px-8">
          <div className="rounded-card border border-line bg-surface p-6 sm:p-9">
            {submitted ? (
              <div className="py-10 text-center">
                <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-accent-line bg-accent-wash text-accent">
                  <CheckCircle2 aria-hidden className="h-7 w-7" />
                </span>
                <h2 className="font-display text-title text-ink">Request received</h2>
                <p className="prose-measure mx-auto mt-3 text-body-sm text-ink-soft">
                  Thank you, {val(answers, 'name').split(/\s+/)[0] || 'there'}. We will review your requirements and
                  contact you at <strong className="font-semibold text-ink">{val(answers, 'email')}</strong> or on
                  WhatsApp within 24 hours.
                </p>
                <Link
                  href="/services"
                  className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong bg-surface px-6 text-body-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent-hover"
                >
                  Explore our services <ArrowRight aria-hidden className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              <>
                {/* Progress */}
                <div className="mb-8">
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="text-label font-semibold uppercase tracking-wide text-accent">
                      {step < REVIEW_STEP ? `Step ${step + 1} of ${SECTIONS.length}` : 'Review'}
                    </p>
                    <ol className="hidden gap-3 text-label text-ink-mute sm:flex" aria-label="Form steps">
                      {[...SECTIONS.map((s) => s.title), 'Review'].map((title, i) => (
                        <li
                          key={title}
                          aria-current={i === step ? 'step' : undefined}
                          className={i === step ? 'font-semibold text-ink' : i < step ? 'text-accent' : ''}
                        >
                          {title}
                        </li>
                      ))}
                    </ol>
                  </div>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-line" aria-hidden>
                    <div className="h-full rounded-full bg-accent transition-[width] duration-500" style={{ width: `${Math.max(progress, 6)}%` }} />
                  </div>
                </div>

                {/* Honeypot — invisible to people, tempting to bots. */}
                <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                  <label>
                    Website
                    <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
                  </label>
                </div>

                {step < REVIEW_STEP ? (
                  <form
                    noValidate
                    onSubmit={(e) => {
                      e.preventDefault();
                      next();
                    }}
                  >
                    <h2 className="font-display text-title text-ink">{section.intro}</h2>

                    <div className="mt-6 space-y-7">
                      {step === 0 ? (
                        <ProjectTypePicker
                          value={val(answers, 'projectType')}
                          error={errors.projectType}
                          onPick={(v) => {
                            setAnswer('projectType', v);
                            goTo(1);
                          }}
                        />
                      ) : (
                        visibleQuestions(section, answers).map((q) => (
                          <QuestionField
                            key={q.id}
                            q={q}
                            answers={answers}
                            error={errors[q.id]}
                            onChange={setAnswer}
                            onToggle={toggleMulti}
                          />
                        ))
                      )}
                    </div>

                    <div className="mt-9 flex items-center justify-between gap-3 border-t border-line pt-6">
                      {step > 0 ? (
                        <button
                          type="button"
                          onClick={() => goTo(step - 1)}
                          className="flex min-h-12 cursor-pointer items-center gap-2 rounded-full border border-line-strong px-5 text-body-sm font-semibold text-ink transition-colors hover:border-accent"
                        >
                          <ArrowLeft aria-hidden className="h-4 w-4" /> Back
                        </button>
                      ) : (
                        <span />
                      )}
                      {(step > 0 || val(answers, 'projectType')) && (
                        <button
                          type="submit"
                          className="flex min-h-12 cursor-pointer items-center gap-2 rounded-full bg-ink px-6 text-body-sm font-semibold text-white shadow-[var(--shadow-md)] transition-colors hover:bg-accent"
                        >
                          {step === REVIEW_STEP - 1 ? 'Review answers' : 'Continue'}
                          <ArrowRight aria-hidden className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </form>
                ) : (
                  <div>
                    <h2 className="font-display text-title text-ink">Check your answers</h2>
                    <p className="mt-2 text-body-sm text-ink-soft">Everything look right? You can edit any section.</p>

                    <div className="mt-6 space-y-6">
                      {summary.map((s) => {
                        const index = SECTIONS.findIndex((x) => x.title === s.title);
                        return (
                          <div key={s.title} className="rounded-control border border-line p-4 sm:p-5">
                            <div className="flex items-center justify-between gap-3">
                              <h3 className="text-label font-semibold uppercase tracking-wide text-accent">{s.title}</h3>
                              <button
                                type="button"
                                onClick={() => goTo(index)}
                                className="flex min-h-10 cursor-pointer items-center gap-1.5 rounded-full px-3 text-body-sm font-semibold text-ink-soft transition-colors hover:text-accent"
                              >
                                <Pencil aria-hidden className="h-3.5 w-3.5" /> Edit
                              </button>
                            </div>
                            <dl className="mt-2 divide-y divide-line">
                              {s.rows.map((r) => (
                                <div key={r.id} className="grid gap-1 py-2.5 sm:grid-cols-[40%_1fr] sm:gap-4">
                                  <dt className="text-body-sm text-ink-mute">{r.label}</dt>
                                  <dd className="whitespace-pre-wrap break-words text-body-sm text-ink">{r.value}</dd>
                                </div>
                              ))}
                            </dl>
                          </div>
                        );
                      })}
                    </div>

                    {formError && (
                      <p role="alert" className="mt-6 rounded-control border border-danger/25 bg-danger-wash px-3 py-2.5 text-body-sm text-danger">
                        {formError}
                      </p>
                    )}

                    <div className="mt-9 flex items-center justify-between gap-3 border-t border-line pt-6">
                      <button
                        type="button"
                        onClick={() => goTo(step - 1)}
                        className="flex min-h-12 cursor-pointer items-center gap-2 rounded-full border border-line-strong px-5 text-body-sm font-semibold text-ink transition-colors hover:border-accent"
                      >
                        <ArrowLeft aria-hidden className="h-4 w-4" /> Back
                      </button>
                      <button
                        type="button"
                        onClick={submit}
                        disabled={loading}
                        className="flex min-h-12 cursor-pointer items-center gap-2 rounded-full bg-ink px-6 text-body-sm font-semibold text-white shadow-[var(--shadow-md)] transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-60"
                      >
                        {loading ? (
                          <>
                            <Loader2 aria-hidden className="h-4 w-4 animate-spin" /> Sending
                          </>
                        ) : (
                          <>
                            Send request <Send aria-hidden className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {!submitted && (
            <p className="mt-6 text-center text-body-sm text-ink-soft">
              Prefer to talk first?{' '}
              <Link href="/contact" className="font-semibold text-ink underline underline-offset-4 hover:text-accent">
                Send a quick message
              </Link>{' '}
              or email{' '}
              <a href={`mailto:${SITE_CONFIG.supportEmail}`} className="font-semibold text-ink underline underline-offset-4 hover:text-accent">
                {SITE_CONFIG.supportEmail}
              </a>
              .
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

/* ---------- step 1: big project-type cards ---------- */

function ProjectTypePicker({ value, error, onPick }: { value: string; error?: string; onPick: (v: string) => void }) {
  return (
    <fieldset id="q-projectType">
      <legend className="sr-only">Type of project</legend>
      <div className="grid gap-3 sm:grid-cols-2">
        {PROJECT_TYPES.map((p) => {
          const selected = value === p.value;
          return (
            <button
              key={p.value}
              type="button"
              aria-pressed={selected}
              onClick={() => onPick(p.value)}
              className={`group flex min-h-20 cursor-pointer items-center justify-between gap-3 rounded-control border p-4 text-left transition-colors ${
                selected ? 'border-accent bg-accent-wash' : 'border-line-strong bg-paper hover:border-accent'
              }`}
            >
              <span>
                <strong className="block text-body font-semibold text-ink">{p.label}</strong>
                <span className="mt-0.5 block text-body-sm text-ink-mute">{p.hint}</span>
              </span>
              {selected ? (
                <Check aria-hidden className="h-5 w-5 shrink-0 text-accent" />
              ) : (
                <ArrowRight aria-hidden className="h-4 w-4 shrink-0 text-ink-mute transition-transform group-hover:translate-x-1 group-hover:text-accent" />
              )}
            </button>
          );
        })}
      </div>
      {error && (
        <p role="alert" className="mt-2 text-body-sm text-danger">
          {error}
        </p>
      )}
    </fieldset>
  );
}

/* ---------- generic question renderer ---------- */

function QuestionField({
  q,
  answers,
  error,
  onChange,
  onToggle,
}: {
  q: Question;
  answers: Answers;
  error?: string;
  onChange: (id: string, value: string) => void;
  onToggle: (id: string, value: string) => void;
}) {
  const id = `q-${q.id}`;
  const errorId = `${id}-error`;
  const label = (
    <>
      {q.label}
      {q.required && <span className="text-danger"> *</span>}
    </>
  );
  const help = q.help && <p className="text-body-sm text-ink-mute">{q.help}</p>;
  const errorEl = error && (
    <p id={errorId} role="alert" className="text-body-sm text-danger">
      {error}
    </p>
  );

  // Chips (single or multi choice)
  if ((q.kind === 'single' && !q.dropdown) || q.kind === 'multi') {
    const multi = q.kind === 'multi';
    const selected = multi ? list(answers, q.id) : [val(answers, q.id)];
    return (
      <fieldset id={id} className="flex flex-col gap-2.5" aria-describedby={error ? errorId : undefined}>
        <legend className="mb-1 text-label font-semibold text-ink">{label}</legend>
        {help}
        <div className="flex flex-wrap gap-2">
          {q.options!.map((o) => (
            <label key={o.value}>
              <input
                type={multi ? 'checkbox' : 'radio'}
                name={q.id}
                value={o.value}
                checked={selected.includes(o.value)}
                onChange={() => (multi ? onToggle(q.id, o.value) : onChange(q.id, o.value))}
                className="peer sr-only"
              />
              <span className={chipClass}>
                {multi && selected.includes(o.value) && <Check aria-hidden className="h-3.5 w-3.5" />}
                {o.label}
              </span>
            </label>
          ))}
        </div>
        {errorEl}
      </fieldset>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-label font-semibold text-ink">
        {label}
      </label>
      {help}
      {q.kind === 'single' ? (
        <select
          id={id}
          value={val(answers, q.id)}
          onChange={(e) => onChange(q.id, e.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={fieldClass(!!error)}
        >
          <option value="">Select…</option>
          {q.options!.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      ) : q.kind === 'textarea' ? (
        <textarea
          id={id}
          rows={5}
          maxLength={q.maxLength}
          value={val(answers, q.id)}
          placeholder={q.placeholder}
          onChange={(e) => onChange(q.id, e.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={`${fieldClass(!!error)} resize-y`}
        />
      ) : (
        <input
          id={id}
          type={q.kind === 'email' ? 'email' : q.kind === 'tel' ? 'tel' : 'text'}
          autoComplete={
            q.id === 'name' ? 'name' : q.kind === 'email' ? 'email' : q.kind === 'tel' ? 'tel' : q.id === 'business' ? 'organization' : 'off'
          }
          inputMode={q.kind === 'tel' ? 'tel' : undefined}
          maxLength={q.maxLength ?? 500}
          value={val(answers, q.id)}
          placeholder={q.placeholder}
          onChange={(e) => onChange(q.id, e.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={fieldClass(!!error)}
        />
      )}
      {errorEl}
    </div>
  );
}
