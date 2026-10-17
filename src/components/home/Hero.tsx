"use client";

type Language = "en" | "ar";

interface HeroProps {
  language: Language;
}

const content = {
  en: {
    eyebrow: "ARCHITECTURE / RESEARCH / HERITAGE",
    name: "Dr. Batool Mowafaq",
    specialization:
      "Architecture · Research · Heritage Revitalization",
    introduction: "Her work bridges architectural design and academic research, with a focus on local identity and architectural heritage.",
    button: "Explore Projects",
  },

  ar: {
    eyebrow: "العمارة / البحث الأكاديمي / التراث",
    name: "د. بتول موفق",
    specialization:
      "العمارة · البحث الأكاديمي · إحياء التراث العمراني",
    introduction: "تجمع أعمالها بين التصميم المعماري والبحث الأكاديمي، مع اهتمام بالهوية المحلية وإحياء التراث العمراني.",
    button: "استكشف المشاريع",
  },
};

export default function Hero({ language }: HeroProps) {
  const data = content[language];

  return (
    <section
      id="home"
      className={`batool-hero batool-hero--${language}`}
      lang={language}
      dir={language === "ar" ? "rtl" : "ltr"}
      aria-labelledby="hero-title"
    >
      {/* BACKGROUND */}

      <div className="batool-hero__image" aria-hidden="true" />
      <div className="batool-hero__overlay" aria-hidden="true" />

      {/* CONTENT */}

      <div className="batool-hero__container">
        <div className="batool-hero__content">

          <div className="batool-hero__eyebrow">
            <span className="batool-hero__line" />
            <span>{data.eyebrow}</span>
          </div>

          <h1 id="hero-title" className="batool-hero__title">
            {data.name}
          </h1>

          <div className="batool-hero__divider" />

          <p className="batool-hero__specialization">
            {data.specialization}
          </p>

          <p className="batool-hero__introduction">{data.introduction}</p>

          <a href="#projects" className="batool-hero__button">
            <span>{data.button}</span>
            <span aria-hidden="true">
              {language === "ar" ? "←" : "→"}
            </span>
          </a>

        </div>
      </div>

      {/* STYLES */}

      <style jsx>{`

        .batool-hero {
          position: relative;
          width: 100%;
          min-height: calc(100svh - 78px);
          scroll-margin-top: 78px;
          height: auto;
          overflow: hidden;
          background: #f4f1e9;
          isolation: isolate;
        }

        /* BACKGROUND */

        .batool-hero__image {
          position: absolute;
          inset: 0;
          z-index: -2;

          background-image: url("/images/hero-baghdad.jpg");
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;

          animation: imageReveal 1.8s ease-out both;
        }

        .batool-hero__overlay {
          position: absolute;
          inset: 0;
          z-index: -1;
          pointer-events: none;

          background: linear-gradient(
            90deg,
            #f4f1e9 0%,
            rgba(244,241,233,0.97) 17%,
            rgba(244,241,233,0.80) 33%,
            rgba(244,241,233,0.25) 55%,
            transparent 76%
          );
        }

        /* CONTAINER */

        .batool-hero__container {
          position: relative;
          width: min(100% - 100px, 1520px);
          height: auto;
          min-height: inherit;
          padding-block: 48px 90px;
          margin-inline: auto;

          display: flex;
          align-items: center;
        }

        .batool-hero__content {
          position: relative;
          z-index: 2;
          width: max-content;
          max-width: 65%;
        }

        /* EYEBROW */

        .batool-hero__eyebrow {
          display: flex;
          align-items: center;
          gap: 13px;

          margin-bottom: 27px;

          color: #a76143;
          font-family: var(--font-inter, Arial), sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 1.5px;

          animation: fadeUp 0.8s ease 0.1s both;
        }

        .batool-hero__line {
          width: 34px;
          height: 1px;
          flex-shrink: 0;
          background: #a76143;
        }

        /* TITLE */

        .batool-hero__title {
          margin: 0;

          color: #242321;

          font-family: var(--font-serif, Georgia), Georgia, serif;
          font-size: clamp(36px, 4.5vw, 76px);
          font-weight: 500;

          line-height: 1.15;
          letter-spacing: -0.035em;
          white-space: nowrap;

          animation: fadeUp 1s ease 0.2s both;
        }

        /* DIVIDER */

        .batool-hero__divider {
          width: 68px;
          height: 1px;

          margin: 30px 0 24px;

          background: #a76143;
          opacity: 0.8;

          animation: fadeUp 0.8s ease 0.35s both;
        }

        /* SPECIALIZATION */

        .batool-hero__specialization {
          margin: 0;

          color: #514a43;

          font-family: var(--font-inter, Arial), sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 1.9;

          animation: fadeUp 0.9s ease 0.45s both;
        }

        .batool-hero__introduction {
          max-width: 450px;
          margin: 17px 0 0;
          color: #655c52;
          font-family: var(--font-inter, Arial), sans-serif;
          font-size: 13px;
          font-weight: 400;
          line-height: 1.9;
          animation: fadeUp 0.8s ease 0.5s both;
        }

        .batool-hero--ar .batool-hero__introduction {
          font-family: var(--font-tajawal), sans-serif;
          font-weight: 400;
        }

        /* BUTTON */

        .batool-hero__button {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          gap: 35px;

          margin-top: 35px;
          padding: 12px 19px;

          border: 1px solid #b66d4b;
          background: rgba(244,241,233,0.35);

          color: #a76143;
          text-decoration: none;

          font-family: var(--font-inter, Arial), sans-serif;
          font-size: 11px;
          font-weight: 600;

          transition:
            background 0.3s ease,
            color 0.3s ease;

          animation: fadeUp 1s ease 0.6s both;
        }

        .batool-hero__button:hover {
          background: #a76143;
          color: #ffffff;
        }

        .batool-hero__button span:last-child {
          font-size: 18px;
          line-height: 1;
        }

        /* ARABIC VERSION */

        .batool-hero--ar .batool-hero__overlay {
          background: linear-gradient(
            270deg,
            #f4f1e9 0%,
            rgba(244,241,233,0.97) 17%,
            rgba(244,241,233,0.80) 33%,
            rgba(244,241,233,0.25) 55%,
            transparent 76%
          );
        }

        .batool-hero--ar .batool-hero__title {
          font-family: var(--font-aref-ruqaa), serif;
          font-size: clamp(34px, 4.4vw, 62px);
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1.5;
        }

        .batool-hero--ar .batool-hero__eyebrow {
          font-family: var(--font-tajawal, Arial), sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0;
        }

        .batool-hero--ar .batool-hero__specialization {
          font-family: var(--font-tajawal, Arial), sans-serif;
          font-size: 14px;
        }

        .batool-hero--ar .batool-hero__button {
          font-family: var(--font-tajawal, Arial), sans-serif;
          font-size: 12px;
        }

.batool-hero--ar .batool-hero__button {
          font-weight: 500;
        }

        /* ANIMATIONS */

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes imageReveal {
          from {
            opacity: 0;
            transform: scale(1.035);
          }

          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* TABLET */

        @media (max-width: 1024px) {

          .batool-hero__container {
            width: calc(100% - 64px);
          }

          .batool-hero__title {
            font-size: clamp(35px, 4.3vw, 60px);
          }

          .batool-hero--ar .batool-hero__title {
            font-size: clamp(34px, 4.4vw, 56px);
          }

          .batool-hero__specialization {
            font-size: 12px;
          }
        }

        /* MOBILE */

        @media (max-width: 768px) {

          .batool-hero {
            min-height: calc(100svh - 66px);
            scroll-margin-top: 66px;
            height: auto;
          }

          .batool-hero__image {
            background-position: 57% center;
          }

          .batool-hero__overlay,
          .batool-hero--ar .batool-hero__overlay {
            background: linear-gradient(
              180deg,
              #f4f1e9 0%,
              rgba(244,241,233,0.96) 20%,
              rgba(244,241,233,0.70) 39%,
              rgba(244,241,233,0.05) 75%
            );
          }

          .batool-hero__container {
            width: calc(100% - 40px);
            align-items: flex-start;
            padding-top: calc(clamp(35px, 7svh, 65px) + 78px);
            padding-bottom: 60px;
          }

          .batool-hero__content {
            width: 100%;
            max-width: 100%;
          }

          .batool-hero__eyebrow {
            margin-bottom: 20px;
            font-size: 9px;
            letter-spacing: 0.8px;
          }

          .batool-hero__title {
            font-size: clamp(27px, 6.8vw, 48px);
            line-height: 1.2;
          }

          .batool-hero--ar .batool-hero__title {
            font-size: clamp(30px, 8.5vw, 46px);
            line-height: 1.5;
          }

          .batool-hero__divider {
            margin: 20px 0 17px;
          }

          .batool-hero__specialization,
          .batool-hero--ar .batool-hero__specialization {
            font-size: 11px;
            line-height: 1.8;
          }

          .batool-hero__button {
            margin-top: 23px;
            padding: 10px 15px;
          }

}

        /* SMALL MOBILE */

        @media (max-width: 390px) {

          .batool-hero__title {
            font-size: 27px;
          }

          .batool-hero--ar .batool-hero__title {
            font-size: clamp(28px, 8.5vw, 35px);
          }

          .batool-hero__eyebrow {
            font-size: 8px;
          }
        }

        /* SHORT SCREENS */

        @media (max-height: 650px) {

          .batool-hero__eyebrow {
            margin-bottom: 12px;
          }

          .batool-hero__divider {
            margin: 13px 0;
          }

          .batool-hero__button {
            margin-top: 16px;
          }

}

        @media (max-width: 768px) {
          .batool-hero__content::before {
            content: "";
            position: absolute;
            inset: -18px -20px -20px;
            z-index: -1;
            pointer-events: none;
            background: linear-gradient(180deg, rgba(244,241,233,0) 0%, rgba(244,241,233,.70) 24%, rgba(244,241,233,.76) 82%, rgba(244,241,233,0) 100%);
          }
          .batool-hero__eyebrow,
          .batool-hero--ar .batool-hero__eyebrow {
            color: #242321;
            font-weight: 500;
          }
          .batool-hero__specialization,
          .batool-hero--ar .batool-hero__specialization {
            color: #242321;
            font-size: 12.5px;
            font-weight: 500;
            line-height: 1.8;
          }
          .batool-hero__introduction,
          .batool-hero--ar .batool-hero__introduction {
            max-width: 450px;
            margin-top: 15px;
            color: #242321;
            font-size: 14px;
            font-weight: 500;
            line-height: 1.8;
          }
          .batool-hero__button { min-height: 44px; max-width: 100%; color: #242321; font-weight: 500; }
          .batool-hero__button:hover { color: #fff; }
        }

        @media (prefers-reduced-motion: reduce) {

          .batool-hero,
          .batool-hero * {
            animation: none !important;
            transition: none !important;
          }
        }

      `}</style>

    </section>
  );
}

