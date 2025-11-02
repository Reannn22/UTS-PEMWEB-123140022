const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes

export const saveToStorage = (key, data) => {
  const item = {
    data,
    timestamp: Date.now(),
  };
  localStorage.setItem(key, JSON.stringify(item));
};

export const getFromStorage = (key) => {
  const item = localStorage.getItem(key);
  if (!item) return null;

  const { data, timestamp } = JSON.parse(item);
  const isExpired = Date.now() - timestamp > CACHE_EXPIRY;

  if (isExpired) {
    localStorage.removeItem(key);
    return null;
  }

  return data;
};
