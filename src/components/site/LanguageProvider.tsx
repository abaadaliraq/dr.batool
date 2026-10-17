"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Language = "en" | "ar";
const LanguageContext = createContext<{ language: Language; setLanguage: (value: Language) => void } | null>(null);

export default function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, updateLanguage] = useState<Language>("en");
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const saved = localStorage.getItem("batool-language");
        if (saved === "ar" || saved === "en") updateLanguage(saved);
      } catch { /* Language still works when browser storage is unavailable. */ }
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);
  function setLanguage(value: Language) {
    updateLanguage(value);
    try { localStorage.setItem("batool-language", value); } catch { /* Keep the in-memory selection. */ }
  }
  return <LanguageContext.Provider value={{ language, setLanguage }}>
    {children}
  </LanguageContext.Provider>;
}
export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error("useLanguage requires LanguageProvider");
  return value;
}

