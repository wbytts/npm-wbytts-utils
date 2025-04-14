/**
 * 计算从指定日期开始的 n 天后的日期。
 *
 * @param {Date} d 指定的日期
 * @param {number} n 要增加的天数
 * @returns {Date} 返回增加 n 天后的日期
 */
export const addDaysToDate = (d: Date, n: number) => {
  d.setTime(d.getTime() + n * 24 * 60 * 60 * 1000); // 将日期增加 n 天（以毫秒为单位）
  return d;
};
