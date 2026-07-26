'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle2, Linkedin, Twitter, Instagram, Sparkles, Building2, User, MessageSquare, Loader2 } from 'lucide-react';

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
    <div className="relative py-12 sm:py-20 overflow-hidden bg-[#FDF6F0] text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E6357F]/10 border border-[#E6357F]/30 rounded-full text-xs font-bold text-[#E6357F] uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5" />
            Get In Touch
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-[#1A1A1A] tracking-tight">
            Contact & Demo Inquiries for <span className="text-[#E6357F]">Skolvo</span>
          </h1>

          <p className="text-neutral-600 text-base sm:text-lg leading-relaxed font-medium">
            Have questions about CampusNova, custom institutional features, or partnership opportunities? Reach out to our team directly.
          </p>
        </div>

        {/* Grid: Form + Info Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          {/* Left: Contact Form Card */}
          <div className="lg:col-span-7 p-6 sm:p-10 rounded-3xl bg-white border border-neutral-200 shadow-xl relative overflow-hidden text-[#1A1A1A]">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-xl font-extrabold font-display text-[#1A1A1A] mb-2">
                  Send Us a Message
                </h3>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Your Full Name <span className="text-[#E6357F]">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Dr. Tariq Mahmood"
                      className="w-full pl-10 pr-4 py-3 bg-[#FDF6F0] border border-neutral-300 rounded-xl text-[#1A1A1A] placeholder-neutral-400 focus:outline-none focus:border-[#1A1A1A] text-sm font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Work Email Address <span className="text-[#E6357F]">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="tariq@apexacademy.com"
                      className="w-full pl-10 pr-4 py-3 bg-[#FDF6F0] border border-neutral-300 rounded-xl text-[#1A1A1A] placeholder-neutral-400 focus:outline-none focus:border-[#1A1A1A] text-sm font-medium"
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
                      className="w-full pl-10 pr-4 py-3 bg-[#FDF6F0] border border-neutral-300 rounded-xl text-[#1A1A1A] placeholder-neutral-400 focus:outline-none focus:border-[#1A1A1A] text-sm font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                    How Can We Help You? <span className="text-[#E6357F]">*</span>
                  </label>
                  <div className="relative">
                    <MessageSquare className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="I would like to inquire about early access demo for our 300-student academy..."
                      className="w-full pl-10 pr-4 py-3 bg-[#FDF6F0] border border-neutral-300 rounded-xl text-[#1A1A1A] placeholder-neutral-400 focus:outline-none focus:border-[#1A1A1A] text-sm font-medium resize-none"
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
                  className="w-full py-3.5 px-6 bg-[#1A1A1A] hover:bg-black text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition-all text-sm"
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
                <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold font-display text-[#1A1A1A]">
                  Message Successfully Sent!
                </h3>
                <p className="text-neutral-600 text-sm max-w-sm mx-auto leading-relaxed font-medium">
                  Thank you for reaching out to Skolvo. Our team will review your inquiry and respond to <strong className="text-[#1A1A1A]">{formData.email}</strong> shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', academyName: '', message: '' });
                  }}
                  className="px-6 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-[#1A1A1A] font-bold rounded-xl text-xs transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            )}
          </div>

          {/* Right: Info Card */}
          <div className="lg:col-span-5 space-y-6">
            {/* Support Box */}
            <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-xl space-y-4 text-[#1A1A1A]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                Direct Corporate Support
              </h4>

              <div className="space-y-3">
                <a
                  href="mailto:support@skolvo.online"
                  className="flex items-center gap-3 p-3 bg-[#FAF4F0] rounded-xl border border-neutral-200 hover:border-[#1A1A1A] text-[#1A1A1A] transition-all group"
                >
                  <div className="w-9 h-9 rounded-lg bg-white border border-neutral-200 flex items-center justify-center text-[#E8622C] group-hover:scale-105 transition-transform shadow-2xs">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-neutral-500 font-medium">Support Email</span>
                    <strong className="text-xs text-[#1A1A1A]">support@skolvo.online</strong>
                  </div>
                </a>

                <div className="p-3 bg-[#FAF4F0] rounded-xl border border-neutral-200 space-y-1">
                  <span className="block text-[10px] text-neutral-500 font-medium">Official Domain</span>
                  <span className="text-xs font-mono text-[#E6357F] font-bold">skolvo.online</span>
                </div>
              </div>
            </div>

            {/* Social Links Box */}
            <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-xl space-y-4 text-[#1A1A1A]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                Connect On Social Media
              </h4>

              <div className="grid grid-cols-3 gap-3">
                <a
                  href="#"
                  className="p-3 bg-[#FAF4F0] border border-neutral-200 rounded-xl flex flex-col items-center justify-center gap-1.5 text-neutral-600 hover:text-[#1A1A1A] hover:border-neutral-300 transition-all group shadow-2xs"
                >
                  <Linkedin className="w-5 h-5 text-[#E6357F] group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] font-bold">LinkedIn</span>
                </a>

                <a
                  href="#"
                  className="p-3 bg-[#FAF4F0] border border-neutral-200 rounded-xl flex flex-col items-center justify-center gap-1.5 text-neutral-600 hover:text-[#1A1A1A] hover:border-neutral-300 transition-all group shadow-2xs"
                >
                  <Twitter className="w-5 h-5 text-[#E8622C] group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] font-bold">Twitter / X</span>
                </a>

                <a
                  href="#"
                  className="p-3 bg-[#FAF4F0] border border-neutral-200 rounded-xl flex flex-col items-center justify-center gap-1.5 text-neutral-600 hover:text-[#1A1A1A] hover:border-neutral-300 transition-all group shadow-2xs"
                >
                  <Instagram className="w-5 h-5 text-emerald-600 group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] font-bold">Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
