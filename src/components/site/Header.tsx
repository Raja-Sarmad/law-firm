"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/site/Logo";
import { GoldLink } from "@/components/site/Buttons";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { gsap } from "@/lib/gsap";

const links = [
  { href: "/", label: "Home" },
  { href: "/audit", label: "The Audit" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [learner, setLearner] = useState<string | null>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const read = () => setLearner(sessionStorage.getItem("bylaw-learner"));
    read();
    window.addEventListener("bylaw-auth", read);
    return () => window.removeEventListener("bylaw-auth", read);
  }, [pathname]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

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

  return (
    <header
      className={`sticky top-0 z-50 border-b border-gold/30 bg-[#10131a] transition-shadow duration-300 ${
        scrolled ? "shadow-[0_12px_28px_rgba(0,0,0,0.35)]" : ""
      }`}
    >
      <div className="shell-wide flex h-[68px] items-center justify-between gap-3 sm:h-[78px] sm:gap-4">
        <Logo />
        <nav className="hidden items-center gap-5 lg:flex xl:gap-7" aria-label="Primary">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-3.5 py-1.5 text-[15px] font-medium transition-colors ${
                isActive(pathname, link.href)
                  ? "bg-gradient-to-b from-[#f3dc9a] to-[#d4af5c] text-[#10131a]"
                  : "text-ink hover:text-ivory"
              }`}
              aria-current={isActive(pathname, link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3 sm:gap-4">
          <Link href="/login" className="hidden text-sm font-semibold text-ivory sm:inline">
            {learner ?? "Login"}
          </Link>
          <span className="hidden sm:block">
            <GoldLink href="/#challenge" className="h-10 whitespace-nowrap px-4 shadow-none">
              Join the Free Challenge
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

      {mobileOpen ? (
        <div ref={mobileRef} className="fixed inset-x-0 bottom-0 top-[68px] z-40 overflow-auto bg-[#0f1218] px-6 py-8 sm:top-[78px] lg:hidden">
          <nav className="flex flex-col gap-2" aria-label="Mobile">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-mobile-link
                className={`overflow-hidden font-serif text-4xl ${
                  isActive(pathname, link.href)
                    ? "w-fit rounded-full bg-gradient-to-r from-[#f3dc9a] to-[#d4af5c] px-4 text-[#10131a]"
                    : "text-ivory"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/login" data-mobile-link className="mt-4 overflow-hidden text-lg text-ink">
              {learner ?? "Login"}
            </Link>
            <div data-mobile-link className="mt-4">
              <GoldLink href="/#challenge">Join the Free Challenge</GoldLink>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
