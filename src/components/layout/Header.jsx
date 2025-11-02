import { useState, useEffect, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import logoImage from "../../assets/images/logo/CryptoTracker.png";
import moonIcon from "../../assets/icons/moon.svg";
import sunIcon from "../../assets/icons/sun.svg";
import searchIcon from "../../assets/icons/search.svg";
import languagesIcon from "../../assets/icons/languages.svg";
import { translations } from "../../utils/translations";

// Update Logo component with consistent transitions
function Logo({ isDark }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-shrink-0 w-8 h-8">
        <img
          src={logoImage}
          alt="CryptoTracker"
          className="w-full h-full object-contain"
        />
      </div>
      <div className="text-xl font-bold">
        <span className={isDark ? "text-cyan-400" : "text-cyan-600"}>
          Crypto
        </span>
        <span className={isDark ? "text-cyan-400" : "text-cyan-600"}>
          Tracker
        </span>
      </div>
    </div>
  );
}

// Update icon components to use SVG files
function ThemeIcon({ isDark }) {
  return (
    <img
      src={isDark ? moonIcon : sunIcon}
      alt="Theme Toggle"
      className={`w-5 h-5 ${isDark ? "invert brightness-100" : ""}`}
    />
  );
}

function SearchIcon({ isDark }) {
  return (
    <img
      src={searchIcon}
      alt="Search"
      className={`w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity ${
        isDark ? "invert brightness-100" : ""
      }`}
    />
  );
}

function LanguageIcon({ isDark }) {
  return (
    <img
      src={languagesIcon}
      alt="Language"
      className={`w-5 h-5 ${isDark ? "invert brightness-100" : ""}`}
    />
  );
}

// Add MenuIcon component
function MenuIcon({ isOpen }) {
  return (
    <div className="relative w-6 h-6">
      <span
        className={`absolute h-0.5 w-full text-cyan-500 bg-current transform transition-all duration-300 ${
          isOpen ? "rotate-45 top-3" : "rotate-0 top-1"
        }`}
      />
      <span
        className={`absolute h-0.5 w-full text-cyan-500 bg-current top-3 transition-all duration-300 ${
          isOpen ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`absolute h-0.5 w-full text-cyan-500 bg-current transform transition-all duration-300 ${
          isOpen ? "-rotate-45 top-3" : "rotate-0 top-5"
        }`}
      />
    </div>
  );
}

const Header = () => {
  const { isDark, setIsDark } = useTheme();
  const { lang, updateLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [underlineStyle, setUnderlineStyle] = useState({ width: 0, left: 0 });
  const [redirectTimeout, setRedirectTimeout] = useState(null);
  const itemRefs = useRef([]); // Make sure this is defined before any usage
  const mobileMenuRef = useRef(null);

  itemRefs.current = []; // Reset refs array on each render

  // Add immediate redirect function
  const redirectToSearch = (value) => {
    if (value && window.location.pathname !== "/cryptocurrencylist") {
      window.location.href = `/cryptocurrencylist?search=${encodeURIComponent(
        value
      )}`;
    }
  };

  // Update navigation items with translations
  const navigationItems = useMemo(
    () => [
      { href: "/", label: translations[lang].menu.home },
      {
        href: "/cryptocurrencylist",
        label: translations[lang].menu.cryptoList,
      },
      { href: "#trending", label: translations[lang].menu.portfolio },
    ],
    [lang]
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update search handler
  const handleSearch = (value) => {
    setSearchValue(value);

    if (redirectTimeout) {
      clearTimeout(redirectTimeout);
    }

    if (window.location.pathname !== "/cryptocurrencylist") {
      const timeoutId = setTimeout(() => {
        redirectToSearch(value);
      }, 1500);
      setRedirectTimeout(timeoutId);
    } else {
      // If already on cryptocurrency list page, just update URL and trigger event
      const url = new URL(window.location);
      if (value) {
        url.searchParams.set("search", value);
      } else {
        url.searchParams.delete("search");
      }
      window.history.pushState({}, "", url);

      // Dispatch event for CryptocurrencyList component
      window.dispatchEvent(
        new CustomEvent("headerSearch", { detail: { value } })
      );
    }
  };

  // Add keypress handler
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (redirectTimeout) {
        clearTimeout(redirectTimeout);
      }
      redirectToSearch(searchValue);
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (redirectTimeout) {
        clearTimeout(redirectTimeout);
      }
    };
  }, [redirectTimeout]);

  // Add effect to sync search value from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const searchParam = params.get("search") || "";
    setSearchValue(searchParam);
  }, []);

  // Add function to check if menu item is active
  const isMenuActive = (href) => {
    if (href === "/") {
      return (
        window.location.pathname === "/" || window.location.pathname === ""
      );
    }
    if (href === "/cryptocurrencylist") {
      return window.location.pathname === "/cryptocurrencylist";
    }
    return window.location.hash === href;
  };

  // Update the effect to also run when navigationItems change
  useEffect(() => {
    const activeItem = itemRefs.current.find((_, index) =>
      isMenuActive(navigationItems[index].href)
    );
    if (activeItem) {
      const textSpan = activeItem.querySelector("span");
      const rect = textSpan.getBoundingClientRect();
      setUnderlineStyle({
        width: rect.width,
        left: activeItem.offsetLeft + (activeItem.offsetWidth - rect.width) / 2,
      });
    }
  }, [navigationItems]); // Add dependency

  // Update handleHover to use text width instead of element width
  const handleHover = (index, event) => {
    const el = event.currentTarget;
    const textSpan = el.querySelector("span");
    const rect = textSpan.getBoundingClientRect();
    setUnderlineStyle({
      width: rect.width,
      left: el.offsetLeft + (el.offsetWidth - rect.width) / 2,
    });
    setHoveredIndex(index);
  };

  // Update handleLeave to use text width
  const handleLeave = () => {
    const activeItem = itemRefs.current.find((_, index) =>
      isMenuActive(navigationItems[index].href)
    );
    if (activeItem) {
      const textSpan = activeItem.querySelector("span");
      const rect = textSpan.getBoundingClientRect();
      setUnderlineStyle({
        width: rect.width,
        left: activeItem.offsetLeft + (activeItem.offsetWidth - rect.width) / 2,
      });
    }
    setHoveredIndex(null);
  };

  // Update URL parameters and localStorage
  const updateURLParams = (key, value) => {
    const params = new URLSearchParams(window.location.search);
    params.set(key, value);
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params}`
    );
    localStorage.setItem(key, value);

    // Dispatch custom event for other components
    window.dispatchEvent(new Event("storage"));
  };

  // Update language handler
  const handleLanguageChange = () => {
    updateLanguage(lang === "en" ? "id" : "en");
  };

  // Update theme handler
  const handleThemeChange = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    updateURLParams("theme", newTheme ? "dark" : "light");
  };

  // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  // Update the hover and text color logic in the navigation section
  return (
    <header
      className={`
        fixed w-full top-0 left-0 right-0 z-50
        ${
          isScrolled
            ? isDark
              ? "bg-gray-900/70 backdrop-blur-md backdrop-saturate-150 shadow-md shadow-cyan-500/20"
              : "bg-white/70 backdrop-blur-md backdrop-saturate-150 shadow-md shadow-cyan-500/20"
            : isDark
            ? "bg-gray-900"
            : "bg-white"
        }
      `}
    >
      <div className="container mx-auto px-6">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            className="flex-shrink-0"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <Logo isDark={isDark} />
          </button>

          {/* Updated Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8 relative">
            {/* Updated Sliding Underline */}
            <div
              className="absolute bottom-0 h-0.5 bg-cyan-500 transition-all duration-300 ease-out"
              style={{
                width: `${underlineStyle.width}px`,
                left: `${underlineStyle.left}px`,
                transform: "translateY(2px)",
              }}
            />

            {navigationItems.map((item, index) => {
              const isActive = isMenuActive(item.href);
              const isHovered = hoveredIndex === index;
              const shouldShowActive = isActive && hoveredIndex === null;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  ref={(el) => (itemRefs.current[index] = el)}
                  onMouseEnter={(e) => handleHover(index, e)}
                  onMouseLeave={handleLeave}
                  className="group relative py-2 px-1"
                >
                  <span
                    className={`
                      relative z-10 
                      ${
                        isDark
                          ? isHovered
                            ? "text-cyan-400"
                            : shouldShowActive
                            ? "text-cyan-400"
                            : "text-gray-400"
                          : isHovered
                          ? "text-cyan-600"
                          : shouldShowActive
                          ? "text-cyan-600"
                          : "text-gray-600"
                      }
                    `}
                  >
                    {item.label}
                  </span>
                </a>
              );
            })}
          </div>

          {/* Updated Actions Group */}
          <div className="flex items-center">
            {/* Updated Desktop Search Bar */}
            <div className="hidden lg:block relative mr-4">
              <input
                type="text"
                value={searchValue}
                onChange={(e) => handleSearch(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={translations[lang].menu.search}
                className={`
                  w-48 pl-10 pr-4 py-2 text-sm rounded-lg
                  ${
                    isDark
                      ? searchValue
                        ? "text-gray-400"
                        : "text-gray-300"
                      : searchValue
                      ? "text-gray-600"
                      : "text-gray-600"
                  }
                  bg-transparent border-none outline-none
                  placeholder:text-gray-400
                `}
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <SearchIcon isDark={isDark} />
              </div>
            </div>

            {/* Theme & Language Group - No Divider */}
            <div className="hidden lg:flex items-center gap-6">
              {/* Updated Language Toggle */}
              <button
                onClick={handleLanguageChange}
                className="flex items-center gap-2 min-w-[50px]"
              >
                <LanguageIcon isDark={isDark} />
                <span
                  className={`text-sm uppercase ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {lang}
                </span>
              </button>

              {/* Desktop Theme Toggle */}
              <button
                onClick={handleThemeChange}
                className="flex items-center gap-2 min-w-[45px]"
              >
                <ThemeIcon isDark={isDark} />
                <span
                  className={`text-sm ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {isDark ? "DR" : "LG"}
                </span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <MenuIcon isOpen={isMenuOpen} isDark={isDark} />
            </button>
          </div>
        </nav>
      </div>

      {/* Updated Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden">
          <div ref={mobileMenuRef} className="container mx-auto p-4">
            {/* Updated Mobile Search Bar */}
            <div className="relative mb-4">
              <input
                type="text"
                value={searchValue}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder={translations[lang].menu.search}
                className={`
                  w-full pl-10 pr-4 py-2.5 text-sm rounded-lg
                  border-none outline-none
                  placeholder:text-gray-400
                  ${
                    isDark
                      ? searchValue
                        ? "bg-gray-800/50 text-gray-400"
                        : "bg-gray-800/50 text-gray-300"
                      : searchValue
                      ? "bg-gray-100/50 text-gray-600"
                      : "bg-gray-100/50 text-gray-600"
                  }
                `}
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <SearchIcon isDark={isDark} />
              </div>
            </div>

            {/* Updated Navigation Links - Removed transitions */}
            <div className="space-y-1">
              {navigationItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`
                    block px-4 py-2.5 rounded-lg
                    ${
                      isDark
                        ? isMenuActive(item.href)
                          ? "bg-gray-800/50 text-cyan-400"
                          : "text-gray-400"
                        : isMenuActive(item.href)
                        ? "bg-gray-100/50 text-cyan-600"
                        : "text-gray-600"
                    }
                  `}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Updated Settings Section */}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4 justify-between">
                {/* Updated Language Toggle (dijadikan button) */}
                <button
                  onClick={handleLanguageChange}
                  className="flex items-center gap-2"
                >
                  <LanguageIcon isDark={isDark} />
                  <span
                    className={`text-sm ${
                      isDark ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {lang.toUpperCase()}
                  </span>
                </button>

                {/* Mobile Theme Toggle (ditambahkan ThemeIcon) */}
                <button
                  onClick={handleThemeChange}
                  className="flex items-center gap-2"
                >
                  <ThemeIcon isDark={isDark} />
                  <span
                    className={`text-sm ${
                      isDark ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {isDark ? "DR" : "LG"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

Header.propTypes = {
  // Remove onRefresh and loading props
};

Logo.propTypes = {
  isDark: PropTypes.bool.isRequired,
};

export default Header;
