"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { CheckIcon, PlayIcon, StarIcon } from "@/components/icons";
import { GoldLink } from "@/components/site/Buttons";
import { Crumb } from "@/components/site/Crumb";
import { CourseCard, MetaRow } from "@/components/courses/CourseCard";
import { FilmTrigger } from "@/components/motion/Film";
import {
  courseIncludes,
  instructor,
  relatedCourses,
  testimonials,
  type Course,
} from "@/lib/data";
import { compactCount, formatNumber, money, offPercent } from "@/lib/format";
import { gsap } from "@/lib/gsap";

const tabs = ["Overview", "Curriculum", "Instructor", "Reviews"] as const;

export function CourseDetail({ course }: { course: Course }) {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Overview");
  const [openModule, setOpenModule] = useState(0);
  const underline = useRef<HTMLSpanElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const panels = useRef<HTMLDivElement>(null);
  const percent = offPercent(course.price, course.compareAt);
  const chapters = course.outcomes.slice(0, 3).map((outcome, index) => ({
    kicker: `Lesson ${index + 1}`,
    title: outcome,
    text: course.about,
  }));

  useLayoutEffect(() => {
    const button = tabRefs.current[0];
    if (button && underline.current) {
      gsap.set(underline.current, { width: button.offsetWidth });
    }
  }, []);

  const selectTab = (next: (typeof tabs)[number], index: number) => {
    const button = tabRefs.current[index];
    if (button && underline.current) {
      gsap.to(underline.current, {
        x: button.offsetLeft,
        width: button.offsetWidth,
        duration: 0.45,
        ease: "power3.inOut",
      });
    }
    if (panels.current) {
      gsap.fromTo(panels.current, { y: 16 }, { y: 0, duration: 0.45, ease: "power3.out" });
    }
    setTab(next);
  };

  const toggleModule = (index: number, panel: HTMLDivElement | null) => {
    if (!panel) return;
    const opening = openModule !== index;
    if (opening) {
      gsap.set(panel, { height: "auto" });
      const height = panel.offsetHeight;
      gsap.fromTo(panel, { height: 0 }, { height, duration: 0.5, ease: "power3.inOut", onComplete: () => gsap.set(panel, { height: "auto" }) });
      setOpenModule(index);
    } else {
      gsap.to(panel, { height: 0, duration: 0.4, ease: "power3.inOut" });
      setOpenModule(-1);
    }
  };

  return (
    <div className="shell pb-20 pt-10">
      <Crumb
        items={[
          { href: "/", label: "Home" },
          { href: "/courses", label: "Courses" },
          { label: course.title },
        ]}
      />
      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
        <div>
          <h1 className="font-serif text-4xl font-medium tracking-[-0.03em] text-navy sm:text-5xl" data-split>
            {course.title}
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-muted">{course.summary}</p>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
            <span className="inline-flex items-center gap-1">
              <StarIcon />
              <span className="font-semibold text-navy">{course.rating}</span>
            </span>
            <span className="text-muted">({formatNumber(course.reviews)} Reviews)</span>
            {course.badge ? (
              <span className="rounded-full bg-gold/15 px-2.5 py-1 text-xs font-semibold text-gold-deep">{course.badge}</span>
            ) : null}
          </div>
          <MetaRow course={course} />
        </div>
        <div className="relative h-[280px] overflow-hidden rounded-[24px] sm:h-[320px]" data-clip>
          <Image src={course.cover} alt="" fill priority sizes="380px" className="object-cover" />
          <FilmTrigger
            image={course.cover}
            alt={course.title}
            chapters={chapters}
            className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-paper text-navy shadow-xl"
          >
            <PlayIcon className="h-5 w-5" />
          </FilmTrigger>
        </div>

        <div>
          <div className="relative flex gap-6 border-b border-line">
            {tabs.map((item, index) => (
              <button
                key={item}
                type="button"
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                onClick={() => selectTab(item, index)}
                className={`pb-3 text-sm font-semibold ${tab === item ? "text-navy" : "text-muted"}`}
              >
                {item}
              </button>
            ))}
            <span ref={underline} className="absolute bottom-0 left-0 h-0.5 w-16 bg-gold" />
          </div>
          <div ref={panels} className="pt-6">
            {tab === "Overview" ? (
              <div>
                <h2 className="text-lg font-semibold text-navy">About This Course</h2>
                <p className="mt-3 max-w-2xl text-[15px] leading-7 text-muted">{course.about}</p>
                <h2 className="mt-8 text-lg font-semibold text-navy">What You’ll Learn</h2>
                <ul className="mt-4 grid gap-3">
                  {course.outcomes.map((outcome) => (
                    <li key={outcome} className="flex items-start gap-3 text-sm text-ink">
                      <span className="mt-0.5 text-pine">
                        <CheckIcon />
                      </span>
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {tab === "Curriculum" ? (
              <div className="divide-y divide-line rounded-[20px] border border-line bg-paper">
                {course.curriculum.map((module, index) => (
                  <div key={module.title}>
                    <button
                      type="button"
                      className="flex w-full items-center justify-between px-5 py-4 text-left"
                      onClick={(event) => toggleModule(index, event.currentTarget.nextElementSibling as HTMLDivElement)}
                    >
                      <span className="font-semibold text-navy">
                        Module {index + 1}: {module.title}
                      </span>
                      <span className="text-xs text-muted">{module.lessons.length} lessons</span>
                    </button>
                    <div className="overflow-hidden" style={{ height: index === openModule ? "auto" : 0 }}>
                      <ul className="space-y-2 px-5 pb-4">
                        {module.lessons.map((lesson) => (
                          <li key={lesson.title} className="flex items-center justify-between text-sm text-ink">
                            <span>{lesson.title}</span>
                            <span className="text-muted">{lesson.duration}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
            {tab === "Instructor" ? (
              <div className="flex flex-col gap-5 rounded-[22px] bg-paper p-6 sm:flex-row">
                <Image
                  src={instructor.image}
                  alt={instructor.name}
                  width={96}
                  height={96}
                  className="h-24 w-24 rounded-2xl object-cover"
                />
                <div>
                  <h2 className="font-serif text-2xl text-navy">{instructor.name}</h2>
                  <p className="text-sm text-gold-deep">{instructor.role}</p>
                  <p className="mt-3 text-sm leading-6 text-muted">{instructor.bio}</p>
                </div>
              </div>
            ) : null}
            {tab === "Reviews" ? (
              <div className="grid gap-4">
                {testimonials.slice(0, 3).map((review) => (
                  <figure key={review.name} className="rounded-[20px] bg-paper p-5">
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, star) => (
                        <StarIcon key={star} />
                      ))}
                    </div>
                    <blockquote className="mt-3 text-sm leading-6 text-ink">“{review.quote}”</blockquote>
                    <figcaption className="mt-4 flex items-center gap-3">
                      <img src={review.image} alt="" className="h-9 w-9 rounded-full object-cover" />
                      <span>
                        <span className="block text-sm font-semibold">{review.name}</span>
                        <span className="block text-xs text-muted">{review.role}</span>
                      </span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <aside className="h-fit rounded-[24px] bg-paper p-6 lift lg:sticky lg:top-24">
          <div className="flex flex-wrap items-end gap-3">
            <span className="font-serif text-5xl text-navy">{money(course.price)}</span>
            <span className="mb-1 text-muted line-through">{money(course.compareAt)}</span>
            <span className="mb-1 text-sm font-semibold text-pine">{percent}% OFF</span>
          </div>
          <div className="mt-5">
            <GoldLink href={`/checkout/${course.slug}`} arrow className="w-full">
              Enroll Now
            </GoldLink>
          </div>
          <h2 className="mt-6 text-sm font-semibold text-navy">What’s Included:</h2>
          <ul className="mt-3 space-y-2.5">
            {courseIncludes(course.modulesCount).map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-ink">
                <CheckIcon className="h-4 w-4 text-pine" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs text-muted">{compactCount(course.reviews)} learners already enrolled.</p>
        </aside>
      </div>

      <div className="mt-16">
        <h2 className="font-serif text-3xl text-navy" data-split>
          More from the catalog
        </h2>
        <div className="scene mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {relatedCourses(course.slug).map((item) => (
            <CourseCard key={item.slug} course={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
