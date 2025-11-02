import { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../utils/translations";
import { Header, Footer, ScrollToTop } from "../../components";

export default function HomePage() {
  const { isDark } = useTheme();
  const { lang } = useLanguage();
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  const t = translations[lang]?.home || {};

  const bgImages = [
    "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1920", // Modern crypto
    "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=1920", // Premium trading
    "https://images.unsplash.comf/photo-1633167606207-d840b5070fc2?q=80&w=1920", // Blockchain
    "https://images.unsplash.com/photo-1634704784915-aacf363b021f?q=80&w=1920", // Future finance
  ];

  // Updated background rotation with fade effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [bgImages.length]);

  const handlePortfolioCalculator = () => {
    window.location.href = "/portfoliocalculator";
  };

  const handleViewMarkets = () => {
    window.location.href = "/cryptocurrencylist";
  };

  return (
    <div
      className={`flex flex-col min-h-screen ${
        isDark ? "bg-gray-900" : "bg-white"
      }`}
    >
      <Header />
      <ScrollToTop />
      <main className="flex-1 flex flex-col">
        {/* Hero Section with Fade Transition */}
        <section
          className={`
            relative w-full min-h-screen flex items-center justify-center bg-cover bg-center
            transition-opacity duration-1000 opacity-100
          `}
          style={{
            backgroundImage: `url(${bgImages[currentBgIndex]})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50 backdrop-blur-[2px]"></div>
          <div className="relative z-10 container mx-auto px-4 text-center">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white leading-tight">
              {t.hero?.title || "The Future of Crypto Trading"}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto">
              {t.hero?.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handlePortfolioCalculator}
                className="px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-primary-500/20"
              >
                {t.hero?.startPortfolio}
              </button>
              <button
                onClick={handleViewMarkets}
                className="px-8 py-4 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all backdrop-blur-sm"
              >
                {t.hero?.viewMarkets}
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
