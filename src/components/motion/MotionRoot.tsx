"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "@/components/site/Logo";
import { ensureGsap, gsap, ScrollTrigger } from "@/lib/gsap";

const INTRO_KEY = "bylaw-introduced";

function splitElement(el: HTMLElement) {
  const mode = el.dataset.split === "chars" ? "chars" : "words";
  const original = (el.dataset.original ?? el.textContent ?? "").replace(/\s+/g, " ").trim();
  el.dataset.original = original;
  el.textContent = "";
  const targets: HTMLElement[] = [];
  original.split(" ").forEach((word, index, list) => {
    const mask = document.createElement("span");
    mask.className = "split-mask";
    if (mode === "words") {
      const inner = document.createElement("span");
      inner.className = "split-target";
      inner.textContent = word;
      mask.appendChild(inner);
      targets.push(inner);
    } else {
      word.split("").forEach((char) => {
        const inner = document.createElement("span");
        inner.className = "split-target";
        inner.textContent = char;
        mask.appendChild(inner);
        targets.push(inner);
      });
    }
    el.appendChild(mask);
    if (index < list.length - 1) el.appendChild(document.createTextNode(" "));
  });
  return targets;
}

function whenReady() {
  if (
    document.documentElement.dataset.ready === "true" ||
    document.documentElement.hasAttribute("data-skip-intro")
  ) {
    return Promise.resolve();
  }
  return new Promise<void>((resolve) => {
    window.addEventListener("bylaw:ready", () => resolve(), { once: true });
  });
}

function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced || !dot.current || !ring.current) return;
    document.documentElement.classList.add("has-cursor");
    const xTo = gsap.quickTo(dot.current, "x", { duration: 0.18, ease: "power3.out" });
    const yTo = gsap.quickTo(dot.current, "y", { duration: 0.18, ease: "power3.out" });
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.55, ease: "power3.out" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.55, ease: "power3.out" });
    const move = (event: PointerEvent) => {
      xTo(event.clientX);
      yTo(event.clientY);
      rx(event.clientX);
      ry(event.clientY);
      const hot = (event.target as HTMLElement | null)?.closest?.(
        "a, button, input, textarea, select, [data-tilt], [data-drag], [data-magnetic]",
      );
      gsap.to(ring.current, {
        scale: hot ? 1.65 : 1,
        borderColor: hot ? "#1b2433" : "rgba(198,163,90,0.9)",
        duration: 0.35,
        ease: "power3.out",
      });
    };
    const down = () => gsap.to(dot.current, { scale: 0.6, duration: 0.2 });
    const up = () => gsap.to(dot.current, { scale: 1, duration: 0.3, ease: "power3.out" });
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  return (
    <>
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[70] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold"
      />
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[70] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/80"
      />
    </>
  );
}

function Preloader() {
  const [alive, setAlive] = useState(true);
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const skip =
      reduced ||
      document.documentElement.hasAttribute("data-skip-intro") ||
      sessionStorage.getItem(INTRO_KEY) === "1";

    const finish = () => {
      sessionStorage.setItem(INTRO_KEY, "1");
      document.documentElement.setAttribute("data-skip-intro", "true");
      document.documentElement.dataset.ready = "true";
      window.dispatchEvent(new Event("bylaw:ready"));
      setAlive(false);
    };

    if (skip || !root.current) {
      finish();
      return;
    }

    const tl = gsap.timeline({ onComplete: finish });
    tl.from(".pre-mark", { y: 24, clipPath: "inset(0 0 100% 0)", duration: 0.75, ease: "power4.out" });
    tl.fromTo(".pre-line", { scaleX: 0 }, { scaleX: 1, duration: 0.55, ease: "power3.inOut" }, 0.25);
    tl.to(".pre-mark", { y: -16, autoAlpha: 0, duration: 0.35, ease: "power2.in" }, 1.2);
    tl.to(".pre-left", { xPercent: -100, duration: 0.95, ease: "power4.inOut" }, 1.28);
    tl.to(".pre-right", { xPercent: 100, duration: 0.95, ease: "power4.inOut" }, 1.28);
    return () => {
      tl.kill();
    };
  }, []);

  if (!alive) return null;

  return (
    <div ref={root} className="preloader fixed inset-0 z-[80]">
      <div className="pre-left absolute inset-y-0 left-0 w-1/2 bg-cream" />
      <div className="pre-right absolute inset-y-0 right-0 w-1/2 bg-cream" />
      <div className="pre-mark absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        <Logo />
        <span className="pre-line mt-6 block h-px w-28 origin-left bg-gold" />
      </div>
    </div>
  );
}

export function MotionRoot({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const routerRef = useRef(router);
  const armed = useRef(false);

  useEffect(() => {
    routerRef.current = router;
  }, [router]);

  useEffect(() => {
    ensureGsap();
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const magnetics = new WeakMap<HTMLElement, { x: (v: number) => void; y: (v: number) => void }>();
    const tilts = new WeakMap<
      HTMLElement,
      { rx: (v: number) => void; ry: (v: number) => void; z: ((v: number) => void) | null }
    >();
    let magnetic: HTMLElement | null = null;
    let tilted: HTMLElement | null = null;
    const glow = document.querySelector<HTMLElement>("[data-glow]");
    const glowX = glow ? gsap.quickTo(glow, "x", { duration: 0.9, ease: "power3.out" }) : null;
    const glowY = glow ? gsap.quickTo(glow, "y", { duration: 0.9, ease: "power3.out" }) : null;

    const magneticFor = (el: HTMLElement) => {
      const target = el.querySelector<HTMLElement>(".magnetic-inner") ?? el;
      let api = magnetics.get(target);
      if (!api) {
        api = {
          x: gsap.quickTo(target, "x", { duration: 0.45, ease: "power3.out" }),
          y: gsap.quickTo(target, "y", { duration: 0.45, ease: "power3.out" }),
        };
        magnetics.set(target, api);
      }
      return api;
    };

    const tiltFor = (el: HTMLElement) => {
      let api = tilts.get(el);
      if (!api) {
        const zoom = el.querySelector("[data-zoom]");
        api = {
          rx: gsap.quickTo(el, "rotateX", { duration: 0.6, ease: "power3.out" }),
          ry: gsap.quickTo(el, "rotateY", { duration: 0.6, ease: "power3.out" }),
          z: zoom ? gsap.quickTo(zoom, "scale", { duration: 0.8, ease: "power3.out" }) : null,
        };
        tilts.set(el, api);
      }
      return api;
    };

    const resetMagnetic = (el: HTMLElement | null) => {
      if (!el) return;
      const target = el.querySelector<HTMLElement>(".magnetic-inner") ?? el;
      const api = magnetics.get(target);
      api?.x(0);
      api?.y(0);
    };

    const resetTilt = (el: HTMLElement | null) => {
      if (!el) return;
      const api = tilts.get(el);
      api?.rx(0);
      api?.ry(0);
      api?.z?.(1);
    };

    const onMove = (event: PointerEvent) => {
      glowX?.(event.clientX - 220);
      glowY?.(event.clientY - 220);
      const target = event.target as HTMLElement | null;
      const nextMagnetic = target?.closest?.<HTMLElement>("[data-magnetic]") ?? null;
      if (magnetic && magnetic !== nextMagnetic) resetMagnetic(magnetic);
      magnetic = nextMagnetic;
      if (nextMagnetic) {
        const box = nextMagnetic.getBoundingClientRect();
        const api = magneticFor(nextMagnetic);
        api.x((event.clientX - (box.left + box.width / 2)) * 0.28);
        api.y((event.clientY - (box.top + box.height / 2)) * 0.4);
      }

      const nextTilt = target?.closest?.<HTMLElement>("[data-tilt]") ?? null;
      if (tilted && tilted !== nextTilt) resetTilt(tilted);
      tilted = nextTilt;
      if (nextTilt) {
        const box = nextTilt.getBoundingClientRect();
        const px = (event.clientX - box.left) / box.width - 0.5;
        const py = (event.clientY - box.top) / box.height - 0.5;
        const max = nextTilt.dataset.tilt === "soft" ? 4 : 8;
        const api = tiltFor(nextTilt);
        api.rx(-py * max);
        api.ry(px * max);
        api.z?.(1.07);
      }
    };

    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as HTMLElement | null)?.closest?.("a");
      if (!anchor) return;
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      const here = `${window.location.pathname}${window.location.search}`;
      const next = `${url.pathname}${url.search}`;
      if (here === next) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      event.preventDefault();
      event.stopPropagation();
      const wipe = document.getElementById("page-wipe");
      if (!wipe) {
        routerRef.current.push(`${url.pathname}${url.search}${url.hash}`);
        return;
      }
      wipe.style.pointerEvents = "auto";
      gsap
        .timeline()
        .set(wipe, { scaleX: 0, transformOrigin: "left center" })
        .to(wipe, { scaleX: 1, duration: 0.62, ease: "power4.inOut" })
        .add(() => routerRef.current.push(`${url.pathname}${url.search}${url.hash}`));
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => {
    ensureGsap();
    const wipe = document.getElementById("page-wipe");
    if (!wipe || !armed.current) {
      armed.current = true;
    } else {
      const scale = Number(gsap.getProperty(wipe, "scaleX"));
      if (scale > 0.85) {
        window.scrollTo(0, 0);
        gsap.set(wipe, { transformOrigin: "right center" });
        gsap.to(wipe, {
          scaleX: 0,
          duration: 0.75,
          ease: "power4.inOut",
          onComplete: () => {
            wipe.style.pointerEvents = "none";
          },
        });
      }
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const touched: HTMLElement[] = [];
    let cancelled = false;
    let ctx: { revert: () => void; add: (fn: () => void) => void } | null = null;
    let interval = 0;
    const run = () => {
      if (cancelled || document.documentElement.dataset.hydrated !== pathname) return;
      window.clearInterval(interval);
      const context = gsap.context(() => {
      const hero = document.querySelector<HTMLElement>("[data-hero]");
      document.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
        const targets = splitElement(el);
        touched.push(el);
        gsap.set(targets, { yPercent: 120 });
        if (hero?.contains(el)) return;
        gsap.to(targets, {
          yPercent: 0,
          duration: 1.05,
          stagger: el.dataset.split === "chars" ? 0.018 : 0.045,
          ease: "power4.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      document.querySelectorAll<HTMLElement>("[data-rise]").forEach((el) => {
        if (hero?.contains(el)) return;
        gsap.set(el, { y: 70, rotateX: 12, transformOrigin: "50% 0%" });
        const zoom = el.querySelector("[data-zoom]");
        if (zoom) gsap.set(zoom, { scale: 1.22 });
        gsap.to(el, {
          y: 0,
          rotateX: 0,
          duration: 1.15,
          ease: "power4.out",
          scrollTrigger: { trigger: el, start: "top 86%" },
        });
        if (zoom) {
          gsap.to(zoom, {
            scale: 1,
            duration: 1.35,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 86%" },
          });
        }
      });

      document.querySelectorAll<HTMLElement>("[data-clip]").forEach((el) => {
        if (hero?.contains(el)) return;
        gsap.set(el, { clipPath: "inset(14% 12% 14% 12% round 24px)" });
        gsap.to(el, {
          clipPath: "inset(0% 0% 0% 0% round 24px)",
          duration: 1.25,
          ease: "power4.inOut",
          scrollTrigger: { trigger: el, start: "top 84%" },
        });
      });

      document.querySelectorAll<HTMLElement>("[data-draw-line]").forEach((el) => {
        if (hero?.contains(el)) return;
        gsap.fromTo(
          el,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%" },
          },
        );
      });

      document.querySelectorAll<SVGGeometryElement>(".draw-stroke").forEach((path) => {
        const length = path.getTotalLength?.() || 80;
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.25,
          ease: "power2.inOut",
          scrollTrigger: { trigger: path, start: "top 88%" },
        });
      });

      document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        const target = Number(el.dataset.count || 0);
        const suffix = el.dataset.suffix || "";
        const format = el.dataset.format || "plain";
        const proxy = { n: 0 };
        gsap.to(proxy, {
          n: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
          onUpdate: () => {
            const text =
              format === "comma"
                ? Math.round(proxy.n).toLocaleString("en-US")
                : format === "decimal"
                  ? proxy.n.toFixed(1)
                  : String(Math.round(proxy.n));
            el.textContent = `${text}${suffix}`;
          },
        });
      });

      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        const amount = Number(el.dataset.parallax || 8);
        gsap.fromTo(
          el,
          { yPercent: -amount, scale: 1.14 },
          {
            yPercent: amount,
            scale: 1.14,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      const bar = document.getElementById("scroll-progress");
      if (bar) {
        gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });
        gsap.to(bar, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: 0.35 },
        });
      }

      document.querySelectorAll<HTMLElement>("[data-orb]").forEach((orb, index) => {
        gsap.to(orb, {
          x: index % 2 === 0 ? 70 : -56,
          y: index % 2 === 0 ? -64 : 80,
          duration: 9 + index * 2.2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });

      document.querySelectorAll<HTMLElement>("[data-colonnade]").forEach((column) => {
        const toward = column.dataset.colonnade === "right" ? 12 : -16;
        gsap.to(column, {
          yPercent: toward,
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: 1.15 },
        });
      });

      const spot = document.querySelector("[data-spotlight]");
      if (spot) {
        gsap.fromTo(
          spot,
          { yPercent: -24, xPercent: -8 },
          {
            yPercent: 58,
            xPercent: 10,
            ease: "none",
            scrollTrigger: { start: 0, end: "max", scrub: 0.65 },
          },
        );
      }

      const scales = document.querySelector("[data-scales]");
      if (scales) {
        gsap.to(scales, {
          rotation: 7,
          duration: 6.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          transformOrigin: "50% 11%",
        });
      }

      if (hero) {
        const chars = Array.from(hero.querySelectorAll<HTMLElement>("[data-split] .split-target"));
        const hall = hero.querySelector("[data-hero-bg]");
        if (hall) {
          gsap.fromTo(
            hall,
            { scale: 1.08, xPercent: 0 },
            { scale: 1.16, xPercent: -2, duration: 16, ease: "sine.inOut", yoyo: true, repeat: -1 },
          );
        }
        const statue = hero.querySelector("[data-statue]");
        if (statue) {
          gsap.to(statue, {
            y: -22,
            x: 14,
            rotation: 1.6,
            scale: 1.035,
            duration: 3.4,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            transformOrigin: "50% 80%",
          });
        }
        const photo = hero.querySelector("[data-hero-photo]");
        const rises = hero.querySelectorAll("[data-hero-rise]");
        const line = hero.querySelector("[data-hero-line]");
        if (photo) gsap.set(photo, { clipPath: "inset(8% 6% 10% 12%)", scale: 1.14 });
        gsap.set(rises, { y: 32 });
        if (line) gsap.set(line, { scaleX: 0, transformOrigin: "left center" });
        const parallax = hero.querySelector("[data-hero-parallax]");
        if (parallax) {
          gsap.to(parallax, {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        }
        whenReady().then(() => {
          if (cancelled) return;
          context.add(() => {
            const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
            tl.to(chars, { yPercent: 0, duration: 1.15, stagger: 0.02 }, 0.05);
            if (line) tl.to(line, { scaleX: 1, duration: 0.7, ease: "power3.inOut" }, 0.05);
            if (photo) {
              tl.to(photo, { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1.55 }, 0);
            }
            tl.to(rises, { y: 0, duration: 1, stagger: 0.08 }, 0.35);
          });
        });
      }

      ScrollTrigger.refresh();
      });
      ctx = context;
    };
    run();
    if (!ctx) interval = window.setInterval(run, 32);

    const refresh = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("load", refresh);
    const later = window.setTimeout(refresh, 500);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
      window.removeEventListener("load", refresh);
      window.clearTimeout(later);
      ctx?.revert();
      touched.forEach((el) => {
        if (el.dataset.original != null) {
          el.textContent = el.dataset.original;
          delete el.dataset.original;
        }
      });
    };
  }, [pathname]);

  return (
    <>
      <div id="scroll-progress" className="pointer-events-none fixed left-0 top-0 z-[55] h-[2px] w-full origin-left scale-x-0 bg-gold" />
      <div id="page-wipe" className="pointer-events-none fixed inset-0 z-[60] origin-left scale-x-0 bg-cream" />
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-paper focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <Preloader />
      <Cursor />
      {children}
    </>
  );
}
