import Link from 'next/link';
import { ArrowDown, ArrowRight, ArrowUpRight, CircleDot, Database, ScanSearch } from 'lucide-react';
import AgentAnnouncement from '@/components/agent/AgentAnnouncement';
import Reveal from '@/components/home/Reveal';
import { serviceCategories, serviceNiches } from '@/lib/services';

const products = [
  {
    name: 'SignalWatch',
    mark: true,
    stage: 'Validation build',
    description:
      "Monitors public FDA activity for independent medical-device consultants, matched to each client's watch terms, with the source kept for every claim.",
    note: 'Demonstrated on historical data. Not yet monitoring in production.',
    price: 'Planned from $29/month per monitoring service',
    href: '/watchdog',
    link: 'Read the product brief',
  },
  {
    name: 'CampusNova',
    mark: true,
    stage: 'Private prototype',
    description:
      'Student, teacher, and fee records for academies, with receipts and reports. Parent messages and on-device attendance are still prototype work.',
    note: 'Not publicly available yet.',
    price: 'Planned from $15/month',
    href: '/campusnova',
    link: 'See CampusNova',
  },
];

const agentSteps = [
  ['Discover', 'Relevant roles'],
  ['Evaluate', 'Fit and eligibility'],
  ['Prepare', 'Application work'],
  ['Track', 'Next actions'],
];

const rules = [
  { Icon: Database, title: 'Make the boundary visible.', body: 'Show where source data ends, derived data begins, and a human decision is still required.' },
  { Icon: CircleDot, title: 'State the real stage.', body: 'Prototype, validation build, and production are different promises. The interface should say which one it is.' },
  { Icon: ScanSearch, title: 'Motion must explain something.', body: 'A scan, a handoff, or a state change can move. Decoration that competes with the work does not.' },
];

const journal = [
  { slug: 'facts-before-fluency', tag: 'Regulatory intelligence', title: 'Facts before fluency', summary: 'Why SignalWatch separates source facts, model ordering, and final rendering.' },
  { slug: 'a-face-is-not-a-password', tag: 'Privacy engineering', title: 'A face is not a password', summary: 'The product boundary we use when prototyping biometric attendance.' },
  { slug: 'what-early-access-means', tag: 'Studio notes', title: 'What “early access” means here', summary: 'A plain-language status note: what exists, what is being tested, and what is not live.' },
];

export default function HomePage() {
  return (
    <div className="home">
      <noscript><style>{'.home [style*="opacity:0"]{opacity:1!important;transform:none!important}'}</style></noscript>
      <AgentAnnouncement />

      <section className="home-hero">
        <div className="studio-shell">
          <Reveal onMount>
            <h1>
              <span>Products we own.</span>
              <span>Software we build for you.</span>
            </h1>
          </Reveal>
          <Reveal onMount delay={0.12} className="home-hero__body">
            <p>Skolvo is a small software studio. We run our own products and build websites and workflow tools for businesses.</p>
            <div className="studio-actions">
              <Link href="/contact?project=focused-prototype" className="studio-button studio-button--light">Discuss a project <ArrowRight aria-hidden /></Link>
              <a href="#products" className="studio-text-link studio-text-link--light">See our products <ArrowDown aria-hidden /></a>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="products" className="home-section" aria-labelledby="home-products-title">
        <div className="studio-shell">
          <Reveal>
            <h2 id="home-products-title">Products we own</h2>
            <p className="home-lede">Each one states plainly what works today and what is still being tested.</p>
          </Reveal>
          <div className="home-products__grid">
            <Reveal className="home-product home-product--featured">
              <span className="home-label home-product__stage"><i aria-hidden /> Live</span>
              <h3>Skolvo Agent</h3>
              <p>A workspace for your job search: find relevant roles, check fit and eligibility against your profile, prepare applications, and track what needs attention.</p>
              <ul className="home-product__steps">
                {agentSteps.map(([verb, detail]) => <li key={verb}><strong>{verb}</strong><span>{detail}</span></li>)}
              </ul>
              <div className="home-product__meta">
                Free allowance, no card required. When paid access opens: $9/month, or $4/month for verified students.
                <div className="studio-actions">
                  <a href="https://agent.skolvo.online" className="studio-button studio-button--light">Open Skolvo Agent <ArrowUpRight aria-hidden /></a>
                  <Link href="/agent" className="studio-text-link studio-text-link--light">Product details</Link>
                </div>
              </div>
            </Reveal>
            {products.map((product, index) => (
              <Reveal key={product.name} className="home-product" delay={0.08 * (index + 1)}>
                <span className="home-label home-product__stage">{product.stage}</span>
                <h3>{product.name}{product.mark && <sup>®</sup>}</h3>
                <p>{product.description}</p>
                <div className="home-product__meta">
                  {product.note}
                  <strong>{product.price}</strong>
                </div>
                <Link href={product.href} className="home-link">{product.link} <ArrowRight aria-hidden /></Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section" aria-labelledby="home-services-title">
        <div className="studio-shell home-services__grid">
          <Reveal className="home-services__intro">
            <h2 id="home-services-title">Software we build for you</h2>
            <p className="home-lede">Websites, workflow tools, and focused prototypes for businesses. We start with a small first version you can test and use.</p>
            <Link href="/services" className="home-link">Services and pricing <ArrowRight aria-hidden /></Link>
          </Reveal>
          <Reveal delay={0.08}>
            <ul className="home-services__list">
              {serviceCategories.map((service) => (
                <li key={service.title}>
                  <Link href="/services#focused-first-version">
                    <div><h3>{service.title}</h3><p>{service.description}</p></div>
                    <ArrowRight aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="home-industries">
              <h3>Where we can start</h3>
              <p>Areas we can build for, not a list of past clients.</p>
              <ul>
                {serviceNiches.map((niche) => <li key={niche.id}><Link href={`/services#${niche.id}`}>{niche.title}</Link></li>)}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="home-section home-approach" aria-labelledby="home-approach-title">
        <div className="studio-shell">
          <Reveal>
            <h2 id="home-approach-title">Software should show its work.</h2>
            <p className="home-lede">Not after something goes wrong, but while a person is still deciding what to trust. Three rules apply to every build.</p>
          </Reveal>
          <Reveal delay={0.08}>
            <ul className="home-approach__rules">
              {rules.map(({ Icon, title, body }) => (
                <li key={title}><Icon aria-hidden /><h3>{title}</h3><p>{body}</p></li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="home-section" aria-labelledby="home-journal-title">
        <div className="studio-shell">
          <Reveal className="home-journal__head">
            <h2 id="home-journal-title">From the build journal</h2>
            <Link href="/journal" className="home-link">All entries <ArrowRight aria-hidden /></Link>
          </Reveal>
          <Reveal delay={0.08}>
            <ul className="home-journal__list">
              {journal.map((post) => (
                <li key={post.slug}>
                  <Link href={`/journal/${post.slug}`}>
                    <span className="home-label">{post.tag}</span>
                    <div><h3>{post.title}</h3><p>{post.summary}</p></div>
                    <ArrowRight aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="home-close" aria-labelledby="home-close-title">
        <div className="studio-shell home-close__grid">
          <Reveal><h2 id="home-close-title">Bring us the difficult part.</h2></Reveal>
          <Reveal delay={0.08}>
            <p>Tell us where your current process breaks, and we will tell you honestly whether a small first version can help.</p>
            <div className="studio-actions">
              <Link href="/contact?project=focused-prototype" className="studio-button studio-button--light">Discuss a project <ArrowRight aria-hidden /></Link>
              <Link href="/about" className="studio-text-link studio-text-link--light">Meet the studio</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
