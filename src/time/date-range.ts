/**
 * 创建一个生成器，生成两个Date之间的日期，默认间隔为 1
 * @param start
 * @param end
 * @param step
 */
export const dateRange = function* (start: Date, end: Date, step = 1) {
  let d = start;
  while (d < end) {
    yield new Date(d);
    d.setDate(d.getDate() + step);
  }
};

