"use client";
import biographyPortrait from "../../../public/images/dr-batool-about.jpg";
import Link from "next/link";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { useLanguage } from "@/components/site/LanguageProvider";
import PortraitPlaceholder from "@/components/site/PortraitPlaceholder";
import Reveal from "@/components/site/Reveal";
import ProjectsSlider from "@/components/about/ProjectsSlider";

const content = {
  en: {
    back: "Back to home", label: "Introduction", title: "About Dr. Batool Mowafaq", role: "Architect · Academic researcher",
    intro: "Dr. Batool Mowafaq brings architectural practice into dialogue with academic inquiry and university leadership. Her work explores how design can respond to its environment, express local identity, and contribute to the life of a community.",
    intro2: "With a doctorate in Architecture, specializing in the Philosophy of Architecture, from the University of Technology in Baghdad, her interests connect spatial perception, architectural innovation, and the cultural continuity of the built environment.",
    academic: "Academic background", degree: "PhD in Architecture", university: "University of Technology, Baghdad", field: "Specialization", specialization: "Philosophy of Architecture", thesisLabel: "Doctoral thesis", thesis: "Quantum Architecture and the Psychological Perception of Space",
    experience: "Professional experience", roles: ["Chairing the Board of Directors of Al-Farahidi University", "Scientific and academic adviser to the First Deputy Speaker of the Iraqi Council of Representatives", "Founding the Utopia team for architecture and interior design"],
    institutions: ["Al-Farahidi University", "Iraqi Council of Representatives", "Utopia"], details: "Read details", mismarRole: "Administrative Board Member · Architectural Planning & Urban Heritage Revitalization",
    masdar: { title: "President of MASDAR Foundation for Sustainable Development", description: "Dr. Batool Mowafaq serves as President of MASDAR Foundation for Sustainable Development, a non-governmental organization dedicated to supporting scientific research, innovation, academic collaboration, and the development of engineering and technological solutions that advance sustainable development.", visit: "Visit MASDAR Foundation" },
    work: "Architectural work", workIntro: "Selected architectural projects associated with her professional journey.", projects: ["Al-Farahidi University", "Al-Qalam University"], places: ["Baghdad", "Kirkuk"],
    philosophy: "Design philosophy", quote: "Architecture is more than buildings; it is a means of shaping society and achieving sustainability.", philosophyText: "Her architectural philosophy seeks a balance between innovation and respect for local architectural identity. Environmental and social considerations are integral to a design approach that treats beauty, responsibility, and the experience of space as interconnected.",
    participation: "Professional participation", participationItems: ["Membership of judging panels for local and international architectural competitions.", "Participation in architectural and academic projects."],
    heritage: "Heritage & Mismar", heritageText: "Dr. Batool Mowafaq is a member of the administrative board of the Mismar Foundation for Culture and Sustainable Development, responsible for architectural planning and the revitalization of urban heritage. This role reflects her interest in local identity and the continuity of the built environment.", mismar: "Visit Mismar Foundation", closing: "Architecture, grounded in place."
  },
  ar: {
    back: "الرجوع إلى الرئيسية", label: "المقدمة", title: "عن الدكتورة بتول موفق", role: "مهندسة معمارية · باحثة أكاديمية",
    intro: "تجمع الدكتورة بتول موفق في مسيرتها بين الممارسة المعمارية والبحث الأكاديمي والإدارة الجامعية. وينطلق اهتمامها بالتصميم من علاقته بالبيئة والهوية المحلية، وقدرته على الإسهام في حياة المجتمع وتطوير البيئة العمرانية.",
    intro2: "حاصلة على الدكتوراه في الهندسة المعمارية، بتخصص فلسفة العمارة من الجامعة التكنولوجية في بغداد. وتربط اهتماماتها بين إدراك الفضاء والابتكار المعماري واستمرارية الهوية الثقافية للبيئة المبنية.",
    academic: "الخلفية الأكاديمية", degree: "دكتوراه في الهندسة المعمارية", university: "الجامعة التكنولوجية، بغداد", field: "التخصص", specialization: "فلسفة العمارة", thesisLabel: "عنوان الأطروحة", thesis: "عمارة الكم والإدراك السايكولوجي للفضاء",
    experience: "الخبرات المهنية", roles: ["رئاسة مجلس إدارة جامعة الفراهيدي", "العمل مستشارة للنائب الأول لرئيس مجلس النواب العراقي للشؤون العلمية والأكاديمية", "تأسيس فريق يوتوبيا للعمارة والتصاميم الداخلية"],
    institutions: ["جامعة الفراهيدي", "مجلس النواب العراقي", "يوتوبيان"], details: "التفاصيل", mismarRole: "عضو الهيئة الإدارية ومسؤولة التخطيط المعماري وإحياء التراث العمراني",
    masdar: { title: "رئيسة مؤسسة مصدر للتنمية المستدامة", description: "تتولى الدكتورة بتول موفق رئاسة مؤسسة مصدر للتنمية المستدامة، وهي مؤسسة غير حكومية تُعنى بدعم البحث العلمي والابتكار والتعاون الأكاديمي وتطوير الحلول الهندسية والتقنية المرتبطة بالتنمية المستدامة.", visit: "زيارة موقع مؤسسة مصدر" },
    work: "الأعمال والمشاريع المعمارية", workIntro: "أبرز الأعمال والمشاريع المعمارية المرتبطة بمسيرتها المهنية.", projects: ["جامعة الفراهيدي", "جامعة القلم"], places: ["بغداد", "كركوك"],
    philosophy: "فلسفة التصميم", quote: "العمارة ليست مجرد مبانٍ، بل وسيلة للتأثير في المجتمع وتحقيق الاستدامة.", philosophyText: "تركز فلسفتها المعمارية على تحقيق التوازن بين الابتكار واحترام الهوية المعمارية المحلية. وتراعي الجوانب البيئية والاجتماعية ضمن رؤية تربط الجمال بالمسؤولية وتجربة الإنسان للفضاء.",
    participation: "المشاركات المهنية", participationItems: ["عضوية لجان تحكيم في مسابقات معمارية محلية ودولية.", "المشاركة في مشاريع معمارية وأكاديمية."],
    heritage: "إحياء التراث العمراني", heritageText: "الدكتورة بتول موفق عضو الهيئة الإدارية في مؤسسة مسمار للثقافة والتنمية المستدامة، ومسؤولة التخطيط المعماري وإحياء التراث العمراني. وتعكس هذه الصفة اهتمامها بالهوية المحلية واستمرارية البيئة العمرانية.", mismar: "زيارة مؤسسة مسمار", closing: "عمارة تنتمي إلى المكان."
  }
};

export default function AboutPage() {
  const { language, setLanguage } = useLanguage();
  const t = content[language];
  const ar = language === "ar";
  const number = (value: number) => new Intl.NumberFormat(ar ? "ar" : "en", {minimumIntegerDigits: 2}).format(value);
  return <>
    <Header language={language} onLanguageChange={setLanguage} />
    <main id="biography" className="biography" lang={language} dir={ar ? "rtl" : "ltr"}>
      <div className="page-shell">
        <Link className="back-link" href="/">{ar ? "→" : "←"} {t.back}</Link>
        <section className="introduction" aria-labelledby="bio-title">
          <div>
            <p className="eyebrow">{number(1)} — {t.label}</p>
            <h1 id="bio-title">{t.title}</h1>
            <p className="role">{t.role}</p>
            <div className="intro-text"><p>{t.intro}</p><p>{t.intro2}</p></div>
          </div>
          <PortraitPlaceholder language={language} image={biographyPortrait} />
        </section>

        <Reveal><section className="editorial academic" aria-labelledby="academic-title">
          <div><p className="eyebrow">{number(2)}</p><h2 id="academic-title">{t.academic}</h2></div>
          <div><h3 className="degree">{t.degree}</h3><p>{t.university}</p>
            <dl><div><dt>{t.field}</dt><dd>{t.specialization}</dd></div><div><dt>{t.thesisLabel}</dt><dd className="thesis">{t.thesis}</dd></div></dl>
          </div>
        </section></Reveal>

        <Reveal><section className="editorial experience" aria-labelledby="experience-title">
          <div><p className="eyebrow">{number(3)}</p><h2 id="experience-title">{t.experience}</h2></div>
          <ul className="experience-list">
            {t.roles.map((role, index) => <li key={role}>
              <p className="institution">{t.institutions[index]}</p><h3>{role}</h3>
            </li>)}
            <li>
              <p className="institution">{ar ? "مؤسسة مصدر للتنمية المستدامة" : "MASDAR Foundation for Sustainable Development"}</p>
              <h3>{t.masdar.title}</h3>
              <details><summary>{t.details}</summary><p>{t.masdar.description}</p>
                <a className="external-link" href="https://masdarngo.vercel.app/" target="_blank" rel="noopener noreferrer">{t.masdar.visit}<span aria-hidden="true">↗</span></a>
              </details>
            </li>
            <li>
              <p className="institution">{ar ? "مؤسسة مسمار للثقافة والتنمية المستدامة" : "Mismar Foundation for Culture and Sustainable Development"}</p>
              <h3>{t.mismarRole}</h3>
              <details><summary>{t.details}</summary><p>{t.heritageText}</p>
                <a className="external-link" href="https://www.mismar.ngo/" target="_blank" rel="noopener noreferrer">{t.mismar}<span aria-hidden="true">↗</span></a>
              </details>
            </li>
          </ul>
        </section></Reveal>

        <section className="work-section" aria-labelledby="work-title">
          <Reveal><div className="work-heading"><div><p className="eyebrow">{number(4)}</p><h2 id="work-title">{t.work}</h2></div><p>{t.workIntro}</p></div></Reveal>
          <Reveal><ProjectsSlider language={language} /></Reveal>

          <div className="project-texts">{t.projects.map((project, i) => <Reveal key={project}><article className="project-text"><p className="eyebrow">{t.places[i]}</p><h3>{project}</h3></article></Reveal>)}</div>
        </section>
      </div>

      <section className="philosophy" aria-labelledby="philosophy-title">
        <svg viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><path d="M0 420H1200M70 500V120L600 30L1100 120V500M200 500V210L600 100L980 210V500M600 0V500M0 210H1200M70 120L1100 500M1100 120L70 500" /></svg>
        <div className="philosophy-inner"><Reveal><p className="eyebrow">{number(5)} — <span id="philosophy-title">{t.philosophy}</span></p><blockquote><p>“{t.quote}”</p></blockquote><p className="philosophy-copy">{t.philosophyText}</p></Reveal></div>
      </section>

      <div className="page-shell">
        <Reveal><section className="editorial" aria-labelledby="participation-title"><div><p className="eyebrow">{number(6)}</p><h2 id="participation-title">{t.participation}</h2></div><ul className="participation">{t.participationItems.map(item => <li key={item}>{item}</li>)}</ul></section></Reveal>
        <footer className="bio-footer"><p>{t.closing}</p><Link className="back-link" href="/">{t.back}<span aria-hidden="true">{ar ? "←" : "→"}</span></Link></footer>
      </div>
      <style jsx>{`
        .biography { background: #f4f1e9; color: #242321; }
        .page-shell { width: min(100% - 100px, 1280px); margin: auto; }
        .biography :global(.back-link), .external-link { display: inline-flex; align-items: center; gap: 22px; min-height: 44px; color: #a76143; font-size: 12px; text-decoration: none; border-bottom: 1px solid #a76143; transition: gap .25s; }
        .biography :global(.back-link:hover), .external-link:hover { gap: 30px; }
        .page-shell > :global(.back-link) { margin-top: 34px; }
        .biography :global(a:focus-visible) { outline: 2px solid #a76143; outline-offset: 5px; }
        .introduction { display: grid; grid-template-columns: 1.12fr .88fr; align-items: center; gap: clamp(36px, 7vw, 110px); padding: 55px 0 100px; }
        .eyebrow { color: #a76143; font-size: 11px; text-transform: uppercase; letter-spacing: .13em; margin: 0 0 24px; }
        h1, h2, h3, blockquote, .bio-footer p { font-family: var(--font-serif, Georgia), serif; font-weight: 400; }
        h1 { font-size: clamp(44px, 5.2vw, 78px); line-height: 1.07; letter-spacing: -.04em; margin: 0 0 28px; }
        h2 { font-size: clamp(30px, 3.3vw, 46px); line-height: 1.18; margin: 0; letter-spacing: -.025em; }
        h3 { font-size: 25px; line-height: 1.5; margin: 0; }
        p { font-size: 15px; color: #514a43; line-height: 1.95; margin: 0 0 20px; }
        .role { color: #a76143; font-size: 12px; margin-bottom: 32px; }
        .intro-text { max-width: 580px; }
        .editorial { display: grid; grid-template-columns: .85fr 1.15fr; gap: 70px; padding: 85px 0; border-top: 1px solid #d8d0c4; }
        .degree { font-size: 30px; margin-bottom: 12px; }
        dl { margin: 34px 0 0; }
        dl > div { padding-block: 20px; border-top: 1px solid #d8d0c4; }
        dt { font-size: 11px; color: #a76143; margin-bottom: 12px; }
        dd { margin: 0; font-size: 17px; line-height: 1.7; }
        .thesis { font-family: var(--font-serif, Georgia), serif; font-size: 25px; }
        .editorial.experience { grid-template-columns: minmax(0, 1fr); gap: 28px; padding-block: 54px; }
        .experience-list { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0 38px; list-style: none; padding: 0; margin: 0; align-items: start; }
        .experience-list li { min-width: 0; padding: 18px 0; border-top: 1px solid #d8d0c4; }
        .experience-list .institution { margin: 0 0 7px; color: #a76143; font-size: 12px; line-height: 1.6; }
        .experience-list h3, .biography[lang="ar"] .experience-list h3 { font-family: inherit; font-size: 17px; font-weight: 400; line-height: 1.7; letter-spacing: 0; overflow-wrap: anywhere; }
        .experience-list details { margin-top: 8px; font-size: 12px; }
        .experience-list summary { width: fit-content; min-height: 32px; padding-block: 5px; color: #a76143; cursor: pointer; }
        .experience-list summary:focus-visible { outline: 2px solid #a76143; outline-offset: 3px; }
        .experience-list details p { margin: 8px 0 0; font-size: 14px; line-height: 1.85; }
        .experience-list .external-link { max-width: 100%; gap: 12px; }
        .work-section { padding: 54px 0 60px; border-top: 1px solid #d8d0c4; }
        .work-heading { display: flex; align-items: end; justify-content: space-between; gap: 48px; margin-bottom: 28px; }
        .work-heading > p { max-width: 330px; margin: 0; font-size: 13px; }


        .project-texts { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; margin-top: 20px; }
        .project-text { min-width: 0; padding: 14px 0; border-bottom: 1px solid #d8d0c4; }
        .project-text .eyebrow { margin-bottom: 6px; }
        .project-text h3, .biography[lang="ar"] .project-text h3 { font-size: clamp(15px, 2vw, 23px); line-height: 1.6; overflow-wrap: anywhere; }
        .philosophy { position: relative; overflow: hidden; background: #242321; color: #f4f1e9; padding: clamp(75px, 9vw, 135px) 0; }
        .philosophy svg { position: absolute; inset: 0; width: 100%; height: 100%; stroke: #b79c80; fill: none; stroke-width: .6; opacity: .13; pointer-events: none; }
        .philosophy-inner { position: relative; width: min(100% - 100px, 980px); margin: auto; }
        .philosophy .eyebrow { color: #d69b7c; }
        blockquote { margin: 35px 0; }
        blockquote p { font-size: clamp(32px, 4.4vw, 62px); line-height: 1.25; color: #f4f1e9; letter-spacing: -.025em; }
        .philosophy-copy { max-width: 680px; color: #cec5b8; font-size: 14px; }
        .participation { margin: 0; padding-inline-start: 20px; color: #514a43; }
        .participation li { padding-inline-start: 12px; margin-bottom: 24px; font-size: 17px; line-height: 1.9; }
        .participation li::marker { color: #a76143; }
        .heritage { padding-bottom: 100px; }
        .external-link { margin-top: 8px; }
        .bio-footer { display: flex; align-items: center; justify-content: space-between; gap: 30px; padding: 38px 0; border-top: 1px solid #d8d0c4; }
        .bio-footer p { margin: 0; font-size: 24px; }
        .biography[lang="ar"] { font-family: var(--font-ibm-arabic), sans-serif; }
        .biography[lang="ar"] h1, .biography[lang="ar"] h2, .biography[lang="ar"] h3, .biography[lang="ar"] blockquote, .biography[lang="ar"] .thesis, .biography[lang="ar"] .bio-footer p { font-family: inherit; letter-spacing: 0; }
        .biography[lang="ar"] h1 { font-size: clamp(34px, 3.9vw, 52px); line-height: 1.6; }
        .biography[lang="ar"] h2 { font-size: clamp(27px, 2.8vw, 36px); line-height: 1.6; }
        .biography[lang="ar"] h3, .biography[lang="ar"] .thesis { font-size: 22px; line-height: 1.8; }
        .biography[lang="ar"] blockquote p { font-size: clamp(28px, 3.6vw, 46px); line-height: 1.8; letter-spacing: 0; }
        .biography[lang="ar"] .eyebrow { letter-spacing: 0; font-size: 13px; }
        @media (max-width: 900px) { .page-shell { width: calc(100% - 56px); } .editorial { gap: 35px; grid-template-columns: .9fr 1.1fr; } .introduction { gap: 30px; } .work-heading { align-items: start; flex-direction: column; gap: 24px; } }
        @media (max-width: 650px) { .page-shell, .philosophy-inner { width: calc(100% - 40px); } .introduction, .editorial { grid-template-columns: 1fr; gap: 34px; } .introduction { padding: 45px 0 60px; } .editorial, .work-section { padding: 60px 0; } .project-texts { gap: 12px; } .editorial.experience { padding-block: 40px; gap: 22px; } .experience-list { grid-template-columns: minmax(0, 1fr); } .experience-list li { padding-block: 14px; } .experience-list h3, .biography[lang="ar"] .experience-list h3 { font-size: 16px; } .work-section { padding-block: 40px; } .bio-footer { align-items: start; flex-direction: column; gap: 20px; } h1 { font-size: 44px; } }
        @media (prefers-reduced-motion: reduce) { .biography :global(.back-link), .external-link { transition: none; } }
      `}</style>
    </main>
      <Footer />
  </>;
}


