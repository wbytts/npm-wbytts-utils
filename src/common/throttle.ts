/**
 * 创建一个节流函数, 每隔指定时间最多调用一次
 *
 * @param {Function} fn
 * @param {number} wait
 * @returns
 */
export const throttle = (fn: Function, wait: number) => {
  let inThrottle: boolean, lastFn: number, lastTime: number;
  return function () {
    // @ts-ignore
    const context = this;
    const args = arguments;
    if (!inThrottle) {
      fn.apply(context, args);
      lastTime = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFn);
      lastFn = setTimeout(
        function () {
          if (Date.now() - lastTime >= wait) {
            fn.apply(context, args);
            lastTime = Date.now();
          }
        },
        Math.max(wait - (Date.now() - lastTime), 0)
      );
    }
  };
};

