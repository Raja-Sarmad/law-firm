import type { Metadata } from "next";
import Image from "next/image";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { PageHeading } from "@/components/site/Crumb";

export const metadata: Metadata = {
  title: "Corporate Training",
  description: "Custom legal programs for firms and companies.",
};

export default function Page() {
  return (
    <>
      <PageHeading
        crumb={[{ href: "/", label: "Home" }, { label: "Corporate Training" }]}
        title="Train Your Team with Custom Legal Programs"
        lede="We also offer tailored training for law firms, corporations and organizations."
      />
      <section className="shell grid items-start gap-8 pb-20 pt-8 lg:grid-cols-2">
        <div className="relative min-h-[320px] overflow-hidden rounded-[28px]" data-clip>
          <Image src="/images/gavel-dark.jpg" alt="Gavel on a dark walnut desk" fill sizes="50vw" className="object-cover" />
        </div>
        <InquiryForm
          submitLabel="Request a corporate training"
          successTitle="Request received"
          successText="The partnerships desk would reply with a proposed syllabus and dates."
          fields={[
            { name: "company", label: "Organization", placeholder: "Firm or company" },
            { name: "name", label: "Your name", placeholder: "Name" },
            { name: "email", label: "Work email", type: "email", placeholder: "you@company.com" },
            { name: "size", label: "Team size", placeholder: "How many learners?" },
            { name: "message", label: "What should the program cover?", type: "textarea", placeholder: "Practice area, seniority, and timing." },
          ]}
        />
      </section>
    </>
  );
}
