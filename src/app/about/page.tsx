import type { Metadata } from "next";
import Image from "next/image";
import { BookIcon, HeartIcon, UsersIcon } from "@/components/icons";
import { Crumb } from "@/components/site/Crumb";
import { GoldLink } from "@/components/site/Buttons";
import { instructor } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description: "BYLAW Academy is the education arm of a professional law firm.",
};

const stats = [
  { icon: UsersIcon, value: "20", suffix: "+", label: "Expert Instructors" },
  { icon: BookIcon, value: "50", suffix: "+", label: "Courses" },
  { icon: UsersIcon, value: "4.5", suffix: "K+", label: "Active Learners", format: "decimal" },
  { icon: HeartIcon, value: "98", suffix: "%", label: "Satisfaction Rate" },
];

export default function Page() {
  return (
    <>
      <section className="shell grid items-center gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
        <div>
          <Crumb items={[{ href: "/", label: "Home" }, { label: "About Us" }]} />
          <h1 className="mt-4 font-serif text-4xl font-medium tracking-[-0.03em] text-navy sm:text-5xl" data-split>
            About BYLAW Academy
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-7 text-muted">
            A trusted legal education platform by a professional law firm, committed to practical, accessible and high-quality legal training.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-5 xl:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-start gap-3">
                <stat.icon draw className="mt-0.5 h-6 w-6 text-gold" />
                <span>
                  <span
                    className="block text-lg font-semibold text-navy"
                    data-count={stat.value}
                    data-suffix={stat.suffix}
                    data-format={stat.format}
                  >
                    {stat.value}
                    {stat.suffix}
                  </span>
                  <span className="block text-xs leading-4 text-muted">{stat.label}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative min-h-[380px] overflow-hidden rounded-[28px] lg:min-h-[520px]" data-clip>
          <Image
            src="/images/courthouse.jpg"
            alt="Courthouse colonnade in warm light"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            data-parallax="8"
          />
        </div>
      </section>

      <section className="shell grid items-center gap-8 pb-16 lg:grid-cols-[180px_1fr]">
        <Image
          src={instructor.image}
          alt={instructor.name}
          width={180}
          height={180}
          className="h-40 w-40 rounded-[24px] object-cover"
        />
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">Faculty</p>
          <h2 className="mt-2 font-serif text-3xl text-navy" data-split>
            {instructor.name}
          </h2>
          <p className="text-sm text-gold-deep">{instructor.role}</p>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">{instructor.bio}</p>
        </div>
      </section>

      <section className="shell pb-20">
        <div className="grid items-center gap-8 overflow-hidden rounded-[28px] bg-banner px-6 py-8 text-white sm:px-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl" data-split>
              Train Your Team with Custom Legal Programs
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-6 text-white/75">
              We also offer tailored training for law firms, corporations and organizations.
            </p>
            <div className="mt-6">
              <GoldLink href="/corporate" arrow>
                Request a Corporate Training
              </GoldLink>
            </div>
          </div>
          <div className="relative h-52 overflow-hidden rounded-[20px] sm:h-60">
            <Image src="/images/gavel-dark.jpg" alt="" fill sizes="40vw" className="object-cover" />
          </div>
        </div>
      </section>
    </>
  );
}
