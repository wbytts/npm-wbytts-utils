/**
 * Performs right-to-left function composition.
 * @param fns
 */
export const compose = (...fns: Function[]) =>
  fns.reduce(
    (f, g) =>
      (...args: any[]) =>
        f(g(...args))
  );

