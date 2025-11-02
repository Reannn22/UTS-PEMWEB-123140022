import { useState, useEffect, lazy, Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../utils/translations";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import ScrollToTop from "../common/ScrollToTop";

const TimeRangeButton = ({ active, onClick, children, isDark }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm rounded-lg transition-colors ${
      active
        ? isDark
          ? "bg-cyan-600 text-white"
          : "bg-cyan-500 text-white"
        : isDark
        ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
    }`}
  >
    {children}
  </button>
);

const ChartSkeleton = ({ isDark }) => (
  <div className="animate-pulse space-y-6">
    {/* Title and Navigation Skeleton */}
    <div className="flex items-center justify-between">
      <div
        className={`h-10 w-32 rounded-lg ${
          isDark ? "bg-gray-700" : "bg-gray-200"
        }`}
      />
      <div
        className={`h-10 w-48 rounded-lg ${
          isDark ? "bg-gray-700" : "bg-gray-200"
        }`}
      />
    </div>

    {/* Chart Area Skeleton */}
    <div
      className={`h-[400px] w-full rounded-xl ${
        isDark ? "bg-gray-800/50" : "bg-gray-100"
      } relative overflow-hidden`}
    >
      {/* Fake Chart Lines */}
      <div className="absolute inset-0 flex items-center">
        <div
          className={`w-full h-[2px] ${isDark ? "bg-gray-700" : "bg-gray-200"}`}
        >
          <div className="h-full w-1/3 bg-cyan-500/20 animate-pulse"></div>
        </div>
      </div>
    </div>

    {/* Price Info Skeleton */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="space-y-2">
          <div
            className={`h-4 w-20 rounded ${
              isDark ? "bg-gray-700" : "bg-gray-200"
            }`}
          />
          <div
            className={`h-6 w-32 rounded ${
              isDark ? "bg-gray-700" : "bg-gray-200"
            }`}
          />
        </div>
      ))}
    </div>
  </div>
);

// Lazy load PriceChart
const PriceChartComponent = lazy(() => import("../charts/PriceChart"));

export default function ChartPage() {
  const { isDark } = useTheme();
  const { lang } = useLanguage();
  const { coinId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [chartComponent, setChartComponent] = useState(null);
  const [ready, setReady] = useState(false);
  const [timeRange, setTimeRange] = useState("7");
  const [chartType, setChartType] = useState("line");

  const timeRanges = [
    { label: translations[lang].chart.timeRanges["1"], value: "1" },
    { label: translations[lang].chart.timeRanges["7"], value: "7" },
    { label: translations[lang].chart.timeRanges["30"], value: "30" },
    { label: translations[lang].chart.timeRanges["90"], value: "90" },
    { label: translations[lang].chart.timeRanges["365"], value: "365" },
  ];

  const chartTypes = [
    { label: translations[lang].chart.chartTypes.line, value: "line" },
    { label: translations[lang].chart.chartTypes.candle, value: "candle" }, // Add candle option
  ];

  useEffect(() => {
    setLoading(true);
    setReady(false);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [coinId, timeRange, chartType]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setTimeRange(params.get("range") || "7");
    setChartType(params.get("type") || "line");
  }, []);

  const updateURLParams = (params) => {
    const url = new URL(window.location);
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        url.searchParams.set(key, value);
      } else {
        url.searchParams.delete(key);
      }
    });
    window.history.pushState({}, "", url);
  };

  const handleTimeRangeChange = (value) => {
    setTimeRange(value);
    updateURLParams({ range: value });
  };

  const handleChartTypeChange = (value) => {
    setChartType(value);
    updateURLParams({ type: value });
  };

  return (
    <div
      className={`flex flex-col min-h-screen ${
        isDark ? "bg-gray-900" : "bg-white"
      }`}
    >
      <Header />
      <ScrollToTop />

      <main className="flex-1 container mx-auto px-4 py-8 mt-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className={`inline-flex items-center px-4 py-2 rounded-lg ${
              isDark
                ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
                : "bg-gray-100 hover:bg-gray-200 text-gray-600"
            }`}
          >
            ← {translations[lang].chart.back}
          </button>

          <div className="flex flex-wrap gap-2">
            <div
              className={`p-1 rounded-xl ${
                isDark ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              {timeRanges.map(({ label, value }) => (
                <TimeRangeButton
                  key={value}
                  active={timeRange === value}
                  onClick={() => handleTimeRangeChange(value)}
                  isDark={isDark}
                >
                  {label}
                </TimeRangeButton>
              ))}
            </div>

            <div
              className={`p-1 rounded-xl ${
                isDark ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              {chartTypes.map(({ label, value }) => (
                <TimeRangeButton
                  key={value}
                  active={chartType === value}
                  onClick={() => setChartType(value)}
                  isDark={isDark}
                >
                  {label}
                </TimeRangeButton>
              ))}
            </div>
          </div>
        </div>

        <div
          className={`p-6 rounded-xl ${
            isDark ? "bg-gray-800/50" : "bg-gray-50"
          }`}
        >
          <div className="relative">
            <div
              className={`transition-opacity duration-300 ${
                loading || !ready ? "opacity-100" : "opacity-0"
              }`}
            >
              <ChartSkeleton isDark={isDark} />
            </div>
            <div
              className={`absolute inset-0 transition-opacity duration-300 ${
                loading || !ready ? "opacity-0" : "opacity-100"
              }`}
            >
              <Suspense fallback={null}>
                {!loading && (
                  <PriceChartComponent
                    coinId={coinId}
                    timeRange={timeRange}
                    chartType={chartType}
                    onReady={() => setReady(true)}
                  />
                )}
              </Suspense>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// Add PropTypes for new component
TimeRangeButton.propTypes = {
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  isDark: PropTypes.bool.isRequired,
};
