import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { translate } from "../data/i18n.js";

const AppStateContext = createContext(null);

function readInitial(attr, storageKey, fallback) {
  if (typeof document === "undefined") return fallback;
  const fromDom = document.documentElement.getAttribute(attr);
  if (fromDom) return fromDom;
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored) return stored;
  } catch (e) {
    /* localStorage bisa diblokir (mode privat dsb) — abaikan, pakai fallback */
  }
  return fallback;
}

export function AppStateProvider({ children }) {
  const [theme, setTheme] = useState(() => readInitial("data-theme", "theme", "dark"));
  const [lang, setLang] = useState(() => readInitial("lang", "lang", "id"));

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {}
    const meta = document.getElementById("themeColorMeta");
    if (meta) meta.setAttribute("content", theme === "light" ? "#f4ede0" : "#14100c");
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
    try {
      localStorage.setItem("lang", lang);
    } catch (e) {}
    document.title =
      lang === "en"
        ? "I Gede Wibhu Natha Abhiyoga — Portfolio"
        : "I Gede Wibhu Natha Abhiyoga — Portofolio";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        lang === "en"
          ? "Portfolio of I Gede Wibhu Natha Abhiyoga — Medical Technology student at ITS, facilities & logistics coordinator, and national science-competition participant."
          : "Portofolio I Gede Wibhu Natha Abhiyoga — mahasiswa Teknologi Kedokteran ITS, koordinator sarana & prasarana, dan pegiat kompetisi ilmiah nasional."
      );
    }
  }, [lang]);

  const toggleTheme = useCallback(() => setTheme((t) => (t === "light" ? "dark" : "light")), []);
  const toggleLang = useCallback(() => setLang((l) => (l === "en" ? "id" : "en")), []);
  const t = useCallback((key) => translate(key, lang), [lang]);

  return (
    <AppStateContext.Provider value={{ theme, lang, toggleTheme, toggleLang, t }}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState harus dipakai di dalam <AppStateProvider>");
  return ctx;
}
