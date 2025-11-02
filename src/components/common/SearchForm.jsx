import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import refreshIcon from '../../assets/icons/refresh-cw.svg';
import searchIcon from '../../assets/icons/search.svg';

const SearchForm = ({ 
  isDark, 
  translations, 
  onSearch, 
  onFilter, 
  onRefresh, 
  isRefreshing,
  variant = 'full',
  initialValue = '' 
}) => {
  const [search, setSearch] = useState(initialValue);
  const [filter, setFilter] = useState('all');

  // Sync with URL search parameter
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const searchParam = params.get('search') || '';
    if (searchParam) {
      setSearch(searchParam);
    }
  }, []);

  // Listen for header search events
  useEffect(() => {
    const handleHeaderSearch = (e) => {
      setSearch(e.detail.value);
    };

    window.addEventListener('headerSearch', handleHeaderSearch);
    return () => window.removeEventListener('headerSearch', handleHeaderSearch);
  }, []);

  const handleSearchChange = (value) => {
    setSearch(value);
    onSearch?.(value);
  };

  const handleFilterChange = (value) => {
    setFilter(value);
    onFilter(value);
  };

  // For compact/mobile variants
  if (variant === 'compact' || variant === 'mobile') {
    return (
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder={translations.menu?.search || 'Search...'}
          className={`w-full px-10 py-2 text-sm rounded-lg ${
            isDark 
              ? "bg-gray-800/50 text-gray-300 placeholder:text-gray-400" 
              : "bg-white text-gray-600 placeholder:text-gray-400"
          } focus:outline-none`}
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <img
            src={searchIcon}
            alt="Search"
            className={`w-5 h-5 opacity-70 ${isDark ? "invert" : ""}`}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6 flex flex-col gap-4">
      {/* Search and refresh row */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder={translations.search}
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className={`flex-1 px-4 py-2 rounded-lg border ${
            isDark
              ? "bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
              : "bg-white text-gray-900 border-gray-300 hover:bg-gray-50"
          } focus:outline-none`}
        />
        {/* Refresh Button */}
        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className={`h-[40px] w-[40px] rounded-lg border flex items-center justify-center ${
            isDark
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-300"
          }`}
          title={translations.refresh}
        >
          <img
            src={refreshIcon}
            alt="Refresh"
            className={`w-6 h-6 ${isDark ? "invert" : ""} ${
              isRefreshing ? "animate-spin" : ""
            }`}
          />
        </button>
      </div>

      {/* Filter buttons - desktop */}
      <div className="hidden sm:grid grid-cols-6 gap-2">
        {Object.entries(translations.filter).map(([key, label]) => (
          <button
            key={key}
            onClick={() => handleFilterChange(key)}
            className={`px-4 py-2 rounded-lg border ${
              filter === key
                ? isDark
                  ? "bg-cyan-600 text-white border-transparent"
                  : "bg-cyan-500 text-white border-transparent"
                : isDark
                ? "bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700 hover:border-gray-600"
                : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200 hover:border-gray-400"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Filter buttons - mobile */}
      <div className="grid sm:hidden grid-cols-2 gap-2">
        {Object.entries(translations.filter).map(([key, label]) => (
          <button
            key={key}
            onClick={() => handleFilterChange(key)}
            className={`px-4 py-2 rounded-lg border ${
              filter === key
                ? isDark
                  ? "bg-cyan-600 text-white border-transparent"
                  : "bg-cyan-500 text-white border-transparent"
                : isDark
                ? "bg-gray-800 text-gray-300 border-gray-700"
                : "bg-gray-100 text-gray-700 border-gray-300"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

SearchForm.propTypes = {
  isDark: PropTypes.bool.isRequired,
  translations: PropTypes.object.isRequired,
  onSearch: PropTypes.func.isRequired,
  onFilter: PropTypes.func,
  onRefresh: PropTypes.func,
  isRefreshing: PropTypes.bool,
  variant: PropTypes.oneOf(['full', 'compact', 'mobile']),
  initialValue: PropTypes.string
};

export default SearchForm;
