"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronIcon, StarIcon } from "@/components/icons";
import { testimonials } from "@/lib/data";

const AUTOPLAY_MS = 6500;

/** Signed distance from active, wrapped to -2..2 */
function relative(index: number, active: number, total: number) {
  let diff = (index - active) % total;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff;
}

export function Testimonials() {
  const total = testimonials.length;
  const [active, setActive] = useState(0);
  const paused = useRef(false);

  const go = useCallback(
    (direction: number) => setActive((current) => (current + direction + total) % total),
    [total],
  );

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const id = window.setInterval(() => {
      if (!paused.current) go(1);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [go]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  return (
    <section className="relative overflow-hidden py-20 lg:py-24">
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[55%] h-[520px] w-[1100px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(212,175,92,0.22),rgba(176,112,58,0.16)_45%,transparent_72%)] blur-2xl" />
      </div>

      <div className="shell relative">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">
            <span className="h-px w-14 bg-gold" />
            Learner Stories
            <span className="h-px w-14 bg-gold" />
          </div>
          <h2 className="mt-5 font-serif text-[34px] font-medium leading-[1.12] tracking-[-0.03em] text-ivory sm:text-[46px] lg:text-[52px]">
            <span data-split>Real learners.</span>{" "}
            <em className="gold-text font-medium not-italic" data-split>
              Real results.
            </em>
          </h2>
        </div>

        {/* Coverflow stage */}
        <div
          className="t-stage relative mx-auto mt-12 h-[640px] w-full max-w-[1180px] sm:h-[460px]"
          onMouseEnter={() => (paused.current = true)}
          onMouseLeave={() => (paused.current = false)}
        >
          {testimonials.map((item, index) => {
            const offset = relative(index, active, total);
            const isActive = offset === 0;
            return (
              <article
                key={item.name}
                data-off={offset}
                aria-hidden={!isActive}
                className={`t-item absolute left-1/2 top-1/2 ${isActive ? "t-item--active" : "t-item--side"}`}
                onClick={() => !isActive && go(offset)}
              >
                {isActive ? (
                  <div className="t-card bolt-border grid h-full w-full grid-rows-[auto_1fr] overflow-hidden rounded-[28px] sm:grid-cols-[1.1fr_0.9fr] sm:grid-rows-1">
                    <div className="flex min-h-0 flex-col overflow-hidden p-7 sm:p-8 sm:pr-7">
                      <p className="font-serif text-[24px] leading-[1.15] text-gold sm:text-[27px]">{item.stat}</p>
                      <div className="mt-3 flex gap-1 text-gold">
                        {Array.from({ length: 5 }).map((_, star) => (
                          <StarIcon key={star} className="h-3.5 w-3.5" />
                        ))}
                      </div>
                      <blockquote className="mt-4 font-serif text-[16.5px] leading-[1.6] text-ivory sm:text-[17px]">
                        “{item.quote}”
                      </blockquote>
                      <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
                        <span className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted">Course</span>
                        <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-gold">
                          {item.course}
                        </span>
                      </div>
                    </div>
                    <div className="relative min-h-[260px] sm:min-h-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(min-width: 640px) 360px, 100vw"
                        className="object-cover object-top"
                        priority={index === 0}
                      />
                      <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-[#080a0f]/90 via-[#080a0f]/40 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 px-6 pb-5">
                        <p className="font-serif text-[24px] leading-none tracking-[0.03em] text-ivory sm:text-[26px]">{item.name}</p>
                        <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">{item.role}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    aria-label={`Show ${item.name}'s story`}
                    className="relative block h-full w-full overflow-hidden rounded-[999px] border border-gold/30 shadow-[0_20px_50px_rgba(0,0,0,0.45)]"
                  >
                    <Image src={item.image} alt="" fill sizes="140px" className="object-cover" />
                    <div className="absolute inset-0 bg-[#080a0f]/35" />
                  </button>
                )}
              </article>
            );
          })}
        </div>

        {/* Controls */}
        <div className="mt-10 flex items-center justify-center gap-5">
          <button
            type="button"
            aria-label="Previous story"
            onClick={() => go(-1)}
            className="t-arrow grid h-12 w-12 place-items-center rounded-full border border-gold/40 bg-white/5 text-ivory transition hover:border-gold hover:bg-gold hover:text-[#080a0f]"
          >
            <ChevronIcon direction="left" />
          </button>
          <div className="flex items-center gap-2">
            {testimonials.map((item, index) => (
              <button
                key={item.name}
                type="button"
                aria-label={`Go to story ${index + 1}`}
                onClick={() => setActive(index)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  index === active ? "w-8 bg-gold" : "w-1.5 bg-ivory/30 hover:bg-ivory/60"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Next story"
            onClick={() => go(1)}
            className="t-arrow grid h-12 w-12 place-items-center rounded-full border border-gold/40 bg-white/5 text-ivory transition hover:border-gold hover:bg-gold hover:text-[#080a0f]"
          >
            <ChevronIcon direction="right" />
          </button>
        </div>
      </div>
    </section>
  );
}
