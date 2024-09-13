/**
 * Attempts to invoke a function with the provided arguments, returning either the result or the caught error object.
 * @param fn
 * @param args
 */
declare const attempt: (fn: Function, ...args: any[]) => any;
export default attempt;
