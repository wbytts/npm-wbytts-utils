/**
 * 在指定范围内，生成一个随机的数组
 *
 * @param {number} min
 * @param {number} max
 * @param {number} [n=1]
 * @returns {number[]}
 */
export const randomIntArrayInRange = (min: number, max: number, n = 1): number[] => {
  return Array.from(
    { length: n },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  );
}


