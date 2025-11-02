import { API_BASE_URL, API_ENDPOINTS, DEFAULT_CURRENCY, API_KEY } from './constants';

const headers = API_KEY ? { 'X-CG-Api-Key': API_KEY } : {};

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

// Update fetchLocalJson function
const fetchLocalJson = async (filename) => {
  try {
    const basePath = process.env.NODE_ENV === 'production' 
      ? process.env.VERCEL_URL 
      : '';
    
    const response = await fetch(`${basePath}/data/${filename}`, {
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error loading ${filename}:`, error);
    return null;
  }
};

export const getCoinsMarkets = async (params = {}) => {
  try {
    // Always try local data first
    const localData = await fetchLocalJson('cryptocurrencylist.json');
    if (localData) {
      console.log('Using local cryptocurrency data');
      return localData;
    }
    // Fallback to API only if local fails
    console.log('Falling back to API for cryptocurrency data');
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.COINS_MARKETS}?${new URLSearchParams(params)}`,
      { headers }
    );
    if (!response.ok) throw new Error('Failed to fetch coins data');
    return await response.json();
  } catch (error) {
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
    // Always try local chart data first
    const localData = await fetchLocalJson('chartpage.json');
    if (localData) {
      console.log('Using local chart data');
      return localData;
    }
    // Fallback to API only if local fails
    console.log('Falling back to API for chart data');
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
