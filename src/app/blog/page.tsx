import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { posts } from "@/lib/data";
import { PageHeading } from "@/components/site/Crumb";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes from BYLAW Academy on practice, drafting, and study.",
};

export default function Page() {
  return (
    <>
      <PageHeading
        crumb={[{ href: "/", label: "Home" }, { label: "Blog" }]}
        title="From the Academy"
        lede="Short essays from the teaching desk: how the courses are built, and how to use them while a docket is already full."
      />
      <section className="shell grid gap-6 pb-20 pt-8 lg:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="lift flex h-full flex-col overflow-hidden rounded-[24px] bg-paper" data-tilt>
            <div className="relative h-52" data-clip>
              <Image src={post.image} alt="" fill sizes="(min-width: 1024px) 360px, 100vw" className="object-cover" data-zoom />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">{post.category}</p>
              <h2 className="mt-2 font-serif text-2xl leading-tight text-navy">{post.title}</h2>
              <p className="mt-3 flex-1 text-sm leading-6 text-muted">{post.excerpt}</p>
              <p className="mt-4 text-xs text-muted">
                {post.date} · {post.read}
              </p>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
