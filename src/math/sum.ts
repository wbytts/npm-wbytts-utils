/**
 * 求和
 * @param {...number[]} arr
 */
export const sum = (...arr: number[]): number => {
  return [...arr].reduce((acc, val) => acc + val, 0);
}


