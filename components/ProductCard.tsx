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

  return (
    <section id={id} className="relative py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Card Frame */}
        <div className="relative rounded-3xl bg-white border border-neutral-200/90 p-6 sm:p-10 shadow-xl overflow-hidden">
          {/* Top Product Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-neutral-200">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#E6357F]/10 border border-[#E6357F]/30 text-[#E6357F] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  {statusBadge}
                </span>
                <span className="text-xs text-neutral-500 font-mono">Flagship Product #01</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#1A1A1A] tracking-tight">
                {name}
              </h2>
              <p className="text-base sm:text-lg text-neutral-600 mt-2 max-w-2xl font-medium leading-relaxed">
                {oneLiner}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsWaitlistOpen(true)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#1A1A1A] hover:bg-black text-white text-sm font-bold shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
              >
                {primaryCtaText}
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Grid Layout: Interactive Mockup + Feature Cards */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Interactive Mockup Frame */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative group rounded-2xl shadow-md border border-neutral-200/80 bg-[#FAF4F0] p-2">
                <div className="relative">{interactiveMockup}</div>
              </div>
            </div>

            {/* Right: Feature Highlights Grid */}
            <div className="lg:col-span-5 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
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
                    className="p-4 rounded-2xl bg-[#FAF4F0] border border-neutral-200/80 hover:border-[#E6357F]/50 transition-all group hover:bg-white hover:shadow-md"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-[#E6357F] group-hover:scale-105 transition-all shrink-0 mt-0.5 shadow-xs">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-[#1A1A1A] group-hover:text-[#E6357F] transition-colors">
                            {feature.title}
                          </h4>
                          {feature.tag && (
                            <span className="text-[10px] px-2 py-0.5 bg-white border border-neutral-200 rounded-full text-neutral-600 font-semibold shadow-2xs">
                              {feature.tag}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
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
