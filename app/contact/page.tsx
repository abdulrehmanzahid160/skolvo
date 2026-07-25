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
    <div className="relative py-12 sm:py-20 overflow-hidden">
      {/* Ambient background blob */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-[#6D5CFB]/15 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#6D5CFB]/10 border border-[#6D5CFB]/30 rounded-full text-xs font-bold text-[#8A7DFF] uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5" />
            Get In Touch
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-white tracking-tight">
            Contact & Demo Inquiries for <span className="text-gradient">Skolvo</span>
          </h1>

          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            Have questions about CampusNova, custom institutional features, or partnership opportunities? Reach out to our team directly.
          </p>
        </div>

        {/* Grid: Form + Info Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          {/* Left: Contact Form Card */}
          <div className="lg:col-span-7 p-6 sm:p-10 rounded-3xl bg-[#131322] border border-white/10 shadow-2xl relative overflow-hidden">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-xl font-bold font-display text-white mb-2">
                  Send Us a Message
                </h3>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
                    Your Full Name <span className="text-[#FF6B4A]">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Dr. Tariq Mahmood"
                      className="w-full pl-10 pr-4 py-3 bg-[#0B0B14] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#6D5CFB] text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
                    Work Email Address <span className="text-[#FF6B4A]">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="tariq@apexacademy.com"
                      className="w-full pl-10 pr-4 py-3 bg-[#0B0B14] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#6D5CFB] text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
                    Academy / School / Business Name
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      value={formData.academyName}
                      onChange={(e) => setFormData({ ...formData, academyName: e.target.value })}
                      placeholder="Apex Coaching Institute"
                      className="w-full pl-10 pr-4 py-3 bg-[#0B0B14] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#6D5CFB] text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
                    How Can We Help You? <span className="text-[#FF6B4A]">*</span>
                  </label>
                  <div className="relative">
                    <MessageSquare className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="I would like to inquire about early access demo for our 300-student academy..."
                      className="w-full pl-10 pr-4 py-3 bg-[#0B0B14] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#6D5CFB] text-sm resize-none"
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-xs text-red-400 bg-red-950/30 border border-red-800/40 p-2.5 rounded-lg">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 bg-gradient-to-r from-[#6D5CFB] to-[#FF6B4A] hover:from-[#8A7DFF] hover:to-[#FF856B] text-white font-bold rounded-xl shadow-lg shadow-[#6D5CFB]/25 flex items-center justify-center gap-2 transition-all text-sm"
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
                <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/50 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold font-display text-white">
                  Message Successfully Sent!
                </h3>
                <p className="text-gray-300 text-sm max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out to Skolvo. Our team will review your inquiry and respond to <strong className="text-white">{formData.email}</strong> shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', academyName: '', message: '' });
                  }}
                  className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl text-xs transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            )}
          </div>

          {/* Right: Info Card */}
          <div className="lg:col-span-5 space-y-6">
            {/* Support Box */}
            <div className="p-6 rounded-3xl bg-[#131322] border border-white/10 space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Direct Corporate Support
              </h4>

              <div className="space-y-3">
                <a
                  href="mailto:support@skolvo.online"
                  className="flex items-center gap-3 p-3 bg-[#0B0B14] rounded-xl border border-white/5 hover:border-[#6D5CFB] text-white transition-all group"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#6D5CFB]/20 border border-[#6D5CFB]/40 flex items-center justify-center text-[#8A7DFF] group-hover:scale-110 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-gray-400">Support Email</span>
                    <strong className="text-xs text-white">support@skolvo.online</strong>
                  </div>
                </a>

                <div className="p-3 bg-[#0B0B14] rounded-xl border border-white/5 space-y-1">
                  <span className="block text-[10px] text-gray-400">Official Domain</span>
                  <span className="text-xs font-mono text-[#8A7DFF]">skolvo.online</span>
                </div>
              </div>
            </div>

            {/* Social Links Box */}
            <div className="p-6 rounded-3xl bg-[#131322] border border-white/10 space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Connect On Social Media
              </h4>

              <div className="grid grid-cols-3 gap-3">
                <a
                  href="#"
                  className="p-3 bg-[#0B0B14] border border-white/5 rounded-xl flex flex-col items-center justify-center gap-1.5 text-gray-400 hover:text-white hover:border-[#6D5CFB] transition-all group"
                >
                  <Linkedin className="w-5 h-5 text-[#8A7DFF] group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] font-medium">LinkedIn</span>
                </a>

                <a
                  href="#"
                  className="p-3 bg-[#0B0B14] border border-white/5 rounded-xl flex flex-col items-center justify-center gap-1.5 text-gray-400 hover:text-white hover:border-[#6D5CFB] transition-all group"
                >
                  <Twitter className="w-5 h-5 text-[#FF6B4A] group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] font-medium">Twitter / X</span>
                </a>

                <a
                  href="#"
                  className="p-3 bg-[#0B0B14] border border-white/5 rounded-xl flex flex-col items-center justify-center gap-1.5 text-gray-400 hover:text-white hover:border-[#6D5CFB] transition-all group"
                >
                  <Instagram className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] font-medium">Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
