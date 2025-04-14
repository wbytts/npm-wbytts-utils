/**
 * Chunks an array into smaller arrays of a specified size.
 * @param arr
 * @param size
 * @returns
 */
export const chunk = (arr: any[], size: number) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

