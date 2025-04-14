/**
 * 最后几位用 mask 字符替换
 * @param cc
 * @param num
 * @param mask
 */
export const mask = (cc: string | number, num = 4, mask = "*") => {
  return `${cc}`.slice(-num).padStart(`${cc}`.length, mask);
}

