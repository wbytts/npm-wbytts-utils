/**
 * Return the sum of numbers.
 *
 * @param {...number[]} arr
 */
export const sum = (...arr: number[]): number =>
  [...arr].reduce((acc, val) => acc + val, 0);

