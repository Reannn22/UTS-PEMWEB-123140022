import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../utils/translations";
import { Header, Footer, ScrollToTop } from "../../components";

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

      <main className="flex-1 container mx-auto px-4 py-8 mt-16">
        <div className="max-w-4xl mx-auto">
          {/* Contact Info */}
          <div
            className={`grid md:grid-cols-3 gap-8 mb-12 ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {[
              {
                icon: "📍",
                title: t.info.address,
                content: t.info.addressDetail,
              },
              {
                icon: "📞",
                title: t.info.phone,
                content: t.info.phoneNumber,
              },
              {
                icon: "📧",
                title: t.info.email,
                content: t.info.emailAddress,
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3
                  className={`text-lg font-semibold mb-2 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {item.title}
                </h3>
                <p>{item.content}</p>
              </div>
            ))}
          </div>

          {/* Contact Form Section */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <div
                  className={`p-8 rounded-2xl ${
                    isDark ? "bg-gray-800/50" : "bg-gray-50"
                  }`}
                >
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Field */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label
                          className={`block mb-2 font-medium ${
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
                          className={`w-full p-3 rounded-lg transition-colors ${
                            isDark
                              ? "bg-gray-700/50 border-gray-600 text-white focus:border-cyan-500"
                              : "bg-white border-gray-300 focus:border-cyan-500"
                          } border focus:outline-none focus:ring-2 focus:ring-cyan-500/20`}
                        />
                      </div>

                      {/* Email Field */}
                      <div>
                        <label
                          className={`block mb-2 font-medium ${
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
                          className={`w-full p-3 rounded-lg transition-colors ${
                            isDark
                              ? "bg-gray-700/50 border-gray-600 text-white focus:border-cyan-500"
                              : "bg-white border-gray-300 focus:border-cyan-500"
                          } border focus:outline-none focus:ring-2 focus:ring-cyan-500/20`}
                        />
                      </div>
                    </div>

                    {/* Subject Field */}
                    <div>
                      <label
                        className={`block mb-2 font-medium ${
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
                        className={`w-full p-3 rounded-lg transition-colors ${
                          isDark
                            ? "bg-gray-700/50 border-gray-600 text-white focus:border-cyan-500"
                            : "bg-white border-gray-300 focus:border-cyan-500"
                        } border focus:outline-none focus:ring-2 focus:ring-cyan-500/20`}
                      />
                    </div>

                    {/* Message Field */}
                    <div>
                      <label
                        className={`block mb-2 font-medium ${
                          isDark ? "text-gray-200" : "text-gray-700"
                        }`}
                      >
                        {t.form.message}
                      </label>
                      <textarea
                        required
                        rows="6"
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className={`w-full p-3 rounded-lg transition-colors ${
                          isDark
                            ? "bg-gray-700/50 border-gray-600 text-white focus:border-cyan-500"
                            : "bg-white border-gray-300 focus:border-cyan-500"
                        } border focus:outline-none focus:ring-2 focus:ring-cyan-500/20`}
                      />
                    </div>

                    {/* Status Message */}
                    {status.message && (
                      <div
                        className={`p-4 rounded-lg ${
                          status.type === "success"
                            ? "bg-green-500/10 text-green-500"
                            : status.type === "error"
                            ? "bg-red-500/10 text-red-500"
                            : "bg-blue-500/10 text-blue-500"
                        }`}
                      >
                        {status.message}
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={status.type === "loading"}
                      className={`w-full py-4 px-6 rounded-lg text-white font-medium transition-all transform hover:scale-[1.02] ${
                        isDark
                          ? "bg-cyan-600 hover:bg-cyan-700"
                          : "bg-cyan-500 hover:bg-cyan-600"
                      } ${
                        status.type === "loading"
                          ? "opacity-70 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      {status.type === "loading"
                        ? t.form.sending
                        : t.form.submit}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
