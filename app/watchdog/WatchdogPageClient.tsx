'use client';

import Link from 'next/link';
import { ArrowRight, Check, CircleDot, Database, FileCheck2, Radar, ShieldCheck, TriangleAlert } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useWaitlist } from '@/components/waitlist/WaitlistProvider';
import ProductOffer from '@/components/commercial/ProductOffer';

const sources = ['510(k) clearances', 'PMA decisions', 'Recalls', 'Enforcement actions'];

export default function WatchdogPageClient() {
  const reduce = useReducedMotion();
  const { openWaitlist } = useWaitlist();
  return (
    <div className="watchdog-page">
      <header className="watchdog-hero">
        <div className="studio-shell">
          <div className="studio-eyebrow studio-eyebrow--light"><span>SKOLVO / SIGNALWATCH</span><span>VALIDATION BUILD · NOT PRODUCTION MONITORING</span></div>
          <div className="watchdog-hero__grid">
            <div>
              <motion.p initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>REGULATORY INTELLIGENCE / 01</motion.p>
              <h1>{['The FDA record,', 'made reviewable.'].map((line, index) => <span key={line}><motion.i initial={reduce ? false : { y: '110%' }} animate={{ y: 0 }} transition={{ duration: .8, delay: .1 + index * .1, ease: [0.22,1,0.36,1] }}>{line}</motion.i></span>)}</h1>
              <motion.div initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .45, duration: .6 }}><p>SignalWatch is a working validation build for independent medical-device consultants. It turns public FDA records into source-linked alerts and reviewable briefs across separate client workspaces.</p><div className="studio-actions"><button className="studio-button studio-button--light" onClick={() => openWaitlist('SignalWatch validation')}>Join validation <ArrowRight /></button><Link href="/journal/facts-before-fluency" className="studio-text-link studio-text-link--light">Read the architecture note</Link></div></motion.div>
            </div>
            <SignalTrace reduce={Boolean(reduce)} />
          </div>
        </div>
      </header>
      <div className="studio-shell"><ProductOffer label="SignalWatch" audience="Independent medical-device regulatory consultants reviewing public FDA activity across clients." problem="Manual source checking is repetitive, while each client still needs a separate, reviewable evidence trail." receives={['Client-specific watch configurations', 'Matched 510(k), MAUDE, or Enforcement record review', 'Source-linked intelligence reports for professional review']} freeAllowance="1 sample historical intelligence report per service — no card required." price="$50/month per selected monitoring service" status="Historical-data validation build; scheduled production monitoring is not running." /></div>

      <section className="watchdog-status studio-shell">
        <div className="section-masthead"><span>STATUS / 24 AUG 2026</span><h2>What exists.<br />What does not.</h2></div>
        <div className="watchdog-status__grid">
          <motion.div initial={reduce ? false : { opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}><Check /><span>DEMONSTRATED</span><h3>Data, matching, alerts, and briefing pipeline</h3><p>The repository contains a working ingestion and matching path tested against historical public FDA data.</p></motion.div>
          <motion.div initial={reduce ? false : { opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .08 }}><ShieldCheck /><span>DESIGNED BOUNDARY</span><h3>Source facts stay outside model authorship</h3><p>The model selects and orders from prepared facts; validation rejects references outside that set.</p></motion.div>
          <motion.div className="is-limit" initial={reduce ? false : { opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .16 }}><TriangleAlert /><span>NOT RUNNING</span><h3>Scheduled production monitoring</h3><p>The current data came from a historical backfill. A production scheduler and operating process still need deployment.</p></motion.div>
          <motion.div className="is-limit" initial={reduce ? false : { opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .24 }}><CircleDot /><span>NOT CLAIMED</span><h3>Customers, outcomes, or complete coverage</h3><p>There are no paying customers and no claim that every relevant regulatory event will always be found.</p></motion.div>
        </div>
      </section>

      <section className="watchdog-pipeline">
        <div className="studio-shell">
          <div className="watchdog-pipeline__intro"><span>THE WORKFLOW / 04 STAGES</span><h2>A brief is the end.<br />The trail comes first.</h2><p>Each stage has a narrower responsibility. That separation is the product’s main safety property.</p></div>
          <div className="watchdog-pipeline__steps">
            {[
              ['01', Database, 'Collect', 'Store records and their source identifiers.'],
              ['02', Radar, 'Match', 'Apply client-specific watch terms without crossing workspaces.'],
              ['03', ShieldCheck, 'Validate', 'Keep selected content inside the prepared fact set.'],
              ['04', FileCheck2, 'Render', 'Assemble a brief for professional review, not automatic advice.'],
            ].map(([number, Icon, title, body], index) => { const StepIcon = Icon as typeof Database; return <motion.article key={number as string} initial={reduce ? false : { opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .5 }} transition={{ delay: index * .08 }}><span>{number as string}</span><StepIcon /><h3>{title as string}</h3><p>{body as string}</p></motion.article>; })}
          </div>
        </div>
      </section>

      <section className="watchdog-sources studio-shell">
        <div><span>INPUT SURFACE</span><h2>Public records.<br />Visible provenance.</h2></div>
        <div>{sources.map((source, index) => <motion.div key={source} initial={reduce ? false : { opacity: 0, x: 25 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * .06 }}><span>0{index + 1}</span><strong>{source}</strong><ArrowRight /></motion.div>)}</div>
      </section>

      <section className="studio-close"><div className="studio-shell studio-close__grid"><div><span>VALIDATION / OPEN</span><h2>Test the premise, not the pitch.</h2></div><div><p>If you monitor FDA activity for clients, your workflow can tell us whether this product deserves to move from a validation build to a production service.</p><div className="studio-actions"><button className="studio-button studio-button--light" onClick={() => openWaitlist('SignalWatch validation')}>Register as a reviewer <ArrowRight /></button><Link href="/contact" className="studio-text-link studio-text-link--light">Ask a technical question</Link></div></div></div></section>
    </div>
  );
}

function SignalTrace({ reduce }: { reduce: boolean }) {
  return <motion.div className="signal-trace" initial={reduce ? false : { opacity: 0, scale: .95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8, delay: .3 }}><div className="signal-trace__top"><span>TRACE / ILLUSTRATIVE</span><span>FACT BOUNDARY ON</span></div><div className="signal-trace__radar"><div className="signal-trace__rings" />{!reduce && <motion.i animate={{ rotate: 360 }} transition={{ duration: 5, repeat: Infinity, ease: 'linear' }} />}{[['510(k)','12%','24%'],['RECALL','68%','35%'],['PMA','42%','72%']].map(([label,left,top], index) => <motion.span key={label} style={{ left, top }} animate={reduce ? undefined : { scale: [1,1.35,1], opacity: [.55,1,.55] }} transition={{ duration: 2, repeat: Infinity, delay: index * .5 }}>{label}</motion.span>)}</div><div className="signal-trace__bottom"><span><i /> SOURCE FOUND</span><span><i /> SCOPE MATCH</span><span><i /> HUMAN REVIEW</span></div></motion.div>;
}
