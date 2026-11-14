import Link from "next/link";

export function Crumb({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-muted">
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`} className="inline-flex items-center gap-2">
          {index > 0 ? <span className="text-gold">/</span> : null}
          {item.href ? (
            <Link href={item.href} className="transition-colors hover:text-navy">
              {item.label}
            </Link>
          ) : (
            <span className="text-navy">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
      <span className="inline-block h-px w-8 origin-left bg-gold" data-draw-line />
      {children}
    </div>
  );
}

export function PageHeading({
  crumb,
  title,
  lede,
}: {
  crumb: { href?: string; label: string }[];
  title: string;
  lede?: string;
}) {
  return (
    <div className="shell pb-2 pt-8 md:pt-10">
      <Crumb items={crumb} />
      <h1
        className="mt-4 max-w-3xl font-serif text-4xl font-medium tracking-[-0.03em] text-navy sm:text-5xl"
        data-split
      >
        {title}
      </h1>
      {lede ? <p className="mt-4 max-w-2xl text-[15px] leading-7 text-muted">{lede}</p> : null}
    </div>
  );
}
