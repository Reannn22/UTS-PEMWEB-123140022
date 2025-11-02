import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";
// --- BARU: Impor 'getCoinOhlc' (Anda harus membuatnya di api.js) ---
import { getCoinMarketChart, getCoinOhlc } from "../../utils/api";
import { formatCurrency } from "../../utils/helpers";
import { translations } from "../../utils/translations";

// --- BARU: Impor <Chart> generik, bukan <Line> ---
import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale, // <-- BARU: Untuk skala waktu
  TimeSeriesScale, // <-- BARU: Untuk skala waktu
} from "chart.js";

// --- BARU: Impor adapter tanggal ---
import "chartjs-adapter-date-fns";

// --- BARU: Impor controller Candlestick ---
import {
  CandlestickController,
  OhlcElement,
} from "chartjs-chart-financial";

// --- BARU: Daftarkan komponen baru ---
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
  OhlcElement
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
  const chartRef = useRef(null);

  // --- BARU: useEffect di-trigger oleh chartType ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null); // Reset error
        let formattedData;

        // --- Logika untuk Tipe Chart Garis (Line) ---
        if (chartType === "line") {
          const data = await getCoinMarketChart(coinId, parseInt(timeRange));
          if (!data?.prices?.length) {
            throw new Error("Invalid chart data received");
          }

          formattedData = data.prices.map(([timestamp, price]) => ({
            x: timestamp, // Gunakan timestamp untuk skala timeseries
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

        // --- Logika untuk Tipe Chart Lilin (Candle) ---
        } else if (chartType === "candle") {
          // Anda HARUS membuat fungsi 'getCoinOhlc' di 'utils/api.js'
          // Endpoint-nya: /api/v3/coins/{id}/ohlc?vs_currency=usd&days={timeRange}
          const data = await getCoinOhlc(coinId, parseInt(timeRange));
          if (!data?.length) {
            throw new Error("Invalid OHLC data received");
          }

          formattedData = data.map(
            ([timestamp, open, high, low, close]) => ({
              x: timestamp,
              o: lang === "id" ? open * 15500 : open,
              h: lang === "id" ? high * 15500 : high,
              l: lang === "id" ? low * 15500 : low,
              c: lang === "id" ? close * 15500 : close,
            })
          );

          setChartData({
            datasets: [
              {
                data: formattedData,
                // Styling akan di-handle di options
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
      },
    },
    interaction: {
      mode: "nearest",
      intersect: false,
    },
    // --- BARU: Hapus 'type: "line"' yang hardcoded ---
  };

  return (
    // Saya kembalikan ke 400px, 550px terlihat terlalu besar di skeleton
    <div className="h-[550px] w-full">
      {error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        // --- BARU: Gunakan <Chart /> generik ---
        <Chart
          ref={chartRef}
          type={chartType === "candle" ? "candlestick" : "line"}
          data={chartData}
          options={options}
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
