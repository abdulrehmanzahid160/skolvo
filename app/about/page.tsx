'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, ShieldCheck, Code2, Cpu, Bot, Sparkles, Linkedin, Twitter, Mail, ArrowRight } from 'lucide-react';
import WaitlistModal from '@/components/WaitlistModal';

export default function AboutPage() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  const teamMembers = [
    {
      name: 'Abdul Rehman',
      role: 'Generative AI Developer',
      bio: 'Building hyper-granular structured data infrastructure for AI companies, with production LLM systems spanning RAG, LLM evaluation, and agentic pipelines.',
      avatarInitial: 'AR',
      skills: ['Generative AI', 'RAG Systems', 'LLM Evaluation', 'Agentic Pipelines'],
      gradient: 'from-[#0F7A5F] to-[#0A5C47]',
    },
    {
      name: 'Muhammad Hammad',
      role: 'Machine Learning & Biometric Intelligence',
      bio: 'Machine learning practitioner focused on real-time computer vision, on-device facial recognition algorithms, liveness verification, and privacy-preserving AI models.',
      avatarInitial: 'MH',
      skills: ['Computer Vision', 'On-Device ML', 'Liveness Detection', 'AI Integration'],
      gradient: 'from-[#E0A21B] to-[#E9C46A]',
    },
    {
      name: 'Waqar Ahmad',
      role: 'Full-Stack Engineering & Cloud Infrastructure',
      bio: 'Versatile full-stack engineer adept in modern cloud ecosystems, secure role-gated backend APIs, real-time messaging pipelines, and database optimization.',
      avatarInitial: 'WA',
      skills: ['Full-Stack Next.js', 'Role Security', 'MongoDB Atlas', 'Real-time APIs'],
      gradient: 'from-[#128A6B] to-[#0F7A5F]',
    },
  ];

  return (
    <div className="relative py-12 sm:py-20 overflow-hidden bg-[#EDF1EE] text-[#101C18]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0F7A5F]/10 border border-[#0F7A5F]/30 rounded-full text-xs font-bold text-[#0F7A5F] uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            Our Mission & Purpose
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-[#101C18] tracking-tight">
            Crafting Software That <span className="text-[#0F7A5F]">Empowers Institutions</span>
          </h1>

          <p className="text-neutral-600 text-base sm:text-lg leading-relaxed font-medium">
            Skolvo was built on a simple conviction: modern software should be private by design, role-secure, and driven by intelligent automation.
          </p>
        </div>

        {/* Company Story Section */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-neutral-200 shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#E0A21B]">
                The Skolvo Story
              </span>

              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#101C18]">
                From Practical Need to Next-Gen Product Suite
              </h2>

              <p className="text-neutral-600 text-sm leading-relaxed font-medium">
                Educational institutions and modern businesses are flooded with bloated legacy software that suffers from security loopholes, complex user interfaces, and manual overhead.
              </p>

              <p className="text-neutral-600 text-sm leading-relaxed font-medium">
                Skolvo is building a suite of practical, specialized software products starting with <strong className="text-[#101C18]">CampusNova</strong>. We combine touchless biometric liveness detection, automated WhatsApp reminders, and autonomous AI assistants into one seamless platform.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-neutral-700">
                <span className="flex items-center gap-1.5 px-3 py-1 bg-[#E2E9E4] border border-neutral-200 rounded-full">
                  <ShieldCheck className="w-4 h-4 text-[#0F7A5F]" /> Privacy-First Architecture
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 bg-[#E2E9E4] border border-neutral-200 rounded-full">
                  <Bot className="w-4 h-4 text-[#0F7A5F]" /> Production LLM & Agentic Systems
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#E2E9E4] border border-neutral-200/80 space-y-2">
                <Code2 className="w-6 h-6 text-[#0F7A5F]" />
                <h4 className="text-sm font-bold text-[#101C18]">Clean Code</h4>
                <p className="text-xs text-neutral-500 font-medium">Strictly modular, extensible architecture.</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#E2E9E4] border border-neutral-200/80 space-y-2">
                <Cpu className="w-6 h-6 text-[#E0A21B]" />
                <h4 className="text-sm font-bold text-[#101C18]">On-Device AI</h4>
                <p className="text-xs text-neutral-500 font-medium">Zero cloud facial storage for maximum privacy.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Showcase Section */}
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F7A5F]">
              Engineering Excellence
            </span>
            <h2 className="text-3xl font-extrabold font-display text-[#101C18]">
              Meet the Team Behind Skolvo
            </h2>
            <p className="text-neutral-600 text-sm font-medium">
              Our core team brings together expertise in generative AI systems, machine learning, and cloud software engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="group relative rounded-3xl bg-white border border-neutral-200 hover:border-[#0F7A5F]/50 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-xl"
              >
                <div>
                  {/* Avatar Icon */}
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0F7A5F] to-[#E0A21B] p-0.5 shadow-md flex items-center justify-center"
                    >
                      <div className="w-full h-full bg-[#EDF1EE] rounded-[14px] flex items-center justify-center text-xl font-extrabold font-display text-[#101C18]">
                        {member.avatarInitial}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold font-display text-[#101C18] group-hover:text-[#0F7A5F] transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-xs text-[#E0A21B] font-extrabold mt-0.5">{member.role}</p>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-600 leading-relaxed mb-6 font-medium">{member.bio}</p>

                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                      Core Specializations
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {member.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 bg-[#E2E9E4] border border-neutral-200 rounded-lg text-[11px] text-neutral-700 font-semibold"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-neutral-100 flex items-center gap-3 text-neutral-500">
                  <a
                    href="#"
                    className="p-2 bg-[#E2E9E4] rounded-lg hover:text-[#101C18] hover:bg-neutral-200 transition-colors"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    className="p-2 bg-[#E2E9E4] rounded-lg hover:text-[#101C18] hover:bg-neutral-200 transition-colors"
                    aria-label="Twitter Profile"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a
                    href="mailto:support@skolvo.online"
                    className="p-2 bg-[#E2E9E4] rounded-lg hover:text-[#101C18] hover:bg-neutral-200 transition-colors"
                    aria-label="Email Contact"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Join CTA */}
        <div className="text-center pt-4">
          <button
            onClick={() => setIsWaitlistOpen(true)}
            className="px-8 py-4 rounded-full bg-[#101C18] hover:bg-black text-white font-bold text-sm shadow-lg transition-all inline-flex items-center gap-2"
          >
            Connect With Our Team & Join Waitlist
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />
    </div>
  );
}
