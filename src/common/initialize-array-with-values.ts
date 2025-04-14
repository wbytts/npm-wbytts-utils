/**
 * Initializes and fills an array with the specified values.
 *
 * @param {number} n
 * @param {number} [val=0]
 */
export const initializeArrayWithValues = (n: number, val = 0): any[] =>
  Array(n).fill(val);

