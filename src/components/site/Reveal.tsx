"use client";
import { useEffect, useRef, type ReactNode } from "react";

export default function Reveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || !("IntersectionObserver" in window)) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches) return;
    // Keep content readable without JavaScript and hide only off-screen content.
    if (element.getBoundingClientRect().top >= window.innerHeight) element.dataset.state = "pending";
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.dataset.state = "shown";
        observer.disconnect();
      }
    }, { threshold: 0.08 });
    const show = () => { if (preference.matches) element.dataset.state = "shown"; };
    preference.addEventListener("change", show);
    observer.observe(element);
    return () => { observer.disconnect(); preference.removeEventListener("change", show); };
  }, []);
  return <div ref={ref} className="reveal">
    {children}
    <style jsx>{`
      .reveal { min-width: 0; transition: opacity 850ms ease, transform 850ms cubic-bezier(.2,.7,.2,1); }
      .reveal[data-state="pending"] { opacity: 0; transform: translateY(22px); }
      @media (prefers-reduced-motion: reduce) {
        .reveal, .reveal[data-state="pending"] { opacity: 1; transform: none; transition: none; }
      }
    `}</style>
  </div>;
}

