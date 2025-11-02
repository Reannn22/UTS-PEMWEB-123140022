import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import { Header, Footer, Loading, ScrollToTop } from "../../components";
import {
  formatCurrency,
  formatNumber,
  formatPercentage,
} from "../../utils/helpers";
import chevronLeft from "../../assets/icons/chevron-left.svg";
import chevronRight from "../../assets/icons/chevron-right.svg";
import { translations } from "../../utils/translations";
import { useNavigate } from "react-router-dom";

export default function CryptocurrencyList() {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const { lang } = useLanguage();
  const t = translations[lang].cryptoList;
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 10; // Changed from 0 to 10
  const maxVisiblePages = 5;
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // Change default to all
  const [filteredCoins, setFilteredCoins] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const page = parseInt(params.get("page")) || 1;
    const searchParam = params.get("search") || "";
    const filterParam = params.get("filter") || "all"; // Change default

    setCurrentPage(page);
    setSearch(searchParam);
    setFilter(filterParam);
    fetchCoins(page);
  }, []);

  // Remove language dependency from fetchCoins
  const fetchCoins = async (page, showLoading = true) => {
    try {
      if (showLoading) setLoading(true);
      // Add 1 second delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Always fetch in USD, we'll convert later
      const response = await fetch(
        `${process.env.REACT_APP_COINGECKO_API_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=false`
      );
      const data = await response.json();
      setCoins(data);
      setTotalPages(Math.ceil(100 / perPage)); // CoinGecko free tier limits to 100 results
      if (showLoading) setLoading(false);
    } catch (error) {
      console.error("Error fetching coins:", error);
      if (showLoading) setLoading(false);
    }
  };

  // Remove the language change effect since we don't need to refetch
  useEffect(() => {
    fetchCoins(currentPage, false);
  }, []); // Only fetch on mount

  // Add currency conversion helper
  const convertPrice = (priceUSD) => {
    const rate = lang === "id" ? 15500 : 1; // Approximate IDR rate
    return priceUSD * rate;
  };

  useEffect(() => {
    let result = [...coins];

    // Apply search filter
    if (search) {
      result = result.filter(
        (coin) =>
          coin.name.toLowerCase().includes(search.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply category filter
    switch (filter) {
      case "all":
        // Sort alphabetically by name
        result = result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "trending":
        result = result
          .sort((a, b) => b.market_cap - a.market_cap)
          .slice(0, 10);
        break;
      case "gainers":
        result = result.sort(
          (a, b) =>
            b.price_change_percentage_24h - a.price_change_percentage_24h
        );
        break;
      case "losers":
        result = result.sort(
          (a, b) =>
            a.price_change_percentage_24h - b.price_change_percentage_24h
        );
        break;
      default:
        break;
    }

    setFilteredCoins(result);
  }, [coins, search, filter]);

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const leftSide = Math.floor(maxVisiblePages / 2);
      const rightSide = maxVisiblePages - leftSide;

      if (currentPage <= leftSide + 1) {
        for (let i = 1; i <= maxVisiblePages; i++) {
          pages.push(i);
        }
        if (totalPages > maxVisiblePages) pages.push("...");
      } else if (currentPage >= totalPages - rightSide) {
        pages.push(1, "...");
        for (let i = totalPages - maxVisiblePages + 2; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1, "...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...", totalPages);
      }
    }
    return pages;
  };

  // Add function to update URL params
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

  // Update search handler
  const handleSearch = (value) => {
    setSearch(value);

    const url = new URL(window.location);
    if (value) {
      url.searchParams.set("search", value);
    } else {
      url.searchParams.delete("search");
    }
    window.history.pushState({}, "", url);

    // Sync with header
    window.dispatchEvent(
      new CustomEvent("headerSearch", { detail: { value } })
    );
  };

  // Update filter handler
  const handleFilter = (value) => {
    setFilter(value);
    updateURLParams({ filter: value === "all" ? "" : value });
  };

  // Update page change handler
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
      updateURLParams({ page: newPage });
      fetchCoins(newPage);
    }
  };

  const handleCoinClick = (coinId) => {
    navigate(`/coin/${coinId}`);
  };

  useEffect(() => {
    const handleHeaderSearch = (e) => {
      const value = e.detail.value;
      setSearch(value);
    };

    window.addEventListener("headerSearch", handleHeaderSearch);

    // Sync initial search value from URL
    const params = new URLSearchParams(window.location.search);
    const searchParam = params.get("search") || "";
    setSearch(searchParam);

    return () => {
      window.removeEventListener("headerSearch", handleHeaderSearch);
    };
  }, []);

  return (
    <div
      className={`flex flex-col min-h-screen ${
        isDark ? "bg-gray-900" : "bg-white"
      }`}
    >
      <Header />
      <ScrollToTop />
      <main className="flex-1 container mx-auto px-4 py-8 mt-16">
        <div className="max-w-7xl mx-auto">
          {/* Search and filter controls */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              {/* Search input */}
              <input
                type="text"
                placeholder={t.search}
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDark
                    ? "bg-gray-800 text-white border-gray-700 focus:border-white"
                    : "bg-white text-gray-900 border-gray-300 focus:border-gray-900"
                } focus:outline-none focus:ring-2 focus:ring-cyan-500`}
              />
            </div>
            {/* Modified filter buttons with border */}
            <div className="grid grid-cols-2 sm:flex gap-2 w-full sm:w-auto">
              {Object.entries(t.filter).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => handleFilter(key)}
                  className={`w-full sm:w-auto px-4 py-2 rounded-lg border ${
                    filter === key
                      ? isDark
                        ? "bg-cyan-600 text-white border-transparent"
                        : "bg-cyan-500 text-white border-transparent"
                      : isDark
                      ? "bg-gray-800 text-gray-300 hover:bg-gray-700 border-gray-700 hover:border-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300 hover:border-gray-900"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <Loading type="skeleton" />
          ) : (
            <>
              {/* Desktop Table View */}
              <div
                className={`hidden md:block overflow-x-auto rounded-lg border ${
                  isDark ? "border-gray-700" : "border-gray-300"
                }`}
              >
                <table className="w-full">
                  <thead
                    className={isDark ? "bg-gray-800 text-white" : "bg-gray-50"}
                  >
                    <tr>
                      <th className="p-4 text-left font-semibold">
                        {t.table.no}
                      </th>
                      <th className="p-4 text-left font-semibold">
                        {t.table.coin}
                      </th>
                      <th className="p-4 text-right font-semibold">
                        {t.table.price}
                      </th>
                      <th className="p-4 text-right font-semibold">
                        {t.table.change}
                      </th>
                      <th className="p-4 text-right font-semibold">
                        {t.table.marketCap}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCoins.map((coin, index) => (
                      <tr
                        key={coin.id}
                        onClick={() => handleCoinClick(coin.id)}
                        className={`border-t ${
                          isDark ? "border-gray-700" : "border-gray-300"
                        } cursor-pointer hover:${
                          isDark ? "bg-gray-800" : "bg-gray-50"
                        } transition-colors`}
                      >
                        <td
                          className={`p-4 ${
                            isDark ? "text-gray-300" : "text-gray-900"
                          }`}
                        >
                          {(currentPage - 1) * perPage + index + 1}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={coin.image}
                              alt={coin.name}
                              className="w-8 h-8"
                            />
                            <div>
                              <div
                                className={
                                  isDark ? "text-white" : "text-gray-900"
                                }
                              >
                                {coin.name}
                              </div>
                              <div className="text-gray-500 text-sm">
                                {coin.symbol.toUpperCase()}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td
                          className={`p-4 text-right ${
                            isDark ? "text-gray-300" : "text-gray-900"
                          }`}
                        >
                          {formatCurrency(
                            convertPrice(coin.current_price),
                            lang === "id" ? "IDR" : "USD"
                          )}
                        </td>
                        <td
                          className={`p-4 text-right ${
                            coin.price_change_percentage_24h >= 0
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {formatPercentage(coin.price_change_percentage_24h)}
                        </td>
                        <td
                          className={`p-4 text-right ${
                            isDark ? "text-gray-300" : "text-gray-900"
                          }`}
                        >
                          {formatNumber(coin.market_cap)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-4">
                {filteredCoins.map((coin, index) => (
                  <div
                    key={coin.id}
                    onClick={() => handleCoinClick(coin.id)}
                    className={`p-4 rounded-lg ${
                      isDark ? "bg-gray-800" : "bg-white"
                    } border ${
                      isDark ? "border-gray-700" : "border-gray-300"
                    } cursor-pointer hover:${
                      isDark ? "bg-gray-700" : "bg-gray-50"
                    } transition-colors`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={coin.image}
                          alt={coin.name}
                          className="w-8 h-8"
                        />
                        <div>
                          <div
                            className={isDark ? "text-white" : "text-gray-900"}
                          >
                            {coin.name}
                          </div>
                          <div className="text-gray-500 text-sm">
                            {coin.symbol.toUpperCase()}
                          </div>
                        </div>
                      </div>
                      <div
                        className={`text-sm ${
                          isDark ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        #{(currentPage - 1) * perPage + index + 1}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-500">{t.table.price}</span>
                        <span
                          className={isDark ? "text-gray-300" : "text-gray-900"}
                        >
                          {formatCurrency(
                            convertPrice(coin.current_price),
                            lang === "id" ? "IDR" : "USD"
                          )}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-gray-500">{t.table.change}</span>
                        <span
                          className={
                            coin.price_change_percentage_24h >= 0
                              ? "text-green-500"
                              : "text-red-500"
                          }
                        >
                          {formatPercentage(coin.price_change_percentage_24h)}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-gray-500">
                          {t.table.marketCap}
                        </span>
                        <span
                          className={isDark ? "text-gray-300" : "text-gray-900"}
                        >
                          {formatNumber(coin.market_cap)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Pagination */}
          <div className="mt-8 flex justify-center items-center gap-2">
            {currentPage > 1 && (
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className={`p-2 rounded-lg ${
                  isDark
                    ? "bg-gray-800 hover:bg-gray-700"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                <img
                  src={chevronLeft}
                  alt="Previous"
                  className={`w-5 h-5 ${isDark ? "filter invert" : ""}`}
                />
              </button>
            )}

            {getPageNumbers().map((pageNum, index) => (
              <button
                key={index}
                onClick={() =>
                  typeof pageNum === "number" && handlePageChange(pageNum)
                }
                className={`px-4 py-2 rounded-lg ${
                  pageNum === currentPage
                    ? isDark
                      ? "bg-cyan-600 text-white"
                      : "bg-cyan-500 text-white"
                    : pageNum === "..."
                    ? `cursor-default ${
                        isDark ? "text-white" : "text-gray-700"
                      }`
                    : isDark
                    ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {pageNum}
              </button>
            ))}

            {currentPage < totalPages && (
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className={`p-2 rounded-lg ${
                  isDark
                    ? "bg-gray-800 hover:bg-gray-700"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                <img
                  src={chevronRight}
                  alt="Next"
                  className={`w-5 h-5 ${isDark ? "filter invert" : ""}`}
                />
              </button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
