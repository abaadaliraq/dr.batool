import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "About Dr. Batool Mowafaq | Architecture, Research & Heritage",
  description: "Explore Dr. Batool Mowafaq's academic background, architectural work, design philosophy, and commitment to urban heritage.",
};

export default function AboutLayout({ children }: { children: ReactNode }) {
  return children;
}

