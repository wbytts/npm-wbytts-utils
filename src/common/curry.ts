/**
 * Curries a function.
 * @param fn
 * @param arity
 * @param args
 */
export const curry = (fn: Function, arity: number = fn.length, ...args: any[]): any =>
  arity <= args.length ? fn(...args) : curry.bind(null, fn, arity, ...args);

