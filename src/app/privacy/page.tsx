import type { Metadata } from "next";
import { PageHeading } from "@/components/site/Crumb";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How The Solo Firm Blueprint handles the name and email you share.",
};

export default function Page() {
  return (
    <>
      <PageHeading
        crumb={[{ href: "/", label: "Home" }, { label: "Privacy Policy" }]}
        title="Privacy Policy"
        lede="The Solo Firm Blueprint provides business education and consulting for law firms, not legal advice."
      />
      <section className="shell max-w-3xl pb-20 pt-6 text-[15px] leading-7 text-ink">
        <p>
          The free challenge asks for a first name and an email. That is used to send the challenge. No credit card. No spam. Unsubscribe anytime.
        </p>
        <p className="mt-4">We do not sell your name or email.</p>
      </section>
    </>
  );
}
