import Link from 'next/link';
import { Unbounded } from 'next/font/google';
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import Chars from '@/components/home/Chars';
import HomeMotion from '@/components/home/HomeMotion';
import { serviceCategories, serviceNiches } from '@/lib/services';
import './home.css';

// Chunky, rounded display face for the homepage headlines.
const unbounded = Unbounded({ subsets: ['latin'], variable: '--font-unbounded', display: 'swap' });

// Each service gets its own colour "world".
const worldTheme = ['skh-world--pink', 'skh-world--lime', 'skh-world--cocoa'];

// Illustrations of the kind of work our tools do, not claims about past clients.
const chips = [
  { dot: 'purple', title: 'Artwork approved', detail: 'Print shop, proof v3' },
  { dot: 'pink', title: 'Reminder sent', detail: 'Invoice #1042, 7 days overdue' },
  { dot: 'lime', title: 'New enquiry', detail: 'Next step: call back today' },
  { dot: 'ink', title: 'Report ready', detail: 'Inspection, 24 photos' },
];

const products = [
  {
    name: 'Skolvo Agent',
    stage: 'Live',
    live: true,
    description: 'A workspace for your job search: find relevant roles, check fit against your profile, prepare applications, and track what needs attention.',
    note: 'Free allowance, no card required. When paid access opens: $9/month, or $4/month for verified students.',
    href: 'https://agent.skolvo.online',
    link: 'Open Skolvo Agent',
    external: true,
  },
  {
    name: 'SignalWatch',
    stage: 'Validation build',
    live: false,
    description: "Monitors public FDA activity for independent medical-device consultants, matched to each client's watch terms, with the source kept for every claim.",
    note: 'Demonstrated on historical data. Not yet monitoring in production.',
    href: '/watchdog',
    link: 'Read the product brief',
    external: false,
  },
  {
    name: 'CampusNova',
    stage: 'Private prototype',
    live: false,
    description: 'Student, teacher, and fee records for academies, with receipts and reports. Parent messages and on-device attendance are still prototype work.',
    note: 'Not publicly available yet.',
    href: '/campusnova',
    link: 'See CampusNova',
    external: false,
  },
];

const steps = [
  { title: 'Tell us the hard part', body: 'Answer a few questions about your business and the work that keeps slowing you down.' },
  { title: 'Get a small first version', body: 'We start with a focused first version you can test and use, not an oversized platform.' },
  { title: 'Grow it with real use', body: 'Then we improve what matters, based on how your team actually works with it.' },
];

const rules = [
  { title: 'Make the boundary visible.', body: 'Show where source data ends, derived data begins, and a human decision is still required.' },
  { title: 'State the real stage.', body: 'Prototype, validation build, and production are different promises. The interface should say which one it is.' },
];

const journal = [
  { slug: 'facts-before-fluency', tag: 'Regulatory intelligence', title: 'Facts before fluency', summary: 'Why SignalWatch separates source facts, model ordering, and final rendering.' },
  { slug: 'a-face-is-not-a-password', tag: 'Privacy engineering', title: 'A face is not a password', summary: 'The product boundary we use when prototyping biometric attendance.' },
  { slug: 'what-early-access-means', tag: 'Studio notes', title: 'What “early access” means here', summary: 'A plain-language status note: what exists, what is being tested, and what is not live.' },
];

const marquee = [...serviceCategories.map((service) => service.title), ...serviceNiches.map((niche) => niche.title)];

function Sticker() {
  return (
    <Link href="/start-project" className="skh-sticker" aria-label="Start a project">
      <svg className="skh-sticker__ring" viewBox="0 0 120 120" aria-hidden="true">
        <defs><path id="skh-ring" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" /></defs>
        <text><textPath href="#skh-ring">START A PROJECT ✦ START A PROJECT ✦ </textPath></text>
      </svg>
      <ArrowUpRight aria-hidden />
    </Link>
  );
}

export default function HomePage() {
  return (
    <div className={`skh ${unbounded.variable}`}>
      {/* Without JavaScript the letters would stay hidden, so show them. */}
      <noscript><style>{'.skh .skh-char{opacity:1!important}'}</style></noscript>
      <HomeMotion />

      <a href="https://agent.skolvo.online" className="skh-ribbon">
        Skolvo Agent is live: your job search, organised <ArrowUpRight aria-hidden />
      </a>

      {/* Hero */}
      <section className="skh-hero" aria-labelledby="skh-hero-title">
        <div className="skh-blob skh-blob--a" aria-hidden />
        <div className="skh-blob skh-blob--b" aria-hidden />
        <div className="skh-blob skh-blob--c" aria-hidden />
        <div className="skh-wrap skh-hero__grid">
          <div className="skh-hero__text">
            <p className="skh-eyebrow" data-rise>Skolvo / software studio</p>
            <h1 id="skh-hero-title"><Chars lines={['Small studio.', 'Serious', 'software.']} /></h1>
            <p className="skh-hero__lede" data-rise>
              We run our own products and build websites, workflow tools and focused prototypes for businesses.
            </p>
            <div className="skh-actions" data-rise>
              <Link href="/start-project" className="skh-btn skh-btn--lime">Start a project <ArrowRight aria-hidden /></Link>
              <a href="#build" className="skh-btn skh-btn--ghost">See what we build <ArrowDown aria-hidden /></a>
            </div>
          </div>
          <div className="skh-stage" aria-hidden>
            {chips.map((chip) => (
              <div key={chip.title} className="skh-chip">
                <i className={`skh-dot skh-dot--${chip.dot}`} />
                <span><strong>{chip.title}</strong><small>{chip.detail}</small></span>
              </div>
            ))}
          </div>
        </div>
        <Sticker />
      </section>

      {/* Marquee */}
      <div className="skh-marquee" aria-hidden>
        <div className="skh-marquee__track">
          {[0, 1].map((copy) => (
            <span key={copy} className="skh-marquee__group">
              {marquee.map((item) => <span key={item}>{item}<i>✦</i></span>)}
            </span>
          ))}
        </div>
      </div>

      {/* What we build */}
      <section id="build" className="skh-section" aria-labelledby="skh-build-title">
        <div className="skh-wrap">
          <p className="skh-eyebrow" data-reveal>Software we build for you</p>
          <h2 id="skh-build-title" className="skh-split"><Chars lines={['Pick your', 'world.']} /></h2>
          <p className="skh-lede" data-reveal>Websites, workflow tools, and focused prototypes for businesses. We start with a small first version you can test and use.</p>
          <div className="skh-worlds">
            {serviceCategories.map((service, i) => (
              <article key={service.title} className={`skh-world ${worldTheme[i]}`} style={{ top: `calc(5.5rem + ${i} * 1.25rem)` }}>
                <span className="skh-world__num">{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <Link href={service.href} className="skh-pill">Explore <ArrowRight aria-hidden /></Link>
                <span className="skh-world__art" aria-hidden />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Where we can start */}
      <section className="skh-section skh-section--tight" aria-labelledby="skh-niches-title">
        <div className="skh-wrap">
          <h2 id="skh-niches-title" className="skh-h3" data-reveal>Where we can start</h2>
          <p className="skh-note" data-reveal>Areas we can build for, not a list of past clients.</p>
          <ul className="skh-niches" data-stagger>
            {serviceNiches.map((niche) => (
              <li key={niche.id}><Link href={`/services#${niche.id}`}>{niche.title} <ArrowUpRight aria-hidden /></Link></li>
            ))}
          </ul>
        </div>
      </section>

      {/* Statement */}
      <section className="skh-section skh-statement-wrap" aria-labelledby="skh-statement-title">
        <div className="skh-wrap">
          <h2 id="skh-statement-title" className="skh-statement">
            <Chars lines={['Software should', 'show its work.']} />
          </h2>
          <p className="skh-lede" data-reveal>Not after something goes wrong, but while a person is still deciding what to trust.</p>
          <ul className="skh-rules" data-stagger>
            {rules.map((rule, i) => (
              <li key={rule.title}><span>0{i + 1}</span><h3>{rule.title}</h3><p>{rule.body}</p></li>
            ))}
          </ul>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="skh-section skh-products" aria-labelledby="skh-products-title">
        <div className="skh-wrap">
          <p className="skh-eyebrow skh-eyebrow--light" data-reveal>Products we own</p>
          <h2 id="skh-products-title" className="skh-split"><Chars lines={['Built and', 'run by us.']} /></h2>
          <p className="skh-lede skh-lede--light" data-reveal>Each one states plainly what works today and what is still being tested.</p>
          <div className="skh-products__grid" data-stagger>
            {products.map((product) => (
              <article key={product.name} className={`skh-product${product.live ? ' skh-product--live' : ''}`}>
                <span className="skh-stage-tag">{product.stage}</span>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <small>{product.note}</small>
                {product.external
                  ? <a href={product.href} className="skh-pill skh-pill--light">{product.link} <ArrowUpRight aria-hidden /></a>
                  : <Link href={product.href} className="skh-pill skh-pill--light">{product.link} <ArrowRight aria-hidden /></Link>}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="skh-section" aria-labelledby="skh-steps-title">
        <div className="skh-wrap">
          <p className="skh-eyebrow" data-reveal>How a project goes</p>
          <h2 id="skh-steps-title" className="skh-split"><Chars lines={['Three steps.', 'No drama.']} /></h2>
          <ol className="skh-steps" data-stagger>
            {steps.map((step, i) => (
              <li key={step.title}><span className="skh-steps__num">{i + 1}</span><h3>{step.title}</h3><p>{step.body}</p></li>
            ))}
          </ol>
        </div>
      </section>

      {/* Journal */}
      <section className="skh-section skh-section--tight" aria-labelledby="skh-journal-title">
        <div className="skh-wrap">
          <div className="skh-journal__head" data-reveal>
            <h2 id="skh-journal-title" className="skh-h3">From the build journal</h2>
            <Link href="/journal" className="skh-link">All entries <ArrowRight aria-hidden /></Link>
          </div>
          <ul className="skh-journal" data-stagger>
            {journal.map((post) => (
              <li key={post.slug}>
                <Link href={`/journal/${post.slug}`}>
                  <span className="skh-tag">{post.tag}</span>
                  <h3>{post.title}</h3>
                  <p>{post.summary}</p>
                  <ArrowUpRight aria-hidden className="skh-journal__arrow" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Close */}
      <section className="skh-close" aria-labelledby="skh-close-title">
        <div className="skh-wrap">
          <h2 id="skh-close-title"><Chars lines={['Bring us the', 'difficult part.']} /></h2>
          <p data-reveal>Tell us where your current process breaks, and we will tell you honestly whether a small first version can help.</p>
          <div className="skh-actions skh-actions--center" data-reveal>
            <Link href="/start-project" className="skh-btn skh-btn--lime">Start a project <ArrowRight aria-hidden /></Link>
            <a href="mailto:support@skolvo.online" className="skh-btn skh-btn--ghost-light">support@skolvo.online</a>
          </div>
        </div>
      </section>
    </div>
  );
}
