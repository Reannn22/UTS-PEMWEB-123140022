import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";
import { getCoinMarketChart } from "../../utils/api";
import { formatCurrency } from "../../utils/helpers";
import { Chart } from "react-chartjs-2"; // Add this import

// Move these imports to the top
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  TimeSeriesScale,
} from "chart.js";
import {
  CandlestickController,
  CandlestickElement,
} from "chartjs-chart-financial"; // Changed from OhlcElement

// --- BARU: Impor adapter tanggal ---
import "chartjs-adapter-date-fns";

// Register components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  TimeSeriesScale,
  CandlestickController,
  CandlestickElement // Changed from OhlcElement
);

const PriceChart = ({
  coinId,
  timeRange = "7",
  chartType = "line",
  onReady,
}) => {
  const { lang } = useLanguage();
  const { isDark } = useTheme();
  const [chartData, setChartData] = useState({ datasets: [] }); // State awal kosong
  const [error, setError] = useState(null);

  // --- BARU: useEffect di-trigger oleh chartType ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);

        // Always get data from getCoinMarketChart for both chart types
        const data = await getCoinMarketChart(coinId, parseInt(timeRange));
        if (!data?.prices?.length) {
          throw new Error("Invalid chart data received");
        }

        if (chartType === "line") {
          const formattedData = data.prices.map(([timestamp, price]) => ({
            x: timestamp,
            y: lang === "id" ? price * 15500 : price,
          }));

          setChartData({
            datasets: [
              {
                data: formattedData,
                borderColor: "#0ea5e9",
                backgroundColor: "rgba(14, 165, 233, 0.1)",
                fill: true,
                tension: 0.4,
              },
            ],
          });
        } else if (chartType === "candle") {
          // Convert price data to OHLC format using time windows
          const candleData = [];
          const timeWindow = 3600000; // 1 hour in milliseconds

          let currentWindow = {
            timestamp: data.prices[0][0],
            open: data.prices[0][1],
            high: data.prices[0][1],
            low: data.prices[0][1],
            close: data.prices[0][1],
          };

          data.prices.forEach(([timestamp, price]) => {
            if (timestamp - currentWindow.timestamp > timeWindow) {
              // Add completed candle
              candleData.push({
                x: currentWindow.timestamp,
                o: lang === "id" ? currentWindow.open * 15500 : currentWindow.open,
                h: lang === "id" ? currentWindow.high * 15500 : currentWindow.high,
                l: lang === "id" ? currentWindow.low * 15500 : currentWindow.low,
                c: lang === "id" ? currentWindow.close * 15500 : currentWindow.close,
              });

              // Start new window
              currentWindow = {
                timestamp,
                open: price,
                high: price,
                low: price,
                close: price,
              };
            } else {
              // Update current window
              currentWindow.high = Math.max(currentWindow.high, price);
              currentWindow.low = Math.min(currentWindow.low, price);
              currentWindow.close = price;
            }
          });

          setChartData({
            datasets: [
              {
                data: candleData,
              },
            ],
          });
        }

        onReady?.();
      } catch (err) {
        setError(err.message);
      }
    };

    if (coinId) {
      fetchData();
    }
    // --- BARU: Tambahkan chartType sebagai dependency ---
  }, [coinId, timeRange, lang, chartType, onReady]);

  // --- BARU: Opsi chart yang dinamis ---
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 750,
      easing: "easeInOutQuart",
      mode: "active",
      delay: (context) => {
        // Add progressive delay for each data point
        return context.dataIndex * 5;
      },
    },
    transitions: {
      active: {
        animation: {
          duration: 400,
          easing: "easeOutCubic",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        // --- PERBAIKAN: Menghilangkan kotak warna/logo ---
        displayColors: false,
        // ------------------------------------------------
        backgroundColor: isDark ? "rgb(31, 41, 55)" : "rgb(255, 255, 255)",
        titleColor: isDark ? "rgb(229, 231, 235)" : "rgb(17, 24, 39)",
        bodyColor: isDark ? "rgb(229, 231, 235)" : "rgb(17, 24, 39)",
        borderColor: isDark ? "rgb(55, 65, 81)" : "rgb(229, 231, 235)",
        borderWidth: 1,
        // --- BARU: Tooltip dinamis untuk line vs candle ---
        callbacks: {
          title: (tooltipItems) => {
            // Format tanggal dari timestamp
            return new Date(tooltipItems[0].parsed.x).toLocaleString(
              lang === "id" ? "id-ID" : "en-US",
              {
                dateStyle: "medium",
                timeStyle: "short",
              }
            );
          },
          label: (context) => {
            // Tooltip untuk Candlestick
            if (chartType === "candle") {
              const ohlc = context.raw;
              const format = (val) =>
                formatCurrency(val, lang === "id" ? "IDR" : "USD");
              return `O: ${format(ohlc.o)} H: ${format(ohlc.h)} L: ${format(
                ohlc.l
              )} C: ${format(ohlc.c)}`;
            }
            // Tooltip untuk Line Chart
            return formatCurrency(
              context.parsed.y,
              lang === "id" ? "IDR" : "USD"
            );
          },
        },
      },
      // --- BARU: Opsi styling untuk chart financial ---
      financial: {
        color: {
          up: isDark ? "#22D3EE" : "#0E7490", // Cyan
          down: "#F43F5E", // Red
          unchanged: isDark ? "#9CA3AF" : "#6B7280",
        },
        borderColor: {
          up: isDark ? "#22D3EE" : "#0E7490",
          down: "#F43F5E",
          unchanged: isDark ? "#9CA3AF" : "#6B7280",
        },
      },
    },
    scales: {
      x: {
        // --- BARU: Menggunakan 'timeseries' untuk kedua chart ---
        type: "timeseries",
        time: {
          unit: timeRange <= 2 ? "hour" : "day", // Unit dinamis
          tooltipFormat: "PPp", // Format tooltip
        },
        grid: {
          display: false,
        },
        ticks: {
          color: isDark ? "#9ca3af" : "#4b5563",
          maxRotation: 0,
          source: "auto", // Biarkan chart.js memilih tick terbaik
        },
        // Add smooth axis transitions
        transitions: {
          scale: {
            duration: 500,
            easing: "easeInOutSine",
          },
        },
      },
      y: {
        position: "left",
        grace: "5%",
        grid: {
          color: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          color: isDark ? "#9ca3af" : "#4b5563",
          callback: (value) =>
            formatCurrency(value, lang === "id" ? "IDR" : "USD"),
        },
        // Add smooth axis transitions
        transitions: {
          scale: {
            duration: 500,
            easing: "easeInOutSine",
          },
        },
      },
    },
    elements: {
      line: {
        tension: 0.4, // Makes the line smoother
      },
      point: {
        radius: 0, // Hide points by default
        hitRadius: 8, // Area for hover detection
        hoverRadius: 4, // Show points on hover
        hoverBorderWidth: 2,
        transitions: {
          active: {
            animation: {
              duration: 300,
            },
          },
        },
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
    hover: {
      animationDuration: 300,
      mode: "nearest",
    },
    // --- BARU: Hapus 'type: "line"' yang hardcoded ---
  };

  return (
    <div className="h-[550px] w-full">
      {error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <Chart
          type={chartType === "candle" ? "candlestick" : "line"}
          data={chartData}
          options={{
            ...options,
            transitions: false, // Disable all transitions
          }}
        />
      )}
    </div>
  );
};

PriceChart.propTypes = {
  coinId: PropTypes.string.isRequired,
  timeRange: PropTypes.string,
  chartType: PropTypes.string,
  onReady: PropTypes.func,
};

export default PriceChart;
