/**
 * 检查字符串是否是合法的手机号
 *
 * @param {string} str
 * @returns {boolean}
 */
export const isPhoneNumber = (str: string): boolean => {
  return /^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(str);
}


