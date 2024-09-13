/**
 * Converts an array of objects into an array of values corresponding to the specified key.
 * @param arr
 * @param key
 */
export const pluck = (arr: any[], key: any) => arr.map((i) => i[key]);

