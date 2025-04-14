import { getDayOfYear } from './get-day-of-year';

/**
 * 获取一年总共有多少周（周日为一周的开始）
 */
export const getYearWeeks = (year: number): number => {
  const firstDate = new Date(year, 0, 1); // 一年第一天
  const lastDate = new Date(year, 11, 31); // 一年最后一天
  let days = getDayOfYear(lastDate); // 一年的天数
  const firstDateDay = firstDate.getDay(); // 1-1 是星期几
  const lastDateDay = lastDate.getDay(); // 12-31 是星期几

  // 如果 1月1日 不是周日，则所在周的上一年部分，算作今年天数，要加上
  if (firstDateDay != 0) {
    days += firstDateDay;
  }

  // 如果 12月31日 不是周六，则所在周的天数，算作下一年的天数，要减去
  if (lastDateDay != 6) {
    days = days - (lastDateDay + 1);
  }

  return Math.ceil(days / 7);
};
