import { getDayOfYear } from './get-day-of-year';
import { getFirstDateOfYear } from './get-first-date-of-year';
import { addDaysToDate } from './add-days-to-date';
import { addMinutesToDate } from './add-minutes-to-date';

/**
 * 获取给定时间是一年的第几周
 * @param date 时间对象
 * @returns 返回周数
 */
export function getWeekOfYear(date = new Date()) {
  const year = date.getFullYear();

  // 获取当前年的第一天
  const firstDateOfYear = getFirstDateOfYear(year);
  const lastDateOfYear = new Date(year, 11, 31)
  const nextYearFirstDate = new Date(year+1, 0, 1)

  if(date.getTime() >= nextYearFirstDate.getTime() - nextYearFirstDate.getDay() * 24 * 60 * 60 * 1000) {
    return 0
  }

  // 计算第一天是星期几（0 = 周日, 1 = 周一, ..., 6 = 周六）
  const firstDayOfWeek = firstDateOfYear.getDay();

  // 计算当前日期是今年的第几天（从 0 开始）
  const pastDaysOfYear = getDayOfYear(date);

  let weekDays;

  if (firstDayOfWeek === 0) {
    weekDays = pastDaysOfYear;
  } else {
    // 如果一年的第一天不是周日（表示上一年的最后一周）
    // 则下一年计算周数的时候要减去这几天
    weekDays = pastDaysOfYear - (7 - firstDayOfWeek);
  }

  let weekNumber = Number(Math.ceil(weekDays / 7));

  if(firstDayOfWeek !== 0) {
    weekNumber += 1
  }

  // return weekNumber === -0 ? 0 : weekNumber;
  return Math.abs(weekNumber);
}
