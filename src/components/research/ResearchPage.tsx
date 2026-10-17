"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { useLanguage } from "@/components/site/LanguageProvider";

// Titles, author spellings, dates and bibliographic details follow the publishers.
const papers = [
  {
    number: "01",
    title: "The Quantum Strategic Vision for the Concept of Energy in the Perception of Architectural Space",
    year: "2024", date: "2024-12-14",
    journal: "Metallurgical and Materials Engineering",
    volume: "30 (4)", pages: "114–142",
    authors: ["Batool Mowafaq Kadhim", "Abdulla S. AL Maamory", "Ahmed M. AL Ghaban"],
    href: "https://metall-mater-eng.com/index.php/home/article/view/1155",
    ar: "يناقش العلاقة بين مفهوم الطاقة وإدراك الفضاء المعماري ضمن منظور التصميم المستدام.",
    en: "Examines energy and the perception of architectural space within a sustainable design framework."
  },
  {
    number: "02",
    title: "Advancing adaptive facades for a sustainable future in building design",
    year: "2025", date: "2025-01-14",
    journal: "Edelweiss Applied Science and Technology",
    volume: "9 (1)", pages: "801–845",
    authors: ["Batool Mowafaq Kadhim", "Abdulla S. AL Maamory", "Ahmed M. AL Ghaban"],
    href: "https://ideas.repec.org/a/ajp/edwast/v9y2025i1p801-845id4251.html",
    publisher: "https://learning-gate.com/index.php/2576-8484/article/view/4251",
    ar: "دراسة تستعرض الواجهات المتكيفة ودورها المحتمل في كفاءة الطاقة والراحة البيئية داخل المباني.",
    en: "Reviews adaptive facade systems and their potential to improve energy performance and indoor comfort."
  },
  {
    number: "03",
    title: "Quantum potential energy: Adaptive facades in architecture",
    year: "2024", date: "2024-11-12",
    journal: "Sustainable Engineering and Innovation",
    volume: "6 (2)", pages: "249–260",
    authors: ["Batool Mowafaq Kadhim", "Abdulla S. AL-Maamory", "Ahmed M. AL-Ghaban"],
    href: "https://sei.ardascience.com/index.php/journal/article/view/367",
    ar: "يستكشف إطاراً مفاهيمياً يربط طاقة الكم بتصميم الواجهات المتكيفة واستدامة البيئة المبنية.",
    en: "Explores a conceptual link between quantum potential energy, adaptive facades, and sustainable architectural design."
  }
];

const professionalSources = {
  university: "https://uoalfarahidi.edu.iq/home/news.php?T=241124115207110",
  award: "https://alomranaward.iq/د-بتول-موفق/",
  biography: "https://www.utopian-iq.com/leader.php"
};

const content = {
  ar: {
    eyebrow: "05 / البحث والمعرفة", title: "المساهمات البحثية والأكاديمية",
    introduction: "تمتد مساهمات الدكتورة بتول موفق بين البحث العلمي والهندسة المعمارية والقيادة الأكاديمية، مع اهتمام خاص بفلسفة العمارة والاستدامة والعلاقة بين الإنسان والفضاء المعماري.",
    publications: "أبحاث منشورة", contributions: "مساهمات أكاديمية ومهنية", read: "قراءة البحث الأصلي", details: "بيانات النشر والمؤلفون", authors: "المؤلفون", journal: "المجلة", published: "تاريخ النشر", volume: "المجلد والعدد", pages: "الصفحات", publisher: "صفحة الناشر", profile: "استكشف الملف البحثي", source: "المصدر",
    professional: [
      { title: "القيادة الأكاديمية", description: "تضمنت مسيرتها رئاسة مجلس إدارة جامعة الفراهيدي؛ وهي الصفة التي وردت في تغطية الجامعة لجائزة العمران 2024.", href: professionalSources.university },
      { title: "التحكيم المعماري", description: "شاركت ضمن لجنة تحكيم جائزة العمران 2024، إلى جانب مشاركاتها في لجان تحكيم مسابقات معمارية محلية ودولية.", href: professionalSources.award },
      { title: "التعليم والاستدامة", description: "شملت مساهماتها استضافة فعاليات التعليم الأخضر بجامعة الفراهيدي، والمشاركة في المؤتمرات العلمية والبحث في العمارة المستدامة.", href: professionalSources.biography }
    ]
  },
  en: {
    eyebrow: "05 / RESEARCH & KNOWLEDGE", title: "Research & Academic Contributions",
    introduction: "Dr. Batool Mowafaq’s contributions span scientific research, architecture, and academic leadership, with a particular focus on architectural philosophy, sustainability, and the relationship between people and architectural space.",
    publications: "Published research", contributions: "Academic & professional contributions", read: "Read original research", details: "Publication details & authors", authors: "Authors", journal: "Journal", published: "Publication date", volume: "Volume & issue", pages: "Pages", publisher: "Publisher page", profile: "Explore Research Profile", source: "Source",
    professional: [
      { title: "Academic leadership", description: "Her professional record includes chairing the Board of Directors of Al-Farahidi University, a role documented in the university’s coverage of the Al Omran Award 2024.", href: professionalSources.university },
      { title: "Architectural juries", description: "She served on the jury of the Al Omran Award 2024, alongside participation in judging panels for local and international architectural competitions.", href: professionalSources.award },
      { title: "Education & sustainability", description: "Her contributions include hosting green education events at Al-Farahidi University, participating in scientific conferences, and research in sustainable architecture.", href: professionalSources.biography }
    ]
  }
};

export default function ResearchPage() {
  const { language, setLanguage } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const t = content[language];
  const ar = language === "ar";

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof IntersectionObserver === "undefined") return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches) return;
    const targets = section.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).dataset.reveal = "shown";
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    targets.forEach(target => {
      if (target.getBoundingClientRect().top >= window.innerHeight) target.dataset.reveal = "pending";
      observer.observe(target);
    });
    const show = () => { if (preference.matches) targets.forEach(target => { target.dataset.reveal = "shown"; }); };
    preference.addEventListener("change", show);
    return () => { observer.disconnect(); preference.removeEventListener("change", show); };
  }, []);

  return <>
    <Header language={language} onLanguageChange={setLanguage} />
    <main id="research" className="academic" ref={sectionRef} lang={language} dir={ar ? "rtl" : "ltr"} aria-labelledby="academic-contributions-title">
    <div className="academic-shell">
      <Link className="back-link" href="/"><span aria-hidden="true">{ar ? "→" : "←"}</span>{ar ? "الرجوع للرئيسية" : "Back to home"}</Link>
      <header className="section-header" data-reveal="shown">
        <div><p className="eyebrow">{t.eyebrow}</p><h1 id="academic-contributions-title">{t.title}</h1></div>
        <p className="introduction">{t.introduction}</p>
      </header>
      <div className="academic-layout">
        <div className="publications">
          <p className="column-label">{t.publications}</p>
          <ol className="papers">
            {papers.map(paper => <li className="paper" key={paper.number} data-reveal="shown">
              <span className="paper-number" aria-hidden="true">{paper.number}</span>
              <article aria-labelledby={"paper-title-" + paper.number}>
                <div className="paper-topline"><time dateTime={paper.date}>{paper.year}</time><span lang="en" dir="ltr">{paper.journal}</span></div>
                <h3 id={"paper-title-" + paper.number} lang="en" dir="ltr"><a href={paper.href} target="_blank" rel="noopener noreferrer">{paper.title}<span className="title-arrow" aria-hidden="true">↗</span></a></h3>
                <p className="paper-description">{paper[language]}</p>
                <div className="paper-actions">
                  <a className="read-link" href={paper.href} target="_blank" rel="noopener noreferrer">{t.read}<span aria-hidden="true">{ar ? "←" : "→"}</span></a>
                </div>
                <details className="publication-details">
                  <summary>{t.details}<span aria-hidden="true">+</span></summary>
                  <div className="detail-body"><h4>{t.authors}</h4><ul className="authors" lang="en" dir="ltr">{paper.authors.map(author => <li key={author}>{author}</li>)}</ul>
                    <dl><div><dt>{t.journal}</dt><dd lang="en" dir="ltr">{paper.journal}</dd></div><div><dt>{t.published}</dt><dd><time dateTime={paper.date}>{new Intl.DateTimeFormat(ar ? "ar-IQ" : "en-GB", {day: "numeric", month: "long", year: "numeric", timeZone: "UTC"}).format(new Date(paper.date + "T00:00:00Z"))}</time></dd></div><div><dt>{t.volume}</dt><dd dir="ltr">{paper.volume}</dd></div><div><dt>{t.pages}</dt><dd dir="ltr">{paper.pages}</dd></div></dl>
                    {"publisher" in paper && <a className="publisher-link" href={paper.publisher} target="_blank" rel="noopener noreferrer">{t.publisher}<span aria-hidden="true"> ↗</span></a>}
                  </div>
                </details>
              </article>
            </li>)}
          </ol>
          <a className="profile-link" href="https://www.researchgate.net/profile/Batool-Mowafaq-Kadhem" target="_blank" rel="noopener noreferrer">{t.profile}<span aria-hidden="true">{ar ? "←" : "→"}</span></a>
        </div>
        <aside className="professional" aria-labelledby="professional-contributions-title" data-reveal="shown">
          <h3 id="professional-contributions-title">{t.contributions}</h3>
          {t.professional.map((item, index) => <article className="contribution" key={item.title}><span className="contribution-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><h4>{item.title}</h4><p>{item.description}</p><a href={item.href} target="_blank" rel="noopener noreferrer">{t.source}<span aria-hidden="true"> ↗</span></a></article>)}
        </aside>
      </div>
    </div>
    <style jsx>{`
      .academic { background: #f4f1e9; color: #242321; padding: clamp(65px, 8vw, 120px) 0; scroll-margin-top: 96px; }
      .academic :global(.back-link) { display: inline-flex; align-items: center; gap: 14px; min-height: 44px; margin-bottom: 34px; color: #a76143; font-size: 12px; text-decoration: none; }
      .academic :global(.back-link:focus-visible) { outline: 2px solid #a76143; outline-offset: 5px; }
      .academic-shell { width: min(100% - 100px, 1280px); margin: auto; }
      .section-header { display: grid; grid-template-columns: 1.25fr 1fr; align-items: end; gap: 70px; padding-bottom: 42px; margin-bottom: 38px; border-bottom: 1px solid #d8d0c4; }
      .eyebrow { margin: 0 0 18px; font-size: 10px; line-height: 1.8; color: #a76143; letter-spacing: .13em; }
      h1 { max-width: 650px; margin: 0; font-family: var(--font-serif, Georgia), serif; font-size: clamp(34px, 3.5vw, 49px); font-weight: 400; line-height: 1.15; letter-spacing: -.025em; }
      .introduction { margin: 0; max-width: 510px; color: #655c52; font-size: 14px; line-height: 1.95; }
      .academic-layout { display: grid; grid-template-columns: minmax(0, 2.35fr) minmax(0, 1fr); gap: 65px; align-items: start; }
      .publications { min-width: 0; }
      .column-label { margin: 0 0 18px; color: #a76143; font-size: 11px; line-height: 1.8; letter-spacing: .06em; }
      .papers { list-style: none; padding: 0; margin: 0; }
      .paper { display: grid; grid-template-columns: 30px minmax(0, 1fr); gap: 22px; padding: 28px 0; border-top: 1px solid rgba(167,97,67,.38); }
      .paper:last-child { border-bottom: 1px solid rgba(167,97,67,.38); }
      .paper-number { padding-top: 3px; color: #a76143; font-size: 11px; line-height: 1.8; }
      .paper-topline { display: flex; align-items: baseline; flex-wrap: wrap; gap: 10px 18px; margin-bottom: 14px; color: #817466; font-size: 10px; line-height: 1.8; }
      .paper-topline time { color: #a76143; font-size: 12px; }
      .paper h3 { margin: 0; font-family: var(--font-serif, Georgia), serif; font-size: clamp(23px, 2.15vw, 30px); font-weight: 400; line-height: 1.33; letter-spacing: -.014em; }
      .paper h3 a { font-family: var(--font-serif, Georgia), serif; font-weight: 400; color: #242321; text-decoration: none; transition: color 250ms ease; }
      .paper h3 a:hover { color: #a76143; }
      .title-arrow { display: inline-block; margin-inline-start: 12px; color: #a76143; font-size: 20px; }
      .paper-description { margin: 15px 0; max-width: 730px; color: #655c52; font-size: 13px; line-height: 1.9; }
      .read-link, .publisher-link { display: inline-flex; align-items: center; gap: 20px; min-height: 40px; color: #a76143; font-size: 11px; line-height: 1.8; text-decoration: none; }
      .read-link span { font-size: 17px; }
      .publication-details { margin-top: 11px; }
      summary { display: flex; align-items: center; justify-content: space-between; gap: 20px; width: 100%; min-height: 44px; border-top: 1px solid #ded7ca; cursor: pointer; list-style: none; color: #655c52; font-size: 11px; line-height: 1.8; }
      summary::-webkit-details-marker { display: none; }
      summary span { font-size: 20px; color: #a76143; transition: transform 250ms ease; }
      details[open] summary span { transform: rotate(45deg); }
      .detail-body { padding: 20px 0 0; }
      .detail-body h4 { margin: 0 0 12px; font-size: 12px; font-weight: 500; color: #a76143; }
      .authors { margin: 0 0 22px; padding: 0; list-style: none; font-family: var(--font-inter, Arial), sans-serif; }
      .authors li { font-size: 12px; line-height: 2; color: #514a43; }
      dl { margin: 0; }
      dl > div { display: grid; grid-template-columns: minmax(100px, .7fr) minmax(0, 1.8fr); gap: 16px; padding: 9px 0; }
      dt { color: #817466; font-size: 11px; line-height: 1.8; }
      dd { margin: 0; color: #514a43; font-size: 12px; line-height: 1.8; overflow-wrap: anywhere; }
      .publisher-link { margin-top: 8px; }
      .profile-link { display: inline-flex; align-items: center; gap: 35px; min-height: 48px; margin-top: 28px; padding: 13px 0; border-bottom: 1px solid #a76143; color: #a76143; font-size: 12px; line-height: 1.8; text-decoration: none; }
      .profile-link span { font-size: 20px; }
      .professional { min-width: 0; border-inline-start: 1px solid #d8d0c4; padding-inline-start: 30px; }
      .professional > h3 { margin: 0 0 30px; font-family: var(--font-serif, Georgia), serif; font-size: 25px; font-weight: 400; line-height: 1.3; }
      .contribution { padding: 24px 0; border-top: 1px solid #d8d0c4; }
      .contribution-number { color: #a76143; font-size: 10px; }
      .contribution h4 { margin: 13px 0 14px; font-family: var(--font-serif, Georgia), serif; font-size: 21px; font-weight: 400; line-height: 1.4; }
      .contribution p { margin: 0; color: #655c52; font-size: 13px; line-height: 1.95; }
      .contribution a { display: inline-flex; align-items: center; gap: 12px; min-height: 40px; margin-top: 9px; color: #a76143; font-size: 10px; text-decoration: none; }
      a:hover { text-decoration: underline; text-underline-offset: 5px; }
      a:focus-visible, summary:focus-visible { outline: 2px solid #a76143; outline-offset: 5px; }
      [data-reveal] { transition: opacity 650ms ease, transform 650ms cubic-bezier(.2,.7,.2,1); }
      [data-reveal="pending"] { opacity: 0; transform: translateY(18px); }
      .academic[lang="ar"] { font-family: var(--font-tajawal), sans-serif; }
      .academic[lang="ar"] h1 { font-family: inherit; font-size: clamp(28px, 3vw, 39px); line-height: 1.6; letter-spacing: 0; }
      .academic[lang="ar"] .eyebrow, .academic[lang="ar"] .column-label { letter-spacing: 0; }
      .academic[lang="ar"] .professional > h3, .academic[lang="ar"] .contribution h4 { font-family: inherit; line-height: 1.6; }
      @media (max-width: 1000px) { .academic-shell { width: calc(100% - 56px); } .academic-layout { gap: 36px; grid-template-columns: minmax(0, 2fr) minmax(0, 1fr); } .section-header { gap: 35px; } .professional { padding-inline-start: 24px; } }
      @media (max-width: 750px) { .section-header, .academic-layout { grid-template-columns: 1fr; gap: 30px; } .professional { border-inline-start: 0; border-top: 1px solid #a76143; padding-inline-start: 0; padding-top: 32px; margin-top: 20px; } .professional > h3 { font-size: 27px; } .contribution { padding: 24px 0; } }
      @media (max-width: 500px) { .academic-shell { width: calc(100% - 40px); } .section-header { padding-bottom: 28px; margin-bottom: 28px; } .paper { grid-template-columns: 24px minmax(0, 1fr); gap: 12px; padding-block: 24px; } .paper h3 { font-size: 24px; } .paper-topline { gap: 5px 14px; } .paper-description { font-size: 14px; } .profile-link { gap: 20px; max-width: 100%; } dl > div { grid-template-columns: 1fr; gap: 5px; } }
      @media (prefers-reduced-motion: reduce) { [data-reveal], summary span, .paper h3 a { transition: none; } [data-reveal="pending"] { opacity: 1; transform: none; } }
    `}</style>
  </main>
      <Footer />
  </>;
}

