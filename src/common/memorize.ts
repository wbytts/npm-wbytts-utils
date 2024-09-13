/**
 * Returns the memoized (cached) function.
 * @param fn
 */
export const memorize = (fn: Function) => {
  const cache = new Map();
  const cached = function (val: any) {
    // @ts-ignore
    return cache.has(val)
      ? cache.get(val)
      : // @ts-ignore
        cache.set(val, fn.call(this as any, val)) && cache.get(val);
  };
  cached.cache = cache;
  return cached;
};

