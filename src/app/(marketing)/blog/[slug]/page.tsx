export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { postRepo } from "@/server/repositories/post";
import { Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await postRepo.findBySlug(slug);
  if (!post || !post.published) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 pb-28 pt-32">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm text-fg-dim transition hover:text-fg-soft"
      >
        <ArrowLeft size={14} /> Back to blog
      </Link>
      <div className="mt-6 flex items-center gap-2 text-xs text-fg-dim">
        <Calendar size={12} />
        {new Date(post.createdAt).toLocaleDateString()}
        {post.category && (
          <>
            <span className="text-border-h">|</span>
            <span className="text-cyan">{post.category.name}</span>
          </>
        )}
      </div>
      <h1 className="mt-4 font-display text-3xl font-bold tracking-tight md:text-4xl">
        {post.title}
      </h1>
      <div
        className="prose-invert mt-10 max-w-none text-fg-soft prose-headings:font-display prose-headings:font-bold prose-headings:text-fg prose-a:text-cyan prose-strong:text-fg"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
