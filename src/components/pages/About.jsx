import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../utils/translations";
import { Header, Footer } from "../../components";

export default function About() {
  const { isDark } = useTheme();
  const { lang } = useLanguage();
  const t = translations[lang]?.about || {};

  return (
    <div
      className={`flex flex-col min-h-screen ${
        isDark ? "bg-gray-900" : "bg-white"
      }`}
    >
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 mt-16">
        {" "}
        {/* Added mt-16 for header height */}
        <div className="max-w-3xl mx-auto">
          <h1
            className={`text-4xl font-bold mb-6 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {t.title}
          </h1>
          <div className={`prose ${isDark ? "prose-invert" : ""} max-w-none`}>
            <p
              className={`text-lg mb-8 ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {t.description}
            </p>

            <h2
              className={`text-2xl font-bold mt-12 mb-4 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {t.mission.title}
            </h2>
            <p
              className={`text-lg mb-8 ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {t.mission.description}
            </p>

            <h2
              className={`text-2xl font-bold mt-12 mb-4 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {t.vision.title}
            </h2>
            <p
              className={`text-lg mb-8 ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {t.vision.description}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
