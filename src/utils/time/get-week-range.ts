import { getDayOfYear } from './get-day-of-year';

/**
 * 获取 xxxx 年 xx周 的范围
 * @param year 第几年
 * @param week 第几周
 */
export const getWeekRange = (year: number, week: number) => {
  const firstDate = new Date(year, 0, 1);
  const firstDateDay = firstDate.getDay();

  let startDate;
  if (firstDateDay === 0) {
    startDate = firstDate;
  } else {
    startDate = new Date(firstDate.getTime() - firstDateDay * 24 * 60 * 60 * 1000);
  }

  const weekStartDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000 * (week - 1));
  const weekEndDate = new Date(weekStartDate.getTime() + 7 * 24 * 60 * 60 * 1000 - 1);

  return [weekStartDate, weekEndDate]
};
