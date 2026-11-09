import Link from "next/link";
import { ArrowIcon } from "@/components/icons";
import type { Course } from "@/lib/data";

const corners = [
  "rounded-[44px_16px_16px_16px] module-card--tl",
  "rounded-[16px_44px_16px_16px] module-card--tr",
  "rounded-[16px_16px_16px_44px] module-card--bl",
  "rounded-[16px_16px_44px_16px] module-card--br",
];

const perks = [
  "Save up to 35% on every featured course",
  "Certificate of completion from a working firm",
  "Lifetime access with every new recording",
  "Drafting templates and checklists included",
  "Live Q&A sitting with a practicing partner",
  "Corporate billing for teams of five or more",
];

function ScalesBadge() {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7 text-[#080a0f]" fill="none" aria-hidden="true">
      <path d="M16 5v20M10 9h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M7 21h6M19 21h6M8 21l2-7h2l2 7M20 21l2-7h2l2 7" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M11 27h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ModuleCard({ course, index }: { course: Course; index: number }) {
  const number = String(index + 1).padStart(2, "0");
  return (
    <article
      data-rise
      className={`module-card bolt-border relative flex flex-col px-7 py-7 sm:px-9 sm:py-8 ${corners[index]}`}
    >
      <div className="relative z-[1]">
        <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-ivory/85">Course {number}:</p>
        <h3 className="mt-1 font-serif text-[24px] leading-tight text-gold sm:text-[26px]">
          <Link href={`/courses/${course.slug}`} className="transition-colors hover:text-[#f0d78a]">
            {course.title}
          </Link>
        </h3>
        <ul className="mt-5 space-y-2.5">
          {course.outcomes.slice(0, 4).map((item, i) => (
            <li key={item} className="flex items-start gap-3 text-[15px] leading-6 text-ivory/90">
              <span className="glow-dot mt-[9px] h-2 w-2 shrink-0 rounded-full" style={{ animationDelay: `${i * 0.35}s` }} />
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex items-center justify-between border-t border-gold/15 pt-4">
          <p className="text-sm text-ink">
            <span className="font-serif text-[20px] text-ivory">${course.price}</span>{" "}
            <s className="text-muted">${course.compareAt}</s>
          </p>
          <Link
            href={`/courses/${course.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold transition-colors hover:text-[#f0d78a]"
          >
            View course <ArrowIcon className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function CourseModules({ courses }: { courses: Course[] }) {
  const four = courses.slice(0, 4);
  return (
    <section className="relative overflow-hidden pb-20 pt-12 lg:pb-24 lg:pt-16">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-[radial-gradient(ellipse_at_50%_100%,rgba(212,175,92,0.16),transparent_70%)]" />

      <div className="shell relative">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">
            <span className="h-px w-14 bg-gold" />
            Offers &amp; Courses
            <span className="h-px w-14 bg-gold" />
          </div>
          <h2 className="mt-5 font-serif text-[34px] font-medium leading-[1.12] tracking-[-0.03em] text-ivory sm:text-[46px] lg:text-[52px]">
            <span data-split>Popular Legal</span>{" "}
            <em className="gold-text font-medium not-italic" data-split>
              Courses
            </em>
          </h2>
        </div>

        <div className="relative mx-auto mt-12 grid max-w-[1040px] gap-6 md:grid-cols-2 md:gap-x-10 md:gap-y-10">
          {four.map((course, index) => (
            <ModuleCard key={course.slug} course={course} index={index} />
          ))}

          {/* Center badge */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-[3] hidden -translate-x-1/2 -translate-y-1/2 md:block">
            <div className="bolt-badge grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-b from-[#f0d78a] to-[#b8923f]">
              <ScalesBadge />
            </div>
          </div>
        </div>

        {/* Offer pill + perks */}
        <div className="mx-auto mt-14 max-w-[900px] text-center">
          <Link
            href="/courses"
            data-magnetic
            className="lightning-pill inline-flex h-14 min-w-[200px] items-center justify-center rounded-full px-10 font-serif text-[22px] text-[#080a0f] sm:h-16 sm:min-w-[220px] sm:px-12 sm:text-[26px]"
          >
            <span className="magnetic-inner">Bonus Offer</span>
          </Link>

          <ul className="mx-auto mt-9 grid max-w-[820px] gap-x-10 gap-y-3 text-left sm:grid-cols-2">
            {perks.map((perk, i) => (
              <li key={perk} className="flex items-start gap-3 text-[15px] leading-6 text-ivory/90" data-rise>
                <span className="glow-dot glow-dot--hot mt-[9px] h-2 w-2 shrink-0 rounded-full" style={{ animationDelay: `${i * 0.25}s` }} />
                {perk}
              </li>
            ))}
          </ul>

          <Link href="/courses" className="mt-8 inline-block text-sm font-semibold text-gold hover:text-[#f0d78a]">
            View All Courses →
          </Link>
        </div>
      </div>
    </section>
  );
}
