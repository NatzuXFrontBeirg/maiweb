import { useEffect, useRef, useState } from "react";
import { Icon } from "./IconSprite.jsx";
import T from "./T.jsx";
import { useAppState } from "../hooks/useAppState.jsx";

const SECTIONS = ["about", "pengalaman", "prestasi", "contact"];

export default function Nav() {
  const { theme, lang, toggleTheme, toggleLang, t } = useAppState();
  const [scrolled, setScrolled] = useState(false);
  const [current, setCurrent] = useState(-1);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10);
      let idx = -1;
      SECTIONS.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.35) idx = i;
      });
      setCurrent(idx);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("is-locked", menuOpen);
  }, [menuOpen]);

  // focus trap + Escape saat menu mobile terbuka
  useEffect(() => {
    if (!menuOpen) return;

    function onKeydown(e) {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !menuRef.current) return;
      const focusable = menuRef.current.querySelectorAll("a, button");
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeydown);
    menuRef.current?.querySelector("a")?.focus();
    return () => document.removeEventListener("keydown", onKeydown);
  }, [menuOpen]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 821px)");
    function onChange(e) {
      if (e.matches) setMenuOpen(false);
    }
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      <nav className={`nav ${scrolled ? "is-scrolled" : ""}`} id="siteNav">
        <a href="#home" className="brand">
          <span className="brand-mark">A</span>
          <span className="brand-name">I Gede Wibhu Natha Abhiyoga</span>
        </a>
        <div className="nav-links" id="navLinks">
          {SECTIONS.map((id, i) => (
            <a key={id} href={`#${id}`} className={current === i ? "is-current" : ""}>
              <T k={`nav.${id === "pengalaman" ? "pengalaman" : id}`} />
            </a>
          ))}
        </div>
        <div className="nav-actions">
          <button
            className="icon-btn lang-btn"
            type="button"
            onClick={toggleLang}
            aria-label={lang === "en" ? t("aria.langToId") : t("aria.langToEn")}
          >
            <Icon id="i-globe" size={16} />
            <span>{lang === "en" ? "ID" : "EN"}</span>
          </button>
          <button
            className="icon-btn"
            type="button"
            onClick={toggleTheme}
            aria-pressed={theme === "light"}
            aria-label={theme === "light" ? t("aria.themeDark") : t("aria.themeLight")}
          >
            <Icon id="i-moon" size={18} className="icon-moon" />
            <Icon id="i-sun" size={18} className="icon-sun" />
          </button>
          <button
            ref={menuButtonRef}
            className="icon-btn menu-btn"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobileMenu"
            aria-label={menuOpen ? t("aria.menuClose") : t("aria.menuOpen")}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <Icon id="i-menu" size={20} className="icon-menu" />
            <Icon id="i-close" size={20} className="icon-close" />
          </button>
        </div>
      </nav>

      <div className="mobile-menu" id="mobileMenu" ref={menuRef} hidden={!menuOpen}>
        {SECTIONS.map((id, i) => (
          <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
            <span className="mm-num">{String(i + 1).padStart(2, "0")}</span> <T k={`nav.${id}`} />
          </a>
        ))}
      </div>
    </>
  );
}
