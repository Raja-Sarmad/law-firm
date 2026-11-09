import type { Metadata } from "next";
import { HomePage } from "@/components/home/HomePage";

export const metadata: Metadata = {
  title: { absolute: "The Solo Firm Blueprint — Run your firm. Don’t let it run you." },
  description:
    "Practical systems for intake, workflow, staffing, and finances, from an attorney and CPA who built and ran a 6-attorney firm.",
};

export default function Page() {
  return <HomePage />;
}
