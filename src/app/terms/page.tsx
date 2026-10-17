import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Use | Dr. Batool Mowafaq",
  description: "Terms for browsing and using the architectural, professional, and research content on Dr. Batool Mowafaq’s website.",
};

export default function Page() {
  return <LegalPage kind="terms" />;
}
