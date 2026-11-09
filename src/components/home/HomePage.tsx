import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/icons";
import { ChallengeForm } from "@/components/home/ChallengeForm";
import { ProblemSolution } from "@/components/home/ProblemSolution";
import { Testimonials } from "@/components/home/Testimonials";
import { GoldLink } from "@/components/site/Buttons";

const trust = [
  { value: "20+", label: "years in practice" },
  { value: "6", label: "Attorneys led" },
  { value: "20+", label: "staff Managed" },
  { value: "2", label: "licenses, attorney and CPA" },
];

const marks = ["Bar association", "Media"];

const credentials = ["Attorney", "CPA", "20+ years", "6-attorney firm"];

export function HomePage() {
  return (
    <>
      <section data-hero className="hero-stage relative isolate overflow-x-clip pb-4">
        <div className="shell relative grid items-start gap-8 pb-16 pt-6 sm:gap-10 sm:pt-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pb-20 lg:pt-6">
          <div className="lg:-mt-10">
            <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold sm:text-[11px] sm:tracking-[0.22em]">
              <span data-hero-line className="inline-block h-px w-8 shrink-0 origin-left bg-gold" />
              For solo and small-firm lawyers
            </div>
            <h1 className="mt-4 font-serif text-[40px] font-medium leading-[1.04] tracking-[-0.035em] text-ivory sm:text-6xl lg:text-[68px]">
              <span className="block" data-split="chars">
                Run your firm.
              </span>
              <span className="block" data-split="chars">
                <span className="gold-text">Don’t let it run you.</span>
              </span>
            </h1>
            <p data-hero-rise className="mt-4 max-w-xl text-[16px] leading-7 text-ink">
              Practical systems for intake, workflow, staffing, and finances, from an attorney and CPA who built and ran a 6-attorney firm.
            </p>
            <div data-hero-rise className="mt-6 flex flex-wrap items-center gap-4">
              <GoldLink href="/#challenge">Join the Free Challenge</GoldLink>
              <Link href="/audit" className="inline-flex items-center gap-2 text-sm font-semibold text-ivory transition-colors hover:text-gold">
                See the Firm Audit
                <ArrowIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="relative">
            <div data-hero-photo className="relative mx-auto h-[320px] w-full max-w-[440px] sm:h-[460px] lg:h-[560px]">
              <Image
                src="/images/asset-statue.png"
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="object-contain object-center"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="shell grid items-center gap-10 py-8 sm:py-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid min-h-[360px] place-items-center rounded-[28px] border border-gold/25 bg-[#12161e] px-8 text-center">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">Photo</p>
            <p className="mt-3 font-serif text-[28px] text-ivory">George</p>
            <p className="mt-2 text-sm text-ink">Real photo of George, warm and natural.</p>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
            <span className="h-px w-8 bg-gold" />
            Meet your guide
          </div>
          <h2 className="mt-4 font-serif text-[36px] font-medium leading-[1.1] tracking-[-0.03em] text-ivory sm:text-[48px]">
            <span data-split>Hi, I’m George.</span>
          </h2>
          <p className="mt-4 max-w-xl text-[16px] leading-7 text-ink">
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
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <GoldLink href="/about">Read my story</GoldLink>
            <Link href="/#challenge" className="inline-flex items-center gap-2 text-sm font-semibold text-ivory transition-colors hover:text-gold">
              Join the Free Challenge
              <ArrowIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="shell relative z-20">
        <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
          Built by someone who’s run the firm
        </p>
        <div className="glass bolt-border grid grid-cols-2 gap-4 rounded-[24px] px-4 py-5 sm:gap-6 sm:rounded-[28px] sm:px-6 sm:py-7 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-gold/15">
          {trust.map((item) => (
            <div key={item.label} className="px-1 py-1 text-center sm:px-2 sm:py-2 lg:px-6" data-rise>
              <p className="font-serif text-[26px] text-ivory sm:text-3xl lg:text-[34px]">{item.value}</p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-gold sm:text-xs sm:tracking-[0.16em]">{item.label}</p>
            </div>
          ))}
        </div>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {marks.map((mark) => (
            <li
              key={mark}
              className="rounded-full border border-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink grayscale"
            >
              {mark}
            </li>
          ))}
        </ul>
      </section>

      <ProblemSolution />

      <Testimonials />

      <section id="challenge" className="relative overflow-hidden pb-16 sm:pb-24">
        <div aria-hidden className="pointer-events-none absolute -right-24 top-1/2 hidden h-[620px] w-[620px] -translate-y-1/2 opacity-[0.09] lg:block">
          <Image
            src="/images/asset-scales.png"
            alt=""
            fill
            sizes="620px"
            className="object-contain [mask-image:radial-gradient(circle,black_35%,transparent_72%)]"
          />
        </div>

        <div className="relative mx-auto w-[min(1240px,calc(100%-2.5rem))]">
          <div className="grid overflow-hidden rounded-[28px] border border-white/10 bg-[#12161e] shadow-[0_30px_80px_rgba(0,0,0,0.35)] lg:min-h-[440px] lg:grid-cols-[1.12fr_0.88fr]">
            <div className="flex flex-col justify-center px-6 py-9 text-center sm:px-10 sm:py-12 lg:px-12 lg:py-14 lg:text-left">
              <h2 className="font-serif text-[32px] font-medium leading-[1.08] tracking-[-0.03em] text-ivory sm:text-[40px] xl:text-[44px]">
                <span data-split>Ready to get your time back?</span>
              </h2>
              <p className="mx-auto mt-4 max-w-md text-[15px] leading-7 text-ink lg:mx-0">
                Start with the free 5-day challenge. See the difference in a week.
              </p>
              <div className="mx-auto w-full max-w-md text-left lg:mx-0">
                <ChallengeForm />
              </div>
            </div>

            <div className="relative min-h-[240px] sm:min-h-[320px] lg:min-h-full">
              <Image
                src="/images/final-call-still.jpg"
                alt="Gold scales of justice resting on law books"
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover object-[center_46%]"
              />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#12161e] to-transparent lg:hidden" />
              <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-28 bg-gradient-to-r from-[#12161e] to-transparent lg:block" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
