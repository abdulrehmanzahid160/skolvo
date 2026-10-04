import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { Reveal } from '@/components/motion/Primitives';
import { formatServiceStartingPrice, serviceCategories, serviceContactHref, serviceNiches } from '@/lib/services';

export default function ServicesPage() {
  return (
    <div className="services-page">
      <header className="services-hero">
        <div className="studio-shell">
          <div className="studio-eyebrow studio-eyebrow--light">
            <span>SKOLVO / SERVICES</span>
            <span>WEBSITES · WORKFLOWS · PROTOTYPES</span>
          </div>
          <div className="services-hero__grid">
            <Reveal>
              <h1>
                Focus the workflow.
                <br />
                <i>Build what helps.</i>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                Skolvo builds its own products and takes on selected website and custom software
                work. We begin with the business process, choose a narrow useful first version,
                and state clearly what it will and will not do.
              </p>
              <Link href="/contact?project=focused-prototype" className="studio-button studio-button--light">
                Discuss a project <ArrowRight aria-hidden />
              </Link>
            </Reveal>
          </div>
        </div>
      </header>

      <main>
        <section id="focused-first-version" className="services-model studio-shell">
          <div className="services-model__intro">
            <span>00 / HOW WE CAN HELP</span>
            <h2>A useful first version, not an oversized promise.</h2>
            <p>
              These are services we can discuss and shape around your operation. They are not
              prebuilt products or claims that a tailored demo already exists.
            </p>
          </div>
          <div className="services-model__grid">
            {serviceCategories.map((category) => (
              <article key={category.title}>
                <span>{category.number}</span>
                <h3>{category.title}</h3>
                <p>{category.description}</p>
                <Link href={category.href}>
                  See relevant work <ArrowRight aria-hidden />
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="services-directory">
          <div className="studio-shell">
            <div className="services-directory__head">
              <span>01–11 / BUSINESS OPPORTUNITIES</span>
              <h2>Start with the part people currently chase by hand.</h2>
              <p>
                Each section describes a practical starting point. The exact scope would follow
                a conversation about your existing process, constraints, and users.
              </p>
            </div>

            <div className="services-directory__list">
              {serviceNiches.map((service) => (
                <article id={service.id} className="service-detail" key={service.id}>
                  <div className="service-detail__title">
                    <span>{service.number}</span>
                    <h2>{service.title}</h2>
                    <p>{service.short}</p>
                    <p className="service-detail__price">{formatServiceStartingPrice(service.startingUsd)}</p>
                    <small>Indicative USD budget for the focused first version. Final scope, delivery, and any ongoing costs are quoted before work begins.</small>
                  </div>
                  <div className="service-detail__body">
                    <div>
                      <h3>The business problem</h3>
                      <p>{service.problem}</p>
                    </div>
                    <div>
                      <h3>A focused first version</h3>
                      <p>{service.firstVersion}</p>
                    </div>
                    <ul aria-label={`Possible first-version scope for ${service.title}`}>
                      {service.includes.map((item) => (
                        <li key={item}>
                          <Check aria-hidden /> {item}
                        </li>
                      ))}
                    </ul>
                    <div className="service-detail__actions">
                      <Link href={serviceContactHref(service)} className="studio-button">
                        Discuss this project <ArrowRight aria-hidden />
                      </Link>
                      <Link href={`/journal/${service.article.slug}`} className="studio-text-link">
                        Read the workflow guide <ArrowRight aria-hidden />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="services-close">
          <div className="studio-shell services-close__grid">
            <div>
              <span>THE FIRST CONVERSATION</span>
              <h2>Show us where the work becomes unclear.</h2>
            </div>
            <div>
              <p>
                You do not need a technical specification. Explain what arrives, who handles it,
                where progress becomes difficult to see, and what a better outcome would mean.
              </p>
              <Link href="/contact?project=custom-workflow" className="studio-button studio-button--light">
                Discuss a project <ArrowRight aria-hidden />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
