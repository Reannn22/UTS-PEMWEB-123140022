import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";
import { translations } from "../../utils/translations";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

export default function About() {
  const { isDark } = useTheme();
  const { lang } = useLanguage();
  const t = translations[lang].about;

  const metrics = [
    {
      value: t.metrics.values.activeUsers,
      label: t.metrics.activeUsers,
    },
    {
      value: t.metrics.values.globalMarket,
      label: t.metrics.globalMarket,
    },
    {
      value: t.metrics.values.dailyTransactions,
      label: t.metrics.dailyTransactions,
    },
    {
      value: t.metrics.values.teamMembers,
      label: t.metrics.teamMembers,
    },
  ];

  return (
    <div className={`min-h-screen ${isDark ? "bg-gray-900" : "bg-white"}`}>
      <Header />

      <main className="container mx-auto px-4 py-8 mt-16">
        <h1
          className={`text-3xl font-bold mb-6 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          {t.title}
        </h1>

        <p
          className={`text-lg mb-12 ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {t.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className={`text-center p-6 rounded-xl ${
                isDark ? "bg-gray-800/50" : "bg-gray-50"
              }`}
            >
              <div
                className={`text-3xl font-bold mb-2 ${
                  isDark ? "text-cyan-400" : "text-cyan-600"
                }`}
              >
                {metric.value}
              </div>
              <div
                className={`text-sm ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
