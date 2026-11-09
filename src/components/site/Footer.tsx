import Link from "next/link";
import { Logo } from "@/components/site/Logo";

const columns = [
  {
    title: "Explore",
    links: [
      { href: "/", label: "Blueprint" },
      { href: "/audit", label: "The Audit" },
      { href: "/about", label: "About" },
      { href: "/#challenge", label: "Free Challenge" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/contact", label: "Contact" },
      { href: "/contact", label: "[email address]" },
      { href: "/login", label: "Log in" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative z-[1] mt-6 overflow-hidden bg-[#0c0f14]">
      <div className="h-px bg-gradient-to-r from-transparent via-[#f3dc9a] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(ellipse_at_top,rgba(212,175,92,0.16),transparent_70%)]" />

      <div className="shell relative grid gap-10 py-14 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs font-serif text-[22px] leading-snug text-ivory">The Solo Firm Blueprint</p>
          <p className="mt-3 max-w-xs text-sm leading-6 text-muted">Systems for solo and small-firm lawyers.</p>
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">{column.title}</p>
            <ul className="mt-4 space-y-2.5">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-ink transition-colors hover:text-gold">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-gold/15">
        <div className="shell flex flex-col gap-2 py-5 text-xs leading-5 text-muted">
          <p>The Solo Firm Blueprint provides business education and consulting for law firms, not legal advice.</p>
          <p>© 2026 The Solo Firm Blueprint. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
