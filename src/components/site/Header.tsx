"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

type Language = "en" | "ar";

interface HeaderProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
}

const navigation = {
  en: [
    { label: "Home", href: "#home" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "#projects" },
    { label: "Research", href: "/research" },
    { label: "Utopian Iraq", href: "#utopian" },
    { label: "Heritage", href: "#heritage" },
    { label: "Contact", href: "#contact" },
  ],

  ar: [
    { label: "الرئيسية", href: "#home" },
    { label: "نبذة عنها", href: "/about" },
    { label: "المشاريع", href: "#projects" },
    { label: "الأبحاث", href: "/research" },
    { label: "يوتوبيا العراق", href: "#utopian" },
    { label: "التراث", href: "#heritage" },
    { label: "التواصل", href: "#contact" },
  ],
};

export default function Header({
  language,
  onLanguageChange,
}: HeaderProps) {
  const pathname = usePathname();
  const resolveHref = (href: string) => href.startsWith("#") && pathname !== "/" ? "/" + href : href;
  const isActive = (href: string) => (href === "/about" || href === "/research") ? pathname === href : href === "#home" && pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  function changeLanguage() {
    onLanguageChange(language === "en" ? "ar" : "en");
    setMenuOpen(false);
  }

  return (
    <header
      className={`site-header ${
        scrolled ? "site-header--scrolled" : ""
      }`}
    >
      <div className="site-header__inner">

        {/* BRAND */}

        <Link
          href={resolveHref("#home")}
          className="site-header__brand"
          aria-label={language === "ar" ? "د. بتول موفق" : "Dr. Batool Mowafaq"}
        >
          <span className="site-header__logo" aria-hidden="true">
            <Image src="/images/logo.png" alt="" width={84} height={84} sizes="(max-width: 768px) 72px, 84px" />
          </span>
        </Link>

        {/* DESKTOP NAVIGATION */}

        <nav
          className="site-header__nav"
          aria-label={language === "ar" ? "التنقل الرئيسي" : "Main navigation"}
        >
          {navigation[language].map((item) => (
            <Link
              key={item.href}
              href={resolveHref(item.href)}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={
                isActive(item.href)
                  ? "site-header__link site-header__link--active"
                  : "site-header__link"
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* ACTIONS */}

        <div className="site-header__actions">

          <button
            type="button"
            className="site-header__language"
            onClick={changeLanguage}
            aria-label={language === "ar" ? "Switch to English" : "التبديل إلى العربية"}
          >
            {language === "en" ? "AR" : "EN"}
          </button>

          <button
            type="button"
            className={`site-header__menu-button ${
              menuOpen ? "is-open" : ""
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={language === "ar" ? "فتح أو إغلاق القائمة" : "Toggle menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            <span />
            <span />
          </button>

        </div>
      </div>

      {/* MOBILE NAVIGATION */}

      <nav
        id="mobile-navigation"
        className={`mobile-navigation ${
          menuOpen ? "mobile-navigation--open" : ""
        }`}
        aria-label={language === "ar" ? "التنقل على الهاتف" : "Mobile navigation"}
        aria-hidden={!menuOpen}
      >
        {navigation[language].map((item, index) => (
          <Link
            key={item.href}
            href={resolveHref(item.href)}
              aria-current={isActive(item.href) ? "page" : undefined}
            tabIndex={menuOpen ? 0 : -1}
            onClick={() => setMenuOpen(false)}
          >
            <span className="mobile-navigation__number">
              {String(index + 1).padStart(2, "0")}
            </span>

            {item.label}
          </Link>
        ))}
      </nav>
      <style jsx>{`
        .site-header__logo {
          position: relative;
          display: block;
          width: 84px;
          height: 48px;
          flex-shrink: 0;
          overflow: hidden;
        }
        .site-header__logo :global(img) {
          position: absolute;
          top: -24px;
          left: 0;
          display: block;
          width: 84px;
          height: 84px;
          object-fit: contain;
        }
        @media (max-width: 768px) {
          .site-header__logo { width: 72px; height: 42px; }
          .site-header__logo :global(img) { top: -21px; width: 72px; height: 72px; }
        }
        @media (max-width: 767px) {
          .site-header, .site-header--scrolled {
            position: sticky;
            top: 0;
            z-index: 100;
            height: 66px;
            background: #f4f1e9;
            backdrop-filter: none;
            -webkit-backdrop-filter: none;
            box-shadow: none;
            transition: none;
            flex-shrink: 0;
          }
          .mobile-navigation {
            top: 100%;
            z-index: 1;
            background: #f4f1e9;
            max-height: calc(100dvh - 66px);
            overflow-y: auto;
          }
        }
      `}</style>
    </header>
  );
}

