/**
 * 填充数字到指定长度
 * @param n
 * @param l
 * @returns
 */
export const padNumber = (n: number, l: number) => `${n}`.padStart(l, '0');
