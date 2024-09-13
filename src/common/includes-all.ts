/**
 * Checks if all the elements in values are included in arr.
 * @param arr
 * @param values
 */
export const includesAll = (arr: any[], values: any[]) => {
  return values.every((v) => arr.includes(v))
}

