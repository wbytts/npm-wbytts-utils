/**
 * map function for object.
 * @param obj
 * @param fn
 * @returns
 */
export const objectMap = (obj: Object, fn: Function) =>
  Object.fromEntries(Object.entries(obj).map(([k, v], i) => [k, fn(v, k, i)]));

