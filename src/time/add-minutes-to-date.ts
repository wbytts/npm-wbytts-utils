/**
 * Date 添加分钟数
 * @param d
 * @param n
 * @returns
 */
export const addMinutesToDate = (d: Date, n: number) => {
  d.setTime(d.getTime() + n * 60 * 1000);
  return d;
};

