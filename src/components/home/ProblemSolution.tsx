import type { ComponentType, ReactNode, SVGProps } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon, BookIcon, CapIcon, CaseIcon, ClockIcon, LaptopIcon, UsersIcon } from "@/components/icons";
import { GoldLink } from "@/components/site/Buttons";

type Icon = ComponentType<SVGProps<SVGSVGElement> & { className?: string }>;

const problems: { title: string; text: string; Icon: Icon }[] = [
  {
    title: "You’re profitable",
    text: "But every decision still lands on your desk.",
    Icon: BookIcon,
  },
  {
    title: "Intake, follow-up, and billing",
    text: "They live in your head.",
    Icon: UsersIcon,
  },
  {
    title: "You can’t take a week off",
    text: "Without things slipping.",
    Icon: ClockIcon,
  },
  {
    title: "Hiring feels risky",
    text: "Because nothing is documented.",
    Icon: CaseIcon,
  },
  {
    title: "Busy all day",
    text: "And still unsure where the profit comes from.",
    Icon: CapIcon,
  },
];

function PenIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M4 20h4l10-10-4-4L4 16v4z" strokeLinejoin="round" />
      <path d="M12.5 7.5l4 4" />
    </svg>
  );
}

function PillarsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M4 7h16M6 7v11M12 7v11M18 7v11M3 18h18" strokeLinecap="round" />
    </svg>
  );
}

const solutions: { title: string; text: string; icon: ReactNode }[] = [
  {
    title: "More time",
    text: "Documented processes keep the firm moving when you step away.",
    icon: <LaptopIcon className="h-4 w-4" />,
  },
  {
    title: "Clearer profit",
    text: "Know which work, clients, and costs actually drive your bottom line.",
    icon: <PenIcon />,
  },
  {
    title: "Better decisions",
    text: "Replace gut feel with real numbers, and grow on purpose.",
    icon: <PillarsIcon />,
  },
];

function Row({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <li className="flex flex-1 items-center gap-4 py-4">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-gold/30 text-gold">{icon}</span>
      <span className="min-w-0">
        <span className="block text-[15px] font-semibold text-ivory">{title}</span>
        <span className="mt-1 block text-[13px] leading-5 text-[#cfc6b4]">{text}</span>
      </span>
    </li>
  );
}

export function ProblemSolution() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <div aria-hidden className="pointer-events-none absolute -right-8 top-48 hidden h-[540px] w-[460px] lg:block">
        <Image src="/images/asset-statue.png" alt="" fill sizes="460px" className="ps-statue object-cover object-[58%_12%]" />
      </div>

      <div className="shell relative">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">
            <span className="h-px w-14 bg-gold" />
            The Problem &amp; Solution
            <span className="h-px w-14 bg-gold" />
          </div>
          <h2 className="mt-5 font-serif text-[34px] font-medium leading-[1.12] tracking-[-0.03em] text-ivory sm:text-[46px]">
            <span data-split>Sound familiar?</span>
            <span className="mt-1 block">
              <em className="gold-text font-medium not-italic" data-split>
                There’s a better way.
              </em>
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-7 text-ink">
            You’re great at the law, but running the firm has become a second full-time job. Every decision, every fire, and every follow-up still lands on your desk.
          </p>
        </div>

        <div className="relative mx-auto mt-14 max-w-[1100px]">
          <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-x-24">
            <article data-rise className="relative flex h-full flex-col">
              <span className="absolute left-7 top-0 z-[1] inline-flex -translate-y-1/2 items-center gap-2 rounded-full border border-gold/45 bg-[#1a160e] px-3.5 py-1.5 text-[13px] font-semibold text-gold">
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14.5 13H1.5L8 1.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                  <path d="M8 6v3.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  <circle cx="8" cy="11.2" r="0.7" fill="currentColor" />
                </svg>
                The Problem
              </span>
              <div className="ps-card ps-card--problem flex flex-1 flex-col rounded-[28px] border border-gold/30 bg-[#10131a]/80 px-5 pb-3 pt-8 sm:px-7">
                <ul className="flex flex-1 flex-col divide-y divide-gold/15">
                  {problems.map((item) => (
                    <Row key={item.title} icon={<item.Icon className="h-4 w-4" />} title={item.title} text={item.text} />
                  ))}
                </ul>
              </div>
            </article>

            <article data-rise className="relative flex h-full flex-col">
              <span className="absolute left-7 top-0 z-[1] inline-flex -translate-y-1/2 items-center gap-2 rounded-full border border-gold/45 bg-[#1a160e] px-3.5 py-1.5 text-[13px] font-semibold text-gold">
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
                  <path d="M9.2 1.2 3 9.2h4.1L6.4 14.8 13 6.6H8.8l.4-5.4Z" />
                </svg>
                The Solution
              </span>
              <div className="ps-card ps-card--solution flex flex-1 flex-col rounded-[28px] border border-gold/30 bg-[#10131a]/80 px-5 pb-3 pt-8 sm:px-7">
                <ul className="flex flex-1 flex-col divide-y divide-gold/15">
                  {solutions.map((item) => (
                    <Row key={item.title} icon={item.icon} title={item.title} text={item.text} />
                  ))}
                </ul>
              </div>
            </article>
          </div>

          <div className="pointer-events-none absolute left-1/2 top-1/2 z-[2] hidden -translate-x-1/2 -translate-y-1/2 lg:block">
            <span className="bridge-arrow grid h-[52px] w-[52px] place-items-center rounded-full border border-gold/70 bg-[#10131a] text-gold">
              <span className="bridge-ring" />
              <span className="bridge-ring bridge-ring--delay" />
              <ArrowIcon className="bridge-arrow-icon relative h-4 w-4" />
            </span>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <GoldLink href="/#challenge">Join the Free Challenge</GoldLink>
          <Link href="/about" className="inline-flex items-center gap-2 text-sm font-semibold text-ivory transition-colors hover:text-gold">
            See how it works
            <ArrowIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
