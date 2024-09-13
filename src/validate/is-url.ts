/**
 * Decide whether a string is a URL.
 * @param url
 * @returns
 */
export const isUrl = (url: string) => /^http(s)?/.test(url);

