import Link from "next/link";

export function Logo({ tone = "navy", compact = false }: { tone?: "navy" | "light"; compact?: boolean }) {
  const word = tone === "light" ? "text-white" : "text-navy";
  return (
    <Link href="/" aria-label="BYLAW Academy" className="group flex items-center gap-2.5">
      <svg viewBox="0 0 36 36" className={`${compact ? "h-8 w-8" : "h-9 w-9"} text-gold`} aria-hidden="true">
        <path
          d="M18 4.2 32 12.2H4L18 4.2Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path d="M9 13.2v13M18 13.2v13M27 13.2v13" stroke="currentColor" strokeWidth="1.7" />
        <path d="M6 27.5h24" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
      <span className="leading-none">
        <span className={`block font-serif text-[18px] font-semibold tracking-[0.12em] ${word}`}>BYLAW</span>
        <span className="mt-0.5 block text-[10px] font-medium uppercase tracking-[0.22em] text-gold">Academy</span>
      </span>
    </Link>
  );
}
