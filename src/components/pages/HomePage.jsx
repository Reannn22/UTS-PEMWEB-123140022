import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTheme } from "../../context/ThemeContext";
import { Header, Footer } from "../../components";

export default function HomePage({ dataLimit = 10 }) {
  const { isDark } = useTheme();
  const [loading, setLoading] = useState(true);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  const bgImages = [
    "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1920", // Modern crypto
    "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=1920", // Premium trading
    "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=1920", // Blockchain
    "https://images.unsplash.com/photo-1634704784915-aacf363b021f?q=80&w=1920", // Future finance
  ];

  // Background rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [bgImages.length]);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
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

      <main className="flex-grow">
        {/* Hero Section */}
        <section
          className="relative w-full min-h-screen flex items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage: `url(${bgImages[currentBgIndex]})`,
            transition: "background-image 1s ease-in-out",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50 backdrop-blur-[2px]"></div>
          <div className="relative z-10 container mx-auto px-4 text-center">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white leading-tight">
              The Future of <span className="text-primary-500">Crypto</span>{" "}
              Trading
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto">
              Experience real-time cryptocurrency tracking with advanced
              analytics and powerful portfolio management tools
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-primary-500/20">
                Start Trading Now
              </button>
              <button className="px-8 py-4 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all backdrop-blur-sm">
                View Markets
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className={`py-20 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
          <div className="container mx-auto px-4">
            <h2
              className={`text-3xl md:text-4xl font-bold text-center mb-16 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Why Choose CryptoTracker
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`p-8 rounded-2xl transition-all hover:transform hover:scale-105 ${
                    isDark
                      ? "bg-gray-800 hover:bg-gray-800/80"
                      : "bg-white hover:bg-gray-50"
                  } shadow-xl`}
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3
                    className={`text-xl font-bold mb-4 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className={`${isDark ? "text-gray-400" : "text-gray-600"}`}
                  >
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
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
