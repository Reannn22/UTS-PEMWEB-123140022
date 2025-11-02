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

  const teamMembers = [
    {
      name: "Reyhan Capri Moraga",
      role: "Founder & CEO",
      image: "https://github.com/Reannn22.png",
    },
    {
      name: "Alice Chen",
      role: "CTO",
      image: "https://api.dicebear.com/7.x/personas/svg?seed=Alice",
    },
    {
      name: "David Kim",
      role: "Head of Product",
      image: "https://api.dicebear.com/7.x/personas/svg?seed=David",
    },
    {
      name: "Sarah Johnson",
      role: "Lead Developer",
      image: "https://api.dicebear.com/7.x/personas/svg?seed=Sarah",
    },
  ];

  return (
    <div className={`min-h-screen ${isDark ? "bg-gray-900" : "bg-white"}`}>
      <Header />

      <main className="container mx-auto px-4 py-8 mt-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1
            className={`text-4xl md:text-5xl font-bold mb-6 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {t.title}
          </h1>
          <p
            className={`text-xl max-w-3xl mx-auto ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {t.description}
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
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

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div
            className={`p-8 rounded-xl ${
              isDark ? "bg-gray-800/50" : "bg-gray-50"
            }`}
          >
            <h2
              className={`text-2xl font-bold mb-4 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {t.mission.title}
            </h2>
            <p className={isDark ? "text-gray-300" : "text-gray-600"}>
              {t.mission.description}
            </p>
          </div>
          <div
            className={`p-8 rounded-xl ${
              isDark ? "bg-gray-800/50" : "bg-gray-50"
            }`}
          >
            <h2
              className={`text-2xl font-bold mb-4 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {t.vision.title}
            </h2>
            <p className={isDark ? "text-gray-300" : "text-gray-600"}>
              {t.vision.description}
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2
            className={`text-3xl font-bold mb-8 text-center ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {t.team.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className={`text-center p-6 rounded-xl ${
                  isDark ? "bg-gray-800/50" : "bg-gray-50"
                }`}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h3
                  className={`font-bold mb-1 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {member.name}
                </h3>
                <p
                  className={`text-sm ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* History Timeline */}
        <div className="mb-16">
          <h2
            className={`text-3xl font-bold mb-8 text-center ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {t.journey.title}
          </h2>
          <div className="space-y-8">
            {[2021, 2022, 2023].map((year, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl ${
                  isDark ? "bg-gray-800/50" : "bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`text-xl font-bold ${
                      isDark ? "text-cyan-400" : "text-cyan-600"
                    }`}
                  >
                    {year}
                  </div>
                  <div
                    className={`text-lg ${
                      isDark ? "text-gray-300" : "text-gray-900"
                    }`}
                  >
                    {t.journey.milestones[year]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
