/**
 * 在指定范围内，生成一个随机的数字
 *
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export const randomNumberInRange = (min: number, max: number): number =>
  Math.random() * (max - min) + min;

