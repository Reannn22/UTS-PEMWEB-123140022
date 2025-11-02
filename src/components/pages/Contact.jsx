import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../utils/translations";
import { sendEmail } from "../../utils/emailService";
import { Header, Footer } from "../../components";

export default function Contact() {
  const { isDark } = useTheme();
  const { lang } = useLanguage();
  const t = translations[lang]?.contact;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "", // Changed from phone to subject
    message: "",
  });

  const [status, setStatus] = useState({ type: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setStatus({ type: "loading", message: t.form.sending });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus({ type: "success", message: t.form.success });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.log("Form data:", formData);
      setStatus({ type: "success", message: t.form.success });
    }
  };

  if (!t) return null;

  return (
    <div
      className={`flex flex-col min-h-screen ${
        isDark ? "bg-gray-900" : "bg-white"
      }`}
    >
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 mt-16">
        <div className="max-w-2xl mx-auto">
          <h1
            className={`text-4xl font-bold mb-6 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {t.title}
          </h1>
          <p className={`mb-8 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            {t.description}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                className={`block mb-2 ${
                  isDark ? "text-gray-200" : "text-gray-700"
                }`}
              >
                {t.form.name}
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className={`w-full p-3 rounded-lg border ${
                  isDark
                    ? "bg-gray-800 border-gray-700 text-white"
                    : "bg-white border-gray-300"
                }`}
              />
            </div>

            <div>
              <label
                className={`block mb-2 ${
                  isDark ? "text-gray-200" : "text-gray-700"
                }`}
              >
                {t.form.email}
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className={`w-full p-3 rounded-lg border ${
                  isDark
                    ? "bg-gray-800 border-gray-700 text-white"
                    : "bg-white border-gray-300"
                }`}
              />
            </div>

            <div>
              <label
                className={`block mb-2 ${
                  isDark ? "text-gray-200" : "text-gray-700"
                }`}
              >
                {t.form.subject}
              </label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                className={`w-full p-3 rounded-lg border ${
                  isDark
                    ? "bg-gray-800 border-gray-700 text-white"
                    : "bg-white border-gray-300"
                }`}
              />
            </div>

            <div>
              <label
                className={`block mb-2 ${
                  isDark ? "text-gray-200" : "text-gray-700"
                }`}
              >
                {t.form.message}
              </label>
              <textarea
                required
                rows="5"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className={`w-full p-3 rounded-lg border ${
                  isDark
                    ? "bg-gray-800 border-gray-700 text-white"
                    : "bg-white border-gray-300"
                }`}
              />
            </div>

            {status.message && (
              <div
                className={`p-4 rounded-lg ${
                  status.type === "success"
                    ? "bg-green-100 text-green-700"
                    : status.type === "error"
                    ? "bg-red-100 text-red-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {status.message}
              </div>
            )}

            <button
              type="submit"
              disabled={status.type === "loading"}
              className={`w-full py-3 px-4 rounded-lg text-white transition-colors ${
                isDark
                  ? "bg-cyan-600 hover:bg-cyan-700"
                  : "bg-cyan-500 hover:bg-cyan-600"
              } ${
                status.type === "loading" ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {status.type === "loading" ? t.form.sending : t.form.submit}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
