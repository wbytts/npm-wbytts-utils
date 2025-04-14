/**
 * 柯里化一个函数
 * @param fn
 * @param arity
 * @param args
 */
export const curry = (fn: Function, arity: number = fn.length, ...args: any[]): any => {
  return arity <= args.length ? fn(...args) : curry.bind(null, fn, arity, ...args);
}


