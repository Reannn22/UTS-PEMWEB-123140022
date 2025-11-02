import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../utils/translations";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import ScrollToTop from "../common/ScrollToTop";
import searchIcon from "../../assets/icons/search.svg";
import { getCoinsMarkets, getCoinDetail } from "../../utils/api";
import { formatCurrency } from "../../utils/helpers";

export default function PortfolioCalculator() {
  const { isDark } = useTheme();
  const { lang } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [coins, setCoins] = useState([]);
  const [portfolio, setPortfolio] = useState(() => {
    const saved = localStorage.getItem("portfolio");
    return saved ? JSON.parse(saved) : [];
  });
  const [totalValue, setTotalValue] = useState(0);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [amount, setAmount] = useState("");
  const t = translations[lang]?.portfolio || {};

  // Fetch coins for search
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const data = await getCoinsMarkets({
          vs_currency: lang === "id" ? "idr" : "usd",
          order: "market_cap_desc",
          per_page: 100,
          sparkline: false,
        });
        setCoins(data);
      } catch (error) {
        console.error("Error fetching coins:", error);
      }
    };
    fetchCoins();
  }, [lang]);

  // Filter coins based on search
  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Add coin to portfolio with currency conversion
  const handleAddCoin = async () => {
    if (!selectedCoin || !amount) return;

    try {
      const coinData = await getCoinDetail(selectedCoin.id);
      const currentPrice = coinData.market_data.current_price[lang === "id" ? "idr" : "usd"];
      const value = currentPrice * parseFloat(amount);

      setPortfolio((prev) => [
        ...prev,
        {
          id: selectedCoin.id,
          name: selectedCoin.name,
          symbol: selectedCoin.symbol,
          amount: parseFloat(amount),
          price: currentPrice,
          value,
          currency: lang === "id" ? "idr" : "usd" // Store currency type
        },
      ]);

      setSelectedCoin(null);
      setAmount("");
    } catch (error) {
      console.error("Error adding coin:", error);
    }
  };

  // Update currency when language changes
  useEffect(() => {
    const updatePortfolioCurrency = async () => {
      try {
        const updatedPortfolio = await Promise.all(
          portfolio.map(async (coin) => {
            const coinData = await getCoinDetail(coin.id);
            const newPrice = coinData.market_data.current_price[lang === "id" ? "idr" : "usd"];
            const newValue = newPrice * coin.amount;
            return {
              ...coin,
              price: newPrice,
              value: newValue,
              currency: lang === "id" ? "idr" : "usd"
            };
          })
        );
        setPortfolio(updatedPortfolio);
      } catch (error) {
        console.error("Error updating portfolio currency:", error);
      }
    };

    if (portfolio.length > 0) {
      updatePortfolioCurrency();
    }
  }, [lang]); // Update when language changes

  // Save to localStorage whenever portfolio changes
  useEffect(() => {
    localStorage.setItem("portfolio", JSON.stringify(portfolio));
  }, [portfolio]);

  // Calculate total value
  useEffect(() => {
    const total = portfolio.reduce((sum, coin) => sum + coin.value, 0);
    setTotalValue(total);
  }, [portfolio]);

  return (
    <div
      className={`flex flex-col min-h-screen ${
        isDark ? "bg-gray-900" : "bg-white"
      }`}
    >
      <Header />
      <ScrollToTop />

      <main className="flex-1 container mx-auto px-4 py-8 mt-16">
        <div
          className={`p-6 rounded-xl ${
            isDark ? "bg-gray-800/50" : "bg-gray-50"
          }`}
        >
          {/* Search and Add Section */}
          <div className="mb-6 space-y-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className={`w-full px-4 pl-10 py-3 rounded-lg outline-none ${
                  isDark
                    ? "bg-gray-800 text-gray-300 placeholder-gray-500"
                    : "bg-gray-100 text-gray-900 placeholder-gray-500"
                }`}
              />
              <img
                src={searchIcon}
                alt="Search"
                className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                  isDark ? "invert" : ""
                }`}
              />
            </div>

            {searchQuery && (
              <div
                className={`max-h-60 overflow-y-auto rounded-lg border no-scrollbar ${
                  isDark ? "border-gray-700" : "border-gray-200"
                }`}
              >
                {filteredCoins.map((coin) => (
                  <button
                    key={coin.id}
                    onClick={() => {
                      setSelectedCoin(coin);
                      setSearchQuery(coin.name); // Set search query to selected coin name
                    }}
                    className={`w-full px-4 py-3 text-left hover:bg-opacity-50 ${
                      isDark
                        ? "hover:bg-gray-700 text-gray-300"
                        : "hover:bg-gray-100 text-gray-600"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={coin.image}
                        alt={coin.name}
                        className="w-6 h-6"
                      />
                      <span className="font-medium">{coin.name}</span>
                      <span className="text-sm opacity-75">
                        ({coin.symbol.toUpperCase()})
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {selectedCoin && (
              <div className="flex gap-4">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Amount"
                  className={`flex-1 px-4 py-3 rounded-lg outline-none no-spinners ${
                    isDark
                      ? "bg-gray-800 text-gray-300"
                      : "bg-gray-100 text-gray-900"
                  }`}
                />
                <button
                  onClick={handleAddCoin}
                  className={`px-6 py-3 rounded-lg font-medium ${
                    isDark
                      ? "bg-cyan-600 text-white hover:bg-cyan-700"
                      : "bg-cyan-500 text-white hover:bg-cyan-600"
                  }`}
                >
                  {t.addCoin}
                </button>
              </div>
            )}
          </div>

          {/* Portfolio List */}
          <div
            className={`rounded-lg border ${
              isDark ? "border-gray-700" : "border-gray-200"
            }`}
          >
            {portfolio.length > 0 ? (
              <>
                <div className="space-y-2">
                  {portfolio.map((coin, index) => (
                    <div
                      key={`${coin.id}-${index}`}
                      className={`p-4 flex items-center justify-between ${
                        isDark ? "bg-gray-800/50" : "bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`font-medium ${
                            isDark ? "text-gray-300" : "text-gray-900"
                          }`}
                        >
                          {coin.name}
                        </span>
                        <span
                          className={`text-sm ${
                            isDark ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {coin.amount} {coin.symbol.toUpperCase()}
                        </span>
                      </div>
                      <span
                        className={`${
                          isDark ? "text-gray-300" : "text-gray-900"
                        }`}
                      >
                        {formatCurrency(
                          coin.value,
                          lang === "id" ? "IDR" : "USD"
                        )}
                      </span>
                    </div>
                  ))}
                </div>

                <div
                  className={`p-4 border-t ${
                    isDark ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span
                      className={`font-medium ${
                        isDark ? "text-gray-300" : "text-gray-900"
                      }`}
                    >
                      {t.totalValue}
                    </span>
                    <span
                      className={`font-bold ${
                        isDark ? "text-cyan-400" : "text-cyan-600"
                      }`}
                    >
                      {formatCurrency(
                        totalValue,
                        lang === "id" ? "IDR" : "USD"
                      )}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <div className="py-12 text-center">
                <p
                  className={`text-lg ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {t.emptyPortfolio}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
