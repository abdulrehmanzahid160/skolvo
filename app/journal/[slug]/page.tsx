import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getJournalPost, journalPosts } from '@/lib/journal';
import { getServiceNiche, serviceContactHref } from '@/lib/services';

export function generateStaticParams() {
  return journalPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getJournalPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.dek };
}

export default async function JournalArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getJournalPost(slug);
  if (!post) notFound();
  const index = journalPosts.findIndex((item) => item.slug === slug);
  const next = journalPosts[(index + 1) % journalPosts.length];
  const service = post.serviceId ? getServiceNiche(post.serviceId) : undefined;

  return (
    <article className="journal-article">
      <header>
        <div className="studio-shell">
          <Link href="/journal" className="journal-back"><ArrowLeft aria-hidden /> Journal index</Link>
          <div className="journal-article__meta"><span>{post.number} / {post.category} / {post.tag}</span><span>{post.published} · {post.readTime}</span></div>
          <h1>{post.title}</h1><p>{post.dek}</p>
        </div>
      </header>
      <div className="journal-article__body studio-shell">
        <aside><span>ENTRY {post.number}</span><p>{post.category}</p></aside>
        <div>
          {post.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.points && <ul>{section.points.map((point) => <li key={point}>{point}</li>)}</ul>}</section>)}
          {service && (
            <div className="journal-article__service-links">
              <span>RELATED SERVICE</span>
              <h2>{service.title}</h2>
              <p>This guide describes a possible starting point, not a prebuilt product. A real scope would follow a discussion of your current process.</p>
              <div>
                <Link href={`/services#${service.id}`} className="studio-text-link">View the service section <ArrowRight aria-hidden /></Link>
                <Link href={serviceContactHref(service)} className="studio-button">Discuss this project <ArrowRight aria-hidden /></Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <Link href={`/journal/${next.slug}`} className="journal-next"><span>READ NEXT / {next.number}</span><strong>{next.title}</strong><ArrowRight aria-hidden /></Link>
    </article>
  );
}
