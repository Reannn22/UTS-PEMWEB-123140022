import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  // Initialize theme from URL params or localStorage
  const [isDark, setIsDark] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const urlTheme = params.get("theme");
    const savedTheme = localStorage.getItem("theme");

    if (urlTheme === "dark" || savedTheme === "dark") {
      return true;
    }
    return false;
  });

  // Sync theme with URL and localStorage
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const currentLang =
      params.get("lang") || localStorage.getItem("lang") || "en";

    params.set("theme", isDark ? "dark" : "light");
    params.set("lang", currentLang);

    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params}`
    );
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
