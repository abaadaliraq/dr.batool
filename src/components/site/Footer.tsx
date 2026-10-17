"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import footerPhoto from "../../../public/images/footer-abbasid.jpg";
import Link from "next/link";
import { useLanguage } from "@/components/site/LanguageProvider";

const content = {
  ar: {
    name: "د. بتول موفق",
    disciplines: "العمارة | البحث العلمي | التراث العمراني",
    navigation: "روابط سريعة",
    contact: "للتواصل",
    rights: "جميع الحقوق محفوظة.",
    privacy: "سياسة الخصوصية", terms: "شروط الاستخدام", legal: "سياسات الموقع",
    image: "الأقواس المعمارية العباسية",
    email: "البريد الإلكتروني",
    website: "موقع يوتوبيان",
    links: ["الرئيسية", "السيرة الذاتية", "المشاريع", "الأبحاث", "يوتوبيان العراق", "التراث"],
  },
  en: {
    name: "Dr. Batool Mowafaq",
    disciplines: "Architecture | Research | Heritage",
    navigation: "Quick links",
    contact: "GET IN TOUCH",
    rights: "All rights reserved.",
    privacy: "Privacy Policy", terms: "Terms of Use", legal: "Site policies",
    image: "Abbasid architectural arches",
    email: "Email",
    website: "Utopian Website",
    links: ["Home", "Biography", "Projects", "Research", "Utopian Iraq", "Heritage"],
  },
};

const destinations = ["/#home", "/about", "/#projects", "/research", "/#utopian", "/#heritage"];

export default function Footer() {
  const { language } = useLanguage();
  const t = content[language];
  const direction = language === "ar" ? "rtl" : "ltr";
  const footerRef = useRef<HTMLElement>(null);
  const [failedImage, setFailedImage] = useState<string | null>(null);
  const [year, setYear] = useState("");

  useEffect(() => {
    setYear(new Intl.DateTimeFormat("en", { year: "numeric", timeZone: "Asia/Baghdad" }).format(new Date()));
    const footer = footerRef.current;
    if (!footer || typeof IntersectionObserver === "undefined") return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches) return;
    const targets = footer.querySelectorAll<HTMLElement>("[data-reveal]");
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
    const show = () => {
      if (preference.matches) {
        targets.forEach(target => { target.dataset.reveal = "shown"; });
        observer.disconnect();
      }
    };
    preference.addEventListener("change", show);
    return () => { observer.disconnect(); preference.removeEventListener("change", show); };
  }, []);

  return <footer className="site-footer" ref={footerRef} lang={language} dir={direction}>
    <div className="footer-top">
      <div className="identity" dir={direction} data-reveal="shown">
        <div className="reveal-copy">
          <p className="name">{t.name}</p>
          <p className="disciplines">{t.disciplines}</p>
          <span className="gold-rule" aria-hidden="true" />
        </div>
      </div>
      <nav className="quick-links" dir={direction} aria-label={t.navigation} data-reveal="shown">
        <div className="reveal-copy">
          <p className="label">{t.navigation}</p>
          <ul>{t.links.map((label, index) => <li key={destinations[index]}><Link href={destinations[index]}>{label}</Link></li>)}</ul>
        </div>
      </nav>
      <div className="contact" dir={direction} data-reveal="shown">
        <div className="reveal-copy">
          <p className="label">{t.contact}</p>
          <a className="email" href="mailto:utopian.iraq@gmail.com" dir="ltr" lang="en">utopian.iraq@gmail.com</a>
          <div className="social-links">
            <a href="https://www.instagram.com/dr.batool.mowafaq/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" /></svg>
            </a>
            <span className="social-placeholder" role="img" aria-label="Facebook" title="Facebook">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M14 21v-8h3l.5-4H14V7c0-1 .4-2 2-2h2V2.5c-.7-.1-1.5-.2-2.5-.2-3 0-4.5 1.8-4.5 4.7v2H8v4h3v8" /></svg>
            </span>
            <a href="mailto:utopian.iraq@gmail.com" aria-label={t.email}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="1" /><path d="m3 6 9 7 9-7" /></svg>
            </a>
            <a href="https://www.utopian-iq.com/" target="_blank" rel="noopener noreferrer" aria-label={t.website}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><circle cx="12" cy="12" r="9" /><ellipse cx="12" cy="12" rx="4" ry="9" /><path d="M3 12h18M5 6.5h14M5 17.5h14" /></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div className="footer-image" data-reveal="shown">
      <div className="image-reveal">
        {failedImage !== footerPhoto.src && <Image src={footerPhoto} alt={t.image} fill sizes="100vw" onError={() => setFailedImage(footerPhoto.src)} />}
        <div className="image-shade" aria-hidden="true" />
      </div>
    </div>
    <div className="footer-bottom">
      <p className="copyright" dir={direction}>© <span dir="ltr">{year}</span> | {t.name}<span className="rights">{t.rights}</span></p>
      <nav className="legal-links" dir={direction} aria-label={t.legal}><Link href="/privacy">{t.privacy}</Link><span aria-hidden="true">|</span><Link href="/terms">{t.terms}</Link></nav>
      <p className="credit" dir="ltr" lang="en">Developed by <a href="https://abaad-aliraq.com/" target="_blank" rel="noopener noreferrer">Abaad Al-Iraq</a></p>
    </div>
    <style jsx>{`
      .site-footer { width: 100%; background: #242321; color: #f4f1e9; }
      .footer-top { direction: ltr; display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.6fr) minmax(0, 1fr); grid-template-areas: "contact identity links"; align-items: center; gap: 40px; width: min(calc(100% - 100px), 1280px); margin-inline: auto; padding-block: 58px; }
      .identity { grid-area: identity; min-width: 0; text-align: center; }
      .name { margin: 0; color: #f4f1e9; font-family: var(--font-serif, Georgia), Georgia, serif; font-size: clamp(30px, 3.2vw, 46px); font-weight: 500; line-height: 1.3; letter-spacing: -.025em; }
      .disciplines { margin: 20px 0 0; color: #d0c8bc; font-size: 11px; line-height: 1.9; }
      .gold-rule { display: block; width: 66px; height: 1px; margin: 24px auto 0; background: #b68a55; }
      .quick-links { grid-area: links; min-width: 0; }
      .contact { grid-area: contact; min-width: 0; }
      .label { margin: 0 0 18px; color: #b68a55; font-size: 10px; line-height: 1.8; letter-spacing: .1em; }
      ul { list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 4px 20px; }
      li { min-width: 0; }
      .quick-links :global(a) { display: inline-flex; align-items: center; min-height: 36px; color: #d0c8bc; font-size: 12px; line-height: 1.8; text-decoration: none; transition: color 250ms ease; }
      .email { display: inline-block; max-width: 100%; color: #f4f1e9; font-size: 14px; line-height: 1.9; overflow-wrap: anywhere; text-decoration: none; }
      .social-links { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 18px; }
      .social-links a, .social-placeholder { display: inline-flex; align-items: center; justify-content: center; width: 44px; height: 44px; color: #d0c8bc; }
      .social-placeholder { opacity: .55; }
      svg { width: 21px; height: 21px; }
      a { transition: color 250ms ease; }
      a:hover, .quick-links :global(a:hover) { color: #b68a55; }
      a:focus-visible, .quick-links :global(a:focus-visible) { outline: 2px solid #b68a55; outline-offset: 5px; }
      .footer-image { position: relative; width: 100%; height: clamp(350px, 28vw, 420px); overflow: hidden; background: #302b24; }
      .image-reveal { position: absolute; inset: 0; clip-path: inset(0); transition: clip-path 1000ms cubic-bezier(.22,.7,.2,1); }
      .image-reveal :global(img) { object-fit: cover; object-position: center 65%; }
      .image-shade { position: absolute; inset: 0; background: rgba(0,0,0,.22); pointer-events: none; }
      .footer-bottom { direction: ltr; display: flex; flex-direction: row-reverse; align-items: center; justify-content: space-between; gap: 16px 24px; flex-wrap: wrap; width: min(calc(100% - 100px), 1280px); margin-inline: auto; padding-block: 20px; }
      .footer-bottom p { margin: 0; color: #c5bcae; font-size: 10px; line-height: 1.9; }
      .legal-links { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 12px; }
      .legal-links :global(a) { display: inline-flex; align-items: center; min-height: 40px; color: #c5bcae; font-size: 11px; text-decoration: none; transition: color 250ms ease; }
      .legal-links :global(a:hover) { color: #b68a55; }
      .legal-links :global(a:focus-visible) { outline: 2px solid #b68a55; outline-offset: 5px; }
      .legal-links span { color: #b68a55; font-size: 11px; }
      .site-footer[lang="ar"] .legal-links :global(a) { font-size: 13px; }
      .rights { margin-inline-start: 12px; }
      .credit a { color: #b68a55; text-decoration: none; }
      .credit a:hover { color: #f4f1e9; }
      .reveal-copy { transition: opacity 700ms ease, transform 700ms cubic-bezier(.2,.7,.2,1); }
      .quick-links .reveal-copy { transition-delay: 80ms; }
      .contact .reveal-copy { transition-delay: 140ms; }
      [data-reveal="pending"] .reveal-copy { opacity: 0; transform: translateY(16px); }
      .footer-image[data-reveal="pending"] .image-reveal { clip-path: inset(100% 0 0); }
      .site-footer[lang="ar"] { font-family: var(--font-tajawal), sans-serif; }
      .site-footer[lang="ar"] .name { font-family: var(--font-aref-ruqaa), serif; font-size: clamp(36px, 3.8vw, 54px); font-weight: 700; line-height: 1.6; letter-spacing: 0; }
      .site-footer[lang="ar"] .label { font-size: 13px; letter-spacing: 0; }
      .site-footer[lang="ar"] .disciplines { font-size: 14px; }
      .site-footer[lang="ar"] .quick-links :global(a) { font-size: 14px; }
      .site-footer[lang="ar"] .footer-bottom p { font-size: 12px; }
      @media (max-width: 1100px) { .footer-top { width: calc(100% - 56px); gap: 24px; grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr) minmax(0, 1fr); } .email { font-size: 12px; } .footer-bottom { width: calc(100% - 56px); } }
      @media (max-width: 750px) {
        .footer-top { width: calc(100% - 40px); grid-template-columns: minmax(0, 1fr); grid-template-areas: "identity" "links" "contact"; gap: 18px; padding-block: 24px; text-align: center; }
        .name, .site-footer[lang="ar"] .name { font-size: 30px; }
        .disciplines, .site-footer[lang="ar"] .disciplines { margin-top: 8px; font-size: 12px; line-height: 1.7; }
        .gold-rule { margin-top: 12px; }
        .label, .site-footer[lang="ar"] .label { margin-bottom: 6px; font-size: 11px; line-height: 1.6; }
        ul { max-width: 340px; margin-inline: auto; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0 16px; }
        .quick-links :global(a), .site-footer[lang="ar"] .quick-links :global(a) { min-height: 32px; padding: 0; font-size: 12.5px; line-height: 1.6; }
        .contact .label { margin-bottom: 4px; }
        .social-links { justify-content: center; flex-wrap: nowrap; gap: 4px; margin-top: 6px; }
        .social-links a, .social-placeholder { width: 32px; height: 32px; }
        .social-links svg { width: 18px; height: 18px; }
        .email { font-size: 12px; line-height: 1.8; }
        .footer-image { height: 140px; }
        .image-reveal :global(img) { object-fit: cover; object-position: center 65%; }
        .footer-bottom { width: calc(100% - 40px); flex-direction: column; flex-wrap: nowrap; gap: 2px; text-align: center; padding-block: 10px; }
        .footer-bottom p, .site-footer[lang="ar"] .footer-bottom p { max-width: 100%; font-size: 11px; line-height: 1.7; }
        .rights { display: inline; margin-inline-start: 5px; }
        .copyright { white-space: nowrap; }
        .legal-links { flex-wrap: nowrap; gap: 8px; }
        .legal-links :global(a), .site-footer[lang="ar"] .legal-links :global(a) { min-height: 28px; font-size: 11.5px; white-space: nowrap; }
        .credit { white-space: nowrap; }
      }
      @media (prefers-reduced-motion: reduce) {
        .reveal-copy, .image-reveal, a, .quick-links :global(a), .legal-links :global(a) { transition: none; }
        [data-reveal="pending"] .reveal-copy { opacity: 1; transform: none; }
        .footer-image[data-reveal="pending"] .image-reveal { clip-path: none; }
      }
    `}</style>
  </footer>;
}
