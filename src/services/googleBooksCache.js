const cache = new Map();
const CACHE_DURATION = 1000 * 60 * 10; // 10 minutes

export const getCached = (key) => {

    const entry = cache.get(key);

    if (!entry) return null;

    if (Date.now() - entry.timestamp > CACHE_DURATION) {

        cache.delete(key);
        return null;

    }

    return entry.data;

};

export const setCache = (key, data) => {

    cache.set(key, {
        data,
        timestamp: Date.now()
    });

};