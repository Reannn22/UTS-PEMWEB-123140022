import { useState, useEffect } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { HomePage } from "./components";
import { LanguageProvider } from "./context/LanguageContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import Privacy from "./components/pages/Privacy";
import Terms from "./components/pages/Terms";
import CryptocurrencyList from "./components/pages/CryptocurrencyList";
import { BrowserRouter } from "react-router-dom";
import { ScrollToTop } from "./components";

function App() {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get("lang");
    const urlTheme = params.get("theme");

    if (urlLang && ["en", "id"].includes(urlLang)) {
      localStorage.setItem("lang", urlLang);
    }

    if (urlTheme && ["dark", "light"].includes(urlTheme)) {
      localStorage.setItem("theme", urlTheme);
    }
  }, []);

  const handleRefresh = async () => {
    setLoading(true);
    // Add your refresh logic here
    setLastUpdated(new Date());
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <BrowserRouter>
      <LanguageProvider>
        <ThemeProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route
              path="/cryptocurrencylist"
              element={<CryptocurrencyList />}
            />
          </Routes>
        </ThemeProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
