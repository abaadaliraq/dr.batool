"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Language } from "@/components/site/LanguageProvider";

const content = {
  ar: {
    title: "البحث العلمي والمساهمات الأكاديمية",
    introduction: "تجمع المسيرة الأكاديمية للدكتورة بتول موفق بين البحث العلمي وفلسفة العمارة، مع اهتمام بالاستدامة وتطوير الفكر المعماري والعلاقة بين الإنسان والفضاء العمراني.",
    button: "استكشف الأبحاث والمساهمات",
    image: "العمارة والبحث العلمي",
  },
  en: {
    title: "Research & Academic Contributions",
    introduction: "Dr. Batool Mowafaq's academic work explores architectural philosophy, sustainability, and the relationship between people and architectural space.",
    button: "Explore Research & Contributions",
    image: "Architecture and academic research",
  },
};

export default function AcademicContributions({ language }: { language: Language }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [imageFailed, setImageFailed] = useState(false);
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
    }, { threshold: 0.12 });
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

  return <section id="research" className="research-teaser" ref={sectionRef} lang={language} dir={ar ? "rtl" : "ltr"} aria-labelledby="research-teaser-title">
    <div className="visual" data-reveal="shown">
      <div className="visual-media">
      <div className="architectural-fallback" aria-hidden="true">
        <svg viewBox="0 0 800 650" fill="none" preserveAspectRatio="xMidYMid slice">
          <path d="M-80 540 400 280 880 540M-80 410 400 150 880 410M-80 280 400 20 880 280M400 20v680M120 160v490M680 160v490M-80 540v-260M880 540V280M120 650V430l280-150 280 150v220M230 650V490l170-92 170 92v160" />
          <path d="M0 610h800M0 580h800M0 60h800M80 0v650M720 0v650" opacity=".35" />
        </svg>
      </div>
      {!imageFailed && <Image src="/images/research-cover.jpg" alt={t.image} fill sizes="(max-width: 750px) 100vw, 50vw" onError={() => setImageFailed(true)} />}
      </div>
    </div>
    <div className="editorial" data-reveal="shown">
      <div className="copy">
        <span className="rule" aria-hidden="true" />
        <h2 id="research-teaser-title">{t.title}</h2>
        <p>{t.introduction}</p>
        <div className="action"><Link href="/research" className="research-link">{t.button}<span aria-hidden="true">{ar ? "←" : "→"}</span></Link></div>
      </div>
    </div>
    <style jsx>{`
      .research-teaser { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); width: 100%; padding-top: 0; background: #f4f1e9; color: #242321; scroll-margin-top: 96px; }
      .visual { position: relative; min-width: 0; min-height: 460px; overflow: hidden; background: #d8d0c3; }
      .visual-media { position: absolute; inset: 0; overflow: hidden; clip-path: inset(0); transition: clip-path 1000ms cubic-bezier(.22,.7,.2,1); }
      .architectural-fallback { position: absolute; inset: 0; background: linear-gradient(135deg, #e5dfd3, #c6b9a5); }
      .architectural-fallback svg { width: 100%; height: 100%; stroke: #8c7861; stroke-width: 1; opacity: .6; }
      .visual :global(img) { object-fit: cover; transition: transform 1200ms cubic-bezier(.2,.7,.2,1); }
      .editorial { display: flex; align-items: center; min-width: 0; padding: clamp(40px, 5.5vw, 84px); transition: opacity 700ms ease, transform 700ms cubic-bezier(.2,.7,.2,1); }
      .copy { width: 100%; max-width: 490px; margin-inline: auto; }
      .rule { display: block; width: 44px; height: 1px; margin-bottom: 28px; background: #b66d4b; }
      h2 { margin: 0; font-family: var(--font-serif, Georgia), serif; font-size: clamp(30px, 2.8vw, 42px); font-weight: 400; line-height: 1.22; letter-spacing: -.02em; }
      p { margin: 24px 0 30px; color: #655c52; font-size: 14px; line-height: 1.95; }
      .action :global(.research-link) { display: inline-flex; align-items: center; gap: 22px; max-width: 100%; min-height: 48px; padding-block: 10px; border-bottom: 1px solid #b66d4b; color: #9c573b; text-decoration: none; font-size: 12px; line-height: 1.8; }
      .action :global(.research-link:hover) { color: #242321; border-color: #242321; }
      .action :global(.research-link:focus-visible) { outline: 2px solid #b66d4b; outline-offset: 5px; }
      .action span { flex-shrink: 0; font-size: 20px; }
      h2, p, .action { transition: opacity 650ms ease, transform 650ms cubic-bezier(.2,.7,.2,1); }
      h2 { transition-delay: 120ms; } p { transition-delay: 230ms; } .action { transition-delay: 340ms; }
      .visual[data-reveal="pending"] .visual-media { clip-path: inset(0 100% 0 0); }
      [dir="rtl"] .visual[data-reveal="pending"] .visual-media { clip-path: inset(0 0 0 100%); }
      .editorial[data-reveal="pending"], .editorial[data-reveal="pending"] h2, .editorial[data-reveal="pending"] p, .editorial[data-reveal="pending"] .action { opacity: 0; transform: translateY(18px); }
      .research-teaser[lang="ar"] { font-family: var(--font-tajawal), sans-serif; }
      .research-teaser[lang="ar"] h2 { font-family: inherit; font-size: clamp(28px, 2.5vw, 36px); font-weight: 500; line-height: 1.55; letter-spacing: 0; }
      .research-teaser[lang="ar"] p { font-size: 16px; line-height: 1.95; }
      .research-teaser[lang="ar"] .action :global(.research-link) { font-size: 14px; }
      @media (hover: hover) and (prefers-reduced-motion: no-preference) { .visual:hover :global(img) { transform: scale(1.025); } }
      @media (max-width: 1000px) { .editorial { padding: 40px 32px; } }
      @media (max-width: 750px) {
        .research-teaser { grid-template-columns: minmax(0, 1fr); padding-top: 0; }
        .visual { min-height: 0; aspect-ratio: 4 / 3; }
        .editorial { order: -1; padding: 24px 24px 32px; }
        h2 { font-size: 32px; }
        .research-teaser[lang="ar"] h2 { font-size: 29px; }
        .rule { margin-bottom: 22px; }
        p { margin-block: 20px 24px; }
      }
      @media (prefers-reduced-motion: reduce) {
        .visual-media, .editorial, h2, p, .action, .visual :global(img) { transition: none; }
        .visual[data-reveal="pending"] .visual-media, [dir="rtl"] .visual[data-reveal="pending"] .visual-media { clip-path: none; }
        .editorial[data-reveal="pending"], .editorial[data-reveal="pending"] h2, .editorial[data-reveal="pending"] p, .editorial[data-reveal="pending"] .action { opacity: 1; transform: none; }
      }
    `}</style>
  </section>;
}
