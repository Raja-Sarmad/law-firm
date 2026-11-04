"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "@/components/icons";
import { gsap } from "@/lib/gsap";
import type { Chapter } from "@/lib/data";

export function FilmTrigger({
  image,
  alt,
  chapters,
  children,
  className,
}: {
  image: string;
  alt: string;
  chapters: Chapter[];
  children: ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        {children}
      </button>
      {open ? <FilmModal image={image} alt={alt} chapters={chapters} onClose={() => setOpen(false)} /> : null}
    </>
  );
}

function FilmModal({
  image,
  alt,
  chapters,
  onClose,
}: {
  image: string;
  alt: string;
  chapters: Chapter[];
  onClose: () => void;
}) {
  const root = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useLayoutEffect(() => {
    if (!mounted || !root.current) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const frame = root.current.querySelector("[data-frame]");
    const photo = root.current.querySelector("[data-photo]");
    const bar = root.current.querySelector("[data-bar]");
    const caps = chapters.map((_, index) => root.current?.querySelector(`[data-cap="${index}"]`));
    const tl = gsap.timeline();
    tl.fromTo(root.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35, ease: "power2.out" });
    if (frame) tl.fromTo(frame, { clipPath: "inset(12% round 28px)" }, { clipPath: "inset(0% round 28px)", duration: 0.9, ease: "power4.inOut" }, 0);
    if (photo) tl.fromTo(photo, { scale: 1.18 }, { scale: 1.05, duration: 7.5, ease: "none" }, 0.2);
    if (bar) tl.fromTo(bar, { scaleX: 0 }, { scaleX: 1, duration: 7.2, ease: "none" }, 0.3);
    caps.forEach((cap, index) => {
      if (!cap) return;
      tl.fromTo(cap, { yPercent: 40, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.55, ease: "power3.out" }, 0.55 + index * 2.2);
      if (index < caps.length - 1) {
        tl.to(cap, { yPercent: -24, autoAlpha: 0, duration: 0.35 }, 0.55 + (index + 1) * 2.2 - 0.35);
      }
    });
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      tl.kill();
    };
  }, [chapters, mounted, onClose]);

  if (!mounted) return null;

  return createPortal(
    <div ref={root} className="fixed inset-0 z-[75] bg-banner/88 p-4 sm:p-8" role="dialog" aria-modal="true" aria-label="Story">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute right-5 top-5 z-10 grid h-11 w-11 place-items-center rounded-full bg-paper text-navy"
      >
        <CloseIcon />
      </button>
      <div data-frame className="relative mx-auto h-full max-h-[820px] max-w-5xl overflow-hidden rounded-[28px]">
        <img data-photo src={image} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-banner via-banner/20 to-transparent" />
        <div data-bar className="absolute left-0 top-0 h-[3px] w-full origin-left bg-gold" />
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
          {chapters.map((chapter, index) => (
            <div key={chapter.title} data-cap={index} className="absolute inset-x-6 bottom-8 sm:inset-x-10" style={{ opacity: index === 0 ? 1 : 0 }}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">{chapter.kicker}</p>
              <h3 className="mt-2 font-serif text-3xl text-white sm:text-5xl">{chapter.title}</h3>
              <p className="mt-3 max-w-xl text-sm leading-6 text-white/80 sm:text-base">{chapter.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.body,
  );
}
