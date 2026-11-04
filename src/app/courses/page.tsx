import type { Metadata } from "next";
import { Suspense } from "react";
import { CourseCatalog } from "@/components/courses/CourseCatalog";
import { PageHeading } from "@/components/site/Crumb";

export const metadata: Metadata = {
  title: "All Legal Courses",
  description: "Explore online legal courses for students, professionals, and organizations.",
};

export default function Page() {
  return (
    <>
      <PageHeading
        crumb={[{ href: "/", label: "Home" }, { label: "Courses" }]}
        title="All Legal Courses"
        lede="Explore our comprehensive range of online legal courses, designed for students, professionals and organizations."
      />
      <Suspense fallback={<div className="shell py-16 text-sm text-muted">Loading the catalog…</div>}>
        <CourseCatalog />
      </Suspense>
    </>
  );
}
