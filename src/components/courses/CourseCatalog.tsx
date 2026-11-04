"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { CheckIcon, FilterIcon } from "@/components/icons";
import { CourseCard } from "@/components/courses/CourseCard";
import { categories, courses, levels, type Category, type Level } from "@/lib/data";
import { ensureGsap, Flip, gsap } from "@/lib/gsap";

const sorts = [
  { id: "popular", label: "Most Popular" },
  { id: "rated", label: "Highest Rated" },
  { id: "low", label: "Price: Low to High" },
  { id: "high", label: "Price: High to Low" },
  { id: "new", label: "Newest" },
] as const;

type SortId = (typeof sorts)[number]["id"];

export function CourseCatalog() {
  const params = useSearchParams();
  const category = params.get("category");
  const starting = categories.find((item) => item === category);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>(starting ? [starting] : []);

  useEffect(() => {
    const match = categories.find((item) => item === category);
    if (match) setSelectedCategories([match]);
  }, [category]);
  const [selectedLevels, setSelectedLevels] = useState<Level[]>([]);
  const [maxPrice, setMaxPrice] = useState(300);
  const [sort, setSort] = useState<SortId>("popular");
  const [drawer, setDrawer] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const asideRef = useRef<HTMLElement>(null);
  const flipState = useRef<ReturnType<typeof Flip.getState> | null>(null);
  const introduced = useRef(false);

  const visible = useMemo(() => {
    const next = courses.filter((course) => {
      const categoryOk = selectedCategories.length === 0 || selectedCategories.includes(course.category);
      const levelOk = selectedLevels.length === 0 || selectedLevels.includes(course.level);
      return categoryOk && levelOk && course.price <= maxPrice;
    });
    next.sort((a, b) => {
      if (sort === "rated") return b.rating - a.rating || b.reviews - a.reviews;
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      if (sort === "new") return Number(b.badge === "New") - Number(a.badge === "New") || b.reviews - a.reviews;
      return b.reviews - a.reviews;
    });
    return next;
  }, [maxPrice, selectedCategories, selectedLevels, sort]);

  const signature = visible.map((course) => course.slug).join("|");

  const capture = (update: () => void) => {
    ensureGsap();
    const nodes = gridRef.current?.querySelectorAll(".course-row");
    flipState.current = nodes && nodes.length ? Flip.getState(nodes) : null;
    update();
  };

  useLayoutEffect(() => {
    ensureGsap();
    const rows = gridRef.current?.querySelectorAll(".course-row");
    if (!rows || introduced.current) return;
    introduced.current = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(
      rows,
      { y: 48, clipPath: "inset(0 0 100% 0)" },
      { y: 0, clipPath: "inset(0 0 0% 0)", duration: 0.95, stagger: 0.08, ease: "power4.out", clearProps: "transform,clipPath" },
    );
  }, []);

  useLayoutEffect(() => {
    if (!flipState.current) return;
    const state = flipState.current;
    flipState.current = null;
    Flip.from(state, {
      duration: 0.75,
      ease: "power4.inOut",
      absolute: true,
      stagger: 0.04,
      prune: true,
      onEnter: (elements) => gsap.fromTo(elements, { y: 28 }, { y: 0, duration: 0.55, ease: "power3.out" }),
      onLeave: (elements) => gsap.to(elements, { autoAlpha: 0, duration: 0.3 }),
    });
  }, [signature]);

  const toggle = <T extends string>(list: T[], value: T) =>
    list.includes(value) ? list.filter((item) => item !== value) : [...list, value];

  const filters = (
    <div className="lift rounded-[22px] bg-paper p-5">
      <FilterGroup title="Categories">
        {categories.map((category) => (
          <FilterCheck
            key={category}
            label={category}
            count={courses.filter((course) => course.category === category).length}
            checked={selectedCategories.includes(category)}
            onChange={() => capture(() => setSelectedCategories((current) => toggle(current, category)))}
          />
        ))}
      </FilterGroup>
      <FilterGroup title="Level">
        {levels.map((level) => (
          <FilterCheck
            key={level}
            label={level}
            count={courses.filter((course) => course.level === level).length}
            checked={selectedLevels.includes(level)}
            onChange={() => capture(() => setSelectedLevels((current) => toggle(current, level)))}
          />
        ))}
      </FilterGroup>
      <div className="mt-6">
        <div className="flex items-center justify-between text-sm font-semibold text-navy">
          <span>Price Range</span>
          <span className="font-medium text-muted">
            $0 — ${maxPrice}
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={300}
          value={maxPrice}
          aria-label="Maximum price"
          style={{ ["--p" as string]: `${(maxPrice / 300) * 100}%` }}
          className="range-gold mt-4"
          onChange={(event) => {
            const value = Number(event.target.value);
            capture(() => setMaxPrice(value));
          }}
        />
      </div>
      {selectedCategories.length || selectedLevels.length || maxPrice < 300 ? (
        <button
          type="button"
          className="mt-5 text-sm font-semibold text-gold-deep"
          onClick={() =>
            capture(() => {
              setSelectedCategories([]);
              setSelectedLevels([]);
              setMaxPrice(300);
            })
          }
        >
          Clear filters
        </button>
      ) : null}
    </div>
  );

  return (
    <div className="shell grid items-start gap-8 pb-20 pt-8 lg:grid-cols-[270px_1fr]">
      <aside ref={asideRef} className={`${drawer ? "block" : "hidden"} lg:block`}>
        {filters}
      </aside>
      <div>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              if (window.innerWidth < 1024) {
                setDrawer((open) => !open);
                return;
              }
              asideRef.current?.scrollIntoView({ block: "start" });
              if (asideRef.current) {
                gsap.fromTo(
                  asideRef.current,
                  { boxShadow: "0 0 0 0 rgba(198,163,90,0)" },
                  { boxShadow: "0 0 0 6px rgba(198,163,90,0.28)", duration: 0.35, yoyo: true, repeat: 1 },
                );
              }
            }}
            className="inline-flex h-11 items-center gap-2 rounded-full border border-line bg-paper px-4 text-sm font-semibold text-navy"
          >
            <FilterIcon />
            Filter Courses
          </button>
          <label className="inline-flex items-center gap-2 text-sm text-muted">
            Sort by:
            <select
              value={sort}
              onChange={(event) => capture(() => setSort(event.target.value as SortId))}
              className="h-11 rounded-full border border-line bg-paper px-3 font-semibold text-navy"
            >
              {sorts.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div ref={gridRef} className="grid gap-5">
          {visible.map((course) => (
            <CourseCard key={course.slug} course={course} layout="row" />
          ))}
        </div>
        {visible.length === 0 ? (
          <div className="lift rounded-[22px] bg-paper px-6 py-16 text-center">
            <p className="font-serif text-3xl text-navy">No courses in this range</p>
            <p className="mt-2 text-sm text-muted">Clear a filter to see the full catalog again.</p>
          </div>
        ) : null}
      </div>
      {drawer ? (
        <button type="button" className="sr-only" onClick={() => setDrawer(false)}>
          Close filters
        </button>
      ) : null}
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="border-b border-line pb-4 pt-2 first:pt-0">
      <h2 className="text-sm font-semibold text-navy">{title}</h2>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function FilterCheck({
  label,
  count,
  checked,
  onChange,
}: {
  label: string;
  count: number;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 py-1.5 text-sm">
      <span className="flex items-center gap-3 text-ink">
        <input type="checkbox" className="peer sr-only" checked={checked} onChange={onChange} />
        <span className="grid h-4 w-4 place-items-center rounded-[4px] border border-[#d9d0c4] text-white peer-checked:border-gold peer-checked:bg-gold peer-checked:[&_svg]:opacity-100">
          <CheckIcon className="h-3 w-3 opacity-0" />
        </span>
        {label}
      </span>
      <span className="text-muted">({count})</span>
    </label>
  );
}
