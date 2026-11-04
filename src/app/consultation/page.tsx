import type { Metadata } from "next";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { PageHeading } from "@/components/site/Crumb";
import { courses } from "@/lib/data";

export const metadata: Metadata = {
  title: "Get Consultation",
  description: "Talk to BYLAW Academy about the right course.",
};

export default function Page() {
  return (
    <>
      <PageHeading
        crumb={[{ href: "/", label: "Home" }, { label: "Consultation" }]}
        title="Get Consultation"
        lede="Tell us where you are in practice and we will point you to the course that fits the work on your desk."
      />
      <section className="shell max-w-3xl pb-20 pt-8">
        <InquiryForm
          submitLabel="Request consultation"
          successTitle="Consultation requested"
          successText="We have the request in this preview. The admissions desk would follow up with a time."
          fields={[
            { name: "name", label: "Name", placeholder: "Your name" },
            { name: "email", label: "Email", type: "email", placeholder: "you@firm.com" },
            { name: "interest", label: "Course of interest", options: courses.map((course) => course.title) },
            { name: "message", label: "What do you want to work on?", type: "textarea", placeholder: "A few lines is enough." },
          ]}
        />
      </section>
    </>
  );
}
