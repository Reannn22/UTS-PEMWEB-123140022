import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

// Update Logo component
function Logo({ isDark }) {
  return (
    <div className="flex items-center">
      <span className="text-base font-bold">
        {" "}
        {/* Reduced from text-lg */}
        <span className={`${isDark ? "text-primary-400" : "text-primary-500"}`}>
          Crypto
        </span>
        <span className={isDark ? "text-white" : "text-gray-900"}>Tracker</span>
      </span>
    </div>
  );
}

// Navigation items with hover effects
const navigationItems = [
  { label: "Markets", href: "#markets" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Trending", href: "#trending" },
  { label: "Settings", href: "#settings" },
];

// Update SearchBar component
function SearchBar({ isDark }) {
  return (
    <div className="relative hidden md:block">
      <input
        type="text"
        placeholder="Search coins..."
        className={`
          w-48 pl-6 pr-2 py-0.5 rounded-full text-xs
          ${
            isDark
              ? "bg-gray-800/50 text-white placeholder:text-gray-400"
              : "bg-gray-100 text-gray-900 placeholder:text-gray-500"
          }
          focus:outline-none focus:ring-1 focus:ring-primary-500
        `}
      />
      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs">
        🔍
      </span>
    </div>
  );
}

const Header = ({ onRefresh, loading }) => {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!loading) {
      setLastUpdated(new Date());
    }
  }, [loading]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`fixed w-full top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-gradient-to-r from-primary-600/90 to-primary-700/90 backdrop-blur-md shadow-sm"
            : "bg-gradient-to-r from-primary-600 to-primary-700"
        }`}
      >
        <div className="container mx-auto px-2">
          {" "}
          {/* Reduced padding */}
          <nav className="flex items-center justify-between h-8">
            {" "}
            {/* Reduced from h-10 */}
            {/* Logo */}
            <Logo isDark={isDark} />
            {/* Search Bar */}
            <SearchBar isDark={isDark} />
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {" "}
              {/* Reduced spacing */}
              {navigationItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-white/80 hover:text-white transition-colors text-xs font-medium" // Reduced text size
                >
                  {item.label}
                </a>
              ))}
            </div>
            {/* Actions Group */}
            <div className="flex items-center gap-2">
              {" "}
              {/* Reduced gap */}
              {/* Last Updated */}
              <div className="hidden lg:block text-white/80 text-sm">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </div>
              {/* Theme Toggle */}
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Toggle theme"
              >
                {isDark ? "☀️" : "🌙"}
              </button>
              {/* Refresh Button */}
              <button
                onClick={onRefresh}
                disabled={loading}
                className="refresh-button whitespace-nowrap"
              >
                {loading ? (
                  <div className="spinner w-5 h-5 border-2 border-white border-t-transparent" />
                ) : (
                  "🔄 Refresh"
                )}
              </button>
              {/* Mobile Menu Button */}
              <button
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <div className="w-6 h-6 flex flex-col justify-around">
                  <span
                    className={`block h-0.5 w-full bg-white transform transition-all duration-300 ${
                      isMenuOpen ? "rotate-45 translate-y-2.5" : ""
                    }`}
                  />
                  <span
                    className={`block h-0.5 w-full bg-white transition-all duration-300 ${
                      isMenuOpen ? "opacity-0" : ""
                    }`}
                  />
                  <span
                    className={`block h-0.5 w-full bg-white transform transition-all duration-300 ${
                      isMenuOpen ? "-rotate-45 -translate-y-2.5" : ""
                    }`}
                  />
                </div>
              </button>
            </div>
          </nav>
        </div>
      </header>
      {/* Reduced height spacer */}
      <div className="h-8" /> {/* Reduced from h-10 */}
    </>
  );
};

Header.propTypes = {
  onRefresh: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Header;
