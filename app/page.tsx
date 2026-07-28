'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  Shield,
  Zap,
  Bot,
  ScanFace,
  DollarSign,
  UserCheck,
  Layers,
  Lock,
  MessageSquare,
  CheckCircle2,
  Building2,
  Clock,
  ChevronRight,
  Cpu,
  Award,
  Globe2,
  TrendingUp,
} from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import WaitlistModal from '@/components/WaitlistModal';
import BiometricMockup from '@/components/mockups/BiometricMockup';
import MassCommsMockup from '@/components/mockups/MassCommsMockup';
import FeeTrackingMockup from '@/components/mockups/FeeTrackingMockup';
import AiBotMockup from '@/components/mockups/AiBotMockup';
import LiveHeroPanel from '@/components/hero/LiveHeroPanel';
import {
  ScrollProgressBar,
  Reveal,
  WordReveal,
  Counter,
  TiltCard,
  Marquee,
  AuroraBackdrop,
  GridLines,
} from '@/components/motion/Primitives';

export default function HomePage() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [activeMockupTab, setActiveMockupTab] = useState<'biometrics' | 'comms' | 'fees' | 'ai'>('biometrics');

  const campusNovaFeatures = [
    {
      title: 'Role-Gated Access Control',
      description:
        'Invite-only onboarding with zero open registration. Only the Academy Owner grants access. Token-based invite links for Owner, Admin, Teacher, and Custom roles.',
      icon: UserCheck,
      tag: 'Headline Feature',
    },
    {
      title: '1-Click Personalized Mass SMS & WhatsApp',
      description:
        'Send personalized messages to every parent in one click. Automatically populates recipient names, student details, and custom fee balances.',
      icon: MessageSquare,
      tag: 'Auto Personalization',
    },
    {
      title: '24/7 AI Assistant & Fee Automation',
      description:
        'Always-on AI chatbot handles parent inquiries, updates class schedules, and autonomously logs fee payments and sends receipts on Premium Plus.',
      icon: Bot,
      tag: 'AI Powered',
    },
    {
      title: 'Touchless Facial Biometric Attendance',
      description:
        'High-speed face recognition with passive blink-liveness detection. 100% on-device processing with zero raw facial images stored on cloud servers.',
      icon: ScanFace,
      tag: 'On-Device Privacy',
    },
    {
      title: 'Dynamic Fee Tracking & Graphical Receipts',
      description:
        'Automated fee ledger with instant canvas receipt generation. Trigger automated WhatsApp fee reminders tailored to each individual student.',
      icon: DollarSign,
      tag: 'Financial Suite',
    },
  ];

  const trustedLogos = [
    { name: 'Apex Academy', location: 'Lahore' },
    { name: 'Beaconhouse Group', location: 'Network' },
    { name: 'Roots International', location: 'Islamabad' },
    { name: 'KIPS Prep Institute', location: 'Punjab' },
    { name: 'City School System', location: 'National' },
  ];

  return (
    <div className="relative overflow-hidden bg-[#FDF6F0] text-[#1A1A1A]">
      <ScrollProgressBar />

      {/* ============================================================ */}
      {/* 1. HERO SECTION */}
      {/* ============================================================ */}
      <section className="relative min-h-[92vh] flex items-center pt-10 pb-20 overflow-hidden">
        <AuroraBackdrop />
        <GridLines />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left: copy */}
            <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
              {/* Top Pill Badge */}
              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="shimmer-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 border border-[#E6357F]/25 shadow-sm backdrop-blur-md"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E6357F] opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#E6357F]" />
                </span>
                <span className="text-[11px] font-extrabold text-[#E6357F] uppercase tracking-[0.14em]">
                  Flagship Product
                </span>
                <span className="text-neutral-300">•</span>
                <span className="text-xs font-semibold text-[#1A1A1A] flex items-center gap-1">
                  Skolvo SaaS Studio &amp; CampusNova
                  <ArrowRight className="w-3.5 h-3.5 text-[#E6357F]" />
                </span>
              </motion.div>

              {/* Main Headline */}
              <h1 className="text-[2.6rem] sm:text-6xl lg:text-[4.4rem] font-extrabold font-display tracking-[-0.03em] text-[#1A1A1A] leading-[1.04]">
                <WordReveal text="Production-Grade" />{' '}
                <span className="relative inline-block">
                  <WordReveal text="Generative AI" className="relative z-10 text-[#E6357F]" delay={0.1} />
                  <motion.span
                    aria-hidden
                    className="absolute -bottom-1 left-0 h-[0.42em] w-full origin-left rounded-sm bg-[#F2A93B]/35"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.9, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
                  />
                </span>{' '}
                <WordReveal text="Systems, Shipped." delay={0.25} />
              </h1>

              {/* Subtitle / Positioning Statement */}
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-base sm:text-lg text-neutral-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium"
              >
                Skolvo engineers privacy-first, role-gated platforms on top of hyper-granular structured data infrastructure &mdash; RAG, LLM evaluation, and agentic pipelines that hold up in production. Starting with{' '}
                <strong className="text-[#1A1A1A]">CampusNova</strong> for academies and schools.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-3.5 pt-1"
              >
                <a
                  href="#campusnova"
                  className="group relative w-full sm:w-auto overflow-hidden px-8 py-4 rounded-full bg-[#1A1A1A] text-white font-bold text-sm shadow-xl transition-all hover:-translate-y-0.5 hover:shadow-2xl active:translate-y-0 flex items-center justify-center gap-2"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-[#E6357F] to-[#E8622C] transition-transform duration-500 ease-out group-hover:translate-x-0" />
                  <span className="relative z-10">Explore CampusNova</span>
                  <ArrowRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>

                <button
                  onClick={() => setIsWaitlistOpen(true)}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/80 hover:bg-white text-[#1A1A1A] font-bold text-sm border border-neutral-300 shadow-sm backdrop-blur-md transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#E6357F]" />
                  Join Early Access
                </button>
              </motion.div>

              {/* Quick Metrics Bar */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto lg:mx-0"
              >
                {[
                  { value: <Counter to={100} suffix="%" />, label: 'On-Device Face Privacy' },
                  { value: <Counter to={182} suffix="ms" />, label: 'Biometric Recognition' },
                  { value: '1-Click', label: 'Mass WhatsApp Personalization' },
                  { value: 'Zero', label: 'Unauthorized Access' },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="group rounded-2xl border border-neutral-200/80 bg-white/70 p-3.5 shadow-sm backdrop-blur-md transition-all hover:-translate-y-1 hover:border-[#E6357F]/40 hover:shadow-lg"
                  >
                    <span className="block font-display text-xl sm:text-2xl font-extrabold text-[#1A1A1A]">
                      {stat.value}
                    </span>
                    <span className="text-[11px] font-semibold leading-tight text-neutral-500">{stat.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: live animated panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 flex justify-center lg:justify-end"
            >
              <div className="animate-float">
                <LiveHeroPanel />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. WHAT IS SKOLVO SECTION (BOLD COLOR BLOCKING: SOLID MAGENTA) */}
      {/* ============================================================ */}
      <section className="py-20 bg-[#E6357F] text-white relative shadow-xl overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -right-20 h-[26rem] w-[26rem] rounded-full bg-[#E8622C]/45 blur-[100px] animate-blob-2" />
          <div className="absolute -bottom-40 -left-16 h-[24rem] w-[24rem] rounded-full bg-[#F2A93B]/30 blur-[100px] animate-blob-1" />
          <div className="bg-noise" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <Reveal className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/15 border border-white/30 rounded-full text-xs font-bold text-white uppercase tracking-wider backdrop-blur-md">
                <Layers className="w-4 h-4 text-white" />
                The Parent Company Strategy
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight leading-tight">
                One Vision. Multiple Specialized SaaS Ventures.
              </h2>

              <p className="text-white/90 text-base sm:text-lg leading-relaxed font-medium">
                Skolvo is not just a single software tool. We are a software venture studio building dedicated, high-performance SaaS applications tailored for educational institutions, SMBs, and scaling enterprises.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3 bg-white/10 p-4 rounded-2xl border border-white/20 backdrop-blur-xs">
                  <div className="w-9 h-9 rounded-xl bg-white text-[#E6357F] flex items-center justify-center font-bold shrink-0 mt-0.5 shadow-sm">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">Bank-Grade Role Isolation</h4>
                    <p className="text-xs text-white/80 mt-0.5 leading-relaxed font-medium">
                      Every product we launch uses strict invite-only credentials and cryptographic access control.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/10 p-4 rounded-2xl border border-white/20 backdrop-blur-xs">
                  <div className="w-9 h-9 rounded-xl bg-white text-[#E8622C] flex items-center justify-center font-bold shrink-0 mt-0.5 shadow-sm">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">Embedded Machine Learning</h4>
                    <p className="text-xs text-white/80 mt-0.5 leading-relaxed font-medium">
                      Autonomous AI agents that execute routine operations, answer customer queries, and update ledgers seamlessly.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Right Interactive Diagram Card */}
            <Reveal delay={0.15} className="lg:col-span-6 [perspective:1400px]">
              <TiltCard className="relative p-6 sm:p-8 rounded-3xl bg-white text-[#1A1A1A] border border-white/20 shadow-2xl space-y-6">
                <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
                  <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                    Skolvo Ecosystem Roadmap
                  </span>
                  <span className="px-2.5 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-md text-xs font-bold font-mono">
                    Active Development
                  </span>
                </div>

                {/* Ecosystem Tree */}
                <div className="space-y-3">
                  {/* Flagship */}
                  <div className="p-4 rounded-2xl bg-[#FAF4F0] border-2 border-[#E6357F] flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#E6357F] flex items-center justify-center text-white font-extrabold font-display text-lg shadow-sm">
                        CN
                      </div>
                      <div>
                        <h4 className="text-base font-extrabold text-[#1A1A1A]">CampusNova</h4>
                        <p className="text-xs font-semibold text-[#E6357F]">Academy & School OS • Flagship</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-[#E6357F]/10 text-[#E6357F] text-xs font-bold rounded-full border border-[#E6357F]/30">
                      Coming Soon
                    </span>
                  </div>

                  {/* Future #1 */}
                  <div className="p-4 rounded-2xl bg-white border border-neutral-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-500 font-bold font-display text-sm">
                        S2
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-neutral-800">Enterprise Workflow Suite</h4>
                        <p className="text-xs text-neutral-500 font-medium">B2B Operations • Pipeline</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 bg-neutral-100 text-neutral-600 text-xs rounded-md font-semibold">
                      Q4 Roadmap
                    </span>
                  </div>

                  {/* Future #2 */}
                  <div className="p-4 rounded-2xl bg-white border border-neutral-200 flex items-center justify-between opacity-75">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-400 font-bold font-display text-sm">
                        S3
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-neutral-700">AI Learning Analytics</h4>
                        <p className="text-xs text-neutral-500 font-medium">EdTech Intelligence • Research</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 bg-neutral-100 text-neutral-500 text-xs rounded-md font-semibold">
                      Ideation
                    </span>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. CAMPUSNOVA FLAGSHIP SHOWCASE SECTION */}
      {/* ============================================================ */}
      <section id="campusnova" className="py-16 bg-[#FDF6F0]">
        {/* Interactive Mockup Preview Switcher Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="flex flex-wrap items-center justify-center gap-1 p-1.5 bg-white border border-neutral-200/90 rounded-2xl max-w-2xl mx-auto shadow-sm">
            {[
              { key: 'biometrics' as const, label: 'Biometric Attendance', icon: ScanFace, color: '#E6357F' },
              { key: 'comms' as const, label: 'Mass WhatsApp & SMS', icon: MessageSquare, color: '#E8622C' },
              { key: 'fees' as const, label: 'Fee Tracking', icon: DollarSign, color: '#E6357F' },
              { key: 'ai' as const, label: '24/7 AI Bot', icon: Bot, color: '#E8622C' },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeMockupTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveMockupTab(tab.key)}
                  className={`relative px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
                    isActive ? 'text-white' : 'text-neutral-700 hover:text-black'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="mockup-tab-pill"
                      className="absolute inset-0 rounded-xl shadow-sm"
                      style={{ backgroundColor: tab.color }}
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <Icon className="relative z-10 w-3.5 h-3.5" />
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Card with dynamic mockup */}
        <ProductCard
          id="campusnova-card"
          name="CampusNova"
          tagline="Secure AI Academy Management"
          oneLiner="CampusNova is a secure, role-gated, AI-powered academy management platform for schools, coaching centers, and educational institutions."
          statusBadge="Flagship Product • Coming Soon"
          features={campusNovaFeatures}
          interactiveMockup={
            activeMockupTab === 'biometrics' ? (
              <BiometricMockup />
            ) : activeMockupTab === 'comms' ? (
              <MassCommsMockup />
            ) : activeMockupTab === 'fees' ? (
              <FeeTrackingMockup />
            ) : (
              <AiBotMockup />
            )
          }
          primaryCtaText="Join CampusNova Early Access"
        />
      </section>

      {/* ============================================================ */}
      {/* 4. SOCIAL PROOF & TRUST SECTION (LIGHT CREAM WITH LAYERED OVERLAPPING CARDS) */}
      {/* ============================================================ */}
      <section className="py-20 bg-[#FDF6F0] border-y border-neutral-200 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <Reveal className="max-w-2xl mx-auto text-center space-y-3">
            <span className="px-3 py-1 bg-[#E8622C]/10 border border-[#E8622C]/30 text-[#E8622C] rounded-full text-xs font-bold uppercase tracking-wider inline-block">
              Security & Credibility
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold font-display text-[#1A1A1A]">
              Trusted Engineering Architecture
            </h3>
            <p className="text-neutral-600 text-sm sm:text-base font-medium">
              Designed for leading educational institutions, biometric privacy standards, and enterprise-grade role permissions.
            </p>
          </Reveal>

          {/* Animated Logo Marquee */}
          <div className="pt-2 pb-6 border-b border-neutral-200/80">
            <p className="text-center text-xs font-bold text-neutral-400 uppercase tracking-widest mb-6">
              PREPARING LAUNCH WITH TOP INSTITUTIONAL PARTNERS
            </p>
            <Marquee>
              {trustedLogos.map((logo) => (
                <div
                  key={logo.name}
                  className="shrink-0 px-5 py-3 rounded-xl bg-white border border-neutral-200/80 shadow-xs flex items-center gap-2 transition-all hover:-translate-y-0.5 hover:border-[#E6357F]/40 hover:shadow-md"
                >
                  <Building2 className="w-4 h-4 text-[#E6357F]" />
                  <div className="text-left">
                    <span className="block text-xs font-extrabold text-[#1A1A1A] whitespace-nowrap">{logo.name}</span>
                    <span className="text-[10px] text-neutral-500 font-medium">{logo.location}</span>
                  </div>
                </div>
              ))}
            </Marquee>
          </div>

          {/* Layered Overlapping Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative pt-4 items-stretch [perspective:1400px]">
            {[
              {
                icon: Lock,
                iconClass: 'bg-[#E6357F]/10 border-[#E6357F]/30 text-[#E6357F]',
                stat: <Counter to={100} suffix="%" />,
                pill: 'Invite-Only',
                pillClass: 'text-[#E6357F] bg-[#E6357F]/10',
                title: 'Invite-Only Access',
                body: 'Zero public registration forms. Academy owners hold complete control over token-based onboarding for Admins, Teachers, and Staff.',
                footer: 'Token Link Protection',
                offset: '',
                z: 'z-10',
                shadow: 'shadow-xl',
              },
              {
                icon: Cpu,
                iconClass: 'bg-[#E8622C]/10 border-[#E8622C]/30 text-[#E8622C]',
                stat: <>0 Bytes</>,
                pill: 'On-Device AI',
                pillClass: 'text-[#E8622C] bg-[#E8622C]/10',
                title: 'On-Device Facial Biometrics',
                body: '100% on-device blink-liveness facial recognition. No raw face photographs are ever stored or uploaded to cloud servers.',
                footer: 'Vectorized Liveness Check',
                offset: 'md:-translate-y-3',
                z: 'z-20',
                shadow: 'shadow-2xl',
              },
              {
                icon: Zap,
                iconClass: 'bg-[#F2A93B]/15 border-[#F2A93B]/40 text-[#B87613]',
                stat: <>1-Click</>,
                pill: 'Automation',
                pillClass: 'text-[#B87613] bg-[#F2A93B]/15',
                title: 'Automated Fee Reminders',
                body: 'Eliminate manual fee follow-ups with personalized WhatsApp & SMS reminders, individual due balances, and graphic receipts.',
                footer: 'Dynamic Canvas Receipts',
                offset: '',
                z: 'z-10',
                shadow: 'shadow-xl',
              },
            ].map((card, i) => {
              const Icon = card.icon;
              return (
                <Reveal key={card.title} delay={i * 0.12} className={`relative ${card.z} ${card.offset}`}>
                  <TiltCard
                    className={`group h-full p-6 rounded-3xl bg-white border border-neutral-200 ${card.shadow} transition-colors duration-300 hover:border-[#E6357F]/40 flex flex-col justify-between space-y-4`}
                  >
                    <div>
                      <div
                        className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-4 shadow-2xs transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${card.iconClass}`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl font-extrabold text-[#1A1A1A] font-display">{card.stat}</span>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${card.pillClass}`}>
                          {card.pill}
                        </span>
                      </div>
                      <h4 className="text-lg font-extrabold text-[#1A1A1A] mb-1">{card.title}</h4>
                      <p className="text-xs text-neutral-600 leading-relaxed font-medium">{card.body}</p>
                    </div>
                    <div className="pt-3 border-t border-neutral-100 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> {card.footer}
                    </div>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. FUTURE PRODUCTS TEASER SECTION */}
      {/* ============================================================ */}
      <section className="py-20 bg-[#FAF4F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#E6357F]">
                Skolvo Product Pipeline
              </span>
              <h3 className="text-3xl font-extrabold font-display text-[#1A1A1A] mt-1">
                More Products Coming Soon
              </h3>
            </div>
            <p className="text-neutral-600 text-sm max-w-md font-medium">
              We are actively developing and testing next-generation SaaS tools to empower businesses and institutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Teaser Slot 1 */}
            <Reveal className="p-8 rounded-3xl bg-white border border-dashed border-neutral-300 hover:border-neutral-400 transition-all hover:-translate-y-1 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-lg">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FAF4F0] text-neutral-700 border border-neutral-200">
                  Product #02 • In Development
                </span>
                <span className="text-xs font-mono text-neutral-500 font-bold">Planned Q4</span>
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-extrabold font-display text-[#1A1A1A]">
                  Enterprise Workflow Suite
                </h4>
                <p className="text-xs text-neutral-600 leading-relaxed font-medium">
                  A high-throughput internal operations and automated compliance platform designed for scaling organizations.
                </p>
              </div>
              <button
                onClick={() => setIsWaitlistOpen(true)}
                className="text-xs text-[#E6357F] font-bold hover:underline flex items-center gap-1 w-fit"
              >
                Notify me when announced <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </Reveal>

            {/* Teaser Slot 2 */}
            <Reveal delay={0.1} className="p-8 rounded-3xl bg-white border border-dashed border-neutral-300 hover:border-neutral-400 transition-all hover:-translate-y-1 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-lg">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FAF4F0] text-neutral-700 border border-neutral-200">
                  Product #03 • Ideation Phase
                </span>
                <span className="text-xs font-mono text-neutral-500 font-bold">Researching</span>
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-extrabold font-display text-[#1A1A1A]">
                  AI Learning Analytics Platform
                </h4>
                <p className="text-xs text-neutral-600 leading-relaxed font-medium">
                  Predictive student performance modeling and adaptive curriculum insights for educational leaders.
                </p>
              </div>
              <button
                onClick={() => setIsWaitlistOpen(true)}
                className="text-xs text-[#E8622C] font-bold hover:underline flex items-center gap-1 w-fit"
              >
                Join roadmap focus group <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. FINAL CALL TO ACTION BANNER */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-20 relative bg-[#FDF6F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="relative rounded-3xl p-[2px] overflow-hidden shadow-2xl">
            <div
              aria-hidden
              className="absolute inset-[-60%] animate-spin-slow"
              style={{
                background:
                  'conic-gradient(from 0deg, #E6357F, #E8622C, #F2A93B, #E6357F)',
              }}
            />
            <div className="relative rounded-3xl bg-[#1A1A1A] p-8 sm:p-12 text-center text-white overflow-hidden">
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="bg-noise" />
            </div>
            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <span className="shimmer-badge px-3.5 py-1 bg-[#E6357F] rounded-full text-xs font-extrabold uppercase tracking-wider text-white inline-block shadow-sm">
                Early Access Invites Open
              </span>

              <h2 className="text-3xl sm:text-5xl font-extrabold font-display leading-tight text-white">
                Ready to Experience CampusNova?
              </h2>

              <p className="text-base sm:text-lg text-neutral-300 font-medium">
                Reserve your academy&apos;s priority access spot today. Zero commitments required.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => setIsWaitlistOpen(true)}
                  className="w-full sm:w-auto px-8 py-4 bg-white text-[#1A1A1A] hover:bg-neutral-100 font-extrabold text-sm rounded-full shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  Join Waitlist Now
                  <ArrowRight className="w-4 h-4 text-[#E6357F]" />
                </button>
                <Link
                  href="/pricing"
                  className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-white/10 text-white font-bold text-sm rounded-full border border-white/30 transition-all"
                >
                  View Early Pricing Tiers
                </Link>
              </div>
            </div>
            </div>
          </Reveal>
        </div>
      </section>

      <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />
    </div>
  );
}
