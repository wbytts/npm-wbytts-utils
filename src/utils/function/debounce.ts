/**
 * 防抖选项接口
 */
export interface DebounceOptions {
  /**
   * 指定在延迟开始前调用函数，默认为 false
   */
  leading?: boolean;
  
  /**
   * 指定在延迟结束后调用函数，默认为 true
   */
  trailing?: boolean;
  
  /**
   * 设置函数允许被延迟的最大值(单位：毫秒)
   */
  maxWait?: number;
}

/**
 * 获取当前时间戳
 */
const now = () => Date.now();

/**
 * 创建一个防抖函数，该函数会从上一次被调用后延迟 wait 毫秒后调用 func 方法
 * 
 * 防抖函数提供一个 cancel 方法取消延迟的函数调用和 flush 方法立即调用
 * 
 * @param func 要防抖动的函数
 * @param wait 需要延迟的毫秒数，默认为 0
 * @param options 选项对象
 * @param options.leading 指定在延迟开始前调用，默认为 false
 * @param options.trailing 指定在延迟结束后调用，默认为 true
 * @param options.maxWait 设置 func 允许被延迟的最大值(单位：毫秒)
 * @returns 返回新的防抖函数
 * @example
 * 
 * // 避免窗口在变动时出现昂贵的计算
 * jQuery(window).on('resize', debounce(calculateLayout, 150));
 * 
 * // 当点击发生后就立即调用
 * jQuery(element).on('click', debounce(sendMail, 300, {
 *   leading: true,
 *   trailing: false
 * }));
 * 
 * // 确保 batchLog 调用1次之后，1秒内会被触发一次
 * const debounced = debounce(batchLog, 250, { maxWait: 1000 });
 * const source = new EventSource('/stream');
 * source.addEventListener('message', debounced);
 * 
 * // 取消延迟的函数调用
 * jQuery(window).on('popstate', debounced.cancel);
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait = 0,
  options?: DebounceOptions
): T & { cancel: () => void; flush: () => ReturnType<T> | undefined } {
  // 参数默认值处理
  const { leading = false, trailing = true, maxWait } = options || {};
  
  // 是否启用 maxWait 选项
  const maxing = maxWait !== undefined && maxWait > 0;
  
  let lastArgs: any[] | undefined;
  let lastThis: any;
  let result: ReturnType<T> | undefined;
  let lastCallTime: number | undefined;
  let lastInvokeTime = 0;
  let timerId: ReturnType<typeof setTimeout> | undefined;
  
  // 获取当前应该等待的时间
  function remainingWait(time: number) {
    const timeSinceLastCall = time - (lastCallTime || 0);
    const timeSinceLastInvoke = time - lastInvokeTime;
    const timeWaiting = wait - timeSinceLastCall;
    
    return maxing
      ? Math.min(timeWaiting, (maxWait as number) - timeSinceLastInvoke)
      : timeWaiting;
  }
  
  // 检查是否应该调用函数
  function shouldInvoke(time: number) {
    if (lastCallTime === undefined) {
      return true;
    }
    
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;
    
    // 以下情况应该调用函数:
    // 1. 首次调用
    // 2. 距离上次调用超过了 wait 时间
    // 3. 系统时间倒退了
    // 4. 超过了最大等待时间
    return (
      timeSinceLastCall >= wait ||
      timeSinceLastCall < 0 ||
      (maxing && timeSinceLastInvoke >= (maxWait as number))
    );
  }
  
  // 调用函数
  function invokeFunc(time: number) {
    const args = lastArgs;
    const thisArg = lastThis;
    
    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    
    result = func.apply(thisArg, args as any[]);
    return result;
  }
  
  // 在延迟开始时调用函数
  function leadingEdge(time: number) {
    lastInvokeTime = time;
    
    // 如果启用了 trailing 功能，设置一个定时器来执行 trailingEdge
    timerId = setTimeout(timerExpired, wait);
    
    // 如果启用了 leading 功能，立即调用函数
    return leading ? invokeFunc(time) : result;
  }
  
  // 定时器到期时调用
  function timerExpired() {
    const time = now();
    
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    
    // 重新计算剩余时间并重设定时器
    timerId = setTimeout(timerExpired, remainingWait(time));
  }
  
  // 在延迟结束时调用函数
  function trailingEdge(time: number) {
    timerId = undefined;
    
    // 只有在有 lastArgs 的情况下才调用，这意味着 func 已经被防抖过至少一次
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    
    lastArgs = lastThis = undefined;
    return result;
  }
  
  // 取消延迟的函数调用
  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }
  
  // 立即调用防抖函数
  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }
  
  // 防抖函数
  function debounced(this: any, ...args: any[]) {
    const time = now();
    const isInvoking = shouldInvoke(time);
    
    lastArgs = args;
    lastThis = this;
    lastCallTime = time;
    
    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      
      // 如果启用了 maxWait 选项，在一个紧密的循环中处理调用
      if (maxing) {
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    
    // 如果没有设置定时器，设置一个
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    
    return result;
  }
  
  // 添加方法到 debounced 函数
  debounced.cancel = cancel;
  debounced.flush = flush;
  
  // 类型转换，添加方法
  return debounced as T & { 
    cancel: () => void; 
    flush: () => ReturnType<T> | undefined 
  };
}

/**
 * 简化版防抖函数，仅包含基本功能
 * 用于需要轻量级解决方案的场景
 * 
 * @param fn 要防抖动的函数
 * @param ms 需要延迟的毫秒数，默认为 0
 * @returns 返回新的防抖函数
 */
export const simpleDebounce = <T extends (...args: any[]) => any>(fn: T, ms = 0) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  
  return function(this: any, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  } as T;
};
