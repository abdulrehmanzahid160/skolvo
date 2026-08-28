'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowRight, BookOpen, Braces, Check, CircleDot, Database, Fingerprint,
  LockKeyhole, Radar, ScanSearch, ShieldCheck,
} from 'lucide-react';
import StudioSignal from '@/components/hero/StudioSignal';
import AgentAnnouncement from '@/components/agent/AgentAnnouncement';
import { useWaitlist } from '@/components/waitlist/WaitlistProvider';

const ease = [0.22, 1, 0.36, 1] as const;
const journal = [
  { slug: 'facts-before-fluency', index: '01', tag: 'Regulatory intelligence', title: 'Facts before fluency', summary: 'Why SignalWatch separates source facts, model ordering, and final rendering.' },
  { slug: 'a-face-is-not-a-password', index: '02', tag: 'Privacy engineering', title: 'A face is not a password', summary: 'The product boundary we use when prototyping biometric attendance.' },
  { slug: 'what-early-access-means', index: '03', tag: 'Studio notes', title: 'What “early access” means here', summary: 'A plain-language status note: what exists, what is being tested, and what is not live.' },
];

export default function HomePage() {
  const reduce = useReducedMotion();
  const { openWaitlist } = useWaitlist();

  return (
    <>
      <AgentAnnouncement />
      <section className="studio-hero">
        <div className="studio-hero__noise" aria-hidden />
        <div className="studio-shell studio-hero__inner">
          <div className="studio-hero__copy">
            <motion.div className="studio-eyebrow studio-eyebrow--light" initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
              <span>SKOLVO / PRODUCT STUDIO</span><span>PAKISTAN · BUILDING IN PUBLIC</span>
            </motion.div>
            <h1 className="studio-hero__title" aria-label="Software with evidence built in">
              {['Software', 'with evidence', 'built in.'].map((line, index) => (
                <span className={index === 1 ? 'is-outline' : ''} key={line}>
                  <motion.i initial={reduce ? false : { y: '110%', rotate: 2 }} animate={{ y: 0, rotate: 0 }} transition={{ duration: 0.85, delay: 0.12 + index * 0.09, ease }}>{line}</motion.i>
                </span>
              ))}
            </h1>
            <motion.div className="studio-hero__intro" initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.52, ease }}>
              <p>Skolvo is a small product studio working on three focused systems: regulatory intelligence, privacy-conscious academy operations, and a more deliberate job opportunity workflow.</p>
              <div className="studio-actions">
                <a href="#products" className="studio-button studio-button--light">Explore the work <ArrowRight aria-hidden /></a>
                <Link href="/journal" className="studio-text-link studio-text-link--light">Read the build journal <BookOpen aria-hidden /></Link>
              </div>
            </motion.div>
          </div>
          <motion.div className="studio-hero__visual" initial={reduce ? false : { opacity: 0, scale: 0.96, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.38, ease }}><StudioSignal /></motion.div>
        </div>
        <div className="truth-rail" aria-label="Product principles">
          <motion.div animate={reduce ? undefined : { x: ['0%', '-50%'] }} transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}>
            {[0, 1].map((copy) => <span key={copy} aria-hidden={copy === 1}><i>01</i> SOURCES BEFORE SUMMARIES <b>•</b><i>02</i> PRIVACY BEFORE CONVENIENCE <b>•</b><i>03</i> STATUS BEFORE SALES COPY <b>•</b></span>)}
          </motion.div>
        </div>
      </section>

      <section className="studio-intro">
        <div className="studio-shell studio-intro__grid">
          <RevealBlock className="studio-intro__index"><span>00</span><p>THE THESIS</p></RevealBlock>
          <RevealBlock className="studio-intro__statement" delay={0.08}><p>High-stakes software should show its work. Not after something goes wrong—while a person is deciding what to trust.</p></RevealBlock>
          <RevealBlock className="studio-intro__note" delay={0.16}><CircleDot aria-hidden /><p>All three products are under development. This site distinguishes implemented workflows, prototypes, and intended behaviour.</p></RevealBlock>
        </div>
      </section>

      <section id="products" className="product-chapter product-chapter--watchdog">
        <div className="studio-shell">
          <ProductHeading number="01" label="REGULATORY INTELLIGENCE" status="VALIDATION BUILD" title={<>SignalWatch<span>®</span></>} description="A focused workspace for independent medical-device consultants who need to monitor public FDA activity across several clients without mixing their watch terms or evidence." />
          <div className="product-story">
            <RevealBlock className="product-story__copy">
              <p className="product-lede">The core idea is deliberately narrow: collect public FDA records, match them to a consultant&apos;s watch terms, preserve the sources, and prepare a reviewable brief.</p>
              <ul className="product-facts">
                <li><Check aria-hidden /> Public FDA records remain the source of factual claims.</li>
                <li><Check aria-hidden /> Client watch terms and alert feeds are separated.</li>
                <li><Check aria-hidden /> Generated briefs are checked against stored source facts.</li>
              </ul>
              <div className="product-disclosure"><strong>CURRENT LIMIT</strong><p>The pipeline has been demonstrated on historical data. Scheduled production monitoring is not currently running, and the product has no paying customers.</p></div>
              <div className="studio-actions">
                <Link href="/watchdog" className="studio-button">Open product brief <ArrowRight aria-hidden /></Link>
                <button className="studio-text-link" onClick={() => openWaitlist('SignalWatch')}>Join validation <CircleDot aria-hidden /></button>
              </div>
            </RevealBlock>
            <RevealBlock className="workflow-board" delay={0.1}>
              <div className="workflow-board__top"><span>PIPELINE / REVIEW MODE</span><span>ILLUSTRATIVE INTERFACE</span></div>
              <FlowDiagram color="amber" steps={[["01","INGEST","Public records"],["02","MATCH","Watch terms"],["03","VERIFY","Fact boundary"],["04","REVIEW","Consultant brief"]]} />
              <div className="workflow-board__result"><Radar aria-hidden /><div><span>OUTPUT</span><strong>Evidence-linked review queue</strong></div><span className="status-chip status-chip--amber">NOT ADVICE</span></div>
            </RevealBlock>
          </div>
        </div>
      </section>

      <section className="product-chapter product-chapter--campus">
        <div className="studio-shell">
          <ProductHeading number="02" label="ACADEMY OPERATIONS" status="PRIVATE PROTOTYPE" title={<>CampusNova<span>®</span></>} description="A prototype operations layer for academies: attendance, parent communication, and fee records, designed around an on-device biometric boundary." dark />
          <div className="product-story product-story--reverse">
            <RevealBlock className="workflow-board workflow-board--dark" delay={0.1}>
              <div className="workflow-board__top"><span>PRIVACY BOUNDARY / PROTOTYPE</span><span>NO PERFORMANCE CLAIM</span></div>
              <div className="privacy-orbit">
                <motion.div className="privacy-orbit__ring privacy-orbit__ring--outer" animate={reduce ? undefined : { rotate: 360 }} transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}><span>DEVICE</span><span>LOCAL</span><span>CONSENT</span></motion.div>
                <motion.div className="privacy-orbit__ring privacy-orbit__ring--inner" animate={reduce ? undefined : { rotate: -360 }} transition={{ duration: 16, repeat: Infinity, ease: 'linear' }} />
                <div className="privacy-orbit__core"><Fingerprint aria-hidden /><span>FACE DATA</span><strong>STAYS LOCAL</strong></div>
              </div>
              <div className="workflow-board__result"><LockKeyhole aria-hidden /><div><span>DESIGN BOUNDARY</span><strong>Attendance event, not a cloud photo archive</strong></div></div>
            </RevealBlock>
            <RevealBlock className="product-story__copy">
              <p className="product-lede">CampusNova is being shaped around one constraint: biometric convenience does not justify creating a central photo collection.</p>
              <ul className="product-facts product-facts--dark">
                <li><Fingerprint aria-hidden /> Biometric matching is intended to run on the device.</li>
                <li><ShieldCheck aria-hidden /> Roles and invitations define who can access academy records.</li>
                <li><Braces aria-hidden /> Attendance, messaging, and fee flows are being prototyped together.</li>
              </ul>
              <div className="product-disclosure product-disclosure--dark"><strong>CURRENT LIMIT</strong><p>CampusNova is not publicly available. Timing, accuracy, pricing, and launch claims will not be published until they can be supported by testing.</p></div>
              <div className="studio-actions">
                <button className="studio-button studio-button--light" onClick={() => openWaitlist('CampusNova')}>Register interest <ArrowRight aria-hidden /></button>
                <Link href="/journal/a-face-is-not-a-password" className="studio-text-link studio-text-link--light">Read the privacy note <BookOpen aria-hidden /></Link>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      <section className="product-chapter product-chapter--agent">
        <div className="studio-shell">
          <ProductHeading number="03" label="JOB OPPORTUNITY WORKSPACE" status="COMING SOON" title={<>Skolvo Agent</>} description="An autonomous job discovery and application workspace being developed to help users find, evaluate, prepare, and track opportunities." />
          <div className="product-story">
            <RevealBlock className="product-story__copy">
              <p className="product-lede">Skolvo Agent is being built to make the work between discovering a role and deciding what to do next more focused and visible.</p>
              <ul className="product-facts">
                <li><Check aria-hidden /> Discover and review potentially relevant opportunities.</li>
                <li><Check aria-hidden /> Consider job fit and eligibility against a user-provided profile.</li>
                <li><Check aria-hidden /> Prepare workflows, track progress, and surface actions needing attention.</li>
              </ul>
              <div className="product-disclosure"><strong>CURRENT LIMIT</strong><p>Skolvo Agent is not publicly available. The planned workflow is still being developed, and no launch date or automatic application submission claim is being made.</p></div>
              <div className="studio-actions">
                <Link href="/agent" className="studio-button">Explore Skolvo Agent <ArrowRight aria-hidden /></Link>
              </div>
            </RevealBlock>
            <RevealBlock className="workflow-board" delay={0.1}>
              <div className="workflow-board__top"><span>PLANNED WORKFLOW</span><span>CONCEPT / NOT LIVE</span></div>
              <FlowDiagram color="green" steps={[["01","DISCOVER","Relevant roles"],["02","EVALUATE","Fit and eligibility"],["03","PREPARE","Application work"],["04","TRACK","Next actions"]]} />
              <div className="workflow-board__result"><CircleDot aria-hidden /><div><span>STATUS</span><strong>In development</strong></div><span className="status-chip status-chip--green">COMING SOON</span></div>
            </RevealBlock>
          </div>
        </div>
      </section>

      <section className="principles-section">
        <div className="studio-shell">
          <div className="section-masthead"><span>04 / OPERATING SYSTEM</span><h2>Three rules.<br />Every build.</h2></div>
          <div className="principle-stack">
            {[
              ['01', 'Make the boundary visible.', 'Show where source data ends, derived data begins, and a human decision is still required.', Database],
              ['02', 'State the product’s real stage.', 'Prototype, validation build, and production are different promises. The interface should say which one it is.', CircleDot],
              ['03', 'Motion must explain something.', 'A scan, handoff, or state change can move. Decoration that competes with the work does not earn runtime.', ScanSearch],
            ].map(([number, title, body, Icon], index) => {
              const PrincipleIcon = Icon as typeof Database;
              return <motion.article key={number as string} className="principle-card" initial={reduce ? false : { opacity: 0, y: 42, rotate: index % 2 ? 1 : -1 }} whileInView={{ opacity: 1, y: 0, rotate: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, delay: index * 0.08, ease }} whileHover={reduce ? undefined : { y: -8, rotate: index === 1 ? 0.4 : -0.4 }}><span>{number as string}</span><PrincipleIcon aria-hidden /><h3>{title as string}</h3><p>{body as string}</p></motion.article>;
            })}
          </div>
        </div>
      </section>

      <section className="journal-section">
        <div className="studio-shell">
          <div className="section-masthead section-masthead--row"><div><span>05 / BUILD JOURNAL</span><h2>Notes from<br />inside the work.</h2></div><Link href="/journal" className="studio-button">All journal entries <ArrowRight aria-hidden /></Link></div>
          <div className="journal-grid">
            {journal.map((post, index) => <motion.article key={post.slug} className="journal-card" initial={reduce ? false : { opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.6, delay: index * 0.08, ease }} whileHover={reduce ? undefined : { y: -8 }}><Link href={`/journal/${post.slug}`} aria-label={`Read ${post.title}`}><div><span>{post.index}</span><span>{post.tag}</span></div><h3>{post.title}</h3><p>{post.summary}</p><ArrowRight aria-hidden /></Link></motion.article>)}
          </div>
        </div>
      </section>

      <section className="studio-close">
        <div className="studio-shell studio-close__grid">
          <div><span>OPEN CHANNEL / 2026</span><h2>Bring us the difficult part.</h2></div>
          <div><p>If you work close to one of these problems, tell us where the current process breaks. Product access follows validation—not the other way around.</p><div className="studio-actions"><Link href="/contact" className="studio-button studio-button--light">Start a conversation <ArrowRight aria-hidden /></Link><Link href="/about" className="studio-text-link studio-text-link--light">Meet the studio</Link></div></div>
        </div>
      </section>
    </>
  );
}

function RevealBlock({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, delay, ease }}>{children}</motion.div>;
}

function ProductHeading({ number, label, status, title, description, dark = false }: { number: string; label: string; status: string; title: React.ReactNode; description: string; dark?: boolean }) {
  return <RevealBlock className={`product-heading ${dark ? 'product-heading--dark' : ''}`}><div className="product-heading__meta"><span>{number} / {label}</span><span>{status}</span></div><div className="product-heading__main"><h2>{title}</h2><p>{description}</p></div></RevealBlock>;
}

function FlowDiagram({ steps, color }: { steps: string[][]; color: 'amber' | 'green' }) {
  const reduce = useReducedMotion();
  return <div className={`flow-diagram flow-diagram--${color}`}>{steps.map(([number, label, value], index) => <div className="flow-diagram__step" key={number}><div><span>{number}</span><i>{label}</i></div><strong>{value}</strong>{index < steps.length - 1 && <span className="flow-diagram__line" aria-hidden>{!reduce && <motion.i animate={{ x: ['-20%', '420%'] }} transition={{ duration: 2.2, repeat: Infinity, delay: index * 0.35, ease: 'linear' }} />}</span>}</div>)}</div>;
}
