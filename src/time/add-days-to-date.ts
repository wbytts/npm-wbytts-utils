/**
 * Date 添加天数
 * @param d
 * @param n
 * @returns
 */
export const addDaysToDate = (d: Date, n: number) => {
  d.setTime(d.getTime() + n * 60 * 60 * 1000 * 24);
  return d;
};

