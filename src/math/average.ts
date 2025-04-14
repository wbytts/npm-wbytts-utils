/**
 * 返回一个数字数组的平均值
 *
 * @param {...number[]} nums
 * @returns {number}
 */
export const average = (...nums: number[]): number =>
  nums.reduce((acc, val) => acc + val, 0) / nums.length;

