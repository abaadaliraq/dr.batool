"use client";

import { useState } from "react";
import Image from "next/image";
import mosqueImage from "../../../public/images/mosqu-project.jpg.png";
import laboratoriesImage from "../../../public/images/labs-progect.jpg.png";
import parkingImage from "../../../public/images/park-project.jpg.png";
import type { Language } from "@/components/site/LanguageProvider";

const projects = [
  { src: mosqueImage, ar: "مشروع جامع", en: "Mosque project" },
  { src: laboratoriesImage, ar: "مختبرات علمية", en: "Scientific laboratories" },
  { src: parkingImage, ar: "مشروع كراج", en: "Parking garage project" },
];

export default function ProjectsSlider({ language }: { language: Language }) {
  const [paused, setPaused] = useState(false);
  const ar = language === "ar";
  return <div className="slider" dir={ar ? "rtl" : "ltr"}>
    <div className="controls">
      <p>{ar ? "الجامع · المختبرات العلمية · الكراج" : "Mosque · Scientific laboratories · Parking garage"}</p>
      <button type="button" onClick={() => setPaused(value => !value)} aria-pressed={paused}>
        <span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span>
        {ar ? (paused ? "تشغيل الحركة" : "إيقاف الحركة") : (paused ? "Play slideshow" : "Pause slideshow")}
      </button>
    </div>
    <div className="viewport" role="region" aria-label={ar ? "معرض المشاريع المعمارية" : "Architectural projects gallery"} tabIndex={0}>
      <div className={paused ? "track is-paused" : "track"}>
        {[0, 1].map(copy => <div className="group" key={copy} aria-hidden={copy === 1 ? true : undefined}>
          {projects.map(project => <figure key={project.src.src} dir={ar ? "rtl" : "ltr"}>
            <div className="image-frame"><Image src={project.src} alt={copy === 0 ? project[language] : ""} sizes="(max-width: 650px) 82vw, 620px" /></div>
            <figcaption>{project[language]}</figcaption>
          </figure>)}
        </div>)}
      </div>
    </div>
    <style jsx>{`
      .slider { width: 100%; min-width: 0; margin-bottom: 54px; }
      .controls { display: flex; align-items: center; justify-content: space-between; gap: 20px; margin-bottom: 20px; }
      .controls p { margin: 0; color: #776b5e; font-size: 12px; line-height: 1.8; }
      button { display: inline-flex; flex-shrink: 0; align-items: center; gap: 10px; min-height: 44px; padding: 8px 0; border: 0; border-bottom: 1px solid #a76143; background: transparent; font: inherit; font-size: 12px; color: #a76143; cursor: pointer; }
      button:hover { color: #242321; }
      button:focus-visible, .viewport:focus-visible { outline: 2px solid #a76143; outline-offset: 5px; }
      .viewport { width: 100%; overflow: hidden; scrollbar-width: thin; scrollbar-color: #a76143 #e9e4d9; direction: ltr; }
      .track { display: flex; width: max-content; direction: ltr; animation: projectLoop 34s linear infinite; will-change: transform; }
      .group { display: flex; gap: 24px; padding-right: 24px; flex-shrink: 0; }
      figure { width: clamp(280px, 70vw, 620px); flex: 0 0 auto; margin: 0; }
      .image-frame { width: 100%; aspect-ratio: 2.14 / 1; background: #e9e4d9; }
      .image-frame :global(img) { display: block; width: 100%; height: 100%; object-fit: contain; }
      figcaption { padding: 18px 0; border-bottom: 1px solid #d8d0c4; color: #242321; font-size: 14px; line-height: 1.7; }
      .slider[dir="rtl"] .track { animation-direction: reverse; }
      .viewport:hover .track, .viewport:focus-within .track, .is-paused { animation-play-state: paused; }
      @keyframes projectLoop { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      @media (max-width: 650px) { figure { width: 82vw; } .controls { align-items: flex-start; flex-wrap: wrap; gap: 8px 20px; } .group { gap: 16px; padding-right: 16px; } }
      @media (prefers-reduced-motion: reduce) {
        .viewport { overflow-x: auto; }
        .track { animation: none; transform: none; will-change: auto; }
        .group[aria-hidden="true"] { display: none; }
        button { display: none; }
      }
    `}</style>
  </div>;
}

