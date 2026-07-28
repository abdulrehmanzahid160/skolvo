'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle2, Linkedin, Sparkles, Building2, User, MessageSquare, Loader2 } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    academyName: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setError('');

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
        setError(data.message || 'Error sending message. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative py-12 sm:py-20 overflow-hidden bg-[#EDF1EE] text-[#101C18]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0F7A5F]/10 border border-[#0F7A5F]/30 rounded-full text-xs font-bold text-[#0F7A5F] uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5" />
            Get In Touch
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-[#101C18] tracking-tight">
            Contact & Demo Inquiries for <span className="text-[#0F7A5F]">Skolvo</span>
          </h1>

          <p className="text-neutral-600 text-base sm:text-lg leading-relaxed font-medium">
            Have questions about CampusNova, custom institutional features, or partnership opportunities? Reach out to our team directly.
          </p>
        </div>

        {/* Grid: Form + Info Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          {/* Left: Contact Form Card */}
          <div className="lg:col-span-7 p-6 sm:p-10 rounded-3xl bg-white border border-neutral-200 shadow-xl relative overflow-hidden text-[#101C18]">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-xl font-extrabold font-display text-[#101C18] mb-2">
                  Send Us a Message
                </h3>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Your Full Name <span className="text-[#0F7A5F]">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Dr. Tariq Mahmood"
                      className="w-full pl-10 pr-4 py-3 bg-[#EDF1EE] border border-neutral-300 rounded-xl text-[#101C18] placeholder-neutral-400 focus:outline-none focus:border-[#101C18] text-sm font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Work Email Address <span className="text-[#0F7A5F]">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="tariq@apexacademy.com"
                      className="w-full pl-10 pr-4 py-3 bg-[#EDF1EE] border border-neutral-300 rounded-xl text-[#101C18] placeholder-neutral-400 focus:outline-none focus:border-[#101C18] text-sm font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Academy / School / Business Name
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      value={formData.academyName}
                      onChange={(e) => setFormData({ ...formData, academyName: e.target.value })}
                      placeholder="Apex Coaching Institute"
                      className="w-full pl-10 pr-4 py-3 bg-[#EDF1EE] border border-neutral-300 rounded-xl text-[#101C18] placeholder-neutral-400 focus:outline-none focus:border-[#101C18] text-sm font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                    How Can We Help You? <span className="text-[#0F7A5F]">*</span>
                  </label>
                  <div className="relative">
                    <MessageSquare className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="I would like to inquire about early access demo for our 300-student academy..."
                      className="w-full pl-10 pr-4 py-3 bg-[#EDF1EE] border border-neutral-300 rounded-xl text-[#101C18] placeholder-neutral-400 focus:outline-none focus:border-[#101C18] text-sm font-medium resize-none"
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-xs text-red-600 bg-red-50 border border-red-200 p-2.5 rounded-lg font-medium">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 bg-[#101C18] hover:bg-black text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition-all text-sm"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting Message...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-[#E4F1EC] border border-[#B5D8CB] rounded-full flex items-center justify-center mx-auto text-[#0F7A5F]">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold font-display text-[#101C18]">
                  Message Successfully Sent!
                </h3>
                <p className="text-neutral-600 text-sm max-w-sm mx-auto leading-relaxed font-medium">
                  Thank you for reaching out to Skolvo. Our team will review your inquiry and respond to <strong className="text-[#101C18]">{formData.email}</strong> shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', academyName: '', message: '' });
                  }}
                  className="px-6 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-[#101C18] font-bold rounded-xl text-xs transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            )}
          </div>

          {/* Right: Info Card */}
          <div className="lg:col-span-5 space-y-6">
            {/* Support Box */}
            <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-xl space-y-4 text-[#101C18]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                Direct Corporate Support
              </h4>

              <div className="space-y-3">
                <a
                  href="mailto:support@skolvo.online"
                  className="flex items-center gap-3 p-3 bg-[#E2E9E4] rounded-xl border border-neutral-200 hover:border-[#101C18] text-[#101C18] transition-all group"
                >
                  <div className="w-9 h-9 rounded-lg bg-white border border-neutral-200 flex items-center justify-center text-[#E0A21B] group-hover:scale-105 transition-transform shadow-2xs">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-neutral-500 font-medium">Support Email</span>
                    <strong className="text-xs text-[#101C18]">support@skolvo.online</strong>
                  </div>
                </a>

                <div className="p-3 bg-[#E2E9E4] rounded-xl border border-neutral-200 space-y-1">
                  <span className="block text-[10px] text-neutral-500 font-medium">Official Domain</span>
                  <span className="text-xs font-mono text-[#0F7A5F] font-bold">skolvo.online</span>
                </div>
              </div>
            </div>

            {/* Social Links Box */}
            <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-xl space-y-4 text-[#101C18]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                Where To Find Us
              </h4>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href="https://www.linkedin.com/company/skolvo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#E2E9E4] border border-neutral-200 rounded-xl flex flex-col items-center justify-center gap-1.5 text-neutral-600 hover:text-[#101C18] hover:border-[#0F7A5F]/40 transition-all group shadow-2xs"
                >
                  <Linkedin className="w-5 h-5 text-[#0F7A5F] group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] font-bold">LinkedIn</span>
                </a>

                <a
                  href="mailto:support@skolvo.online"
                  className="p-3 bg-[#E2E9E4] border border-neutral-200 rounded-xl flex flex-col items-center justify-center gap-1.5 text-neutral-600 hover:text-[#101C18] hover:border-[#0F7A5F]/40 transition-all group shadow-2xs"
                >
                  <Mail className="w-5 h-5 text-[#E0A21B] group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] font-bold">Email</span>
                </a>
              </div>

              <p className="text-[11px] leading-relaxed text-neutral-500">
                We don&apos;t run a Twitter or Instagram account yet. When we do, they&apos;ll appear
                here — we&apos;d rather show two links that work than five that don&apos;t.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
