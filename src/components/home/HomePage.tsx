import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { BookIcon, CapIcon, CaseIcon, LaptopIcon, MedalIcon, PlayIcon, UsersIcon } from "@/components/icons";
import { GhostLink, GoldLink } from "@/components/site/Buttons";
import { SectionLabel } from "@/components/site/Crumb";
import { CourseCard } from "@/components/courses/CourseCard";
import { Testimonials } from "@/components/home/Testimonials";
import { FilmTrigger } from "@/components/motion/Film";
import { features, learnerAvatars, storyChapters, courses } from "@/lib/data";

const featureIcon = {
  cap: CapIcon,
  medal: MedalIcon,
  laptop: LaptopIcon,
  case: CaseIcon,
};

export function HomePage() {
  const featured = courses.filter((course) => course.featured);

  return (
    <>
      <section data-hero className="hero-stage relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div data-hero-bg className="absolute inset-0">
            <Image
              src="/images/courthouse.jpg"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-[center_35%]"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#f7f1e6] via-[#f7f1e6]/95 via-[46%] to-transparent to-[72%] lg:hidden" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#f7f1e6] from-0% via-[#f7f1e6]/92 via-[34%] to-transparent to-[68%]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_74%_46%,transparent_0%,rgba(27,36,51,0.18)_78%)]" />
          <div className="absolute -right-10 top-10 h-[560px] w-[560px] rounded-full bg-[#f0d7a2]/35 blur-3xl" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-[#f4efe6]" />
        </div>
        <div className="shell relative grid items-center gap-10 py-10 pb-24 lg:min-h-[calc(100vh-78px)] lg:grid-cols-[1.05fr_0.95fr] lg:py-14 lg:pb-28">
        <div>
          <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
            <span data-hero-line className="inline-block h-px w-8 origin-left bg-gold" />
            Legal Education & Professional Training
          </div>
          <h1 className="mt-4 font-serif text-[46px] font-medium leading-[1.02] tracking-[-0.035em] text-navy sm:text-6xl lg:text-[68px]">
            <span className="block" data-split="chars">
              Learn Law from
            </span>
            <span className="block" data-split="chars">
              Practicing Experts
            </span>
          </h1>
          <p data-hero-rise className="mt-5 max-w-xl text-[16px] leading-7 text-muted">
            Professional online courses, practical legal training, and certifications designed for law students, professionals and organizations.
          </p>
          <div data-hero-rise className="mt-7 flex flex-wrap gap-3">
            <GoldLink href="/courses" arrow>
              Explore Courses
            </GoldLink>
            <GhostLink href="/consultation">Get Consultation</GhostLink>
          </div>
          <div data-hero-rise className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <div className="flex -space-x-3">
              {learnerAvatars.map((src) => (
                <Image
                  key={src}
                  src={src}
                  alt=""
                  width={42}
                  height={42}
                  className="h-10 w-10 rounded-full border-2 border-cream object-cover"
                />
              ))}
            </div>
            <p className="text-sm text-ink">
              <strong className="font-semibold text-navy" data-count="4500" data-suffix="+" data-format="comma">
                4,500+
              </strong>{" "}
              Learners
            </p>
            <p className="text-sm text-ink">
              <strong className="font-semibold text-navy" data-count="98" data-suffix="%">
                98%
              </strong>{" "}
              Satisfaction
            </p>
          </div>
        </div>
        <div data-hero-parallax className="relative">
          <div className="pointer-events-none absolute inset-[8%] rounded-full bg-gold/25 blur-3xl" />
          <div data-hero-photo className="relative mx-auto h-[480px] w-full max-w-[560px] sm:h-[560px] lg:h-[680px]">
            <div data-statue className="absolute inset-0">
              <Image
                src="/images/hero-justice.png"
                alt="Bronze Lady Justice statue holding scales in a sunlit courthouse"
                fill
                priority
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="object-contain object-bottom drop-shadow-[0_30px_40px_rgba(27,36,51,0.28)]"
              />
            </div>
          </div>
        </div>
        </div>
      </section>

      <section className="shell relative z-20 -mt-14 sm:-mt-16 lg:-mt-20">
        <div className="lift grid rounded-[24px] bg-paper px-6 py-7 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-line">
          {features.map((feature) => {
            const Icon = featureIcon[feature.icon];
            return (
              <div key={feature.title} className="flex gap-4 px-2 py-4 lg:px-6 lg:py-2">
                <span className="text-gold">
                  <Icon draw className="h-8 w-8" />
                </span>
                <span>
                  <span className="block text-[15px] font-semibold text-navy">{feature.title}</span>
                  <span className="mt-1 block text-[13px] leading-5 text-muted">{feature.text}</span>
                </span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="shell pb-20 pt-14 lg:pt-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionLabel>Featured Courses</SectionLabel>
            <h2 className="mt-3 font-serif text-4xl font-medium tracking-[-0.03em] text-navy sm:text-[44px]" data-split>
              Popular Legal Courses
            </h2>
          </div>
          <Link href="/courses" className="text-sm font-semibold text-gold-deep">
            View All Courses →
          </Link>
        </div>
        <div className="scene mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      </section>

      <section className="shell grid items-center gap-10 pb-16 lg:grid-cols-2">
        <div className="relative overflow-hidden rounded-[24px]" data-clip>
          <div className="relative aspect-[16/11]">
            <Image
              src="/images/courthouse.jpg"
              alt="Colonnade of a courthouse in warm afternoon light"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              data-parallax="8"
            />
          </div>
          <FilmTrigger
            image="/images/courthouse.jpg"
            alt="Courthouse colonnade"
            chapters={storyChapters}
            className="absolute bottom-4 left-4 flex items-center gap-3 rounded-full bg-paper py-2 pl-2 pr-4 text-left shadow-lg"
          >
            <span className="grid h-11 w-11 place-items-center rounded-full bg-gold text-white">
              <PlayIcon />
            </span>
            <span>
              <span className="block text-sm font-semibold text-navy">Watch Our Story</span>
              <span className="block text-xs text-muted">2:40 Min</span>
            </span>
          </FilmTrigger>
        </div>
        <div>
          <SectionLabel>About BYLAW Academy</SectionLabel>
          <h2 className="mt-3 font-serif text-4xl font-medium tracking-[-0.03em] text-navy sm:text-[44px]" data-split>
            Bridging Legal Expertise with Modern Learning
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-7 text-muted">
            BYLAW Academy is the education arm of a professional law firm, committed to delivering high-quality, practical and up-to-date legal learning for individuals, businesses and institutions.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            <Stat icon={<UsersIcon draw className="h-7 w-7" />} value="20" suffix="+" label="Expert Instructors" />
            <Stat icon={<BookIcon draw className="h-7 w-7" />} value="50" suffix="+" label="Courses" />
            <Stat icon={<UsersIcon draw className="h-7 w-7" />} value="4.5" suffix="K+" label="Active Learners" format="decimal" />
          </div>
        </div>
      </section>

      <section className="shell pb-20">
        <div className="grid items-center gap-8 overflow-hidden rounded-[28px] bg-banner px-6 py-8 text-white sm:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:py-10">
          <div>
            <h2 className="font-serif text-3xl font-medium tracking-[-0.03em] sm:text-[40px]" data-split>
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
          <div className="relative h-56 overflow-hidden rounded-[20px] sm:h-64">
            <Image
              src="/images/gavel-dark.jpg"
              alt="Wooden gavel on a dark desk"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
              data-parallax="6"
            />
          </div>
        </div>
      </section>

      <Testimonials />
    </>
  );
}

function Stat({
  icon,
  value,
  suffix,
  label,
  format,
}: {
  icon: ReactNode;
  value: string;
  suffix: string;
  label: string;
  format?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-gold">{icon}</span>
      <span>
        <span className="block font-semibold text-navy" data-count={value} data-suffix={suffix} data-format={format}>
          {value}
          {suffix}
        </span>
        <span className="block text-xs text-muted">{label}</span>
      </span>
    </div>
  );
}
