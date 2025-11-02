import { useState, useEffect, useCallback } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../utils/translations"; // Changed this line
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { formatCurrency } from "../../utils/helpers";

export default function PortfolioCalculator() {
  const { isDark } = useTheme();
  const { lang } = useLanguage();
  const [coins, setCoins] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCoins, setSelectedCoins] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [allocations, setAllocations] = useState({});

  const t = translations[lang].portfolioCalculator;

  // Fetch coins data
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&sparkline=false"
        );
        const data = await response.json();
        setCoins(data);
      } catch (error) {
        console.error("Error fetching coins:", error);
      }
    };
    fetchCoins();
  }, []);

  // Calculate total value and allocations
  const calculatePortfolio = useCallback(() => {
    const total = selectedCoins.reduce((sum, coin) => {
      return (
        sum + (parseFloat(coin.amount) || 0) * (parseFloat(coin.price) || 0)
      );
    }, 0);

    const newAllocations = {};
    selectedCoins.forEach((coin) => {
      const coinValue =
        (parseFloat(coin.amount) || 0) * (parseFloat(coin.price) || 0);
      newAllocations[coin.id] = (coinValue / total) * 100;
    });

    setTotalValue(total);
    setAllocations(newAllocations);
  }, [selectedCoins]);

  useEffect(() => {
    calculatePortfolio();
  }, [selectedCoins, calculatePortfolio]);

  const addCoin = (coin) => {
    if (!selectedCoins.find((c) => c.id === coin.id)) {
      setSelectedCoins([
        ...selectedCoins,
        {
          id: coin.id,
          symbol: coin.symbol,
          name: coin.name,
          image: coin.image,
          price: coin.current_price,
          amount: "",
        },
      ]);
    }
  };

  const handleAmountChange = (id, value) => {
    const numericValue = value.replace(/[^0-9.]/g, "");

    setSelectedCoins(
      selectedCoins.map((coin) => {
        if (coin.id === id) {
          return {
            ...coin,
            amount: numericValue,
            totalValue: numericValue * coin.price,
          };
        }
        return coin;
      })
    );
  };

  const getTotalPortfolioValue = () => {
    return selectedCoins.reduce((total, coin) => {
      return total + parseFloat(coin.amount || 0) * coin.price;
    }, 0);
  };

  const updateCoinAmount = (id, amount) => {
    setSelectedCoins(
      selectedCoins.map((coin) => (coin.id === id ? { ...coin, amount } : coin))
    );
  };

  const removeCoin = (id) => {
    setSelectedCoins(selectedCoins.filter((coin) => coin.id !== id));
  };

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`min-h-screen ${isDark ? "bg-gray-900" : "bg-white"}`}>
      <Header />

      <main className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-8">
            <h1
              className={`text-3xl font-bold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            ></h1>

            {/* Search Input */}
            <div className="relative mb-6">
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg outline-none ${
                  isDark
                    ? "bg-gray-800 text-gray-300 placeholder-gray-500"
                    : "bg-gray-100 text-gray-900 placeholder-gray-500"
                }`}
              />
            </div>
          </div>

          {/* Portfolio Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Holdings List */}
            <div className="lg:col-span-2">
              <div
                className={`rounded-xl ${
                  isDark ? "bg-gray-800" : "bg-white"
                } shadow-lg`}
              >
                <div className="p-6">
                  <h2
                    className={`text-xl font-semibold mb-6 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {t.holdings}
                  </h2>
                  <div className="space-y-4">
                    {selectedCoins.map((coin) => (
                      <div
                        key={coin.id}
                        className={`p-4 rounded-xl transition-all duration-300 ${
                          isDark ? "bg-gray-700/50" : "bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={coin.image}
                              alt={coin.name}
                              className="w-10 h-10"
                            />
                            <div>
                              <div
                                className={`font-medium ${
                                  isDark ? "text-white" : "text-gray-900"
                                }`}
                              >
                                {coin.name}
                              </div>
                              <div
                                className={`text-sm ${
                                  isDark ? "text-gray-400" : "text-gray-500"
                                }`}
                              >
                                {formatCurrency(
                                  coin.price,
                                  lang === "id" ? "IDR" : "USD"
                                )}
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => removeCoin(coin.id)}
                            className="text-red-500 hover:text-red-600 transition-colors"
                          >
                            ×
                          </button>
                        </div>

                        <div className="flex gap-4 items-center">
                          <div className="flex-1">
                            <label
                              className={`block text-sm mb-1 ${
                                isDark ? "text-gray-300" : "text-gray-600"
                              }`}
                            >
                              Amount
                            </label>
                            <input
                              type="text"
                              value={coin.amount || ""}
                              onChange={(e) =>
                                handleAmountChange(coin.id, e.target.value)
                              }
                              placeholder="0.00"
                              className={`w-full px-4 py-2 rounded-lg ${
                                isDark
                                  ? "bg-gray-600 text-white"
                                  : "bg-white text-gray-900"
                              } border ${
                                isDark ? "border-gray-600" : "border-gray-200"
                              } focus:ring-2 focus:ring-cyan-500`}
                            />
                          </div>
                          <div className="text-right">
                            <div
                              className={`text-sm mb-1 ${
                                isDark ? "text-gray-300" : "text-gray-600"
                              }`}
                            >
                              Value
                            </div>
                            <div
                              className={`font-medium ${
                                isDark ? "text-cyan-400" : "text-cyan-600"
                              }`}
                            >
                              {formatCurrency(
                                (parseFloat(coin.amount) || 0) * coin.price,
                                lang === "id" ? "IDR" : "USD"
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {selectedCoins.length === 0 && (
                      <div
                        className={`text-center py-8 ${
                          isDark ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {t.noCoins}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Card */}
            <div className="lg:sticky lg:top-24 h-fit">
              <div
                className={`rounded-xl ${
                  isDark ? "bg-gray-800" : "bg-white"
                } shadow-lg p-6`}
              >
                <h2
                  className={`text-xl font-semibold mb-6 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Portfolio Summary
                </h2>

                <div className="space-y-4">
                  <div
                    className={`p-4 rounded-lg ${
                      isDark ? "bg-gray-700" : "bg-gray-50"
                    }`}
                  >
                    <div className="text-sm mb-1 text-gray-500">
                      Total Value
                    </div>
                    <div
                      className={`text-2xl font-bold ${
                        isDark ? "text-cyan-400" : "text-cyan-600"
                      }`}
                    >
                      {formatCurrency(
                        getTotalPortfolioValue(),
                        lang === "id" ? "IDR" : "USD"
                      )}
                    </div>
                  </div>

                  <div
                    className={`p-4 rounded-lg ${
                      isDark ? "bg-gray-700" : "bg-gray-50"
                    }`}
                  >
                    <div className="text-sm mb-2 text-gray-500">Assets</div>
                    <div className="space-y-2">
                      {selectedCoins.map((coin) => (
                        <div
                          key={coin.id}
                          className="flex justify-between items-center"
                        >
                          <div className="flex items-center gap-2">
                            <img
                              src={coin.image}
                              alt={coin.name}
                              className="w-5 h-5"
                            />
                            <span
                              className={
                                isDark ? "text-gray-300" : "text-gray-600"
                              }
                            >
                              {coin.symbol.toUpperCase()}
                            </span>
                          </div>
                          <span
                            className={isDark ? "text-white" : "text-gray-900"}
                          >
                            {parseFloat(coin.amount || 0).toLocaleString(
                              undefined,
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 8,
                              }
                            )}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
