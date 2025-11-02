import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../utils/translations";
import { Header, Footer, ScrollToTop } from "../../components";

export default function Privacy() {
  const { isDark } = useTheme();
  const { lang } = useLanguage();
  const t = translations[lang]?.privacy;

  if (!t) return null;

  return (
    <div
      className={`flex flex-col min-h-screen ${
        isDark ? "bg-gray-900" : "bg-white"
      }`}
    >
      <Header />
      <ScrollToTop />

      {/* Hero Section */}
      <section className="relative mt-16 py-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1
              className={`text-4xl font-bold mb-6 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {t.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Content Section - Reduced top padding */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {t.sections.map((section, index) => (
              <div
                key={index}
                className={`mb-12 p-8 rounded-2xl transition-all ${
                  isDark
                    ? "bg-gray-800/50 hover:bg-gray-800/70"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`p-3 rounded-xl ${
                      isDark ? "bg-cyan-500/10" : "bg-cyan-500/10"
                    }`}
                  >
                    {/* Icon based on section */}
                    <svg
                      className={`w-6 h-6 ${
                        isDark ? "text-cyan-400" : "text-cyan-600"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      {index === 0 ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      ) : index === 1 ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                        />
                      ) : (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      )}
                    </svg>
                  </div>
                  <h2
                    className={`text-2xl font-bold ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {section.title}
                  </h2>
                </div>
                <p
                  className={`text-lg leading-relaxed ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
