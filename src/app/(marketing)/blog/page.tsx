export const dynamic = "force-dynamic";

import Link from "next/link";
import { postRepo } from "@/server/repositories/post";
import { Calendar } from "lucide-react";

export default async function BlogPage() {
  const { posts } = await postRepo.findPublished({ page: 1, perPage: 20 });

  return (
    <div className="mx-auto max-w-4xl px-6 pb-28 pt-32">
      <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl">Blog</h1>
      <p className="mt-2 text-fg-soft">Updates, changelogs, and guides.</p>

      <div className="mt-12 flex flex-col gap-5">
        {posts.length === 0 ? (
          <div className="rounded-xl border border-dashed border-white/[0.06] p-12 text-center text-sm text-fg-dim">
            No posts yet. Check back soon.
          </div>
        ) : (
          posts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="glass-card group rounded-2xl p-7 transition"
            >
              <div className="flex items-center gap-2 text-xs text-fg-dim">
                <Calendar size={12} />
                {new Date(p.createdAt).toLocaleDateString()}
                {p.category && (
                  <>
                    <span className="text-border-h">|</span>
                    <span className="text-cyan">{p.category.name}</span>
                  </>
                )}
              </div>
              <h2 className="mt-3 font-display text-lg font-bold transition-colors group-hover:text-cyan">
                {p.title}
              </h2>
              {p.excerpt && (
                <p className="mt-2 line-clamp-2 text-sm text-fg-soft">{p.excerpt}</p>
              )}
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
