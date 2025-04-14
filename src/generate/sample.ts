/**
 * 从数组中随机得到一个元素
 *
 * @param {any[]} arr
 */
export const sample = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

