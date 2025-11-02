export const API_KEY = 'CG-UZ1mcpTky2GzQwYzfroASbQP';
export const API_BASE_URL = 'https://api.coingecko.com/api/v3';
export const DEFAULT_CURRENCY = 'usd';

export const API_ENDPOINTS = {
  COINS_MARKETS: '/coins/markets',
  COIN_DETAIL: '/coins',
  MARKET_CHART: '/market_chart'
};

export const DEFAULT_ORDER = 'market_cap_desc';
export const DEFAULT_PER_PAGE = 50;
export const DEFAULT_PAGE = 1;

export const SORT_OPTIONS = [
  { value: 'market_cap_desc', label: 'Market Cap ↓' },
  { value: 'market_cap_asc', label: 'Market Cap ↑' },
  { value: 'volume_desc', label: 'Volume ↓' },
  { value: 'id_asc', label: 'Name A-Z' },
  { value: 'id_desc', label: 'Name Z-A' }
];

export const PER_PAGE_OPTIONS = [10, 25, 50, 100];
