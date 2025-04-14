/**
 * 判断是否为身份证号码
 *
 * @param {string} str
 * @returns {boolean}
 */
export const isIdCard = (str: string) => {

  const reg = /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0[1-9]|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/

  return reg.test(str)
}

