import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowIcon } from "@/components/icons";

const gold =
  "inline-flex h-11 items-center justify-center rounded-full bg-gold px-5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(198,163,90,0.28)] transition-colors hover:bg-gold-deep";
const ghost =
  "inline-flex h-11 items-center justify-center rounded-full border border-[#ddd4c8] bg-paper px-5 text-sm font-semibold text-navy transition-colors hover:border-gold";

function Inner({ children, arrow }: { children: ReactNode; arrow?: boolean }) {
  return (
    <span className="magnetic-inner inline-flex items-center gap-2">
      {children}
      {arrow ? <ArrowIcon /> : null}
    </span>
  );
}

export function GoldLink({
  href,
  children,
  arrow,
  className = "",
}: {
  href: string;
  children: ReactNode;
  arrow?: boolean;
  className?: string;
}) {
  return (
    <Link href={href} data-magnetic className={`${gold} ${className}`}>
      <Inner arrow={arrow}>{children}</Inner>
    </Link>
  );
}

export function GhostLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} data-magnetic className={`${ghost} ${className}`}>
      <Inner>{children}</Inner>
    </Link>
  );
}

export function GoldButton({
  children,
  arrow,
  className = "",
  type = "submit",
  onClick,
}: {
  children: ReactNode;
  arrow?: boolean;
  className?: string;
  type?: "submit" | "button";
  onClick?: () => void;
}) {
  return (
    <button type={type} data-magnetic onClick={onClick} className={`${gold} ${className}`}>
      <Inner arrow={arrow}>{children}</Inner>
    </button>
  );
}
