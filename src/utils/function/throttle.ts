import { debounce } from './debounce';

/**
 * 节流选项接口
 */
export interface ThrottleOptions {
  /**
   * 指定在节流开始前调用函数，默认为 true
   */
  leading?: boolean;
  
  /**
   * 指定在节流结束后调用函数，默认为 true
   */
  trailing?: boolean;
}

/**
 * 创建一个节流函数，在 wait 毫秒内最多执行 func 一次
 * 
 * 节流函数提供一个 cancel 方法取消延迟的函数调用和 flush 方法立即调用
 * 
 * @param func 要节流的函数
 * @param wait 需要节流的毫秒数，默认为 0
 * @param options 选项对象
 * @param options.leading 指定调用在节流开始前，默认为 true
 * @param options.trailing 指定调用在节流结束后，默认为 true
 * @returns 返回新的节流函数
 * @example
 * 
 * // 避免在滚动时过度更新定位
 * jQuery(window).on('scroll', throttle(updatePosition, 100));
 * 
 * // 点击后就调用，但等待 1 秒内不会再次调用
 * jQuery(element).on('click', throttle(submitForm, 1000, {
 *   leading: true,
 *   trailing: false
 * }));
 * 
 * // 取消延迟的函数调用
 * jQuery(window).on('popstate', throttled.cancel);
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait = 0,
  options?: ThrottleOptions
): T & { cancel: () => void; flush: () => ReturnType<T> | undefined } {
  // 处理选项默认值
  const { leading = true, trailing = true } = options || {};
  
  // 使用已经实现的 debounce 函数来实现 throttle
  // 设置 maxWait 选项为 wait，确保函数在指定时间内至少调用一次
  return debounce(func, wait, {
    leading,
    trailing,
    maxWait: wait
  });
}

/**
 * 简化版节流函数，仅包含基本功能
 * 用于需要轻量级解决方案的场景
 * 
 * @param fn 要节流的函数
 * @param wait 需要节流的毫秒数
 * @returns 返回新的节流函数
 */
export const simpleThrottle = <T extends (...args: any[]) => any>(fn: T, wait: number) => {
  let inThrottle = false;
  let lastTime = 0;
  let timeoutId: ReturnType<typeof setTimeout>;
  
  return function(this: any, ...args: Parameters<T>) {
    const context = this;
    const now = Date.now();
    
    // 检查是否已经过了节流时间
    if (now - lastTime >= wait) {
      // 如果已经过了节流时间，则立即执行函数
      fn.apply(context, args);
      lastTime = now;
      inThrottle = true;
    } else if (!inThrottle) {
      // 如果还没过节流时间且不在节流中，则立即执行一次
      fn.apply(context, args);
      lastTime = now;
      inThrottle = true;
    } else {
      // 在节流中，且未过节流时间，则安排在等待时间结束后执行
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fn.apply(context, args);
        lastTime = Date.now();
      }, Math.max(wait - (now - lastTime), 0));
    }
  } as T;
};
