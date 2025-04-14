import { getWeekOfYear } from '../time/get-week-of-year';

export const formatYearWeek = (date: Date) => {
  let week = getWeekOfYear(date);
  let year = date.getFullYear();
  if (week === 0) {
    year = year + 1;
    let newDate = new Date(year, 0, 1); // 明年第一天
    week = getWeekOfYear(newDate);
  }
  return `${year}年第${week}周`;
};
