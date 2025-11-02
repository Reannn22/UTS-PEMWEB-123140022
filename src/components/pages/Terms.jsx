import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../utils/translations";
import { Header, Footer } from "../../components";

export default function Terms() {
  const { isDark } = useTheme();
  const { lang } = useLanguage();
  const t = translations[lang]?.terms;

  if (!t) return null;

  return (
    <div
      className={`flex flex-col min-h-screen ${
        isDark ? "bg-gray-900" : "bg-white"
      }`}
    >
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 mt-16">
        <div className="max-w-3xl mx-auto">
          <h1
            className={`text-4xl font-bold mb-6 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {t.title}
          </h1>
          <div className={`prose ${isDark ? "prose-invert" : ""} max-w-none`}>
            {t.sections.map((section, index) => (
              <div key={index} className="mb-8">
                <h2
                  className={`text-2xl font-bold mb-4 ${
                    isDark ? "text-gray-100" : "text-gray-800"
                  }`}
                >
                  {section.title}
                </h2>
                <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
