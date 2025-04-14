/**
 * 创建一个防抖函数, 延迟调用给定的函数
 * @param {Function} fn
 * @param {number} [ms=0]
 * @returns
 */
export const debounce = (fn: Function, ms = 0) => {
  let timeoutId: number;
  return function (...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(null, args), ms);
  };
};

