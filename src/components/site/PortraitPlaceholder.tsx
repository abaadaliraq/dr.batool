"use client";
import Image, { type StaticImageData } from "next/image";
import portraitImage from "../../../public/images/dr-batool.jpg.png";
import type { Language } from "./LanguageProvider";

export default function PortraitPlaceholder({ language, image = portraitImage }: { language: Language; image?: StaticImageData }) {
  const ar = language === "ar";
  return <figure className="portrait">
    <svg className="sketch" viewBox="0 0 500 620" fill="none" aria-hidden="true">
      <path d="M20 550V100L260 25L480 110V560M0 470H500M65 600V170L260 85L430 170V600M0 290H500M260 0V620M20 100L480 560M480 110L20 550M65 170H430M65 550H430" />
      <circle cx="260" cy="310" r="190" /><path d="M0 585H500M450 0V620" />
    </svg>
    <div className="portrait-space">
      <Image
        src={image}
        alt={ar ? "الدكتورة بتول موفق" : "Dr. Batool Mowafaq"}
        sizes="(max-width: 650px) 90vw, (max-width: 900px) 40vw, 480px"
        className="portrait-photo"
      />
    </div>
    <figcaption>{ar ? "د. بتول موفق" : "Dr. Batool Mowafaq"}<span>{ar ? "العمارة · البحث الأكاديمي · التراث" : "Architecture · Research · Heritage"}</span></figcaption>
    <style jsx>{`
      .portrait { position: relative; margin: 0; padding: 28px 22px 0; }
      .sketch { position: absolute; inset: 0; width: 100%; height: 90%; stroke: #a76143; stroke-width: .65; opacity: .18; pointer-events: none; animation: sketchDrift 14s ease-in-out infinite alternate; }
      .portrait-space { position: relative; overflow: hidden; background: #e9e4d9; }
      .portrait-space :global(.portrait-photo) { display: block; width: 100%; height: auto; }
      figcaption { display: flex; justify-content: space-between; gap: 12px; padding: 20px 0; font-size: 13px; color: #242321; border-bottom: 1px solid #d8d0c4; }
      figcaption span { font-size: 10px; line-height: 1.8; color: #776b5e; }
      @keyframes sketchDrift { to { transform: translateY(-7px); } }
      @media (max-width: 650px) { .portrait { padding-inline: 12px; } figcaption { flex-direction: column; } }
      @media (prefers-reduced-motion: reduce) { .sketch { animation: none; } }
    `}</style>
  </figure>;
}


