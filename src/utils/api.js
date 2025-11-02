import { API_BASE_URL, API_ENDPOINTS, DEFAULT_CURRENCY, API_KEY } from './constants';

const headers = API_KEY ? { 'X-CG-Api-Key': API_KEY } : {};

export const getCoinsMarkets = async ({ 
  vs_currency = DEFAULT_CURRENCY,
  order = 'market_cap_desc',
  per_page = 50,
  page = 1,
  ...otherParams 
} = {}) => {
  try {
    const params = new URLSearchParams({
      vs_currency,
      order,
      per_page,
      page,
      ...otherParams
    });

    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.COINS_MARKETS}?${params}`,
      { headers }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch coins data');
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Error fetching coins: ${error.message}`);
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
    if (!coinId) throw new Error('Coin ID is required');

    const params = new URLSearchParams({
      vs_currency: DEFAULT_CURRENCY,
      days: days.toString()
    });

    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.COIN_DETAIL}/${coinId}/market_chart?${params}`,
      { headers }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch market chart data');
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Error fetching market chart: ${error.message}`);
  }
};

export const getCoinOhlc = async (coinId, days) => {
  try {
    if (!coinId) throw new Error("Coin ID is required");

    // Gunakan 'DEFAULT_CURRENCY' agar konsisten dengan fungsi lain
    const params = new URLSearchParams({
      vs_currency: DEFAULT_CURRENCY,
      days: days.toString(),
    });

    // Endpoint ini mengambil data Open, High, Low, Close (OHLC)
    // Menggunakan pola fetch() yang sama dengan fungsi lain
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.COIN_DETAIL}/${coinId}/ohlc?${params}`,
      { headers }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch coin OHLC data");
    }

    return await response.json(); // Menggunakan .json() sama seperti fetch() lainnya
  } catch (error) {
    console.error("Error fetching coin OHLC data:", error);
    throw error;
  }
};
