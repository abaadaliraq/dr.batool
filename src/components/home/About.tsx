"use client";
import Link from "next/link";
import type { Language } from "@/components/site/LanguageProvider";
import PortraitPlaceholder from "@/components/site/PortraitPlaceholder";
import Reveal from "@/components/site/Reveal";

const content = {
  ar: {
    label: "عن الدكتورة بتول موفق", name: "د. بتول موفق",
    paragraphs: [
      "مهندسة معمارية وباحثة أكاديمية حاصلة على الدكتوراه في الهندسة المعمارية، بتخصص فلسفة العمارة من الجامعة التكنولوجية في بغداد.",
      "تجمع مسيرتها المهنية بين التصميم المعماري والبحث الأكاديمي والإدارة الجامعية، مع اهتمام بالابتكار المعماري والهوية المحلية وتطوير البيئة العمرانية.",
      "تؤمن بدور العمارة في تحقيق التوازن بين الجوانب الجمالية والبيئية والاجتماعية، وبأهمية التصميم كوسيلة للتأثير الإيجابي في المجتمع."
    ], button: "الاطلاع على السيرة الكاملة"
  },
  en: {
    label: "About Dr. Batool Mowafaq", name: "Dr. Batool Mowafaq",
    paragraphs: [
      "An architect and academic researcher, Dr. Batool Mowafaq holds a PhD in Architecture, specializing in the Philosophy of Architecture, from the University of Technology in Baghdad.",
      "Her professional practice brings together architectural design, academic research, and university leadership, with a focus on architectural innovation, local identity, and the development of the built environment.",
      "She believes architecture can balance aesthetic, environmental, and social considerations, and that design can be a means of making a positive contribution to society."
    ], button: "View Full Biography"
  }
};
export default function About({ language }: { language: Language }) {
  const t = content[language];
  return <section id="about" className="about" lang={language} dir={language === "ar" ? "rtl" : "ltr"} aria-labelledby="about-title">
    <div className="about-grid">
      <Reveal><PortraitPlaceholder language={language} /></Reveal>
      <Reveal><div className="about-copy">
        <p className="eyebrow">{t.label}</p>
        <h2 id="about-title">{t.name}</h2>
        <span className="rule" aria-hidden="true" />
        {t.paragraphs.map(p => <p className="body-copy" key={p}>{p}</p>)}
        <Link className="biography-link" href="/about">{t.button}<span aria-hidden="true">{language === "ar" ? "←" : "→"}</span></Link>
      </div></Reveal>
    </div>
    <style jsx>{`
      .about { background: #f4f1e9; color: #242321; padding: clamp(70px, 9vw, 145px) 0; scroll-margin-top: 90px; }
      .about-grid { width: min(100% - 100px, 1250px); margin: auto; display: grid; grid-template-columns: 1fr 1.12fr; align-items: center; gap: clamp(40px, 7vw, 115px); }
      .about-copy { padding-block: 24px; }
      .eyebrow { color: #a76143; font-size: 11px; letter-spacing: .12em; text-transform: uppercase; margin: 0 0 24px; }
      h2 { font-family: var(--font-serif, Georgia), serif; font-weight: 400; font-size: clamp(36px, 3.8vw, 58px); line-height: 1.16; margin: 0; letter-spacing: -.035em; }
      .rule { display: block; width: 65px; height: 1px; background: #a76143; margin-block: 27px; }
      .body-copy { color: #514a43; font-size: 14px; line-height: 1.95; margin: 0 0 18px; }
      .about[lang="ar"] { font-family: var(--font-ibm-arabic), sans-serif; }
      .about[lang="ar"] h2 { font-family: inherit; font-size: clamp(30px, 3.3vw, 44px); line-height: 1.6; letter-spacing: 0; }
      .about[lang="ar"] .eyebrow { letter-spacing: 0; font-size: 13px; }
      .about-copy :global(.biography-link) { display: inline-flex; gap: 32px; align-items: center; min-height: 44px; margin-top: 15px; padding-block: 10px; border-bottom: 1px solid #a76143; color: #a76143; text-decoration: none; font-size: 12px; transition: gap .25s ease, color .25s ease; }
      .about-copy :global(.biography-link:hover) { gap: 44px; color: #242321; }
      .about-copy :global(.biography-link:focus-visible) { outline: 2px solid #a76143; outline-offset: 6px; }
      @media (max-width: 900px) { .about-grid { width: calc(100% - 56px); gap: 30px; grid-template-columns: .9fr 1.1fr; } }
      @media (max-width: 650px) { .about-grid { width: calc(100% - 40px); grid-template-columns: 1fr; gap: 30px; } .about-copy { padding: 0 12px; } }
      @media (prefers-reduced-motion: reduce) { .about-copy :global(.biography-link) { transition: none; } }
    `}</style>
  </section>;
}

