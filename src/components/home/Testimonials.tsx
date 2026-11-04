"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronIcon, StarIcon } from "@/components/icons";
import { SectionLabel } from "@/components/site/Crumb";
import { testimonials } from "@/lib/data";
import { gsap } from "@/lib/gsap";

export function Testimonials() {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    let pointer = 0;
    let startX = 0;
    let origin = 0;
    let dragging = false;

    const visible = () => (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1);
    const step = () => {
      const card = element.querySelector<HTMLElement>("[data-card]");
      if (!card) return 0;
      const styles = window.getComputedStyle(element);
      const gap = Number.parseFloat(styles.columnGap || styles.gap || "0");
      return card.offsetWidth + gap;
    };
    const max = () => Math.max(0, testimonials.length - visible());
    const go = (next: number) => {
      const clamped = gsap.utils.clamp(0, max(), next);
      indexRef.current = clamped;
      setIndex(clamped);
      gsap.to(element, { x: -clamped * step(), duration: 0.9, ease: "power4.inOut" });
    };

    const onDown = (event: PointerEvent) => {
      if ((event.target as HTMLElement).closest("button")) return;
      dragging = true;
      pointer = event.clientX;
      origin = Number(gsap.getProperty(element, "x"));
      element.setPointerCapture(event.pointerId);
    };
    const onMove = (event: PointerEvent) => {
      if (!dragging) return;
      gsap.set(element, { x: origin + event.clientX - pointer });
    };
    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      const x = Number(gsap.getProperty(element, "x"));
      go(Math.round(-x / Math.max(step(), 1)));
    };
    const onResize = () => go(indexRef.current);

    element.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("resize", onResize);
    const api = { go };
    element.dataset.ready = "1";
    (element as HTMLDivElement & { __go?: (n: number) => void }).__go = api.go;

    return () => {
      element.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const shift = (direction: number) => {
    const element = track.current as (HTMLDivElement & { __go?: (n: number) => void }) | null;
    element?.__go?.(indexRef.current + direction);
  };

  return (
    <section className="shell pb-24">
      <div className="flex items-end justify-between gap-4">
        <div>
          <SectionLabel>Testimonials</SectionLabel>
          <h2 className="mt-3 font-serif text-4xl font-medium tracking-[-0.03em] text-navy sm:text-5xl" data-split>
            What Our Learners Say
          </h2>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Previous testimonials"
            onClick={() => shift(-1)}
            disabled={index === 0}
            className="grid h-11 w-11 place-items-center rounded-full border border-line bg-paper text-navy disabled:opacity-40"
          >
            <ChevronIcon direction="left" />
          </button>
          <button
            type="button"
            aria-label="Next testimonials"
            onClick={() => shift(1)}
            disabled={index >= testimonials.length - 1}
            className="grid h-11 w-11 place-items-center rounded-full border border-line bg-paper text-navy disabled:opacity-40"
          >
            <ChevronIcon direction="right" />
          </button>
        </div>
      </div>
      <div className="mt-8 overflow-hidden" data-drag>
        <div ref={track} className="flex cursor-grab gap-5 active:cursor-grabbing">
          {testimonials.map((item) => (
            <figure
              key={item.name}
              data-card
              className="lift w-[86%] shrink-0 rounded-[22px] bg-paper p-6 sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]"
            >
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, star) => (
                  <StarIcon key={star} />
                ))}
              </div>
              <blockquote className="mt-4 font-serif text-[17px] leading-7 text-navy">“{item.quote}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <img src={item.image} alt="" className="h-11 w-11 rounded-full object-cover" />
                <span>
                  <span className="block text-sm font-semibold text-navy">{item.name}</span>
                  <span className="block text-xs text-muted">{item.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
