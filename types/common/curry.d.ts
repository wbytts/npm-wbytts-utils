/**
 * Curries a function.
 * @param fn
 * @param arity
 * @param args
 */
declare const curry: (fn: Function, arity?: number, ...args: any[]) => any;
export default curry;
