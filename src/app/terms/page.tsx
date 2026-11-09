import type { Metadata } from "next";
import { PageHeading } from "@/components/site/Crumb";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms for The Solo Firm Blueprint.",
};

export default function Page() {
  return (
    <>
      <PageHeading
        crumb={[{ href: "/", label: "Home" }, { label: "Terms" }]}
        title="Terms"
        lede="The Solo Firm Blueprint provides business education and consulting for law firms, not legal advice."
      />
      <section className="shell max-w-3xl pb-20 pt-6 text-[15px] leading-7 text-ink">
        <p>The free challenge is free. No credit card is required. You can unsubscribe anytime.</p>
        <p className="mt-4">© 2026 The Solo Firm Blueprint. All rights reserved.</p>
      </section>
    </>
  );
}
