import Link from "next/link";
import { Logo } from "@/components/site/Logo";

const columns = [
  {
    title: "Academy",
    links: [
      { href: "/about", label: "About" },
      { href: "/practice-areas", label: "Practice Areas" },
      { href: "/blog", label: "Journal" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Learn",
    links: [
      { href: "/courses", label: "All courses" },
      { href: "/courses/contract-law-mastery", label: "Contract Law Mastery" },
      { href: "/consultation", label: "Get a consultation" },
      { href: "/corporate", label: "Corporate training" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative z-[1] border-t border-gold/15">
      <div className="shell grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-6 text-muted">
            Professional online courses and practical legal training from lawyers who still practice.
          </p>
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">{column.title}</p>
            <ul className="mt-4 space-y-2.5">
              {column.links.map((link) => (
                <li key={link.href}>
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
        <div className="shell flex flex-col gap-2 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 BYLAW Academy. All rights reserved.</p>
          <p>Online legal education for students, counsel, and teams.</p>
        </div>
      </div>
    </footer>
  );
}
