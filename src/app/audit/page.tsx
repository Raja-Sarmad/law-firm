import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon } from "@/components/icons";
import { InquiryForm } from "@/components/forms/InquiryForm";

export const metadata: Metadata = {
  title: "The Audit",
  description: "Book the Firm Audit and see where your time and profit actually go.",
};

const looks = [
  {
    title: "More time",
    text: "Documented processes keep the firm moving when you step away.",
  },
  {
    title: "Clearer profit",
    text: "Know which work, clients, and costs actually drive your bottom line.",
  },
  {
    title: "Better decisions",
    text: "Replace gut feel with real numbers, and grow on purpose.",
  },
];

const desk = [
  "You’re profitable, but every decision still lands on your desk.",
  "Intake, follow-up, and billing live in your head.",
  "You can’t take a week off without things slipping.",
  "Hiring feels risky because nothing is documented.",
  "You’re busy all day and still unsure where the profit comes from.",
];

export default function Page() {
  return (
    <section className="shell py-10 lg:py-12">
      <div className="grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
            <span className="h-px w-8 bg-gold" />
            The Audit
          </div>
          <h1 className="mt-4 max-w-xl font-serif text-4xl font-medium leading-[1.08] tracking-[-0.03em] text-ivory sm:text-5xl">
            See where your time and profit actually go.
          </h1>
          <p className="mt-4 max-w-xl text-[16px] leading-7 text-ink">
            Tell us about the firm. The Firm Audit looks at the work that still lands on your desk, then shows what would run without you.
          </p>
          <ul className="mt-8 grid gap-3">
            {looks.map((item) => (
              <li key={item.title} className="rounded-2xl border border-gold/25 bg-[#12161e] px-5 py-4">
                <p className="font-serif text-[20px] text-ivory">{item.title}</p>
                <p className="mt-1 text-sm leading-6 text-ink">{item.text}</p>
              </li>
            ))}
          </ul>
          <Link href="/#challenge" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ivory hover:text-gold">
            Or start with the free challenge
            <ArrowIcon className="h-4 w-4" />
          </Link>
        </div>

        <InquiryForm
          submitLabel="Book the Firm Audit"
          successTitle="Audit request received"
          successText="We have the request. A reply would follow to set a time."
          fields={[
            { name: "name", label: "Name", placeholder: "Your name" },
            { name: "email", label: "Email", type: "email", placeholder: "you@firm.com" },
            { name: "firm", label: "Firm size", placeholder: "Solo, or how many attorneys", wide: true },
            {
              name: "message",
              label: "What should the audit look at?",
              type: "textarea",
              placeholder: "Intake, staffing, billing, time off — a few lines is enough.",
            },
          ]}
        />
      </div>

      <div className="mt-10 border-t border-gold/15 pt-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">What it looks at</p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {desk.map((item) => (
            <li key={item} className="flex gap-3 text-[15px] leading-6 text-ivory">
              <span className="text-gold" aria-hidden="true">
                ✓
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
