/**
 * 计算给定日期之后n周的日期。
 * @param d 起始日期
 * @param n 周数
 * @returns 计算后的日期
 */
export const addWeeksToDate = (d: Date, n: number) => {
  d.setTime(d.getTime() + n * 60 * 60 * 1000 * 24 * 7);
  return d;
};

