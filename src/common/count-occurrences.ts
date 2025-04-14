/**
 * 计算一个值在数组中出现的次数
 * @param arr
 * @param val
 * @returns
 */
export const countOccurrences = (arr: any[], val: any) => {
  return arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
}


