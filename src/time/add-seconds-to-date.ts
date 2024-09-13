/**
 * Date 添加秒数
 * @param d
 * @param n
 * @returns
 */
export const addSecondsToDate = (d: Date, n: number) => {
  d.setTime(d.getTime() + n * 1000);
  return d;
};

