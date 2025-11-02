import { API_BASE_URL, API_ENDPOINTS, DEFAULT_CURRENCY, API_KEY } from './constants';

const headers = {
  'X-CG-Api-Key': API_KEY,
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

// Simplified cache helpers without expiration
const CACHE_PREFIX = 'crypto_';

const saveToCache = (key, data) => {
  try {
    localStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to cache:', error);
  }
};

const getFromCache = (key) => {
  try {
    const cached = localStorage.getItem(`${CACHE_PREFIX}${key}`);
    return cached ? JSON.parse(cached) : null;
  } catch (error) {
    console.error('Error reading from cache:', error);
    return null;
  }
};

export const getCoinsMarkets = async (params = {}) => {
  const cacheKey = `markets_${JSON.stringify(params)}`;
  const cachedData = getFromCache(cacheKey);

  if (cachedData) {
    console.log('Using cached market data');
    return cachedData;
  }

  try {
    const queryParams = new URLSearchParams({
      vs_currency: DEFAULT_CURRENCY,
      order: 'market_cap_desc',
      per_page: 100,
      page: 1,
      sparkline: false,
      ...params
    });

    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.COINS_MARKETS}?${queryParams}`,
      { method: 'GET', headers }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    saveToCache(cacheKey, data);
    return data;
  } catch (error) {
    console.error('API request failed:', error);
    const cachedFallback = getFromCache(cacheKey);
    if (cachedFallback) {
      console.log('Using cached fallback data');
      return cachedFallback;
    }
    throw error;
  }
};

export const getCoinDetail = async (coinId) => {
  try {
    if (!coinId) throw new Error('Coin ID is required');

    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.COIN_DETAIL}/${coinId}`,
      { headers }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch coin details');
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Error fetching coin details: ${error.message}`);
  }
};

export const getCoinMarketChart = async (coinId, days = 7) => {
  const cacheKey = `chart_${coinId}_${days}`;
  const cachedData = getFromCache(cacheKey);

  if (cachedData) {
    console.log('Using cached chart data');
    return cachedData;
  }

  try {
    const params = { vs_currency: DEFAULT_CURRENCY, days: days.toString() };
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.COIN_DETAIL}/${coinId}/market_chart?${new URLSearchParams(params)}`,
      { headers }
    );
    if (!response.ok) throw new Error('Failed to fetch market chart data');
    const data = await response.json();
    saveToCache(cacheKey, data);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getCoinOhlc = async (coinId, days) => {
  const cacheKey = `ohlc_${coinId}_${days}`;
  const cachedData = getFromCache(cacheKey);
  if (cachedData) return cachedData;

  try {
    const params = { vs_currency: DEFAULT_CURRENCY, days: days.toString() };
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.COIN_DETAIL}/${coinId}/ohlc?${new URLSearchParams(params)}`,
      { headers }
    );

    if (!response.ok) throw new Error('Failed to fetch OHLC data');
    const data = await response.json();
    saveToCache(cacheKey, data);
    return data;
  } catch (error) {
    throw error;
  }
};
