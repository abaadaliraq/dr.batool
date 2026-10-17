import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | Dr. Batool Mowafaq",
  description: "Website privacy information: language preferences, email correspondence, external services, and contact details.",
};

export default function Page() {
  return <LegalPage kind="privacy" />;
}
