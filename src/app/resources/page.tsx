import Link from "next/link";
import type { Metadata } from "next";
import { articles } from "@/data/articles";

export const metadata: Metadata = {
  title: "Resources",
  description: "Articles on pressure vessels, boilers, piping, codes and standards, and mechanical integrity from PEQ Academy.",
};

export default function ResourcesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">Resources</h1>
        <p className="mt-4 text-slate-400">
          Practical articles on pressure equipment — written for engineers,
          inspectors, and asset owners, not marketing copy.
        </p>
      </div>

      <div className="mt-12 space-y-6">
        {articles
          .slice()
          .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
          .map((article) => (
            <Link
              key={article.slug}
              href={`/resources/${article.slug}`}
              className="block rounded-xl border border-slate-800 bg-slate-900/60 p-6 transition hover:border-amber-500/50"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                <span className="rounded-full bg-slate-800 px-2.5 py-1 font-medium text-slate-300">
                  {article.category}
                </span>
                <span>{article.publishedDate}</span>
                <span aria-hidden>&middot;</span>
                <span>{article.readTimeMinutes} min read</span>
              </div>
              <h2 className="mt-3 text-lg font-semibold text-white">{article.title}</h2>
              <p className="mt-2 text-sm text-slate-400">{article.excerpt}</p>
            </Link>
          ))}
      </div>
    </div>
  );
}
