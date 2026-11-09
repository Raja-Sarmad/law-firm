"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/site/Logo";
import { GoldLink } from "@/components/site/Buttons";
import { ChevronIcon, CloseIcon, MenuIcon, SearchIcon } from "@/components/icons";
import { categories, courses } from "@/lib/data";
import { gsap } from "@/lib/gsap";

const links = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses", menu: true },
  { href: "/practice-areas", label: "Practice Areas" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const [learner, setLearner] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const read = () => setLearner(sessionStorage.getItem("bylaw-learner"));
    read();
    window.addEventListener("bylaw-auth", read);
    return () => window.removeEventListener("bylaw-auth", read);
  }, [pathname]);

  useEffect(() => {
    setCoursesOpen(false);
    setSearchOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setCoursesOpen(false);
        setSearchOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useLayoutEffect(() => {
    if (!coursesOpen || !panelRef.current) return;
    const panel = panelRef.current;
    const items = panel.querySelectorAll("a");
    const tl = gsap.timeline();
    tl.fromTo(panel, { clipPath: "inset(0 0 100% 0)", y: -8 }, { clipPath: "inset(0 0 0% 0)", y: 0, duration: 0.5, ease: "power4.out" });
    tl.fromTo(items, { yPercent: 40 }, { yPercent: 0, stagger: 0.035, duration: 0.45, ease: "power3.out" }, 0.05);
    return () => {
      tl.kill();
    };
  }, [coursesOpen]);

  useLayoutEffect(() => {
    if (!searchOpen || !searchRef.current) return;
    const tl = gsap.timeline();
    tl.fromTo(searchRef.current, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.55, ease: "power4.inOut" });
    tl.from(".search-line", { yPercent: 110, stagger: 0.06, duration: 0.6, ease: "power4.out" }, 0.1);
    return () => {
      tl.kill();
    };
  }, [searchOpen]);

  useLayoutEffect(() => {
    if (!mobileOpen || !mobileRef.current) return;
    const linksInMenu = mobileRef.current.querySelectorAll("[data-mobile-link]");
    const tl = gsap.timeline();
    tl.fromTo(mobileRef.current, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.55, ease: "power4.inOut" });
    tl.fromTo(linksInMenu, { yPercent: 80 }, { yPercent: 0, stagger: 0.05, duration: 0.55, ease: "power4.out" }, 0.08);
    return () => {
      tl.kill();
    };
  }, [mobileOpen]);

  const results = courses
    .filter((course) => {
      const haystack = `${course.title} ${course.category} ${course.summary}`.toLowerCase();
      return haystack.includes(query.trim().toLowerCase());
    })
    .slice(0, 5);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-[background,box-shadow,border-color] duration-300 ${
        scrolled
          ? "border-gold/20 bg-[#080a0f]/86 shadow-[0_16px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl"
          : "border-transparent bg-[#0e1117]/35 backdrop-blur-md"
      }`}
    >
      <div className="shell-wide flex h-[68px] items-center justify-between gap-3 sm:h-[78px] sm:gap-4">
        <Logo />
        <nav className="hidden items-center gap-5 xl:gap-7 lg:flex" aria-label="Primary">
          {links.map((link) =>
            link.menu ? (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => setCoursesOpen(true)}
                onMouseLeave={() => setCoursesOpen(false)}
              >
                <button
                  type="button"
                  className={`relative inline-flex items-center gap-1 text-[15px] font-medium ${
                    isActive(pathname, link.href) ? "text-ivory" : "text-ink"
                  }`}
                  aria-expanded={coursesOpen}
                  onClick={() => setCoursesOpen((open) => !open)}
                >
                  {link.label}
                  <ChevronIcon className={`h-3.5 w-3.5 transition-transform ${coursesOpen ? "rotate-180" : ""}`} />
                  <span
                    className={`absolute -bottom-2.5 left-1/2 h-px w-5 -translate-x-1/2 bg-gold ${
                      isActive(pathname, link.href) ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </button>
                {coursesOpen ? (
                  <div className="absolute left-1/2 top-full w-64 -translate-x-1/2 pt-4">
                    <div ref={panelRef} className="glass overflow-hidden rounded-2xl p-2">
                      <Link href="/courses" className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-ivory hover:bg-white/5">
                        All courses
                      </Link>
                      {categories.map((category) => (
                        <Link
                          key={category}
                          href={`/courses?category=${encodeURIComponent(category)}`}
                          className="block overflow-hidden rounded-xl px-3 py-2 text-sm text-ink hover:bg-white/5"
                        >
                          {category}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-[15px] font-medium ${isActive(pathname, link.href) ? "text-ivory" : "text-ink"}`}
                aria-current={isActive(pathname, link.href) ? "page" : undefined}
              >
                {link.label}
                <span
                  className={`absolute -bottom-2.5 left-1/2 h-px w-5 -translate-x-1/2 bg-gold ${
                    isActive(pathname, link.href) ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </Link>
            ),
          )}
        </nav>
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            aria-label="Search courses"
            className="grid h-10 w-10 place-items-center rounded-full text-ivory hover:bg-white/5"
            onClick={() => setSearchOpen(true)}
          >
            <SearchIcon />
          </button>
          <Link href="/login" className="hidden text-sm font-semibold text-ivory sm:inline">
            {learner ?? "Login"}
          </Link>
          <span className="hidden sm:block">
            <GoldLink href="/courses" className="h-10 whitespace-nowrap px-4">
              Enroll Now
            </GoldLink>
          </span>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-gold/25 bg-white/5 lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {searchOpen ? (
        <div ref={searchRef} className="fixed inset-0 z-40 bg-[#080a0f] px-6 pt-28">
          <div className="shell">
            <div className="flex items-end justify-between gap-4">
              <p className="search-line overflow-hidden font-serif text-4xl text-ivory">Search the academy</p>
              <button type="button" aria-label="Close search" onClick={() => setSearchOpen(false)}>
                <CloseIcon />
              </button>
            </div>
            <label className="mt-8 block">
              <span className="sr-only">Search</span>
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Contract drafting, governance, criminal procedure..."
                className="search-line h-14 w-full border-b border-gold/25 bg-transparent font-serif text-2xl outline-none placeholder:text-muted/70"
              />
            </label>
            <ul className="mt-6 divide-y divide-gold/15">
              {(query.trim() ? results : courses.slice(0, 4)).map((course) => (
                <li key={course.slug}>
                  <Link href={`/courses/${course.slug}`} className="flex items-center justify-between gap-4 py-4">
                    <span>
                      <span className="block font-medium text-ivory">{course.title}</span>
                      <span className="text-sm text-muted">{course.category}</span>
                    </span>
                    <span className="text-sm font-semibold text-gold">${course.price}</span>
                  </Link>
                </li>
              ))}
              {query.trim() && results.length === 0 ? (
                <li className="py-6 text-sm text-muted">No courses match that search.</li>
              ) : null}
            </ul>
          </div>
        </div>
      ) : null}

      {mobileOpen ? (
        <div ref={mobileRef} className="fixed inset-x-0 bottom-0 top-[68px] z-40 overflow-auto bg-[#080a0f] px-6 py-8 sm:top-[78px] lg:hidden">
          <nav className="flex flex-col gap-2" aria-label="Mobile">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-mobile-link
                className="overflow-hidden font-serif text-4xl text-ivory"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/login" data-mobile-link className="mt-4 overflow-hidden text-lg text-ink">
              {learner ?? "Login"}
            </Link>
            <div data-mobile-link className="mt-4">
              <GoldLink href="/courses" arrow>
                Enroll Now
              </GoldLink>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
