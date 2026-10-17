"use client";

import { useEffect, useRef } from "react";
import type { Language } from "@/components/site/LanguageProvider";

const content = {
  ar: {
    title: "للتواصل والتعاون",
    text: "للتعاون المعماري والبحثي والاستفسارات المهنية، يسعدنا تواصلكم.",
  },
  en: {
    title: "GET IN TOUCH",
    text: "For architectural collaborations, research, and professional inquiries, get in touch.",
  },
};

export default function Contact({ language }: { language: Language }) {
  const sectionRef = useRef<HTMLElement>(null);
  const t = content[language];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof IntersectionObserver === "undefined") return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches) return;
    if (section.getBoundingClientRect().top >= window.innerHeight) section.dataset.reveal = "pending";
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        section.dataset.reveal = "shown";
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(section);
    const show = () => {
      if (preference.matches) {
        section.dataset.reveal = "shown";
        observer.disconnect();
      }
    };
    preference.addEventListener("change", show);
    return () => { observer.disconnect(); preference.removeEventListener("change", show); };
  }, []);

  return <section id="contact" className="contact" ref={sectionRef} data-reveal="shown" lang={language} dir={language === "ar" ? "rtl" : "ltr"} aria-labelledby="contact-title">
    <div className="contact-inner">
      <div className="copy">
        <h2 id="contact-title">{t.title}</h2>
        <p>{t.text}</p>
      </div>
      <a className="email" href="mailto:utopian.iraq@gmail.com" lang="en" dir="ltr">utopian.iraq@gmail.com</a>
    </div>
    <style jsx>{`
      .contact { width: 100%; background: #f4f1e9; color: #242321; border-top: 1px solid #b66d4b; scroll-margin-top: 96px; }
      .contact-inner { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr); align-items: center; gap: 48px; width: min(calc(100% - 100px), 1280px); margin-inline: auto; padding-block: 52px; }
      .copy { min-width: 0; }
      h2 { margin: 0 0 14px; color: #9c573b; font-size: 11px; font-weight: 500; line-height: 1.8; letter-spacing: .13em; }
      p { margin: 0; max-width: 450px; font-size: 14px; font-weight: 400; line-height: 1.9; color: #655c52; }
      .email { justify-self: end; max-width: 100%; min-width: 0; padding-block: 10px; color: #a76143; font-family: var(--font-serif, Georgia), serif; font-size: clamp(24px, 2.8vw, 40px); font-weight: 400; line-height: 1.4; letter-spacing: -.025em; text-decoration: none; overflow-wrap: anywhere; transition: color 250ms ease; }
      .email:hover { color: #242321; text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: 7px; }
      .email:focus-visible { outline: 2px solid #b66d4b; outline-offset: 6px; }
      .copy, .email { transition: opacity 650ms ease, transform 650ms cubic-bezier(.2,.7,.2,1), color 250ms ease; }
      .email { transition-delay: 100ms, 100ms, 0ms; }
      [data-reveal="pending"] .copy, [data-reveal="pending"] .email { opacity: 0; transform: translateY(16px); }
      .contact[lang="ar"] { font-family: var(--font-tajawal), sans-serif; }
      .contact[lang="ar"] h2 { font-size: 14px; letter-spacing: 0; }
      .contact[lang="ar"] p { font-size: 16px; }
      .contact[lang="ar"] .email { font-family: var(--font-serif, Georgia), serif; font-weight: 400; }
      @media (max-width: 1000px) { .contact-inner { width: calc(100% - 56px); gap: 28px; } }
      @media (max-width: 750px) {
        .contact { scroll-margin-top: 76px; }
        .contact-inner { grid-template-columns: minmax(0, 1fr); width: calc(100% - 48px); gap: 18px; padding-block: 36px; }
        h2 { margin-bottom: 10px; }
        .email { justify-self: start; font-size: clamp(22px, 5.9vw, 34px); letter-spacing: -.025em; }
      }
      @media (prefers-reduced-motion: reduce) {
        .copy, .email { transition: none; }
        [data-reveal="pending"] .copy, [data-reveal="pending"] .email { opacity: 1; transform: none; }
      }
    `}</style>
  </section>;
}
