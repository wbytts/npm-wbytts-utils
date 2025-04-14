/**
 * 获取一年的第一天的日期对象
 * @param year
 * @returns
 */
export function getFirstDateOfYear(year: number) {
  return new Date(year, 0, 1)
}
