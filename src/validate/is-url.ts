/**
 * 检查给定的字符串是否是一个有效的 URL。
 * @param url 要检查的字符串
 * @returns 返回一个布尔值，表示给定的字符串是否以 http 或 https 开头
 */
export const isUrl = (url: string) => {
  return /^http(s)?:\/\//.test(url)
};
