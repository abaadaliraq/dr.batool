"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import heritageMain from "../../../public/images/heritage-main.jpg";
import heritageDetail from "../../../public/images/heritage-detail.png";
import type { Language } from "@/components/site/LanguageProvider";

const content = {
  ar: {
    eyebrow: "التراث العمراني",
    title: "إحياء العمارة والحفاظ على الهوية",
    description: "تهتم الدكتورة بتول موفق بالحفاظ على التراث العمراني وإعادة تأهيل المباني التاريخية، وتشغل منصب عضو الهيئة الإدارية ومسؤولة التخطيط المعماري وإحياء التراث العمراني في مؤسسة مسمار للثقافة والتنمية المستدامة.",
    button: "استكشف مؤسسة مسمار",
    image: "العمارة التراثية",
  },
  en: {
    eyebrow: "ARCHITECTURAL HERITAGE",
    title: "Preserving Architecture & Cultural Identity",
    description: "Dr. Batool Mowafaq's professional interests include architectural heritage conservation and the rehabilitation of historic buildings, recognizing architecture's role in preserving the cultural identity of cities. She serves as a Board Member and Head of Architectural Planning and Urban Heritage Revitalization at MISMAR Foundation for Culture and Sustainable Development.",
    button: "Explore MISMAR Foundation",
    image: "Architectural heritage",
  },
};

export default function Heritage({ language }: { language: Language }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [failedImages, setFailedImages] = useState<string[]>([]);
  const markFailed = (key: string) => setFailedImages(previous => previous.includes(key) ? previous : [...previous, key]);
  const t = content[language];
  const ar = language === "ar";

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof IntersectionObserver === "undefined") return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches) return;
    // Frames stay stationary so the reveal cannot prevent intersection detection.
    const targets = section.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).dataset.reveal = "shown";
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    targets.forEach(target => {
      if (target.getBoundingClientRect().top >= window.innerHeight) target.dataset.reveal = "pending";
      observer.observe(target);
    });
    const show = () => {
      if (preference.matches) {
        targets.forEach(target => { target.dataset.reveal = "shown"; });
        observer.disconnect();
      }
    };
    preference.addEventListener("change", show);
    return () => { observer.disconnect(); preference.removeEventListener("change", show); };
  }, []);

  return <section id="heritage" className="heritage" ref={sectionRef} lang={language} dir={ar ? "rtl" : "ltr"} aria-labelledby="heritage-title">
    <div className="main-frame" data-reveal="shown">
      <div className="main-media">
        {!failedImages.includes(heritageMain.src) && <Image src={heritageMain} alt={t.image} fill sizes="(max-width: 767px) 100vw, 35vw" onError={() => markFailed(heritageMain.src)} />}
      </div>
    </div>
    <div className="copy-frame" data-reveal="shown">
      <div className="copy reveal-content">
        <p className="eyebrow">{t.eyebrow}</p>
        <h2 id="heritage-title">{t.title}</h2>
        <p className="description">{t.description}</p>
        <a className="mismar-link" href="https://www.mismar.ngo/" target="_blank" rel="noopener noreferrer">{t.button}<span aria-hidden="true">{ar ? "←" : "→"}</span></a>
      </div>
    </div>
    <div className="details-frame" data-reveal="shown">
      <div className="detail-image reveal-content">
        {!failedImages.includes(heritageDetail.src) && <Image src={heritageDetail} alt={ar ? "تفصيل معماري تراثي" : "Architectural heritage detail"} fill sizes="(max-width: 767px) 100vw, 65vw" onError={() => markFailed(heritageDetail.src)} />}
      </div>
    </div>
    <style jsx>{`
      .heritage { --detail-overlap: clamp(36px, 4.2vw, 80px); direction: ltr; display: grid; grid-template-columns: minmax(0, 65fr) minmax(0, 35fr); grid-template-areas: "copy main" "details main"; grid-template-rows: auto auto; width: 100%; background: #f4f1e9; color: #242321; scroll-margin-top: 96px; }
      .copy-frame, .details-frame { direction: ltr; text-align: start; }
      .main-frame { grid-area: main; position: relative; min-width: 0; min-height: 560px; background: #ded8cd; overflow: hidden; }
      .main-media { position: absolute; inset: 0; clip-path: inset(0); transition: clip-path 800ms cubic-bezier(.22,.7,.2,1); }
      .main-media :global(img) { object-fit: cover; object-position: center; transform: scale(1); transition: transform 800ms cubic-bezier(.22,.7,.2,1); }
      .copy-frame { grid-area: copy; min-width: 0; padding: 48px clamp(28px, 4vw, 64px) 0; align-self: end; }
      .copy { max-width: 560px; margin-inline: auto; }
      .eyebrow { margin: 0 0 18px; color: #a76143; font-size: 10px; font-weight: 500; letter-spacing: .12em; line-height: 1.8; }
      h2 { margin: 0; font-family: var(--font-serif, Georgia), serif; font-size: clamp(30px, 2.9vw, 42px); font-weight: 400; line-height: 1.2; letter-spacing: -.02em; }
      .description { margin: 22px 0 0; color: #655c52; font-size: 14px; line-height: 1.9; }
      .mismar-link { display: inline-flex; align-items: center; gap: 22px; max-width: 100%; min-height: 48px; margin-top: 20px; padding-block: 10px; border-bottom: 1px solid #b66d4b; color: #9c573b; font-size: 12px; line-height: 1.8; text-decoration: none; transition: color 250ms ease, border-color 250ms ease; }
      .mismar-link span { flex-shrink: 0; font-size: 20px; }
      .mismar-link:hover { color: #242321; border-color: #242321; }
      .mismar-link:focus-visible { outline: 2px solid #b66d4b; outline-offset: 5px; }
      .details-frame { grid-area: details; position: relative; z-index: 1; width: calc(100% + var(--detail-overlap)); margin-right: calc(-1 * var(--detail-overlap)); min-width: 0; align-self: end; justify-self: start; padding: 26px 0 0; }
      .heritage[lang="ar"] .details-frame { margin-right: 0; margin-left: calc(-1 * var(--detail-overlap)); }
      .detail-image { position: relative; width: 100%; margin: 0; min-width: 0; aspect-ratio: 3 / 1; overflow: hidden; background: transparent; }
      .detail-image :global(img) { object-fit: cover; object-position: center top; transform-origin: center top; background: transparent; transition: transform 650ms cubic-bezier(.2,.7,.2,1); }
      .reveal-content { transition: opacity 700ms ease, transform 700ms cubic-bezier(.2,.7,.2,1); }
      .main-frame[data-reveal="pending"] .main-media { clip-path: inset(0 100% 0 0); }
      .heritage[lang="ar"] .main-frame[data-reveal="pending"] .main-media { clip-path: inset(0 0 0 100%); }
      .main-frame[data-reveal="pending"] .main-media :global(img) { transform: scale(1.025); }
      [data-reveal="pending"] .reveal-content { opacity: 0; transform: translateY(16px); }
      .heritage[lang="ar"] { grid-template-columns: minmax(0, 35fr) minmax(0, 65fr); grid-template-areas: "main copy" "main details"; font-family: var(--font-tajawal), sans-serif; }
      .heritage[lang="ar"] .copy-frame, .heritage[lang="ar"] .details-frame { direction: rtl; }
      .heritage[lang="ar"] .eyebrow { font-size: 13px; letter-spacing: 0; }
      .heritage[lang="ar"] h2 { font-family: inherit; font-size: clamp(28px, 2.65vw, 38px); font-weight: 500; line-height: 1.55; letter-spacing: 0; }
      .heritage[lang="ar"] .description { font-size: 16px; }
      .heritage[lang="ar"] .mismar-link { font-size: 14px; }
      @media (hover: hover) and (prefers-reduced-motion: no-preference) { .detail-image:hover :global(img) { transform: scale(1.035); } }
      @media (max-width: 1000px) { .copy-frame { padding: 36px 28px 0; } }
      @media (max-width: 767px) {
        .heritage, .heritage[lang="ar"] { grid-template-columns: minmax(0, 1fr); grid-template-areas: "copy" "main" "details"; grid-template-rows: auto auto auto; min-height: 0; height: auto; gap: 0; scroll-margin-top: 82px; }
        .copy-frame { padding: 24px 22px 20px; align-self: auto; }
        .copy { max-width: none; margin: 0; }
        .eyebrow { margin-bottom: 10px; }
        h2 { font-size: clamp(26px, 6.8vw, 30px); line-height: 1.3; }
        .heritage[lang="ar"] h2 { font-size: clamp(26px, 6.6vw, 29px); line-height: 1.5; }
        .description { margin-top: 14px; font-size: 14px; line-height: 1.75; }
        .heritage[lang="ar"] .description { font-size: 15px; line-height: 1.8; }
        .mismar-link { min-height: 44px; margin-top: 12px; padding-block: 8px; gap: 18px; }
        .heritage[lang="ar"] .mismar-link { font-size: 14px; }
        .main-frame { width: 100%; min-height: 0; height: auto; aspect-ratio: 4 / 5; align-self: stretch; }
        .main-media { transition-duration: 600ms; }
        .main-media :global(img) { object-fit: cover; object-position: center top; transition-duration: 600ms; }
        .main-frame[data-reveal="pending"] .main-media :global(img) { transform: scale(1.015); }
        .details-frame, .heritage[lang="ar"] .details-frame { width: 100%; min-height: 0; height: auto; margin: 0; padding: 0; align-self: auto; }
        .detail-image { width: 100%; height: clamp(140px, 36vw, 160px); min-height: 0; aspect-ratio: auto; }
        .detail-image :global(img) { object-fit: cover; object-position: center top; }
        .details-frame .detail-image ~ .detail-image { display: none; }
      }
      @media (prefers-reduced-motion: reduce) {
        .main-media, .main-media :global(img), .reveal-content, .mismar-link, .detail-image :global(img) { transition: none; }
        .main-frame[data-reveal="pending"] .main-media, .heritage[lang="ar"] .main-frame[data-reveal="pending"] .main-media { clip-path: none; }
        .main-frame[data-reveal="pending"] .main-media :global(img) { transform: none; }
        [data-reveal="pending"] .reveal-content { opacity: 1; transform: none; }
      }
    `}</style>
  </section>;
}
