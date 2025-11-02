const CACHE_PREFIX = 'crypto_cache_';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const cacheData = (key, data) => {
  const cacheItem = {
    data,
    timestamp: Date.now()
  };
  localStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify(cacheItem));
};

export const getCachedData = (key) => {
  try {
    const cached = localStorage.getItem(`${CACHE_PREFIX}${key}`);
    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp > CACHE_DURATION) {
      localStorage.removeItem(`${CACHE_PREFIX}${key}`);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Cache read error:', error);
    return null;
  }
};
