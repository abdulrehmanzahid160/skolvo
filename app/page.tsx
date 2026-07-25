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

  return (
    <div className="relative overflow-hidden">
      {/* ============================================================ */}
      {/* 1. HERO SECTION */}
      {/* ============================================================ */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-8 pb-20 overflow-hidden">
        {/* Ambient Gradient Background Blobs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#6D5CFB]/20 rounded-full blur-[140px] pointer-events-none animate-pulse-slow" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#FF6B4A]/15 rounded-full blur-[120px] pointer-events-none" />

        {/* Floating Mesh Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          {/* Top Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#131322] border border-[#6D5CFB]/40 shadow-lg shadow-[#6D5CFB]/15"
          >
            <span className="w-2 h-2 rounded-full bg-[#FF6B4A] animate-ping" />
            <span className="text-xs font-semibold text-gray-200">
              Introducing <strong className="text-white font-display">Skolvo</strong> Parent SaaS Studio
            </span>
            <span className="text-gray-500">•</span>
            <span className="text-xs font-medium text-[#8A7DFF] flex items-center gap-1">
              CampusNova Launching Soon
              <ArrowRight className="w-3 h-3" />
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-display tracking-tight text-white max-w-4xl mx-auto leading-[1.15]"
          >
            Building Purpose-Driven <span className="text-gradient">SaaS Products</span> for the Modern Era.
          </motion.h1>

          {/* Subtitle / Positioning Statement */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
          >
            Skolvo is a next-generation software house engineering privacy-first, role-gated, and AI-accelerated platforms. Starting with <strong className="text-white">CampusNova</strong> for academies and schools.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <a
              href="#campusnova"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#6D5CFB] to-[#5343E0] hover:from-[#8A7DFF] hover:to-[#6D5CFB] text-white font-bold text-sm shadow-xl shadow-[#6D5CFB]/30 hover:shadow-[#6D5CFB]/50 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
            >
              Explore CampusNova
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={() => setIsWaitlistOpen(true)}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#131322] hover:bg-[#1A1A2E] text-white font-semibold text-sm border border-white/10 hover:border-[#FF6B4A]/50 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#FF6B4A]" />
              Join Early Access Waitlist
            </button>
          </motion.div>

          {/* Quick Metrics Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            <div className="p-4 rounded-2xl bg-[#131322]/60 border border-white/5 backdrop-blur-md">
              <span className="block text-2xl font-extrabold text-white font-display">100%</span>
              <span className="text-xs text-gray-400">On-Device Face Privacy</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#131322]/60 border border-white/5 backdrop-blur-md">
              <span className="block text-2xl font-extrabold text-white font-display">&lt; 200ms</span>
              <span className="text-xs text-gray-400">Biometric Recognition</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#131322]/60 border border-white/5 backdrop-blur-md">
              <span className="block text-2xl font-extrabold text-white font-display">1-Click</span>
              <span className="text-xs text-gray-400">Mass WhatsApp Personalization</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#131322]/60 border border-white/5 backdrop-blur-md">
              <span className="block text-2xl font-extrabold text-white font-display">Zero</span>
              <span className="text-xs text-gray-400">Unauthorized Access</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. WHAT IS SKOLVO SECTION */}
      {/* ============================================================ */}
      <section className="py-20 bg-[#07070E] border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF6B4A]/10 border border-[#FF6B4A]/30 rounded-full text-xs font-bold text-[#FF6B4A] uppercase tracking-wider">
                <Layers className="w-3.5 h-3.5" />
                The Parent Company Strategy
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight leading-tight">
                One Vision. Multiple Specialized <span className="text-gradient-accent">SaaS Ventures</span>.
              </h2>

              <p className="text-gray-300 text-base leading-relaxed">
                Skolvo is not just a single software tool. We are a software venture studio building dedicated, high-performance SaaS applications tailored for educational institutions, SMBs, and scaling enterprises.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#6D5CFB]/20 border border-[#6D5CFB]/40 flex items-center justify-center text-[#8A7DFF] shrink-0 mt-0.5">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Bank-Grade Role Isolation</h4>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Every product we launch uses strict invite-only credentials and cryptographic access control.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#FF6B4A]/20 border border-[#FF6B4A]/40 flex items-center justify-center text-[#FF6B4A] shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Embedded Machine Learning</h4>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Autonomous AI agents that execute routine operations, answer customer queries, and update ledgers seamlessly.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Interactive Diagram Card */}
            <div className="lg:col-span-6">
              <div className="relative p-6 sm:p-8 rounded-3xl bg-[#131322] border border-white/10 shadow-2xl space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Skolvo Ecosystem Roadmap
                  </span>
                  <span className="px-2.5 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-md text-xs font-mono">
                    Active Development
                  </span>
                </div>

                {/* Ecosystem Tree */}
                <div className="space-y-3">
                  {/* Flagship */}
                  <div className="p-4 rounded-xl bg-[#1A1A2E] border border-[#6D5CFB]/50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#6D5CFB] flex items-center justify-center text-white font-bold font-display text-lg shadow-md">
                        CN
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">CampusNova</h4>
                        <p className="text-xs text-[#8A7DFF]">Academy & School OS • Flagship</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-[#6D5CFB]/20 text-[#8A7DFF] text-xs font-bold rounded-full">
                      Coming Soon
                    </span>
                  </div>

                  {/* Future #1 */}
                  <div className="p-4 rounded-xl bg-[#0B0B14] border border-white/5 flex items-center justify-between opacity-75">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 font-bold font-display text-sm">
                        S2
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-300">Enterprise Workflow Suite</h4>
                        <p className="text-xs text-gray-500">B2B Operations • Pipeline</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 bg-white/5 text-gray-400 text-xs rounded-md">
                      Q4 Roadmap
                    </span>
                  </div>

                  {/* Future #2 */}
                  <div className="p-4 rounded-xl bg-[#0B0B14] border border-white/5 flex items-center justify-between opacity-50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 font-bold font-display text-sm">
                        S3
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-400">AI Learning Analytics</h4>
                        <p className="text-xs text-gray-600">EdTech Intelligence • Research</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 bg-white/5 text-gray-500 text-xs rounded-md">
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
      <section id="campusnova" className="py-16">
        {/* Interactive Mockup Preview Switcher Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-[#131322] border border-white/10 rounded-2xl max-w-2xl mx-auto">
            <button
              onClick={() => setActiveMockupTab('biometrics')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeMockupTab === 'biometrics'
                  ? 'bg-[#6D5CFB] text-white shadow-lg shadow-[#6D5CFB]/30'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <ScanFace className="w-3.5 h-3.5" />
              Biometric Attendance
            </button>

            <button
              onClick={() => setActiveMockupTab('comms')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeMockupTab === 'comms'
                  ? 'bg-[#6D5CFB] text-white shadow-lg shadow-[#6D5CFB]/30'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Mass WhatsApp & SMS
            </button>

            <button
              onClick={() => setActiveMockupTab('fees')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeMockupTab === 'fees'
                  ? 'bg-[#6D5CFB] text-white shadow-lg shadow-[#6D5CFB]/30'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5" />
              Fee Tracking
            </button>

            <button
              onClick={() => setActiveMockupTab('ai')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeMockupTab === 'ai'
                  ? 'bg-[#6D5CFB] text-white shadow-lg shadow-[#6D5CFB]/30'
                  : 'text-gray-400 hover:text-white'
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
      {/* 4. SOCIAL PROOF & TRUST SECTION */}
      {/* ============================================================ */}
      <section className="py-16 bg-[#07070E] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF6B4A]">
              Security & Credibility
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
              Trusted Engineering Architecture
            </h3>
            <p className="text-gray-400 text-sm">
              Backed by ambitious educators, biometric privacy standards, and enterprise-grade role permissions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-6 rounded-2xl bg-[#131322] border border-white/5 hover:border-[#6D5CFB]/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#6D5CFB]/20 border border-[#6D5CFB]/40 flex items-center justify-center text-[#8A7DFF] mb-4">
                <Lock className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white mb-1">Invite-Only Access</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Zero public registration forms. Academy owners hold complete control over token-based onboarding for Admins, Teachers, and Staff.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#131322] border border-white/5 hover:border-[#FF6B4A]/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#FF6B4A]/20 border border-[#FF6B4A]/40 flex items-center justify-center text-[#FF6B4A] mb-4">
                <Cpu className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white mb-1">On-Device Facial Biometrics</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                100% on-device blink-liveness facial recognition. No raw face photographs are ever stored or uploaded to cloud servers.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#131322] border border-white/5 hover:border-emerald-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white mb-1">Automated Fee Reminders</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Eliminate manual fee follow-ups with personalized WhatsApp & SMS reminders, individual due balances, and graphic receipts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. FUTURE PRODUCTS TEASER SECTION */}
      {/* ============================================================ */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#8A7DFF]">
                Skolvo Product Pipeline
              </span>
              <h3 className="text-3xl font-extrabold font-display text-white mt-1">
                More Products Coming Soon
              </h3>
            </div>
            <p className="text-gray-400 text-sm max-w-md">
              We are actively developing and testing next-generation SaaS tools to empower businesses and institutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Teaser Slot 1 */}
            <div className="p-8 rounded-3xl bg-[#131322]/50 border border-dashed border-white/10 hover:border-white/20 transition-all flex flex-col justify-between space-y-6">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 text-gray-400 border border-white/10">
                  Product #02 • In Development
                </span>
                <span className="text-xs font-mono text-gray-500">Planned Q4</span>
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-bold font-display text-gray-300">
                  Enterprise Workflow Suite
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  A high-throughput internal operations and automated compliance platform designed for scaling organizations.
                </p>
              </div>
              <button
                onClick={() => setIsWaitlistOpen(true)}
                className="text-xs text-[#8A7DFF] font-semibold hover:underline flex items-center gap-1 w-fit"
              >
                Notify me when announced <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            {/* Teaser Slot 2 */}
            <div className="p-8 rounded-3xl bg-[#131322]/50 border border-dashed border-white/10 hover:border-white/20 transition-all flex flex-col justify-between space-y-6">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 text-gray-400 border border-white/10">
                  Product #03 • Ideation Phase
                </span>
                <span className="text-xs font-mono text-gray-500">Researching</span>
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-bold font-display text-gray-300">
                  AI Learning Analytics Platform
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Predictive student performance modeling and adaptive curriculum insights for educational leaders.
                </p>
              </div>
              <button
                onClick={() => setIsWaitlistOpen(true)}
                className="text-xs text-[#FF6B4A] font-semibold hover:underline flex items-center gap-1 w-fit"
              >
                Join roadmap focus group <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. FINAL CALL TO ACTION BANNER */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-gradient-to-r from-[#6D5CFB] via-[#5343E0] to-[#FF6B4A] p-8 sm:p-12 text-center text-white shadow-2xl shadow-[#6D5CFB]/30 overflow-hidden">
            {/* Ambient Overlay */}
            <div className="absolute inset-0 bg-[#0B0B14]/20 pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider text-white inline-block">
                Early Access Invites Open
              </span>

              <h2 className="text-3xl sm:text-5xl font-extrabold font-display leading-tight">
                Ready to Experience CampusNova?
              </h2>

              <p className="text-base sm:text-lg text-white/90 font-medium">
                Reserve your academy&apos;s priority access spot today. Zero commitments required.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => setIsWaitlistOpen(true)}
                  className="w-full sm:w-auto px-8 py-4 bg-white text-[#0B0B14] hover:bg-gray-100 font-extrabold text-sm rounded-full shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  Join Waitlist Now
                  <ArrowRight className="w-4 h-4 text-[#6D5CFB]" />
                </button>
                <Link
                  href="/pricing"
                  className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-full border border-white/30 backdrop-blur-md transition-all"
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
