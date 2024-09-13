/**
 * Initializes a 2D array of given width and height and value.
 *
 * @param {number} w
 * @param {number} h
 * @param {*} [val=null]
 * @returns {any[][]}
 */
export const initialize2DArray = (w: number, h: number, val = null): any[][] =>
  Array.from({ length: h }).map(() => Array.from({ length: w }).fill(val));

