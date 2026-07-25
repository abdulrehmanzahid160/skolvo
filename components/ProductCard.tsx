'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, CheckCircle2, Lock, ShieldCheck, Cpu } from 'lucide-react';
import WaitlistModal from './WaitlistModal';

export interface ProductFeature {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  tag?: string;
}

export interface ProductCardProps {
  id: string;
  name: string;
  tagline: string;
  oneLiner: string;
  statusBadge: string;
  statusType?: 'coming_soon' | 'live' | 'ideation';
  features: ProductFeature[];
  interactiveMockup: React.ReactNode;
  primaryCtaText?: string;
}

export default function ProductCard({
  id,
  name,
  tagline,
  oneLiner,
  statusBadge,
  statusType = 'coming_soon',
  features,
  interactiveMockup,
  primaryCtaText = 'Join Waitlist for Early Access',
}: ProductCardProps) {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id={id} className="relative py-16 sm:py-24 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-tr from-[#6D5CFB]/15 via-transparent to-[#FF6B4A]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Card Frame */}
        <div className="relative rounded-3xl bg-[#131322]/80 border border-white/10 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl overflow-hidden">
          {/* Top Product Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/10">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#6D5CFB]/20 border border-[#6D5CFB]/40 text-[#8A7DFF] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  {statusBadge}
                </span>
                <span className="text-xs text-gray-400 font-mono">Flagship Product #01</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white tracking-tight">
                {name}
              </h2>
              <p className="text-base sm:text-lg text-gray-300 mt-2 max-w-2xl font-medium">
                {oneLiner}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsWaitlistOpen(true)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-gradient-to-r from-[#6D5CFB] to-[#FF6B4A] text-white text-sm font-semibold shadow-xl shadow-[#6D5CFB]/30 hover:shadow-[#FF6B4A]/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
              >
                {primaryCtaText}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Grid Layout: Interactive Mockup + Feature Cards */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Interactive Mockup Frame */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative group">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#6D5CFB] via-[#8A7DFF] to-[#FF6B4A] opacity-30 blur group-hover:opacity-50 transition duration-500" />
                <div className="relative">{interactiveMockup}</div>
              </div>
            </div>

            {/* Right: Feature Highlights Grid */}
            <div className="lg:col-span-5 space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                Core Innovations
              </h3>

              {features.map((feature, idx) => {
                const IconComponent = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-4 rounded-2xl bg-[#0B0B14]/80 border border-white/10 hover:border-[#6D5CFB]/50 transition-all group hover:bg-[#1A1A2E]/60"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded-xl bg-[#6D5CFB]/15 border border-[#6D5CFB]/30 flex items-center justify-center text-[#8A7DFF] group-hover:scale-110 group-hover:text-white transition-all shrink-0 mt-0.5">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-white group-hover:text-[#8A7DFF] transition-colors">
                            {feature.title}
                          </h4>
                          {feature.tag && (
                            <span className="text-[10px] px-2 py-0.5 bg-white/5 border border-white/10 rounded-full text-gray-300">
                              {feature.tag}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <WaitlistModal
        isOpen={isWaitlistOpen}
        onClose={() => setIsWaitlistOpen(false)}
        defaultProduct={name}
      />
    </section>
  );
}
