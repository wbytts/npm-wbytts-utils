/**
 * Date 添加星期数
 * @param d
 * @param n
 * @returns
 */
export const addWeeksToDate = (d: Date, n: number) => {
  d.setTime(d.getTime() + n * 60 * 60 * 1000 * 24 * 7);
  return d;
};

