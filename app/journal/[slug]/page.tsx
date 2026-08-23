import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getJournalPost, journalPosts } from '@/lib/journal';

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

  return (
    <article className="journal-article">
      <header>
        <div className="studio-shell">
          <Link href="/journal" className="journal-back"><ArrowLeft aria-hidden /> Journal index</Link>
          <div className="journal-article__meta"><span>{post.number} / {post.tag}</span><span>{post.published} · {post.readTime}</span></div>
          <h1>{post.title}</h1><p>{post.dek}</p>
        </div>
      </header>
      <div className="journal-article__body studio-shell">
        <aside><span>ENTRY {post.number}</span><p>Skolvo build journal</p></aside>
        <div>
          {post.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.points && <ul>{section.points.map((point) => <li key={point}>{point}</li>)}</ul>}</section>)}
        </div>
      </div>
      <Link href={`/journal/${next.slug}`} className="journal-next"><span>READ NEXT / {next.number}</span><strong>{next.title}</strong><ArrowRight aria-hidden /></Link>
    </article>
  );
}
