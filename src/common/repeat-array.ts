/**
 * Repeat an array.
 * @param arr
 * @param n
 * @returns
 */
export const repeatArray = (arr: [], n: number) => [].concat(...Array(n).fill(arr));

