"use client";

import { useEffect, useState } from "react";

const OPENING_DURATION_MS = 2300;

export default function OpeningReveal() {
  // Language updates keep this component mounted, so the opening runs only once.
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!visible) return;

    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    const previousOverflow = document.body.style.overflow;
    const finish = () => setVisible(false);

    // CSS hides the overlay immediately for reduced motion; remove its DOM too.
    const timeout = window.setTimeout(
      finish,
      motionPreference.matches ? 0 : OPENING_DURATION_MS
    );

    if (!motionPreference.matches) {
      document.body.style.overflow = "hidden";
    }

    const onMotionChange = () => {
      if (motionPreference.matches) finish();
    };
    motionPreference.addEventListener("change", onMotionChange);

    return () => {
      window.clearTimeout(timeout);
      motionPreference.removeEventListener("change", onMotionChange);
      document.body.style.overflow = previousOverflow;
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="opening-reveal" aria-hidden="true">
      <div className="opening-reveal__top" />
      <div
        className="opening-reveal__bottom"
        onAnimationEnd={() => setVisible(false)}
      />
      <div className="opening-reveal__line" />

      <style jsx>{`
        .opening-reveal {
          position: fixed;
          inset: 0;
          z-index: 99999;
          overflow: hidden;
          pointer-events: none;
          isolation: isolate;
          animation: openingDismiss 2.3s step-end forwards;
        }

        .opening-reveal__top,
        .opening-reveal__bottom {
          position: absolute;
          left: 0;
          width: 100%;
          height: 50%;
          background: #242321;
          will-change: transform;
          animation-duration: 1.1s;
          animation-delay: 1.2s;
          animation-timing-function: cubic-bezier(0.76, 0, 0.24, 1);
          animation-fill-mode: both;
        }

        .opening-reveal__top {
          top: 0;
          animation-name: openingTop;
        }

        .opening-reveal__bottom {
          bottom: 0;
          animation-name: openingBottom;
        }

        .opening-reveal__line {
          position: absolute;
          top: calc(50% - 1px);
          left: 0;
          z-index: 1;
          width: 100%;
          height: 2px;
          background: #b66d4b;
          box-shadow: 0 0 12px rgba(182, 109, 75, 0.2);
          transform-origin: center;
          animation: openingLine 1.3s ease-in-out both;
        }

        @keyframes openingLine {
          0%, 15% {
            transform: scaleX(0);
            opacity: 0;
          }
          25% {
            opacity: 1;
          }
          85% {
            transform: scaleX(1);
            opacity: 1;
          }
          100% {
            transform: scaleX(1);
            opacity: 0;
          }
        }

        @keyframes openingTop {
          from { transform: translateY(0); }
          to { transform: translateY(-100%); }
        }

        @keyframes openingBottom {
          from { transform: translateY(0); }
          to { transform: translateY(100%); }
        }

        @keyframes openingDismiss {
          to { visibility: hidden; }
        }

        @media (prefers-reduced-motion: reduce) {
          .opening-reveal {
            display: none;
          }

          .opening-reveal,
          .opening-reveal__top,
          .opening-reveal__bottom,
          .opening-reveal__line {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
