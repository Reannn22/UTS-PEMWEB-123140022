import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  // Initialize language from URL params or localStorage
  const [lang, setLang] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get("lang");
    const savedLang = localStorage.getItem("lang");
    return urlLang || savedLang || "en";
  });

  // Sync language with URL and localStorage
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const currentTheme =
      params.get("theme") || localStorage.getItem("theme") || "light";

    params.set("lang", lang);
    params.set("theme", currentTheme);

    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params}`
    );
    localStorage.setItem("lang", lang);
  }, [lang]);

  const updateLanguage = (newLang) => {
    setLang(newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, updateLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
