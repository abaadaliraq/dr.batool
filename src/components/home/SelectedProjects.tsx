"use client";

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import type { Language } from "@/components/site/LanguageProvider";
import labsImage from "../../../public/images/labs-progect.jpg.png";
import mosqueImage from "../../../public/images/mosqu-project.jpg.png";
import parkingImage from "../../../public/images/park-project.jpg.png";

const projects = [
  {
    id: "laboratories", number: "01", duration: "00:33", image: labsImage, video: "https://player.cloudinary.com/embed/?cloud_name=dyqdfbaln&public_id=labs_zbsjso",
    en: {
      name: "Classrooms & Scientific Laboratories Building",
      category: "Educational Architecture",
      summary: "An architectural design accommodating a combined total of 200 classrooms and scientific laboratories, supporting the development of educational infrastructure at Al-Farahidi University.",
      description: [
        "The design of the Classrooms & Scientific Laboratories Building forms part of Al-Farahidi University’s programme of development projects.",
        "The project accommodates a combined total of 200 classrooms and scientific laboratories, designed to meet contemporary academic and technical requirements.",
        "The design focuses on creating an integrated learning environment, improving the efficiency of scientific spaces, and balancing functional requirements with architectural quality.",
        "The project aims to support the development of educational and service infrastructure, providing suitable spaces for students and academic staff."
      ]
    },
    ar: {
      name: "بناية القاعات الدراسية والمختبرات العلمية",
      category: "العمارة التعليمية",
      summary: "مشروع معماري يضم 200 قاعة دراسية ومختبراً علمياً، ضمن رؤية لتطوير البنية التحتية التعليمية في جامعة الفراهيدي.",
      description: [
        "يأتي تصميم بناية القاعات الدراسية والمختبرات العلمية ضمن سلسلة المشاريع التطويرية لجامعة الفراهيدي.",
        "يضم المشروع 200 قاعة دراسية ومختبراً علمياً، صُممت لتلبية المتطلبات الأكاديمية والتقنية الحديثة.",
        "يركز التصميم على توفير بيئة تعليمية متكاملة، وتعزيز كفاءة الفضاءات العلمية، وتحقيق التوازن بين المتطلبات الوظيفية والجودة المعمارية.",
        "الهدف من المشروع هو دعم تطوير البنية التحتية التعليمية والخدمية، وتوفير مساحات مناسبة للطلبة والكوادر الأكاديمية."
      ]
    }
  },
  {
    id: "mosque", number: "02", duration: "00:35", image: mosqueImage, video: "https://player.cloudinary.com/embed/?cloud_name=dyqdfbaln&public_id=mosque_qevz0w",
    en: {
      name: "Al-Farahidi University Mosque",
      category: "Contemporary Islamic Architecture",
      summary: "An architectural design that interprets the vocabulary of Islamic architecture through a contemporary lens, creating a spiritual and community space within the university campus.",
      description: [
        "The Al-Farahidi University Mosque project is conceived as a key urban and service component of the campus master plan.",
        "The design draws on the vocabulary of Islamic architecture through a contemporary approach, using massing, spatial composition, and geometric elements to bring spiritual expression and service functions into a coherent whole.",
        "It seeks to provide a balanced built environment that responds to worshippers’ needs through comfortable spaces, fluid circulation, and integrated facilities.",
        "Beyond its religious function, the project is envisioned as a community space for charitable events and cultural and social activities within the university environment."
      ]
    },
    ar: {
      name: "جامع جامعة الفراهيدي",
      category: "العمارة الإسلامية المعاصرة",
      summary: "تصميم معماري يستلهم مفردات العمارة الإسلامية بروح معاصرة، ليشكّل فضاءً روحياً ومجتمعياً ضمن الحرم الجامعي.",
      description: [
        "يمثل مشروع جامع جامعة الفراهيدي أحد المرتكزات العمرانية والخدمية ضمن المخطط الشامل للحرم الجامعي.",
        "يرتكز التصميم على مقاربة معمارية تستلهم مفردات العمارة الإسلامية بروح معاصرة، من خلال توظيف الكتل والفراغات والعناصر الهندسية لتحقيق التكامل بين البعد الروحي والوظيفة الخدمية.",
        "يراعي التصميم توفير بيئة عمرانية متوازنة تستجيب لاحتياجات المصلين، من خلال فضاءات مريحة وحركة انسيابية ومرافق خدمية متكاملة.",
        "كما يتجاوز المشروع وظيفته التعبدية، ليكون فضاءً مجتمعياً يحتضن الفعاليات الخيرية والأنشطة الثقافية والاجتماعية ضمن البيئة الجامعية."
      ]
    }
  },
  {
    id: "parking", number: "03", duration: "00:32", image: parkingImage, video: "https://player.cloudinary.com/embed/?cloud_name=dyqdfbaln&public_id=park_by4nfm",
    en: {
      name: "Multi-Storey Parking Facility",
      category: "Campus Infrastructure",
      summary: "A design for a multi-storey parking facility that strengthens campus service infrastructure and facilitates vehicle circulation.",
      description: [
        "The Multi-Storey Parking Facility forms part of Al-Farahidi University’s series of contemporary development projects.",
        "The design aims to strengthen campus service infrastructure through an organised approach to vehicle circulation and parking.",
        "The project focuses on providing a smooth and convenient mobility experience that meets the needs of students, teaching staff, and administrative personnel.",
        "It reflects a commitment to developing the services that support the educational environment and improving the efficiency of movement throughout the university campus."
      ]
    },
    ar: {
      name: "موقف السيارات متعدد الطوابق",
      category: "البنية التحتية الجامعية",
      summary: "تصميم موقف سيارات متعدد الطوابق لتعزيز البنية التحتية الخدمية وتسهيل حركة المركبات داخل الحرم الجامعي.",
      description: [
        "يأتي مشروع موقف السيارات متعدد الطوابق ضمن سلسلة المشاريع التطويرية الحديثة لجامعة الفراهيدي.",
        "يهدف التصميم إلى تعزيز البنية التحتية الخدمية للحرم الجامعي، وتوفير حلول منظمة لحركة المركبات ومواقف السيارات.",
        "يركز المشروع على توفير تجربة تنقل سلسة ومريحة، بما يلبي احتياجات الطلبة والكوادر التدريسية والإدارية.",
        "يعكس التصميم توجهاً نحو تطوير الخدمات المساندة للبيئة التعليمية، وتحسين كفاءة الحركة والتنقل داخل المجمع الجامعي."
      ]
    }
  }
];

const copy = {
  en: {
    eyebrow: "03 / SELECTED WORKS", title: "Selected Projects",
    intro: "Architectural works for Al-Farahidi University, exploring educational environments, contemporary Islamic architecture, and campus infrastructure.",
    client: "Al-Farahidi University", explore: "Explore project", watch: "Watch project film", film: "Project film", play: "Watch the film", overview: "Project overview", index: "Project index", close: "Close", design: "Architectural Design", previous: "Previous project", next: "Next project",
    videoError: "The player could not be loaded.", short: ["Classrooms & Laboratories", "University Mosque", "Multi-Storey Parking"]
  },
  ar: {
    eyebrow: "03 / أعمال معمارية مختارة", title: "المشاريع المختارة",
    intro: "مجموعة من التصاميم المعمارية لمشاريع جامعة الفراهيدي، تجمع بين تطوير البيئة التعليمية والعمارة الإسلامية المعاصرة والبنية التحتية للحرم الجامعي.",
    client: "جامعة الفراهيدي", explore: "استكشف المشروع", watch: "مشاهدة فيديو المشروع", film: "فيديو المشروع", play: "مشاهدة الفيديو", overview: "نبذة عن المشروع", index: "فهرس المشاريع", close: "إغلاق", design: "التصميم المعماري", previous: "المشروع السابق", next: "المشروع التالي",
    videoError: "تعذّر تحميل مشغل الفيديو.", short: ["القاعات الدراسية والمختبرات", "جامع الجامعة", "موقف السيارات متعدد الطوابق"]
  }
};

const mobileCopy = {
  ar: {
    intro: "ثلاثة مشاريع لجامعة الفراهيدي في التعليم والعمارة الإسلامية والبنية التحتية.",
    tabs: ["المختبرات", "الجامع", "موقف السيارات"],
    summaries: [
      "200 قاعة دراسية ومختبراً علمياً ضمن تطوير البيئة التعليمية بجامعة الفراهيدي.",
      "جامع معاصر يجمع العبادة والحياة المجتمعية ضمن الحرم الجامعي.",
      "موقف متعدد الطوابق لدعم خدمات الحرم الجامعي وتنظيم حركة المركبات."
    ]
  },
  en: {
    intro: "Three Al-Farahidi University projects in education, Islamic architecture, and campus infrastructure.",
    tabs: ["Labs", "Mosque", "Parking"],
    summaries: [
      "200 classrooms and scientific laboratories for Al-Farahidi University.",
      "A contemporary mosque bringing worship and community life to the campus.",
      "Multi-storey parking supporting campus services and vehicle circulation."
    ]
  }
};

type Project = (typeof projects)[number];
type ModalSelection = { index: number; kind: "details" | "video" };

function ProjectFilm({ project, language, start = false, closing }: { project: Project; language: Language; start?: boolean; closing: boolean }) {
  const [requested, setRequested] = useState(start);
  const [failed, setFailed] = useState(false);
  const t = copy[language];
  const text = project[language];
  // No iframe or request to Cloudinary exists before a visitor asks to play.
  return <div className="film">
    {requested && !closing ? <>
      <div className="player-frame">
        <iframe src={project.video + "&player%5Bautoplay%5D=true"} title={t.film + ": " + text.name} loading="lazy" allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowFullScreen onError={() => setFailed(true)} />
      </div>
      {failed && <p className="player-help" role="status">{t.videoError}</p>}
    </> : <button type="button" className="film-preview" onClick={() => setRequested(true)} aria-label={t.play + ": " + text.name} disabled={closing}>
      <Image src={project.image} alt={text.name} sizes="(max-width: 750px) 95vw, 1100px" />
      <span className="film-play"><span aria-hidden="true">▶</span>{t.play}<span aria-hidden="true"> — {project.duration}</span></span>
    </button>}
    <style jsx>{`
      .film { min-width: 0; }
      .player-frame { position: relative; aspect-ratio: 16 / 9; background: #242321; }
      iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }
      .film-preview { position: relative; display: block; width: 100%; padding: 0; border: 0; background: #e9e5dc; cursor: pointer; }
      .film-preview :global(img) { display: block; width: 100%; height: auto; max-height: 65dvh; object-fit: contain; }
      .film-play { position: absolute; inset-inline-start: 24px; bottom: 24px; display: flex; align-items: center; gap: 14px; min-height: 48px; padding: 14px 22px; background: #f4f1e9; color: #242321; font-family: inherit; font-size: 12px; border: 1px solid #a76143; }
      .film-play > span { color: #a76143; }
      .film-preview:hover .film-play { background: #242321; color: #f4f1e9; }
      .film-preview:focus-visible { outline: 2px solid #a76143; outline-offset: 5px; }
      .player-help { margin: 16px 0 0; color: #71665b; font-size: 12px; line-height: 1.9; }
      @media (max-width: 600px) { .film-play { bottom: 14px; inset-inline-start: 14px; padding: 12px 14px; font-size: 11px; } }
    `}</style>
  </div>;
}

function ProjectModal({ selection, language, onDismiss }: { selection: ModalSelection; language: Language; onDismiss: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [closing, setClosing] = useState(false);
  const project = projects[selection.index];
  const t = copy[language];
  const text = project[language];
  const isVideo = selection.kind === "video";

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      // Cleanup must never dismiss React state: Strict Mode replays this effect.
      // In particular, do not wire the native close event to onDismiss.
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, []);

  function requestClose() {
    if (closing) return;
    setClosing(true); // Unmounts the iframe immediately, stopping playback.
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 450;
    timerRef.current = setTimeout(onDismiss, duration);
  }

  return createPortal(<dialog ref={dialogRef} className={`project-modal ${isVideo ? "video-modal" : "case-study"} ${closing ? "is-closing" : ""}`} dir={language === "ar" ? "rtl" : "ltr"} lang={language} aria-labelledby="project-modal-title"
    onCancel={event => { event.preventDefault(); requestClose(); }}
    onKeyDown={event => {
      if (event.key !== "Tab") return;
      const dialog = dialogRef.current;
      if (!dialog) return;
      const controls = Array.from(dialog.querySelectorAll<HTMLElement>('button, a[href], iframe, [tabindex]')).filter(element => element.tabIndex >= 0 && !element.hasAttribute("disabled") && element.getClientRects().length > 0);
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (!first) { event.preventDefault(); dialog.focus(); }
      else if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement))) { event.preventDefault(); first.focus(); }
    }}>
    <div className="modal-toolbar"><span>{project.number} / {isVideo ? t.film : t.design}</span><button ref={closeRef} type="button" className="close-button" onClick={requestClose} aria-label={t.close}><span>{t.close}</span><span aria-hidden="true">×</span></button></div>
    {isVideo ? <div className="video-content"><h2 id="project-modal-title">{text.name}</h2><ProjectFilm project={project} language={language} start closing={closing} /></div> : <div className="case-content">
      <header className="case-header"><span className="case-number" aria-hidden="true">{project.number}</span><div><p className="case-kicker">{text.category} <span aria-hidden="true">/</span> {t.client}</p><h2 id="project-modal-title">{text.name}</h2></div></header>
      <figure className="case-visual"><Image src={project.image} alt={text.name} sizes="(max-width: 750px) 95vw, 1280px" /></figure>
      <section className="case-overview" aria-labelledby="project-overview-title"><h3 id="project-overview-title">{t.overview}</h3><div>{text.description.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div></section>
      <section className="case-film" aria-labelledby="project-film-title"><div className="film-heading"><span aria-hidden="true">▶</span><h3 id="project-film-title">{t.film}</h3></div><ProjectFilm project={project} language={language} closing={closing} /></section>
    </div>}
    <style jsx>{`
      .project-modal { position: fixed; inset: 0; margin: 0; padding: 0; width: 100%; max-width: none; height: 100dvh; max-height: none; border: 0; background: #f4f1e9; color: #242321; overflow-y: auto; overscroll-behavior: contain; font-family: var(--font-inter, Arial), sans-serif; animation: modalEnter 550ms cubic-bezier(.2,.7,.2,1) both; }
      .project-modal::backdrop { background: rgba(36,35,33,.78); }
      .project-modal[lang="ar"] { font-family: var(--font-ibm-arabic), sans-serif; }
      .modal-toolbar { position: sticky; top: 0; z-index: 5; display: flex; align-items: center; justify-content: space-between; gap: 20px; min-height: 70px; padding: 10px clamp(20px, 4vw, 64px); border-bottom: 1px solid #d8d5ce; background: #f4f1e9; }
      .modal-toolbar > span { font-size: 11px; color: #a76143; line-height: 1.8; }
      .close-button { display: inline-flex; align-items: center; gap: 16px; min-height: 44px; border: 0; background: transparent; color: #242321; font: inherit; font-size: 12px; cursor: pointer; }
      .close-button > span:last-child { font-size: 30px; line-height: 1; font-weight: 400; }
      .close-button:hover { color: #a76143; }
      .close-button:focus-visible { outline: 2px solid #a76143; outline-offset: 4px; }
      .case-content { width: min(100% - 100px, 1280px); margin: auto; padding-bottom: 70px; }
      .case-header { display: grid; grid-template-columns: auto 1fr; align-items: start; gap: clamp(25px, 5vw, 80px); padding: clamp(40px, 5vw, 80px) 0 45px; }
      .case-number { font-family: Georgia, serif; color: #a76143; font-size: clamp(55px, 7vw, 100px); line-height: 1; }
      .case-kicker { margin: 0 0 20px; display: flex; flex-wrap: wrap; gap: 8px 18px; color: #776b5e; font-size: 11px; line-height: 1.9; }
      h2 { max-width: 1000px; margin: 0; font-family: var(--font-serif, Georgia), serif; font-weight: 400; font-size: clamp(34px, 4.6vw, 66px); letter-spacing: -.035em; line-height: 1.13; }
      .case-visual { margin: 0; background: #e9e5dc; }
      .case-visual :global(img) { display: block; width: 100%; height: auto; max-height: 72dvh; object-fit: contain; }
      .case-overview { display: grid; grid-template-columns: .5fr 1fr; gap: 50px; padding: 60px 0; margin-top: 25px; border-bottom: 1px solid #d8d5ce; }
      h3 { margin: 0; font-family: var(--font-serif, Georgia), serif; font-weight: 400; font-size: 28px; line-height: 1.4; }
      .case-overview p { margin: 0 0 20px; color: #514a43; font-size: 15px; line-height: 1.95; }
      .case-overview p:last-child { margin-bottom: 0; }
      .case-film { padding-top: 50px; }
      .film-heading { display: flex; align-items: center; gap: 18px; margin-bottom: 25px; }
      .film-heading > span { color: #a76143; font-size: 13px; }
      .video-modal { width: min(1120px, calc(100% - 48px)); height: auto; max-height: calc(100dvh - 48px); margin: auto; }
      .video-content { padding: 28px; }
      .video-content h2 { font-size: clamp(25px, 2.5vw, 36px); margin-bottom: 24px; }
      .project-modal[lang="ar"] h2 { font-family: inherit; font-size: clamp(30px, 3.4vw, 46px); line-height: 1.7; letter-spacing: 0; }
      .project-modal[lang="ar"] h3 { font-family: inherit; font-size: 26px; }
      .project-modal[lang="ar"] .video-content h2 { font-size: clamp(23px, 2.5vw, 32px); }
      .is-closing { animation: modalExit 450ms ease both; }
      @keyframes modalEnter { from { opacity: 0; transform: translateY(25px); } to { opacity: 1; transform: none; } }
      @keyframes modalExit { to { opacity: 0; transform: translateY(16px); } }
      @media (max-width: 700px) { .case-content { width: calc(100% - 40px); padding-bottom: 45px; } .case-header { grid-template-columns: 1fr; gap: 20px; padding: 30px 0; } .case-number { font-size: 44px; } .case-kicker { margin-bottom: 14px; } .case-overview { grid-template-columns: 1fr; gap: 25px; padding: 35px 0; } .case-film { padding-top: 35px; } .video-modal { width: calc(100% - 20px); max-height: calc(100dvh - 20px); } .video-content { padding: 20px 14px; } .modal-toolbar { min-height: 60px; } }
      @media (prefers-reduced-motion: reduce) { .project-modal, .is-closing { animation: none; } }
    `}</style>
  </dialog>, document.body);
}

export default function SelectedProjects({ language }: { language: Language }) {
  const [active, setActive] = useState(0);
  const [modal, setModal] = useState<ModalSelection | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const indexRef = useRef<HTMLDivElement>(null);
  const project = projects[active];
  const text = project[language];
  const t = copy[language];
  const ar = language === "ar";
  const mobileText = mobileCopy[language];

  useEffect(() => {
    const element = sectionRef.current;
    if (!element || !("IntersectionObserver" in window)) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches || element.getBoundingClientRect().top < window.innerHeight) return;
    element.dataset.reveal = "pending";
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { element.dataset.reveal = "shown"; observer.disconnect(); }
    }, { threshold: 0.08 });
    const reveal = () => { if (preference.matches) element.dataset.reveal = "shown"; };
    observer.observe(element);
    preference.addEventListener("change", reveal);
    return () => { observer.disconnect(); preference.removeEventListener("change", reveal); };
  }, []);

  function selectFromKeyboard(event: KeyboardEvent<HTMLButtonElement>, position: number) {
    let next: number;
    if (event.key === "Home") next = 0;
    else if (event.key === "End") next = projects.length - 1;
    else if (event.key === "ArrowRight") next = (position + (ar ? -1 : 1) + projects.length) % projects.length;
    else if (event.key === "ArrowLeft") next = (position + (ar ? 1 : -1) + projects.length) % projects.length;
    else return;
    event.preventDefault();
    setActive(next);
    indexRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus({ preventScroll: true });
  }

  return <section id="projects" ref={sectionRef} className="showcase" lang={language} dir={ar ? "rtl" : "ltr"} aria-labelledby="selected-projects-title">
    <div className="showcase-shell">
      <header className="section-heading"><div className="heading-title"><p className="eyebrow">{t.eyebrow}</p><h2 id="selected-projects-title">{t.title}</h2></div><p><span className="desktop-only">{t.intro}</span><span className="mobile-only">{mobileText.intro}</span></p></header>
      <div ref={indexRef} className="project-index" role="tablist" aria-label={t.index}>
        <span className="index-indicator" aria-hidden="true" style={{ "--active-index": active } as CSSProperties} />
        {projects.map((item, position) => <button key={item.id} type="button" role="tab" id={"project-tab-" + item.id} aria-selected={active === position} aria-controls="active-project-panel" tabIndex={active === position ? 0 : -1} className={active === position ? "index-item is-selected" : "index-item"} onClick={() => setActive(position)} onKeyDown={event => selectFromKeyboard(event, position)}><span className="index-number">{item.number}</span><span className="desktop-only">{t.short[position]}</span><span className="mobile-only">{mobileText.tabs[position]}</span></button>)}
      </div>
      <div className="showcase-main" id="active-project-panel" role="tabpanel" aria-labelledby={"project-tab-" + project.id}>
        <div className="project-scene">
          {projects.map((item, position) => <Image key={item.id} src={item.image} alt={position === active ? text.name : ""} loading={position === active ? "eager" : "lazy"} aria-hidden={position !== active} className={position === active ? "scene-image is-active" : "scene-image"} sizes="(max-width: 800px) 94vw, (max-width: 1500px) 62vw, 850px" />)}
          <span className="scene-label" aria-hidden="true">{project.number} / {t.design}</span>
          <button type="button" className="watch-button" onClick={() => setModal({ index: active, kind: "video" })} aria-haspopup="dialog" aria-label={t.watch + ": " + text.name}><span aria-hidden="true">▶</span><span className="watch-label">{t.watch}</span></button>
        </div>
        <div className="project-information"><div className="information-transition" key={project.id + language}>
          <p className="project-count"><span>{project.number}</span><span>/ 03</span></p>
          <h3>{text.name}</h3>
          <p className="category">{text.category}</p><p className="client">{t.client}</p>
          <p className="summary"><span className="desktop-only">{text.summary}</span><span className="mobile-only">{mobileText.summaries[active]}</span></p>
          <div className="project-actions"><button type="button" className="mobile-watch-button mobile-only" onClick={() => setModal({ index: active, kind: "video" })} aria-haspopup="dialog">{t.watch}</button><button type="button" className="explore-button" onClick={() => setModal({ index: active, kind: "details" })} aria-haspopup="dialog">{t.explore}<span aria-hidden="true">{ar ? "←" : "→"}</span></button></div>
        </div></div>
      </div>
      <div className="index-heading"><p>{t.index}</p><div className="step-buttons"><button type="button" aria-label={t.previous} onClick={() => setActive((active + 2) % 3)}>{ar ? "→" : "←"}</button><button type="button" aria-label={t.next} onClick={() => setActive((active + 1) % 3)}>{ar ? "←" : "→"}</button></div></div>

    </div>
    {modal && <ProjectModal selection={modal} language={language} onDismiss={() => setModal(null)} />}
    <style jsx>{`
      .showcase { padding: clamp(60px, 6vw, 95px) 0; background: #f4f1e9; color: #242321; scroll-margin-top: 95px; }
      .showcase-shell { display: grid; grid-template-areas: "heading" "main" "index-heading" "index"; width: min(100% - 100px, 1360px); margin: auto; border-top: 1px solid #d8d5ce; padding-top: 35px; transition: opacity 600ms ease, transform 600ms ease; }
      .showcase[data-reveal="pending"] .showcase-shell { opacity: 0; transform: translateY(18px); }
      .mobile-only { display: none; }
      .project-actions { display: contents; }
      .watch-button .watch-label { color: inherit; font-size: inherit; }
      .section-heading { grid-area: heading; display: grid; grid-template-columns: 1fr 1fr; gap: 50px; align-items: end; margin-bottom: 32px; }
      .heading-title { border-inline-start: 1px solid #a76143; padding-inline-start: 22px; }
      .eyebrow { margin: 0 0 12px; font-size: 10px; letter-spacing: .14em; line-height: 1.8; color: #a76143; }
      h2 { margin: 0; font-family: var(--font-serif, Georgia), serif; font-size: clamp(34px, 3.5vw, 48px); font-weight: 400; line-height: 1.2; letter-spacing: -.03em; }
      .section-heading > p { max-width: 520px; margin: 0; font-size: 13px; line-height: 1.85; color: #655c52; }
      .showcase-main { grid-area: main; display: grid; grid-template-columns: minmax(0, 1.85fr) minmax(0, 1fr); border-block: 1px solid #d8d5ce; }
      .project-scene { position: relative; min-width: 0; min-height: 540px; overflow: hidden; background: #e9e5dc; }
      .project-scene :global(.scene-image) { position: absolute; inset: 0; display: block; width: 100%; height: 100%; object-fit: contain; opacity: 0; transform: scale(1.015); transition: opacity 600ms ease, transform 650ms cubic-bezier(.2,.7,.2,1); pointer-events: none; }
      .project-scene :global(.scene-image.is-active) { opacity: 1; transform: scale(1); }
      .project-scene:hover :global(.scene-image.is-active) { transform: scale(1.018); }
      .scene-label { position: absolute; top: 22px; inset-inline-start: 24px; z-index: 1; font-size: 10px; line-height: 1.7; color: #655c52; }
      .watch-button { position: absolute; bottom: 24px; inset-inline-start: 24px; z-index: 2; display: inline-flex; align-items: center; gap: 13px; min-height: 48px; max-width: calc(100% - 40px); padding: 13px 18px; background: #f4f1e9; color: #242321; border: 1px solid #bca38e; font: inherit; font-size: 11px; cursor: pointer; }
      .watch-button > span { color: #a76143; font-size: 11px; }
      .watch-button:hover { background: #242321; color: #f4f1e9; }
      .project-information { display: flex; align-items: center; min-width: 0; padding: 30px clamp(24px, 3vw, 44px); border-inline-start: 1px solid #d8d5ce; }
      .information-transition { min-width: 0; animation: informationEnter 500ms ease both; }
      .project-count { display: flex; align-items: baseline; gap: 12px; margin: 0 0 23px; color: #a76143; }
      .project-count > span:first-child { font-family: Georgia, serif; font-size: 47px; line-height: 1; }
      .project-count > span:last-child { font-size: 11px; color: #8b7d6e; }
      h3 { margin: 0 0 20px; font-family: var(--font-serif, Georgia), serif; font-size: clamp(25px, 2.3vw, 34px); font-weight: 400; line-height: 1.2; letter-spacing: -.025em; overflow-wrap: break-word; }
      .category { margin: 0 0 7px; font-size: 11px; line-height: 1.8; color: #a76143; }
      .client { margin: 0; font-size: 11px; line-height: 1.8; color: #655c52; }
      .summary { margin: 21px 0 22px; font-size: 13px; line-height: 1.85; color: #514a43; }
      .explore-button { display: inline-flex; align-items: center; justify-content: space-between; gap: 22px; width: 100%; min-height: 46px; padding: 12px 0; border: 0; border-block: 1px solid #bca38e; background: transparent; font: inherit; font-size: 11px; color: #a76143; cursor: pointer; }
      .explore-button > span { font-size: 20px; }
      .explore-button:hover { color: #242321; }
      button:focus-visible { outline: 2px solid #a76143; outline-offset: 4px; }
      .index-heading { grid-area: index-heading; display: flex; align-items: center; justify-content: space-between; gap: 20px; padding: 22px 0 16px; }
      .index-heading > p { margin: 0; color: #8b7d6e; font-size: 10px; text-transform: uppercase; letter-spacing: .14em; }
      .step-buttons { display: flex; gap: 5px; }
      .step-buttons button { display: grid; place-items: center; width: 38px; height: 34px; padding: 0; border: 1px solid #d8d5ce; background: transparent; color: #a76143; font-size: 18px; cursor: pointer; }
      .step-buttons button:hover { border-color: #a76143; }
      .project-index { grid-area: index; position: relative; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); border-block: 1px solid #d8d5ce; }
      .index-item { position: relative; display: flex; align-items: start; gap: 16px; min-width: 0; min-height: 80px; padding: 24px 22px; border: 0; border-inline-end: 1px solid #d8d5ce; background: transparent; color: #776b5e; text-align: start; font: inherit; font-size: 13px; line-height: 1.7; cursor: pointer; }
      .index-item:last-child { border-inline-end: 0; }
      .index-number { padding-top: 2px; color: #a76143; font-size: 10px; }
      .index-item.is-selected { color: #242321; background: rgba(167,97,67,.035); }
      .index-indicator { position: absolute; top: -1px; inset-inline-start: calc(var(--active-index) * 100% / 3); width: calc(100% / 3); height: 2px; background: #a76143; z-index: 1; transition: inset-inline-start 500ms cubic-bezier(.2,.7,.2,1); pointer-events: none; }
      .showcase[lang="ar"] { font-family: var(--font-ibm-arabic), sans-serif; }
      .showcase[lang="ar"] h2 { font-family: inherit; font-size: clamp(29px, 3vw, 39px); line-height: 1.6; letter-spacing: 0; }
      .showcase[lang="ar"] h3 { font-family: inherit; font-size: clamp(24px, 2.1vw, 29px); line-height: 1.65; letter-spacing: 0; }
      .showcase[lang="ar"] .eyebrow, .showcase[lang="ar"] .index-heading > p { letter-spacing: 0; }
      @keyframes informationEnter { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
      @media (min-width: 1500px) { .project-scene { min-height: 580px; } }
      @media (max-width: 1000px) { .showcase-shell { width: calc(100% - 56px); } .project-information { padding: 26px; } .section-heading { gap: 30px; } .index-item { padding-inline: 16px; gap: 12px; } }
      @media (max-width: 800px) { .showcase-main { grid-template-columns: 1fr; } .project-scene { min-height: 0; height: auto; aspect-ratio: 1.55 / 1; } .project-information { border-inline-start: 0; border-top: 1px solid #d8d5ce; padding: 28px 0; } .information-transition { width: 100%; } h3 { max-width: 620px; font-size: 30px; } .project-count { margin-bottom: 18px; } .summary { max-width: 600px; } .explore-button { max-width: 350px; } .scene-label { top: 14px; inset-inline-start: 16px; font-size: 9px; } .watch-button { bottom: 16px; inset-inline-start: 16px; padding: 10px 14px; min-height: 44px; } }
      @media (max-width: 600px) { .showcase-shell { width: calc(100% - 40px); padding-top: 28px; } .section-heading { grid-template-columns: 1fr; gap: 22px; } .project-count > span:first-child { font-size: 38px; } .project-index { grid-template-columns: 1fr; } .index-item { align-items: center; min-height: 62px; padding: 15px 4px; border-inline-end: 0; border-bottom: 1px solid #d8d5ce; } .index-item:last-child { border-bottom: 0; } .index-indicator { display: none; } .index-item::before { content: ""; position: absolute; inset-inline-start: -8px; top: 16px; bottom: 16px; width: 2px; background: #a76143; opacity: 0; transition: opacity 400ms ease; } .index-item.is-selected::before { opacity: 1; } .watch-button { font-size: 10px; gap: 9px; } .project-scene { aspect-ratio: 1.35 / 1; } }
      @media (max-width: 767px) {
        .showcase { padding: 30px 0; scroll-margin-top: 82px; }
        .showcase-shell { width: 100%; border-top: 0; padding-top: 0; grid-template-areas: "heading" "index" "main"; }
        .section-heading { grid-template-columns: minmax(0, 1fr); gap: 10px; margin: 0 20px 14px; }
        .heading-title { border: 0; padding: 0; }
        .eyebrow, .index-heading, .scene-label, .project-count, .client, .desktop-only { display: none; }
        .mobile-only { display: inline; }
        h2 { font-size: 29px; line-height: 1.3; }
        .showcase[lang="ar"] h2 { font-size: 28px; line-height: 1.5; }
        .section-heading > p { display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden; max-width: none; font-size: 13px; line-height: 1.65; }
        .showcase[lang="ar"] .section-heading > p { font-size: 14px; }
        .project-index { grid-template-columns: repeat(3, minmax(0, 1fr)); margin: 0 20px 12px; border-top: 0; border-bottom: 1px solid #d8d5ce; }
        .index-item { display: flex; align-items: center; justify-content: center; gap: 0; min-height: 48px; padding: 8px 3px; border: 0; font-size: 11.5px; line-height: 1.6; text-align: center; white-space: nowrap; }
        .index-item:last-child { border: 0; }
        .index-item.is-selected { background: transparent; color: #242321; }
        .index-item::before { display: none; }
        .index-number { padding: 0; font-size: 10px; }
        .index-number::after { content: "|"; margin-inline: 5px; color: #bca38e; }
        .index-indicator { display: block; top: auto; bottom: -1px; }
        .showcase-main { grid-template-columns: minmax(0, 1fr); border: 0; }
        .project-scene { min-height: 0; height: auto; aspect-ratio: 16 / 9; }
        .project-scene :global(.scene-image) { object-fit: cover; object-position: center; transition: opacity 350ms ease, transform 450ms ease; }
        .project-scene:hover :global(.scene-image.is-active) { transform: scale(1); }
        .watch-button { inset-inline-start: 10px; bottom: 10px; justify-content: center; width: 36px; height: 36px; min-height: 36px; padding: 0; gap: 0; }
        .watch-button > span:first-child { font-size: 13px; }
        .watch-button .watch-label { display: none; }
        .project-information { padding: 14px 20px 0; border: 0; }
        .information-transition { width: 100%; animation: mobileInformationEnter 300ms ease both; }
        h3 { margin: 0 0 6px; max-width: none; font-size: 23px; line-height: 1.3; }
        .showcase[lang="ar"] h3 { font-size: 23px; line-height: 1.5; }
        .category { margin: 0; font-size: 10.5px; line-height: 1.7; }
        .summary { display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden; margin: 10px 0 0; max-width: none; font-size: 13px; line-height: 1.65; }
        .showcase[lang="ar"] .summary { font-size: 14px; }
        .project-actions { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; margin-top: 14px; }
        .project-actions .mobile-watch-button, .project-actions .explore-button { display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-width: 0; width: 100%; max-width: none; min-height: 44px; padding: 8px 6px; border: 1px solid #bca38e; background: transparent; color: #a76143; font: inherit; font-size: 11.5px; line-height: 1.6; cursor: pointer; }
        .project-actions .mobile-watch-button:hover, .project-actions .explore-button:hover { color: #242321; border-color: #a76143; }
        .explore-button > span { font-size: 17px; }
      }
      @media (max-width: 350px) { .index-item { padding-inline: 2px; font-size: 10.5px; } .index-number { font-size: 9px; } .index-number::after { margin-inline: 1px; } }
      @keyframes mobileInformationEnter { from { opacity: 0; } to { opacity: 1; } }

      @media (prefers-reduced-motion: reduce) { .showcase-shell, .project-scene :global(.scene-image), .index-indicator, .index-item::before { transition: none; } .information-transition { animation: none; } .showcase[data-reveal="pending"] .showcase-shell { opacity: 1; transform: none; } .project-scene:hover :global(.scene-image.is-active) { transform: none; } }
    `}</style>
  </section>;
}

