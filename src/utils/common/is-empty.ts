/**
 * Returns true if the a value is an empty object, collection.
 *
 * @param {*} val
 */
export const isEmpty = (val: any) => val == null || !(Object.keys(val) || val).length;

