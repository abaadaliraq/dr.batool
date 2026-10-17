"use client";

import { useEffect, useState } from "react";

export default function OpeningReveal() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!visible) return;

    // Respect accessibility settings
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      setVisible(false);
      return;
    }

    // Prevent scrolling during the opening animation
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="opening-reveal"
      aria-hidden="true"
    >

      {/* TOP CURTAIN */}

      <div className="opening-reveal__top" />

      {/* BOTTOM CURTAIN */}

      <div
        className="opening-reveal__bottom"
        onAnimationEnd={() => setVisible(false)}
      />

      {/* CENTER ARCHITECTURAL LINE */}

      <div className="opening-reveal__center">
        <span className="opening-reveal__line" />
      </div>

      <style jsx>{`

        /* =====================================
           OPENING REVEAL
        ===================================== */

        .opening-reveal {
          position: fixed;
          inset: 0;

          width: 100%;
          height: 100%;
          height: 100dvh;

          z-index: 99999;

          overflow: hidden;

          pointer-events: all;

          isolation: isolate;
        }

        /* =====================================
           UPPER CURTAIN
        ===================================== */

        .opening-reveal__top {
          position: absolute;

          top: 0;
          left: 0;

          width: 100%;
          height: 50.1%;

          background: #242321;

          z-index: 2;

          will-change: transform;

          animation:
            openingTop 0.9s
            cubic-bezier(0.76, 0, 0.24, 1)
            1.3s forwards;
        }

        /* =====================================
           LOWER CURTAIN
        ===================================== */

        .opening-reveal__bottom {
          position: absolute;

          bottom: 0;
          left: 0;

          width: 100%;
          height: 50.1%;

          background: #242321;

          z-index: 2;

          will-change: transform;

          animation:
            openingBottom 0.9s
            cubic-bezier(0.76, 0, 0.24, 1)
            1.3s forwards;
        }

        /* =====================================
           CENTER LINE
        ===================================== */

        .opening-reveal__center {
          position: absolute;

          top: 50%;
          left: 50%;

          transform: translate(-50%, -50%);

          width: 100%;
          height: 1px;

          display: flex;
          align-items: center;
          justify-content: center;

          z-index: 3;

          pointer-events: none;
        }

        .opening-reveal__line {
          display: block;

          width: 0;
          height: 1px;

          background: #b66d4b;

          box-shadow:
            0 0 12px rgba(182, 109, 75, 0.16);

          animation:
            architecturalLine 1.6s ease-in-out
            0.25s forwards;
        }

        /* =====================================
           ANIMATIONS
        ===================================== */

        @keyframes openingTop {
          0% {
            transform: translateY(0);
          }

          100% {
            transform: translateY(-101%);
          }
        }

        @keyframes openingBottom {
          0% {
            transform: translateY(0);
          }

          100% {
            transform: translateY(101%);
          }
        }

        @keyframes architecturalLine {
          0% {
            width: 0;
            opacity: 0;
          }

          30% {
            width: 80px;
            opacity: 0.6;
          }

          65% {
            width: min(38vw, 420px);
            opacity: 1;
          }

          85% {
            width: min(45vw, 520px);
            opacity: 0.65;
          }

          100% {
            width: min(45vw, 520px);
            opacity: 0;
          }
        }

        /* =====================================
           MOBILE
        ===================================== */

        @media (max-width: 768px) {

          .opening-reveal__top,
          .opening-reveal__bottom {
            background: #242321;
          }

          .opening-reveal__line {
            max-width: 65vw;
          }

        }

        /* =====================================
           ACCESSIBILITY
        ===================================== */

        @media (prefers-reduced-motion: reduce) {

          .opening-reveal {
            display: none;
          }

          .opening-reveal__top,
          .opening-reveal__bottom,
          .opening-reveal__line {
            animation: none !important;
          }

        }

      `}</style>

    </div>
  );
}