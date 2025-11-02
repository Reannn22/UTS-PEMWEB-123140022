import { useState, useEffect, lazy, Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../utils/translations";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import ScrollToTop from "../common/ScrollToTop";
import refreshIcon from "../../assets/icons/refresh-cw.svg";
import chevronLeft from "../../assets/icons/chevron-left.svg";

const TimeRangeButton = ({ active, onClick, children, isDark }) => (
  <button
    onClick={onClick}
    className={`w-full sm:w-auto px-3 py-2 text-sm font-medium rounded-lg border ${
      active
        ? isDark
          ? "bg-cyan-600 text-white border-transparent"
          : "bg-cyan-500 text-white border-transparent"
        : isDark
        ? "bg-gray-800 text-gray-300 hover:bg-gray-700 border-gray-700"
        : "bg-gray-100 text-gray-600 hover:bg-gray-200 border-gray-300"
    }`}
  >
    {children}
  </button>
);

const ChartSkeleton = ({ isDark, chartType = "line" }) => (
  <div className="h-[550px] w-full">
    <div
      className={`h-full w-full rounded-lg ${
        isDark ? "bg-gray-800" : "bg-gray-50"
      } relative overflow-hidden`}
    >
      {chartType === "line" ? (
        <div className="absolute inset-0">
          {/* Background Grid */}
          <div className="absolute inset-0">
            {[...Array(12)].map((_, i) => (
              <div
                key={`v-${i}`}
                className={`absolute top-0 bottom-0 w-px ${
                  isDark ? "bg-gray-700/20" : "bg-gray-300/30"
                }`}
                style={{
                  left: `${(i + 1) * 8.33}%`,
                  animation: `pulseOpacity 3s infinite`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
            {[...Array(8)].map((_, i) => (
              <div
                key={`h-${i}`}
                className={`absolute left-0 right-0 h-px ${
                  isDark ? "bg-gray-700/20" : "bg-gray-300/30"
                }`}
                style={{
                  top: `${(i + 1) * 12.5}%`,
                  animation: `pulseOpacity 3s infinite`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>

          {/* Multiple Animated Lines Layer */}
          <div className="absolute inset-x-0 top-[20%] bottom-[20%]">
            {[...Array(3)].map((_, index) => (
              <svg
                key={index}
                className="absolute inset-0 w-full h-full"
                preserveAspectRatio="none"
                viewBox="0 0 100 100"
              >
                <path
                  d={`
                    M -10,${50 + Math.sin(index) * 5}
                    C ${20},${45 + Math.sin(index + 1) * 5}
                    ${40},${55 + Math.sin(index + 2) * 5}
                    ${60},${48 + Math.sin(index + 3) * 5}
                    S ${80},${52 + Math.sin(index + 4) * 5}
                    ${110},${50 + Math.sin(index + 5) * 5}
                  `}
                  className={`stroke-2 fill-none ${
                    isDark
                      ? `stroke-cyan-500/${40 - index * 10}`
                      : `stroke-cyan-600/${40 - index * 10}`
                  }`}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    animation: `chartLine ${
                      3 + index * 0.5
                    }s infinite ease-in-out`,
                    animationDelay: `${index * 0.5}s`,
                  }}
                />
              </svg>
            ))}

            {/* Animated Data Points */}
            <div className="absolute inset-0 flex items-center justify-between px-6">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="relative group"
                  style={{
                    animation: `floatPoint ${
                      2 + i * 0.2
                    }s infinite ease-in-out`,
                    animationDelay: `${i * 0.2}s`,
                  }}
                >
                  <div
                    className={`w-3 h-3 rounded-full transform transition-all duration-300
                      ${isDark ? "bg-cyan-500" : "bg-cyan-600"}
                      group-hover:scale-150 group-hover:shadow-lg
                      ${
                        isDark
                          ? "group-hover:shadow-cyan-500/50"
                          : "group-hover:shadow-cyan-600/50"
                      }
                    `}
                  />
                  <div
                    className={`absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-xs
                      opacity-0 group-hover:opacity-100 transition-all duration-300
                      ${
                        isDark
                          ? "bg-gray-700 text-gray-300"
                          : "bg-white text-gray-600"
                      }
                    `}
                  >
                    ${((Math.sin(i) + 2) * 1000).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Gradient Area */}
            <div
              className="absolute inset-x-0 bottom-0 h-1/2"
              style={{
                background: `linear-gradient(to bottom, ${
                  isDark ? "rgba(6, 182, 212, 0.1)" : "rgba(8, 145, 178, 0.1)"
                } 0%, transparent 100%)`,
                animation: "waveFill 3s infinite ease-in-out",
              }}
            />
          </div>
        </div>
      ) : (
        <div className="absolute inset-0">
          {/* Improved grid background */}
          <div className="absolute inset-0 grid grid-cols-8 gap-x-[12.5%]">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className={`w-px h-full ${
                  isDark ? "bg-gray-700/30" : "bg-gray-200/30"
                }`}
                style={{ left: `${(i + 1) * 12.5}%` }}
              />
            ))}
          </div>

          {/* Improved candlestick animation */}
          <div className="absolute inset-x-6 bottom-8 top-8 flex items-end justify-between">
            {[...Array(8)].map((_, i) => {
              const isUp = Math.random() > 0.5;
              const heightPercent = 30 + Math.random() * 40;
              return (
                <div
                  key={i}
                  className="group flex flex-col items-center w-3"
                  style={{
                    height: `${heightPercent}%`,
                    animationDelay: `${i * 0.05}s`,
                  }}
                >
                  <div
                    className={`w-0.5 h-4 transform origin-bottom transition-transform duration-300 ${
                      isDark ? "bg-gray-600" : "bg-gray-300"
                    } group-hover:scale-y-110`}
                  />
                  <div
                    className={`w-full transition-all duration-300 ${
                      isUp
                        ? isDark
                          ? "bg-cyan-500/40"
                          : "bg-cyan-400/40"
                        : isDark
                        ? "bg-rose-500/40"
                        : "bg-rose-400/40"
                    } group-hover:opacity-80`}
                    style={{ height: `${20 + Math.random() * 30}%` }}
                  />
                  <div
                    className={`w-0.5 h-4 transform origin-top transition-transform duration-300 ${
                      isDark ? "bg-gray-600" : "bg-gray-300"
                    } group-hover:scale-y-110`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
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
  const [ready, setReady] = useState(false);
  const [timeRange, setTimeRange] = useState("7");
  const [chartType, setChartType] = useState("line");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const timeRanges = [
    { label: "24H", value: "1" },
    { label: "7D", value: "7" },
    { label: "30D", value: "30" },
    { label: "90D", value: "90" },
    { label: "1Y", value: "365" },
  ];

  const chartTypes = [
    { label: "Line", value: "line" },
    { label: "Candle", value: "candle" },
  ];

  useEffect(() => {
    setLoading(true);
    setReady(false);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // Changed from previous value to 500ms

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

  // Add refresh handler
  const handleRefresh = async () => {
    setIsRefreshing(true);
    setLoading(true);
    setReady(false);

    // Reset states to trigger data refresh
    setTimeout(() => {
      setLoading(false);
      setIsRefreshing(false);
    }, 500);
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
        {/* Controls Container - separate mobile and desktop layouts */}
        <div className="lg:hidden flex flex-col gap-4 mb-6">
          {/* Mobile First Row: Back, Refresh, Chart Types */}
          <div className="flex items-center justify-between">
            {/* Back and Refresh buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate(-1)}
                className={`h-[42px] flex items-center gap-2 px-4 rounded-lg border ${
                  isDark
                    ? "bg-gray-800 hover:bg-gray-700 text-gray-300 border-gray-700"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-600 border-gray-300"
                }`}
              >
                <img
                  src={chevronLeft}
                  alt="Back"
                  className={`w-5 h-5 ${isDark ? "invert" : ""}`}
                />
                {translations[lang].chart.back}
              </button>

              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className={`h-[42px] aspect-square flex items-center justify-center rounded-lg border ${
                  isDark
                    ? "bg-gray-800 border-gray-700 hover:bg-gray-700"
                    : "bg-gray-100 border-gray-300 hover:bg-gray-200"
                }`}
              >
                <img
                  src={refreshIcon}
                  alt="Refresh"
                  className={`w-5 h-5 ${isDark ? "invert" : ""} ${
                    isRefreshing ? "animate-spin" : ""
                  }`}
                />
              </button>
            </div>

            {/* Chart Type Controls - Now side by side */}
            <div className="flex gap-2">
              {chartTypes.map(({ label, value }) => (
                <TimeRangeButton
                  key={value}
                  active={chartType === value}
                  onClick={() => handleChartTypeChange(value)}
                  isDark={isDark}
                >
                  {label}
                </TimeRangeButton>
              ))}
            </div>
          </div>

          {/* Mobile Second Row: Time Range Buttons */}
          <div className={`grid grid-cols-5 gap-2 w-full`}>
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
        </div>

        {/* Desktop Controls - hidden on mobile */}
        <div className="hidden lg:flex items-center justify-between gap-4 mb-6 w-full">
          {/* Left side - Back and Refresh */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(-1)}
              className={`h-[42px] flex items-center gap-2 px-4 rounded-lg border ${
                isDark
                  ? "bg-gray-800 hover:bg-gray-700 text-gray-300 border-gray-700"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-600 border-gray-300"
              }`}
            >
              <img
                src={chevronLeft}
                alt="Back"
                className={`w-5 h-5 ${isDark ? "invert" : ""}`}
              />
              {translations[lang].chart.back}
            </button>

            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className={`h-[42px] aspect-square flex items-center justify-center rounded-lg border ${
                isDark
                  ? "bg-gray-800 border-gray-700 hover:bg-gray-700"
                  : "bg-gray-100 border-gray-300 hover:bg-gray-200"
              }`}
            >
              <img
                src={refreshIcon}
                alt="Refresh"
                className={`w-5 h-5 ${isDark ? "invert" : ""} ${
                  isRefreshing ? "animate-spin" : ""
                }`}
              />
            </button>
          </div>

          {/* Center - Time Range Buttons */}
          <div className="flex justify-center flex-1">
            <div
              className={`flex gap-2 p-1 rounded-xl ${
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
          </div>

          {/* Right side - Chart Type Controls */}
          <div
            className={`flex gap-2 p-1 rounded-xl ${
              isDark ? "bg-gray-800" : "bg-gray-100"
            }`}
          >
            {chartTypes.map(({ label, value }) => (
              <TimeRangeButton
                key={value}
                active={chartType === value}
                onClick={() => handleChartTypeChange(value)}
                isDark={isDark}
              >
                {label}
              </TimeRangeButton>
            ))}
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
              <ChartSkeleton isDark={isDark} chartType={chartType} />
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
