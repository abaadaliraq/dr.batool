import type { Metadata } from "next";
import { Geist, Geist_Mono, Tajawal, Aref_Ruqaa } from "next/font/google";
import "./globals.css";
import StyledJsxRegistry from "./registry";
import LanguageProvider from "@/components/site/LanguageProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const arabicFont = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const arabicHeroName = Aref_Ruqaa({
  variable: "--font-aref-ruqaa",
  subsets: ["arabic"],
  weight: "700",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dr. Batool Mowafaq | Architecture, Research & Heritage",
  description: "Architect and academic researcher Dr. Batool Mowafaq: architectural design, research, and urban heritage.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${arabicFont.variable} ${arabicHeroName.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col"><StyledJsxRegistry><LanguageProvider>{children}</LanguageProvider></StyledJsxRegistry></body>
    </html>
  );
}


