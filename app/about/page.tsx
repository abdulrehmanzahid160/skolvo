'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, ShieldCheck, Code2, Cpu, Smartphone, Sparkles, Linkedin, Twitter, Mail, ArrowRight } from 'lucide-react';
import WaitlistModal from '@/components/WaitlistModal';

export default function AboutPage() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  const teamMembers = [
    {
      name: 'Abdul Rehman',
      role: 'Mobile Engineering & System Architecture',
      bio: 'Experienced mobile systems engineer specializing in high-performance cross-platform application design, secure client-side state synchronization, and scalable SaaS infrastructure.',
      avatarInitial: 'AR',
      skills: ['Flutter & Cross-Platform', 'Mobile Architecture', 'State Management', 'SaaS Systems'],
      gradient: 'from-[#6D5CFB] to-[#5343E0]',
    },
    {
      name: 'Muhammad Hammad',
      role: 'Machine Learning & Biometric Intelligence',
      bio: 'Machine learning practitioner focused on real-time computer vision, on-device facial recognition algorithms, liveness verification, and privacy-preserving AI models.',
      avatarInitial: 'MH',
      skills: ['Computer Vision', 'On-Device ML', 'Liveness Detection', 'AI Integration'],
      gradient: 'from-[#FF6B4A] to-[#FF856B]',
    },
    {
      name: 'Waqar Ahmad',
      role: 'Full-Stack Engineering & Cloud Infrastructure',
      bio: 'Versatile full-stack engineer adept in modern cloud ecosystems, secure role-gated backend APIs, real-time messaging pipelines, and database optimization.',
      avatarInitial: 'WA',
      skills: ['Full-Stack Next.js', 'Role Security', 'MongoDB Atlas', 'Real-time APIs'],
      gradient: 'from-[#8A7DFF] to-[#6D5CFB]',
    },
  ];

  return (
    <div className="relative py-12 sm:py-20 overflow-hidden bg-[#FDF6F0] text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E6357F]/10 border border-[#E6357F]/30 rounded-full text-xs font-bold text-[#E6357F] uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            Our Mission & Purpose
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-[#1A1A1A] tracking-tight">
            Crafting Software That <span className="text-[#E6357F]">Empowers Institutions</span>
          </h1>

          <p className="text-neutral-600 text-base sm:text-lg leading-relaxed font-medium">
            Skolvo was built on a simple conviction: modern software should be private by design, role-secure, and driven by intelligent automation.
          </p>
        </div>

        {/* Company Story Section */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-neutral-200 shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#E8622C]">
                The Skolvo Story
              </span>

              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#1A1A1A]">
                From Practical Need to Next-Gen Product Suite
              </h2>

              <p className="text-neutral-600 text-sm leading-relaxed font-medium">
                Educational institutions and modern businesses are flooded with bloated legacy software that suffers from security loopholes, complex user interfaces, and manual overhead.
              </p>

              <p className="text-neutral-600 text-sm leading-relaxed font-medium">
                Skolvo is building a suite of practical, specialized software products starting with <strong className="text-[#1A1A1A]">CampusNova</strong>. We combine touchless biometric liveness detection, automated WhatsApp reminders, and autonomous AI assistants into one seamless platform.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-neutral-700">
                <span className="flex items-center gap-1.5 px-3 py-1 bg-[#FAF4F0] border border-neutral-200 rounded-full">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> Privacy-First Architecture
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 bg-[#FAF4F0] border border-neutral-200 rounded-full">
                  <Smartphone className="w-4 h-4 text-[#E6357F]" /> Native Cross-Platform Performance
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#FAF4F0] border border-neutral-200/80 space-y-2">
                <Code2 className="w-6 h-6 text-[#E6357F]" />
                <h4 className="text-sm font-bold text-[#1A1A1A]">Clean Code</h4>
                <p className="text-xs text-neutral-500 font-medium">Strictly modular, extensible architecture.</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAF4F0] border border-neutral-200/80 space-y-2">
                <Cpu className="w-6 h-6 text-[#E8622C]" />
                <h4 className="text-sm font-bold text-[#1A1A1A]">On-Device AI</h4>
                <p className="text-xs text-neutral-500 font-medium">Zero cloud facial storage for maximum privacy.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Showcase Section */}
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E6357F]">
              Engineering Excellence
            </span>
            <h2 className="text-3xl font-extrabold font-display text-[#1A1A1A]">
              Meet the Team Behind Skolvo
            </h2>
            <p className="text-neutral-600 text-sm font-medium">
              Our core team brings together expertise in mobile development, machine learning, and cloud software engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="group relative rounded-3xl bg-white border border-neutral-200 hover:border-[#E6357F]/50 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-xl"
              >
                <div>
                  {/* Avatar Icon */}
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#E6357F] to-[#E8622C] p-0.5 shadow-md flex items-center justify-center"
                    >
                      <div className="w-full h-full bg-[#FDF6F0] rounded-[14px] flex items-center justify-center text-xl font-extrabold font-display text-[#1A1A1A]">
                        {member.avatarInitial}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold font-display text-[#1A1A1A] group-hover:text-[#E6357F] transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-xs text-[#E8622C] font-extrabold mt-0.5">{member.role}</p>
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
                          className="px-2.5 py-1 bg-[#FAF4F0] border border-neutral-200 rounded-lg text-[11px] text-neutral-700 font-semibold"
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
                    className="p-2 bg-[#FAF4F0] rounded-lg hover:text-[#1A1A1A] hover:bg-neutral-200 transition-colors"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    className="p-2 bg-[#FAF4F0] rounded-lg hover:text-[#1A1A1A] hover:bg-neutral-200 transition-colors"
                    aria-label="Twitter Profile"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a
                    href="mailto:support@skolvo.online"
                    className="p-2 bg-[#FAF4F0] rounded-lg hover:text-[#1A1A1A] hover:bg-neutral-200 transition-colors"
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
            className="px-8 py-4 rounded-full bg-[#1A1A1A] hover:bg-black text-white font-bold text-sm shadow-lg transition-all inline-flex items-center gap-2"
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
