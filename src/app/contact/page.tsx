import type { Metadata } from "next";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { PageHeading } from "@/components/site/Crumb";

export const metadata: Metadata = {
  title: "Contact",
  description: "Write to BYLAW Academy admissions.",
};

export default function Page() {
  return (
    <>
      <PageHeading
        crumb={[{ href: "/", label: "Home" }, { label: "Contact" }]}
        title="Contact"
        lede="Admissions reads every note. Tell us what you want to learn, or what your team needs taught."
      />
      <section className="shell grid gap-8 pb-20 pt-8 lg:grid-cols-[0.8fr_1.2fr]">
        <aside className="lift h-fit rounded-[24px] bg-paper p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">Admissions</p>
          <a href="mailto:admissions@bylaw.academy" className="mt-3 block font-serif text-2xl text-navy">
            admissions@bylaw.academy
          </a>
          <p className="mt-4 text-sm leading-6 text-muted">Weekdays, 9:00–17:00. The academy is taught online, so the desk is not tied to one building.</p>
        </aside>
        <InquiryForm
          submitLabel="Send message"
          successTitle="Message received"
          successText="Admissions has your note in this preview. A real reply would follow from the academy desk."
          fields={[
            { name: "name", label: "Name", placeholder: "Your name" },
            { name: "email", label: "Email", type: "email", placeholder: "you@firm.com" },
            { name: "subject", label: "Subject", placeholder: "What is this about?", wide: true },
            { name: "message", label: "Message", type: "textarea", placeholder: "Tell us what you need." },
          ]}
        />
      </section>
    </>
  );
}
