/**
 * Creates a function that invokes fn with partials prepended to the arguments it receives.
 * @param fn
 * @param partials
 */
declare const partial: (fn: Function, ...partials: any[]) => (...args: any[]) => any;
export default partial;
