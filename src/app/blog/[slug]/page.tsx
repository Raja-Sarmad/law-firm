import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Crumb } from "@/components/site/Crumb";
import { getPost, posts } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Journal" };
  return { title: post.title, description: post.excerpt };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="shell pb-20 pt-10">
      <Crumb items={[{ href: "/", label: "Home" }, { href: "/blog", label: "Blog" }, { label: post.title }]} />
      <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">{post.category}</p>
      <h1 className="mt-3 max-w-3xl font-serif text-4xl font-medium tracking-[-0.03em] text-navy sm:text-5xl" data-split>
        {post.title}
      </h1>
      <p className="mt-3 text-sm text-muted">
        {post.date} · {post.read}
      </p>
      <div className="relative mt-8 aspect-[16/7] overflow-hidden rounded-[28px]" data-clip>
        <Image src={post.image} alt="" fill priority sizes="100vw" className="object-cover" />
      </div>
      <div className="prose-academy mx-auto mt-10 max-w-2xl text-[16px] leading-8 text-ink">
        {post.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
