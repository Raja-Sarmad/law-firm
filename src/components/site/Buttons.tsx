import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowIcon } from "@/components/icons";

const gold =
  "inline-flex h-11 items-center justify-center rounded-full bg-gradient-to-b from-[#e0c06e] to-[#b8923f] px-5 text-sm font-semibold text-[#080a0f] shadow-[0_12px_28px_rgba(212,175,92,0.32)] transition-[filter,transform] hover:brightness-110";
const ghost =
  "inline-flex h-11 items-center justify-center rounded-full border border-gold/35 bg-white/5 px-5 text-sm font-semibold text-ivory transition-colors hover:border-gold hover:bg-white/10";

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
