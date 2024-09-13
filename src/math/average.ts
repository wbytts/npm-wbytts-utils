/**
 * 返回多个数字的平均数
 *
 * @param {...number[]} nums
 * @returns {number}
 */
export const average = (...nums: number[]): number => {
  return nums.reduce((acc, val) => acc + val, 0) / nums.length;
}


