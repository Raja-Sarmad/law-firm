import type { Metadata } from "next";
import { LoginView } from "@/components/forms/InquiryForm";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to BYLAW Academy.",
};

export default function Page() {
  return <LoginView />;
}
