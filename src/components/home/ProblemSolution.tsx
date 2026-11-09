import type { ReactNode } from "react";
import Image from "next/image";
import { BookIcon, CapIcon, CaseIcon, UsersIcon } from "@/components/icons";
const problems = [
  {
    title: "Theory without the file",
    text: "Most courses stop at doctrine. Real practice starts when a client asks what to sign tonight.",
    glow: "rgba(176,112,58,0.55)",
    Icon: BookIcon,
    className: "lg:col-span-1 lg:translate-y-2",
  },
  {
    title: "Templates with no judgment",
    text: "A clause library is not counsel. You need the why behind every redline.",
    glow: "rgba(212,175,92,0.5)",
    Icon: CaseIcon,
    className: "lg:col-span-1 lg:-translate-y-1",
  },
  {
    title: "Teachers who left the room",
    text: "If your instructor has not opened a live matter in years, the classroom drifts from the desk.",
    glow: "rgba(212,175,92,0.55)",
    Icon: UsersIcon,
    className: "lg:col-span-2 lg:mx-auto lg:max-w-[420px] lg:translate-y-1",
  },
  {
    title: "Outdated curriculum",
    text: "Material that never meets a live deal leaves learners fluent in yesterday.",
    glow: "rgba(200,140,90,0.5)",
    Icon: CapIcon,
    className: "lg:col-span-1 lg:translate-y-3",
  },
  {
    title: "Lack of mentorship",
    text: "Without a practicing voice beside you, judgment never hardens into craft.",
    glow: "rgba(190,80,70,0.5)",
    Icon: UsersIcon,
    className: "lg:col-span-1 lg:translate-y-1",
  },
];

export function ProblemSection() {
  return (
    <section className="shell relative overflow-x-clip py-16 sm:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <div className="flex items-center justify-center gap-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">
          <span className="h-px w-14 bg-gold" />
          The Problem
          <span className="h-px w-14 bg-gold" />
        </div>
        <h2 className="mt-5 font-serif text-[34px] font-medium leading-[1.1] tracking-[-0.03em] text-ivory sm:text-[46px]" data-split>
          Legal education that never leaves the textbook
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-7 text-ink">
          The gap between a lecture hall and a partner&apos;s desk is where careers stall. We built BYLAW to close it.
        </p>
      </div>

      <div className="relative mt-12 grid items-center gap-12 lg:grid-cols-2 lg:gap-10">
        <div>
          <div className="scene grid gap-4 sm:grid-cols-2">
            {problems.map((item) => (
              <article
                key={item.title}
                data-rise
                data-tilt="soft"
                className={`problem-float relative overflow-hidden rounded-[22px] border border-white/10 bg-[rgba(243,238,227,0.06)] p-4 backdrop-blur-xl ${item.className}`}
                style={{ boxShadow: `0 18px 40px rgba(0,0,0,0.28), 0 0 0 1px ${item.glow.replace("0.5", "0.18").replace("0.55", "0.2")}` }}
              >
                <div
                  className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full blur-2xl"
                  style={{ background: item.glow }}
                />
                <div className="relative flex gap-3">
                  <span
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/10"
                    style={{ background: item.glow.replace("0.5", "0.18").replace("0.55", "0.2"), color: "#f3eee3" }}
                  >
                    <item.Icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-[14px] font-semibold text-ivory">{item.title}</span>
                    <span className="mt-1 block text-[12px] leading-5 text-muted">{item.text}</span>
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[460px] lg:ml-auto lg:mr-0" data-rise>
          <div className="relative aspect-square">
            <Image
              src="/images/asset-gavel-shatter.png"
              alt="Gold gavel striking and shattering the sound block"
              fill
              sizes="(min-width: 1024px) 460px, 80vw"
              className="object-contain object-center scale-[0.92]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ScalesMark() {
  return (
    <svg viewBox="0 0 32 32" className="h-5 w-5 text-gold" fill="none" aria-hidden="true">
      <path d="M16 4v18M10 8h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M10 8c0 5 3 8 6 8s6-3 6-8" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7 22h6M19 22h6M8 22l2-6h2l2 6M20 22l2-6h2l2 6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 26h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function GavelMark() {
  return (
    <svg viewBox="0 0 32 32" className="h-5 w-5 text-gold" fill="none" aria-hidden="true">
      <path d="M6 11h14v6H6z" stroke="currentColor" strokeWidth="1.55" strokeLinejoin="round" />
      <path d="M20 14h7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M9 25h10M11 22h6" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" />
      <path d="M16 17v5" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" />
    </svg>
  );
}

function PillarsMark() {
  return (
    <svg viewBox="0 0 32 32" className="h-5 w-5 text-gold" fill="none" aria-hidden="true">
      <path d="M6 8h20M8 8v16M16 8v16M24 8v16M5 24h22M7 6h18" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" />
    </svg>
  );
}

function SolutionCard({ title, text, mark }: { title: string; text: string; mark: ReactNode }) {
  return (
    <article
      data-rise
      className="solution-card glass bolt-border relative rounded-2xl border border-gold/20 px-6 py-7 shadow-[0_16px_40px_rgba(0,0,0,0.35)]"
    >
      <div className="pointer-events-none absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/55 to-transparent" />
      <div className="flex flex-col items-center text-center">
        <span className="grid h-12 w-12 place-items-center rounded-xl border border-gold/35 bg-[#181c25] shadow-[0_0_18px_rgba(212,175,92,0.22)]">
          {mark}
        </span>
        <span className="mt-4 block font-serif text-[20px] leading-snug text-ivory">{title}</span>
        <span className="mt-2 block text-[13px] leading-6 text-[#cfc6b4]">{text}</span>
      </div>
    </article>
  );
}

export function SolutionSection() {
  return (
    <section className="relative overflow-hidden pt-14 pb-0 lg:pt-16">
      <div className="shell relative z-[1]">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">
            <span className="h-px w-14 bg-gold" />
            The Solution
            <span className="h-px w-14 bg-gold" />
          </div>
          <h2 className="mt-5 font-serif text-[32px] font-medium leading-[1.14] tracking-[-0.03em] text-ivory sm:text-[44px] lg:text-[48px]">
            <span data-split>Practice-built learning for</span>{" "}
            <em className="gold-text font-medium" data-split>
              counsel who ship work
            </em>
          </h2>
        </div>

        {/* One card raised in the middle, two lower on the sides */}
        <div className="mx-auto mt-10 grid max-w-[1040px] gap-5 md:grid-cols-3 md:items-start">
          <div className="md:translate-y-14">
            <SolutionCard
              title="Live-matter pedagogy"
              text="Every module is built from documents and partner-level workflows — not recycled outlines."
              mark={<ScalesMark />}
            />
          </div>
          <SolutionCard
            title="Draft, mark, defend"
            text="You leave with language a client could sign and the notes to defend it in a meeting."
            mark={<GavelMark />}
          />
          <div className="md:translate-y-14">
            <SolutionCard
              title="Pillars that hold"
              text="Corporate, contract, criminal, and civil tracks that stack into a durable practice toolkit."
              mark={<PillarsMark />}
            />
          </div>
        </div>

        {/* Stage: spotlight from above, pedestal on glowing floor rings */}
        <div className="relative mx-auto mt-6 h-[260px] w-full max-w-[1120px] sm:h-[280px] md:mt-16 lg:h-[300px]">
          {/* light beam */}
          <div className="stage-beam pointer-events-none absolute left-1/2 top-0 h-full w-[520px] -translate-x-1/2" />

          {/* floor rings */}
          <svg
            className="pointer-events-none absolute bottom-0 left-1/2 h-[120px] w-[760px] -translate-x-1/2"
            viewBox="0 0 760 120"
            fill="none"
            aria-hidden="true"
          >
            <defs>
              <radialGradient id="stageFloor" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#d4af5c" stopOpacity="0.32" />
                <stop offset="55%" stopColor="#d4af5c" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#d4af5c" stopOpacity="0" />
              </radialGradient>
            </defs>
            <ellipse cx="380" cy="78" rx="360" ry="40" fill="url(#stageFloor)" />
            <ellipse className="stage-ring stage-ring--a" cx="380" cy="78" rx="300" ry="30" stroke="#d4af5c" strokeOpacity="0.35" strokeWidth="1" />
            <ellipse className="stage-ring stage-ring--b" cx="380" cy="78" rx="200" ry="20" stroke="#f0d78a" strokeOpacity="0.55" strokeWidth="1.2" />
            <ellipse cx="380" cy="78" rx="112" ry="11" stroke="#f8e7b0" strokeOpacity="0.85" strokeWidth="1.4" />
          </svg>

          {/* baseline */}
          <div className="pointer-events-none absolute inset-x-[8%] bottom-[41px] h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

          <div className="absolute bottom-[34px] left-1/2 z-[1] w-[210px] -translate-x-1/2 sm:w-[240px] lg:w-[260px]">
            <div className="relative h-[190px] w-full sm:h-[215px] lg:h-[232px]">
              <Image
                src="/images/asset-solution-pedestal.png"
                alt="Gavel and law books on a marble pedestal"
                fill
                sizes="(min-width: 1024px) 270px, 240px"
                className="object-contain object-bottom drop-shadow-[0_24px_40px_rgba(0,0,0,0.55)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
