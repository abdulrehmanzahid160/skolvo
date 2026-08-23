'use client';

import React, { useCallback, useRef, useState } from 'react';
import { CheckCircle2, Linkedin, Loader2, Mail, Send } from 'lucide-react';
import { Reveal } from '@/components/motion/Primitives';

/* ============================================================
   CONTACT

   The network contract is unchanged: POST /api/contact with
   { name, email, academyName, message }. Field names are
   untouched so any downstream tracking keeps working.

   What changed is the form itself:
     - every input has a real <label for> bound to an id
     - validation runs on blur, not on keystroke, and the message
       says how to fix the problem rather than just "invalid"
     - errors sit below their field and are announced via
       role="alert", with the first invalid field taking focus
       after a failed submit
     - inputs are 44px tall so they are reliably tappable
   ============================================================ */

type Field = 'name' | 'email' | 'message';

const REQUIRED_LABEL: Record<Field, string> = {
  name: 'your name',
  email: 'your email address',
  message: 'a message',
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    academyName: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const refs = {
    name: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    message: useRef<HTMLTextAreaElement>(null),
  };

  const validate = useCallback((field: Field, value: string): string | undefined => {
    if (!value.trim()) return `Enter ${REQUIRED_LABEL[field]}.`;
    if (field === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'Enter an email address like name@example.com.';
    }
    return undefined;
  }, []);

  // Validate on blur rather than on change: flagging an email as malformed
  // while it is still being typed is noise, not help.
  const handleBlur = (field: Field) => {
    const message = validate(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: message }));
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear an existing error as soon as the field becomes valid, so the
    // correction is acknowledged immediately.
    if (field !== 'academyName' && errors[field]) {
      const message = validate(field, value);
      if (!message) setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const next: Partial<Record<Field, string>> = {};
    (['name', 'email', 'message'] as Field[]).forEach((f) => {
      const message = validate(f, formData[f]);
      if (message) next[f] = message;
    });
    setErrors(next);

    const firstInvalid = (['name', 'email', 'message'] as Field[]).find((f) => next[f]);
    if (firstInvalid) {
      refs[firstInvalid].current?.focus();
      return;
    }

    setLoading(true);
    setFormError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setFormError(data.message || 'That did not send. Try again in a moment.');
      }
    } catch {
      setFormError('No connection. Check your network and try again.');
    } finally {
      setLoading(false);
    }
  };

  const fieldClass = (hasError?: boolean) =>
    `w-full min-h-11 rounded-control border bg-paper px-4 py-3 text-body-sm text-ink placeholder:text-ink-mute transition-colors focus:outline-none ${
      hasError ? 'border-danger focus:border-danger' : 'border-line-strong focus:border-accent'
    }`;

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="studio-shell">
          <Reveal>
            <div className="studio-eyebrow studio-eyebrow--light"><span>SKOLVO / CONTACT</span><span>DIRECT TO THE STUDIO</span></div>
            <h1>Bring us the<br /><i>difficult</i> part.</h1>
            <p>Questions about the products, the architecture, or a workflow we should understand. Messages go to the studio inbox.</p>
          </Reveal>
        </div>
      </section>

      <section className="contact-body">
        <div className="mx-auto max-w-5xl px-4 py-[var(--section-y)] sm:px-6 lg:px-8">
          <div className="grid items-start gap-8 lg:grid-cols-12">
            {/* Form */}
            <Reveal className="lg:col-span-7">
              <div className="rounded-card border border-line bg-surface p-6 sm:p-9">
                {!submitted ? (
                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    <h2 className="font-display text-title text-ink">Send a message</h2>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="contact-name" className="text-label font-semibold text-ink">
                        Your name <span className="text-danger">*</span>
                      </label>
                      <input
                        ref={refs.name}
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        aria-invalid={errors.name ? true : undefined}
                        aria-describedby={errors.name ? 'contact-name-error' : undefined}
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        onBlur={() => handleBlur('name')}
                        placeholder="Tariq Mahmood"
                        className={fieldClass(!!errors.name)}
                      />
                      {errors.name && (
                        <p
                          id="contact-name-error"
                          role="alert"
                          className="text-body-sm text-danger"
                        >
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="contact-email" className="text-label font-semibold text-ink">
                        Email address <span className="text-danger">*</span>
                      </label>
                      <input
                        ref={refs.email}
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        aria-invalid={errors.email ? true : undefined}
                        aria-describedby={errors.email ? 'contact-email-error' : undefined}
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        onBlur={() => handleBlur('email')}
                        placeholder="tariq@apexacademy.com"
                        className={fieldClass(!!errors.email)}
                      />
                      {errors.email && (
                        <p
                          id="contact-email-error"
                          role="alert"
                          className="text-body-sm text-danger"
                        >
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="contact-academy"
                        className="text-label font-semibold text-ink"
                      >
                        Academy, school, or company
                      </label>
                      <input
                        id="contact-academy"
                        name="academyName"
                        type="text"
                        autoComplete="organization"
                        value={formData.academyName}
                        onChange={(e) => handleChange('academyName', e.target.value)}
                        placeholder="Apex Coaching Institute"
                        className={fieldClass(false)}
                      />
                      <p className="text-body-sm text-ink-mute">Optional.</p>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="contact-message"
                        className="text-label font-semibold text-ink"
                      >
                        How can we help? <span className="text-danger">*</span>
                      </label>
                      <textarea
                        ref={refs.message}
                        id="contact-message"
                        name="message"
                        rows={5}
                        required
                        aria-invalid={errors.message ? true : undefined}
                        aria-describedby={errors.message ? 'contact-message-error' : undefined}
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        onBlur={() => handleBlur('message')}
                        placeholder="We run a 300-student academy and want to see the attendance demo."
                        className={`${fieldClass(!!errors.message)} resize-y`}
                      />
                      {errors.message && (
                        <p
                          id="contact-message-error"
                          role="alert"
                          className="text-body-sm text-danger"
                        >
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {formError && (
                      <p
                        role="alert"
                        className="rounded-control border border-danger/25 bg-danger-wash px-3 py-2.5 text-body-sm text-danger"
                      >
                        {formError}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-ink px-6 text-body-sm font-semibold text-white shadow-[var(--shadow-md)] transition-colors hover:bg-[#0a130f] disabled:pointer-events-none disabled:opacity-60"
                    >
                      {loading ? (
                        <>
                          <Loader2 aria-hidden className="h-4 w-4 animate-spin" />
                          Sending
                        </>
                      ) : (
                        <>
                          Send message
                          <Send aria-hidden className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <div className="py-10 text-center">
                    <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-accent-line bg-accent-wash text-accent">
                      <CheckCircle2 aria-hidden className="h-7 w-7" />
                    </span>
                    <h2 className="font-display text-title text-ink">Message sent</h2>
                    <p className="prose-measure mx-auto mt-3 text-body-sm text-ink-soft">
                      We will reply to{' '}
                      <strong className="font-semibold text-ink">{formData.email}</strong>.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', email: '', academyName: '', message: '' });
                        setErrors({});
                      }}
                      className="mt-6 min-h-11 cursor-pointer rounded-full border border-line-strong bg-surface px-6 text-body-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent-hover"
                    >
                      Send another message
                    </button>
                  </div>
                )}
              </div>
            </Reveal>

            {/* Direct routes */}
            <Reveal delay={0.1} className="lg:col-span-5">
              <div className="rounded-card border border-line bg-surface p-6">
                <h2 className="text-label font-semibold text-ink">Reach us directly</h2>

                <a
                  href="mailto:support@skolvo.online"
                  className="mt-4 flex min-h-14 items-center gap-3 rounded-control border border-line bg-paper px-4 transition-colors hover:border-accent"
                >
                  <Mail aria-hidden className="h-4 w-4 shrink-0 text-accent" />
                  <span className="min-w-0">
                    <span className="block text-body-sm font-semibold text-ink">
                      support@skolvo.online
                    </span>
                    <span className="block text-body-sm text-ink-mute">Support and enquiries</span>
                  </span>
                </a>

                <a
                  href="https://www.linkedin.com/company/skolvo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex min-h-14 items-center gap-3 rounded-control border border-line bg-paper px-4 transition-colors hover:border-accent"
                >
                  <Linkedin aria-hidden className="h-4 w-4 shrink-0 text-accent" />
                  <span className="min-w-0">
                    <span className="block text-body-sm font-semibold text-ink">LinkedIn</span>
                    <span className="block text-body-sm text-ink-mute">Company updates</span>
                  </span>
                </a>

                <p className="mt-5 border-t border-line pt-4 text-body-sm text-ink-mute">
                  Those are the only two channels we run. We would rather show two that work than
                  five that do not.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
