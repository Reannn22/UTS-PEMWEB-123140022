import { useState, useRef, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../utils/translations";
import { Header, Footer, ScrollToTop } from "../../components";
import { useCountUp } from "../../hooks/useCountUp";

export default function About() {
  const { isDark } = useTheme();
  const { lang } = useLanguage();
  const t = translations[lang]?.about || {};

  const stats = [
    { label: t.stats.activeUsers, value: 10000, suffix: "+" },
    { label: t.stats.globalMarkets, value: 150, suffix: "+" },
    { label: t.stats.dailyTransactions, value: 50, prefix: "$", suffix: "M+" },
    { label: t.stats.teamMembers, value: 20, suffix: "+" },
  ];

  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const StatNumber = ({ value, prefix = "", suffix = "" }) => {
    const count = useCountUp(value, 2000, 0);
    return (
      <span>
        {prefix}
        {isVisible ? count.toLocaleString() : "0"}
        {suffix}
      </span>
    );
  };

  return (
    <div
      className={`flex flex-col min-h-screen ${
        isDark ? "bg-gray-900" : "bg-white"
      }`}
    >
      <Header />
      <ScrollToTop />

      {/* Hero Section */}
      <section className="relative mt-16 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1
              className={`text-5xl font-bold mb-6 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {t.title}
            </h1>
            <p
              className={`text-xl leading-relaxed ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {t.description}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        ref={statsRef}
        className={`py-16 ${isDark ? "bg-gray-800/50" : "bg-gray-50"}`}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div
                  className={`text-3xl font-bold mb-2 ${
                    isDark ? "text-cyan-400" : "text-cyan-600"
                  }`}
                >
                  <StatNumber
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </div>
                <div
                  className={`text-sm ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission Card */}
            <div
              className={`p-8 rounded-2xl transition-all ${
                isDark
                  ? "bg-gray-800/50 hover:bg-gray-800"
                  : "bg-gray-50 hover:bg-gray-100"
              }`}
            >
              <div
                className={`p-3 rounded-xl inline-block mb-6 ${
                  isDark ? "bg-cyan-500/10" : "bg-cyan-500/10"
                }`}
              >
                <svg
                  className={`w-8 h-8 ${
                    isDark ? "text-cyan-400" : "text-cyan-600"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
              </div>
              <h2
                className={`text-2xl font-bold mb-4 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {t.mission.title}
              </h2>
              <p
                className={`text-lg leading-relaxed ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {t.mission.description}
              </p>
            </div>

            {/* Vision Card */}
            <div
              className={`p-8 rounded-2xl transition-all ${
                isDark
                  ? "bg-gray-800/50 hover:bg-gray-800"
                  : "bg-gray-50 hover:bg-gray-100"
              }`}
            >
              <div
                className={`p-3 rounded-xl inline-block mb-6 ${
                  isDark ? "bg-cyan-500/10" : "bg-cyan-500/10"
                }`}
              >
                <svg
                  className={`w-8 h-8 ${
                    isDark ? "text-cyan-400" : "text-cyan-600"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </div>
              <h2
                className={`text-2xl font-bold mb-4 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {t.vision.title}
              </h2>
              <p
                className={`text-lg leading-relaxed ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {t.vision.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
