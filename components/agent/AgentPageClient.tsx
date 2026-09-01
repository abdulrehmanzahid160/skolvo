'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BellDot, Check, ClipboardList, Search, UserRoundCheck } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { EASE, Reveal, RevealGroup, RevealItem } from '@/components/motion/Primitives';
import ProductOffer from '@/components/commercial/ProductOffer';

const workflow = [
  { title: 'Discover relevant opportunities', body: 'The implemented workspace brings potentially relevant roles into a focused review flow.', icon: Search },
  { title: 'Evaluate fit and eligibility', body: 'Users can compare role requirements with the profile information they choose to provide.', icon: UserRoundCheck },
  { title: 'Prepare and track work', body: 'The workspace organizes application preparation and keeps opportunity status visible.', icon: ClipboardList },
  { title: 'Surface attention points', body: 'Actions that need a user decision remain explicit instead of disappearing into automation.', icon: BellDot },
];

export default function AgentPageClient() {
  const reduce = useReducedMotion();
  return (
    <>
      <section className="agent-hero">
        <div className="studio-hero__noise" aria-hidden />
        <div className="studio-shell agent-hero__grid">
          <div className="agent-hero__copy">
            <motion.div className="studio-eyebrow studio-eyebrow--light" initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: EASE }}><span>SKOLVO / AGENT</span><span>LIVE WEB APP</span></motion.div>
            <motion.p className="agent-hero__status" initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.08, ease: EASE }}>LIVE AT AGENT.SKOLVO.ONLINE</motion.p>
            <h1 className="agent-hero__title">
              {['A more intelligent way', 'to discover and manage', 'job opportunities.'].map((line, index) => (
                <span key={line} className="block overflow-hidden pb-[.08em]"><motion.i className="block not-italic" initial={reduce ? false : { y: '110%' }} animate={{ y: 0 }} transition={{ duration: 0.75, delay: 0.12 + index * 0.08, ease: EASE }}>{line}</motion.i></span>
              ))}
            </h1>
            <motion.p className="agent-hero__lede" initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.42, ease: EASE }}>Skolvo Agent is a live job-opportunity workspace designed to help people assess opportunities, prepare next steps, and keep the work visible.</motion.p>
            <motion.div className="studio-actions mt-7" initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5, ease: EASE }}>
              <a href="https://agent.skolvo.online" className="studio-button studio-button--light">Open Skolvo Agent <ArrowRight aria-hidden /></a>
              <Link href="/pricing#skolvo_agent" className="studio-text-link studio-text-link--light">View pricing</Link>
            </motion.div>
          </div>
          <motion.figure className="agent-hero__visual" initial={reduce ? false : { opacity: 0, scale: 0.975, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.28, ease: EASE }}>
            <div className="relative aspect-[1122/1402] w-full"><Image src="/skolvo-agent-promo.jpg" alt="Skolvo Agent concept visual showing job discovery, profile matching, and application preparation" fill priority sizes="(max-width: 767px) 100vw, 44vw" className="object-contain" /></div>
            <figcaption>PRODUCT VISUAL / PUBLIC WEB APP NOW LIVE</figcaption>
          </motion.figure>
        </div>
      </section>
      <div className="studio-shell"><ProductOffer label="Skolvo Agent" audience="Job seekers who want one place to assess opportunities and prepare application work." problem="Discovery, eligibility review, preparation, status, and user decisions are usually split across tools." receives={['Candidate profile and work-authorisation setup', 'Opportunity discovery with separate fit and eligibility review', 'Application preparation, validation, tracking, and an action queue']} freeAllowance="Core profile plus up to 3 prepared and tracked application workflows — no card required." price="$5/month Standard · $2/month for verified students" status="The public web app is live. Paid checkout and live external submission are available only when explicitly enabled inside the product." /></div>
      <section className="agent-purpose">
        <div className="studio-shell agent-purpose__grid">
          <Reveal className="agent-purpose__index"><span>01</span><p>THE PURPOSE</p></Reveal>
          <Reveal className="agent-purpose__statement" delay={0.08}><h2>One place to move from opportunity to informed action.</h2></Reveal>
          <Reveal className="agent-purpose__copy" delay={0.16}><p>The product organizes job discovery, evaluation, application preparation, and tracking without hiding the decisions that still need a person.</p></Reveal>
        </div>
      </section>
      <section className="agent-workflow">
        <div className="studio-shell">
          <div className="section-masthead"><span>02 / IMPLEMENTED WORKFLOW</span><h2>Built around the work<br />between finding and applying.</h2></div>
          <RevealGroup className="agent-workflow__grid">
            {workflow.map(({ title, body, icon: Icon }, index) => (
              <RevealItem key={title} className="agent-workflow__card"><div><span>0{index + 1}</span><Icon aria-hidden /></div><h3>{title}</h3><p>{body}</p></RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
      <section className="agent-boundary">
        <div className="studio-shell agent-boundary__grid">
          <Reveal><span>03 / CURRENT BOUNDARY</span><h2>Live now, with the limits visible.</h2></Reveal>
          <Reveal className="agent-boundary__copy" delay={0.1}>
            <ul><li><Check aria-hidden /> The public production deployment is available at agent.skolvo.online.</li><li><Check aria-hidden /> External application actions remain explicit and user-controlled.</li><li><Check aria-hidden /> Paid features are presented only when checkout is enabled in the app.</li></ul>
            <a href="https://agent.skolvo.online" className="studio-button studio-button--light">Launch the app <ArrowRight aria-hidden /></a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
