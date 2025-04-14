/**
 * 计算一个日期是当年的第几天
 * @param date
 * @returns
 */
export function getDayOfYear(date: Date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24; // 毫秒数
  return Math.floor(diff / oneDay);
}
