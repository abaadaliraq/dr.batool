"use client";

import { useLanguage } from "@/components/site/LanguageProvider";
import About from "@/components/home/About";
import SelectedProjects from "@/components/home/SelectedProjects";
import UtopianIraq from "@/components/home/UtopianIraq";
import AcademicContributions from "@/components/home/AcademicContributions";
import Heritage from "@/components/home/Heritage";
import Contact from "@/components/home/Contact";

import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Hero from "@/components/home/Hero";
import OpeningReveal from "@/components/site/OpeningReveal";

export default function HomePage() {
  const { language, setLanguage } = useLanguage();

  return (
    <>
      {/* CINEMATIC OPENING */}

      <OpeningReveal />

      {/* TOP BAR */}

      <Header
        language={language}
        onLanguageChange={setLanguage}
      />

      {/* MAIN CONTENT */}

      <main>
        <Hero language={language} />
        <About language={language} />
        <SelectedProjects language={language} />
        <UtopianIraq language={language} />
        <AcademicContributions language={language} />
        <Heritage language={language} />
        <Contact language={language} />
      </main>
      <Footer />
    </>
  );
}
