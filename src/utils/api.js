import { API_BASE_URL, API_ENDPOINTS, DEFAULT_CURRENCY, API_KEY } from './constants';

const headers = {
  'X-CG-Api-Key': API_KEY,
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

// Add cache helper functions
const saveToCache = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to cache:', error);
  }
};

const getFromCache = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error reading from cache:', error);
    return null;
  }
};

export const getCoinsMarkets = async (params = {}) => {
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
      { 
        method: 'GET',
        headers 
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
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
  try {
    const params = { vs_currency: DEFAULT_CURRENCY, days: days.toString() };
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.COIN_DETAIL}/${coinId}/market_chart?${new URLSearchParams(params)}`,
      { headers }
    );
    if (!response.ok) throw new Error('Failed to fetch market chart data');
    return await response.json();
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
