/**
 * 校验输入的字符串是否为有效的手机号码格式。
 * 支持中国大陆的手机号格式，包含国际区号。
 *
 * @param {string} str - 要校验的字符串
 * @returns {boolean} - 返回 true 如果是有效的手机号码，否则返回 false
 */
export const isPhoneNumber = (str: string): boolean => {
  const reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
  return reg.test(str)
}
