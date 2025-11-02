import { useState, useEffect } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { HomePage } from "./components";
import { LanguageProvider } from "./context/LanguageContext";
import { Routes, Route } from "react-router-dom";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import Privacy from "./components/pages/Privacy";
import Terms from "./components/pages/Terms";
import CryptocurrencyList from "./components/pages/CryptocurrencyList";
import ChartPage from "./components/pages/ChartPage";
import { BrowserRouter } from "react-router-dom";
import { ScrollToTop } from "./components";
import PriceChart from "./components/charts/PriceChart";

function App() {
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
            <Route path="/coin/:coinId" element={<ChartPage />} />
          </Routes>
        </ThemeProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
