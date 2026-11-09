import Image from "next/image";
import Link from "next/link";
import { AwardIcon, BookIcon, ClockIcon, LevelIcon, StarIcon } from "@/components/icons";
import { GoldLink } from "@/components/site/Buttons";
import type { Course } from "@/lib/data";
import { compactCount } from "@/lib/format";

export function CourseCard({ course, layout = "grid" }: { course: Course; layout?: "grid" | "row" }) {
  const media = (
    <Link href={`/courses/${course.slug}`} className={`relative block overflow-hidden ${layout === "grid" ? "aspect-[16/10]" : "min-h-[210px]"}`}>
      <Image
        src={course.image}
        alt=""
        fill
        sizes={layout === "grid" ? "(min-width: 1024px) 360px, 100vw" : "(min-width: 1024px) 300px, 100vw"}
        className="object-cover"
        data-zoom
      />
      {course.badge ? (
        <span className="absolute left-3 top-3 rounded-full bg-[#0f1218]/90 px-2.5 py-1 text-[11px] font-semibold text-ivory">
          {course.badge}
        </span>
      ) : null}
    </Link>
  );

  const body = (
    <div className={`flex flex-1 flex-col ${layout === "grid" ? "p-5" : "p-6"}`}>
      <h3 className="font-serif text-[22px] font-medium leading-tight text-navy">
        <Link href={`/courses/${course.slug}`} className="hover:text-gold-deep">
          {course.title}
        </Link>
      </h3>
      <p className="mt-2 text-sm leading-6 text-muted">{course.summary}</p>
      <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted">
        <span className="inline-flex items-center gap-1.5">
          <BookIcon className="h-3.5 w-3.5 text-gold" />
          {course.modulesCount} Modules
        </span>
        <span className="inline-flex items-center gap-1.5">
          <ClockIcon className="h-3.5 w-3.5 text-gold" />
          {course.hours} Hours
        </span>
        {layout === "row" ? (
          <span className="inline-flex items-center gap-1.5">
            <LevelIcon className="h-3.5 w-3.5 text-gold" />
            {course.level}
          </span>
        ) : null}
      </div>
      <div className="mt-auto flex items-end justify-between gap-3 pt-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-navy">${course.price}</span>
            <span className="text-sm text-muted line-through">${course.compareAt}</span>
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-muted">
            <StarIcon />
            <span className="font-semibold text-navy">{course.rating}</span>
            <span>({compactCount(course.reviews)})</span>
          </div>
        </div>
        <GoldLink href={`/checkout/${course.slug}`} arrow className="h-10 shrink-0 px-4">
          Enroll Now
        </GoldLink>
      </div>
    </div>
  );

  if (layout === "row") {
    return (
      <article data-tilt="soft" className="course-row glass grid overflow-hidden rounded-[22px] md:grid-cols-[280px_1fr]">
        {media}
        {body}
      </article>
    );
  }

  return (
    <div data-rise className="h-full">
      <article data-tilt className="glass bolt-border flex h-full flex-col overflow-hidden rounded-[22px]">
        {media}
        {body}
      </article>
    </div>
  );
}

export function MetaRow({ course }: { course: Course }) {
  const items = [
    { icon: <BookIcon className="h-4 w-4" />, label: `${course.modulesCount} Modules` },
    { icon: <ClockIcon className="h-4 w-4" />, label: `${course.hours} Hours` },
    { icon: <LevelIcon className="h-4 w-4" />, label: course.level },
    { icon: <AwardIcon className="h-4 w-4" />, label: "Certificate Included" },
  ];
  return (
    <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink">
      {items.map((item) => (
        <li key={item.label} className="inline-flex items-center gap-2 text-muted">
          <span className="text-gold">{item.icon}</span>
          {item.label}
        </li>
      ))}
    </ul>
  );
}
