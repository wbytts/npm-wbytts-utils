/**
 * 将数组转换为CSV格式字符串
 * @param {any[]} arr
 * @param {string} [delimiter=',']
 */
export const arrayToCSV = (arr: any[], delimiter = ',') => {
  return arr.map(v => v.map((x: any) => (isNaN(x) ? `"${x.replace(/"/g, '""')}"` : x)).join(delimiter)).join('\n');
};
