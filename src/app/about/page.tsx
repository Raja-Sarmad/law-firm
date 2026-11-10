import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/icons";
import { GoldLink } from "@/components/site/Buttons";

export const metadata: Metadata = {
  title: "About George",
  description: "An attorney and a CPA who spent over 20 years building a firm of 6 attorneys and 20+ staff.",
};

const credentials = ["Attorney", "CPA", "20+ years", "6-attorney firm"];

export default function Page() {
  return (
    <section className="shell grid items-center gap-10 py-14 lg:grid-cols-[0.85fr_1.15fr] lg:py-20">
      <div className="relative min-h-[420px] overflow-hidden rounded-[28px] border border-gold/25 lg:min-h-[520px]">
        <Image
          src="/images/george.jpg"
          alt="George at his desk"
          fill
          priority
          sizes="(min-width: 1024px) 42vw, 100vw"
          className="object-cover object-[center_22%]"
        />
      </div>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">Meet your guide</p>
        <h1 className="mt-4 font-serif text-4xl font-medium tracking-[-0.03em] text-ivory sm:text-5xl">Hi, I’m George.</h1>
        <p className="mt-5 max-w-xl text-[16px] leading-7 text-ink">
          I’m an attorney and a CPA who spent over 20 years building a firm of 6 attorneys and 20+ staff.
        </p>
        <p className="mt-3 max-w-xl text-[15px] leading-7 text-ink">
          I made the mistakes so you don’t have to, and I turned what worked into a system for solo and small firms. One personal line — where you’re from, what you do outside the office.
        </p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {credentials.map((tag) => (
            <li key={tag} className="rounded-full border border-gold/30 px-3 py-1 text-[12px] font-semibold text-gold">
              {tag}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <GoldLink href="/#challenge">Join the Free Challenge</GoldLink>
          <Link href="/audit" className="inline-flex items-center gap-2 text-sm font-semibold text-ivory hover:text-gold">
            Book the Firm Audit
            <ArrowIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
