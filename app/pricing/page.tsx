'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  Sparkles,
  HelpCircle,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Zap,
  Bot,
  ScanFace,
  MessageSquare,
  DollarSign,
} from 'lucide-react';
import WaitlistModal from '@/components/WaitlistModal';

export default function PricingPage() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState('Premium');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const pricingTiers = [
    {
      name: 'Free',
      tagline: 'Essential tracking for small coaching centers and tutors',
      price: 'Early Access $0',
      badge: 'Free Tier',
      popular: false,
      features: [
        'Fee collection tracking & ledger',
        'Automatic WhatsApp fee reminders (personalized per student)',
        'Mass SMS reminders with individual student details',
        'Standard student & parent contact directory',
        'Up to 100 active student profiles',
      ],
      ctaText: 'Join Free Waitlist',
    },
    {
      name: 'Premium',
      tagline: 'Comprehensive facial attendance & custom academy branding',
      price: 'Early Access Discount',
      badge: 'Most Popular',
      popular: true,
      features: [
        'Everything included in Free tier',
        'Touchless Facial Recognition Attendance Engine',
        '100% On-Device liveness verification (no cloud photos)',
        'Customized academy logo, header & branded digital receipts',
        'Multi-role access (Owner, Admin, Teacher, Custom roles)',
        'Up to 500 active student profiles',
      ],
      ctaText: 'Join Premium Waitlist',
    },
    {
      name: 'Premium Plus',
      tagline: 'Full autonomous AI assistant for complete academy automation',
      price: 'Early Access Exclusive',
      badge: 'Autonomous AI',
      popular: false,
      features: [
        'Everything included in Premium tier',
        '24/7 AI Chatbot Assistant for parent inquiries',
        'Autonomous fee marking in academy ledger upon receipt',
        'Autonomous email & WhatsApp dispatch on academy behalf',
        'Unlimited active student & staff profiles',
        'Priority technical support & custom onboarding',
      ],
      ctaText: 'Join Premium Plus Waitlist',
    },
  ];

  const faqs = [
    {
      question: 'Is CampusNova currently available for immediate purchase?',
      answer:
        'CampusNova is currently in active private development and preparing for initial invite-only launch. By joining the waitlist today, you will secure early priority access and locked-in early tier pricing prior to public release.',
    },
    {
      question: 'How does the facial recognition liveness detection protect student privacy?',
      answer:
        'Our biometric engine operates entirely on-device (100% client-side vectorization). Raw photographs are never stored on cloud servers. Facial enrollment requires explicit signed parental consent.',
    },
    {
      question: 'How do personalized WhatsApp and SMS reminders work?',
      answer:
        'Unlike generic broadcast messages, CampusNova dynamically populates recipient variables including student name, parent name, academy branding, and exact outstanding balance into every message sent in 1-click.',
    },
    {
      question: 'What is the role-gated access control system?',
      answer:
        'CampusNova does not allow open self-registration. Access is strictly invite-only. Academy Owners can issue secure single-use token links via WhatsApp or Email for Owners, Admins, Teachers, or custom combo roles.',
    },
    {
      question: 'Can the AI Chatbot autonomously update payment records?',
      answer:
        'On the Premium Plus tier, the AI chatbot is configured with controlled permissions to parse verified parent payment proofs, autonomously log fee statuses into your ledger, and dispatch digital receipts.',
    },
  ];

  return (
    <div className="relative py-12 sm:py-20 overflow-hidden bg-[#FDF6F0] text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E6357F]/10 border border-[#E6357F]/30 rounded-full text-xs font-bold text-[#E6357F] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Transparent Early Pricing
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-[#1A1A1A] tracking-tight">
            Simple, Transparent Tiers for <span className="text-[#E6357F]">CampusNova</span>
          </h1>

          <p className="text-neutral-600 text-base sm:text-lg leading-relaxed font-medium">
            Choose the tier tailored to your institution size. Join the early access waitlist to lock in launch discounts.
          </p>

          <div className="p-3 bg-[#FAF4F0] border border-amber-300 rounded-xl text-amber-900 text-xs font-semibold inline-block shadow-2xs">
            ⚠️ <em>Early access pricing, subject to change before public launch. No credit card required to join waitlist.</em>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                tier.popular
                  ? 'bg-white border-2 border-[#E6357F] shadow-2xl scale-102 lg:-translate-y-2'
                  : 'bg-white border border-neutral-200 shadow-lg hover:border-neutral-300'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#E6357F] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md">
                  {tier.badge}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold font-display text-[#1A1A1A]">{tier.name}</h3>
                  {!tier.popular && (
                    <span className="text-[10px] uppercase font-bold text-[#E6357F] bg-[#E6357F]/10 px-2 py-0.5 rounded-full border border-[#E6357F]/30">
                      {tier.badge}
                    </span>
                  )}
                </div>

                <p className="text-xs text-neutral-500 font-medium mt-2 min-h-[36px]">{tier.tagline}</p>

                <div className="my-6 pb-6 border-b border-neutral-200">
                  <span className="text-xl sm:text-2xl font-extrabold text-[#1A1A1A] font-display">
                    {tier.price}
                  </span>
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-neutral-700 font-medium">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => {
                  setSelectedTier(tier.name);
                  setIsWaitlistOpen(true);
                }}
                className="w-full py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 bg-[#1A1A1A] hover:bg-black text-white"
              >
                {tier.ctaText}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* FAQ Accordion Section */}
        <div className="pt-16 max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-extrabold font-display text-[#1A1A1A]">
              Frequently Asked Questions
            </h2>
            <p className="text-neutral-600 text-sm font-medium">
              Everything you need to know about Skolvo, CampusNova, and waitlist access.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl bg-white border border-neutral-200 shadow-xs overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-5 text-left font-bold text-sm text-[#1A1A1A] flex items-center justify-between gap-4 hover:text-[#E6357F] transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-neutral-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-[#E6357F]' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-5 pb-5 text-xs text-neutral-700 font-medium leading-relaxed border-t border-neutral-100 pt-3"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <WaitlistModal
        isOpen={isWaitlistOpen}
        onClose={() => setIsWaitlistOpen(false)}
        defaultProduct={`CampusNova - ${selectedTier} Tier`}
      />
    </div>
  );
}
