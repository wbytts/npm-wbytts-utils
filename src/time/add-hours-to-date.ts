/**
 * Date 添加小时数
 * @param d
 * @param n
 * @returns
 */
export const addHoursToDate = (d: Date, n: number) => {
  d.setTime(d.getTime() + n * 60 * 60 * 1000);
  return d;
};

