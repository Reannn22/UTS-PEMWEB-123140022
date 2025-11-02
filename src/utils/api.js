import { API_BASE_URL, API_ENDPOINTS, DEFAULT_CURRENCY, API_KEY } from './constants';
import { saveToStorage, getFromStorage } from './storage';

const headers = API_KEY ? { 'X-CG-Api-Key': API_KEY } : {};

export const getCoinsMarkets = async (params = {}) => {
  const cacheKey = `markets_${JSON.stringify(params)}`;
  const cachedData = getFromStorage(cacheKey);

  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.COINS_MARKETS}?${new URLSearchParams(params)}`,
      { headers }
    );

    if (!response.ok) throw new Error('Failed to fetch coins data');
    const data = await response.json();
    saveToStorage(cacheKey, data);
    return data;
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
  const cacheKey = `chart_${coinId}_${days}`;
  const cachedData = getFromStorage(cacheKey);

  if (cachedData) {
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
    saveToStorage(cacheKey, data);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getCoinOhlc = async (coinId, days) => {
  const cacheKey = `ohlc_${coinId}_${days}`;
  const cachedData = getFromStorage(cacheKey);

  if (cachedData) {
    return cachedData;
  }

  try {
    const params = { vs_currency: DEFAULT_CURRENCY, days: days.toString() };
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.COIN_DETAIL}/${coinId}/ohlc?${new URLSearchParams(params)}`,
      { headers }
    );

    if (!response.ok) throw new Error('Failed to fetch OHLC data');
    const data = await response.json();
    saveToStorage(cacheKey, data);
    return data;
  } catch (error) {
    throw error;
  }
};
