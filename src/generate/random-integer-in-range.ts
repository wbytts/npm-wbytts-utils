/**
 * 在指定范围内，生成一个随机的整数
 *
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export const randomIntegerInRange = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


