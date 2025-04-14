/**
 * 创建一个生成器
 * @param start
 * @param end
 * @param step
 */
export const range = function* (start: number, end: number, step = 1) {
  let i = start;
  while (i < end) {
    yield i;
    i += step;
  }
};

