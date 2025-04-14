/**
 *  检查字符串是否是URL
 * @param url
 * @returns
 */
export const isUrl = (url: string) => /^http(s)?/.test(url);

