/**
 * 创建一个防抖函数, 延迟调用给定的函数
 * @param {Function} fn
 * @param {number} [ms=0]
 * @returns
 */
declare const debounce: (fn: Function, ms?: number) => (...args: any[]) => void;
export default debounce;
