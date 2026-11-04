import type { Metadata } from "next";
import { HomePage } from "@/components/home/HomePage";

export const metadata: Metadata = {
  title: { absolute: "BYLAW Academy — Learn Law from Practicing Experts" },
  description:
    "Professional online courses, practical legal training, and certifications designed for law students, professionals and organizations.",
};

export default function Page() {
  return <HomePage />;
}
