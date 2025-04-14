/**
 * Creates a function that invokes fn with partials prepended to the arguments it receives.
 * @param fn
 * @param partials
 */
export const partial =
  (fn: Function, ...partials: any[]) =>
  (...args: any[]) =>
    fn(...partials, ...args);

