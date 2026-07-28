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
      {/* ============================================================ */}
      {/* 1. HERO SECTION */}
      {/* ============================================================ */}
      <section className="relative min-h-[82vh] flex items-center justify-center pt-6 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          {/* Top Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E6357F]/10 border border-[#E6357F]/30 shadow-xs"
          >
            <span className="w-2 h-2 rounded-full bg-[#E6357F] animate-pulse" />
            <span className="text-xs font-bold text-[#E6357F] uppercase tracking-wider">
              FLAGSHIP PRODUCT
            </span>
            <span className="text-neutral-300">•</span>
            <span className="text-xs font-semibold text-[#1A1A1A] flex items-center gap-1">
              Introducing Skolvo SaaS Studio & CampusNova
              <ArrowRight className="w-3.5 h-3.5 text-[#E6357F]" />
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-display tracking-tight text-[#1A1A1A] max-w-4xl mx-auto leading-[1.12]"
          >
            Building Production-Grade Generative AI Systems for the Modern Era.
          </motion.h1>

          {/* Subtitle / Positioning Statement */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg sm:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed font-medium"
          >
            Skolvo is a next-generation software house engineering privacy-first, role-gated, and AI-accelerated platforms &mdash; backed by hyper-granular structured data infrastructure, RAG pipelines, and agentic systems. Starting with <strong className="text-[#1A1A1A]">CampusNova</strong> for academies and schools.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
          >
            <a
              href="#campusnova"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#1A1A1A] hover:bg-black text-white font-bold text-sm shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
            >
              Explore CampusNova
              <ArrowRight className="w-4 h-4 text-white" />
            </a>

            <button
              onClick={() => setIsWaitlistOpen(true)}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-neutral-100 text-[#1A1A1A] font-bold text-sm border border-neutral-300 shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#E6357F]" />
              Join Early Access Waitlist
            </button>
          </motion.div>

          {/* Quick Metrics Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            <div className="p-4 rounded-2xl bg-white border border-neutral-200/90 shadow-md">
              <span className="block text-2xl font-extrabold text-[#1A1A1A] font-display">100%</span>
              <span className="text-xs font-semibold text-neutral-500">On-Device Face Privacy</span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-neutral-200/90 shadow-md">
              <span className="block text-2xl font-extrabold text-[#1A1A1A] font-display">&lt; 200ms</span>
              <span className="text-xs font-semibold text-neutral-500">Biometric Recognition</span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-neutral-200/90 shadow-md">
              <span className="block text-2xl font-extrabold text-[#1A1A1A] font-display">1-Click</span>
              <span className="text-xs font-semibold text-neutral-500">Mass WhatsApp Personalization</span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-neutral-200/90 shadow-md">
              <span className="block text-2xl font-extrabold text-[#1A1A1A] font-display">Zero</span>
              <span className="text-xs font-semibold text-neutral-500">Unauthorized Access</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. WHAT IS SKOLVO SECTION (BOLD COLOR BLOCKING: SOLID MAGENTA) */}
      {/* ============================================================ */}
      <section className="py-20 bg-[#E6357F] text-white relative shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
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
            </div>

            {/* Right Interactive Diagram Card */}
            <div className="lg:col-span-6">
              <div className="relative p-6 sm:p-8 rounded-3xl bg-white text-[#1A1A1A] border border-white/20 shadow-2xl space-y-6">
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
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. CAMPUSNOVA FLAGSHIP SHOWCASE SECTION */}
      {/* ============================================================ */}
      <section id="campusnova" className="py-16 bg-[#FDF6F0]">
        {/* Interactive Mockup Preview Switcher Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-white border border-neutral-200/90 rounded-2xl max-w-2xl mx-auto shadow-sm">
            <button
              onClick={() => setActiveMockupTab('biometrics')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeMockupTab === 'biometrics'
                  ? 'bg-[#E6357F] text-white shadow-sm'
                  : 'text-neutral-700 hover:text-black hover:bg-neutral-100'
              }`}
            >
              <ScanFace className="w-3.5 h-3.5" />
              Biometric Attendance
            </button>

            <button
              onClick={() => setActiveMockupTab('comms')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeMockupTab === 'comms'
                  ? 'bg-[#E8622C] text-white shadow-sm'
                  : 'text-neutral-700 hover:text-black hover:bg-neutral-100'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Mass WhatsApp & SMS
            </button>

            <button
              onClick={() => setActiveMockupTab('fees')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeMockupTab === 'fees'
                  ? 'bg-[#E6357F] text-white shadow-sm'
                  : 'text-neutral-700 hover:text-black hover:bg-neutral-100'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5" />
              Fee Tracking
            </button>

            <button
              onClick={() => setActiveMockupTab('ai')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeMockupTab === 'ai'
                  ? 'bg-[#E8622C] text-white shadow-sm'
                  : 'text-neutral-700 hover:text-black hover:bg-neutral-100'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              24/7 AI Bot
            </button>
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
          <div className="max-w-2xl mx-auto text-center space-y-3">
            <span className="px-3 py-1 bg-[#E8622C]/10 border border-[#E8622C]/30 text-[#E8622C] rounded-full text-xs font-bold uppercase tracking-wider inline-block">
              Security & Credibility
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold font-display text-[#1A1A1A]">
              Trusted Engineering Architecture
            </h3>
            <p className="text-neutral-600 text-sm sm:text-base font-medium">
              Designed for leading educational institutions, biometric privacy standards, and enterprise-grade role permissions.
            </p>
          </div>

          {/* Logo Wall Grid */}
          <div className="pt-2 pb-6 border-b border-neutral-200/80">
            <p className="text-center text-xs font-bold text-neutral-400 uppercase tracking-widest mb-6">
              PREPARING LAUNCH WITH TOP INSTITUTIONAL PARTNERS
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 opacity-85">
              {trustedLogos.map((logo) => (
                <div
                  key={logo.name}
                  className="px-5 py-3 rounded-xl bg-white border border-neutral-200/80 shadow-xs flex items-center gap-2 hover:shadow-md transition-all"
                >
                  <Building2 className="w-4 h-4 text-[#E6357F]" />
                  <div>
                    <span className="block text-xs font-extrabold text-[#1A1A1A]">{logo.name}</span>
                    <span className="text-[10px] text-neutral-500 font-medium">{logo.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Layered Overlapping Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative pt-4 items-stretch">
            {/* Card 1 */}
            <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-xl hover:-translate-y-1 transition-all duration-300 relative z-10 flex flex-col justify-between space-y-4">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#E6357F]/10 border border-[#E6357F]/30 flex items-center justify-center text-[#E6357F] mb-4 shadow-2xs">
                  <Lock className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl font-extrabold text-[#1A1A1A] font-display">100%</span>
                  <span className="text-xs font-bold text-[#E6357F] bg-[#E6357F]/10 px-2 py-0.5 rounded-full">Invite-Only</span>
                </div>
                <h4 className="text-lg font-extrabold text-[#1A1A1A] mb-1">Invite-Only Access</h4>
                <p className="text-xs text-neutral-600 leading-relaxed font-medium">
                  Zero public registration forms. Academy owners hold complete control over token-based onboarding for Admins, Teachers, and Staff.
                </p>
              </div>
              <div className="pt-3 border-t border-neutral-100 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Token Link Protection
              </div>
            </div>

            {/* Card 2 (Overlapping elevation offset) */}
            <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-2xl hover:-translate-y-1 transition-all duration-300 relative z-20 md:-translate-y-3 flex flex-col justify-between space-y-4">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#E8622C]/10 border border-[#E8622C]/30 flex items-center justify-center text-[#E8622C] mb-4 shadow-2xs">
                  <Cpu className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl font-extrabold text-[#1A1A1A] font-display">0 Bytes</span>
                  <span className="text-xs font-bold text-[#E8622C] bg-[#E8622C]/10 px-2 py-0.5 rounded-full">On-Device AI</span>
                </div>
                <h4 className="text-lg font-extrabold text-[#1A1A1A] mb-1">On-Device Facial Biometrics</h4>
                <p className="text-xs text-neutral-600 leading-relaxed font-medium">
                  100% on-device blink-liveness facial recognition. No raw face photographs are ever stored or uploaded to cloud servers.
                </p>
              </div>
              <div className="pt-3 border-t border-neutral-100 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Vectorized Liveness Check
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-xl hover:-translate-y-1 transition-all duration-300 relative z-10 flex flex-col justify-between space-y-4">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 mb-4 shadow-2xs">
                  <Zap className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl font-extrabold text-[#1A1A1A] font-display">1-Click</span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">Automation</span>
                </div>
                <h4 className="text-lg font-extrabold text-[#1A1A1A] mb-1">Automated Fee Reminders</h4>
                <p className="text-xs text-neutral-600 leading-relaxed font-medium">
                  Eliminate manual fee follow-ups with personalized WhatsApp & SMS reminders, individual due balances, and graphic receipts.
                </p>
              </div>
              <div className="pt-3 border-t border-neutral-100 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Dynamic Canvas Receipts
              </div>
            </div>
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
            <div className="p-8 rounded-3xl bg-white border border-dashed border-neutral-300 hover:border-neutral-400 transition-all flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md">
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
            </div>

            {/* Teaser Slot 2 */}
            <div className="p-8 rounded-3xl bg-white border border-dashed border-neutral-300 hover:border-neutral-400 transition-all flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md">
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
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. FINAL CALL TO ACTION BANNER */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-20 relative bg-[#FDF6F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-[#1A1A1A] p-8 sm:p-12 text-center text-white shadow-2xl overflow-hidden">
            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <span className="px-3.5 py-1 bg-[#E6357F] rounded-full text-xs font-extrabold uppercase tracking-wider text-white inline-block shadow-sm">
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
        </div>
      </section>

      <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />
    </div>
  );
}
