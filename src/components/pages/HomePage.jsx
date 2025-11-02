import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../utils/translations";
import { Header, Footer, ScrollToTop } from "../../components";

export default function HomePage({ dataLimit = 10 }) {
  const { isDark } = useTheme();
  const { lang } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  const t = translations[lang]?.home || {};

  const bgImages = [
    "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1920", // Modern crypto
    "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=1920", // Premium trading
    "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=1920", // Blockchain
    "https://images.unsplash.com/photo-1634704784915-aacf363b021f?q=80&w=1920", // Future finance
  ];

  // Updated background rotation with fade effect
  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentBgIndex((prev) => (prev + 1) % bgImages.length);
        setFadeIn(true);
      }, 500); // Half of transition duration
    }, 5000);
    return () => clearInterval(interval);
  }, [bgImages.length]);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  const handleViewMarkets = () => {
    window.location.href = "/cryptocurrencylist";
  };

  const features = [
    {
      title: "Real-Time Data",
      description:
        "Get instant updates on cryptocurrency prices and market movements",
      icon: "📊",
    },
    {
      title: "Secure Trading",
      description: "Advanced encryption and secure transaction processing",
      icon: "🔒",
    },
    {
      title: "Advanced Analytics",
      description: "Powerful tools for technical and fundamental analysis",
      icon: "📈",
    },
  ];

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
            transition-opacity duration-1000
            ${fadeIn ? "opacity-100" : "opacity-0"}
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
              <button className="px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-primary-500/20">
                {t.hero?.startTrading}
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

        {/* Features Section */}
        <section className={isDark ? "bg-gray-900" : "bg-gray-50"}>
          <div className="container mx-auto px-4">
            <h2
              className={`text-3xl md:text-4xl font-bold text-center ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            ></h2>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

HomePage.propTypes = {
  dataLimit: PropTypes.number,
};
