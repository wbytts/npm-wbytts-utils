/**
 * 如果字符串是 y/yes 返回 true
 * 如果字符串是 n/no 返回 false
 * 默认返回 def，def默认为 false
 * @param val
 * @param def
 */
export const yesNo = (val: string, def = false) => {
  return /^(y|yes)$/i.test(val) ? true : /^(n|no)$/i.test(val) ? false : def;
}


