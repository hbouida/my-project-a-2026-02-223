import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { articles, getArticleBySlug } from "@/data/articles";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const more = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <nav className="text-sm text-slate-500">
        <Link href="/resources" className="hover:text-slate-300">
          Resources
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-400">{article.category}</span>
      </nav>

      <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-slate-500">
        <span className="rounded-full bg-slate-800 px-2.5 py-1 font-medium text-slate-300">{article.category}</span>
        <span>{article.publishedDate}</span>
        <span aria-hidden>&middot;</span>
        <span>{article.readTimeMinutes} min read</span>
      </div>

      <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl">{article.title}</h1>
      <p className="mt-4 text-lg text-slate-400">{article.excerpt}</p>

      <div className="mt-10 space-y-8">
        {article.sections.map((section) => (
          <div key={section.heading}>
            <h2 className="text-xl font-semibold text-white">{section.heading}</h2>
            <p className="mt-3 text-slate-300">{section.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-xl border border-slate-800 bg-slate-900/60 p-6 text-center">
        <p className="text-slate-300">Want the full course behind this topic?</p>
        <Link
          href="/courses"
          className="mt-3 inline-block rounded-md bg-amber-500 px-6 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
        >
          Browse the course catalog
        </Link>
      </div>

      {more.length > 0 && (
        <div className="mt-16">
          <h2 className="text-xl font-bold text-white">More from Resources</h2>
          <div className="mt-4 space-y-4">
            {more.map((a) => (
              <Link key={a.slug} href={`/resources/${a.slug}`} className="block text-sm font-medium text-amber-400 hover:underline">
                {a.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
