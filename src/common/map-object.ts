/**
 * Maps the values of an array to an object using a function.
 *
 * @param {[]} arr
 * @param {Function} fn
 */
export const mapObject = (arr: [], fn: Function) =>
  arr.reduce((acc, el, i) => {
    (acc as any)[el] = fn(el, i, arr);
    return acc;
  }, {});

