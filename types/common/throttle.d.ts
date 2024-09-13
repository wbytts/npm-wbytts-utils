/**
 * 创建一个节流函数, 每隔指定时间最多调用一次
 *
 * @param {Function} fn
 * @param {number} wait
 * @returns
 */
declare const throttle: (fn: Function, wait: number) => () => void;
export default throttle;
