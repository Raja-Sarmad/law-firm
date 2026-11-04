import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { practiceAreas } from "@/lib/data";
import { PageHeading } from "@/components/site/Crumb";

export const metadata: Metadata = {
  title: "Practice Areas",
  description: "The fields of law taught at BYLAW Academy.",
};

export default function Page() {
  return (
    <>
      <PageHeading
        crumb={[{ href: "/", label: "Home" }, { label: "Practice Areas" }]}
        title="Practice Areas"
        lede="Six fields, taught the way the work is actually done. Every course in the catalog sits inside one of them."
      />
      <section className="shell grid gap-6 pb-20 pt-8 md:grid-cols-2 lg:grid-cols-3">
        {practiceAreas.map((area) => (
          <Link
            key={area.name}
            href={`/courses?category=${encodeURIComponent(area.name)}`}
            data-tilt
            className="lift group overflow-hidden rounded-[24px] bg-paper"
          >
            <div className="relative h-48 overflow-hidden" data-clip>
              <Image src={area.image} alt="" fill sizes="(min-width: 1024px) 360px, 100vw" className="object-cover" data-zoom />
            </div>
            <div className="p-6">
              <h2 className="font-serif text-2xl text-navy group-hover:text-gold-deep">{area.name}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">{area.text}</p>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
