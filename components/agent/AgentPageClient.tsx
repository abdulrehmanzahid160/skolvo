'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BellDot, Check, ClipboardList, Search, UserRoundCheck } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { EASE, Reveal, RevealGroup, RevealItem } from '@/components/motion/Primitives';

const plannedWorkflow = [
  { title: 'Discover relevant opportunities', body: 'Skolvo Agent is being built to bring potentially relevant roles into a more focused review flow.', icon: Search },
  { title: 'Evaluate fit and eligibility', body: 'It will help users compare role requirements with the profile information they choose to provide.', icon: UserRoundCheck },
  { title: 'Prepare and track work', body: 'The planned workspace will organize application preparation and keep opportunity status visible.', icon: ClipboardList },
  { title: 'Surface attention points', body: 'Actions that need a user decision are intended to stay explicit instead of disappearing into automation.', icon: BellDot },
];

export default function AgentPageClient() {
  const reduce = useReducedMotion();
  return (
    <>
      <section className="agent-hero">
        <div className="studio-hero__noise" aria-hidden />
        <div className="studio-shell agent-hero__grid">
          <div className="agent-hero__copy">
            <motion.div className="studio-eyebrow studio-eyebrow--light" initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: EASE }}><span>SKOLVO / AGENT</span><span>COMING SOON</span></motion.div>
            <motion.p className="agent-hero__status" initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.08, ease: EASE }}>COMING SOON</motion.p>
            <h1 className="agent-hero__title">
              {['A more intelligent way', 'to discover and manage', 'job opportunities.'].map((line, index) => (
                <span key={line} className="block overflow-hidden pb-[.08em]"><motion.i className="block not-italic" initial={reduce ? false : { y: '110%' }} animate={{ y: 0 }} transition={{ duration: 0.75, delay: 0.12 + index * 0.08, ease: EASE }}>{line}</motion.i></span>
              ))}
            </h1>
            <motion.p className="agent-hero__lede" initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.42, ease: EASE }}>Skolvo Agent is being built as an autonomous job discovery and application workspace—designed to help people assess opportunities, prepare their next steps, and keep the work visible.</motion.p>
          </div>
          <motion.figure className="agent-hero__visual" initial={reduce ? false : { opacity: 0, scale: 0.975, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.28, ease: EASE }}>
            <div className="relative aspect-[1122/1402] w-full"><Image src="/skolvo-agent-promo.jpg" alt="Skolvo Agent concept visual showing job discovery, profile matching, and application preparation" fill priority sizes="(max-width: 767px) 100vw, 44vw" className="object-contain" /></div>
            <figcaption>PRODUCT CONCEPT VISUAL / CAPABILITIES ARE IN DEVELOPMENT</figcaption>
          </motion.figure>
        </div>
      </section>
      <section className="agent-purpose">
        <div className="studio-shell agent-purpose__grid">
          <Reveal className="agent-purpose__index"><span>01</span><p>THE PURPOSE</p></Reveal>
          <Reveal className="agent-purpose__statement" delay={0.08}><h2>One place to move from opportunity to informed action.</h2></Reveal>
          <Reveal className="agent-purpose__copy" delay={0.16}><p>The product will help organize job discovery, evaluation, application preparation, and tracking without hiding the decisions that still need a person.</p></Reveal>
        </div>
      </section>
      <section className="agent-workflow">
        <div className="studio-shell">
          <div className="section-masthead"><span>02 / PLANNED WORKFLOW</span><h2>Built around the work<br />between finding and applying.</h2></div>
          <RevealGroup className="agent-workflow__grid">
            {plannedWorkflow.map(({ title, body, icon: Icon }, index) => (
              <RevealItem key={title} className="agent-workflow__card"><div><span>0{index + 1}</span><Icon aria-hidden /></div><h3>{title}</h3><p>{body}</p></RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
      <section className="agent-boundary">
        <div className="studio-shell agent-boundary__grid">
          <Reveal><span>03 / CURRENT BOUNDARY</span><h2>Coming soon means not available yet.</h2></Reveal>
          <Reveal className="agent-boundary__copy" delay={0.1}>
            <ul><li><Check aria-hidden /> The product is still being developed.</li><li><Check aria-hidden /> Application submission is not presented as a currently available capability.</li><li><Check aria-hidden /> No launch date, pricing, or performance claims are being announced.</li></ul>
            <Link href="/#products" className="studio-button studio-button--light">Explore Skolvo products <ArrowRight aria-hidden /></Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
