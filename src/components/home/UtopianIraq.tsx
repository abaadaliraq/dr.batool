"use client";

import { useEffect, useRef } from "react";
import type { Language } from "@/components/site/LanguageProvider";

const content = {
  ar: {
    subtitle: "مكتب يوتوبيان الاستشاري للهندسة المعمارية والتصميم الداخلي",
    paragraphs: [
      "أسست الدكتورة بتول موفق مكتب يوتوبيان الاستشاري، الذي يعمل في مجالات التصميم المعماري والداخلي والتخطيط الحضري والاستشارات الهندسية.",
      "ويعكس المكتب رؤيتها في تطوير حلول معمارية معاصرة تجمع بين الابتكار والكفاءة الوظيفية والهوية المعمارية."
    ],
    visit: "زيارة موقع يوتوبيان"
  },
  en: {
    subtitle: "Consulting Office for Architecture & Interior Design",
    paragraphs: [
      "Founded by Dr. Batool Mowafaq, UTOPIAN is a consulting office specializing in architecture, interior design, urban planning, and engineering consultancy.",
      "The practice reflects her vision of contemporary architecture that combines innovation, functionality, and architectural identity."
    ],
    visit: "Visit UTOPIAN Website"
  }
};

export default function UtopianIraq({ language }: { language: Language }) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useRef(false);
  const motionPreference = useRef<MediaQueryList | null>(null);
  const failed = useRef(false);
  const text = content[language];

  function syncPlayback() {
    const video = videoRef.current;
    if (!video) return;
    const canPlay = () => inView.current && !document.hidden && !motionPreference.current?.matches && !failed.current;
    if (!canPlay()) { video.pause(); return; }
    if (!video.getAttribute("src")) {
      // No media request is made at page load, even though autoplay is enabled.
      video.src = "/videos/utopian.mp4";
      video.load();
    }
    video.muted = true;
    void video.play().then(() => { if (!canPlay()) video.pause(); }).catch(() => {
      // Autoplay can be restricted by the browser; the fallback stays readable.
    });
  }

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    motionPreference.current = preference;
    if (!preference.matches && section.getBoundingClientRect().top >= window.innerHeight) section.dataset.revealed = "false";
    const updateMotion = () => {
      if (preference.matches) section.dataset.revealed = "true";
      syncPlayback();
    };
    const updateVisibility = () => syncPlayback();
    preference.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", updateVisibility);

    let observer: IntersectionObserver | undefined;
    let removeFallback: (() => void) | undefined;
    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(([entry]) => {
        inView.current = entry.isIntersecting && entry.intersectionRatio > 0.05;
        if (inView.current) section.dataset.revealed = "true";
        syncPlayback();
      }, { threshold: [0, 0.05, 0.1] });
      observer.observe(section);
    } else {
      const checkPosition = () => {
        const bounds = section.getBoundingClientRect();
        inView.current = bounds.bottom > 0 && bounds.top < window.innerHeight;
        if (inView.current) section.dataset.revealed = "true";
        syncPlayback();
      };
      window.addEventListener("scroll", checkPosition, { passive: true });
      window.addEventListener("resize", checkPosition);
      checkPosition();
      removeFallback = () => {
        window.removeEventListener("scroll", checkPosition);
        window.removeEventListener("resize", checkPosition);
      };
    }

    return () => {
      observer?.disconnect();
      removeFallback?.();
      preference.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", updateVisibility);
      inView.current = false;
      video.pause();
    };
  }, []);

  return <section id="utopian" ref={sectionRef} className="utopian" lang={language} dir={language === "ar" ? "rtl" : "ltr"} aria-labelledby="utopian-title">
    <div className="utopian__fallback" aria-hidden="true" />
    <video ref={videoRef} className="utopian__video" autoPlay muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1} disablePictureInPicture
      onPlaying={event => { event.currentTarget.dataset.ready = "true"; }}
      onError={event => { failed.current = true; event.currentTarget.dataset.ready = "false"; }} />
    <div className="utopian__shade" aria-hidden="true" />
    <div className="utopian__content">
      <h2 id="utopian-title" className="utopian__title" lang="en" dir="ltr">UTOPIAN</h2>
      <p className="utopian__subtitle">{text.subtitle}</p>
      <div className="utopian__paragraphs">{text.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
      <a className="utopian__link" href="https://www.utopian-iq.com/index.php" target="_blank" rel="noopener noreferrer">{text.visit}<span aria-hidden="true">{language === "ar" ? "←" : "→"}</span></a>
    </div>
    <style jsx>{`
      .utopian { position: relative; isolation: isolate; display: grid; place-items: center; width: 100%; min-height: max(430px, calc(100vw / 2.6)); overflow: hidden; color: #fff; background: #242321; scroll-margin-top: 78px; }
      .utopian__fallback, .utopian__video, .utopian__shade { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
      .utopian__fallback { z-index: -3; background: radial-gradient(ellipse at 70% 30%, #51483f 0%, #302c28 45%, #242321 100%); }
      .utopian__video { z-index: -2; object-fit: cover; opacity: 0; transition: opacity 700ms ease; }
      .utopian__video[data-ready="true"] { opacity: 1; }
      .utopian__shade { z-index: -1; background: linear-gradient(180deg, rgba(0,0,0,.32) 0%, rgba(0,0,0,.65) 46%, rgba(0,0,0,.8) 100%); }
      .utopian__content { width: min(100% - 100px, 1100px); padding-block: 48px 65px; text-align: center; }
      .utopian__title { margin: 0 0 14px; font-family: var(--font-serif, Georgia), serif; font-size: clamp(58px, 6.5vw, 100px); font-weight: 400; line-height: 1; letter-spacing: .075em; }
      .utopian__subtitle { max-width: 850px; margin: 0 auto 22px; font-size: 18px; font-weight: 500; line-height: 1.7; }
      .utopian__paragraphs { max-width: 980px; margin-inline: auto; }
      .utopian__paragraphs p { margin: 0 0 10px; font-size: 14px; font-weight: 400; line-height: 1.85; color: rgba(255,255,255,.94); }
      .utopian__link { display: inline-flex; align-items: center; justify-content: center; gap: 28px; min-height: 46px; margin-top: 19px; padding: 12px 24px; border: 1px solid rgba(255,255,255,.85); background: transparent; color: #fff; font-size: 12px; font-weight: 500; line-height: 1.7; text-decoration: none; transition: color 250ms ease, background 250ms ease; }
      .utopian__link:hover { background: #fff; color: #242321; }
      .utopian__link > span { font-size: 19px; }


      .utopian__link:focus-visible { outline: 2px solid #fff; outline-offset: 5px; }
      .utopian__title, .utopian__subtitle, .utopian__paragraphs, .utopian__link { transition: opacity 650ms ease, transform 650ms ease, background 250ms ease, color 250ms ease; }
      .utopian__subtitle { transition-delay: 70ms; }
      .utopian__paragraphs { transition-delay: 130ms; }
      .utopian__link { transition-delay: 180ms, 180ms, 0ms, 0ms; }
      .utopian[data-revealed="false"] .utopian__title, .utopian[data-revealed="false"] .utopian__subtitle, .utopian[data-revealed="false"] .utopian__paragraphs, .utopian[data-revealed="false"] .utopian__link { opacity: 0; transform: translateY(15px); }
      .utopian[lang="ar"] { font-family: var(--font-tajawal), sans-serif; }
      @media (max-width: 900px) { .utopian__content { width: calc(100% - 64px); } .utopian__subtitle { font-size: 17px; } .utopian__paragraphs p { font-size: 13px; } }
      @media (max-width: 600px) {
        .utopian { min-height: 580px; scroll-margin-top: 66px; }
        .utopian__content { width: calc(100% - 40px); padding-block: 64px 95px; }
        .utopian__shade { background: linear-gradient(180deg, rgba(0,0,0,.57) 0%, rgba(0,0,0,.74) 40%, rgba(0,0,0,.87) 100%); }
        .utopian__title { font-size: clamp(42px, 11.5vw, 66px); letter-spacing: .04em; margin-bottom: 20px; }
        .utopian__subtitle { font-size: 17px; line-height: 1.85; margin-bottom: 22px; }
        .utopian__paragraphs p { font-size: 14px; line-height: 1.9; margin-bottom: 15px; }
        .utopian__link { margin-top: 15px; gap: 20px; padding-inline: 18px; max-width: 100%; }

      }
      @media (prefers-reduced-motion: reduce) {
        .utopian__video { display: none; }
        .utopian__title, .utopian__subtitle, .utopian__paragraphs, .utopian__link { transition: none; }
        .utopian[data-revealed="false"] .utopian__title, .utopian[data-revealed="false"] .utopian__subtitle, .utopian[data-revealed="false"] .utopian__paragraphs, .utopian[data-revealed="false"] .utopian__link { opacity: 1; transform: none; }
      }
    `}</style>
  </section>;
}

