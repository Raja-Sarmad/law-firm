import Link from "next/link";

export default function NotFound() {
  return (
    <div className="shell py-24 text-center">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">404</p>
      <h1 className="mt-3 font-serif text-5xl text-navy">This page is not on the docket.</h1>
      <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-muted">
        The address may have changed. The catalog and the academy desk are both still open.
      </p>
      <Link href="/" className="mt-8 inline-flex h-11 items-center rounded-full bg-gold px-5 text-sm font-semibold text-white">
        Back to the academy
      </Link>
    </div>
  );
}
