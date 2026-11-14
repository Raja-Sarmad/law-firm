import type { Metadata } from "next";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { PageHeading } from "@/components/site/Crumb";

export const metadata: Metadata = {
  title: "Contact",
  description: "Write to The Solo Firm Blueprint.",
};

export default function Page() {
  return (
    <>
      <PageHeading
        crumb={[{ href: "/", label: "Home" }, { label: "Contact" }]}
        title="Contact"
        lede="Questions about the Blueprint, the free challenge, or the Firm Audit."
      />
      <section className="shell grid gap-8 pb-12 pt-6 lg:grid-cols-[0.8fr_1.2fr]">
        <aside className="lift h-fit rounded-[24px] bg-paper p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">Desk</p>
          <p className="mt-3 font-serif text-2xl text-ivory">[email address]</p>
          <p className="mt-4 text-sm leading-6 text-muted">The address goes here once you have it.</p>
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
