/**
 * Returns the n maximum elements from the provided array.
 * @param arr
 * @param n
 */
export const maxN = (arr: [], n = 1) => [...arr].sort((a, b) => b - a).slice(0, n);

