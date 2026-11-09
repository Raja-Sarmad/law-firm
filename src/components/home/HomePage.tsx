import Image from "next/image";
import { GhostLink, GoldLink } from "@/components/site/Buttons";
import { SectionLabel } from "@/components/site/Crumb";
import { CourseModules } from "@/components/home/CourseModules";
import { ProblemSection, SolutionSection } from "@/components/home/ProblemSolution";
import { Testimonials } from "@/components/home/Testimonials";
import { courses, learnerAvatars } from "@/lib/data";

const trust = [
  { value: "4,500+", label: "Active learners" },
  { value: "50+", label: "Practical courses" },
  { value: "98%", label: "Satisfaction" },
  { value: "20+", label: "Practicing faculty" },
];

export function HomePage() {
  return (
    <>
      <section data-hero className="hero-stage relative isolate overflow-x-clip pb-4">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute right-[8%] top-[12%] h-72 w-72 rounded-full bg-gold/20 blur-[90px]" />
          <div className="absolute left-[20%] bottom-[10%] h-64 w-64 rounded-full bg-[#b0703a]/22 blur-[80px]" />
        </div>

        <div className="shell relative grid items-start gap-8 pb-24 pt-6 sm:gap-10 sm:pt-8 lg:min-h-[calc(100vh-78px)] lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pb-32 lg:pt-6">
          <div className="lg:-mt-10">
            <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold sm:text-[11px] sm:tracking-[0.22em]">
              <span data-hero-line className="inline-block h-px w-8 shrink-0 origin-left bg-gold" />
              Legal Education & Professional Training
            </div>
            <h1 className="mt-4 font-serif text-[40px] font-medium leading-[1.04] tracking-[-0.035em] text-ivory sm:text-6xl lg:text-[68px]">
              <span className="block" data-split="chars">
                Learn Law from
              </span>
              <span className="block" data-split="chars">
                <span className="gold-text">Practicing Experts</span>
              </span>
            </h1>
            <p data-hero-rise className="mt-4 max-w-xl text-[16px] leading-7 text-ink">
              Professional online courses, practical legal training, and certifications designed for law students, professionals and organizations.
            </p>
            <div data-hero-rise className="mt-6 flex flex-wrap gap-3">
              <GoldLink href="/courses" arrow>
                Explore Courses
              </GoldLink>
              <GhostLink href="/consultation">Get Consultation</GhostLink>
            </div>
            <div data-hero-rise className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
              <div className="flex -space-x-3">
                {learnerAvatars.map((src) => (
                  <Image
                    key={src}
                    src={src}
                    alt=""
                    width={42}
                    height={42}
                    className="h-10 w-10 rounded-full border-2 border-[#0e1117] object-cover"
                  />
                ))}
              </div>
              <div className="flex items-center gap-4 text-[13px] text-ink sm:text-sm">
                <p className="whitespace-nowrap">
                  <strong className="font-semibold text-ivory" data-count="4500" data-suffix="+" data-format="comma">
                    4,500+
                  </strong>{" "}
                  Learners
                </p>
                <span className="h-3 w-px bg-gold/40" />
                <p className="whitespace-nowrap">
                  <strong className="font-semibold text-ivory" data-count="98" data-suffix="%">
                    98%
                  </strong>{" "}
                  Satisfaction
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div data-hero-photo className="relative mx-auto h-[320px] w-full max-w-[440px] sm:h-[460px] lg:h-[560px]">
              <Image
                src="/images/asset-statue.png"
                alt="Antique gold Lady Justice statue holding the scales of justice"
                fill
                priority
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="object-contain object-center"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="shell relative z-20 -mt-14 sm:-mt-20">
        <div className="glass bolt-border grid grid-cols-2 gap-4 rounded-[24px] px-4 py-5 sm:gap-6 sm:rounded-[28px] sm:px-6 sm:py-7 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-gold/15">
          {trust.map((item) => (
            <div key={item.label} className="px-1 py-1 text-center sm:px-2 sm:py-2 lg:px-6" data-rise>
              <p className="font-serif text-[26px] text-ivory sm:text-3xl lg:text-[34px]">{item.value}</p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-gold sm:text-xs sm:tracking-[0.16em]">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <ProblemSection />
      <SolutionSection />

      <CourseModules courses={courses} />

      <Testimonials />

      <section className="shell pb-20 sm:pb-24">
        <div className="glass bolt-border grid items-center gap-8 overflow-hidden rounded-[28px] px-6 py-9 sm:rounded-[32px] sm:px-10 sm:py-10 lg:grid-cols-[1.15fr_0.85fr] lg:px-14 lg:py-12">
          <div>
            <SectionLabel>Final Call</SectionLabel>
            <h2 className="mt-4 font-serif text-[34px] font-medium leading-[1.1] tracking-[-0.03em] text-ivory sm:text-[48px]" data-split>
              Rise into practice with a seat that matters
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-7 text-ink">
              Enroll in a course, request corporate training, or book a consultation with the academy desk.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <GoldLink href="/courses" arrow>
                Enroll Now
              </GoldLink>
              <GhostLink href="/corporate">Corporate Training</GhostLink>
            </div>
          </div>
          <div className="relative mx-auto h-[220px] w-full max-w-[300px] sm:h-[320px] lg:h-[360px]">
            <Image
              src="/images/asset-phoenix.png"
              alt="Antique gold phoenix sculpture"
              fill
              sizes="(min-width: 1024px) 28vw, 70vw"
              className="object-contain object-center"
            />
          </div>
        </div>
      </section>
    </>
  );
}
