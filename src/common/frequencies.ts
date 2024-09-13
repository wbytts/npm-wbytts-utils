/**
 * Creates an object with the unique values of an array as keys and their frequencies as the values.
 * @param arr
 * @returns
 */
export const frequencies = (arr: any[]) =>
  arr.reduce((a, v) => {
    a[v] = a[v] ? a[v] + 1 : 1;
    return a;
  }, {});

